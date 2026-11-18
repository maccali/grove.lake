import type { Metadata } from 'next';
import { translations, releaseCopy, type Language } from './i18n';
import { artist, albums } from './content';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://grovelake.art').replace(/\/$/, '');
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const shareImageOrigin = productionHost ? `https://${productionHost}` : siteUrl;
const shareImage = {
  url: new URL('/grove-lake-social.jpg', shareImageOrigin).href,
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'Grove Lake',
};

export const languages: Language[] = ['pt', 'en'];
export function localizedMetadata(lang: Language, path = '', title?: string, description?: string): Metadata {
  const t = translations[lang];
  const url = `${siteUrl}/${lang}${path}`;
  return {
    metadataBase: new URL(siteUrl),
    title: title || t.title,
    description: description || t.description,
    alternates: { canonical: url, languages: { pt: `${siteUrl}/pt${path}`, en: `${siteUrl}/en${path}`, 'x-default': path ? `${siteUrl}/en${path}` : siteUrl } },
    openGraph: { type: 'website', siteName: artist.name, title: title || t.title, description: description || t.description, url, locale: lang === 'pt' ? 'pt_BR' : 'en_US', alternateLocale: lang === 'pt' ? ['en_US'] : ['pt_BR'], images: [shareImage] },
    twitter: { card: 'summary_large_image', title: title || t.title, description: description || t.description, images: [{ url: shareImage.url, alt: shareImage.alt }] },
    robots: { index: true, follow: true },
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  };
}
export function musicSchema(lang: Language, albumId?: string) {
  const group = { '@type': 'MusicGroup', '@id': `${siteUrl}/#artist`, name: artist.name, url: siteUrl, description: translations[lang].description, genre: ['Instrumental hip-hop', 'Synthwave', 'Trap', 'R&B'], sameAs: [artist.youtube, artist.spotify, artist.amazonMusic, artist.appleMusic] };
  const selected = albums.find(album => album.id === albumId);
  return { '@context': 'https://schema.org', '@graph': [group, { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: artist.name, inLanguage: ['pt', 'en'] }, ...(selected ? [{ '@type': 'MusicAlbum', '@id': `${siteUrl}/${lang}/albums/${selected.id}#album`, name: selected.title, url: `${siteUrl}/${lang}/albums/${selected.id}`, description: releaseCopy(lang, selected.id, selected.title).description, byArtist: { '@id': `${siteUrl}/#artist` }, datePublished: selected.forthcoming ? undefined : selected.releaseDate, numTracks: selected.tracks?.length ?? (selected.kind === 'single' ? 1 : undefined), genre: selected.genre?.split(' / '), albumReleaseType: selected.kind === 'single' ? 'https://schema.org/SingleRelease' : undefined }] : [])] };
}
