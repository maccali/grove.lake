export function trackEvent(name: 'listen_click' | 'album_open' | 'language_change', parameters: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const target = window as unknown as { gtag?: (command: string, name: string, parameters: Record<string, string>) => void };
  target.gtag?.('event', name, parameters);
}
