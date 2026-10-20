// Flujo «mi-web · Aviso de respuesta» de n8n escrito con el Workflow SDK de n8n (#32).
// El panel lo llama al guardar una respuesta mía, con el token de mi sesión de Supabase;
// el flujo comprueba con is_admin() que soy yo y avisa por correo a la persona.
// La clave sb_publishable_… es la pública de la web. Las credenciales son las del contacto.

import { workflow, node, trigger, sticky, ifElse, expr } from '@n8n/workflow-sdk';

const hook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Aviso desde el panel',
    parameters: {
      httpMethod: 'POST',
      path: 'mi-web/aviso',
      responseMode: 'responseNode',
      options: { allowedOrigins: 'https://marcalvear.github.io,http://localhost:4321,http://localhost:4322' }
    }
  },
  output: [{ headers: { authorization: 'Bearer eyJhbGciOi.TOKEN.DE.SESION' }, body: { message_id: 12 } }]
});

const readRequest = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Leer petición',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'session', name: 'session', value: expr('{{ ($json.headers?.authorization ?? "").replace(/^Bearer\\s+/i, "").trim() }}'), type: 'string' },
          { id: 'messageId', name: 'messageId', value: expr('{{ Number.isInteger($json.body?.message_id) ? $json.body.message_id : 0 }}'), type: 'number' }
        ]
      }
    }
  },
  output: [{ session: 'eyJhbGciOi.TOKEN.DE.SESION', messageId: 12 }]
});

const isComplete = ifElse({
  version: 2.3,
  config: {
    name: '¿Petición completa?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          { id: 'session', leftValue: expr('{{ $json.session }}'), rightValue: '', operator: { type: 'string', operation: 'notEmpty', singleValue: true } },
          { id: 'message', leftValue: expr('{{ $json.messageId }}'), rightValue: 0, operator: { type: 'number', operation: 'gt' } }
        ],
        combinator: 'and'
      }
    }
  }
});

const askAdmin = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: {
    name: '¿Es admin quien llama?',
    parameters: {
      method: 'POST',
      url: 'https://batfjflsekdaqdtaqlyo.supabase.co/rest/v1/rpc/is_admin',
      sendHeaders: true,
      headerParameters: {
        parameters: [
          { name: 'Authorization', value: expr('Bearer {{ $json.session }}') },
          { name: 'apikey', value: 'sb_publishable_JR2j1SKeJUUwdtPocr5TQw_DSEbPGFD' }
        ]
      },
      options: { response: { response: { neverError: true, fullResponse: true } } }
    }
  },
  output: [{ statusCode: 200, body: true }]
});

const isAdmin = ifElse({
  version: 2.3,
  config: {
    name: '¿Es admin?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          { id: 'admin', leftValue: expr('{{ $json.statusCode === 200 && $json.body === true }}'), rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }
        ],
        combinator: 'and'
      }
    }
  }
});

const findReply = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: {
    name: 'Buscar respuesta',
    onError: 'continueErrorOutput',
    parameters: {
      method: 'GET',
      url: 'https://batfjflsekdaqdtaqlyo.supabase.co/rest/v1/messages',
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'supabaseApi',
      sendQuery: true,
      queryParameters: {
        parameters: [
          { name: 'id', value: expr('eq.{{ $("Leer petición").item.json.messageId }}') },
          { name: 'author', value: 'eq.admin' },
          { name: 'select', value: 'id,body,user_id,profiles(name,email)' }
        ]
      },
      options: { response: { response: { fullResponse: true } } }
    },
    credentials: { supabaseApi: { id: 'FG5L41oGc6VSVAZE', name: 'Supabase mi-web' } }
  },
  output: [{ statusCode: 200, body: [{ id: 12, body: 'Perfecto, Ana. Empezamos por los informes.', user_id: 'f4a9390a-461e-4157-98f1-27ee6e82dff5', profiles: { name: 'Ana', email: 'ana@example.com' } }] }]
});

