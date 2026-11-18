import { notFound } from 'next/navigation';
import Home from '../../../components/home';
import { localizedMetadata, musicSchema, languages } from '../../../lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return languages.map(lang => ({lang})); }
export async function generateMetadata({ params }: { params: Promise<{lang:string}> }) {
  const {lang} = await params; if(lang !== 'pt' && lang !== 'en') notFound();
  return localizedMetadata(lang);
}
export default async function Page({ params }: { params: Promise<{lang:string}> }) {
  const {lang} = await params; if(lang !== 'pt' && lang !== 'en') notFound();
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(musicSchema(lang)).replace(/</g,'\\u003c')}}/><Home initialLanguage={lang}/></>;
}
