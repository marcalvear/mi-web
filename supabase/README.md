# Supabase: base de datos y acceso de usuarios

Por qué Supabase y cómo viaja el dato: [ADR 0006](../docs/adr/0006-supabase-con-rls.md).

```
supabase/
├── migrations/   el esquema: tablas, triggers y reglas RLS (se ejecuta una vez)
├── tests/rls.sql 24 pruebas de las reglas, se pueden repetir cuando quieras
└── templates/    el correo con el código de acceso
```

## Puesta en marcha (una sola vez)

Lo hago yo en el navegador. Ninguna clave secreta sale de supabase.com salvo
la que más adelante pegue en n8n (#30).

### 1. Cuenta y proyecto

1. Entra en [supabase.com](https://supabase.com) → **Start your project** y
   regístrate con GitHub.
2. **New project**:
   - **Name:** `mi-web`.
   - **Database password:** pulsa *Generate a password* y guárdala en el gestor
     de contraseñas. La web no la necesita.
   - **Region:** una de Europa (por ejemplo *Central EU (Frankfurt)* o
     *West EU (Ireland)*): los datos de personas de la UE se quedan en la UE (RGPD).
   - **Plan:** Free.
   - Si pregunta por la **Data API**, déjala activada y con el esquema `public`.
3. Espera un par de minutos a que el proyecto termine de crearse.

> El plan gratuito pausa el proyecto si pasa una semana sin uso. Se reactiva
> desde el panel con *Restore project*.

### 2. Crear las tablas y las reglas

1. Menú izquierdo → **SQL Editor** → **New query**.
2. Pega todo [`migrations/20261019120000_usuarios_mensajes_eventos.sql`](migrations/20261019120000_usuarios_mensajes_eventos.sql)
   y pulsa **Run**. Debe decir *Success. No rows returned*.
3. Nueva consulta, pega [`tests/rls.sql`](tests/rls.sql) y **Run**. Debe
   devolver una fila: `OK: las 24 pruebas de RLS pasan`. Si sale
   `FALLA nn: …`, la regla de esa prueba no está bien. Las pruebas no dejan
   datos: todo se deshace al final.
4. En **Table Editor** tienen que aparecer `profiles`, `messages` y `events`
   sin el aviso rojo de *RLS disabled*.

### 3. Acceso sin contraseña

En **Authentication**:

1. **Sign In / Providers → Email:** activado.
   - Desactiva **Allow new users to sign up** (en *User Signups*). Las cuentas
     las crea n8n cuando alguien escribe por el formulario (#30) o yo a mano;
     nadie puede crearse una desde la web.
2. **URL Configuration:**
   - **Site URL:** `https://marcalvear.github.io/mi-web/`
   - **Redirect URLs** (*Add URL*, una por una):
     - `https://marcalvear.github.io/mi-web/**`
     - `http://localhost:4321/mi-web/**`
3. **Emails → Templates → Magic link:** con el correo que trae Supabase la
   plantilla **no se puede editar** (*Set up custom SMTP to edit templates*).
   Mientras tanto llega la de serie, que solo trae el **enlace**: se entra
   pulsándolo, y `/entrar/` lo acepta igual que el código.

   Cuando haya SMTP propio (ver abajo), se pega aquí la plantilla con código
   y enlace:
   - **Subject:** `Tu código para entrar · Your sign-in code`
   - **Body** (pestaña *Source*): [`templates/magic-link.html`](templates/magic-link.html).

> **Correo de verdad:** el servidor de correo que trae Supabase solo envía a
> los emails del equipo del proyecto (o sea, al mío), unos pocos por hora y
> con la plantilla de serie. Para probar me vale. Antes de abrir el formulario
> al público (#30) hay que poner un SMTP propio en **Emails → SMTP Settings**.
> Brevo tiene plan gratuito y basta con verificar mi email como remitente;
> Resend pide tener un dominio propio para escribir a otras personas.

### 4. Mi cuenta de administrador

1. **Authentication → Users → Add user → Create new user**: mi email y
   marca *Auto Confirm User*. La contraseña no se usa (entro con código):
   pon una larga del gestor y olvídala.
2. El trigger le crea el perfil con el rol `user`. Para hacerme admin, en el
   **SQL Editor**:

   ```sql
   update public.profiles set role = 'admin' where email = 'MI-EMAIL';
   ```

   Es la única forma de dar el rol `admin`: desde la web nadie puede
   cambiárselo (prueba 12).

### 5. Las dos claves públicas

En **Project Settings → API Keys** (la URL también está en **Data API** o en
el botón **Connect** de arriba):

| Dato | Dónde | ¿Público? |
|---|---|---|
| **Project URL** | `https://xxxx.supabase.co` | Sí |
| **Publishable key** (`sb_publishable_…`) o, en *Legacy API keys*, la **anon public** | API Keys | Sí: va en la web |
| **Secret key** (`sb_secret_…`) o **service_role** | API Keys | **No.** Se salta RLS. Solo en n8n, nunca en la web ni en el repo |

Las dos públicas van en:

- **En local:** copia `.env.example` como `.env` en la raíz y rellena
  `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`. El `.env` no se sube.
- **En GitHub Pages:** repositorio → **Settings → Secrets and variables →
  Actions → Variables → New repository variable**, una con cada nombre. El
  workflow las pasa al build.

### 6. Probarlo

```bash
npm run dev
```

Abre http://localhost:4321/mi-web/entrar/, escribe mi email y entra con el
código del correo (o con el enlace, si aún uso la plantilla de serie): tiene que decir *Rol: administrador*. En **Table Editor →
events** aparece una fila `entrar`.

## Si cambio el esquema

Nunca edito una migración que ya está ejecutada: creo otra en `migrations/`
con fecha más nueva, la ejecuto en el SQL Editor, añado sus pruebas a
`tests/rls.sql` y actualizo los tipos de `src/lib/database.types.ts`.