const replyExists = ifElse({
  version: 2.3,
  config: {
    name: '¿Existe la respuesta?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict', version: 2 },
        conditions: [
          { id: 'found', leftValue: expr('{{ Array.isArray($json.body) && $json.body.length === 1 }}'), rightValue: '', operator: { type: 'boolean', operation: 'true', singleValue: true } }
        ],
        combinator: 'and'
      }
    }
  }
});

const recipientLang = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: {
    name: 'Idioma del destinatario',
    parameters: {
      method: 'GET',
      url: expr('https://batfjflsekdaqdtaqlyo.supabase.co/auth/v1/admin/users/{{ $json.body[0].user_id }}'),
      authentication: 'predefinedCredentialType',
      nodeCredentialType: 'supabaseApi',
      options: { response: { response: { neverError: true, fullResponse: true } } }
    },
    credentials: { supabaseApi: { id: 'FG5L41oGc6VSVAZE', name: 'Supabase mi-web' } }
  },
  output: [{ statusCode: 200, body: { email: 'ana@example.com', user_metadata: { lang: 'es', name: 'Ana' } } }]
});

const draft = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Redactar aviso',
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: "// Redacta el aviso de que he respondido, en el idioma de la persona.\n// Mi respuesta y su nombre se escapan antes de meterlos en el HTML.\nconst found = $('Buscar respuesta').item.json.body[0];\nconst meta = $json.body?.user_metadata ?? {};\nconst lang = meta.lang === 'en' ? 'en' : 'es';\nconst to = found.profiles?.email ?? $json.body?.email;\nconst escape = (s) =>\n  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');\nconst rawName = found.profiles?.name ?? meta.name ?? '';\nconst name = escape(rawName);\nconst reply = escape(found.body).replace(/\\n/g, '<br>');\nconst site = 'https://marcalvear.github.io/mi-web/';\n\nconst copy = {\n  es: {\n    subject: 'Marc te ha respondido',\n    hello: (n) => (n ? `Hola, ${n}:` : 'Hola:'),\n    intro: 'Te he respondido en tu espacio de la web. Esto es lo que te he escrito:',\n    button: 'Ver la conversación',\n    link: `${site}mi-espacio/`,\n    outro: 'Puedes contestarme desde ahí: entra con este mismo correo y te llegará un código de acceso.',\n    footer: 'Recibes este correo porque me escribiste desde el formulario de mi web.',\n  },\n  en: {\n    subject: 'Marc has replied',\n    hello: (n) => (n ? `Hi ${n},` : 'Hi,'),\n    intro: \"I've replied in your space on my website. This is what I wrote:\",\n    button: 'See the conversation',\n    link: `${site}en/mi-espacio/`,\n    outro: \"You can answer me from there: sign in with this same email and you'll get an access code.\",\n    footer: \"You're getting this email because you wrote to me through the form on my website.\",\n  },\n}[lang];\n\nconst html = `<!doctype html>\n<html lang=\"${lang}\">\n<body style=\"margin:0;padding:24px;background:#f6f1e6;color:#1c1f26;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.55\">\n  <div style=\"max-width:560px;margin:0 auto;background:#fbf8f1;border:1px solid #d5dee8;border-left:3px solid #e4a9a0;padding:28px\">\n    <p style=\"margin:0 0 16px\">${copy.hello(name)}</p>\n    <p style=\"margin:0 0 12px\">${copy.intro}</p>\n    <blockquote style=\"margin:0 0 20px;padding:12px 16px;border-left:2px solid #b3261e;font-style:italic\">${reply}</blockquote>\n    <p style=\"margin:0 0 24px\"><a href=\"${copy.link}\" style=\"display:inline-block;padding:10px 18px;background:#b3261e;color:#fff;text-decoration:none;font-family:Menlo,Consolas,monospace;font-size:14px\">${copy.button} →</a></p>\n    <p style=\"margin:0 0 16px\">${copy.outro}</p>\n    <p style=\"margin:0\">Marc</p>\n  </div>\n  <p style=\"max-width:560px;margin:16px auto 0;font-size:13px;color:#4a4f5c\">${copy.footer}</p>\n</body>\n</html>`;\n\nconst text = [\n  copy.hello(rawName),\n  '',\n  copy.intro,\n  '',\n  found.body,\n  '',\n  `${copy.button}: ${copy.link}`,\n  '',\n  copy.outro,\n  '',\n  'Marc',\n  '',\n  '--',\n  copy.footer,\n].join('\\n');\n\nreturn { json: { to, subject: copy.subject, html, text } };\n"
    }
  },
  output: [{ to: 'ana@example.com', subject: 'Marc te ha respondido', html: '<p>Hola, Ana:</p>', text: 'Hola, Ana:' }]
});

