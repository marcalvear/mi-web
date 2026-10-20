// Contenido del compendio de biohacking. Cada suplemento y cada problema es un
// fichero JSON en src/content/compendio/, con los textos en los dos idiomas.
// El esquema se comprueba al compilar: si falta una fuente, un idioma o el
// nivel de evidencia, la web no se publica.
import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Texto en español e inglés
const t = z.object({ es: z.string().min(1), en: z.string().min(1) });

const fuente = z.object({
  autores: z.string(),
  anio: z.number().int(),
  titulo: z.string(),
  revista: z.string(),
  pmid: z.string().regex(/^\d+$/),
  doi: z.string().optional(),
});

const producto = z.object({
  id: z.string(),
  marca: z.string(),
  nombre: z.string(),
  /** Nombre del fichero en src/assets/img/compendio/ */
  foto: z.string(),
  alt: t,
  url: z.url(),
  pais: t.optional(),
  datos: z.array(z.object({ k: t, v: t })).min(1),
  precio: t,
});

const suplementos = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/compendio/suplementos" }),
  schema: z.object({
    nombre: t,
    tipo: t,
    evidencia: z.enum(["fuerte", "moderada", "preliminar"]),
    /** Por qué tiene ese nivel de evidencia, en una frase */
    porQue: t,
    /** Dónde actúa en el diagrama del problema */
    zona: z.string(),
    resumen: t,
    mecanismo: t,
    dosis: t,
    cuando: t,
    hallazgos: z.array(z.object({ texto: t, fuente: z.string() })).min(1),
    precauciones: z.array(t).min(1),
    fuentes: z.array(fuente).min(1),
    productos: z.array(producto).optional(),
  }),
});

const problemas = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/compendio/problemas" }),
  schema: z.object({
    orden: z.number().int(),
    nombre: t,
    titular: t,
    intro: t,
    queOcurre: t,
    combinar: t,
    alarma: z.array(t).min(1),
    suplementos: z.array(reference("suplementos")).min(1),
  }),
});

export const collections = { suplementos, problemas };
