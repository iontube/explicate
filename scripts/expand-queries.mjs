/**
 * Expands search queries in small batches (200 per request)
 * with automatic retry on failure. Target: ~1500 per materie.
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
const QUERIES_FILE = resolve(__dirname, 'search-queries.json');
const TARGET_PER_MATERIE = 1500;
const BATCH = 100;

async function fetchQueries(materie, existing, count) {
  const sample = existing.slice(0, 30).join(', ');
  const prompt = `Generează ${count} căutări Google NOI despre ${materie} pe care elevii din România le fac. NU duplica din aceste exemple existente: ${sample}...

Include variații pe clase (5a-12a), "exercitii rezolvate", "formule", "bacalaureat", "evaluare nationala", "diferenta intre", "cum se calculeaza".
Fără diacritice. Formulări naturale.

JSON array de exact ${count} stringuri unice.`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 8192, responseMimeType: 'application/json' },
        }),
      });

      if (res.status === 429) {
        console.log('    Rate limited, waiting 15s...');
        await new Promise(r => setTimeout(r, 15000));
        continue;
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) { console.log('    Empty response, retry...'); continue; }

      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.log(`    Attempt ${attempt + 1} failed: ${e.message}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  return [];
}

async function main() {
  const queries = JSON.parse(readFileSync(QUERIES_FILE, 'utf-8'));

  for (const [materie, existing] of Object.entries(queries)) {
    const need = TARGET_PER_MATERIE - existing.length;
    if (need <= 0) {
      console.log(`${materie}: already ${existing.length} (skip)`);
      continue;
    }

    console.log(`${materie}: have ${existing.length}, need ${need} more`);
    const allNew = [];
    const batches = Math.ceil(need / BATCH);

    for (let i = 0; i < batches; i++) {
      const batchSize = Math.min(BATCH, need - allNew.length);
      process.stdout.write(`  batch ${i + 1}/${batches} (${batchSize} queries)...`);

      const newQs = await fetchQueries(materie, [...existing, ...allNew], batchSize);

      // Dedup against existing
      const existingSet = new Set([...existing, ...allNew].map(q => q.toLowerCase().trim()));
      const unique = newQs.filter(q => {
        const key = q.toLowerCase().trim();
        if (existingSet.has(key) || key.length < 5) return false;
        existingSet.add(key);
        return true;
      });

      allNew.push(...unique);
      console.log(` +${unique.length} (total new: ${allNew.length})`);

      await new Promise(r => setTimeout(r, 500));
    }

    queries[materie] = [...existing, ...allNew];
    console.log(`  -> ${materie}: ${queries[materie].length} total\n`);

    // Save after each materie
    writeFileSync(QUERIES_FILE, JSON.stringify(queries, null, 2));
  }

  const total = Object.values(queries).reduce((s, q) => s + q.length, 0);
  console.log(`\nTotal queries: ${total}`);
}

main().catch(console.error);
