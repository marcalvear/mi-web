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
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}
