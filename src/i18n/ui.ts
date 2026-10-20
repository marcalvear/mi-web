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
    "og.alt": "Marc Calatayud, cuaderno nº 3: aprendo inteligencia artificial para ayudar a startups e infoproductores.",
    "skip": "Saltar al contenido",
    "lang.switch": "Read in English",
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
    "footer.made": "Hecho en València. Que la IA haga el trabajo aburrido; las ideas, mejor nuestras.",
    "footer.code": "Código en GitHub",
    "footer.top": "Volver arriba",
    "footer.privacy": "Privacidad",
    "footer.space": "Mi espacio",
  },
  en: {
    "site.title": "Marc Calatayud",
    "site.description":
      "I study artificial intelligence to help startups and creators bring their projects to life.",
    "og.alt": "Marc Calatayud, notebook no. 3: I study artificial intelligence to help startups and creators.",
    "skip": "Skip to content",
    "lang.switch": "Leer en español",
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
    "footer.made": "Made in València. Let AI do the boring work; the ideas are better left to us.",
    "footer.code": "Code on GitHub",
    "footer.top": "Back to top",
    "footer.privacy": "Privacy",
    "footer.space": "My space",
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}
