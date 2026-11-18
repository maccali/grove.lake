import type { Viewport } from 'next';
import { GoogleAnalytics } from './analytics';
import type { Language } from '../lib/i18n';
import '../app/globals.css';
export const viewport: Viewport = { themeColor: '#0c0c0d' };
export default function SiteDocument({ children, language, analytics = true }: { children: React.ReactNode; language: Language; analytics?: boolean }) {
  return <html lang={language === 'pt' ? 'pt-BR' : 'en'}><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/></head><body>{children}{analytics && <GoogleAnalytics/>}</body></html>;
}
