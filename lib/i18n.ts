export type Language = 'pt' | 'en';
export function formatReleaseDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export const languageKey = 'grove-lake-language';
export function detectLanguage(languages: readonly string[]): Language {
  for (const tag of languages) {
    const base = tag.toLowerCase().split(/[-_]/)[0];
    if (base === 'pt' || base === 'en') return base;
  }
  return 'en';
}
type ReleaseCopy = { subtitle?: string; description: string };

export const translations = {
  pt: {
    htmlLang: 'pt-BR', title: 'Grove Lake — Cada álbum, um universo', description: 'Hip-hop instrumental, synthwave e histórias sem palavras. Explore os universos musicais de Grove Lake.',
    skip: 'Pular para o conteúdo', home: 'Grove Lake início', nav: 'Principal', universes: 'Universos', project: 'O projeto', connect: 'Conecte-se', listen: 'Ouvir agora', closeMenu: 'Fechar menu', openMenu: 'Abrir menu', language: 'Idioma do site',
    independent: 'INDEPENDENTE. INSTRUMENTAL. SEM FRONTEIRAS.', heroFirst: 'Cada álbum,', heroSecond: 'um', heroWorld: 'universo.', stories: 'Histórias sem palavras.', beats: 'Beats que levam você para outro lugar.', journey: 'Entre nessa viagem', explore: 'Explore os universos', hiphop: 'HIP-HOP INSTRUMENTAL', made: 'FEITO NO BRASIL, PARA VIAJAR.',
    shipAlt: 'Ilustração conceitual de uma nave iluminada sobre o deserto marciano', transmission: 'TRANSMISSÃO 051', nextWorld: 'PRÓXIMO UNIVERSO', discover: 'Conhecer AREA 51 MY SHIP', coordinates: 'TERRA → MARTE / SEM PASSAGEM DE VOLTA', noWords: 'SEM PALAVRAS. SÓ UNIVERSOS.', ai: 'Criação humana, com apoio de IA',
    discography: '01 / DISCOGRAFIA', destination: 'Escolha seu destino.', creator: 'O mesmo criador.', landscapes: 'Outras paisagens sonoras.', artAlt: 'Capa de ',
    sideA: 'LADO A / UNIVERSOS INFINITOS', earth: 'NASCIDO NA TERRA.', elsewhere: 'RUMO A OUTRO LUGAR.', behind: '02 / POR TRÁS DO SOM', mind: 'Uma mente.', worlds: 'Muitos mundos.',
    bio: 'Grove Lake é o projeto de hip-hop instrumental de Guilherme Maccali. Cada álbum nasce como uma antologia: um cenário, uma história e uma identidade sonora.',
    story: 'Do neon da cidade à poeira do faroeste. Das raízes do sul ao silêncio do espaço. O ponto de partida muda. A vontade de explorar continua.',
    ideas: 'Ideias, melodias e direção humanas.', technology: 'Tecnologia como parte do processo criativo.', continue: '03 / CONTINUE A VIAGEM', nextDestination: 'Seu próximo destino', starts: 'começa com um', play: 'play.', videos: 'VÍDEOS E ÁLBUNS', find: 'ENCONTRE GROVE LAKE', top: 'Voltar ao topo ↑', close: 'Fechar detalhes', concept: 'Conceito visual de ', trackCount: (count: number) => count + ' FAIXAS', single: 'SINGLE', ep: 'EP', album: 'ÁLBUM', releaseDescription: (title: string) => 'Conheça ' + title + ', de Grove Lake.', search: 'Buscar no canal', trackJourney: 'A viagem, faixa a faixa', release: 'Lançamento previsto para', released: 'Lançado em', duration: 'Duração', universe: 'Universo', releases: 'Lançamentos', universeDescription: (title: string) => 'Explore os lançamentos de ' + title + ', um universo de Grove Lake.', sameUniverse: 'Do mesmo universo', follow: 'Acompanhe no YouTube',
    albumText: {
      area51: { subtitle: 'Uma fuga. Um novo mundo.', description: 'Da Terra-prisão a um novo lar em Marte. Quinze faixas de hip-hop instrumental, baixos FM e atmosferas dos anos 80 contam uma história de liberdade.' },
      isaac: { description: 'Poeira na estrada, ouro no horizonte. Guitarras western e a força do 808 se encontram em um universo de trap cinematográfico.' },
      kingdom: { description: 'O vento do sul encontra o grave do trap. Acordeon, violão e influências gaúchas dão forma a uma paisagem sonora própria.' },
      neon: { description: 'Sintetizadores, luzes noturnas e batidas de hip-hop. Uma viagem instrumental pelas cores e sensações da madrugada.' },
    } satisfies Partial<Record<string, ReleaseCopy>>,
  },
  en: {
    htmlLang: 'en', title: 'Grove Lake — Every album, a universe', description: 'Instrumental hip-hop, synthwave and stories without words. Explore the musical worlds of Grove Lake.',
    skip: 'Skip to content', home: 'Grove Lake home', nav: 'Main navigation', universes: 'Universes', project: 'The project', connect: 'Connect', listen: 'Listen now', closeMenu: 'Close menu', openMenu: 'Open menu', language: 'Website language',
    independent: 'INDEPENDENT. INSTRUMENTAL. NO BORDERS.', heroFirst: 'Every album,', heroSecond: 'a', heroWorld: 'universe.', stories: 'Stories without words.', beats: 'Beats that take you somewhere else.', journey: 'Take the journey', explore: 'Explore the universes', hiphop: 'INSTRUMENTAL HIP-HOP', made: 'MADE IN BRAZIL. BOUND FOR ELSEWHERE.',
    shipAlt: 'Concept illustration of an illuminated spaceship above the Martian desert', transmission: 'TRANSMISSION 051', nextWorld: 'THE NEXT UNIVERSE', discover: 'Discover AREA 51 MY SHIP', coordinates: 'EARTH → MARS / NO RETURN TICKET', noWords: 'NO WORDS. JUST WORLDS.', ai: 'Human Created, AI-Assisted',
    discography: '01 / DISCOGRAPHY', destination: 'Choose your destination.', creator: 'The same creator.', landscapes: 'Different sonic landscapes.', artAlt: 'Cover of ',
    sideA: 'SIDE A / INFINITE WORLDS', earth: 'EST. ON EARTH.', elsewhere: 'HEADED ELSEWHERE.', behind: '02 / BEHIND THE SOUND', mind: 'One mind.', worlds: 'Many worlds.',
    bio: 'Grove Lake is Guilherme Maccali’s instrumental hip-hop project. Each album is an anthology: a setting, a story and a sonic identity of its own.',
    story: 'From city neon to frontier dust. From southern Brazilian roots to the silence of space. The starting point changes. The urge to explore remains.',
    ideas: 'Human ideas, melodies and creative direction.', technology: 'Technology as part of the creative process.', continue: '03 / KEEP EXPLORING', nextDestination: 'Your next destination', starts: 'starts with a', play: 'play.', videos: 'VIDEOS & ALBUMS', find: 'FIND GROVE LAKE', top: 'Back to top ↑', close: 'Close details', concept: 'Visual concept for ', trackCount: (count: number) => count + ' TRACKS', single: 'SINGLE', ep: 'EP', album: 'ALBUM', releaseDescription: (title: string) => 'Explore ' + title + ' by Grove Lake.', search: 'Find on the channel', trackJourney: 'The journey, track by track', release: 'Scheduled for', released: 'Released on', duration: 'Duration', universe: 'Universe', releases: 'Releases', universeDescription: (title: string) => 'Explore the releases from ' + title + ', a Grove Lake universe.', sameUniverse: 'From the same universe', follow: 'Follow on YouTube',
    albumText: {
      area51: { subtitle: 'One escape. A new world.', description: 'From a prison planet to a new home on Mars. Fifteen tracks of instrumental hip-hop, FM bass and 80s atmospheres tell a story of freedom.' },
      isaac: { description: 'Dust on the road, gold on the horizon. Western guitars meet the weight of the 808 in a world of cinematic trap.' },
      kingdom: { description: 'Southern winds meet deep trap bass. Accordion, acoustic guitar and influences from southern Brazil shape a sonic landscape of their own.' },
      neon: { description: 'Synths, city lights and hip-hop beats. An instrumental journey through the colors and feelings of the night.' },
    } satisfies Partial<Record<string, ReleaseCopy>>,
  },
};

