export interface Materie {
  id: string;
  slug: string;
  nume: string;
  emoji: string;
  descriere: string;
  continut: string[];
  subcategorii: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Capitol {
  id: string;
  slug: string;
  nume: string;
  materieSlug: string;
  materieNume: string;
  descriere: string;
  continut: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Sectiune {
  titlu: string;
  tip: 'lista' | 'pasi' | 'text';
  items: Array<{ titlu?: string; text: string }>;
}

export interface Articol {
  slug: string;
  titlu: string;
  materieSlug: string;
  capitolSlug: string;
  intro: string;
  sectiuni: Sectiune[];
  concluzie: string;
  relate: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface FAQItem {
  intrebare: string;
  raspuns: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface InternalLink {
  href: string;
  text: string;
  title?: string;
}
