# ADR 0006: Usuarios y mensajes en Supabase, protegidos con RLS

- **Estado:** aceptada
- **Fecha:** 19/10/2026
- **Issue:** #29 (base para #30, #31 y #32)

## Contexto

Quiero que quien me escriba por el formulario tenga un espacio propio donde
ver nuestra conversación, y yo un panel con todos los usuarios y mensajes,
para no depender del correo. Eso pide tres cosas que una web estática no
tiene:

- **Base de datos** para guardar usuarios, mensajes y actividad.
- **Acceso con cuenta**, y que nadie pueda entrar en el espacio de otro aunque
  escriba su email.
- **Permisos por fila:** cada usuario ve lo suyo y yo lo veo todo.

GitHub Pages solo sirve ficheros (ADR 0004): no puedo poner un servidor
propio delante de la base de datos. El navegador tiene que hablar
directamente con ella, y entonces la seguridad no puede depender del
JavaScript de la web, porque cualquiera puede leerlo y saltárselo.

## Decisión

Usar **[Supabase](https://supabase.com)** (Postgres + Auth + API REST) con
**Row Level Security (RLS)**.

- **Esquema versionado** en `supabase/migrations/`: tablas `profiles` (con el
  rol `user` o `admin`), `messages` y `events`. Un trigger crea el perfil al
  crearse el usuario en Auth.
- **Reglas RLS en la propia base de datos:** cada usuario lee solo sus filas,
  el rol `admin` lee y escribe todo, y un usuario puede añadir sus mensajes
  y eventos pero no cambiar su rol (otro trigger lo impide). Para que Mi
  espacio (#31) marque mis respuestas como leídas sin poder tocar su texto,
  hay una función aparte, `mark_replies_read()`. Hay 27 pruebas en
  `supabase/tests/rls.sql`.
- **Acceso sin contraseña:** el usuario escribe su email y recibe un código de
  un solo uso y un enlace (sirve cualquiera de los dos). La página `/entrar/`
  no crea cuentas (`shouldCreateUser: false`, y el registro está desactivado
  en Supabase): las crea n8n al recibir el formulario.
- **Dos claves con papeles distintos:**
  - La **pública** (anon o *publishable*) va en la web, en variables
    `PUBLIC_` de entorno (`.env` en local, variables del repositorio en
    GitHub Actions). Con ella solo se puede lo que dejan las reglas.
  - La **secreta** (`service_role`) se salta RLS. Vive solo en n8n; nunca en
    la web ni en el repositorio.

## Recorrido del dato

Del formulario a «Mi espacio» y a mi panel. Los pasos 1 a 4 llegan en #30,
el 6 en #31 y el 7 en #32; este bloque monta la base sobre la que van.

```
 visitante            n8n (service_role)         Supabase                    web (clave pública)
 ─────────            ──────────────────         ────────                    ───────────────────
 1 envía el ───────▶  2 comprueba el captcha
   formulario           ¿existe el email? ────▶  auth.users
                        si no, lo crea ───────▶  └─ trigger ─▶ profiles (rol user)
                      3 clasifica con IA
                        guarda el mensaje ────▶  messages (author user)
                        y el evento ──────────▶  events (formulario)
                      4 respuesta automática
                        con enlace a /entrar/ ─────────────────────────────────▶ correo

 5 /entrar/: escribe su email ────────────────▶  Auth envía código + enlace
   escribe el código ─────────────────────────▶  Auth devuelve un JWT ───────▶ se guarda en el navegador
 6 Mi espacio pide sus mensajes ──────────────▶  API REST con el JWT
                                                 rol authenticated
                                                 RLS: user_id = auth.uid() ─▶ solo su hilo
 7 yo entro igual ────────────────────────────▶  RLS: is_admin() ──────────▶ todos los hilos
   y respondo ────────────────────────────────▶  messages (author admin)
```

Lo importante está en el paso 6: la web pide «todos los mensajes» y es
**Postgres** quien filtra. Aunque alguien cambie el JavaScript, el JWT dice
quién es y las reglas no le dejan ver más.

## Por qué

- **La seguridad vive en la base de datos.** RLS es Postgres puro: las reglas
  se leen como SQL (`using (user_id = auth.uid())`), se prueban con SQL y
  valen igual para la web, para n8n y para cualquier cliente futuro.
- **Auth incluido**, con código o enlace por email, sin que yo guarde
  contraseñas: no hay nada que robar ni flujo de «he olvidado mi contraseña».
- **API REST automática** a partir de las tablas: no escribo un servidor.
- **SQL de verdad** (Postgres), que es lo que estudio en DAM, y esquema en
  migraciones versionadas en git, como el resto del proyecto.
- **n8n tiene nodo de Supabase**, y el plan gratuito basta para una web
  personal. Los datos se quedan en una región de la UE (RGPD).

## Alternativas descartadas

- **Firebase (Firestore + Auth):** también funciona sin servidor, pero es NoSQL
  y sus reglas de seguridad son un lenguaje propio de Google. Prefiero SQL.
- **Servidor propio (Node/Express en Render o similar):** más piezas que
  mantener (sesiones, contraseñas, despliegue) y otra superficie de ataque.
  Además, los planes gratuitos se duermen y la primera petición tarda.
- **Cloudflare D1 + el Worker del chatbot (ADR 0002):** ya tengo un Worker,
  pero el acceso con cuenta y los permisos por fila los tendría que
  programar yo desde cero.
- **Contraseñas:** obligan a guardarlas bien, a tener recuperación y a que la
  gente se acuerde de una más. El código por email da la misma seguridad que
  su buzón, que es lo que se usaría para recuperar la contraseña de todos modos.
- **Enlace mágico sin código:** los antivirus de algunos correos abren los
  enlaces para revisarlos y los gastan, y si se abre en el móvil la sesión se
  queda en el móvil. El código se puede leer en un sitio y escribir en otro.

## Consecuencias

- La **clave pública está en el JavaScript** de la web a propósito. Si una
  regla RLS estuviera mal, se notaría: por eso las pruebas de
  `supabase/tests/rls.sql` se vuelven a pasar con cada cambio de esquema.
- **Nunca se edita una migración ya ejecutada:** cada cambio es una migración
  nueva, con sus pruebas, y se actualizan los tipos de
  `src/lib/database.types.ts`.
- **Si Supabase cae**, solo fallan `/entrar/` y las zonas privadas; el resto de
  la web es estático y sigue funcionando.
- `/entrar/` **responde igual** tenga cuenta o no el email, para que nadie
  pueda averiguar quién me ha escrito probando direcciones.
- El **plan gratuito** pausa el proyecto tras una semana sin uso y su correo
  solo llega a los emails del equipo. Antes de abrir el formulario al público
  (#30) hay que configurar un **SMTP propio** (Resend o Brevo).
- `read_at` guarda cuándo leyó el mensaje el destinatario. Que el usuario
  marque como leídas mis respuestas desde «Mi espacio» llega en #31.
- Guardar datos de personas obliga a una **casilla de consentimiento y una
  página de privacidad** (RGPD) junto al formulario.
- Guía de puesta en marcha: [`supabase/README.md`](../../supabase/README.md).
