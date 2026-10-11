/* ===== 1. Minijuego Breach Protocol ===== */
const CODES = ["1C", "55", "BD", "E9", "7A"];
const SIZE = 5;     // matriz de 5 x 5
const MEMORY = 6;   // huecos de memoria

const breach = document.getElementById("breach");
const gridEl = document.getElementById("breach-grid");
const targetEl = document.getElementById("breach-target");
const bufferEl = document.getElementById("breach-buffer");
const statusEl = document.getElementById("breach-status");

let grid, target, buffer, used, axis, line, finished;

const random = (n) => Math.floor(Math.random() * n);
const randomCode = () => CODES[random(CODES.length)];

function newGame() {
  grid = Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, randomCode));
  target = [randomCode(), randomCode(), randomCode()];

  // Esconde una solución garantizada: fila 0 -> misma columna -> misma fila
  const col1 = random(SIZE);
  const row2 = 1 + random(SIZE - 1);
  const col3 = (col1 + 1 + random(SIZE - 1)) % SIZE;
  grid[0][col1] = target[0];
  grid[row2][col1] = target[1];
  grid[row2][col3] = target[2];

  buffer = [];
  used = new Set();
  axis = "row";   // primero se elige en una fila...
  line = 0;       // ...y es la de arriba
  finished = false;
  breach.classList.remove("is-won", "is-lost");
  render();
  statusEl.textContent = "Elige un código de la fila marcada.";
}

// Cuántos códigos de la secuencia llevas seguidos al final de la memoria
function progress() {
  if (buffer.join(" ").includes(target.join(" "))) return target.length;
  for (let k = Math.min(target.length - 1, buffer.length); k > 0; k--) {
    if (buffer.slice(-k).join(" ") === target.slice(0, k).join(" ")) return k;
  }
  return 0;
}

function render() {
  const done = progress();
  targetEl.innerHTML = target
    .map((code, i) => `<li class="${i < done ? "is-done" : ""}">${code}</li>`)
    .join("");
  bufferEl.innerHTML = Array.from({ length: MEMORY }, (_, i) => `<li>${buffer[i] || ""}</li>`).join("");

  gridEl.innerHTML = "";
  grid.forEach((row, r) => {
    row.forEach((code, c) => {
      const key = `${r}-${c}`;
      const inLine = !finished && (axis === "row" ? r === line : c === line);
      const isUsed = used.has(key);
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "cell" + (inLine ? " is-line" : "") + (isUsed ? " is-used" : "");
      cell.textContent = code;
      cell.disabled = !inLine || isUsed;
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.setAttribute("aria-label", `${isUsed ? "Usado" : code}, fila ${r + 1}, columna ${c + 1}`);
      gridEl.appendChild(cell);
    });
  });
}

function choose(r, c) {
  buffer.push(grid[r][c]);
  used.add(`${r}-${c}`);
  if (axis === "row") { axis = "col"; line = c; } else { axis = "row"; line = r; }

  const hasMoves = Array.from({ length: SIZE }, (_, i) => (axis === "row" ? `${line}-${i}` : `${i}-${line}`))
    .some((key) => !used.has(key));

  if (progress() === target.length) {
    finished = true;
    breach.classList.add("is-won");
    statusEl.textContent = "Acceso concedido. Bienvenido a mi perfil.";
  } else if (buffer.length === MEMORY || !hasMoves) {
    finished = true;
    breach.classList.add("is-lost");
    statusEl.textContent = "Memoria llena. Empieza una nueva partida.";
  } else {
    statusEl.textContent = `Ahora elige en la ${axis === "row" ? "fila" : "columna"} marcada.`;
  }

  render();
  // Devuelve el foco a la matriz para poder seguir jugando con teclado
  (gridEl.querySelector(".cell:enabled") || document.getElementById("breach-reset")).focus();
}

if (breach) {
  breach.hidden = false;
  gridEl.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell");
    if (cell && !cell.disabled) choose(Number(cell.dataset.r), Number(cell.dataset.c));
  });
  document.getElementById("breach-reset").addEventListener("click", newGame);
  newGame();
}

