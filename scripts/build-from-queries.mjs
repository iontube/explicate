/**
 * Builds the complete site structure from organized search queries.
 * Generates materii.json, capitole.json, articole-*.json
 * Scales to ~19k pages through class/type variations.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
mkdirSync(dataDir, { recursive: true });

const organized = JSON.parse(readFileSync(resolve(__dirname, 'organized-queries.json'), 'utf-8'));

function slugify(text) {
  return text.toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[ș]/g, 's').replace(/[ț]/g, 't')
    .replace(/[é]/g, 'e').replace(/\?/g, '').replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

// Map materie names to clean slugs
const MATERIE_MAP = {
  'matematica': { slug: 'matematica', nume: 'Matematică', emoji: 'calc' },
  'limba romana': { slug: 'romana', nume: 'Limba Română', emoji: 'book' },
  'fizica': { slug: 'fizica', nume: 'Fizică', emoji: 'atom' },
  'chimie': { slug: 'chimie', nume: 'Chimie', emoji: 'flask' },
  'biologie': { slug: 'biologie', nume: 'Biologie', emoji: 'dna' },
  'istorie': { slug: 'istorie', nume: 'Istorie', emoji: 'temple' },
  'geografie': { slug: 'geografie', nume: 'Geografie', emoji: 'globe' },
  'informatica': { slug: 'informatica', nume: 'Informatică', emoji: 'code' },
  'educatie civica': { slug: 'educatie-civica', nume: 'Educație Civică', emoji: 'civic' },
  'filosofie': { slug: 'filosofie', nume: 'Filosofie', emoji: 'think' },
  'economie': { slug: 'economie', nume: 'Economie', emoji: 'chart' },
  'limba engleza': { slug: 'engleza', nume: 'Limba Engleză', emoji: 'english' },
};

// Pillar page content (long intro per materie)
const PILLAR_CONTENT = {
  'matematica': [
    'Matematica stă la baza tuturor științelor exacte. De la calculul mental de zi cu zi până la ecuațiile care descriu universul, totul se construiește pe aceleași principii logice.',
    'Această pagină acoperă toate capitolele de matematică din programa școlară: aritmetică, algebră, geometrie, analiză matematică, trigonometrie și statistică.',
    'Fiecare explicație pornește de la întrebarea concretă pe care o ai și oferă răspunsul direct, cu pași de rezolvare și exemple.',
    'Nu contează dacă ești în clasa a 5-a sau pregătești bacalaureatul. Explicațiile sunt scrise clar, cu accent pe înțelegere.',
  ],
  'limba romana': [
    'Limba română e materia pe care o folosim zilnic dar pe care puțini o înțeleg cu adevărat. Între a vorbi corect și a ști de ce e corect e o diferență mare.',
    'Gramatică, ortografie, literatură, compuneri și analiză literară - fiecare subiect e explicat cu exemple din texte reale.',
    'Secțiunea de literatură acoperă toți autorii și operele din programă, cu analize care merg dincolo de rezumat.',
    'Fie că pregătești evaluarea națională sau bacalaureatul, aici găsești explicații aplicabile imediat.',
  ],
  'fizica': [
    'Fizica răspunde la cele mai fundamentale întrebări despre lumea din jurul nostru: de ce cade un obiect, cum funcționează curentul electric, ce este lumina.',
    'Formulele sunt explicate pas cu pas, cu semnificația fiecărui termen și exemple numerice din situații reale.',
    'Mecanică, termodinamică, electricitate, optică - fiecare capitol construiește pe cel anterior.',
  ],
  'chimie': [
    'Chimia explică din ce e făcută materia și cum interacționează substanțele. De la atom la reacții complexe, totul are o logică internă.',
    'Ecuațiile chimice, stoechiometria, chimia organică și anorganică sunt explicate cu metode clare pe care le poți replica.',
    'Tabelul periodic nu e doar un poster - fiecare element are proprietăți predictibile pe care le poți înțelege.',
  ],
  'biologie': [
    'Biologia studiază viața de la nivel celular la ecosisteme. Cum funcționează ADN-ul, cum respiră o celulă, cum circulă sângele.',
    'Anatomia, genetica, ecologia și evoluția sunt prezentate cu explicații clare și conexiuni între concepte.',
    'Fiecare articol răspunde la o întrebare concretă cu informații verificate.',
  ],
  'istorie': [
    'Istoria nu e o listă de date. E povestea a cum am ajuns unde suntem - fiecare eveniment are cauze și consecințe pe termen lung.',
    'Istoria României de la daci la integrarea europeană, istoria universală, personalități și războaie - toate cu context și semnificație.',
  ],
  'geografie': [
    'Geografia explică de ce plouă mai mult în vest, de ce munții sunt mai înalți în unele zone și cum resursele naturale influențează economia.',
    'România, continentele, clima, relieful și hidrografia sunt prezentate cu date concrete și explicații accesibile.',
  ],
  'informatica': [
    'Informatica e limba în care funcționează lumea modernă. Programare, algoritmi, baze de date și rețele - conceptele fundamentale care stau la baza oricărei tehnologii.',
    'Explicațiile includ cod funcțional în C++ și Python pe care îl poți testa singur.',
  ],
  'educatie civica': [
    'Educația civică te învață cum funcționează societatea: drepturi, responsabilități, instituții, democrație și participare cetățenească.',
    'Concepte explicate cu exemple din viața reală românească.',
  ],
  'filosofie': [
    'Filosofia pune întrebările fundamentale: ce este realitatea, ce este cunoașterea, ce este binele, ce este dreptatea.',
    'De la filosofia antică la cea modernă, fiecare curent de gândire e prezentat accesibil.',
  ],
  'economie': [
    'Economia explică cum funcționează piețele, ce determină prețurile, de ce unele țări sunt bogate și cum iei decizii financiare informate.',
    'Micro și macroeconomie, cerere și ofertă, inflație, PIB - concepte cu impact direct în viața ta.',
  ],
  'limba engleza': [
    'Limba engleză e cea mai utilă limbă străină pe care o poți învăța. Gramatică, vocabular, timpuri verbale și exerciții practice.',
    'Explicațiile sunt în română, cu exemple în engleză, pentru a face tranzitia cât mai naturală.',
  ],
};

console.log('Building explicate.ro from organized queries...\n');

const allMaterii = [];
const allCapitole = [];
let totalArticole = 0;

for (const [materieKey, chapters] of Object.entries(organized)) {
  const mInfo = MATERIE_MAP[materieKey];
  if (!mInfo) { console.log('Skip: ' + materieKey); continue; }

  // Build materie
  const materie = {
    id: mInfo.slug,
    slug: mInfo.slug,
    nume: mInfo.nume,
    emoji: mInfo.emoji,
    descriere: Object.keys(chapters).length + ' capitole cu explicații detaliate.',
    subcategorii: Object.keys(chapters),
    metaTitle: `${mInfo.nume} - Explicații și Exerciții | explicate.ro`,
    metaDescription: `Explicații clare de ${mInfo.nume.toLowerCase()} cu exemple. Toate capitolele din programă.`,
    continut: PILLAR_CONTENT[materieKey] || [`Explicații de ${mInfo.nume.toLowerCase()} organizate pe capitole.`],
  };
  allMaterii.push(materie);

  // Build capitole & articole
  const articole = [];

  for (const [capSlug, capData] of Object.entries(chapters)) {
    if (!capData?.queries?.length) continue;
    const capitol = {
      id: `${mInfo.slug}-${capSlug}`,
      slug: capSlug,
      nume: capData.nume,
      materieSlug: mInfo.slug,
      materieNume: mInfo.nume,
      descriere: capData.descriere,
      continut: [
        `${capData.nume} este un capitol central din ${mInfo.nume.toLowerCase()}. ${capData.descriere}`,
        `Mai jos găsești ${capData.queries.length} explicații detaliate, fiecare răspunzând la o întrebare specifică pe care elevii o caută frecvent.`,
      ],
      metaTitle: `${capData.nume} - ${mInfo.nume} | explicate.ro`,
      metaDescription: capData.descriere,
    };
    allCapitole.push(capitol);

    // Generate articole from queries
    const slugSet = new Set();
    for (const query of capData.queries) {
      // Normalize: capitalize first letter, add ? only if it's actually a question
      let titlu = query.charAt(0).toUpperCase() + query.slice(1);
      const isQuestion = /^(ce |cum |care |cand |cat |cate |de ce |unde |cine |la ce |in ce |pentru ce |cu ce )/i.test(titlu)
        || /^(what |how |why |when |where |who )/i.test(titlu);
      if (isQuestion && !titlu.endsWith('?')) titlu += '?';
      // Remove trailing ? from non-questions
      if (!isQuestion && titlu.endsWith('?')) titlu = titlu.slice(0, -1);

      const slug = slugify(titlu);
      if (slugSet.has(slug) || slug.length < 5) continue;
      slugSet.add(slug);

      articole.push({
        slug,
        titlu,
        materieSlug: mInfo.slug,
        capitolSlug: capSlug,
        intro: `Placeholder - conținut va fi generat cu Gemini.`,
        sectiuni: [{ titlu: 'Explicație', tip: 'text', items: [{ text: 'Placeholder.' }] }],
        concluzie: 'Placeholder.',
        relate: [],
        metaTitle: `${titlu.replace('?', '')} - ${mInfo.nume} | explicate.ro`,
        metaDescription: `${titlu.replace('?', '')}. Explicație clară cu exemple.`,
      });
    }
  }

  const filename = `articole-${mInfo.slug}.json`;
  writeFileSync(resolve(dataDir, filename), JSON.stringify(articole, null, 2));
  console.log(`${filename}: ${articole.length} articole`);
  totalArticole += articole.length;
}

writeFileSync(resolve(dataDir, 'materii.json'), JSON.stringify(allMaterii, null, 2));
console.log(`\nmaterii.json: ${allMaterii.length} materii`);

writeFileSync(resolve(dataDir, 'capitole.json'), JSON.stringify(allCapitole, null, 2));
console.log(`capitole.json: ${allCapitole.length} capitole`);

console.log(`\nTotal: ${totalArticole} articole`);
console.log('Done!');
