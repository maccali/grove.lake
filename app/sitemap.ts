import type { MetadataRoute } from 'next';
import { siteUrl, languages } from '../lib/seo';
import { albums, universes } from '../lib/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return languages.flatMap(lang => ['', ...albums.map(a=>`/albums/${a.id}`), ...universes.map(universe => `/universes/${universe.id}`)].map(path => ({
    url:`${siteUrl}/${lang}${path}`,
    alternates:{languages:{pt:`${siteUrl}/pt${path}`,en:`${siteUrl}/en${path}`}},
  })));
}
