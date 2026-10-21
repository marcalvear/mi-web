// El modelo de Workers AI. Va en su propio módulo porque el runtime de
// Cloudflare toma cada export de index.js como punto de entrada y no admite
// que uno sea un texto.
export const MODEL = "@cf/mistralai/mistral-small-3.1-24b-instruct";
