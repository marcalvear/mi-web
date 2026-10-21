# Compendio de biohacking: favoritos con estrella y registro abierto (#63, #67)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

## El encargo

Al retomar la épica, Claude preguntó qué fase seguía: más problemas o
favoritos. Marc eligió:

> Fase B: favoritos con estrella, registro en Supabase, tabla con RLS y
> pruebas, Mis favoritos y panel.

El registro abierto ya estaba decidido desde el 20/10/2026 («sí, abrimos el
registro con Supabase»).

## Decisiones

- **Tabla `favorites`**: una fila por persona y ficha. La clave
  `(user_id, supplement)` impide guardar la misma dos veces. `supplement` es el
  id de la ficha, que es el nombre del JSON. La base de datos solo comprueba
  que tenga forma de id.
- **Reglas RLS** con las mismas ideas que las otras tablas:
  - cada persona ve, guarda y quita lo suyo;
  - el admin lo ve todo;
  - sin sesión no se toca nada;
  - un favorito no se edita.
- **Tope de 100 favoritos por persona.** Con el registro abierto, nadie debe
  poder llenar la base de datos.
- **12 pruebas nuevas** en `supabase/tests/rls.sql`, de la 28 a la 39. Antes de
  dárselas a Marc, las 39 se ejecutaron en un Postgres local (PGlite) con un
  esquema `auth` de imitación.
- **Registro abierto en `/entrar/`** (`shouldCreateUser: true`). Si el registro
  sigue cerrado en Supabase, la página lo dice en vez de fingir que ha mandado
  el código. Debajo del email va el aviso de privacidad.
- **La estrella lleva de vuelta a la ficha.** Sin sesión, la estrella saca un
  aviso con «Entrar y guardarla». `/entrar/?next=` solo acepta rutas de esta
  web, para que nadie pueda usarlo para mandar a la gente a otro sitio. Al
  volver, la ficha queda guardada.
- **Supabase se carga cuando el navegador está libre.** El compendio no lo
  necesitaba antes, y así no retrasa la primera carga. La estrella aparece en
  una fila con alto fijo, sin mover nada (CLS 0).
- **Mi espacio** enseña «Fichas guardadas» solo si hay alguna: el compendio
  sigue oculto y no se enlaza desde ningún sitio.
- **Panel**:
  - pestaña «Lo más guardado», con un ranking y barras;
  - columna de favoritos en Usuarios;
  - «Guardó / Quitó la ficha…» en la actividad de cada persona.
- **Privacidad** al día: cuentas creadas en Entrar, fichas guardadas y la
  ficha pendiente que recuerda el navegador.
- **Copy** con la skill *copywriting*. Mantiene la voz de los textos que ya
  había y solo cambia lo que el registro abierto deja de hacer cierto.

## Un fallo en Supabase que no salía en local

Al ejecutar las pruebas en Supabase, Marc vio «FALLA 34: Ana ha podido editar
un favorito». En Supabase, cada tabla nueva de `public` nace con todos los
permisos para `authenticated`, también UPDATE, y la migración no los quitaba.
Las reglas RLS ya impedían cambiar ninguna fila, pero la prueba pide que ni
siquiera se pueda intentar. Arreglo: una migración nueva
(`20261021130000_favoritos_sin_editar.sql`), porque la anterior ya estaba
ejecutada. El Postgres local de las pruebas ahora imita esos permisos de serie.

## Lo que hace Marc en Supabase

Está en el PR y en `supabase/README.md`:

1. Ejecutar las migraciones `20261021120000_favoritos.sql` y `20261021130000_favoritos_sin_editar.sql`, y las pruebas.
2. Activar *Allow new users to sign up*.
3. Revisar los límites de envío.

## Pendiente (otras fases de #63)

- Más problemas.
- Integración: menú, ⌘K, el radar de Me gusta y Marc IA como «boticario».
- Posible mejora: Turnstile también en `/entrar/`, si un día llegan registros
  de bots.
