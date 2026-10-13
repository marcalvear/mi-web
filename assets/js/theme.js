// Tema claro u oscuro, recordado entre visitas.
// Cada página tiene en el <head> un script en línea que aplica el tema
// guardado antes de pintar, para que no haya parpadeo.

const KEY = "tema";
const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

export function currentTheme() {
  const chosen = document.documentElement.dataset.theme;
  if (chosen) return chosen;
  return prefersLight.matches ? "light" : "dark";
}

export function toggleTheme() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Navegación privada o almacenamiento bloqueado: el tema dura hasta recargar
  }
  document.dispatchEvent(new CustomEvent("themechange", { detail: next }));
  return next;
}