export function releaseCopy(language: Language, id: string, title: string): ReleaseCopy {
  const t = translations[language];
  const copy: Partial<Record<string, ReleaseCopy>> = t.albumText;
  return copy[id] ?? {description: t.releaseDescription(title)};
}

const universeTaglines: Partial<Record<string, Record<Language, string>>> = {
  "area51": { pt: "Hip-hop espacial, da fuga da Terra à chegada em Marte.", en: "Space hip-hop, from an escape off Earth to a landing on Mars." },
  "isaac": { pt: "Trap cinematográfico entre guitarras de faroeste, poeira e ouro.", en: "Cinematic trap with frontier guitars, dust and gold." },
  "kingdom": { pt: "Acordeon, violão e graves de trap no sul do Brasil.", en: "Accordion, acoustic guitar and trap bass in southern Brazil." },
  "neon": { pt: "Synthwave e hip-hop sob as luzes da cidade à noite.", en: "Synthwave and hip-hop under the city lights at night." },
  "lofi-deck": { pt: "Beats lo-fi em uma série inspirada em cartas de baralho.", en: "Lo-fi beats in a series inspired by playing cards." },
  "relume": { pt: "Um céu noturno e uma estrela dourada sobre Relume.", en: "A night sky and a golden star above Relume." },
  "goblin-of-easton": { pt: "Vinil crepitante, piano Rhodes e clima de assombração.", en: "Vinyl crackle, Rhodes piano and a haunted mood." },
  "purple-gold": { pt: "O roxo da ametista e o dourado da luz em Ametista do Sul.", en: "Amethyst purple and golden light in Ametista do Sul." },
  "funny-love": { pt: "Hip-hop bem-humorado com violoncelo, flauta e sintetizadores.", en: "Playful hip-hop with cello, flute and synths." },
  "enigma": { pt: "Um mistério em tons de azul e violeta.", en: "A mystery in shades of blue and violet." },
  "harmony-and-caos": { pt: "Batidas instrumentais entre tensão e calma.", en: "Instrumental beats between tension and calm." },
  "portal": { pt: "Seis faixas de travessia entre sinais, luzes e ecos.", en: "Six tracks that cross through signals, lights and echoes." },
  "chasing-shadows": { pt: "Uma perseguição instrumental entre sirenes e luzes em movimento.", en: "An instrumental chase through sirens and moving lights." },
};

export function universeTagline(language: Language, id: string) {
  return universeTaglines[id]?.[language];
}

const universeTitles: Partial<Record<string, Record<Language, string>>> = {
  'goblin-of-easton': { pt: 'Lo-fi de Halloween', en: 'Halloween Lo-fi' },
  'funny-love': { pt: 'Funny Vibes', en: 'Funny Vibes' },
};

export function universeTitle(language: Language, universe: { id: string; title: string }) {
  return universeTitles[universe.id]?.[language] ?? universe.title;
}
