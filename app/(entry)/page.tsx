import Home from '../../components/home';
import { localizedMetadata, musicSchema } from '../../lib/seo';
export const metadata = localizedMetadata('pt');
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(musicSchema('pt')).replace(/</g, '\\u003c')}}/><Home initialLanguage="pt" detectBrowserLanguage/></>; }
