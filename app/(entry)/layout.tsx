import SiteDocument from '../../components/site-document';
export { viewport } from '../../components/site-document';
export default function Layout({ children }: { children: React.ReactNode }) { return <SiteDocument language="pt" analytics={false}>{children}</SiteDocument>; }
