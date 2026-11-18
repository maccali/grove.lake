'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Play, X, Disc3, Youtube, Music2, Headphones, Music, Radio, ArrowRight, Menu } from 'lucide-react';
import { artist, albums, albumSearch, formatDuration, universes } from '../lib/content';
import { Brand } from './brand';
import { CatalogCover } from './catalog-cover';
import { trackEvent } from '../lib/analytics';
import { translations, formatReleaseDate, releaseCopy, universeTagline, universeTitle, detectLanguage, languageKey, type Language } from '../lib/i18n';
const platformByUrl: Record<string, string> = {
  [artist.spotify]: 'spotify',
  [artist.amazonMusic]: 'amazon_music',
  [artist.appleMusic]: 'apple_music',
};

function OutLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) { return <a href={href} onClick={() => trackEvent('listen_click', { platform: platformByUrl[href] ?? 'youtube' })} className={className} target="_blank" rel="noopener noreferrer">{children}</a>; }
export default function Home({ initialLanguage, detectBrowserLanguage = false }: { initialLanguage: Language; detectBrowserLanguage?: boolean }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const t = translations[language];
  const localizedAlbums = albums.map(album => ({ ...album, ...releaseCopy(language, album.id, album.title) }));
  const selected = localizedAlbums.find(album => album.id === selectedId);
  useEffect(() => {
    if (!detectBrowserLanguage) return;
    let saved: string | null = null;
    try { saved = localStorage.getItem(languageKey); } catch { /* Browser storage may be disabled. */ }
    const next = saved === 'pt' || saved === 'en' ? saved : detectLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
    window.location.replace(`/${next}${window.location.hash}`);
  }, [detectBrowserLanguage]);
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t]);
  const changeLanguage = (next: Language) => {
    trackEvent('language_change', { language: next });
    setLanguage(next);
    try { localStorage.setItem(languageKey, next); } catch { /* Navigation still works without storage. */ }
  };
  const [menu, setMenu] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (selected) dialog.current?.showModal(); else dialog.current?.close(); }, [selectedId]);
  const select = (album: typeof albums[number]) => { trackEvent('album_open', { album: album.id, language }); setSelectedId(album.id); };
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="header"><Brand href="#" label={t.home}/><nav aria-label={t.nav} className={menu ? 'nav open' : 'nav'}><a href="#universos" onClick={() => setMenu(false)}>{t.universes}</a><a href="#sobre" onClick={() => setMenu(false)}>{t.project}</a><a href="#conectar" onClick={() => setMenu(false)}>{t.connect}</a></nav><div className="header-controls"><div className="language-switch" role="group" aria-label={t.language}><a lang="pt" hrefLang="pt" href="/pt" aria-label="Português" aria-current={language === 'pt' ? 'page' : undefined} onClick={() => changeLanguage('pt')}>PT</a><span aria-hidden="true">/</span><a lang="en" hrefLang="en" href="/en" aria-label="English" aria-current={language === 'en' ? 'page' : undefined} onClick={() => changeLanguage('en')}>EN</a></div><OutLink href={artist.youtube} className="header-listen">{t.listen} <ArrowUpRight size={15}/></OutLink><button className="menu-button" aria-expanded={menu} aria-label={menu ? t.closeMenu : t.openMenu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button></div></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title"><div className="hero-copy"><div className="eyebrow"><span className="status-dot"/> {t.independent}</div><h1 id="hero-title">{t.heroFirst}<br/>{t.heroSecond} <span>{t.heroWorld}</span></h1><p>{t.stories}<br/>{t.beats}</p><div className="hero-actions"><OutLink href={artist.youtube} className="button lime"><Play size={16} fill="currentColor"/> {t.journey} <ArrowUpRight size={18}/></OutLink><a href="#universos" className="text-link">{t.explore} <ArrowDown size={15}/></a></div><div className="hero-foot"><span>{t.hiphop}</span><i/><span>{t.made}</span></div></div>
      <div className="hero-art"><img src="/art/area51.svg" alt={t.shipAlt} width="800" height="900" fetchPriority="high"/><div className="art-top"><span>{t.transmission}</span><Radio size={18}/></div><div className="art-caption"><span>{t.nextWorld}</span><strong>AREA 51:<br/>MY SHIP</strong><button onClick={() => select(albums[0])} className="round-button" aria-label={t.discover}><ArrowUpRight/></button></div><span className="art-coordinate">{t.coordinates}</span></div></section>
      <div className="ticker" aria-hidden="true"><span>{t.noWords}</span><span>✳</span><span>GROVE LAKE</span><span>✳</span><span>{t.ai}</span><span>✳</span><span>{t.noWords}</span></div>
      <section id="universos" className="section universes"><div className="section-heading"><div><span className="eyebrow muted">{t.discography}</span><h2>{t.destination}</h2></div></div>
        <div className="album-grid universe-grid">
          {universes.map(universe => {
            const upcoming = universe.releases.find(release => release.forthcoming && release.releaseDate)?.releaseDate;
            const tagline = universeTagline(language, universe.id);
            const title = universeTitle(language, universe);
            return (
              <a key={universe.id} className="album universe-card" href={`/${language}/universes/${universe.id}`}>
                <CatalogCover title={title} art={universe.entryArt} badge={upcoming && (
                  <time className="coming" dateTime={upcoming}>{formatReleaseDate(upcoming, language)}</time>
                )}/>
                <div className="universe-card-copy">
                  <h3>{title}</h3>
                  {tagline && <p>{tagline}</p>}
                </div>
              </a>
            );
          })}
        </div>
      </section>
      <section id="sobre" className="section about"><div className="about-visual" aria-hidden="true"><div className="record"><div className="record-label"><img src="/brand/grove-lake.png" width="360" height="218" alt=""/></div></div><span className="record-note">{t.earth}<br/>{t.elsewhere}</span><span className="asterisk">✳</span></div><div className="about-copy"><span className="eyebrow muted">{t.behind}</span><h2>{t.mind}<br/>{t.worlds}</h2><p>{t.bio}</p><p>{t.story}</p><div className="process"><Disc3 size={21}/><div><strong>{t.ai}</strong><span>{t.ideas}<br/>{t.technology}</span></div></div></div></section>
      <section id="conectar" className="connect section"><span className="eyebrow">{t.continue}</span><h2>{t.nextDestination}<br/>{t.starts} <em>{t.play}</em></h2><div className="platforms"><OutLink href={artist.youtube}><Youtube/><div><span>{t.videos}</span><strong>YouTube</strong></div><ArrowUpRight/></OutLink><OutLink href={artist.spotify}><Music2/><div><span>{t.find}</span><strong>Spotify</strong></div><ArrowUpRight/></OutLink><OutLink href={artist.amazonMusic}><Headphones/><div><span>{t.find}</span><strong>Amazon Music</strong></div><ArrowUpRight/></OutLink><OutLink href={artist.appleMusic}><Music/><div><span>{t.find}</span><strong>Apple Music</strong></div><ArrowUpRight/></OutLink></div></section>
    </main>
    <footer><Brand href="#"/><span>© {new Date().getFullYear()} Grove Lake</span><a href="#main">{t.top}</a></footer>
    <dialog ref={dialog} onCancel={() => setSelectedId(null)} onClose={() => setSelectedId(null)} onClick={event => { if (event.target === event.currentTarget) setSelectedId(null); }} aria-labelledby="album-title"><div className="dialog-content"><button autoFocus className="close-dialog" aria-label={t.close} onClick={() => setSelectedId(null)}><X/></button>{selected && <><div className="dialog-hero">{selected.art && <img src={selected.art} alt={t.artAlt+selected.title}/>}<div><span className="eyebrow muted">{selected.tracks ? t.trackCount(selected.tracks.length) : selected.genre}</span><h2 id="album-title">{selected.title}</h2><p>{selected.description}</p>{!selected.forthcoming && <OutLink href={albumSearch(selected.title)} className="button lime">{t.search} <ArrowUpRight size={16}/></OutLink>}</div></div>{selected.forthcoming && <><p className="track-intro">{t.trackJourney} {selected.releaseDate && <span>{t.release} <time dateTime={selected.releaseDate}>{formatReleaseDate(selected.releaseDate, language)}</time></span>}</p><ol className="tracklist">{selected.tracks?.map((track,i) => <li key={track.title}><span>{String(i+1).padStart(2,'0')}</span>{track.title}<time className="track-duration" dateTime={`PT${track.duration}S`}>{formatDuration(track.duration)}</time></li>)}</ol><OutLink href={artist.youtube} className="button lime">{t.follow} <ArrowRight size={16}/></OutLink></>}</>}</div></dialog>
  </>;
}
