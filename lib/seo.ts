import type { Metadata } from 'next';
import { translations, releaseCopy, universeTagline, universeTitle, type Language } from './i18n';
import { artist, albums, universeId, universes } from './content';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://grove-lake.vercel.app').replace(/\/$/, '');
const shareImage = {
  url: new URL('/grove-lake-social.jpg', siteUrl).href,
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
      yandex: process.env.YANDEX_SITE_VERIFICATION?.trim() || undefined,
    },
  };
}
const websiteId = `${siteUrl}/#website`;
const artistId = `${siteUrl}/#artist`;

type MusicPage = { kind: 'release' | 'universe'; id: string };

export function musicSchema(lang: Language, page?: MusicPage) {
  const group = {
    '@type': 'MusicGroup',
    '@id': artistId,
    name: artist.name,
    url: siteUrl,
    description: translations[lang].description,
    logo: new URL('/brand/grove-lake.png', siteUrl).href,
    founder: { '@type': 'Person', name: artist.founder },
    genre: ['Instrumental hip-hop', 'Synthwave', 'Trap', 'R&B'],
    sameAs: [artist.youtube, artist.spotify, artist.amazonMusic, artist.appleMusic],
  };
  const graph: object[] = [group, {
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: artist.name,
    inLanguage: languages,
    publisher: { '@id': artistId },
  }];
  const releaseUrl = (id: string) => `${siteUrl}/${lang}/albums/${id}`;
  const universeUrl = (id: string) => `${siteUrl}/${lang}/universes/${id}`;

  if (page?.kind === 'universe') {
    const universe = universes.find(entry => entry.id === page.id);
    if (universe) {
      const url = universeUrl(universe.id);
      const name = universeTitle(lang, universe);
      graph.push({
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        name,
        url,
        inLanguage: translations[lang].htmlLang,
        description: universeTagline(lang, universe.id) ?? translations[lang].universeDescription(name),
        image: universe.entryArt ? new URL(universe.entryArt, siteUrl).href : undefined,
        isPartOf: { '@id': websiteId },
        about: { '@id': artistId },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: universe.releases.map((release, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: release.title,
            url: releaseUrl(release.id),
          })),
        },
      });
    }
  }

  if (page?.kind === 'release') {
    const release = albums.find(entry => entry.id === page.id);
    if (release) {
      const url = releaseUrl(release.id);
      const albumRef = { '@id': `${url}#album` };
      const artistRef = { '@id': artistId };
      const tracks = release.tracks ?? (release.kind === 'single' ? [{ title: release.title, duration: release.duration }] : undefined);
      graph.push({
        '@type': 'MusicAlbum',
        ...albumRef,
        name: release.title,
        url,
        description: releaseCopy(lang, release.id, release.title).description,
        image: release.art ? new URL(release.art, siteUrl).href : undefined,
        byArtist: artistRef,
        subjectOf: { '@id': `${universeUrl(universeId(release))}#collection` },
        datePublished: release.forthcoming ? undefined : release.releaseDate,
        numTracks: tracks?.length,
        genre: release.genre?.split(' / '),
        albumReleaseType: release.kind === 'single' ? 'https://schema.org/SingleRelease' : release.kind === 'ep' ? 'https://schema.org/EPRelease' : 'https://schema.org/AlbumRelease',
        track: tracks && {
          '@type': 'ItemList',
          itemListElement: tracks.map((track, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'MusicRecording',
              name: track.title,
              duration: track.duration ? `PT${track.duration}S` : undefined,
              byArtist: artistRef,
              inAlbum: albumRef,
            },
          })),
        },
      });
    }
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
