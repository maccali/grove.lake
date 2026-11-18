import { notFound } from 'next/navigation';
import SiteDocument from '../../../components/site-document';
export { viewport } from '../../../components/site-document';
export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{lang:string}> }) {
  const {lang} = await params;
  if(lang !== 'pt' && lang !== 'en') notFound();
  return <SiteDocument language={lang}>{children}</SiteDocument>;
}
