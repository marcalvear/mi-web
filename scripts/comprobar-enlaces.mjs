// Comprueba, después de compilar, que todos los enlaces que salen de la web se
// abren en otra pestaña (target="_blank" con rel="noopener"). Si alguno no lo
// hace, dice en qué página está y termina con error para que falle el despliegue.
// Uso: npm run build && node scripts/comprobar-enlaces.mjs

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = "dist";
const SITE = "https://marcalvear.github.io/mi-web";

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

const problems = [];
let checked = 0;
for await (const file of htmlFiles(DIST)) {
  const html = await readFile(file, "utf8");
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    const href = tag.match(/\bhref="([^"]+)"/)?.[1];
    if (!href || !/^(https?:)?\/\//.test(href) || href.startsWith(SITE)) continue;
    checked++;
    const blank = /\btarget="_blank"/.test(tag);
    const noopener = /\brel="[^"]*\bnoopener\b/.test(tag);
    if (!blank || !noopener) problems.push(`${file.slice(DIST.length + 1)}: ${href}`);
  }
}

if (problems.length) {
  console.error(`Enlaces externos que se abren en la misma pestaña (${problems.length}):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`Enlaces externos: ${checked}, todos se abren en otra pestaña.`);
