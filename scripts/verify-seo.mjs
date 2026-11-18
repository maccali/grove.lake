import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://grovelake.art').replace(/\/$/, '');
const home = readFileSync('out/pt.html', 'utf8');
function linkedIds(html, category) {
  const pattern = new RegExp('href="/pt/' + category + '/([a-z0-9-]+)"', 'g');
  return [...new Set([...html.matchAll(pattern)].map(match => match[1]))];
}
const universeIds = linkedIds(home, 'universes');
assert.ok(universeIds.length > 0, 'universes linked from home');
const universePages = universeIds.map(id => readFileSync('out/pt/universes/' + id + '.html', 'utf8'));
const ids = linkedIds(universePages.join(''), 'albums');
const paths = ['', ...universeIds.map(id => '/universes/' + id), ...ids.map(id => '/albums/' + id)];
for (const id of ['area51', 'isaac', 'kingdom', 'neon']) assert.ok(ids.includes(id), id);
const titles = new Set();
for(const lang of ['pt','en']) {
  for(const path of paths) {
    const route = `/${lang}${path}`;
    const file = existsSync(`out${route}.html`) ? `out${route}.html` : `out${route}/index.html`;
    const html = readFileSync(file,'utf8');
    assert.match(html,new RegExp(`<html[^>]*lang="${lang==='pt'?'pt-BR':'en'}"`),`html lang: ${route}`);
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title?.includes('Grove Lake'),`title: ${route}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g)||[];
    assert.equal(canonical.length,1,`canonical count: ${route}`);
    assert.ok(canonical[0].includes(`${origin}${route}`),`canonical URL: ${route}`);
    for(const code of ['pt','en','x-default']) assert.match(html,new RegExp(`hrefLang="${code}"`),`hreflang: ${route}`);
    assert.equal((html.match(/<meta name="description"/g)||[]).length,1,`description count: ${route}`);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]||'null');
    assert.ok(data?.['@graph'].some(item=>item['@type']==='MusicGroup'),`artist schema: ${route}`);
    if(path.startsWith('/albums/')) assert.ok(data['@graph'].some(item=>item['@type']==='MusicAlbum'),`album schema: ${route}`);
    if(!path) { assert.ok(!titles.has(title),'home titles must differ by language'); titles.add(title); assert.ok(html.includes(lang==='pt'?'Escolha seu destino.':'Choose your destination.'),'translated server-rendered text'); }
    if(!process.env.NEXT_PUBLIC_GA_ID) assert.ok(!html.includes('https://www.googletagmanager.com/gtag/js?id='),'no unconfigured Analytics tag');
  }
}
const sitemap = readFileSync('out/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,paths.length * 2,'all localized pages in sitemap');
for(const lang of ['pt','en']) for(const path of paths) assert.ok(sitemap.includes(`${origin}/${lang}${path}`));
assert.ok(readFileSync('out/robots.txt','utf8').includes(`Sitemap: ${origin}/sitemap.xml`));
console.log('SEO: páginas, idiomas no HTML, metadados, canonical, hreflang, JSON-LD, sitemap e robots verificados.');
