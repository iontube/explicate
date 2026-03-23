import type { Materie, Capitol, Articol } from './types';
import materiiData from '../data/materii.json';
import capitoleData from '../data/capitole.json';
import articoleMatematica from '../data/articole-matematica.json';
import articoleRomana from '../data/articole-romana.json';
import articoleFizica from '../data/articole-fizica.json';
import articoleChimie from '../data/articole-chimie.json';
import articoleBiologie from '../data/articole-biologie.json';
import articoleIstorie from '../data/articole-istorie.json';
import articoleGeografie from '../data/articole-geografie.json';
import articoleInformatica from '../data/articole-informatica.json';
import articoleEducatieCivica from '../data/articole-educatie-civica.json';
import articoleFilosofie from '../data/articole-filosofie.json';
import articoleEconomie from '../data/articole-economie.json';
import articoleEngleza from '../data/articole-engleza.json';

export const materii: Materie[] = materiiData as Materie[];
export const capitole: Capitol[] = capitoleData as Capitol[];

const allArticole: Articol[] = [
  ...(articoleMatematica as Articol[]),
  ...(articoleRomana as Articol[]),
  ...(articoleFizica as Articol[]),
  ...(articoleChimie as Articol[]),
  ...(articoleBiologie as Articol[]),
  ...(articoleIstorie as Articol[]),
  ...(articoleGeografie as Articol[]),
  ...(articoleInformatica as Articol[]),
  ...(articoleEducatieCivica as Articol[]),
  ...(articoleFilosofie as Articol[]),
  ...(articoleEconomie as Articol[]),
  ...(articoleEngleza as Articol[]),
];

const byMaterie = new Map<string, Articol[]>();
const byCapitol = new Map<string, Articol[]>();
const byKey = new Map<string, Articol>();

for (const a of allArticole) {
  if (!byMaterie.has(a.materieSlug)) byMaterie.set(a.materieSlug, []);
  byMaterie.get(a.materieSlug)!.push(a);

  const ck = `${a.materieSlug}/${a.capitolSlug}`;
  if (!byCapitol.has(ck)) byCapitol.set(ck, []);
  byCapitol.get(ck)!.push(a);

  byKey.set(`${a.materieSlug}/${a.capitolSlug}/${a.slug}`, a);
}

export function getMaterieBySlug(slug: string) { return materii.find(m => m.slug === slug); }
export function getCapitoleForMaterie(slug: string) { return capitole.filter(c => c.materieSlug === slug); }
export function getCapitolBySlug(ms: string, cs: string) { return capitole.find(c => c.materieSlug === ms && c.slug === cs); }
export function getArticoleForCapitol(ms: string, cs: string) { return byCapitol.get(`${ms}/${cs}`) || []; }
export function getArticoleForMaterie(ms: string) { return byMaterie.get(ms) || []; }
export function getArticol(ms: string, cs: string, as_: string) { return byKey.get(`${ms}/${cs}/${as_}`); }
export function getAllArticole() { return allArticole; }
export function getArticoleCount(ms: string) { return (byMaterie.get(ms) || []).length; }
