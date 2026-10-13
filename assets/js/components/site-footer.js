// <site-footer>
// Pie común: frase de cierre, enlaces y año actual.

const ROOT = new URL("../../../", import.meta.url).href;
const REPO = "https://github.com/marcalvear/mi-web";

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="site-footer">
        <div class="wrap site-footer__inner">
          <p class="site-footer__quote">Hecho en València. Que la IA haga el trabajo aburrido; las ideas, mejor nuestras.</p>
          <nav class="site-footer__nav" aria-label="Pie de página">
            <ul role="list">
              <li><a href="${ROOT}">Inicio</a></li>
              <li><a href="${ROOT}me-gusta.html">Me gusta</a></li>
              <li><a href="${REPO}">Código de esta web</a></li>
            </ul>
          </nav>
          <p class="site-footer__legal">© ${year} Marc Calatayud</p>
        </div>
      </footer>`;
  }
}

customElements.define("site-footer", SiteFooter);
