// Filtro de los productos de biohacking por objetivo.
// Sin JavaScript se ven todos; el filtro solo oculta los que no encajan.

const filters = Array.from(document.querySelectorAll("[data-goal-filter]"));
const products = Array.from(document.querySelectorAll("[data-goals]"));
const count = document.getElementById("bio-count");

function apply(goal) {
  let visible = 0;
  products.forEach((p) => {
    const match = goal === "todos" || p.dataset.goals.split(" ").includes(goal);
    p.hidden = !match;
    if (match) visible++;
  });
  filters.forEach((f) => f.setAttribute("aria-pressed", f.dataset.goalFilter === goal));
  count.textContent = visible === 1 ? "1 producto" : `${visible} productos`;
}

export function initBiohacking() {
  if (!filters.length) return;
  filters.forEach((f) => f.addEventListener("click", () => apply(f.dataset.goalFilter)));
  document.getElementById("bio-filters").hidden = false;
  apply("todos");
}
