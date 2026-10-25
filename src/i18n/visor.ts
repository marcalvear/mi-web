// Textos del visor de fotos (Visor.astro) y de los botones que lo abren
// (Ampliable.astro).
import type { Lang } from "./ui";

export const visor: Record<Lang, { zoom: string; close: string; title: string }> = {
  es: { zoom: "Ver en grande", close: "Cerrar", title: "Foto ampliada" },
  en: { zoom: "View larger", close: "Close", title: "Enlarged photo" },
};
