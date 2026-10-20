// Variables de entorno que usa la web. Las PUBLIC_ acaban en el JavaScript
// del navegador, así que solo pueden ser datos públicos (ver .env.example).
interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  /** Webhook de n8n que recibe el formulario de contacto (#30) */
  readonly PUBLIC_N8N_CONTACT_URL?: string;
  /** Clave de sitio de Cloudflare Turnstile (la secreta vive en n8n) */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
  /** Webhook de n8n que avisa por correo de mis respuestas (#32) */
  readonly PUBLIC_N8N_REPLY_URL?: string;
  /** Worker de Cloudflare del asistente «Marc IA» (#33) */
  readonly PUBLIC_CHATBOT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
