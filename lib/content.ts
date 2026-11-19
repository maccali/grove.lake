// Centralize aqui os links e textos. As artes SVG são conceitos visuais substituíveis.
export const artist = {
  name: 'Grove Lake',
  founder: 'Guilherme Maccali',
  youtube: 'https://www.youtube.com/@grovelakemusic',
  spotify: 'https://open.spotify.com/intl-pt/artist/3w5QkuCxzp8kT4YZjJ1HEI',
  amazonMusic: 'https://music.amazon.com.br/artists/B0DFNP9NYX/grove-lake',
  appleMusic: 'https://music.apple.com/us/artist/grove-lake/1765462780',
};
const universeDetails: Record<string, { title?: string; entryArt?: string }> = {
  area51: { entryArt: '/art/universes/area51.webp' },
  isaac: { entryArt: '/art/universes/isaac.webp' },
  kingdom: { entryArt: '/art/universes/kingdom.webp' },
  neon: { entryArt: '/art/universes/neon.webp' },
  'harmony-and-caos': { title: 'Harmony and Caos', entryArt: '/art/universes/harmony-and-caos.webp' },
  'purple-gold': { title: 'Purple Gold from Ametista do Sul', entryArt: '/art/universes/purple-gold.webp' },
  'lofi-deck': { title: 'Lofi Deck', entryArt: '/art/universes/lofi-deck.webp' },
  relume: { entryArt: '/art/universes/relume.webp' },
  'goblin-of-easton': { entryArt: '/art/universes/goblin-of-easton.webp' },
  'funny-love': { entryArt: '/art/universes/funny-love.webp' },
  enigma: { entryArt: '/art/universes/enigma.webp' },
  portal: { entryArt: '/art/universes/portal.webp' },
  'chasing-shadows': { entryArt: '/art/universes/chasing-shadows.webp' },
};

type Release = {
  id: string;
  title: string;
  art?: string;
  genre?: string;
  forthcoming?: boolean;
  releaseDate?: string;
  tracks?: { title: string; duration: number }[];
  duration?: number;
  universe?: string;
  kind?: 'single' | 'ep';
};