const send = node({
  type: 'n8n-nodes-base.emailSend',
  version: 2.1,
  config: {
    name: 'Enviar aviso',
    onError: 'continueErrorOutput',
    parameters: {
      resource: 'email',
      operation: 'send',
      fromEmail: 'Marc Calatayud <mcalatayud07alvear@gmail.com>',
      toEmail: expr('{{ $json.to }}'),
      subject: expr('{{ $json.subject }}'),
      emailFormat: 'both',
      text: expr('{{ $json.text }}'),
      html: expr('{{ $json.html }}'),
      options: { appendAttribution: false }
    },
    credentials: { smtp: { id: 'q7XPlDP7peGlE0QZ', name: 'Correo SMTP' } }
  },
  output: [{ accepted: ['ana@example.com'], rejected: [] }]
});

const respondOk = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: { name: 'Responder: avisado', parameters: { respondWith: 'json', responseBody: '{ "ok": true }', options: { responseCode: 200 } } }
});
const respondBad = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: { name: 'Responder: petición incompleta', parameters: { respondWith: 'json', responseBody: '{ "ok": false, "error": "invalid" }', options: { responseCode: 400 } } }
});
const respondForbidden = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: { name: 'Responder: sin permiso', parameters: { respondWith: 'json', responseBody: '{ "ok": false, "error": "forbidden" }', options: { responseCode: 403 } } }
});
const respondNotFound = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: { name: 'Responder: no existe', parameters: { respondWith: 'json', responseBody: '{ "ok": false, "error": "not_found" }', options: { responseCode: 404 } } }
});
const respondServer = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: { name: 'Responder: error de Supabase', parameters: { respondWith: 'json', responseBody: '{ "ok": false, "error": "server" }', options: { responseCode: 500 } } }
});
const respondMail = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: { name: 'Responder: correo fallido', parameters: { respondWith: 'json', responseBody: '{ "ok": false, "error": "email" }', options: { responseCode: 502 } } }
});

const notes = sticky(
  '## Aviso de respuesta (issue #32)\n' +
  'El panel de mi-web llama aquí al guardar una respuesta mía, con el token de mi sesión de Supabase.\n\n' +
  '- **¿Es admin quien llama?** llama a `is_admin()` con ese token: si no es mío, Supabase dice que no (o 401) y se responde 403.\n' +
  '- La clave `sb_publishable_…` es pública (la misma que usa la web).\n' +
  '- Las búsquedas usan la credencial **Supabase mi-web** y el correo **Correo SMTP**, las del flujo de contacto.\n\n' +
  'Guía: `n8n/README.md` del repositorio.',
  [hook, readRequest],
  { color: 4 }
);

export default workflow('mi-web-aviso', 'mi-web · Aviso de respuesta')
  .add(hook)
  .to(readRequest)
  .to(isComplete
    .onTrue(askAdmin)
    .onFalse(respondBad))
  .add(askAdmin)
  .to(isAdmin
    .onTrue(findReply)
    .onFalse(respondForbidden))
  .add(findReply)
  .to(replyExists
    .onTrue(recipientLang.to(draft.to(send.to(respondOk))))
    .onFalse(respondNotFound))
  .add(findReply.onError(respondServer))
  .add(send.onError(respondMail))
  .add(notes)
  .group('Comprobar quién llama', [readRequest, isComplete], { description: 'Saca el token de la sesión y el id del mensaje; si falta algo, responde 400.' })
  .group('Preparar el aviso', [recipientLang, draft, send], { description: 'Busca el idioma de la persona, redacta el correo con mi respuesta y lo envía por SMTP.' });
