import Script from 'next/script';
import { analyticsScript } from '../lib/analytics';

export function GoogleAnalytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;

  return (
    <>
      <script id="grove-google-analytics" dangerouslySetInnerHTML={{ __html: analyticsScript(id) }}/>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive"/>
    </>
  );
}