export const albums: Release[] = [
  { id: 'area51', title: 'AREA 51: MY SHIP', genre: 'HIP-HOP / R&B / SPACE', art: '/art/area51-cover.png', tracks: [
      { title: "Last Month on Earth", duration: 121 },
      { title: "Concrete Mirage", duration: 155 },
      { title: "Area 51 Bus Stop", duration: 250 },
      { title: "No Cameras Past This Point", duration: 185 },
      { title: "Beings of Underitia", duration: 121 },
      { title: "Visitors Only", duration: 137 },
      { title: "My Ship", duration: 126 },
      { title: "Kiss the Atmosphere Goodbye", duration: 176 },
      { title: "Blue Planet Below", duration: 237 },
      { title: "Welcome to Mars", duration: 194 },
      { title: "Red District", duration: 283 },
      { title: "Oxygen on Credit", duration: 159 },
      { title: "Gravity Doesn’t Hurt Here", duration: 143 },
      { title: "Beyond the Horizon", duration: 137 },
      { title: "We Made Mars Home", duration: 193 },
    ], forthcoming: true, releaseDate: '2026-12-11' },
  { id: 'isaac', title: 'Isaac Claw: Dust, Blood and Gold', genre: 'WESTERN / TRAP', art: '/art/isaac-cover.webp', tracks: [
      { title: "Buried Before the War", duration: 230 },
      { title: "One Man Remembered", duration: 156 },
      { title: "Never Meant to Return", duration: 130 },
      { title: "Hunger Speaks Louder", duration: 143 },
      { title: "Already Watching", duration: 165 },
      { title: "Footsteps in Dust", duration: 161 },
      { title: "Faster Than His Past", duration: 117 },
      { title: "Gold Calls Blood", duration: 98 },
      { title: "Where Earth Was Warm", duration: 189 },
      { title: "Crown of Gold", duration: 173 },
      { title: "Eyes Like Guns", duration: 169 },
      { title: "Called a Savior", duration: 135 },
      { title: "Called a Thief", duration: 102 },
      { title: "Name in Red", duration: 141 },
      { title: "Rides Alone with Gold", duration: 188 },
    ] },
  { id: 'kingdom', title: 'Kingdom of the Southern Sky: Where the Wind Still Burns', genre: 'SOUTHERN / TRAP', art: '/art/kingdom-cover.webp', tracks: [
      { title: "Sacred High Ground", duration: 83 },
      { title: "Free Flight", duration: 146 },
      { title: "The Eternal Sentinel", duration: 140 },
      { title: "Wild Circuit", duration: 143 },
      { title: "Brother of the Wind", duration: 130 },
      { title: "Rising from the Ashes", duration: 121 },
      { title: "Welcome", duration: 124 },
      { title: "Lake Dance", duration: 102 },
      { title: "Fading Ember", duration: 133 },
      { title: "Howling Wind", duration: 93 },
      { title: "The Call", duration: 140 },
      { title: "Grove Dance", duration: 121 },
      { title: "Laughing in the Grass", duration: 122 },
      { title: "Horse Power", duration: 159 },
      { title: "Wanderings", duration: 168 },
    ] },
  { id: 'neon', title: 'Neon Signals: The Otherside Waves', genre: 'SYNTHWAVE / HIP-HOP', art: '/art/neon-cover.webp', tracks: [
      { title: "FM Rift Run", duration: 187 },
      { title: "Hero Pulse from the Other Side", duration: 159 },
      { title: "Neon Outlaw Trail", duration: 167 },
      { title: "Whispers of the Parallel Pulse", duration: 150 },
      { title: "Textured Echo Drive", duration: 173 },
      { title: "Slapwave Romance", duration: 144 },
      { title: "Rapid Entity Transmission", duration: 159 },
      { title: "Spectral Arpeggio Awakens", duration: 190 },
      { title: "Neon Heat Trap", duration: 142 },
      { title: "Deep Breaker from Beyond", duration: 216 },
      { title: "Mainstream Echo Lights", duration: 150 },
    ] },
  { id: "eight-of-diamonds", title: "Eight of Diamonds", kind: 'single', universe: 'lofi-deck', duration: 174, art: '/art/eight-of-diamonds-cover.webp' },
  { id: "relume", title: "Relume", art: "/art/relume-cover.webp", kind: 'single', duration: 160 },
  { id: "goblin-of-easton", title: "Goblin of Easton", art: "/art/goblin-of-easton-cover.webp", kind: 'single', duration: 156 },
  { id: "ten-of-diamonds", title: "Ten of Diamonds", kind: 'single', universe: 'lofi-deck', duration: 186, art: '/art/ten-of-diamonds-cover.webp' },
  { id: "five-of-clubs", title: "Five of Clubs", kind: 'single', universe: 'lofi-deck', duration: 185, art: '/art/five-of-clubs-cover.webp' },
  { id: "queen-of-hearts", title: "Queen of Hearts", kind: 'single', releaseDate: '2025-08-24', universe: 'lofi-deck', duration: 204, art: '/art/queen-of-hearts-cover.webp' },
  { id: "seven-of-spades", title: "Seven of Spades", kind: 'single', releaseDate: '2025-08-14', universe: 'lofi-deck', duration: 229, art: '/art/seven-of-spades-cover.webp' },
  { id: "purple-gold", title: "Purple Gold", art: "/images/covers/purple-gold/purple-gold.png", kind: 'single', releaseDate: '2025-08-07', universe: 'purple-gold', duration: 189 },
  { id: "ace-of-hearts", title: "Ace of Hearts", kind: 'single', releaseDate: '2025-07-31', universe: 'lofi-deck', duration: 186, art: '/art/ace-of-hearts-cover.webp' },
  { id: "funny-love", title: "Funny Love", kind: 'single', releaseDate: '2025-07-24', duration: 152, art: '/art/funny-love-cover.webp' },
  { id: "bang", title: "Bang", art: "/images/covers/purple-gold/bang.png", kind: 'single', releaseDate: '2025-07-19', universe: 'purple-gold', duration: 193 },
  { id: "enigma", title: "Enigma", kind: 'single', releaseDate: '2025-07-10', duration: 192, art: '/art/enigma-cover.webp' },
  { id: "violet-currents", title: "Violet Currents", art: "/images/covers/purple-gold/violet-currents.png", kind: 'single', releaseDate: '2025-07-03', universe: 'purple-gold', duration: 194 },
  { id: "mining-the-light", title: "Mining the Light", art: "/images/covers/purple-gold/mining-the-light.png", kind: 'single', releaseDate: '2025-06-25', universe: 'purple-gold', duration: 159 },
  { id: "stay-calm-surrounded-by-fire", title: "Stay Calm, Surrounded by Fire", art: "/images/covers/harmony-and-caos/stay-calm.png", kind: 'single', releaseDate: '2025-05-28', universe: 'harmony-and-caos', duration: 194 },
  { id: "dodging-bullets", title: "Dodging Bullets", art: "/images/covers/harmony-and-caos/dodging-bullets.png", kind: 'single', releaseDate: '2025-04-29', universe: 'harmony-and-caos', duration: 173 },
  { id: "sunrise", title: "Sunrise", art: "/images/covers/purple-gold/sunrise.png", kind: 'single', releaseDate: '2025-06-12', universe: 'purple-gold', duration: 180 },
  { id: "robot-and-dog", title: "Robot and Dog", art: "/images/covers/harmony-and-caos/robot-and-dog.png", kind: 'single', releaseDate: '2025-03-31', universe: 'harmony-and-caos', duration: 229 },
  { id: "march", title: "March", art: "/images/covers/harmony-and-caos/march.png", kind: 'single', releaseDate: '2025-03-24', universe: 'harmony-and-caos', duration: 201 },
  { id: "rising-smoke", title: "Rising Smoke", art: "/images/covers/harmony-and-caos/rising-smoke.png", kind: 'single', releaseDate: '2025-09-19', universe: 'harmony-and-caos', duration: 222 },
  { id: "tiny-bird", title: "Tiny Bird", art: "/images/covers/harmony-and-caos/tiny-bird.png", kind: 'single', releaseDate: '2025-02-06', universe: 'harmony-and-caos', duration: 198 },
  { id: "portal", title: "Portal", art: "/images/covers/portal/portal.png", releaseDate: '2024-11-11', tracks: [
      { title: "Horizon", duration: 229 },
      { title: "Gateway", duration: 294 },
      { title: "Walkie Talkies", duration: 196 },
      { title: "Flashlights", duration: 255 },
      { title: "Resonance Frequencies", duration: 196 },
      { title: "Resonance Echoes", duration: 228 },
    ] },
  { id: "chasing-shadows", title: "Chasing Shadows", art: "/images/covers/chasing-shadows/chasing-shadows.jpeg", releaseDate: '2024-09-19', tracks: [
      { title: "The Rider", duration: 229 },
      { title: "Run and Reflect", duration: 312 },
      { title: "Sirens", duration: 196 },
      { title: "Dancing of the Lights", duration: 262 },
      { title: "Final Stretch", duration: 229 },
    ] },
];
export function universeId(release: Release) {
  return release.universe ?? release.id;
}

export const universes = Array.from(new Set(albums.map(universeId)), id => {
  const releases = albums.filter(release => universeId(release) === id);
  const firstRelease = releases.find(release => release.id === id) ?? releases[0];
  const details = universeDetails[id];

  return {
    id,
    title: details?.title ?? firstRelease.title.split(':', 1)[0].trim(),
    entryArt: details?.entryArt,
    releases,
  };
});

export function formatDuration(seconds: number) {
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}

export const albumSearch = (title: string) => `https://www.youtube.com/@grovelakemusic/search?query=${encodeURIComponent(title)}`;