/* ===== 2. Pestañas de "Me gusta" ===== */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

function selectTab(tab, focus) {
  tabs.forEach((t) => {
    const selected = t === tab;
    const panel = document.getElementById(t.getAttribute("aria-controls"));
    t.setAttribute("aria-selected", selected);
    t.tabIndex = selected ? 0 : -1;
    panel.hidden = !selected;
    if (selected) {
      panel.classList.remove("is-entering");
      void panel.offsetWidth; // reinicia la animación
      panel.classList.add("is-entering");
    }
  });
  if (focus) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab, false));
  tab.addEventListener("keydown", (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      selectTab(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
    }
  });
});

// Sin JavaScript se ven todas; con JavaScript solo la seleccionada
tabs.forEach((t) => {
  document.getElementById(t.getAttribute("aria-controls")).hidden = t.getAttribute("aria-selected") !== "true";
});

/* ===== 3. Pokédex con la PokéAPI ===== */
const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
const POKE_TOTAL = 1025; // Pokémon con número en la Pokédex nacional

// Traducciones de tipos y estadísticas (la API los da en inglés)
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

const pokeForm = document.getElementById("poke-form");
const pokeInput = document.getElementById("poke-input");
const pokeStatus = document.getElementById("poke-status");
const pokeCard = document.getElementById("poke-card");

function setPokeStatus(text, isError) {
  pokeStatus.textContent = text;
  pokeStatus.classList.toggle("is-error", Boolean(isError));
}

// Crea un elemento con texto (textContent evita meter HTML de fuera)
function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  if (className) node.className = className;
  return node;
}

async function searchPokemon(query) {
  const id = String(query).trim().toLowerCase();
  if (!id) return;

  setPokeStatus("Escaneando…");
  try {
    const res = await fetch(POKE_API + encodeURIComponent(id));
    if (res.status === 404) throw new Error("No encuentro ese Pokémon. Revisa el nombre o el número.");
    if (!res.ok) throw new Error("La PokéAPI no responde. Prueba otra vez en un rato.");
    showPokemon(await res.json());
    setPokeStatus("");
  } catch (err) {
    // Si falla la red, fetch lanza un TypeError sin mensaje útil
    console.error("Pokédex:", err);
    setPokeStatus(err instanceof TypeError ? "No se pudo conectar con la PokéAPI (revisa la conexión o algún bloqueador de anuncios)." : err.message, true);
  }
}

function showPokemon(p) {
  const img = p.sprites.other["official-artwork"].front_default || p.sprites.front_default;
  document.getElementById("poke-img").src = img || "";
  document.getElementById("poke-img").alt = `Ilustración de ${p.name}`;
  document.getElementById("poke-id").textContent = "Nº " + String(p.id).padStart(4, "0");
  document.getElementById("poke-name").textContent = p.name.replace(/-/g, " ");

  // Tipos
  const typesEl = document.getElementById("poke-types");
  typesEl.replaceChildren(...p.types.map((t) => el("li", TYPES[t.type.name] || t.type.name)));

  // Datos: la API da la altura en decímetros y el peso en hectogramos
  const facts = [
    ["Altura", (p.height / 10).toLocaleString("es-ES") + " m"],
    ["Peso", (p.weight / 10).toLocaleString("es-ES") + " kg"],
    ["Habilidades", p.abilities.map((a) => a.ability.name.replace(/-/g, " ")).join(", ")],
  ];
  document.getElementById("poke-facts").replaceChildren(...facts.map(([dt, dd]) => {
    const row = el("div");
    row.append(el("dt", dt), el("dd", dd));
    return row;
  }));

  // Estadísticas base con barra (255 es el máximo posible)
  document.getElementById("poke-stats").replaceChildren(...p.stats.map((s) => {
    const row = el("li");
    const bar = el("span", undefined, "stats__bar");
    const fill = el("span");
    fill.style.width = Math.min(100, (s.base_stat / 255) * 100) + "%";
    bar.append(fill);
    row.append(el("span", STATS[s.stat.name] || s.stat.name, "stats__name"), el("span", s.base_stat, "stats__value"), bar);
    return row;
  }));

  // Modelo 3D: si la vista 3D está abierta se carga ya; si no, al abrirla
  currentId = p.id;
  loadedModel = null;
  if (view === "3d") loadModel();

  pokeCard.hidden = false;
  pokeCard.classList.remove("is-entering");
  void pokeCard.offsetWidth; // reinicia la animación
  pokeCard.classList.add("is-entering");
}

