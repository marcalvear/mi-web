// Cloudflare Worker del asistente de mi web.
// La web (GitHub Pages) no puede guardar secretos: si llamara al modelo
// directamente, cualquiera podría usar la clave. Este Worker hace de
// intermediario: recibe la conversación, añade mis instrucciones y llama
// a Workers AI con el binding env.AI, que no necesita ninguna clave.

import { MODEL } from "./model.js";
import { boticarioPrompt, SYSTEM_PROMPT } from "./prompt.js";

const ALLOWED_ORIGINS = [
  "https://marcalvear.github.io",
  "http://localhost:4321", // astro dev
  "http://localhost:4322", // astro preview
];

const MAX_MESSAGES = 10;     // solo se envían los últimos turnos
const MAX_CHARS = 800;       // por mensaje del usuario
const LANGS = { es: "español", en: "inglés" };
// Dentro del compendio hace de «boticario» (#69): otras instrucciones y algo
// más de espacio para la evidencia, la dosis y las precauciones
const MODES = {
  general: { prompt: () => SYSTEM_PROMPT, maxTokens: 350 },
  // Solo con el detalle del problema que se está leyendo, que manda la página (#103)
  boticario: { prompt: (lang, problem) => boticarioPrompt(lang, problem), maxTokens: 450 },
};

// El widget pinta texto plano: fuera las negritas y los títulos de Markdown
// que el modelo a veces pone aunque se le pida que no
export function plainText(text) {
  return text.replace(/\*\*|__/g, "").replace(/^#{1,6}\s+/gm, "").trim();
}

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...cors(origin) },
  });
}

// Deja solo mensajes válidos de usuario/asistente, recortados
export function cleanMessages(input) {
  if (!Array.isArray(input)) return null;
  const messages = input
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, MAX_CHARS) }))
    .filter((m) => m.content)
    .slice(-MAX_MESSAGES);
  if (!messages.length || messages.at(-1).role !== "user") return null;
  return messages;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Origen no permitido", { status: 403 });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors(origin) });
    }
    if (request.method !== "POST") {
      return json({ error: "Usa POST." }, 405, origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "El cuerpo debe ser JSON." }, 400, origin);
    }

    const messages = cleanMessages(body?.messages);
    if (!messages) {
      return json({ error: "Falta la pregunta." }, 400, origin);
    }

    try {
      // El idioma de la página ayuda cuando la pregunta es corta («hi», «¿?»)
      const code = Object.hasOwn(LANGS, body?.lang) ? body.lang : "es";
      // Un modo desconocido no da error: se queda en el general
      const mode = Object.hasOwn(MODES, body?.mode) ? MODES[body.mode] : MODES.general;
      // Las instrucciones están en español: en la versión inglesa se lo
      // recuerda en inglés, o el modelo tiende a contestar en español
      const reminder = code === "en" ? "\nThe page is in English: reply in English unless the user writes in Spanish." : "";
      const problem = typeof body?.problem === "string" ? body.problem.slice(0, 64) : undefined;
      const system = `${mode.prompt(code, problem)}\n\nLa página desde la que te escriben está en ${LANGS[code]}.${reminder}`;
      const result = await env.AI.run(MODEL, {
        messages: [{ role: "system", content: system }, ...messages],
        max_tokens: mode.maxTokens,
        temperature: 0.4,
      });
      // Según el modelo, el texto llega en `response` o en formato chat.completion
      const reply = result?.response ?? result?.choices?.[0]?.message?.content ?? "";
      if (!reply.trim()) throw new Error("Respuesta vacía");
      return json({ reply: plainText(reply) }, 200, origin);
    } catch (err) {
      console.error("Workers AI:", err);
      // Con el plan gratuito, al pasar del límite diario el modelo deja de responder
      return json({ error: "El asistente no puede responder ahora. Escríbeme con el formulario de contacto." }, 503, origin);
    }
  },
};
