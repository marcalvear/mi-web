// Cliente de Supabase para el navegador (ADR 0006).
//
// Solo lleva la URL del proyecto y la clave pública (anon). Con ella
// cualquiera puede llamar a la API, y no pasa nada: las reglas RLS de
// supabase/migrations deciden qué filas ve cada uno. La clave service_role
// se salta esas reglas, así que vive en n8n y nunca en la web ni en el repo.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/** El enlace del correo vuelve a la web con la sesión (o con el error, si
 * caducó) en el #hash. Se lee antes de crear el cliente, porque el cliente
 * lo procesa y lo borra de la barra de direcciones. */
const hash = typeof location !== "undefined" ? new URLSearchParams(location.hash.slice(1)) : null;
export const emailLink: "session" | "error" | null = hash?.has("access_token")
  ? "session"
  : hash?.has("error_code")
    ? "error"
    : null;

/** null si faltan las variables de entorno (por ejemplo, al compilar sin
 * .env): las páginas lo avisan en vez de romperse. */
export const supabase: SupabaseClient<Database> | null =
  url && anonKey
    ? createClient<Database>(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          // «implicit» y no «pkce»: el enlace del correo funciona aunque se
          // abra en otro dispositivo (pkce exige el mismo navegador)
          flowType: "implicit",
        },
      })
    : null;

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type AppEvent = Database["public"]["Tables"]["events"]["Row"];
export type Favorite = Database["public"]["Tables"]["favorites"]["Row"];
