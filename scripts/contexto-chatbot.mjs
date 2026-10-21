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
import { hobbies } from "../src/i18n/hobbies.ts";

const OUT = new URL("../worker/chatbot/src/context.js", import.meta.url);
const h = home.es;
const p = sonrisaImperial.es;
const l = likes.es;
const cs = p.caseStudy;
const c = compendio.es;
const hb = hobbies.es;

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
  "- «Me gusta» tiene tres páginas: Videojuegos (con una Pokédex con modelos 3D), Anime y manga (con un mazo de frases de Naruto y JoJo traducidas) y Biohacking (su radar de aparatos y la entrada al compendio). Se entra a cada una desde su tarjeta de la portada.",
  // Los datos personales (horas, momento, arco, personaje) solo si Marc los ha dado
  ...hb.games.items.map(
    (g) =>
      `- ${g.name} (${g.facts.map(([k, v]) => `${k.toLowerCase()} ${v}`).join(", ")}): ${g.text.join(" ")}` +
      (g.hours ? ` Horas jugadas: ${g.hours}.` : "") +
      (g.moment ? ` Su momento favorito: ${g.moment}.` : ""),
  ),
  ...hb.anime.items.map(
    (s) =>
      `- ${s.name} (${s.facts.map(([k, v]) => `${k.toLowerCase()} ${v}`).join(", ")}): ${s.text.join(" ")}` +
      (s.arc ? ` Su arco favorito: ${s.arc}.` : "") +
      (s.character ? ` Su personaje favorito: ${s.character}.` : ""),
  ),
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

// El compendio para el modo boticario, en los dos idiomas: el Worker elige el
// de la página para que no mezcle datos en español en una respuesta en inglés.
// Va en trozos (#103): un índice corto de todo y el detalle de cada problema,
// y el Worker manda solo el del problema que se está leyendo, para gastar
// menos cupo de Workers AI
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
    bundle: "Producto que junta varios suplementos de este problema",
    source: "Fuente",
    price: "precio",
    index: "ÍNDICE DEL COMPENDIO (el detalle solo está en el problema que se está leyendo)",
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
    bundle: "Product that combines several supplements in this problem",
    source: "Source",
    price: "price",
    index: "COMPENDIUM INDEX (full detail only for the problem being read)",
  },
};

// Primera letra en minúscula, para que las listas se lean seguidas sin tocar
// nombres propios («Sintrom», «Vitamina K»)
const lowerFirst = (text) => text.charAt(0).toLowerCase() + text.slice(1);

// Cada problema tiene su página (#105): la ficha completa está en el primero
// (por orden) en el que sale
const homeOf = new Map();
problems.forEach((pr) => pr.suplementos.forEach((id) => homeOf.has(id) || homeOf.set(id, pr.id)));

