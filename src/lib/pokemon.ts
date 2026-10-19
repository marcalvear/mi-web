// Todo lo de la Pokédex que no depende del DOM: direcciones de las APIs,
// traducciones y cómo convertir la respuesta de la PokéAPI en una ficha.
// Lo usan la página al compilar (Pikachu ya viene en el HTML) y el navegador
// al buscar otro Pokémon.
import type { Lang } from "../i18n/ui";

export const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
export const POKE_TOTAL = 1025; // Pokédex nacional
// jsDelivr no sirve el repositorio entero de modelos (pasa de 50 MB): van desde GitHub
export const MODELS = "https://raw.githubusercontent.com/Pokemon-3D-api/assets/main/models/opt/";
export const MODEL_VIEWER =
  "https://cdn.jsdelivr.net/npm/@google/model-viewer@4.3.1/dist/model-viewer.min.js";

// La API da tipos y estadísticas en inglés
const TYPES_ES: Record<string, string> = {
  normal: "Normal", fire: "Fuego", water: "Agua", grass: "Planta", electric: "Eléctrico",
  ice: "Hielo", fighting: "Lucha", poison: "Veneno", ground: "Tierra", flying: "Volador",
  psychic: "Psíquico", bug: "Bicho", rock: "Roca", ghost: "Fantasma", dragon: "Dragón",
  dark: "Siniestro", steel: "Acero", fairy: "Hada", stellar: "Astral",
};

const STATS: Record<Lang, Record<string, string>> = {
  es: {
    hp: "PS", attack: "Ataque", defense: "Defensa",
    "special-attack": "At. especial", "special-defense": "Def. especial", speed: "Velocidad",
  },
  en: {
    hp: "HP", attack: "Attack", defense: "Defense",
    "special-attack": "Sp. Attack", "special-defense": "Sp. Defense", speed: "Speed",
  },
};

const LABELS = {
  es: { height: "Altura", weight: "Peso", abilities: "Habilidades", locale: "es-ES" },
  en: { height: "Height", weight: "Weight", abilities: "Abilities", locale: "en-GB" },
};

export interface PokemonEntry {
  id: number;
  number: string;
  name: string;
  image: string;
  types: string[];
  /** Tipo principal sin traducir, para el color de la ficha. */
  mainType: string;
  facts: [string, string][];
  stats: { label: string; value: number; pct: number }[];
}

// Solo los campos de la respuesta que usamos
export interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null; other: { "official-artwork": { front_default: string | null } } };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const pretty = (s: string) => s.replace(/-/g, " ");
const capital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function toEntry(p: PokeApiPokemon, lang: Lang): PokemonEntry {
  const l = LABELS[lang];
  const num = (n: number) => n.toLocaleString(l.locale);
  return {
    id: p.id,
    number: `Nº ${String(p.id).padStart(4, "0")}`,
    name: pretty(p.name),
    image: p.sprites.other["official-artwork"].front_default ?? p.sprites.front_default ?? "",
    types: p.types.map((t) => (lang === "es" ? TYPES_ES[t.type.name] : capital(t.type.name)) ?? t.type.name),
    mainType: p.types[0]?.type.name ?? "normal",
    // La API da la altura en decímetros y el peso en hectogramos
    facts: [
      [l.height, `${num(p.height / 10)} m`],
      [l.weight, `${num(p.weight / 10)} kg`],
      [l.abilities, p.abilities.map((a) => capital(pretty(a.ability.name))).join(", ")],
    ],
    // 255 es el máximo posible de una estadística base
    stats: p.stats.map((s) => ({
      label: STATS[lang][s.stat.name] ?? s.stat.name,
      value: s.base_stat,
      pct: Math.round(Math.min(100, (s.base_stat / 255) * 100)),
    })),
  };
}
