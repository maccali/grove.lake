# Grove Lake

Site do projeto musical Grove Lake em Next.js 16, React 19 e TypeScript. App Router, layout responsivo, catálogo com páginas próprias dos álbuns e modal do destaque, tracklist de AREA 51 e links para ouvir. Não precisa de banco de dados. As variáveis opcionais estão em `.env.example`.

## Rodar

Use Node.js 22 ou superior.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000.

```bash
npm run typecheck
npm run build
npx serve out
```

## Publicar na Vercel

1. Extraia o ZIP e suba o conteúdo da pasta `grove-lake` para um repositório no GitHub.
2. Na Vercel, clique em **Add New → Project** e importe esse repositório.
3. O framework é **Next.js**. Se o repositório contém uma pasta `grove-lake`, selecione essa pasta em **Root Directory**; se o package.json está na raiz, mantenha a raiz.
4. Mantenha os comandos padrão: instalação `npm ci`, build `npm run build`. Não altere o Output Directory.
5. Clique em **Deploy**. Configure `NEXT_PUBLIC_SITE_URL=https://grovelake.art`. Para ativar o Analytics, informe também `NEXT_PUBLIC_GA_ID` com seu ID real `G-...`.

Alternativa com a CLI, dentro da pasta do projeto:

```bash
npx vercel
npx vercel --prod
```

## Personalizar

- `lib/content.ts`: nome, URLs, catálogo e tracklist. Cada lançamento sem vínculo inicia seu próprio universo, com o nome antes de `:`. Defina a imagem de entrada em `universeDetails.entryArt` e a capa do lançamento em `art`. Para expandi-lo, use o `id` desse lançamento no campo `universe` dos novos singles, EPs ou álbuns. Para entrar em um universo já nomeado, use a chave correspondente em `universeDetails`.
- `app/page.tsx`: seções e textos.
- `app/globals.css`: identidade, layout e cores.
- `public/art/`: capas e artes do catálogo. Ajuste `art` em `lib/content.ts`.
- `app/layout.tsx`: metadados de SEO e compartilhamento.
- `public/grove-lake-social.jpg`: imagem de compartilhamento. Na Vercel, os metadados usam o domínio de produção do projeto para servir a imagem quando a variável de sistema estiver disponível.

### Antes de divulgar

O YouTube usa o endereço informado do canal `@grovelakemusic`. Os botões do Spotify, Amazon Music e Apple Music abrem os perfis de Grove Lake. Os botões dos álbuns publicados buscam pelo título dentro do canal do YouTube. Não há prévias de áudio locais nem player falso: adicione URLs reais caso queira um player no futuro.

AREA 51 tem lançamento previsto para **11 de dezembro de 2026**. Os textos e a tracklist foram montados a partir do contexto fornecido. O catálogo combina capas disponíveis e artes conceituais. Sem formulário ou backend. O Google Analytics é opcional e só carrega quando existe um `NEXT_PUBLIC_GA_ID` válido.

As fontes DM Sans e Barlow Condensed são carregadas do Google Fonts, com fontes de sistema como fallback. Se preferir eliminar a dependência externa, hospede os arquivos de fontes em `public/fonts` ou remova o `@import`.

## Idiomas

A interface está em português e inglês. No primeiro acesso, usa o primeiro idioma português ou inglês nas preferências do navegador; caso nenhum seja compatível, usa inglês. O seletor PT / EN tem prioridade e lembra a escolha no localStorage. Funciona mesmo quando o armazenamento está bloqueado, sem persistir a escolha nesse caso. Títulos oficiais de álbuns e faixas são preservados. Traduções em `lib/i18n.ts`. A página de entrada `/` encaminha para o idioma preferido. `/pt` e `/en` são páginas independentes, pré-renderizadas com conteúdo, metadados e atributo `lang` corretos, sem depender de JavaScript para indexação. URLs de idioma acessadas diretamente têm prioridade sobre a preferência salva.


## SEO e Analytics

- Páginas `/pt`, `/en` e páginas de cada álbum em `/{idioma}/albums/{id}`, com links HTML rastreáveis.
- Título, descrição, canonical e hreflang gerados no servidor em cada página, com Open Graph e Twitter Cards.
- Dados estruturados JSON-LD `MusicGroup`, `WebSite` e `MusicAlbum`, sem inventar avaliações, datas ou perfis oficiais.
- Sitemap em `/sitemap.xml` e regras em `/robots.txt`.
- O domínio canônico padrão é `https://grovelake.art`; ajuste `NEXT_PUBLIC_SITE_URL` se necessário antes do build.
- O GA4 só é carregado com `NEXT_PUBLIC_GA_ID` válido. Sem o ID, nenhum script de medição é enviado. A página de entrada não dispara medição antes do redirecionamento de idioma.
- Pageviews usam o evento padrão de configuração do Google. Links principais de plataformas emitem `listen_click`; aberturas do catálogo emitem `album_open`; trocas de idioma emitem `language_change`. Dados enviados são plataforma, identificador do álbum e idioma; sem nome do visitante ou informações de contato. Google Signals e personalização de anúncios ficam desativados.
- Na Vercel, cadastre as variáveis para Production e refaça o deploy: variáveis `NEXT_PUBLIC_*` são incorporadas no build. No desenvolvimento, copie `.env.example` para `.env.local`.
- Para verificar a instalação, abra o site com o ID real e consulte o relatório **Tempo real** do GA4. Bloqueadores e preferências do navegador podem impedir a medição.
- `GOOGLE_SITE_VERIFICATION` é opcional: recebe o conteúdo da meta tag de verificação do Search Console. A verificação de domínio via TXT também pode ser feita no DNS, sem esta variável.

Depois de conectar o domínio e tornar o site público na Vercel, verifique `https://grovelake.art/sitemap.xml`, cadastre a propriedade no Google Search Console e envie o sitemap. A prévia privada exige login e não pode ser indexada pelo Google. A configuração técnica não garante ranking: conteúdo, relevância, menções e concorrência também influenciam os resultados.

Este pacote usa exportação estática (`output: "export"`), compatível com a Vercel. Para visualizar o build local, use `npx serve out`; `next start` não é usado neste perfil.