function compendioFor(lang) {
  const t = compendio[lang];
  const L = LABELS[lang];
  const page = lang === "es" ? PAGE : PAGE.replace("/mi-web/", "/mi-web/en/");
  const noDot = (text) => text.replace(/\.$/, "");
  const evidence = (level) => `${t.evidence[level]} (${noDot(t.legend[level])})`;
  const head = [`${t.title.toUpperCase()}: ${page}`, `${L.notice}: ${t.disclaimer.text}`, ""];
  // Una línea por ficha: nombre, evidencia y dosis, para orientar sin el detalle
  const index = [
    L.index,
    ...problems.flatMap((pr) => [
      `- ${pr.nombre[lang]} (${page}${pr.id}/): ${pr.suplementos
        .map((id) => supplements.get(id))
        .filter(Boolean)
        .map((s) => `${s.nombre[lang]} [${t.evidence[s.evidencia].toLowerCase()}; ${noDot(s.dosis[lang])}]`)
        .join("; ")}`,
    ]),
    "",
  ];
  const detail = Object.fromEntries(problems.map((pr) => [pr.id, [
      `${L.problem}: ${pr.nombre[lang].toUpperCase()} (${page}${pr.id}/)`,
      `- ${pr.intro[lang]}`,
      `- ${L.body}: ${pr.queOcurre[lang]}`,
      `- ${L.combine}: ${pr.combinar[lang]}`,
      `- ${L.alarm}: ${pr.alarma.map((a) => lowerFirst(a[lang])).join("; ")}.`,
      ...(pr.fuentes ?? []).map(
        (f) => `- ${L.source}: ${f.autores.split(",")[0]} et al., ${f.anio}, ${f.revista}, PMID ${f.pmid}`,
      ),
      "",
      ...pr.suplementos.flatMap((id) => {
        const s = supplements.get(id);
        if (!s) return [];
        return [
          `${L.sheet}: ${s.nombre[lang]} (${s.tipo[lang]}) · ${page}${homeOf.get(id)}/#${id}`,
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
                    `  - ${x.marca}, ${x.nombre}${x.pais ? ` (${x.pais[lang]})` : ""}: ${x.datos.map((d) => `${lowerFirst(d.k[lang])} ${d.v[lang]}`).join("; ")}; ${L.price} ${x.precio[lang]}. ${x.url}`,
                ),
              ]
            : []),
          "",
        ];
      }),
      ...(pr.productos?.length
        ? [
            `${L.bundle} (${t.card.productsNote}):`,
            ...pr.productos.map(
              (x) =>
                `  - ${x.marca}, ${x.nombre}${x.pais ? ` (${x.pais[lang]})` : ""}: ${x.datos.map((d) => `${lowerFirst(d.k[lang])} ${d.v[lang]}`).join("; ")}; ${L.price} ${x.precio[lang]}. ${x.url}`,
            ),
            "",
          ]
        : []),
    ]]));
  return { head, index, detail };
}
const compendioEs = compendioFor("es");
const compendioEn = compendioFor("en");
const piece = (c) => `{
    index: \`${clean([...c.head, ...c.index])}\`,
    problems: {
${Object.entries(c.detail)
  .map(([id, l]) => `      ${JSON.stringify(id)}: \`${clean(l)}\`,`)
  .join("\n")}
    },
  }`;

const clean = (l) => l.join("\n").replaceAll("`", "'").replaceAll("${", "$ {");

// Palabras para adivinar el problema desde el índice (#107): las «claves» de
// cada problema y el nombre de sus fichas, en los dos idiomas, sin tildes
const plain = (t) => t.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
const keys = Object.fromEntries(
  problems.map((pr) => [
    pr.id,
    [
      ...new Set([
        ...(pr.claves ?? []).map(plain),
        ...pr.suplementos
          .filter((id) => homeOf.get(id) === pr.id && supplements.get(id))
          .flatMap((id) => ["es", "en"].map((l) => plain(supplements.get(id).nombre[l]).replace(/\s*\(.*\)$/, ""))),
      ]),
    ],
  ]),
);
const file = `// GENERADO por scripts/contexto-chatbot.mjs a partir de src/i18n y
// src/content/compendio. No lo edites a mano: cambia los textos de la web y
// vuelve a ejecutar \`npm run chatbot:contexto\`.

export const CONTEXT = \`${clean(lines)}\`;

// El compendio para el modo boticario (#69), en el idioma de la página: el
// índice de todo y el detalle de cada problema por separado (#103)
// Palabras con las que el Worker adivina el problema si no le llega (#107)
export const PROBLEM_KEYS = ${JSON.stringify(keys, null, 2)};

export const COMPENDIO = {
  es: ${piece(compendioEs)},
  en: ${piece(compendioEn)},
};
`;
await writeFile(OUT, file);
console.log(
  `Contexto del asistente: ${lines.length} líneas; compendio: índice de ${compendioEs.index.length} líneas y ${Object.keys(compendioEs.detail).length} problemas de ${Math.min(...Object.values(compendioEs.detail).map((l) => l.length))} a ${Math.max(...Object.values(compendioEs.detail).map((l) => l.length))} líneas → ${fileURLToPath(OUT)}`,
);
