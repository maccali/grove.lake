'use client';
import { languageKey, type Language } from '../lib/i18n';
import { trackEvent } from '../lib/analytics';
export function LanguageLink({ language, href, current }: { language: Language; href: string; current: boolean }) {
  return <a href={href} lang={language} hrefLang={language} aria-current={current?'page':undefined} onClick={() => {
    try { localStorage.setItem(languageKey, language); } catch { /* The link works without storage. */ }
    trackEvent('language_change', {language});
  }}>{language.toUpperCase()}</a>;
}
export function ListenLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="button lime" href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('listen_click', {platform: href.includes('spotify.com')?'spotify':'youtube'})}>{children}</a>;
}
