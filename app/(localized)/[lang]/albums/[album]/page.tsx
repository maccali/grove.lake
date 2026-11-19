import { analyticsClick } from '../../../../../lib/analytics';
import { Brand } from '../../../../../components/brand';
import { LanguageLink, ListenLink } from '../../../../../components/tracked-links';
import { Disc3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { albums, artist, albumSearch, formatDuration, universeId, universes } from '../../../../../lib/content';
import { translations, formatReleaseDate, releaseCopy, universeTitle, type Language } from '../../../../../lib/i18n';
import { languages, localizedMetadata, musicSchema } from '../../../../../lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return languages.flatMap(lang => albums.map(album => ({lang,album:album.id}))); }
async function resolve(params: Promise<{lang:string;album:string}>) {
  const {lang,album:id}=await params;
  if(lang!=='pt' && lang!=='en') notFound();
  const album=albums.find(a=>a.id===id); if(!album) notFound();
  return {lang:lang as Language,album,t:translations[lang],copy:releaseCopy(lang, album.id, album.title)};
}
export async function generateMetadata({params}: {params:Promise<{lang:string;album:string}>}) {
  const {lang,album,copy}=await resolve(params);
  return localizedMetadata(lang,`/albums/${album.id}`,`${album.title} — Grove Lake`,copy.description);
}
export default async function AlbumPage({params}: {params:Promise<{lang:string;album:string}>}) {
  const {lang,album,t,copy}=await resolve(params);
  const universe = universes.find(group => group.id === universeId(album));
  const universeName = universe ? universeTitle(lang, universe) : t.universe;
  const related = universe?.releases.filter(release => release.id !== album.id).slice(0, 3) ?? [];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(musicSchema(lang, { kind: 'release', id: album.id })).replace(/</g,'\\u003c')}}/>
    <header className="header"><Brand href={`/${lang}`} label={t.home}/><nav aria-label={t.language} className="language-switch"><LanguageLink href={`/pt/albums/${album.id}`} language="pt" current={lang==='pt'}/><span>/</span><LanguageLink href={`/en/albums/${album.id}`} language="en" current={lang==='en'}/></nav></header>
    <main className="section album-page"><a className="text-link" href={`/${lang}/universes/${universeId(album)}`} {...analyticsClick('universe_open', 'release_back_link', { universe: universeId(album) })}>← {universeName}</a><div className="album-page-hero">{album.art ? <img src={album.art} alt={t.artAlt+album.title} width="800" height="900" fetchPriority="high"/> : <div className="album-art"><Disc3 className="release-placeholder" aria-hidden="true"/></div>}<div><p className="eyebrow muted">{album.genre ?? (album.kind === 'single' ? t.single : album.kind === 'ep' ? t.ep : t.album)}</p><h1>{album.title}</h1>{copy.subtitle && <p className="album-subtitle">{copy.subtitle}</p>}<p className="album-description">{copy.description}</p>{album.releaseDate && <p className="muted">{album.forthcoming ? t.release : t.released} <time dateTime={album.releaseDate}>{formatReleaseDate(album.releaseDate, lang)}</time></p>}{universe && <p className="muted">{t.universe} · <a className="universe-link" href={`/${lang}/universes/${universe.id}`} {...analyticsClick('universe_open', 'release_details', { universe: universe.id })}>{universeName}</a></p>}{album.duration && <p className="muted">{t.duration} · {formatDuration(album.duration)}</p>}<ListenLink universe={universeId(album)} href={album.forthcoming?artist.youtube:albumSearch(album.title)}>{album.forthcoming?t.follow:t.search} ↗</ListenLink></div></div>{album.tracks && <section><h2>{t.trackJourney}</h2><ol className="tracklist">{album.tracks.map((track,i)=><li key={track.title}><span>{String(i+1).padStart(2,'0')}</span>{track.title}<time className="track-duration" dateTime={`PT${track.duration}S`}>{formatDuration(track.duration)}</time></li>)}</ol></section>}{related.length > 0 && <nav className="related-albums" aria-labelledby="related-releases"><h2 id="related-releases">{t.sameUniverse}</h2>{related.map(release => <a href={`/${lang}/albums/${release.id}`} key={release.id} {...analyticsClick('album_open', 'related_releases', { album: release.id, universe: universeId(album) })}>{release.title} ↗</a>)}</nav>}</main>
    <footer><Brand href={`/${lang}`} label={t.home} placement="footer"/><span>© {new Date().getFullYear()} Grove Lake</span></footer>
  </>;
}