/* --- Vista 3D con la Pokémon 3D API (github.com/Pokemon-3D-api) --- */
// Se cargan desde GitHub: jsDelivr no sirve este repositorio entero (pasa de 50 MB)
const MODELS = "https://raw.githubusercontent.com/Pokemon-3D-api/assets/main/models/opt/";
const MODEL_VIEWER = "https://cdn.jsdelivr.net/npm/@google/model-viewer@4/dist/model-viewer.min.js";

const viewButtons = Array.from(document.querySelectorAll(".view__btn"));
const modelEl = document.getElementById("poke-model");
const model3dStatus = document.getElementById("poke-3d-status");
const shinyBtn = document.getElementById("poke-shiny");

let view = "img";        // vista elegida: "img" o "3d"
let currentId = null;    // Pokémon que se está mostrando
let shiny = false;
let loadedModel = null;  // qué modelo hay cargado ("25-regular"…) para no repetir
let modelViewerReady = null;
let modelRequest = 0;    // evita que un modelo antiguo pise a uno nuevo

function set3dStatus(text, isError) {
  model3dStatus.textContent = text;
  model3dStatus.classList.toggle("is-error", Boolean(isError));
}

// Carga el componente <model-viewer> de Google solo la primera vez que hace falta
function loadModelViewer() {
  if (!modelViewerReady) modelViewerReady = import(MODEL_VIEWER);
  return modelViewerReady;
}

// Intenta cargar un fichero .glb y espera a que model-viewer diga si ha ido bien
function tryModel(url) {
  // Si ya está puesto, model-viewer no vuelve a avisar: ya estaba cargado
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

  set3dStatus("Cargando modelo 3D…");
  try {
    await loadModelViewer();
  } catch {
    set3dStatus("No se pudo cargar el visor 3D.", true);
    return;
  }

  // Algunos Pokémon tienen el modelo separado por género (por ejemplo 521-M.glb)
  const folder = MODELS + (shiny ? "shiny/" : "regular/");
  for (const file of [`${currentId}.glb`, `${currentId}-M.glb`]) {
    const ok = await tryModel(folder + file);
    if (request !== modelRequest) return; // mientras tanto se pidió otro Pokémon
    if (ok) {
      loadedModel = key;
      modelEl.alt = `Modelo 3D de ${document.getElementById("poke-name").textContent}`;
      set3dStatus("Arrastra para girarlo y usa la rueda o pellizca para hacer zoom.");
      return;
    }
  }
  modelEl.removeAttribute("src");
  set3dStatus(shiny ? "No hay modelo 3D shiny de este Pokémon." : "Este Pokémon aún no tiene modelo 3D.", true);
}

function selectView(name) {
  view = name;
  viewButtons.forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === name));
  document.getElementById("poke-view-img").hidden = name !== "img";
  document.getElementById("poke-view-3d").hidden = name !== "3d";
  if (name === "3d") loadModel();
}

viewButtons.forEach((b) => b.addEventListener("click", () => selectView(b.dataset.view)));

shinyBtn.addEventListener("click", () => {
  shiny = !shiny;
  shinyBtn.setAttribute("aria-pressed", shiny);
  shinyBtn.textContent = shiny ? "Ver versión normal" : "Ver versión shiny";
  loadModel();
});

if (pokeForm) {
  pokeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPokemon(pokeInput.value);
  });
  document.getElementById("poke-random").addEventListener("click", () => {
    const n = 1 + random(POKE_TOTAL);
    pokeInput.value = n;
    searchPokemon(n);
  });
  searchPokemon(25); // Pikachu para empezar
}

/* ===== 4. Año actual en el pie ===== */
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
