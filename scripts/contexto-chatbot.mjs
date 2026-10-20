// Genera worker/chatbot/src/context.js con lo que dice la web de mí, sacado de
// los mismos textos que pinta Astro (src/i18n). Así el asistente sabe lo mismo
// que la web y no hay que copiar nada a mano: si cambio un texto, vuelvo a
// ejecutar el script.
//
// Uso: npm run chatbot:contexto   (Node 22.18+ lee los .ts sin compilarlos)

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { home } from "../src/i18n/home.ts";
import { sonrisaImperial } from "../src/i18n/projects.ts";
import { likes } from "../src/i18n/likes.ts";

const OUT = new URL("../worker/chatbot/src/context.js", import.meta.url);
const h = home.es;
const p = sonrisaImperial.es;
const l = likes.es;
const cs = p.caseStudy;

const lines = [
  "SOBRE MARC",
  `- ${h.hero.tagline}`,
  ...h.about.paragraphs.map((t) => `- ${t}`),
  ...h.about.facts.map((f) => `- ${f.label}: ${f.value}.`),
  "",
  "BITÁCORA",
  ...h.work.log.map((e) => `- ${e.type} · ${e.title}: ${e.text}`),
  "",
  `PROYECTO: ${p.name.toUpperCase()} (${p.label})`,
  `- ${p.summary}`,
  `- ${cs.problem.title}: ${cs.problem.text}`,
  `- ${cs.solution.title}:`,
  ...cs.solution.decisions.map((d) => `  - ${d.title} ${d.text}`),
  `- Métricas (${p.metricsNote}): ${p.metrics.map((m) => `${m.label} ${m.value}`).join(", ")}.`,
  `- ${cs.result.title}: ${cs.result.honest}`,
  `- ${cs.next.title}: ${cs.next.text}`,
  "- El caso completo está en la web, en «Lo que he hecho».",
  "",
  "LO QUE LE GUSTA",
  ...h.likes.groups.map((g) => `- ${g.title}: ${g.items.join(", ")}.`),
  `- ${l.bio.intro}`,
  `- Productos de biohacking que sigue: ${l.bio.products.map((x) => `${x.name} (${x.brand}): ${x.text}`).join(" ")}`,
  "- En la página «Me gusta» hay una Pokédex con modelos 3D, un mazo con las frases de Naruto y JoJo traducidas y su radar de biohacking con fotos.",
  "",
  "CONTACTO Y USUARIOS",
  `- ${h.contact.lead}`,
  "- Lo mejor es el formulario de la portada (sección «Contacto»): al enviarlo se crea un espacio privado en la web, «Mi espacio», donde la persona ve la conversación con Marc y su respuesta. Le llega un correo con el enlace y entra con un código, sin contraseña.",
  ...h.contact.channels.map((c) => `- ${c.name}: ${c.href}`),
  "",
  "ESTA WEB",
  "- Es la tercera versión de su web personal, con estética de «cuaderno de laboratorio». Está hecha con Astro, en español e inglés, y se publica con GitHub Actions en GitHub Pages.",
  "- Usa Supabase para los usuarios y los mensajes (con reglas de seguridad por fila), n8n para el formulario (captcha, crear la cuenta, clasificar el mensaje con IA y responder por correo) y este asistente en un Cloudflare Worker con Workers AI.",
  "- Cada bloque de la web tiene su issue, su rama y su pull request en github.com/marcalvear/mi-web.",
];

const body = lines.join("\n").replaceAll("`", "'");
const file = `// GENERADO por scripts/contexto-chatbot.mjs a partir de src/i18n. No lo edites a mano:
// cambia los textos de la web y vuelve a ejecutar \`npm run chatbot:contexto\`.

export const CONTEXT = \`${body}\`;
`;
await writeFile(OUT, file);
console.log(`Contexto del asistente: ${lines.length} líneas → ${fileURLToPath(OUT)}`);
