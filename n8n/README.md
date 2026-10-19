# n8n: el flujo del formulario de contacto

Por qué n8n y qué hace cada paso: [ADR 0007](../docs/adr/0007-contacto-con-n8n.md).

```
n8n/
├── contacto.workflow.ts  el flujo «mi-web · Contacto» con el Workflow SDK de n8n
└── README.md             esta guía
```

El flujo vive en mi n8n Cloud (proyecto personal) con el nombre
**mi-web · Contacto**. Recibe el formulario en:

```
POST https://bludinvestments.app.n8n.cloud/webhook/mi-web/contacto
```

Está **sin publicar** hasta tener las credenciales: mientras tanto, la URL
devuelve 404 y el formulario dice que algo ha fallado.

## Puesta en marcha (una sola vez)

Lo hago yo en el navegador. **Ninguna clave secreta va al repositorio ni a la
web**: las secretas se pegan solo en n8n o en Supabase.

### 1. Cloudflare Turnstile (el captcha)

1. Entra en [dash.cloudflare.com](https://dash.cloudflare.com) (cuenta gratis)
   → **Turnstile** → **Add widget**.
2. **Widget name:** `mi-web`. **Hostnames:** `marcalvear.github.io` y
   `localhost`. **Widget mode:** *Managed*.
3. Copia las dos claves:
   - **Site key** (`0x4AAA…`): es pública, va en GitHub (paso 5).
   - **Secret key**: es secreta, va solo en n8n (paso 3).

### 2. Brevo (el correo)

El mismo SMTP sirve para la respuesta de n8n y para los códigos de acceso de
Supabase.

1. Crea una cuenta gratis en [brevo.com](https://www.brevo.com) (300 correos
   al día).
2. **Senders, Domains & Dedicated IPs → Senders → Add a sender** con mi email
   y verifícalo desde el correo que te llega.
3. **SMTP & API → SMTP → Generate a new SMTP key**. Apunta:
   - **SMTP server:** `smtp-relay.brevo.com`, **port** `587`.
   - **Login:** el que pone en esa página (algo como `9a1b2c@smtp-brevo.com`).
   - **Password:** la SMTP key. Es secreta.

### 3. Credenciales en n8n

Abre el flujo **mi-web · Contacto**. Los nodos que piden credencial salen con
un aviso; en cada uno, **Credential → Create new credential**:

| Credencial | Nodos | Qué poner |
|---|---|---|
| **Supabase mi-web** (Supabase API) | Crear usuario si no existe, Buscar perfil, Guardar mensaje, Guardar evento | **Host:** `https://batfjflsekdaqdtaqlyo.supabase.co`. **Service Role Secret:** la *Secret key* de Supabase (*Project Settings → API Keys*). Se salta RLS: solo aquí. |
| **Turnstile: clave secreta** | Comprobar captcha | Plantilla `{"body": {"secret": "{{secret}}"}}` y, como valor de `secret`, la Secret key de Turnstile. |
| **Correo SMTP** (SMTP) | Enviar respuesta | Usuario y contraseña de Brevo (paso 2), host `smtp-relay.brevo.com`, puerto `587`, SSL/TLS desactivado (usa STARTTLS). |
| **Claude** | Clasificar con IA | Ya tiene **Gateway credits**: los créditos de IA gratis de n8n. No hay que hacer nada. |

> Si la credencial de plantilla de Turnstile te resulta rara, vale también una
> **Custom Auth** con `{"body": {"secret": "LA_CLAVE"}}`: cambia en el nodo
> *Generic Auth Type* a *Custom Auth*.

Después, en el nodo **Enviar respuesta**, cambia **From Email** por
`Marc Calatayud <mi-email-verificado-en-brevo>`.

### 4. Publicar el flujo

Botón **Publish** arriba a la derecha. La URL de producción empieza a
responder.

### 5. Variables públicas en GitHub

Repositorio → **Settings → Secrets and variables → Actions → Variables →
New repository variable**:

| Nombre | Valor |
|---|---|
| `PUBLIC_N8N_CONTACT_URL` | `https://bludinvestments.app.n8n.cloud/webhook/mi-web/contacto` |
| `PUBLIC_TURNSTILE_SITE_KEY` | la Site key de Turnstile |

Son públicas: acaban en el JavaScript de la web. Para probar en local, ponlas
también en `.env` (ver `.env.example`); sin clave de sitio, en local se usa la
de pruebas de Cloudflare, que siempre pasa, y n8n la rechaza con 403.

### 6. SMTP en Supabase

En Supabase → **Authentication → Emails → SMTP Settings**, activa *Custom
SMTP* con los mismos datos de Brevo y mi email como remitente. Así los códigos
de acceso llegan a cualquiera, no solo a mí. Luego pega la plantilla del
correo (pasos en [`supabase/README.md`](../supabase/README.md)).

### 7. Probarlo

1. `npm run dev` y abre http://localhost:4321/mi-web/#formulario.
2. Escribe con un email mío que no tenga cuenta y envía.
3. Comprueba:
   - en n8n, **Executions**: una ejecución verde que acaba en *Responder:
     recibido*;
   - en Supabase, **Authentication → Users**: el usuario nuevo; y en **Table
     Editor**, su fila en `profiles`, el mensaje en `messages` con su
     `category` y el evento `formulario` en `events`;
   - en el correo: la respuesta automática con el botón a *Entrar*.
4. Repite con el mismo email: no se crea otro usuario, se añade el mensaje.

## Si cambio el flujo

Lo cambio en n8n y actualizo `contacto.workflow.ts` para que el repositorio
siga reflejando lo que hay publicado. Si cambian las respuestas del webhook,
también hay que tocar `src/components/home/ContactForm.astro`.
