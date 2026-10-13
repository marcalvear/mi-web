// Frases de anime con la API de Animechan (100 peticiones al día gratis por IP).
// Docs: https://animechan.io/docs

import { getJSON } from "../lib/api.js";
import { setStatus, replay } from "../lib/dom.js";

const API = "https://api.animechan.io/v1/quotes/random?anime=";

const $ = (id) => document.getElementById(id);
const quote = $("anime-quote");
const status = $("anime-status");
const buttons = Array.from(document.querySelectorAll("[data-anime]"));

async function load(anime, button) {
  buttons.forEach((b) => b.setAttribute("aria-pressed", b === button));
  setStatus(status, "Buscando una frase…");
  try {
    const { data } = await getJSON(API + encodeURIComponent(anime), {
      notFound: "No hay frases de esa serie en Animechan.",
    });
    $("anime-text").textContent = data.content;
    $("anime-character").textContent = data.character.name;
    $("anime-series").textContent = data.anime.name;
    quote.hidden = false;
    replay(quote);
    setStatus(status, "");
  } catch (err) {
    setStatus(status, err.message, true);
  }
}

export function initAnimechan() {
  if (!quote) return;
  buttons.forEach((b) => b.addEventListener("click", () => load(b.dataset.anime, b)));
  // No se pide ninguna frase al cargar: el límite diario es pequeño
}
