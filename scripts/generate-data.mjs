/**
 * Generates structure data for explicate.ro
 * Content will be filled by Gemini API separately.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
mkdirSync(dataDir, { recursive: true });

function slugify(text) {
  return text.toLowerCase()
    .replace(/[ăâ]/g, 'a').replace(/[î]/g, 'i').replace(/[ș]/g, 's').replace(/[ț]/g, 't')
    .replace(/[é]/g, 'e').replace(/\?/g, '').replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

// ═══════════════════════════════════════════════════════════════
// MATERII (SUBJECTS)
// ═══════════════════════════════════════════════════════════════

const MATERII = [
  {
    id: 'matematica', slug: 'matematica', nume: 'Matematică', emoji: '📐',
    descriere: 'Aritmetică, algebră, geometrie, analiză matematică și statistică.',
    subcategorii: ['aritmetica', 'algebra', 'geometrie', 'analiza-matematica', 'probabilitati-si-statistica', 'trigonometrie'],
    metaTitle: 'Matematică - Explicații și Exerciții Rezolvate',
    metaDescription: 'Explicații clare de matematică: aritmetică, algebră, geometrie, analiză, trigonometrie și statistică.',
    continut: [
      'Matematica stă la baza tuturor științelor exacte. De la calculul mental de zi cu zi până la ecuațiile care descriu universul, totul se construiește pe aceleași principii logice. Diferența dintre un elev care se chinuie și unul care înțelege e aproape întotdeauna o explicație bună la momentul potrivit.',
      'Această pagină acoperă toate capitolele de matematică din programa școlară românească: aritmetică (operații cu numere, fracții, procente), algebră (ecuații, funcții, matrice), geometrie (arii, volume, teoreme), analiză matematică (limite, derivate, integrale), trigonometrie și statistică.',
      'Fiecare explicație pornește de la întrebarea concretă pe care o ai, nu de la teorie abstractă. Dacă nu știi cum să rezolvi o ecuație de gradul 2, mergi direct la articolul respectiv și găsești formula, pașii de rezolvare și exemple concrete pe care le poți aplica imediat.',
      'Am organizat totul pe capitole, de la cele mai simple concepte de aritmetică până la analiză matematică. Poți naviga prin cuprinsul de mai jos sau folosi căutarea pentru a găsi exact ce ai nevoie.',
      'Nu contează dacă ești în clasa a 5-a sau pregătești bacalaureatul. Explicațiile sunt scrise clar, fără jargon inutil, cu accent pe înțelegere reală, nu pe memorare.',
    ],
  },
  {
    id: 'romana', slug: 'romana', nume: 'Limba Română', emoji: '📖',
    descriere: 'Gramatică, literatură, compuneri, analiză literară și ortografie.',
    subcategorii: ['gramatica', 'ortografie', 'literatura', 'compuneri', 'analiza-literara', 'vocabular'],
    metaTitle: 'Limba Română - Gramatică, Literatură și Compuneri',
    metaDescription: 'Explicații de limba română: gramatică, ortografie, literatură, analiză literară și compuneri.',
    continut: [
      'Limba română e materia pe care o folosim zilnic dar pe care puțini o înțeleg cu adevărat. Între a vorbi corect și a ști de ce e corect e o diferență mare, iar aici acoperim exact acea diferență.',
      'Gramatica românească are reguli clare dar și excepții care derutează. De la părțile de vorbire la analiza sintactică, de la ortografie la punctuație, fiecare regulă e explicată cu exemple din limbajul real, nu din manuale.',
      'Pe lângă gramatică, acoperim și literatura română: curente literare, specii, figuri de stil și analiză de text. Fiecare articol de analiză literară merge dincolo de rezumatul de pe internet și explică de ce contează un text, nu doar ce se întâmplă în el.',
      'Secțiunea de compuneri te ajută să structurezi un eseu argumentativ, o compunere descriptivă sau o scrisoare oficială. Nu îți dăm texte de copiat, ci te învățăm cum să construiești unul propriu.',
      'Fie că pregătești un test, bacalaureatul sau vrei să scrii mai bine, aici găsești explicații pe care le poți aplica imediat.',
    ],
  },
  {
    id: 'fizica', slug: 'fizica', nume: 'Fizică', emoji: '⚡',
    descriere: 'Mecanică, termodinamică, electricitate, optică și fizică nucleară.',
    subcategorii: ['mecanica', 'termodinamica', 'electricitate', 'optica', 'fizica-nucleara', 'unde-si-oscilatii'],
    metaTitle: 'Fizică - Explicații, Formule și Probleme Rezolvate',
    metaDescription: 'Explicații de fizică: mecanică, termodinamică, electricitate, optică și unde. Cu formule și exemple.',
    continut: [
      'Fizica răspunde la cele mai fundamentale întrebări: de ce cade un măr, cum funcționează un motor, de ce e cerul albastru. Fiecare fenomen din viața ta de zi cu zi are o explicație fizică, iar odată ce o înțelegi, lumea devine mult mai logică.',
      'Pe această pagină acoperim mecanica (mișcare, forțe, energie), termodinamica (căldură, temperatură), electricitatea (curent, circuite, magnetism), optica (lumină, lentile) și fizica nucleară.',
      'Formulele sunt explicate pas cu pas, nu doar listate. Pentru fiecare formulă înțelegi ce reprezintă fiecare termen, în ce situații o aplici și cum verifici rezultatul. Exemplele numerice sunt alese din situații reale, nu din probleme artificiale.',
      'Fizica de liceu se construiește progresiv. Dacă nu înțelegi cinematica, dinamica va fi imposibilă. De aceea, articolele sunt organizate logic, de la simplu la complex, în cadrul fiecărui capitol.',
      'Fie că ai nevoie de o formulă rapidă sau de o explicație completă a unui fenomen, navighează prin capitolele de mai jos.',
    ],
  },
  {
    id: 'chimie', slug: 'chimie', nume: 'Chimie', emoji: '🧪',
    descriere: 'Chimie generală, chimie organică, chimie anorganică și biochimie.',
    subcategorii: ['chimie-generala', 'chimie-organica', 'chimie-anorganica', 'reactii-chimice', 'tabelul-periodic', 'biochimie'],
    metaTitle: 'Chimie - Explicații, Reacții și Elemente',
    metaDescription: 'Explicații de chimie: reacții chimice, chimie organică, anorganică, tabelul periodic și biochimie.',
    continut: [
      'Chimia explică din ce e făcută materia și cum interacționează substanțele între ele. E materia care face legătura între fizică și biologie, iar înțelegerea ei deschide ușa spre medicină, farmacie, inginerie chimică și mult mai mult.',
      'Aici acoperim chimia generală (atom, molecule, legături), chimia anorganică (metale, nemetale, oxizi, acizi, baze, săruri), chimia organică (hidrocarburi, alcooli, acizi carboxilici) și biochimia (proteine, lipide, ADN).',
      'Echilibrarea ecuațiilor chimice, calculul stoechiometric, tipurile de reacții - toate sunt explicate cu metode clare pe care le poți replica singur. Fiecare articol include ecuații scrise corect și pași de rezolvare.',
      'Tabelul periodic nu e doar un poster pe perete. Fiecare element are o poveste, proprietăți specifice și reacții predictibile. Articolele din secțiunea dedicată te ajută să înțelegi logica din spatele organizării elementelor.',
      'Navighează prin capitolele de mai jos și alege tema care te interesează.',
    ],
  },
  {
    id: 'biologie', slug: 'biologie', nume: 'Biologie', emoji: '🧬',
    descriere: 'Celula, genetică, anatomie umană, ecologie și evoluție.',
    subcategorii: ['celula', 'genetica', 'anatomie', 'ecologie', 'evolutie', 'botanica'],
    metaTitle: 'Biologie - Explicații despre Viață, Celulă și Genetică',
    metaDescription: 'Explicații de biologie: celula, genetică, anatomie umană, ecologie, evoluție și botanică.',
    continut: [
      'Biologia studiază viața în toate formele ei, de la bacterii microscopice la ecosisteme care acoperă continente întregi. E materia care explică cum funcționează corpul tău, de ce moștenim anumite trăsături și cum interacționează speciile între ele.',
      'Pagina acoperă celula (structură, organite, diviziune), genetica (ADN, gene, ereditate, mutații), anatomia umană (sisteme și aparate), ecologia (ecosisteme, lanțuri trofice, biodiversitate), evoluția și botanica.',
      'Fiecare articol de anatomie explică nu doar ce face un organ, ci cum funcționează la nivel celular și de ce eșuează în anumite boli. Explicațiile de genetică pornesc de la ADN și ajung la aplicații practice ca ingineria genetică.',
      'Articolele de ecologie leagă concepte din toate celelalte capitole pentru a arăta cum funcționează viața la scară mare: de ce dispariția unei specii afectează un ecosistem întreg.',
      'Alege capitolul care te interesează din cuprinsul de mai jos.',
    ],
  },
  {
    id: 'istorie', slug: 'istorie', nume: 'Istorie', emoji: '🏛️',
    descriere: 'Istoria României, istoria universală, evenimente și personalități.',
    subcategorii: ['istoria-romaniei', 'istoria-universala', 'razboaie', 'personalitati', 'revolutii', 'civilizatii-antice'],
    metaTitle: 'Istorie - Evenimente, Personalități și Epoci Istorice',
    metaDescription: 'Explicații de istorie: România, istoria universală, războaie, revoluții și civilizații antice.',
    continut: [
      'Istoria nu e o listă de date și evenimente de memorat. E povestea a cum am ajuns unde suntem azi - fiecare decizie, fiecare conflict, fiecare descoperire a modelat lumea în care trăim.',
      'Aici acoperim istoria României (de la daci și romani la revoluția din 1989 și integrarea europeană), istoria universală (civilizații antice, Renașterea, Iluminismul, războaiele mondiale), personalități care au schimbat cursul istoriei și revoluțiile care au redefinit societăți.',
      'Fiecare articol explică nu doar ce s-a întâmplat, ci de ce s-a întâmplat. Ce cauze au dus la un conflict, ce consecințe a avut o revoluție, de ce o personalitate a luat deciziile pe care le-a luat.',
      'Evenimentele sunt prezentate în context. Un război nu apare din nimic - are cauze economice, politice și sociale care se acumulează. Articolele te ajută să vezi aceste conexiuni.',
      'Navighează prin perioadele și temele de mai jos.',
    ],
  },
  {
    id: 'geografie', slug: 'geografie', nume: 'Geografie', emoji: '🌍',
    descriere: 'Geografia României, continente, climă, relief și geografie economică.',
    subcategorii: ['geografia-romaniei', 'continente', 'clima-si-vegetatie', 'relief', 'geografie-economica', 'hidrografie'],
    metaTitle: 'Geografie - România, Continente, Climă și Relief',
    metaDescription: 'Explicații de geografie: România, continente, climă, relief, hidrografie și geografie economică.',
    continut: [
      'Geografia explică de ce plouă mai mult în vest, de ce munții sunt mai înalți în unele zone, de ce unele țări sunt bogate și altele nu. E materia care leagă știința de economie și politică prin prisma spațiului fizic.',
      'Acoperim geografia României (Carpații, Dunărea, Delta, clima, resursele), continentele lumii, climatul și vegetația, relieful (cum se formează munții, vulcanii, cutremurele), hidrografia și geografia economică.',
      'Articolele despre România includ date concrete: altitudini, lungimi de râuri, suprafețe, populație. Nu generalități, ci informații pe care le poți folosi direct.',
      'Geografia fizică se îmbină cu cea economică pentru a explica de ce anumite orașe cresc, de ce unele regiuni atrag investiții și cum schimbările climatice afectează agricultura.',
      'Alege capitolul de mai jos care te interesează.',
    ],
  },
  {
    id: 'informatica', slug: 'informatica', nume: 'Informatică', emoji: '💻',
    descriere: 'Programare, algoritmi, baze de date, rețele și sisteme de operare.',
    subcategorii: ['programare', 'algoritmi', 'baze-de-date', 'retele', 'sisteme-de-operare', 'web'],
    metaTitle: 'Informatică - Programare, Algoritmi și Baze de Date',
    metaDescription: 'Explicații de informatică: programare, algoritmi, baze de date, rețele și dezvoltare web.',
    continut: [
      'Informatica e limba în care funcționează lumea modernă. De la aplicația de pe telefon la sistemul bancar, totul se bazează pe programare, algoritmi și baze de date. Înțelegerea acestor concepte te pregătește pentru orice carieră din tech.',
      'Aici acoperim programarea (variabile, funcții, clase, paradigme), algoritmii (sortare, căutare, grafuri, programare dinamică), bazele de date (SQL, normalizare), rețele (TCP/IP, HTTP) și dezvoltare web.',
      'Explicațiile de programare sunt în C++ și Python, limbajele cele mai folosite în programa românească. Fiecare concept include cod funcțional pe care îl poți testa singur.',
      'Algoritmii sunt prezentați vizual: cum funcționează pas cu pas, ce complexitate au și când îi folosești. Nu memorezi pseudocod, ci înțelegi logica din spatele fiecărei abordări.',
      'Navighează prin capitolele de mai jos și alege subiectul care te interesează.',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// CAPITOLE (CHAPTERS/SUBCATEGORIES)
// ═══════════════════════════════════════════════════════════════

const CAPITOLE_DEF = {
  matematica: {
    'aritmetica': { nume: 'Aritmetică', descriere: 'Operații cu numere, fracții, procente, proporții.', continut: [
      'Aritmetica e fundația pe care se construiește toată matematica. Fără ea, algebra și geometria nu au sens. Aici înveți să lucrezi cu numere: adunare, scădere, înmulțire, împărțire, dar și concepte mai avansate ca fracțiile, procentele și proporțiile.',
      'Fracțiile sunt probabil cel mai dificil subiect din aritmetică. Adunarea fracțiilor cu numitori diferiți, simplificarea și transformarea în zecimale sunt operații care apar constant în matematica de liceu. Le explicăm pas cu pas, cu exemple clare.',
      'Procentele și proporțiile au aplicare directă în viața reală: reduceri la magazine, dobânzi bancare, statistici. Fiecare articol din acest capitol te ajută să rezolvi probleme concrete, nu doar exerciții abstracte.',
    ]},
    'algebra': { nume: 'Algebră', descriere: 'Ecuații, inecuații, funcții, polinoame, matrice.', continut: [
      'Algebra e limbajul matematic prin care rezolvăm probleme cu necunoscute. De la ecuații simple de gradul 1 până la sisteme de ecuații, funcții și matrice, fiecare concept se construiește pe cel anterior.',
      'Ecuațiile de gradul 2 și discriminantul sunt punctul central al algebrei de liceu. Funcțiile (liniară, pătratică, exponențială, logaritmică) descriu relații între mărimi și sunt esențiale pentru fizică și economie.',
      'Matricele și determinanții apar în clasa a XI-a și sunt baza pentru algebra liniară din facultate. Progresiile aritmetice și geometrice completează tabloul algebric necesar pentru bacalaureat.',
    ]},
    'geometrie': { nume: 'Geometrie', descriere: 'Figuri, arii, volume, teoreme, geometrie analitică.', continut: [
      'Geometria e matematica formelor și spațiului. De la calculul ariei unui triunghi la volumul unei sfere, de la teorema lui Pitagora la geometria analitică, acest capitol acoperă tot ce ai nevoie.',
      'Formulele de arii și volume sunt cele mai căutate în geometrie. Fiecare formulă e explicată vizual: ce reprezintă fiecare termen, cum o aplici și cum verifici rezultatul. Nu memorezi formule, ci înțelegi de unde vin.',
      'Teoremele fundamentale (Pitagora, Thales, sinusurilor, cosinusurilor) sunt prezentate cu demonstrații intuitive și exemple de aplicare. Geometria analitică face legătura dintre geometrie și algebră prin coordonate.',
    ]},
    'analiza-matematica': { nume: 'Analiză matematică', descriere: 'Limite, derivate, integrale, serii.', continut: [
      'Analiza matematică e vârful matematicii de liceu. Limitele, derivatele și integralele sunt instrumentele cu care descriem schimbarea: viteza unui obiect, panta unei curbe, aria sub un grafic.',
      'Derivata îți spune cât de repede se schimbă o funcție. Integrala face operația inversă: reconstruiește funcția din rata de schimbare. Împreună, sunt cele mai puternice instrumente matematice.',
      'Acest capitol pornește de la limite (baza întregii analize) și avansează pas cu pas prin derivate, studiul funcțiilor, integrale și aplicații. Fiecare regulă de derivare și integrare e explicată cu exemple rezolvate.',
    ]},
    'probabilitati-si-statistica': { nume: 'Probabilități și statistică', descriere: 'Probabilități, combinări, permutări, medie, mediană.', continut: [
      'Probabilitățile și statistica te învață să gândești în termeni de șanse și tendințe. Combinările, permutările și aranjamentele sunt instrumente de numărare care apar în probabilități și în informatică.',
      'Media, mediana, modul și deviația standard descriu seturi de date. Distribuția normală explică de ce majoritatea valorilor se grupează în jurul mediei. Aceste concepte sunt fundamentale pentru orice domeniu care lucrează cu date.',
    ]},
    'trigonometrie': { nume: 'Trigonometrie', descriere: 'Funcții trigonometrice, identități, ecuații trigonometrice.', continut: [
      'Trigonometria conectează unghiurile cu lungimile. Sinusul, cosinusul și tangenta descriu relații în triunghiuri și pe cercul trigonometric. Aceste funcții apar peste tot: fizică, inginerie, grafică pe calculator.',
      'Formulele de reducere, identitățile trigonometrice și ecuațiile trigonometrice sunt subiecte frecvente la bacalaureat. Fiecare e explicat cu metoda de rezolvare pas cu pas și exemple variate.',
    ]},
  },
  romana: {
    'gramatica': { nume: 'Gramatică', descriere: 'Părți de vorbire, analiză gramaticală, sintaxă.', continut: [
      'Gramatica limbii române are un sistem logic de reguli care guvernează cum formăm și combinăm cuvintele. Părțile de vorbire (substantiv, adjectiv, verb, adverb, pronume, prepoziție, conjuncție, interjecție) sunt blocurile de bază.',
      'Analiza sintactică - identificarea subiectului, predicatului, atributului, complementelor - e abilitatea centrală cerută la examenele de română. Fiecare funcție sintactică e explicată cu exemple din propoziții reale, nu din exemple artificiale.',
      'Sintaxa frazei (propoziții principale, subordonate, coordonate) completează tabloul gramatical. Înțelegerea structurii frazei te ajută nu doar la examene, ci și la scrierea clară și corectă.',
    ]},
    'ortografie': { nume: 'Ortografie', descriere: 'Reguli de scriere, cratimă, virgulă, diacritice.', continut: [
      'Ortografia românească are reguli precise dar și excepții care creează confuzie. Cratima, virgula, scrierea cu î sau â, diferența între "sa" și "s-a" - sunt greșeli pe care le fac și adulții.',
      'Fiecare regulă e explicată cu contextul în care se aplică și cu exemple contrastive: când e corect și când e greșit. Memorezi mai ușor o regulă când vezi diferența clară între variantele corecte și cele incorecte.',
    ]},
    'literatura': { nume: 'Literatură', descriere: 'Curente literare, genuri, specii, autori.', continut: [
      'Literatura română acoperă curente literare de la clasicism și romantism la modernism și postmodernism. Fiecare curent e explicat prin trăsături definitorii, autori reprezentativi și opere cheie.',
      'Genurile și speciile literare (nuvelă, roman, poezie lirică, baladă, basm, dramă) au reguli proprii. Înțelegerea lor te ajută să analizezi orice text literar și să scrii eseuri argumentative corecte.',
    ]},
    'compuneri': { nume: 'Compuneri', descriere: 'Eseuri, argumentative, descriptive, narative.', continut: [
      'Compunerile sunt partea practică a limbii române: aplici ce știi din gramatică și literatură într-un text propriu. Eseul argumentativ, compunerea descriptivă, cea narativă - fiecare are o structură clară pe care o poți învăța.',
      'Nu îți oferim texte de copiat. Îți arătăm cum construiești un argument, cum structurezi o introducere, cum dezvolți un paragraf și cum închei fără clișee. Tehnici pe care le aplici la orice subiect.',
    ]},
    'analiza-literara': { nume: 'Analiză literară', descriere: 'Figuri de stil, teme, motive, personaje.', continut: [
      'Analiza literară înseamnă să decodifici un text: ce vrea să spună autorul, cum o spune și de ce contează. Figurile de stil (metaforă, comparație, personificare, epitet, hiperbolă) sunt instrumentele autorului.',
      'Tema, motivul literar, perspectiva narativă, conflictul și construcția personajului sunt concepte pe care le aplici la orice operă. Fiecare e explicat cu exemple din texte studiate în școală.',
    ]},
    'vocabular': { nume: 'Vocabular', descriere: 'Sinonime, antonime, omonime, paronime, neologisme.', continut: [
      'Vocabularul limbii române include relații între cuvinte (sinonime, antonime, omonime, paronime), împrumuturi (neologisme), termeni vechi (arhaisme) și termeni regionali. Fiecare categorie e explicată cu exemple concrete.',
      'Câmpurile lexicale și familiile de cuvinte te ajută să înțelegi cum se organizează vocabularul și cum derivarea creează cuvinte noi din rădăcini existente.',
    ]},
  },
  fizica: {
    'mecanica': { nume: 'Mecanică', descriere: 'Cinematică, dinamică, lucru mecanic, energie.', continut: [
      'Mecanica studiază mișcarea corpurilor și forțele care o produc. Cinematica descrie cum se mișcă un corp (viteză, accelerație, traiectorie), iar dinamica explică de ce se mișcă (forțe, legile lui Newton).',
      'Energia cinetică, energia potențială și conservarea energiei sunt concepte care leagă mecanica de restul fizicii. Lucrul mecanic și puterea mecanică au aplicații directe în inginerie.',
      'Fiecare formulă e prezentată cu unitățile de măsură, condițiile de aplicare și exemple numerice din situații reale.',
    ]},
    'termodinamica': { nume: 'Termodinamică', descriere: 'Căldură, temperatură, principiile termodinamicii.', continut: [
      'Termodinamica studiază căldura, temperatura și transformarea energiei. Principiile termodinamicii explică de ce gheața se topește, cum funcționează un frigider și de ce un motor nu poate fi 100% eficient.',
      'Căldura specifică, căldura latentă, dilatarea termică și transformările gazului ideal sunt concepte explicate cu formule și exemple practice.',
    ]},
    'electricitate': { nume: 'Electricitate', descriere: 'Curent, rezistență, circuite, electromagnetism.', continut: [
      'Electricitatea e probabil cel mai practic capitol din fizică. Curentul electric, tensiunea, rezistența și legea lui Ohm stau la baza oricărui circuit electric din viața ta de zi cu zi.',
      'Circuitele serie și paralel, puterea și energia electrică, condensatorii și inducția electromagnetică sunt explicate pas cu pas, cu scheme de circuit și calcule.',
    ]},
    'optica': { nume: 'Optică', descriere: 'Lumină, reflexie, refracție, lentile, oglinzi.', continut: [
      'Optica studiază lumina și cum interacționează cu materia. Reflexia, refracția, lentilele și oglinzile sunt fenomene pe care le întâlnești zilnic: ochelari, camere foto, microscoape.',
      'Fiecare fenomen optic e explicat cu diagrame de raze și formule de calcul. Dispersia luminii, difracția și interferența sunt incluse pentru nivelul de liceu.',
    ]},
    'fizica-nucleara': { nume: 'Fizică nucleară', descriere: 'Radioactivitate, fisiune, fuziune, particule.', continut: [
      'Fizica nucleară studiază nucleul atomic: radioactivitatea, fisiunea (spargerea nucleelor grele) și fuziunea (unirea nucleelor ușoare). Aceste procese produc energia din centralele nucleare și din Soare.',
      'Dezintegrarea radioactivă, timpul de înjumătățire și particulele elementare sunt concepte explicate accesibil, fără a simplifica excesiv.',
    ]},
    'unde-si-oscilatii': { nume: 'Unde și oscilații', descriere: 'Unde mecanice, unde electromagnetice, sunet.', continut: [
      'Undele transportă energie fără să transporte materie. Sunetul, lumina, undele seismice - toate urmează aceleași principii. Frecvența, lungimea de undă, amplitudinea și viteza sunt mărimile fundamentale.',
      'Oscilațiile (pendulul, resortul) sunt sursa undelor. Rezonanța, efectul Doppler și undele staționare au aplicații practice directe.',
    ]},
  },
  chimie: {
    'chimie-generala': { nume: 'Chimie generală', descriere: 'Atomul, legături chimice, stări de agregare.', continut: [
      'Chimia generală pornește de la atom: protoni, neutroni, electroni, configurație electronică. Modul în care electronii se aranjează determină proprietățile chimice ale fiecărui element.',
      'Legăturile chimice (covalentă, ionică, metalică) explică de ce atomii se unesc și ce proprietăți au substanțele rezultate. Masa molară și molul sunt instrumentele de calcul esențiale.',
    ]},
    'chimie-organica': { nume: 'Chimie organică', descriere: 'Hidrocarburi, alcooli, acizi, esteri.', continut: [
      'Chimia organică studiază compușii pe bază de carbon. Hidrocarburile (alcani, alchene, alchine, arene) sunt scheletul pe care se construiesc alcoolii, aldehidele, cetonele, acizii carboxilici și esterii.',
      'Fiecare clasă de compuși e prezentată cu formula generală, denumire, proprietăți fizice și chimice, reacții caracteristice și exemple de aplicare în viața reală.',
    ]},
    'chimie-anorganica': { nume: 'Chimie anorganică', descriere: 'Metale, nemetale, oxizi, acizi, baze, săruri.', continut: [
      'Chimia anorganică acoperă elementele și compușii lor: oxizi (bazici, acizi, amfoteri), acizi, baze și săruri. Reacțiile de neutralizare, precipitare și oxidare-reducere sunt tipurile fundamentale.',
      'Metalele și nemetalele au proprietăți distincte care decurg din structura lor atomică. Coroziunea, galvanizarea și electroliza sunt aplicații practice ale chimiei anorganice.',
    ]},
    'reactii-chimice': { nume: 'Reacții chimice', descriere: 'Tipuri de reacții, echilibrare, stoechiometrie.', continut: [
      'Echilibrarea ecuațiilor chimice e prima abilitate practică din chimie. Metoda algebrică și metoda electronilor sunt cele două abordări standard, iar fiecare e explicată pas cu pas.',
      'Stoechiometria transformă ecuațiile în calcule: câte grame de produs obții din câte grame de reactant. Viteza de reacție și echilibrul chimic completează tabloul.',
    ]},
    'tabelul-periodic': { nume: 'Tabelul periodic', descriere: 'Elemente, grupe, perioade, proprietăți periodice.', continut: [
      'Tabelul periodic organizează 118 elemente după numărul atomic. Grupele (coloanele) adună elementele cu proprietăți chimice similare, iar perioadele (rândurile) arată cum cresc straturile de electroni.',
      'Metalele alcaline, halogenii, gazele rare, metalele de tranziție - fiecare familie are proprietăți distincte explicate prin structura electronică.',
    ]},
    'biochimie': { nume: 'Biochimie', descriere: 'Proteine, lipide, glucide, enzime, ADN.', continut: [
      'Biochimia face legătura dintre chimie și biologie. Proteinele, lipidele, glucidele și acizii nucleici sunt moleculele care construiesc și operează orice organism viu.',
      'ATP-ul e moneda energetică a celulei, enzimele sunt catalizatorii biologici, iar ADN-ul stochează informația genetică. Fiecare moleculă e explicată structural și funcțional.',
    ]},
  },
  biologie: {
    'celula': { nume: 'Celula', descriere: 'Structura celulei, organite, mitoza, meioza.', continut: [
      'Celula e unitatea fundamentală a vieții. Fiecare organism viu e format din celule, de la bacterii unicelulare la corpul uman cu 37 de trilioane de celule. Membrana, citoplasma și nucleul sunt componentele de bază.',
      'Organitele celulare (mitocondrii, ribozomi, reticul endoplasmatic, aparat Golgi) au funcții specializate. Mitoza și meioza sunt cele două tipuri de diviziune celulară, fiecare cu rol distinct.',
    ]},
    'genetica': { nume: 'Genetică', descriere: 'ADN, ARN, gene, mutații, ereditate.', continut: [
      'Genetica explică cum se transmit trăsăturile de la părinți la urmași. ADN-ul conține instrucțiunile, genele sunt unitățile funcționale, iar cromozomii le organizează. Legile lui Mendel descriu modelele de moștenire.',
      'Mutațiile, ingineria genetică și clonarea sunt subiecte de actualitate care pornesc din aceleași principii fundamentale. Genotipul determină fenotipul, dar mediul joacă și el un rol.',
    ]},
    'anatomie': { nume: 'Anatomie', descriere: 'Sisteme și aparate ale corpului uman.', continut: [
      'Corpul uman funcționează ca un sistem integrat. Inima pompează sângele, plămânii fac schimbul de gaze, rinichii filtrează, ficatul metabolizează, iar sistemul nervos coordonează totul.',
      'Fiecare aparat (circulator, respirator, digestiv, excretor, nervos, endocrin, locomotor) e explicat cu structura, funcția și conexiunile cu celelalte sisteme.',
    ]},
    'ecologie': { nume: 'Ecologie', descriere: 'Ecosisteme, lanțuri trofice, biodiversitate.', continut: [
      'Ecologia studiază relațiile dintre organisme și mediul lor. Ecosistemele, lanțurile trofice, ciclurile biogeochimice și biodiversitatea sunt concepte care explică cum funcționează viața la scară mare.',
      'Efectul de seră, stratul de ozon, poluarea și dezvoltarea durabilă sunt teme actuale cu bază ecologică solidă.',
    ]},
    'evolutie': { nume: 'Evoluție', descriere: 'Selecție naturală, adaptare, speciere.', continut: [
      'Teoria evoluției prin selecție naturală, formulată de Darwin, explică diversitatea vieții pe Pământ. Adaptarea, specierea și extincția sunt mecanismele prin care speciile se transformă în timp.',
      'Fosilele, arborele filogenetic și dovezile moleculare susțin teoria evoluției cu date concrete din mai multe domenii științifice.',
    ]},
    'botanica': { nume: 'Botanică', descriere: 'Plante, fotosinteză, clasificare, reproducere.', continut: [
      'Botanica studiază plantele: structura lor (rădăcină, tulpină, frunze), fotosinteza (procesul care susține viața pe Pământ), reproducerea și clasificarea.',
      'Fotosinteza transformă CO2 și apă în glucoză și oxigen folosind lumina solară. Respirația celulară face procesul invers. Împreună, mențin echilibrul atmosferic.',
    ]},
  },
  istorie: {
    'istoria-romaniei': { nume: 'Istoria României', descriere: 'De la daci la România modernă.', continut: [
      'Istoria României acoperă peste 2000 de ani: civilizația dacică, cucerirea romană și formarea poporului român, Evul Mediu cu voievozii moldoveni și munteni, Unirea Principatelor (1859), Marea Unire (1918), perioada comunistă și Revoluția din 1989.',
      'Fiecare perioadă e prezentată cu cauzele, evenimentele cheie și consecințele pe termen lung. Personalitățile (Burebista, Decebal, Ștefan cel Mare, Mihai Viteazul, Cuza) sunt plasate în contextul lor istoric.',
    ]},
    'istoria-universala': { nume: 'Istoria universală', descriere: 'Civilizații, imperii, epoca modernă.', continut: [
      'Istoria universală conectează civilizațiile antice cu lumea modernă. Renașterea, Iluminismul, Revoluția Industrială, războaiele mondiale și Războiul Rece au modelat lumea în care trăim.',
      'Fiecare epocă e explicată prin cauze, evenimente și consecințe. Colonialismul, feudalismul, capitalismul și democrația sunt sisteme care au definit perioade întregi.',
    ]},
    'razboaie': { nume: 'Războaie', descriere: 'Conflicte majore și consecințele lor.', continut: [
      'Războaiele au remodelat granițe, au distrus imperii și au creat altele noi. De la bătăliile antice la cele două războaie mondiale, fiecare conflict are cauze specifice și consecințe de lungă durată.',
      'Articolele prezintă contextul politic, desfășurarea și urmările fiecărui conflict, cu accent pe impactul asupra civililor și reorganizarea geopolitică.',
    ]},
    'personalitati': { nume: 'Personalități', descriere: 'Lideri, inventatori, gânditori.', continut: [
      'Istoria e făcută de oameni. Lideri politici, comandanți militari, gânditori și revoluționari - fiecare a lăsat o amprentă pe cursul evenimentelor.',
      'Fiecare personalitate e prezentată în contextul epocii: ce a motivat-o, ce a realizat și ce impact a avut pe termen lung.',
    ]},
    'revolutii': { nume: 'Revoluții', descriere: 'Revoluții majore și mișcări sociale.', continut: [
      'Revoluțiile apar când tensiunile sociale, economice și politice ajung la un punct critic. Revoluția Franceză, Revoluția Americană, Primăvara Popoarelor și Revoluția Rusă au redefinit noțiunea de guvernare.',
      'Fiecare revoluție e analizată prin cauze, desfășurare, rezultate imediate și consecințe pe termen lung.',
    ]},
    'civilizatii-antice': { nume: 'Civilizații antice', descriere: 'Egipt, Grecia, Roma, Mesopotamia.', continut: [
      'Civilizațiile antice au pus bazele lumii moderne. Mesopotamia a inventat scrisul, Egiptul a construit piramidele, Grecia a creat democrația și filosofia, iar Roma a construit un imperiu care a durat un mileniu.',
      'Fiecare civilizație e prezentată cu realizările, organizarea socială, religia, arta și contribuțiile care au supraviețuit până azi.',
    ]},
  },
  geografie: {
    'geografia-romaniei': { nume: 'Geografia României', descriere: 'Relief, climă, hidrografie, resurse.', continut: [
      'România are o geografie remarcabil de diversă: Carpații formează un arc muntos central, flancat de dealuri, podișuri și câmpii. Dunărea traversează sudul și formează Delta - unicat mondial.',
      'Clima temperată, rețeaua deasă de râuri, resursele naturale (petrol, gaze, păduri, sol fertil) și biodiversitatea sunt prezentate cu date concrete: altitudini, lungimi, suprafețe.',
    ]},
    'continente': { nume: 'Continente', descriere: 'Europa, Asia, Africa, Americi, Oceania.', continut: [
      'Cele 7 continente diferă radical ca suprafață, climă, populație și dezvoltare economică. Asia e cel mai mare, Australia cel mai mic, Antarctica cel mai rece, Africa cel mai cald.',
      'Fiecare continent e prezentat cu trăsăturile fizice, demografice și economice esențiale.',
    ]},
    'clima-si-vegetatie': { nume: 'Climă și vegetație', descriere: 'Zone climatice, biome, fenomene meteo.', continut: [
      'Clima determină vegetația, iar vegetația influențează clima. Zonele climatice (ecuatorială, tropicală, temperată, polară) dictează ce crește și ce vietăți trăiesc în fiecare regiune.',
      'Biomele (pădure tropicală, savană, deșert, stepă, taiga, tundră) sunt ecosisteme mari determinate de climă. Efectul de seră și schimbările climatice modifică aceste tipare.',
    ]},
    'relief': { nume: 'Relief', descriere: 'Munți, câmpii, podișuri, vulcani.', continut: [
      'Relieful Pământului e modelat de forțe interne (tectonica plăcilor, vulcanism) și externe (eroziune, transport, sedimentare). Munții, câmpiile, podișurile și deltele sunt rezultatul acestor procese.',
      'Cutremurele, vulcanii și tsunami-urile sunt fenomene legate de tectonica plăcilor. Eroziunea apei, vântului și gheții modelează continuu suprafața terestră.',
    ]},
    'geografie-economica': { nume: 'Geografie economică', descriere: 'Resurse, industrii, comerț, populație.', continut: [
      'Geografia economică explică de ce unele regiuni prosperă și altele nu. Resursele naturale, infrastructura, poziția geografică și capitalul uman determină dezvoltarea economică.',
      'Globalizarea, urbanizarea, migrația și densitatea populației sunt fenomene cu cauze geografice și consecințe economice directe.',
    ]},
    'hidrografie': { nume: 'Hidrografie', descriere: 'Râuri, lacuri, mări, oceane.', continut: [
      'Apa acoperă 71% din suprafața Pământului. Oceanele, mările, râurile, lacurile și apele subterane formează hidrosfera. Ciclul apei conectează toate aceste componente.',
      'Bazinele hidrografice, debitele râurilor, salinitatea mărilor și ghețarii sunt concepte explicate cu date și exemple din România și din lume.',
    ]},
  },
  informatica: {
    'programare': { nume: 'Programare', descriere: 'C++, Python, variabile, structuri de control.', continut: [
      'Programarea înseamnă să dai instrucțiuni unui calculator într-un limbaj pe care îl înțelege. Variabilele stochează date, condițiile (if/else) controlează fluxul, buclele (for/while) repetă operații, iar funcțiile organizează codul.',
      'Programarea orientată pe obiecte (clase, moștenire, polimorfism) e paradigma dominantă în industrie. Fiecare concept e explicat cu cod funcțional în C++ și Python.',
    ]},
    'algoritmi': { nume: 'Algoritmi', descriere: 'Sortare, căutare, recursivitate, complexitate.', continut: [
      'Un algoritm e o secvență de pași care rezolvă o problemă. Algoritmii de sortare (bubble sort, selection sort, merge sort, quicksort) și de căutare (liniară, binară) sunt fundamentali.',
      'Complexitatea (notația Big O) măsoară cât de eficient e un algoritm. Recursivitatea, programarea dinamică și algoritmii pe grafuri (BFS, DFS) sunt subiecte avansate explicate accesibil.',
    ]},
    'baze-de-date': { nume: 'Baze de date', descriere: 'SQL, tabele, relații, normalizare.', continut: [
      'Bazele de date organizează informația în tabele legate prin relații. SQL (Structured Query Language) e limbajul standard pentru a interoga, insera, actualiza și șterge date.',
      'Cheile primare și străine, JOIN-urile, normalizarea și indexarea sunt concepte esențiale explicate cu exemple practice pe baze de date reale.',
    ]},
    'retele': { nume: 'Rețele', descriere: 'TCP/IP, HTTP, DNS, securitate.', continut: [
      'Rețelele de calculatoare conectează dispozitive pentru schimb de date. TCP/IP e protocolul fundamental, HTTP transferă pagini web, DNS traduce domenii în adrese IP.',
      'Routere, firewall-uri, VPN-uri și cloud computing sunt tehnologii explicate funcțional: ce fac, cum funcționează și de ce contează.',
    ]},
    'sisteme-de-operare': { nume: 'Sisteme de operare', descriere: 'Procese, memorie, fișiere, Linux.', continut: [
      'Sistemul de operare e softul care gestionează hardware-ul și oferă o platformă pentru aplicații. Procesele, thread-urile, managementul memoriei și sistemul de fișiere sunt funcțiile de bază.',
      'Linux, Windows și macOS au abordări diferite. Kernelul, shell-ul și interfața grafică sunt straturile unui sistem de operare.',
    ]},
    'web': { nume: 'Dezvoltare web', descriere: 'HTML, CSS, JavaScript, frameworks.', continut: [
      'Web-ul se construiește pe trei tehnologii: HTML (structura), CSS (aspectul) și JavaScript (interactivitatea). Fiecare e un limbaj distinct cu reguli proprii.',
      'Frontend vs backend, API-uri, framework-uri, responsive design și serverele web sunt concepte explicate practic, cu exemple de cod pe care le poți testa în browser.',
    ]},
  },
};

import { INTREBARI_EXTENDED } from './intrebari-extended.mjs';

// ═══════════════════════════════════════════════════════════════
// QUESTIONS PER CHAPTER (use extended version)
// ═══════════════════════════════════════════════════════════════

const INTREBARI = INTREBARI_EXTENDED; const _OLD_INTREBARI = {
  matematica: {
    'aritmetica': [
      'Cum aduni fracții cu numitori diferiți',
      'Cum înmulțești fracții',
      'Cum împarți fracții',
      'Cum transformi o fracție în procent',
      'Cum calculezi procentul dintr-un număr',
      'Ce este cel mai mare divizor comun',
      'Ce este cel mai mic multiplu comun',
      'Cum compari fracții',
      'Cum simplifici o fracție',
      'Ce sunt numerele prime',
      'Cum descompui un număr în factori primi',
      'Cum faci media aritmetică',
      'Ce este proporția directă',
      'Ce este proporția inversă',
      'Cum calculezi regula de trei simplă',
      'Cum transformi fracții în zecimale',
      'Cum faci operații cu numere negative',
      'Ce sunt numerele raționale',
      'Ce sunt numerele iraționale',
      'Cum calculezi radical din 2',
      'Cum calculezi puterea unui număr',
      'Ce este valoarea absolută',
      'Cum rezolvi probleme cu procente',
      'Ce sunt multiplii unui număr',
      'Ce sunt divizorii unui număr',
    ],
    'algebra': [
      'Cum rezolvi o ecuație de gradul 1',
      'Cum rezolvi o ecuație de gradul 2',
      'Ce este discriminantul',
      'Cum aplici formula lui Viète',
      'Cum rezolvi un sistem de ecuații',
      'Cum rezolvi o inecuație de gradul 1',
      'Cum rezolvi o inecuație de gradul 2',
      'Ce este o funcție',
      'Ce este funcția liniară',
      'Ce este funcția pătratică',
      'Cum reprezinți graficul unei funcții',
      'Ce sunt polinoamele',
      'Cum faci împărțirea polinoamelor',
      'Ce este teorema restului',
      'Ce sunt matricele',
      'Cum aduni matrice',
      'Cum înmulțești matrice',
      'Ce este determinantul unei matrice',
      'Ce sunt numerele complexe',
      'Ce este modulul unui număr complex',
      'Cum rezolvi ecuații cu modul',
      'Ce este progresie aritmetică',
      'Ce este progresia geometrică',
      'Cum calculezi suma unei progresii',
      'Ce este logaritmul',
    ],
    'geometrie': [
      'Cum calculezi aria triunghiului',
      'Cum calculezi aria cercului',
      'Cum calculezi aria dreptunghiului',
      'Cum calculezi perimetrul cercului',
      'Ce este teorema lui Pitagora',
      'Cum calculezi volumul cubului',
      'Cum calculezi volumul cilindrului',
      'Cum calculezi volumul conului',
      'Cum calculezi volumul sferei',
      'Ce sunt dreptele paralele',
      'Ce sunt dreptele perpendiculare',
      'Cum calculezi aria trapezului',
      'Cum calculezi diagonala dreptunghiului',
      'Ce este simetria axială',
      'Ce este simetria centrală',
      'Cum calculezi aria unui poligon regulat',
      'Ce este cercul circumscris unui triunghi',
      'Ce este cercul înscris într-un triunghi',
      'Cum calculezi aria paralelogramului',
      'Ce este teorema lui Thales',
      'Cum calculezi distanța dintre două puncte',
      'Cum calculezi aria laterală a unui con',
      'Ce sunt triunghiurile asemenea',
      'Ce este mediana unui triunghi',
      'Cum calculezi înălțimea unui triunghi',
    ],
    'analiza-matematica': [
      'Ce este limita unei funcții',
      'Cum calculezi limita unei funcții',
      'Ce este derivata unei funcții',
      'Cum calculezi derivata',
      'Ce sunt regulile de derivare',
      'Ce este integrala nedefinită',
      'Ce este integrala definită',
      'Cum calculezi aria cu integrale',
      'Ce este continuitatea unei funcții',
      'Ce sunt punctele de extrem',
      'Cum studiezi monotonia unei funcții',
      'Ce este convexitatea și concavitatea',
      'Ce sunt punctele de inflexiune',
      'Cum reprezinți graficul cu derivata',
      'Ce sunt asimptotele unei funcții',
      'Ce este teorema lui Lagrange',
      'Ce este teorema lui Rolle',
      'Cum calculezi primitive uzuale',
      'Ce este regula lui L\'Hôpital',
      'Ce sunt seriile de numere',
    ],
    'probabilitati-si-statistica': [
      'Ce este probabilitatea unui eveniment',
      'Cum calculezi probabilitatea',
      'Ce sunt permutările',
      'Ce sunt combinările',
      'Ce sunt aranjamentele',
      'Ce este media aritmetică',
      'Ce este mediana',
      'Ce este modul statistică',
      'Ce este deviația standard',
      'Ce este distribuția normală',
      'Ce este probabilitatea condiționată',
      'Ce sunt evenimentele independente',
      'Cum aplici formula probabilității totale',
      'Ce este covarianța',
      'Ce este corelația',
    ],
    'trigonometrie': [
      'Ce este sinusul unui unghi',
      'Ce este cosinusul unui unghi',
      'Ce este tangenta unui unghi',
      'Ce este cercul trigonometric',
      'Cum rezolvi ecuații trigonometrice',
      'Ce sunt formulele de reducere',
      'Ce este teorema sinusurilor',
      'Ce este teorema cosinusurilor',
      'Cum calculezi aria cu sinus',
      'Ce sunt funcțiile trigonometrice inverse',
      'Ce sunt identitățile trigonometrice',
      'Cum convertești grade în radiani',
      'Ce sunt formulele de adunare trigonometrice',
      'Ce sunt formulele de dublare a unghiului',
    ],
  },
  romana: {
    'gramatica': [
      'Ce este substantivul', 'Ce este adjectivul', 'Ce este verbul', 'Ce este adverbul',
      'Ce este pronumele', 'Ce este prepoziția', 'Ce este conjuncția', 'Ce este interjecția',
      'Ce este subiectul', 'Ce este predicatul', 'Ce este atributul', 'Ce este complementul direct',
      'Ce este complementul indirect', 'Ce este complementul circumstanțial',
      'Ce sunt părțile principale de propoziție', 'Ce sunt părțile secundare de propoziție',
      'Ce este propoziția subordonată', 'Ce este propoziția principală',
      'Ce este fraza', 'Cum faci analiza sintactică',
      'Ce sunt timpurile verbului', 'Ce sunt modurile verbului',
      'Ce este diateza activă și pasivă', 'Ce sunt pronumele personale',
      'Ce este acordul gramatical',
    ],
    'ortografie': [
      'Când se pune cratima', 'Când se pune virgula', 'Când scriem î și când â',
      'Diferența între sa și s-a', 'Diferența între ia și i-a', 'Diferența între nai și n-ai',
      'Când scriem cu literă mare', 'Cum se despart cuvintele în silabe',
      'Diferența între sau și s-au', 'Diferența între cel și ce-l',
      'Cum se scrie corect într-un cuvânt sau doi', 'Când folosim punctul și virgula',
      'Diferența între la și l-a', 'Diferența între iau și i-au',
      'Cum se scriu numeralele', 'Când punem semnul exclamării',
    ],
    'literatura': [
      'Ce este romantismul', 'Ce este realismul', 'Ce este modernismul',
      'Ce este simbolismul', 'Ce este naturalismul', 'Ce este clasicismul',
      'Ce este nuvela', 'Ce este romanul', 'Ce este poezia lirică',
      'Ce este basmul', 'Ce este fabula', 'Ce este balada',
      'Ce este drama', 'Ce este comedia', 'Ce este tragedia',
    ],
    'compuneri': [
      'Cum scrii un eseu argumentativ', 'Cum scrii o compunere descriptivă',
      'Cum scrii o compunere narativă', 'Cum scrii o scrisoare oficială',
      'Cum faci un rezumat', 'Cum scrii o cerere', 'Cum scrii un CV',
      'Cum scrii o introducere bună', 'Cum scrii o concluzie bună',
      'Cum argumentezi o opinie',
    ],
    'analiza-literara': [
      'Ce este metafora', 'Ce este comparația', 'Ce este personificarea',
      'Ce este epiteful', 'Ce este hiperbola', 'Ce este antiteza',
      'Ce este alegoria', 'Ce este ironia', 'Ce este simbolul',
      'Ce este tema unei opere', 'Ce este motivul literar',
      'Cum analizezi un personaj literar', 'Ce este perspectiva narativă',
      'Ce este conflictul literar', 'Ce este incipit-ul',
    ],
    'vocabular': [
      'Ce sunt sinonimele', 'Ce sunt antonimele', 'Ce sunt omonimele',
      'Ce sunt paronimele', 'Ce sunt neologismele', 'Ce sunt arhaismele',
      'Ce sunt regionalismele', 'Ce sunt câmpurile lexicale', 'Ce sunt familiile de cuvinte',
      'Ce este etimologia', 'Ce sunt cuvintele compuse', 'Ce sunt derivatele',
    ],
  },
  fizica: {
    'mecanica': [
      'Ce este viteza', 'Ce este accelerația', 'Ce este forța',
      'Ce este legea I a lui Newton', 'Ce este legea II a lui Newton', 'Ce este legea III a lui Newton',
      'Ce este lucrul mecanic', 'Ce este energia cinetică', 'Ce este energia potențială',
      'Ce este conservarea energiei', 'Ce este impulsul', 'Ce este momentul forței',
      'Ce este frecarea', 'Ce este gravitația', 'Ce este presiunea',
      'Ce este densitatea', 'Ce este forța elastică', 'Ce este mișcarea circulară',
      'Cum calculezi forța centripetă', 'Ce este căderea liberă',
    ],
    'termodinamica': [
      'Ce este temperatura', 'Ce este căldura', 'Ce este capacitatea calorică',
      'Ce este principiul I al termodinamicii', 'Ce este principiul II al termodinamicii',
      'Ce este entropia', 'Ce sunt transformările termodinamice',
      'Ce este dilatarea termică', 'Cum funcționează motorul termic',
      'Ce este schimbarea stării de agregare', 'Ce este căldura specifică',
      'Ce este căldura latentă', 'Ce este gazul ideal',
    ],
    'electricitate': [
      'Ce este curentul electric', 'Ce este tensiunea electrică', 'Ce este rezistența electrică',
      'Ce este legea lui Ohm', 'Ce sunt circuitele serie', 'Ce sunt circuitele paralel',
      'Ce este puterea electrică', 'Ce este energia electrică',
      'Ce este câmpul electric', 'Ce este câmpul magnetic',
      'Ce este inducția electromagnetică', 'Ce este condensatorul',
      'Ce este legea lui Kirchhoff', 'Ce este forța electromotoare',
    ],
    'optica': [
      'Ce este reflexia luminii', 'Ce este refracția luminii', 'Ce sunt lentilele convergente',
      'Ce sunt lentilele divergente', 'Ce este oglinda plană', 'Ce este oglinda concavă',
      'Ce este dispersia luminii', 'Ce este difracția', 'Ce este interferența',
      'Ce este spectrul electromagnetic', 'Cum funcționează ochiul uman',
    ],
    'fizica-nucleara': [
      'Ce este radioactivitatea', 'Ce este fisiunea nucleară', 'Ce este fuziunea nucleară',
      'Ce sunt particulele elementare', 'Ce este dezintegrarea radioactivă',
      'Ce este masa atomică', 'Ce este numărul atomic',
      'Ce este energia nucleară', 'Ce este timpul de înjumătățire',
    ],
    'unde-si-oscilatii': [
      'Ce este o undă', 'Ce este frecvența', 'Ce este lungimea de undă',
      'Ce este amplitudinea', 'Ce este viteza sunetului', 'Ce este efectul Doppler',
      'Ce este rezonanța', 'Ce este pendulul simplu', 'Ce sunt undele stationare',
      'Ce este ultrasunetul',
    ],
  },
  chimie: {
    'chimie-generala': [
      'Ce este atomul', 'Ce este molecula', 'Ce sunt electronii',
      'Ce sunt protonii și neutronii', 'Ce este legătura covalentă',
      'Ce este legătura ionică', 'Ce este electronegativitatea',
      'Ce sunt stările de agregare', 'Ce este numărul de oxidare',
      'Ce este configurația electronică', 'Ce sunt orbitalii atomici',
      'Ce este masa molară', 'Ce este molul',
    ],
    'chimie-organica': [
      'Ce sunt hidrocarburile', 'Ce sunt alcanii', 'Ce sunt alchenele',
      'Ce sunt alchinele', 'Ce sunt arenele', 'Ce sunt alcoolii',
      'Ce sunt aldehidele', 'Ce sunt cetonele', 'Ce sunt acizii carboxilici',
      'Ce sunt esterii', 'Ce sunt aminoacizii', 'Ce este polimerizarea',
    ],
    'chimie-anorganica': [
      'Ce sunt oxizii', 'Ce sunt acizii', 'Ce sunt bazele', 'Ce sunt sărurile',
      'Ce sunt metalele', 'Ce sunt nemetalele', 'Ce sunt metaloidele',
      'Ce este oxidarea', 'Ce este reducerea', 'Ce este coroziunea',
    ],
    'reactii-chimice': [
      'Cum echilibrezi o ecuație chimică', 'Ce sunt reacțiile de combinare',
      'Ce sunt reacțiile de descompunere', 'Ce sunt reacțiile de substituție',
      'Ce sunt reacțiile de schimb dublu', 'Ce este viteza de reacție',
      'Ce este echilibrul chimic', 'Ce sunt catalizatorii',
      'Ce este reacția exotermă', 'Ce este reacția endotermă',
    ],
    'tabelul-periodic': [
      'Cum este organizat tabelul periodic', 'Ce sunt grupele principale',
      'Ce sunt perioadele', 'Ce sunt metalele alcaline',
      'Ce sunt metalele alcalino-pământoase', 'Ce sunt halogenii',
      'Ce sunt gazele rare', 'Ce sunt metalele de tranziție',
    ],
    'biochimie': [
      'Ce sunt proteinele', 'Ce sunt lipidele', 'Ce sunt glucidele',
      'Ce sunt enzimele', 'Ce este ADN-ul', 'Ce este ARN-ul',
      'Ce este ATP-ul', 'Ce este metabolismul',
    ],
  },
  biologie: {
    'celula': [
      'Ce este celula', 'Ce este membrana celulară', 'Ce este nucleul celulei',
      'Ce sunt mitocondriile', 'Ce este ribozomul', 'Ce este reticulul endoplasmatic',
      'Ce este aparatul Golgi', 'Ce este mitoza', 'Ce este meioza',
      'Ce este ciclul celular', 'Diferența între celula animală și vegetală',
      'Ce sunt lizozomii', 'Ce este citoplasma',
    ],
    'genetica': [
      'Ce este ADN-ul', 'Ce este ARN-ul', 'Ce este o genă', 'Ce este cromozomul',
      'Ce este mutația', 'Ce este ereditatea', 'Ce este genotipul',
      'Ce este fenotipul', 'Ce este dominanța genetică',
      'Ce sunt legile lui Mendel', 'Ce este clonarea', 'Ce este ingineria genetică',
    ],
    'anatomie': [
      'Cum funcționează inima', 'Cum funcționează plămânii', 'Cum funcționează rinichii',
      'Cum funcționează ficatul', 'Ce este sistemul nervos', 'Ce este sistemul digestiv',
      'Ce este sistemul circulator', 'Ce este sistemul respirator',
      'Ce este sistemul endocrin', 'Ce sunt mușchii', 'Ce sunt oasele',
      'Cum funcționează ochiul', 'Cum funcționează urechea',
    ],
    'ecologie': [
      'Ce este un ecosistem', 'Ce este lanțul trofic', 'Ce este biodiversitatea',
      'Ce este efectul de seră', 'Ce este stratul de ozon', 'Ce este poluarea',
      'Ce este deșertificarea', 'Ce sunt speciile pe cale de dispariție',
      'Ce este dezvoltarea durabilă', 'Ce este reciclarea',
    ],
    'evolutie': [
      'Ce este selecția naturală', 'Ce este adaptarea', 'Ce este specierea',
      'Ce este teoria evoluției', 'Cine a fost Darwin',
      'Ce sunt fosilele', 'Ce este arborele filogenetic',
      'Ce este coevoluția', 'Ce este extincția',
    ],
    'botanica': [
      'Ce este fotosinteza', 'Ce este respirația celulară', 'Cum se reproduce o plantă',
      'Ce sunt rădăcinile', 'Ce sunt tulpinile', 'Ce sunt frunzele',
      'Ce este polenizarea', 'Ce este germinația',
      'Diferența între monocotiledonate și dicotiledonate',
    ],
  },
  istorie: {
    'istoria-romaniei': [
      'Cine au fost dacii', 'Ce a fost Dacia', 'Cum s-a format poporul român',
      'Ce a fost Unirea Principatelor', 'Ce a fost Marea Unire din 1918',
      'Cine a fost Mihai Viteazul', 'Cine a fost Ștefan cel Mare',
      'Ce a fost Revoluția din 1989', 'Ce a fost comunismul în România',
      'Cum a intrat România în NATO', 'Cum a intrat România în UE',
      'Ce au fost războaiele dacilor cu romanii',
    ],
    'istoria-universala': [
      'Ce a fost Renașterea', 'Ce a fost Iluminismul', 'Ce a fost Revoluția Industrială',
      'Ce a fost Primul Război Mondial', 'Ce a fost Al Doilea Război Mondial',
      'Ce a fost Războiul Rece', 'Ce a fost Revoluția Franceză',
      'Ce a fost Imperiul Roman', 'Ce a fost Imperiul Otoman',
      'Ce a fost colonialismul', 'Ce a fost feudalismul',
    ],
    'razboaie': [
      'Ce a fost bătălia de la Thermopile', 'Ce a fost bătălia de la Waterloo',
      'Ce a fost bătălia de la Stalingrad', 'Ce a fost Debarcarea din Normandia',
      'Ce a fost Războiul de Independență al României', 'Ce a fost bătălia de la Posada',
      'Ce a fost bătălia de la Rovine', 'Ce a fost bătălia de la Mărășești',
    ],
    'personalitati': [
      'Cine a fost Alexandru cel Mare', 'Cine a fost Napoleon Bonaparte',
      'Cine a fost Abraham Lincoln', 'Cine a fost Winston Churchill',
      'Cine a fost Vlad Țepeș', 'Cine a fost Alexandru Ioan Cuza',
      'Cine a fost Carol I', 'Cine a fost Nicolae Bălcescu',
    ],
    'revolutii': [
      'Ce a fost Revoluția Americană', 'Ce a fost Revoluția Franceză',
      'Ce a fost Revoluția Rusă', 'Ce a fost Primăvara Popoarelor',
      'Ce a fost Revoluția din 1848 în Țările Române',
      'Ce a fost Revoluția Culturală Chineză',
    ],
    'civilizatii-antice': [
      'Ce a fost civilizația egipteană', 'Ce a fost civilizația greacă',
      'Ce a fost civilizația romană', 'Ce a fost civilizația mesopotamiană',
      'Ce a fost civilizația persană', 'Ce a fost civilizația chineză',
      'Ce au fost piramidele', 'Ce a fost Partenonul',
    ],
  },
  geografie: {
    'geografia-romaniei': [
      'Care sunt Munții Carpați', 'Care sunt râurile principale din România',
      'Ce este Câmpia Română', 'Ce este Podișul Transilvaniei',
      'Ce este Delta Dunării', 'Care sunt orașele mari din România',
      'Ce climă are România', 'Care sunt resursele naturale ale României',
      'Ce este Depresiunea Transilvaniei', 'Ce sunt subcarpații',
    ],
    'continente': [
      'Câte continente sunt', 'Ce este Europa', 'Ce este Asia',
      'Ce este Africa', 'Ce sunt Americile', 'Ce este Oceania',
      'Ce este Antarctica', 'Care este cel mai mare continent',
      'Care este cel mai mic continent',
    ],
    'clima-si-vegetatie': [
      'Ce sunt zonele climatice', 'Ce este clima tropicală', 'Ce este clima temperată',
      'Ce este clima polară', 'Ce sunt biomele', 'Ce este pădurea tropicală',
      'Ce este savana', 'Ce este tundra', 'Ce este taigaua',
      'Ce este efectul de seră',
    ],
    'relief': [
      'Cum se formează munții', 'Ce sunt vulcanii', 'Ce sunt cutremurele',
      'Ce sunt plăcile tectonice', 'Ce este eroziunea', 'Ce sunt peșterile',
      'Ce este o câmpie', 'Ce este un podiș', 'Ce este o deltă',
    ],
    'geografie-economica': [
      'Ce sunt resursele naturale', 'Ce este PIB-ul', 'Ce sunt țările dezvoltate',
      'Ce sunt țările în curs de dezvoltare', 'Ce este globalizarea',
      'Ce este urbanizarea', 'Ce este migrația', 'Ce este densitatea populației',
    ],
    'hidrografie': [
      'Ce este un râu', 'Ce este un lac', 'Ce este un ocean',
      'Ce este ciclul apei', 'Ce sunt apele subterane', 'Ce sunt ghețarii',
      'Care este cel mai lung râu', 'Care este cel mai mare ocean',
      'Ce este un bazin hidrografic',
    ],
  },
  informatica: {
    'programare': [
      'Ce este o variabilă', 'Ce este un tip de dată', 'Ce este o funcție',
      'Ce este o buclă for', 'Ce este o buclă while', 'Ce este condiția if',
      'Ce este un array', 'Ce este un string', 'Ce este recursivitatea',
      'Ce este programarea orientată pe obiecte', 'Ce este o clasă',
      'Ce este moștenirea', 'Ce este polimorfismul',
    ],
    'algoritmi': [
      'Ce este un algoritm', 'Ce este sortarea bubble sort',
      'Ce este sortarea prin selecție', 'Ce este sortarea prin inserție',
      'Ce este căutarea binară', 'Ce este complexitatea unui algoritm',
      'Ce este notația Big O', 'Ce este divide et impera',
      'Ce este programarea dinamică', 'Ce este un graf',
      'Ce este un arbore binar', 'Ce este BFS', 'Ce este DFS',
    ],
    'baze-de-date': [
      'Ce este o bază de date', 'Ce este SQL', 'Ce este o tabelă',
      'Ce este o cheie primară', 'Ce este o cheie străină',
      'Ce este o interogare SELECT', 'Ce este JOIN',
      'Ce este normalizarea', 'Ce este un index',
    ],
    'retele': [
      'Ce este o rețea de calculatoare', 'Ce este TCP/IP', 'Ce este HTTP',
      'Ce este DNS', 'Ce este o adresă IP', 'Ce este un router',
      'Ce este un firewall', 'Ce este VPN', 'Ce este cloud computing',
    ],
    'sisteme-de-operare': [
      'Ce este un sistem de operare', 'Ce este un proces', 'Ce este un thread',
      'Ce este memoria RAM', 'Ce este memoria virtuală',
      'Ce este sistemul de fișiere', 'Ce este Linux', 'Ce este kernelul',
    ],
    'web': [
      'Ce este HTML', 'Ce este CSS', 'Ce este JavaScript',
      'Ce este un framework', 'Ce este responsive design',
      'Ce este un API', 'Ce este frontend vs backend',
      'Ce este un server web', 'Ce este un domeniu',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// GENERATION
// ═══════════════════════════════════════════════════════════════

console.log('Generating explicate.ro data...\n');

// 1. Materii
writeFileSync(resolve(dataDir, 'materii.json'), JSON.stringify(MATERII, null, 2));
console.log(`materii.json: ${MATERII.length} materii`);

// 2. Capitole
const capitole = [];
for (const materie of MATERII) {
  const caps = CAPITOLE_DEF[materie.slug] || {};
  for (const [slug, def] of Object.entries(caps)) {
    capitole.push({
      id: `${materie.slug}-${slug}`,
      slug,
      nume: def.nume,
      materieSlug: materie.slug,
      materieNume: materie.nume,
      descriere: def.descriere,
      continut: def.continut || [`${def.nume} face parte din ${materie.nume.toLowerCase()}. ${def.descriere}`, `Mai jos găsești explicații detaliate pe fiecare temă din acest capitol.`],
      metaTitle: `${def.nume} - ${materie.nume} | explicate.ro`,
      metaDescription: `${def.descriere} Explicații clare cu exemple.`,
    });
  }
}
writeFileSync(resolve(dataDir, 'capitole.json'), JSON.stringify(capitole, null, 2));
console.log(`capitole.json: ${capitole.length} capitole`);

// 3. Articole per materie
let total = 0;
for (const materie of MATERII) {
  const articole = [];
  const caps = INTREBARI[materie.slug] || {};

  for (const [capSlug, intrebari] of Object.entries(caps)) {
    for (const titlu of intrebari) {
      const slug = slugify(titlu);
      articole.push({
        slug,
        titlu: titlu + '?',
        materieSlug: materie.slug,
        capitolSlug: capSlug,
        intro: `${titlu}. Aici găsești explicația completă, cu exemple.`,
        sectiuni: [
          { titlu: 'Explicație', tip: 'text', items: [{ text: `Conținut placeholder pentru: ${titlu}.` }] },
        ],
        concluzie: 'Conținutul va fi generat cu Gemini API.',
        relate: [],
        metaTitle: `${titlu} - ${materie.nume} | explicate.ro`,
        metaDescription: `${titlu}. Explicație clară cu exemple practice.`,
      });
    }
  }

  writeFileSync(resolve(dataDir, `articole-${materie.slug}.json`), JSON.stringify(articole, null, 2));
  console.log(`articole-${materie.slug}.json: ${articole.length} articole`);
  total += articole.length;
}

console.log(`\nTotal: ${total} articole`);
console.log('Done!');
