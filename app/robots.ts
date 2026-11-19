import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/seo';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: ['*', 'Yandex', 'OAI-SearchBot'], allow: '/' }, sitemap:`${siteUrl}/sitemap.xml` }; }
