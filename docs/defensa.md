# Guion de la defensa

Dos explicaciones de un minuto cada una, para contarlas con mis palabras y
señalando los esquemas de [`/sistema/#defensa`](https://marcalvear.github.io/mi-web/sistema/#defensa).
Debajo, las preguntas que me pueden hacer y lo que respondería.

La idea de fondo, que sirve para las dos: **GitHub Pages solo sirve ficheros
y todo lo que llega al navegador lo puede leer cualquiera.** Por eso ningún
secreto va en la web: lo que necesita una clave secreta pasa por un
intermediario (n8n para el formulario, el Worker para el chat) y lo que va
con la clave pública lo vigila la base de datos (RLS).

## 1. Del formulario al correo (un minuto)

Esquema 1 de `/sistema/#defensa`. Flujo `mi-web · Contacto` en n8n
([`n8n/contacto.workflow.ts`](../n8n/contacto.workflow.ts), [ADR 0007](adr/0007-contacto-con-n8n.md)).

1. **El navegador** comprueba los campos, pide el captcha de Turnstile y manda
   el formulario con `fetch` (JSON) al webhook de n8n. No cambia de página.
2. **n8n normaliza y valida otra vez** (email en minúsculas, longitudes,
   consentimiento, campo trampa vacío). Lo repite porque al webhook se le puede
   llamar sin pasar por la web. Si algo falla, responde 400.
3. **Comprueba el captcha** con Cloudflare usando la clave secreta, que solo
   tiene n8n. Si no es válido, 403.
4. **Crea el usuario en Supabase Auth** si no existía, con la clave
   `service_role`. Un trigger de Postgres le crea el perfil con rol `user`.
5. **Claude clasifica el mensaje** en una de cinco categorías (proyecto,
   oportunidad, consulta, saludo o spam). El prompt le dice que el texto es
   solo algo que clasificar, para que no obedezca instrucciones escondidas.
   Si la IA falla, se guarda como `sin_clasificar`.
6. **Guarda el mensaje y un evento** en las tablas `messages` y `events`.
7. **Si no es spam, envía el correo** por SMTP (Brevo) en el idioma de la
   persona, con el nombre y el texto escapados y un enlace a `/entrar/`.
   Responde 200 y la web enseña el aviso de «recibido».

Frase para cerrar: *la clave secreta nunca sale de n8n, y cada ejecución queda
registrada en n8n, así que si algo falla veo en qué nodo.*

**Cuando respondo desde el panel** pasa al revés: el panel guarda mi respuesta
con mi sesión y llama al flujo `mi-web · Aviso de respuesta`
([`n8n/aviso.workflow.ts`](../n8n/aviso.workflow.ts)). Ese flujo comprueba
con `is_admin()` que quien llama soy yo y entonces avisa a la persona por
correo.

## 2. Cómo protege RLS «Mi espacio» (un minuto)

Esquema 2 de `/sistema/#defensa`. Reglas en
[`supabase/migrations/`](../supabase/migrations/), [ADR 0006](adr/0006-supabase-con-rls.md).

1. **Entrar sin contraseña:** en `/entrar/` la persona escribe su email,
   Supabase le manda un código y, al escribirlo, le devuelve un **JWT** (un
   token firmado que dice quién es).
2. **La web pide los mensajes** a la API REST de Supabase con la clave
   pública y ese JWT. La consulta es «dame los mensajes», sin filtro.
3. **Postgres filtra con RLS** antes de devolver nada. La regla es una línea
   de SQL: `using (user_id = auth.uid())`. `auth.uid()` sale del JWT, que no
   se puede falsificar porque va firmado.
4. **Resultado:** cada persona solo recibe su hilo. Yo, con rol `admin`
   (`is_admin()`), recibo todos.

Frase para cerrar: *la seguridad no está en el JavaScript, que cualquiera
puede cambiar, sino en la base de datos. Aunque alguien toque la web, el JWT
dice quién es y Postgres no le da más.*

Detalles que refuerzan la idea:

- Al escribir, un usuario solo puede insertar en su hilo y como autor `user`:
  no puede hacerse pasar por mí ni ponerse una categoría.
- Un trigger (`protect_profile`) impide que nadie se cambie el rol a `admin`.
- Hay **39 pruebas** en [`supabase/tests/rls.sql`](../supabase/tests/rls.sql)
  que intentan justo eso (leer lo de otro, hacerse admin, editar mensajes)
  y comprueban que falla.

## 3. El chat (treinta segundos, si preguntan)

[ADR 0002](adr/0002-chatbot-con-worker.md). La web manda la conversación a un
**Cloudflare Worker**, que añade mis instrucciones y llama a Workers AI. No
hay clave que robar: el permiso va ligado a mi cuenta de Cloudflare. El Worker
solo acepta peticiones de mi web, recorta los mensajes y descarta los roles
que no sean `user` o `assistant`, para que nadie cuele un mensaje de sistema.
El contexto se genera desde los textos de la web (`npm run chatbot:contexto`),
así que solo sabe lo que la web dice.

## Preguntas probables

**¿Por qué no hablas con Supabase directamente desde el formulario?**
Crear usuarios necesita la clave `service_role`, que se salta RLS. Si
estuviera en la web, cualquiera podría leer y escribir toda la base de datos.

**La clave de Supabase está en el JavaScript, ¿no es un fallo?**
Es la pública, y está a propósito. Con ella solo se puede lo que dejan las
reglas RLS. La secreta solo vive en n8n.

**¿Y si alguien escribe con el email de otra persona?**
Esa persona recibe el correo automático, que lo explica. Nadie más puede
entrar en su espacio, porque el acceso pide el código que llega a su buzón.

**¿Cómo sabes que las reglas funcionan?**
Por las 39 pruebas de `rls.sql`, que se vuelven a pasar con cada cambio de
esquema. Nunca edito una migración ya ejecutada: cada cambio es una nueva.

**¿Qué pasa si se cae n8n o Supabase?**
El resto de la web es estático y sigue funcionando. El formulario explica el
error y ofrece LinkedIn; solo `/entrar/` y las zonas privadas dejan de ir.

**¿Por qué n8n y no una función en el servidor?**
Porque cada paso se ve en el lienzo y se prueba por separado, y cada ejecución
queda registrada. Una Supabase Edge Function sería código en Deno que
desplegar y mantener (ADR 0007, alternativas descartadas).

**¿Cómo evitas el spam?**
Tres capas: el captcha de Turnstile, un campo trampa invisible que los bots
rellenan y la clasificación de la IA. Al spam se le guarda pero no se le
contesta.
