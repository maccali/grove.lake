'use client';
import { languageKey, type Language } from '../lib/i18n';
import { analyticsClick } from '../lib/analytics';
export function LanguageLink({ language, href, current }: { language: Language; href: string; current: boolean }) {
  return <a href={href} lang={language} hrefLang={language} {...analyticsClick('language_change', 'language_switch', { target: language })} aria-current={current?'page':undefined} onClick={() => {
    try { localStorage.setItem(languageKey, language); } catch { /* The link works without storage. */ }
  }}>{language.toUpperCase()}</a>;
}
export function ListenLink({ href, universe, children }: { href: string; universe: string; children: React.ReactNode }) {
  return <a className="button lime" href={href} target="_blank" rel="noopener noreferrer" {...analyticsClick('listen_click', 'release_details', { universe, platform: 'youtube' })}>{children}</a>;
}
