/**
 * Generates unique article content for explicate.ro using Gemini 2.5 Flash.
 * Usage: GEMINI_API_KEY=xxx node scripts/generate-content-llm.mjs [materie-slug]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');

// Using Vertex AI via shared helper

import { callGemini } from '/Users/luc/Directoare/shared-gemini.mjs';
const BATCH_SIZE = 5;
const CONCURRENCY = 3;
const SAVE_EVERY = 100;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function buildPrompt(batch) {
  const questions = batch.map((q, i) => `${i + 1}. "${q.titlu}" (${q.materieNume} > ${q.capitolNume})`).join('\n');

  return `Ești un profesor experimentat care scrie explicații clare pentru elevi și studenți din România. Scrii pentru un site educațional.

REGULI:
- Prima propoziție din intro RĂSPUNDE DIRECT la întrebare sau definește termenul. Fără ocolișuri.
- Scrie ca un profesor bun care explică simplu, NU ca un AI. ZERO fraze: "este important", "în concluzie", "haideți să", "merită menționat".
- Fiecare explicație trebuie COMPLET DIFERITĂ ca informație și structură.
- Include date concrete, formule, exemple numerice unde e cazul.
- Dacă e exercițiu rezolvat, include rezolvarea pas cu pas.
- Dacă e formulă, explică fiecare termen.
- 250-400 cuvinte per articol.
- Română naturală, pe înțelesul unui elev de liceu.

Scrie explicații pentru:
${questions}

JSON array strict, în ordine:
[{"intro":"2-3 prop, prima = răspuns direct","sectiuni":[{"titlu":"...","tip":"lista","items":[{"titlu":"...","text":"..."}]}],"concluzie":"sfat practic sau rezumat în 1 propoziție"}]

Tip: "lista" sau "pasi". 2-3 secțiuni, 3-5 items per secțiune.`;
}

function getProgressFile(slug) { return resolve(dataDir, `progress-${slug}.json`); }
function loadProgress(slug) {
  const f = getProgressFile(slug);
  return existsSync(f) ? new Set(JSON.parse(readFileSync(f, 'utf-8'))) : new Set();
}
function saveProgress(slug, done) { writeFileSync(getProgressFile(slug), JSON.stringify([...done])); }

async function processMaterie(slug) {
  const file = resolve(dataDir, `articole-${slug}.json`);
  if (!existsSync(file)) { console.log(`Skip ${slug}: no file`); return; }

  const articole = JSON.parse(readFileSync(file, 'utf-8'));
  const materii = JSON.parse(readFileSync(resolve(dataDir, 'materii.json'), 'utf-8'));
  const capitole = JSON.parse(readFileSync(resolve(dataDir, 'capitole.json'), 'utf-8'));
  const doneSlugs = loadProgress(slug);

  const slugToIdx = new Map();
  articole.forEach((a, i) => slugToIdx.set(a.slug, i));

  const todo = articole.filter(a => !doneSlugs.has(a.slug));
  console.log(`\n${slug}: ${todo.length} de procesat (${doneSlugs.size} deja)`);
  if (todo.length === 0) return;

  const batches = [];
  for (let i = 0; i < todo.length; i += BATCH_SIZE) batches.push(todo.slice(i, i + BATCH_SIZE));

  let lastSave = doneSlugs.size;
  const start = Date.now();

  async function processBatch(batch) {
    const batchData = batch.map(a => {
      const mat = materii.find(m => m.slug === a.materieSlug);
      const cap = capitole.find(c => c.materieSlug === a.materieSlug && c.slug === a.capitolSlug);
      return { titlu: a.titlu, materieNume: mat?.nume || a.materieSlug, capitolNume: cap?.nume || a.capitolSlug };
    });

    const result = await callGemini(buildPrompt(batchData));
    if (result && Array.isArray(result)) {
      const count = Math.min(result.length, batch.length);
      for (let j = 0; j < count; j++) {
        const content = result[j];
        if (content?.intro && content?.sectiuni) {
          const idx = slugToIdx.get(batch[j].slug);
          if (idx !== undefined) {
            articole[idx].intro = content.intro;
            articole[idx].sectiuni = content.sectiuni;
            articole[idx].concluzie = content.concluzie || articole[idx].concluzie;
            articole[idx].metaDescription = content.intro.substring(0, 155).replace(/\.\s*$/, '') + '.';
          }
          doneSlugs.add(batch[j].slug);
        }
      }
    }
  }

  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(b => processBatch(b)));

    const done = doneSlugs.size;
    const total = articole.length;
    const elapsed = ((Date.now() - start) / 1000).toFixed(0);
    const rate = ((done - (total - todo.length)) / Math.max(1, elapsed)).toFixed(1);
    const remaining = ((todo.length - (done - (total - todo.length))) / Math.max(0.1, parseFloat(rate))).toFixed(0);
    process.stdout.write(`\r  ${slug}: ${done}/${total} (${((done/total)*100).toFixed(1)}%) | ${elapsed}s | ~${rate} art/s | ~${Math.ceil(remaining/60)}min left    `);

    if (done - lastSave >= SAVE_EVERY) {
      saveProgress(slug, doneSlugs);
      writeFileSync(file, JSON.stringify(articole, null, 2));
      lastSave = done;
    }
  }

  saveProgress(slug, doneSlugs);
  writeFileSync(file, JSON.stringify(articole, null, 2));
  console.log(`\n  ${slug}: DONE - ${doneSlugs.size}/${articole.length}`);
}

async function main() {
  console.log('=== Generare conținut explicate.ro cu Gemini 2.5 Flash ===\n');

  const target = process.argv[2];
  const files = readdirSync(dataDir).filter(f => f.startsWith('articole-') && f.endsWith('.json'));
  const slugs = files.map(f => f.replace('articole-', '').replace('.json', ''));

  const toProcess = target ? [target] : slugs;

  for (const slug of toProcess) {
    await processMaterie(slug);
  }

  // Cleanup progress files
  for (const slug of toProcess) {
    const pf = getProgressFile(slug);
    if (existsSync(pf)) { const { unlinkSync } = await import('fs'); unlinkSync(pf); }
  }

  console.log('\n=== DONE ===');
}

main().catch(console.error);
