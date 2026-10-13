// <site-header current="inicio|me-gusta|proyecto">
// Cabecera común a todas las páginas: logo, navegación, menú móvil y tema.
// Se pinta en el DOM normal (sin Shadow DOM) para que use el CSS global.

import { toggleTheme, currentTheme } from "../theme.js";

// Raíz de la web calculada desde este fichero (assets/js/components/)
const ROOT = new URL("../../../", import.meta.url).href;

const LINKS = [
  { id: "sobre-mi", label: "Sobre mí", href: "#sobre-mi" },
  { id: "hecho", label: "Lo que he hecho", href: "#lo-que-he-hecho" },
  { id: "me-gusta", label: "Me gusta", page: "me-gusta.html" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

const ICONS = {
  // Sol para pasar a claro, luna para pasar a oscuro
  light: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></g></svg>`,
  dark: `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor"/></svg>`,
};

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute("current") || "";
    const isHome = current === "inicio";

    const items = LINKS.map((link) => {
      // En la portada los anclas son locales; en el resto apuntan a la portada
      const href = link.page ? ROOT + link.page : isHome ? link.href : ROOT + link.href;
      const aria = link.id === current ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${aria}>${link.label}</a></li>`;
    }).join("");

    this.innerHTML = `
      <header class="site-header">
        <div class="wrap site-header__inner">
          <a class="brand" href="${ROOT}">
            <img src="${ROOT}assets/img/logo.svg" alt="" width="40" height="40">
            <span>Marc Calatayud</span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">
            <span class="menu-toggle__bars" aria-hidden="true"></span>
            Menú
          </button>
          <nav class="site-nav" id="menu-principal" aria-label="Principal">
            <ul role="list">${items}</ul>
          </nav>
          <button class="theme-toggle" type="button"></button>
        </div>
      </header>`;

    this.menuButton = this.querySelector(".menu-toggle");
    this.nav = this.querySelector(".site-nav");
    this.themeButton = this.querySelector(".theme-toggle");

    this.menuButton.addEventListener("click", () => this.setMenu(!this.isOpen()));
    this.nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) this.setMenu(false);
    });
    this.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen()) {
        this.setMenu(false);
        this.menuButton.focus();
      }
    });

    this.themeButton.addEventListener("click", () => {
      toggleTheme();
      this.paintThemeButton();
    });
    this.paintThemeButton();
  }

  isOpen() {
    return this.menuButton.getAttribute("aria-expanded") === "true";
  }

  setMenu(open) {
    this.menuButton.setAttribute("aria-expanded", open);
    this.nav.classList.toggle("is-open", open);
  }

  // El botón muestra el tema al que vas a cambiar, no el actual
  paintThemeButton() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    const label = next === "light" ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
    this.themeButton.innerHTML = ICONS[next];
    this.themeButton.setAttribute("aria-label", label);
    this.themeButton.title = label;
  }
}

customElements.define("site-header", SiteHeader);
