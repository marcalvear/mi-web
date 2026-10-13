// Pokédex con la PokéAPI (datos) y la Pokémon 3D API (modelos 3D).
// Viene de la v1 de la web, separada en su propio módulo.

import { getJSON } from "../lib/api.js";
import { el, setStatus, replay, random } from "../lib/dom.js";

const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
const POKE_TOTAL = 1025; // Pokémon de la Pokédex nacional
// jsDelivr no sirve el repositorio de modelos entero (pasa de 50 MB), se cargan de GitHub
const MODELS = "https://raw.githubusercontent.com/Pokemon-3D-api/assets/main/models/opt/";
const MODEL_VIEWER = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.3.1/dist/model-viewer.min.js";

// La API da tipos y estadísticas en inglés
const TYPES = {
  normal: "Normal", fire: "Fuego", water: "Agua", grass: "Planta", electric: "Eléctrico",
  ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra", flying: "Volador",
  psychic: "Psíquico", bug: "Bicho", rock: "Roca", ghost: "Fantasma", dragon: "Dragón",
  dark: "Siniestro", steel: "Acero", fairy: "Hada", stellar: "Astral",
};
const STATS = {
  hp: "PS", attack: "Ataque", defense: "Defensa",
  "special-attack": "At. especial", "special-defense": "Def. especial", speed: "Velocidad",
};

const $ = (id) => document.getElementById(id);
const form = $("poke-form");
const input = $("poke-input");
const status = $("poke-status");
const card = $("poke-card");
const modelEl = $("poke-model");
const status3d = $("poke-3d-status");
const shinyBtn = $("poke-shiny");
const viewButtons = Array.from(document.querySelectorAll("[data-poke-view]"));

let view = "img";
let currentId = null;
let shiny = false;
let loadedModel = null;   // "25-regular"… para no cargar dos veces lo mismo
let modelViewerReady = null;
let modelRequest = 0;     // evita que un modelo antiguo pise a uno nuevo

async function search(query) {
  const id = String(query).trim().toLowerCase();
  if (!id) return;
  setStatus(status, "Buscando…");
  try {
    const data = await getJSON(POKE_API + encodeURIComponent(id), {
      notFound: "No encuentro ese Pokémon. Revisa el nombre o el número.",
    });
    show(data);
    setStatus(status, "");
  } catch (err) {
    setStatus(status, err.message, true);
  }
}

function show(p) {
  const img = p.sprites.other["official-artwork"].front_default || p.sprites.front_default;
  $("poke-img").src = img || "";
  $("poke-img").alt = `Ilustración oficial de ${p.name}`;
  $("poke-id").textContent = "Nº " + String(p.id).padStart(4, "0");
  $("poke-name").textContent = p.name.replace(/-/g, " ");
  $("poke-types").replaceChildren(...p.types.map((t) => el("li", TYPES[t.type.name] || t.type.name)));

  // La API da la altura en decímetros y el peso en hectogramos
  const facts = [
    ["Altura", (p.height / 10).toLocaleString("es-ES") + " m"],
    ["Peso", (p.weight / 10).toLocaleString("es-ES") + " kg"],
    ["Habilidades", p.abilities.map((a) => a.ability.name.replace(/-/g, " ")).join(", ")],
  ];
  $("poke-facts").replaceChildren(...facts.map(([dt, dd]) => {
    const row = el("div");
    row.append(el("dt", dt), el("dd", dd));
    return row;
  }));

  // Estadísticas base con barra (255 es el máximo posible)
  $("poke-stats").replaceChildren(...p.stats.map((s) => {
    const row = el("li");
    const bar = el("span", null, "stats__bar");
    const fill = el("span");
    fill.style.width = Math.min(100, (s.base_stat / 255) * 100) + "%";
    bar.append(fill);
    row.append(el("span", STATS[s.stat.name] || s.stat.name, "stats__name"), el("span", s.base_stat, "stats__value"), bar);
    return row;
  }));

  currentId = p.id;
  loadedModel = null;
  if (view === "3d") loadModel();

  card.hidden = false;
  replay(card);
}

/* --- Vista 3D --- */

function loadModelViewer() {
  if (!modelViewerReady) modelViewerReady = import(MODEL_VIEWER);
  return modelViewerReady;
}

// Prueba un .glb y espera a que model-viewer diga si ha cargado
function tryModel(url) {
  if (modelEl.getAttribute("src") === url) return Promise.resolve(true);
  return new Promise((resolve) => {
    const done = (ok) => {
      modelEl.removeEventListener("load", onLoad);
      modelEl.removeEventListener("error", onError);
      resolve(ok);
    };
    const onLoad = () => done(true);
    const onError = () => done(false);
    modelEl.addEventListener("load", onLoad);
    modelEl.addEventListener("error", onError);
    modelEl.src = url;
  });
}

async function loadModel() {
  const key = `${currentId}-${shiny ? "shiny" : "regular"}`;
  if (!currentId || loadedModel === key) return;
  const request = ++modelRequest;

  setStatus(status3d, "Cargando modelo 3D…");
  try {
    await loadModelViewer();
  } catch {
    setStatus(status3d, "No se pudo cargar el visor 3D.", true);
    return;
  }

  // Algunos Pokémon tienen el modelo separado por género (por ejemplo 521-M.glb)
  const folder = MODELS + (shiny ? "shiny/" : "regular/");
  for (const file of [`${currentId}.glb`, `${currentId}-M.glb`]) {
    const ok = await tryModel(folder + file);
    if (request !== modelRequest) return; // mientras tanto se pidió otro Pokémon
    if (ok) {
      loadedModel = key;
      modelEl.alt = `Modelo 3D de ${$("poke-name").textContent}`;
      setStatus(status3d, "Arrastra para girarlo. Rueda o pellizco para hacer zoom.");
      return;
    }
  }
  modelEl.removeAttribute("src");
  setStatus(status3d, shiny ? "No hay modelo 3D shiny de este Pokémon." : "Este Pokémon aún no tiene modelo 3D.", true);
}

function selectView(name) {
  view = name;
  viewButtons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.pokeView === name));
  $("poke-view-img").hidden = name !== "img";
  $("poke-view-3d").hidden = name !== "3d";
  if (name === "3d") loadModel();
}

export function initPokedex() {
  if (!form) return;
  viewButtons.forEach((b) => b.addEventListener("click", () => selectView(b.dataset.pokeView)));
  shinyBtn.addEventListener("click", () => {
    shiny = !shiny;
    shinyBtn.setAttribute("aria-pressed", shiny);
    shinyBtn.textContent = shiny ? "Ver versión normal" : "Ver versión shiny";
    loadModel();
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search(input.value);
  });
  $("poke-random").addEventListener("click", () => {
    const n = 1 + random(POKE_TOTAL);
    input.value = n;
    search(n);
  });
  search(25); // Pikachu para empezar
}
