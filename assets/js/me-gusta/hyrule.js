// Explorador del Compendio de Hyrule (Zelda: Breath of the Wild).
// API: https://github.com/gadhagod/Hyrule-Compendium-API

import { getJSON } from "../lib/api.js";
import { el, setStatus, replay, random } from "../lib/dom.js";

const API = "https://api.hyrule-compendium.com/v3/compendium/";
const TOTAL = 389; // entradas del compendio de Breath of the Wild

const CATEGORIES = {
  creatures: "Criatura",
  monsters: "Monstruo",
  materials: "Material",
  equipment: "Equipo",
  treasure: "Tesoro",
};

const $ = (id) => document.getElementById(id);
const form = $("hyrule-form");
const input = $("hyrule-input");
const status = $("hyrule-status");
const card = $("hyrule-card");
const names = $("hyrule-names");

let namesLoaded = false;

async function search(query) {
  // La API acepta el número de entrada o el nombre en inglés
  const q = String(query).trim().toLowerCase();
  if (!q) return;
  setStatus(status, "Buscando en el compendio…");
  try {
    const { data } = await getJSON(API + "entry/" + encodeURIComponent(q), {
      notFound: "Esa entrada no está en el compendio. Los nombres van en inglés, por ejemplo «lynel».",
    });
    show(data);
    setStatus(status, "");
  } catch (err) {
    setStatus(status, err.message, true);
  }
}

function show(entry) {
  $("hyrule-img").src = entry.image;
  $("hyrule-img").alt = `Imagen del compendio: ${entry.name}`;
  $("hyrule-id").textContent = "Entrada " + String(entry.id).padStart(3, "0");
  $("hyrule-name").textContent = entry.name;
  $("hyrule-category").textContent = CATEGORIES[entry.category] || entry.category;
  $("hyrule-description").textContent = entry.description;

  const places = entry.common_locations?.length ? entry.common_locations.join(", ") : "Sin ubicación fija";
  const drops = entry.drops?.length ? entry.drops.join(", ") : "Nada";
  $("hyrule-facts").replaceChildren(
    ...[["Dónde encontrarlo", places], ["Suelta", drops]].map(([dt, dd]) => {
      const row = el("div");
      row.append(el("dt", dt), el("dd", dd));
      return row;
    }),
  );

  card.hidden = false;
  replay(card);
}

// La lista de nombres para autocompletar (178 KB) solo se pide si se va a buscar
async function loadNames() {
  if (namesLoaded) return;
  namesLoaded = true;
  try {
    const { data } = await getJSON(API + "all");
    names.replaceChildren(...data.map((e) => {
      const option = document.createElement("option");
      option.value = e.name;
      return option;
    }));
  } catch {
    namesLoaded = false; // sin autocompletado; la búsqueda sigue funcionando
  }
}

export function initHyrule() {
  if (!form) return;
  input.addEventListener("focus", loadNames, { once: true });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    search(input.value);
  });
  $("hyrule-random").addEventListener("click", () => {
    const n = 1 + random(TOTAL);
    input.value = "";
    search(n);
  });
  search("lynel");
}
