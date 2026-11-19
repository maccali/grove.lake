import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const origin = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://grove-lake.vercel.app').replace(/\/$/, '');
const shareImageUrl = new URL('/grove-lake-social.jpg', origin).href;
assert.ok(existsSync('out/grove-lake-social.jpg'), 'social image exported');

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
    assert.ok(html.includes(`<meta property="og:image" content="${shareImageUrl}"`), `Open Graph image: ${route}`);
    assert.ok(html.includes(`<meta name="twitter:image" content="${shareImageUrl}"`), `Twitter/X image: ${route}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g)||[];
    assert.equal(canonical.length,1,`canonical count: ${route}`);
    assert.ok(canonical[0].includes(`${origin}${route}`),`canonical URL: ${route}`);
    for(const code of ['pt','en','x-default']) assert.match(html,new RegExp(`hrefLang="${code}"`),`hreflang: ${route}`);
    assert.equal((html.match(/<meta name="description"/g)||[]).length,1,`description count: ${route}`);
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]||'null');
    assert.ok(data?.['@graph'].some(item=>item['@type']==='MusicGroup'),`artist schema: ${route}`);
    if (path.startsWith('/albums/')) {
      const album = data['@graph'].find(item => item['@type'] === 'MusicAlbum');
      assert.ok(album?.subjectOf?.['@id'].startsWith(`${origin}/${lang}/universes/`), `album universe: ${route}`);
      assert.equal(album.track?.itemListElement.length, album.numTracks, `track count: ${route}`);
      assert.ok(album.track?.itemListElement.every(entry => entry.item['@type'] === 'MusicRecording'), `track schema: ${route}`);
    }
    if (path.startsWith('/universes/')) {
      const collection = data['@graph'].find(item => item['@type'] === 'CollectionPage');
      const links = collection?.mainEntity?.itemListElement;
      assert.ok(links?.length && links.every(item => html.includes(`href="${new URL(item.url).pathname}"`)), `universe releases: ${route}`);
    }
    if(!path) { assert.ok(!titles.has(title),'home titles must differ by language'); titles.add(title); assert.ok(html.includes(lang==='pt'?'Escolha seu destino.':'Choose your destination.'),'translated server-rendered text'); }
    if(!process.env.NEXT_PUBLIC_GA_ID) assert.ok(!html.includes('https://www.googletagmanager.com/gtag/js?id='),'no unconfigured Analytics tag');
  }
}
const entry = readFileSync('out/index.html', 'utf8');
assert.ok(entry.includes(`<meta property="og:image" content="${shareImageUrl}"`), 'Open Graph image on the root URL');
assert.ok(entry.includes(`<meta name="twitter:image" content="${shareImageUrl}"`), 'Twitter/X image on the root URL');

const yandexToken = process.env.YANDEX_SITE_VERIFICATION?.trim();
const head = entry.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? '';
assert.equal(head.match(/<meta name="yandex-verification" content="([^"]*)"/)?.[1], yandexToken || undefined);

const sitemap = readFileSync('out/sitemap.xml','utf8');
assert.equal((sitemap.match(/<loc>/g)||[]).length,paths.length * 2,'all localized pages in sitemap');
for(const lang of ['pt','en']) for(const path of paths) assert.ok(sitemap.includes(`${origin}/${lang}${path}`));
const robots = readFileSync('out/robots.txt', 'utf8');
for (const bot of ['Yandex', 'OAI-SearchBot']) assert.ok(robots.includes(`User-Agent: ${bot}\n`));
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
console.log('SEO: páginas, idiomas no HTML, metadados, canonical, hreflang, JSON-LD, sitemap e robots verificados.');
