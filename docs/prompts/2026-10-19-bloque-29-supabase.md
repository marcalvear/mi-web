# Bloque #29 (Supabase): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 19 de octubre de 2026.
Aquí guardo mis órdenes y las decisiones que salieron de ellas. El contexto
está en [2026-10-19-rediseno-v3.md](2026-10-19-rediseno-v3.md) (sección
«Usuarios y panel de administrador»), en la issue #29 y en el
[ADR 0006](../adr/0006-supabase-con-rls.md). Resultado: PR #42.

## El encargo

1. Guiarme paso a paso para crear el proyecto en supabase.com. La cuenta y el
   proyecto los creo yo; la IA nunca introduce credenciales. Solo le paso la
   Project URL y la clave pública. La `service_role` nunca va en la web ni en
   el repo.
2. Esquema como migración SQL versionada en `supabase/migrations/`: tablas
   `profiles`, `messages` y `events`, y un trigger que crea el perfil al
   crearse un usuario.
3. Reglas RLS: cada usuario lee solo lo suyo, el rol `admin` lee y escribe
   todo, y un usuario puede insertar sus mensajes y eventos pero nunca cambiar
   su rol. Probarlas con consultas SQL y dejar las pruebas en el repo.
4. Acceso sin contraseña, cliente `src/lib/supabase.ts` con variables
   `PUBLIC_` y página `/entrar/` en español e inglés con el diseño del cuaderno.
5. ADR 0006: por qué Supabase + RLS y el recorrido del dato.

## Mis preguntas durante la puesta en marcha

> me pregunta si conecto el proyecto a github?

No. La integración aplica sola las migraciones al fusionar en `main`, y
nosotros la ejecutamos a mano en el SQL Editor. Además, la v3 vive en `v3` y
las ramas de prueba son de pago.

> ok, que es el automatic RLS?

Activa RLS en cada tabla nueva de `public`. La activé: es una red de
seguridad por si alguna vez se me olvida en una migración.

> me sale una advertencia a la hora de ejecutarlo. Me dice que hay un
> potencial error

El SQL Editor avisa al ver `delete` o `update` sin `where`. En
`tests/rls.sql` están a propósito (la prueba 15 comprueba que Ana no puede
borrar nada) y todo va dentro de `begin … rollback`. Lo ejecuté:
24 de 24 pruebas pasan.

> No me deja modificar el asunto ni el contenido de los correos.

Supabase ya no deja editar las plantillas sin un SMTP propio. Mientras
tanto llega el correo de serie, que solo trae el enlace, y `/entrar/` lo
acepta igual que el código. La guía de `supabase/README.md` lo explica, y el
SMTP propio (Brevo) queda para antes de #30.

> ta está hecho, me sale todo correcto, ahora publícalo tu para que salga
> también en github

Las dos variables públicas quedaron en el repositorio (*Settings → Secrets
and variables → Actions → Variables*). La v3 no se publica todavía: la v2
sigue en `main` hasta que la v3 esté terminada (#35).

## Cómo lo comprobó la IA

- Migración y pruebas en un Postgres local (PGlite). Rompiendo una regla a
  propósito, falla la prueba que la vigila.
- `/entrar/` contra un servidor que imita Supabase: todos los errores, móvil,
  los dos temas y los dos idiomas.
- Contra mi proyecto real: las tres tablas existen, sin sesión no se puede
  leer ninguna y el registro está desactivado. Después entré yo con mi email
  y me salió el rol de administrador.
