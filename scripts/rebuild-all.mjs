/**
 * Rebuilds explicate.ro from all queries.
 * Uses organized-queries.json for chapter assignments where available,
 * then distributes remaining queries via keyword matching.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
mkdirSync(dataDir, { recursive: true });

const allQueries = JSON.parse(readFileSync(resolve(__dirname, 'search-queries.json'), 'utf-8'));
const organized = JSON.parse(readFileSync(resolve(__dirname, 'organized-queries.json'), 'utf-8'));

function slugify(text) {
  return text.toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[ș]/g, 's').replace(/[ț]/g, 't')
    .replace(/[é]/g, 'e').replace(/\?/g, '').replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

// ═══════════════════════════════════════════════════════════════
// MATERIE CONFIG
// ═══════════════════════════════════════════════════════════════

const MATERIE_MAP = {
  'matematica': { slug: 'matematica', nume: 'Matematică' },
  'limba romana': { slug: 'romana', nume: 'Limba Română' },
  'fizica': { slug: 'fizica', nume: 'Fizică' },
  'chimie': { slug: 'chimie', nume: 'Chimie' },
  'biologie': { slug: 'biologie', nume: 'Biologie' },
  'istorie': { slug: 'istorie', nume: 'Istorie' },
  'geografie': { slug: 'geografie', nume: 'Geografie' },
  'informatica': { slug: 'informatica', nume: 'Informatică' },
  'educatie civica': { slug: 'educatie-civica', nume: 'Educație Civică' },
  'filosofie': { slug: 'filosofie', nume: 'Filosofie' },
  'economie': { slug: 'economie', nume: 'Economie' },
  'limba engleza': { slug: 'engleza', nume: 'Limba Engleză' },
};

// Keyword-based chapter assignment for queries not in organized-queries
const CHAPTER_KEYWORDS = {
  matematica: {
    'aritmetica': ['fractii', 'fractie', 'procent', 'cmmdc', 'cmmmc', 'divizib', 'numar prim', 'numere prime', 'radical', 'putere', 'medie aritmetica', 'proportii', 'regula de trei'],
    'algebra': ['ecuati', 'inecuati', 'functii', 'functia', 'polinom', 'matrice', 'determinant', 'sistem de', 'progresie', 'logaritm', 'complex', 'viete', 'discriminant', 'grafic'],
    'geometrie': ['arie', 'aria', 'volum', 'perimetr', 'triunghi', 'cerc', 'dreptunghi', 'patrat', 'pitagora', 'thales', 'paralel', 'perpendic', 'simetri', 'diagonal', 'cilindru', 'con', 'sfera', 'piramid', 'romb', 'trapez', 'poligon'],
    'analiza-matematica': ['limita', 'derivat', 'integral', 'primitiv', 'continuit', 'monoton', 'asimptot', 'inflexiune', 'extrem', 'hopital', 'leibniz', 'rolle', 'lagrange'],
    'trigonometrie': ['sinus', 'cosinus', 'tangent', 'cotangent', 'trigonometr', 'cerc trigonometr', 'radian', 'unghi'],
    'probabilitati': ['probabilit', 'combinari', 'aranjament', 'permutari', 'statistic', 'medie', 'mediana', 'deviati', 'factorial', 'binom'],
  },
  'limba romana': {
    'gramatica': ['substantiv', 'adjectiv', 'verb', 'adverb', 'pronume', 'prepoziti', 'conjuncti', 'interjecti', 'subiect', 'predicat', 'atribut', 'complement', 'propoziti', 'fraza', 'sintactic', 'gramatic', 'diatez', 'mod ', 'timp ', 'caz ', 'gen ', 'numar'],
    'ortografie': ['cratim', 'virgul', 'sa si s-a', 'ia si i-a', 'sau si s-au', 'ortograf', 'diacrit', 'silabe', 'litera mare', 'punct ', 'scriere corecta', 'diferenta intre'],
    'literatura': ['romantism', 'realism', 'modernism', 'simbolism', 'clasicism', 'nuvela', 'roman ', 'poezie', 'basm', 'fabula', 'balada', 'drama', 'comedie', 'tragedie', 'eminescu', 'creanga', 'caragiale', 'rebreanu', 'sadoveanu', 'petrescu', 'blaga', 'arghezi', 'bacovia', 'stanescu', 'preda', 'sorescu', 'barbu', 'luceafar', 'moara cu noroc', ' ion ', 'morometii', 'enigma otiliei'],
    'compuneri': ['eseu', 'compunere', 'scrisoare', 'rezumat', 'cerere', 'cv', 'argument', 'introducere', 'concluzie', 'comentariu', 'caracterizare'],
    'analiza-literara': ['metafor', 'comparat', 'personificar', 'epitet', 'hiperbol', 'antitez', 'alegori', 'ironi', 'simbol', 'figura de stil', 'tema ', 'motiv literar', 'narator', 'conflict', 'personaj', 'incipit'],
    'vocabular': ['sinonim', 'antonim', 'omonim', 'paronim', 'neologism', 'arhaism', 'regionalism', 'prefix', 'sufix', 'derivat', 'familie de cuvinte', 'camp lexical', 'pleonasm'],
  },
  fizica: {
    'mecanica': ['vitez', 'accelerat', 'forta', 'newton', 'mecanic', 'cinetic', 'potential', 'impuls', 'frecare', 'gravitat', 'presiune', 'densitat', 'cadere libera', 'aruncare', 'echilibru', 'moment', 'arhimede'],
    'termodinamica': ['temperat', 'caldur', 'termodinamic', 'dilatat', 'gaz ideal', 'entropie', 'calorimetr', 'topire', 'vaporizare', 'stare de agregare', 'motor termic', 'carnot'],
    'electricitate': ['curent', 'tensiune', 'rezistent', 'ohm', 'circuit', 'putere electric', 'energie electric', 'kirchhoff', 'condensator', 'camp electric', 'camp magnetic', 'inductie', 'coulomb', 'faraday'],
    'optica': ['lumin', 'reflexi', 'refracti', 'lentil', 'oglind', 'dispersi', 'difracti', 'interferent', 'spectru', 'ochi'],
    'fizica-nucleara': ['radioactiv', 'fisiune', 'fuziune', 'nuclear', 'dezintegrare', 'izotop', 'atom', 'particul', 'E=mc'],
    'unde': ['unda', 'frecvent', 'amplitudin', 'lungime de und', 'sunet', 'doppler', 'rezonant', 'pendul', 'oscilati'],
  },
  chimie: {
    'chimie-generala': ['atom', 'electron', 'proton', 'neutron', 'legatur', 'covalent', 'ionic', 'metalic', 'electronegativ', 'configurati', 'orbital', 'mol ', 'masa molar', 'avogadro', 'numar de oxidare'],
    'chimie-organica': ['alcan', 'alchen', 'alchin', 'aren', 'benzen', 'alcool', 'aldehid', 'ceton', 'acid carboxilic', 'ester', 'aminoacid', 'polimer', 'hidrocarbur', 'organic', 'metanol', 'etanol', 'acetona'],
    'chimie-anorganica': ['oxid', 'acid ', 'baz', 'sare', 'metal', 'nemetal', 'anorganic', 'coroziune', 'electroliz', 'serie activitat'],
    'reactii-chimice': ['reacti', 'echilibr', 'ecuati chimic', 'stoechiometr', 'cataliz', 'exoterm', 'endoterm', 'viteza de reacti', 'neutralizar'],
    'tabelul-periodic': ['tabel periodic', 'grup', 'perioad', 'alcalin', 'halogen', 'gaz rar', 'tranziti', 'element'],
    'biochimie': ['protein', 'lipid', 'glucid', 'enzim', 'adn', 'arn', 'atp', 'metabolism', 'vitamin', 'glucoza', 'celuloza'],
  },
  biologie: {
    'celula': ['celul', 'membran', 'nucle', 'mitocondr', 'ribozom', 'reticul', 'golgi', 'lizozom', 'citoplasm', 'mitoz', 'meioz', 'ciclu celular', 'cloroplast', 'organit'],
    'genetica': ['adn', 'arn', 'gen', 'cromozom', 'mutati', 'ereditat', 'genotip', 'fenotip', 'mendel', 'clonare', 'inginer genetic', 'dominant', 'recesiv', 'alel'],
    'anatomie': ['inim', 'plaman', 'rinichi', 'ficat', 'sistem nervos', 'digestiv', 'circulator', 'respirator', 'endocrin', 'muschi', 'os', 'schelet', 'sange', 'arterl', 'ven', 'neuron', 'sinaps', 'imunitar', 'anticorp', 'vaccin', 'hormon', 'insulin'],
    'ecologie': ['ecosistem', 'trofic', 'biodiversitat', 'efect de ser', 'ozon', 'poluar', 'reciclare', 'desertificar', 'dezvoltare durabil', 'arie protejat', 'speci'],
    'evolutie': ['evolutie', 'selecti natural', 'adaptare', 'speciere', 'darwin', 'fosil', 'filogenetic', 'extinctie', 'vestigial'],
    'botanica': ['fotosintez', 'planta', 'radacin', 'tulpin', 'frunz', 'poleni', 'germina', 'clorofil', 'respiratie celular', 'monocotiledon', 'dicotiledon'],
  },
  istorie: {
    'istoria-romaniei': ['daci', 'dacia', 'roman', 'burebista', 'decebal', 'stefan cel mare', 'mihai viteazul', 'cuza', 'unirea', 'mare unire', '1918', '1859', '1989', 'comunism', 'revolutia', 'carol', 'ferdinand', 'ceausescu', 'nato', 'ue', 'principat', 'vlad tepes', 'fanario'],
    'istoria-universala': ['renaster', 'iluminis', 'industrial', 'razboi mondial', 'razboi rece', 'imperiu', 'colonial', 'feudalis', 'reforma protestant', 'descoperiri geografic', 'onu', 'nato', 'zidul berlin'],
    'razboaie': ['batali', 'razboi', 'waterloo', 'stalingrad', 'normandia', 'verdun', 'marasesti', 'independen'],
    'personalitati': ['alexandru cel mare', 'napoleon', 'lincoln', 'churchill', 'gandhi', 'mandela', 'einstein', 'da vinci', 'newton', 'caesar', 'cleopatra', 'hitler', 'stalin', 'balcescu', 'iancu'],
    'revolutii': ['revolutia', 'primavara popoarelor', '1848'],
    'civilizatii-antice': ['egipt', 'greci', 'roman', 'mesopotam', 'pers', 'piramid', 'parthenon', 'socrate', 'platon', 'aristotel', 'colosseum', 'sumeri', 'aztec', 'maya', 'inca'],
  },
  geografie: {
    'geografia-romaniei': ['carpat', 'dunare', 'delta', 'campia roman', 'transilvani', 'subcarpat', 'moldov', 'munt', 'brasov', 'bucurest', 'cluj', 'romania', 'clima roman', 'resurse roman'],
    'continente': ['continent', 'europa', 'asia', 'africa', 'america', 'oceania', 'antarctic', 'australia'],
    'clima': ['climat', 'tropical', 'temperat', 'polar', 'biom', 'savana', 'desert', 'tundra', 'taiga', 'padure', 'efect de sera', 'incalzire global', 'precipitat', 'uragan', 'tornado'],
    'relief': ['munte', 'vulcan', 'cutremur', 'tectonic', 'eroziune', 'pestera', 'campie', 'podis', 'delta', 'insula', 'peninsula'],
    'geografie-economica': ['resurse', 'pib', 'globalizar', 'urbanizar', 'migratie', 'populati', 'densitate', 'natalitate', 'sector', 'industri', 'comert', 'agricultura'],
    'hidrografie': ['rau', 'lac', 'ocean', 'mare', 'ciclu ap', 'subteran', 'ghetar', 'bazin hidrograf', 'debit', 'inundat'],
  },
  informatica: {
    'programare': ['variabil', 'functie', 'bucla', 'for ', 'while', 'if ', 'array', 'string', 'recursiv', 'clasa', 'obiect', 'mostenire', 'polimorfism', 'pointer', 'c++', 'python', 'stiva', 'coada', 'lista', 'fisier', 'citire', 'afisare'],
    'algoritmi': ['algoritm', 'sortare', 'bubble', 'cautare', 'binar', 'complexitate', 'big o', 'divide', 'dinamic', 'greedy', 'backtrack', 'graf', 'arbore', 'bfs', 'dfs', 'dijkstra', 'euclid', 'eratostene'],
    'baze-de-date': ['baza de date', 'sql', 'select', 'join', 'tabel', 'cheie primar', 'normalizare', 'index', 'insert', 'update', 'delete', 'where', 'group by'],
    'retele': ['retea', 'tcp', 'http', 'dns', 'ip', 'router', 'firewall', 'vpn', 'cloud', 'server', 'ftp', 'ssh', 'port', 'protocol'],
    'sisteme-de-operare': ['sistem de operare', 'linux', 'windows', 'proces', 'thread', 'memorie', 'ram', 'kernel', 'fisiere', 'boot', 'partiti', 'driver', 'bios'],
    'web': ['html', 'css', 'javascript', 'framework', 'responsive', 'api', 'frontend', 'backend', 'dom', 'react', 'vue'],
  },
};

// Default chapters for materii without keyword config
const DEFAULT_CHAPTERS = {
  'educatie civica': {
    'drepturi-si-libertati': { nume: 'Drepturi și libertăți', descriere: 'Drepturile omului și libertățile cetățenești.' },
    'democratie-si-institutii': { nume: 'Democrație și instituții', descriere: 'Sistemul democratic, parlament, guvern, justiție.' },
    'valori-civice': { nume: 'Valori civice', descriere: 'Responsabilitate, toleranță, solidaritate, civism.' },
    'comunitate-si-participare': { nume: 'Comunitate și participare', descriere: 'Participare cetățenească, voluntariat, societate civilă.' },
    'constitutie-si-legi': { nume: 'Constituție și legi', descriere: 'Constituția României, legislație, stat de drept.' },
    'diverse': { nume: 'Diverse', descriere: 'Alte teme de educație civică.' },
  },
  'filosofie': {
    'introducere': { nume: 'Introducere în filosofie', descriere: 'Ce este filosofia, ramurile filosofiei.' },
    'filosofie-antica': { nume: 'Filosofie antică', descriere: 'Socrate, Platon, Aristotel, presocratici.' },
    'filosofie-moderna': { nume: 'Filosofie modernă', descriere: 'Descartes, Kant, Hegel, iluminism.' },
    'etica': { nume: 'Etică', descriere: 'Morală, bine și rău, teorii etice.' },
    'logica': { nume: 'Logică', descriere: 'Raționament, silogism, argumente.' },
    'diverse': { nume: 'Diverse', descriere: 'Alte teme de filosofie.' },
  },
  'economie': {
    'microeconomie': { nume: 'Microeconomie', descriere: 'Cerere, ofertă, piață, preț, concurență.' },
    'macroeconomie': { nume: 'Macroeconomie', descriere: 'PIB, inflație, șomaj, politici economice.' },
    'finante-personale': { nume: 'Finanțe personale', descriere: 'Economisire, investiții, buget, credite.' },
    'afaceri': { nume: 'Afaceri', descriere: 'Antreprenoriat, management, marketing.' },
    'economie-internationala': { nume: 'Economie internațională', descriere: 'Comerț, globalizare, organizații economice.' },
    'diverse': { nume: 'Diverse', descriere: 'Alte teme de economie.' },
  },
  'limba engleza': {
    'gramatica': { nume: 'Grammar', descriere: 'Timpuri verbale, articole, prepoziții, structuri.' },
    'vocabular': { nume: 'Vocabulary', descriere: 'Cuvinte, expresii, idiomuri, phrasal verbs.' },
    'conversatie': { nume: 'Speaking & Writing', descriere: 'Conversație, scriere, pronunție.' },
    'exercitii': { nume: 'Exerciții', descriere: 'Exerciții rezolvate și teste.' },
    'diverse': { nume: 'Diverse', descriere: 'Alte teme de limba engleză.' },
  },
};

// ═══════════════════════════════════════════════════════════════
// BUILD
// ═══════════════════════════════════════════════════════════════

console.log('Rebuilding explicate.ro...\n');

const allMaterii = [];
const allCapitole = [];
let totalArticole = 0;

for (const [materieKey, queries] of Object.entries(allQueries)) {
  const mInfo = MATERIE_MAP[materieKey];
  if (!mInfo) continue;

  // Distribute ALL queries through keyword matching only (no organized-queries mixing)
  let chapters = {};
  const keywords = CHAPTER_KEYWORDS[materieKey] || {};
  const defaults = DEFAULT_CHAPTERS[materieKey] || {};

  // Initialize chapters from keyword config or defaults
  const chapterDefs = Object.keys(keywords).length > 0 ? keywords : {};
  const chapterNames = {
    // Matematica
    'aritmetica': 'Aritmetică', 'algebra': 'Algebră', 'geometrie': 'Geometrie',
    'analiza-matematica': 'Analiză matematică', 'trigonometrie': 'Trigonometrie',
    'probabilitati': 'Probabilități și statistică',
    // Romana
    'gramatica': 'Gramatică', 'ortografie': 'Ortografie', 'literatura': 'Literatură',
    'compuneri': 'Compuneri', 'analiza-literara': 'Analiză literară', 'vocabular': 'Vocabular',
    // Fizica
    'mecanica': 'Mecanică', 'termodinamica': 'Termodinamică', 'electricitate': 'Electricitate',
    'optica': 'Optică', 'fizica-nucleara': 'Fizică nucleară', 'unde': 'Unde și oscilații',
    // Chimie
    'chimie-generala': 'Chimie generală', 'chimie-organica': 'Chimie organică',
    'chimie-anorganica': 'Chimie anorganică', 'reactii-chimice': 'Reacții chimice',
    'tabelul-periodic': 'Tabelul periodic', 'biochimie': 'Biochimie',
    // Biologie
    'celula': 'Celula', 'genetica': 'Genetică', 'anatomie': 'Anatomie',
    'ecologie': 'Ecologie', 'evolutie': 'Evoluție', 'botanica': 'Botanică',
    // Istorie
    'istoria-romaniei': 'Istoria României', 'istoria-universala': 'Istoria universală',
    'razboaie': 'Războaie', 'personalitati': 'Personalități',
    'revolutii': 'Revoluții', 'civilizatii-antice': 'Civilizații antice',
    // Geografie
    'geografia-romaniei': 'Geografia României', 'continente': 'Continente',
    'clima': 'Climă și vegetație', 'relief': 'Relief',
    'geografie-economica': 'Geografie economică', 'hidrografie': 'Hidrografie',
    // Informatica
    'programare': 'Programare', 'algoritmi': 'Algoritmi',
    'baze-de-date': 'Baze de date', 'retele': 'Rețele',
    'sisteme-de-operare': 'Sisteme de operare', 'web': 'Dezvoltare web',
  };

  for (const [slug, kws] of Object.entries(chapterDefs)) {
    chapters[slug] = { nume: chapterNames[slug] || slug, descriere: '', queries: [] };
  }
  for (const [slug, info] of Object.entries(defaults)) {
    if (!chapters[slug]) chapters[slug] = { nume: info.nume, descriere: info.descriere, queries: [] };
  }

  // Ensure at least a 'diverse' chapter
  if (!chapters['diverse']) chapters['diverse'] = { nume: 'Alte teme', descriere: 'Alte teme.', queries: [] };

  for (const query of queries) {
    const ql = query.toLowerCase();
    let assigned = false;

    for (const [capSlug, kws] of Object.entries(keywords)) {
      if (kws.some(kw => ql.includes(kw))) {
        if (!chapters[capSlug]) chapters[capSlug] = { nume: capSlug, descriere: '', queries: [] };
        chapters[capSlug].queries.push(query);
        assigned = true;
        break;
      }
    }

    if (!assigned) {
      // Put in 'diverse' or first available chapter
      const diverseKey = Object.keys(chapters).find(k => k.includes('divers')) || Object.keys(chapters)[0] || 'diverse';
      if (!chapters[diverseKey]) chapters[diverseKey] = { nume: 'Diverse', descriere: 'Alte teme.', queries: [] };
      chapters[diverseKey].queries.push(query);
    }
  }

  // Build materie
  allMaterii.push({
    id: mInfo.slug, slug: mInfo.slug, nume: mInfo.nume, emoji: mInfo.slug,
    descriere: `${Object.keys(chapters).length} capitole cu explicații detaliate.`,
    subcategorii: Object.keys(chapters),
    metaTitle: `${mInfo.nume} - Explicații | explicate.ro`,
    metaDescription: `Explicații de ${mInfo.nume.toLowerCase()} cu exemple practice.`,
    continut: ['Explicații de ' + mInfo.nume.toLowerCase() + ' organizate pe capitole, cu răspunsuri la cele mai căutate întrebări.'],
  });

  // Build capitole & articole
  const articole = [];
  const slugSet = new Set();

  for (const [capSlug, capData] of Object.entries(chapters)) {
    if (!capData.queries?.length) continue;

    allCapitole.push({
      id: `${mInfo.slug}-${capSlug}`, slug: capSlug,
      nume: capData.nume || capSlug, materieSlug: mInfo.slug, materieNume: mInfo.nume,
      descriere: capData.descriere || `${capData.nume || capSlug} - ${mInfo.nume}.`,
      continut: [`${capData.nume || capSlug} acoperă ${capData.queries.length} teme din ${mInfo.nume.toLowerCase()}.`],
      metaTitle: `${capData.nume || capSlug} - ${mInfo.nume} | explicate.ro`,
      metaDescription: capData.descriere || `Explicații ${mInfo.nume.toLowerCase()}.`,
    });

    for (const query of capData.queries) {
      let titlu = query.charAt(0).toUpperCase() + query.slice(1);
      const isQuestion = /^(ce |cum |care |cand |cat |cate |de ce |unde |cine |la ce |in ce |pentru ce |cu ce |what |how |why |when |where |who )/i.test(titlu);
      if (isQuestion && !titlu.endsWith('?')) titlu += '?';
      if (!isQuestion && titlu.endsWith('?')) titlu = titlu.slice(0, -1);

      const slug = slugify(titlu);
      if (slugSet.has(slug) || slug.length < 5) continue;
      slugSet.add(slug);

      articole.push({
        slug, titlu, materieSlug: mInfo.slug, capitolSlug: capSlug,
        intro: 'Conținut va fi generat cu Gemini.',
        sectiuni: [{ titlu: 'Explicație', tip: 'text', items: [{ text: 'Placeholder.' }] }],
        concluzie: 'Placeholder.',
        relate: [],
        metaTitle: `${titlu.replace('?', '')} - ${mInfo.nume} | explicate.ro`,
        metaDescription: `${titlu.replace('?', '')}. Explicație clară.`,
      });
    }
  }

  writeFileSync(resolve(dataDir, `articole-${mInfo.slug}.json`), JSON.stringify(articole, null, 2));
  console.log(`${mInfo.slug}: ${articole.length} articole (${Object.keys(chapters).length} capitole)`);
  totalArticole += articole.length;
}

writeFileSync(resolve(dataDir, 'materii.json'), JSON.stringify(allMaterii, null, 2));
writeFileSync(resolve(dataDir, 'capitole.json'), JSON.stringify(allCapitole, null, 2));

console.log(`\nmaterii.json: ${allMaterii.length} materii`);
console.log(`capitole.json: ${allCapitole.length} capitole`);
console.log(`Total: ${totalArticole} articole`);
