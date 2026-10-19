// Variables de entorno que usa la web. Las PUBLIC_ acaban en el JavaScript
// del navegador, así que solo pueden ser datos públicos (ver .env.example).
interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
