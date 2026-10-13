// Validación accesible del formulario de contacto.
// Si todo está bien, NO se cancela el envío: el formulario se manda de forma
// normal a FormSubmit, que es lo que permite la respuesta automática por correo.

const form = document.getElementById("contact-form");

const MESSAGES = {
  nombre: { valueMissing: "Escribe tu nombre." },
  email: {
    valueMissing: "Escribe tu email para poder responderte.",
    typeMismatch: "Ese email no parece válido. Revisa que tenga la forma nombre@correo.com.",
  },
  mensaje: {
    valueMissing: "Cuéntame en qué puedo ayudarte.",
    tooShort: "Escribe un poco más, al menos 20 caracteres, para que pueda entenderte.",
  },
};

function errorFor(field) {
  const v = field.validity;
  const texts = MESSAGES[field.name] || {};
  if (v.valueMissing) return texts.valueMissing;
  if (v.typeMismatch) return texts.typeMismatch;
  if (v.tooShort) return texts.tooShort;
  return "";
}

function check(field) {
  const message = errorFor(field);
  const box = document.getElementById(field.id + "-error");
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (box) box.textContent = message;
  return !message;
}

if (form) {
  const fields = Array.from(form.querySelectorAll("[required]"));

  // El destino de «gracias» se calcula desde la página actual, así funciona
  // igual en local que publicado en GitHub Pages
  form.elements._next.value = new URL("gracias.html", location.href).href;

  // Se valida al salir de cada campo y, si ya tenía error, mientras se corrige
  fields.forEach((field) => {
    field.addEventListener("blur", () => check(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") check(field);
    });
  });

  form.addEventListener("submit", (e) => {
    const invalid = fields.filter((field) => !check(field));
    if (invalid.length) {
      e.preventDefault();
      invalid[0].focus();
      return;
    }
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Enviando…";
  });

  // Si se vuelve atrás desde el captcha, el botón tiene que funcionar otra vez
  window.addEventListener("pageshow", () => {
    const button = form.querySelector("button[type='submit']");
    button.disabled = false;
    button.textContent = "Enviar mensaje";
  });
}
