// Descarga una sola vez todas las frases de Naruto y JoJo de Animechan y las
// guarda en src/data/frases-anime.json. La web las baraja desde ese fichero,
// así no gasta el límite de 100 peticiones al día de la API ni repite frases.
//
// Uso: node scripts/descargar-frases.mjs
// Docs de la API: https://animechan.io/docs

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const API = "https://api.animechan.io/v1/quotes";
const SERIES = { naruto: "naruto", jojo: "jojo" };
const OUT = new URL("../src/data/frases-anime.json", import.meta.url);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchPage(anime, page) {
  const res = await fetch(`${API}?anime=${anime}&page=${page}`);
  if (res.status === 404) return []; // no quedan páginas
  if (res.status === 429) throw new Error("Límite diario de Animechan alcanzado; prueba mañana.");
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${anime}, página ${page}`);
  // Algunas frases traen saltos de línea sin escapar: se limpian antes de leerlas
  const text = (await res.text()).replace(/[\u0000-\u001f]+/g, " ");
  return JSON.parse(text).data ?? [];
}

const quotes = [];
const seen = new Set();

for (const [key, anime] of Object.entries(SERIES)) {
  let count = 0;
  for (let page = 1; ; page++) {
    const data = await fetchPage(anime, page);
    if (data.length === 0) break;
    for (const q of data) {
      const text = q.content.replace(/\s+/g, " ").trim();
      if (seen.has(text)) continue;
      seen.add(text);
      quotes.push({ anime: key, series: q.anime.name, character: q.character.name, text });
      count++;
    }
    await sleep(300); // sin prisa: es un servicio gratuito
  }
  console.log(`${key}: ${count} frases`);
}

await writeFile(OUT, JSON.stringify(quotes, null, 2) + "\n");
console.log(`Guardadas ${quotes.length} frases en ${fileURLToPath(OUT)}`);
