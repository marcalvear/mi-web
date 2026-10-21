// Genera worker/chatbot/src/context.js con lo que dice la web de mí, sacado de
// los mismos textos que pinta Astro (src/i18n). Así el asistente sabe lo mismo
// que la web y no hay que copiar nada a mano: si cambio un texto, vuelvo a
// ejecutar el script.
//
// También genera COMPENDIO, todo el compendio de biohacking sacado de
// src/content/compendio, para cuando el asistente hace de «boticario» (#69).
//
// Uso: npm run chatbot:contexto   (Node 22.18+ lee los .ts sin compilarlos)

import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { home } from "../src/i18n/home.ts";
import { sonrisaImperial } from "../src/i18n/projects.ts";
import { likes } from "../src/i18n/likes.ts";
import { compendio } from "../src/i18n/compendio.ts";

const OUT = new URL("../worker/chatbot/src/context.js", import.meta.url);
const h = home.es;
const p = sonrisaImperial.es;
const l = likes.es;
const cs = p.caseStudy;
const c = compendio.es;

// Compendio: los mismos JSON que valida src/content.config.ts al compilar
const DIR = new URL("../src/content/compendio/", import.meta.url);
async function load(folder) {
  const files = (await readdir(new URL(`${folder}/`, DIR))).filter((f) => f.endsWith(".json")).sort();
  return Promise.all(
    files.map(async (f) => ({
      id: f.replace(/\.json$/, ""),
      ...JSON.parse(await readFile(new URL(`${folder}/${f}`, DIR), "utf8")),
    })),
  );
}
const problems = (await load("problemas")).sort((a, b) => a.orden - b.orden);
const supplements = new Map((await load("suplementos")).map((s) => [s.id, s]));
const PAGE = "https://marcalvear.github.io/mi-web/biohacking/";

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
  "COMPENDIO DE BIOHACKING",
  `- ${c.lead} Está en ${PAGE} (en inglés, /mi-web/en/biohacking/). ${c.disclaimer.text}`,
  ...problems.map(
    (pr) => `- ${pr.nombre.es}: ${pr.suplementos.map((id) => supplements.get(id)?.nombre.es).filter(Boolean).join(", ")}.`,
  ),
  "- Cada ficha se puede guardar con una estrella y aparece en «Mi espacio». Dentro del compendio, este asistente hace de «boticario»: si alguien quiere saber qué suplemento mirar para lo que le pasa, recomiéndale preguntarle allí.",
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

// El compendio entero, para el modo boticario, en los dos idiomas: el Worker
// elige el de la página para que no mezcle datos en español en una respuesta
// en inglés
const LABELS = {
  es: {
    notice: "Aviso de la página",
    problem: "PROBLEMA",
    body: "Qué pasa en el cuerpo",
    combine: "Combinarlos",
    alarm: "Ve al médico antes que a un suplemento si además",
    sheet: "FICHA",
    what: "Qué es",
    evidence: "Evidencia",
    why: "Por qué este nivel",
    how: "Cómo funciona",
    dose: "Dosis estudiada",
    when: "Cuándo",
    found: "Qué encontraron los estudios",
    cautions: "Precauciones",
    products: "Productos que miraría Marc",
    price: "precio",
  },
  en: {
    notice: "Notice on the page",
    problem: "PROBLEM",
    body: "What's going on in the body",
    combine: "Combining them",
    alarm: "See a doctor before trying a supplement if you also",
    sheet: "SHEET",
    what: "What it is",
    evidence: "Evidence",
    why: "Why this level",
    how: "How it works",
    dose: "Dose studied",
    when: "When",
    found: "What the studies found",
    cautions: "Cautions",
    products: "Products Marc would look at",
    price: "price",
  },
};

function compendioFor(lang) {
  const t = compendio[lang];
  const L = LABELS[lang];
  const page = lang === "es" ? PAGE : PAGE.replace("/mi-web/", "/mi-web/en/");
  const noDot = (text) => text.replace(/\.$/, "");
  const evidence = (level) => `${t.evidence[level]} (${noDot(t.legend[level])})`;
  return [
    `${t.title.toUpperCase()}: ${page}`,
    `${L.notice}: ${t.disclaimer.text}`,
    "",
    ...problems.flatMap((pr) => [
      `${L.problem}: ${pr.nombre[lang].toUpperCase()} (${page}#${pr.id})`,
      `- ${pr.intro[lang]}`,
      `- ${L.body}: ${pr.queOcurre[lang]}`,
      `- ${L.combine}: ${pr.combinar[lang]}`,
      `- ${L.alarm}: ${pr.alarma.map((a) => a[lang].toLowerCase()).join("; ")}.`,
      "",
      ...pr.suplementos.flatMap((id) => {
        const s = supplements.get(id);
        if (!s) return [];
        return [
          `${L.sheet}: ${s.nombre[lang]} (${s.tipo[lang]}) · ${page}#${id}`,
          `- ${L.what}: ${s.resumen[lang]}`,
          `- ${L.evidence}: ${evidence(s.evidencia)}. ${L.why}: ${s.porQue[lang]}`,
          `- ${L.how}: ${s.mecanismo[lang]}`,
          `- ${L.dose}: ${noDot(s.dosis[lang])}. ${L.when}: ${noDot(s.cuando[lang])}.`,
          `- ${L.found}:`,
          ...s.hallazgos.map((h) => {
            const f = s.fuentes.find((x) => x.pmid === h.fuente);
            return `  - ${h.texto[lang]} [${f ? `${f.autores.split(",")[0]} et al., ${f.anio}, ${f.revista}, ` : ""}PMID ${h.fuente}]`;
          }),
          `- ${L.cautions}: ${s.precauciones.map((x) => x[lang]).join(" ")}`,
          ...(s.productos?.length
            ? [
                `- ${L.products} (${t.card.productsNote}):`,
                ...s.productos.map(
                  (x) =>
                    `  - ${x.marca}, ${x.nombre}${x.pais ? ` (${x.pais[lang]})` : ""}: ${x.datos.map((d) => `${d.k[lang].toLowerCase()} ${d.v[lang]}`).join("; ")}; ${L.price} ${x.precio[lang]}. ${x.url}`,
                ),
              ]
            : []),
          "",
        ];
      }),
    ]),
  ];
}
const compendioEs = compendioFor("es");
const compendioEn = compendioFor("en");

const clean = (l) => l.join("\n").replaceAll("`", "'").replaceAll("${", "$ {");
const file = `// GENERADO por scripts/contexto-chatbot.mjs a partir de src/i18n y
// src/content/compendio. No lo edites a mano: cambia los textos de la web y
// vuelve a ejecutar \`npm run chatbot:contexto\`.

export const CONTEXT = \`${clean(lines)}\`;

// El compendio entero para el modo boticario (#69), en el idioma de la página
export const COMPENDIO = {
  es: \`${clean(compendioEs)}\`,
  en: \`${clean(compendioEn)}\`,
};
`;
await writeFile(OUT, file);
console.log(
  `Contexto del asistente: ${lines.length} líneas; compendio: ${compendioEs.length} líneas por idioma → ${fileURLToPath(OUT)}`,
);
