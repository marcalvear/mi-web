// Fragmentos de estrella: como en Super Mario Galaxy, flotan por la página
// y se recogen pasando el cursor por encima (o tocándolos en el móvil).
// El total se guarda entre visitas y se ve en el pie.

const KEY = "fragmentos";
const COLORS = ["#ffcf3f", "#7fe3ff", "#ff9ecf", "#b49cff", "#8ef0a8"];
const PER_ZONE = 2;
const RESPAWN_MS = 9000;

let total = read();
let zones = [];

function read() {
  try {
    return Number(localStorage.getItem(KEY)) || 0;
  } catch {
    return 0;
  }
}

function save() {
  try {
    localStorage.setItem(KEY, total);
  } catch {
    // sin almacenamiento el contador vuelve a 0 al recargar
  }
}

function paintCounter() {
  document.querySelectorAll("[data-stardust-count]").forEach((n) => {
    n.textContent = total.toLocaleString("es-ES");
  });
}

// Estrella de cinco puntas con las puntas redondeadas
function starSVG(color) {
  return `<svg viewBox="-10 -10 20 20" width="20" height="20"><path d="M0,-8 L2.4,-3.3 L7.6,-2.5 L3.8,1.2 L4.7,6.5 L0,4 L-4.7,6.5 L-3.8,1.2 L-7.6,-2.5 L-2.4,-3.3 Z" fill="${color}" stroke="${color}" stroke-width="2" stroke-linejoin="round"/></svg>`;
}

function spawn(zone) {
  const box = zone.getBoundingClientRect();
  if (!box.width || !box.height) return;

  const bit = document.createElement("span");
  bit.className = "stardust";
  bit.setAttribute("aria-hidden", "true");
  bit.innerHTML = starSVG(COLORS[Math.floor(Math.random() * COLORS.length)]);
  // Posición en coordenadas de la página, dentro de la zona decorativa
  bit.style.left = `${box.left + scrollX + 16 + Math.random() * (box.width - 52)}px`;
  bit.style.top = `${box.top + scrollY + Math.random() * Math.max(box.height - 20, 1)}px`;
  bit.style.animationDelay = `${-Math.random() * 4}s`;

  const collect = () => {
    if (bit.classList.contains("is-collected")) return;
    bit.classList.add("is-collected");
    total += 1;
    save();
    paintCounter();
    bit.addEventListener("animationend", () => bit.remove(), { once: true });
    setTimeout(() => bit.remove(), 600); // por si no hay animación (movimiento reducido)
    setTimeout(() => spawn(zone), RESPAWN_MS);
  };
  bit.addEventListener("pointerenter", collect);
  bit.addEventListener("pointerdown", collect);
  document.body.append(bit);
}

function populate() {
  document.querySelectorAll(".stardust").forEach((b) => b.remove());
  zones.forEach((zone) => {
    for (let i = 0; i < PER_ZONE; i++) spawn(zone);
  });
}

export function initStardust() {
  // Zonas: las trayectorias entre secciones y lo marcado con data-stardust
  zones = Array.from(document.querySelectorAll(".trajectory, [data-stardust]"));
  paintCounter();
  document.addEventListener("stardust:footer", paintCounter);
  if (!zones.length) return;

  // Se colocan cuando la página ya tiene su tamaño final (fuentes cargadas)
  document.fonts.ready.then(populate);
  let timer;
  addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(populate, 300);
  });
}
