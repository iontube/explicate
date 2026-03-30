import type { BreadcrumbItem, Articol } from './types';

const SITE = 'https://explicate.ro';

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.label,
      ...(item.href ? { item: SITE + item.href } : {}),
    })),
  });
}

export function buildArticleSchema(a: Articol, url: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Article',
    headline: a.titlu, description: a.metaDescription,
    url: SITE + url, inLanguage: 'ro',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: { '@type': 'Organization', name: 'explicate.ro', url: SITE },
  });
}

export function buildWebPageSchema(title: string, desc: string, url: string): string {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebPage',
    name: title, description: desc, url: SITE + url, inLanguage: 'ro',
    dateModified: new Date().toISOString().split('T')[0],
    isPartOf: { '@type': 'WebSite', name: 'explicate.ro', url: SITE },
  });
}

export function buildWebSiteSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'explicate.ro', url: SITE, inLanguage: 'ro',
    description: 'Explicații clare și practice pentru materii școlare.',
  });
}
