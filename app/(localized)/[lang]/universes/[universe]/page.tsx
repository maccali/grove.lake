import { Brand } from '../../../../../components/brand';
import { analyticsClick } from '../../../../../lib/analytics';
import { notFound } from 'next/navigation';
import { CatalogCover } from '../../../../../components/catalog-cover';
import ReleaseLink from '../../../../../components/release-link';
import { LanguageLink } from '../../../../../components/tracked-links';
import { universes } from '../../../../../lib/content';
import { formatReleaseDate, releaseCopy, translations, universeTagline, universeTitle } from '../../../../../lib/i18n';
import { languages, localizedMetadata, musicSchema } from '../../../../../lib/seo';

type Props = { params: Promise<{ lang: string; universe: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.flatMap(lang => universes.map(universe => ({ lang, universe: universe.id })));
}

async function resolveUniverse(params: Props['params']) {
  const { lang, universe: id } = await params;
  if (lang !== 'pt' && lang !== 'en') notFound();
  const universe = universes.find(entry => entry.id === id);
  if (!universe) notFound();
  return { lang, universe, t: translations[lang] } as const;
}

export async function generateMetadata({ params }: Props) {
  const { lang, universe, t } = await resolveUniverse(params);
  const title = universeTitle(lang, universe);
  return localizedMetadata(lang, `/universes/${universe.id}`, `${title} — Grove Lake`, universeTagline(lang, universe.id) ?? t.universeDescription(title));
}

export default async function UniversePage({ params }: Props) {
  const { lang, universe, t } = await resolveUniverse(params);
  const title = universeTitle(lang, universe);
  const tagline = universeTagline(lang, universe.id);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(musicSchema(lang, { kind: 'universe', id: universe.id })).replace(/</g, '\\u003c') }}/>
      <header className="header">
        <Brand href={`/${lang}`} label={t.home}/>
        <nav aria-label={t.language} className="language-switch">
          <LanguageLink href={`/pt/universes/${universe.id}`} language="pt" current={lang === 'pt'}/>
          <span aria-hidden="true">/</span>
          <LanguageLink href={`/en/universes/${universe.id}`} language="en" current={lang === 'en'}/>
        </nav>
      </header>
      <main className="section universe-page">
        <a className="text-link" href={`/${lang}#universos`} {...analyticsClick('navigation_click', 'universe_details', { target: 'universes' })}>← {t.universes}</a>
        <div className="universe-page-intro">
          <h1>{title}</h1>
          {tagline && <p>{tagline}</p>}
        </div>
        <section aria-labelledby="universe-releases">
          <h2 id="universe-releases">{t.releases}</h2>
          <div className="album-grid">
            {universe.releases.map(release => {
              const { subtitle } = releaseCopy(lang, release.id, release.title);
              return (
                <ReleaseLink key={release.id} id={release.id} language={lang}>
                  <CatalogCover title={release.title} art={release.art}/>
                  <span className="album-genre">{release.kind === 'single' ? t.single : release.kind === 'ep' ? t.ep : t.album}</span>
                  <h3>{release.title}</h3>
                  {subtitle && <p>{subtitle}</p>}
                  {release.releaseDate && (
                    <p><time dateTime={release.releaseDate}>{formatReleaseDate(release.releaseDate, lang)}</time></p>
                  )}
                </ReleaseLink>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}
