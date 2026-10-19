// Textos de la interfaz en los dos idiomas. Las páginas con mucho contenido
// tendrán su propio fichero por idioma; aquí solo va lo que comparten todas.

export const languages = { es: "Español", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "es";

export const ui = {
  es: {
    "site.title": "Marc Calatayud",
    "site.description":
      "Aprendo inteligencia artificial para ayudar a startups e infoproductores a dar vida a sus proyectos.",
    "skip": "Saltar al contenido",
    "lang.switch": "Read in English",
    "wip.title": "Cuaderno en obras",
    "wip.body": "Estoy rehaciendo mi web desde cero. Vuelve en unos días.",
    "404.title": "Página no encontrada",
    "404.body": "Esta página no está en el cuaderno.",
    "404.back": "Volver al inicio",
    "nav.label": "Principal",
    "nav.about": "Sobre mí",
    "nav.work": "Lo que he hecho",
    "nav.likes": "Me gusta",
    "nav.contact": "Contacto",
    "nav.home": "Marc Calatayud, inicio",
    "lang.label": "Idioma",
    "theme.toggle": "Cambiar tema",
    "theme.light": "Claro",
    "theme.dark": "Oscuro",
    "theme.auto": "Sistema",
    "footer.notebook": "Cuaderno nº 3",
    "footer.made": "Hecho a mano en València con Astro, café y muchas preguntas a la IA.",
    "footer.code": "Código en GitHub",
    "footer.top": "Volver arriba",
  },
  en: {
    "site.title": "Marc Calatayud",
    "site.description":
      "I study artificial intelligence to help startups and creators bring their projects to life.",
    "skip": "Skip to content",
    "lang.switch": "Leer en español",
    "wip.title": "Notebook under construction",
    "wip.body": "I'm rebuilding my website from scratch. Check back in a few days.",
    "404.title": "Page not found",
    "404.body": "This page isn't in the notebook.",
    "404.back": "Back to home",
    "nav.label": "Main",
    "nav.about": "About",
    "nav.work": "What I've done",
    "nav.likes": "Things I like",
    "nav.contact": "Contact",
    "nav.home": "Marc Calatayud, home",
    "lang.label": "Language",
    "theme.toggle": "Change theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.auto": "System",
    "footer.notebook": "Notebook no. 3",
    "footer.made": "Handmade in València with Astro, coffee and lots of questions to AI.",
    "footer.code": "Code on GitHub",
    "footer.top": "Back to top",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}
