// Cuenta regresiva para el inicio de la ceremonia en Pachuca.
const weddingDate = new Date("2027-04-24T17:30:00-06:00").getTime();

const countdown = document.getElementById("countdown");
const countdownMessage = document.getElementById("countdownMessage");

const countdownParts = {
  days: document.getElementById("countdownDays"),
  hours: document.getElementById("countdownHours"),
  minutes: document.getElementById("countdownMinutes"),
  seconds: document.getElementById("countdownSeconds")
};

let countdownTimer;

function updateCountdown() {
  const remaining = weddingDate - Date.now();

  if (remaining <= 0) {
    countdown.hidden = true;
    countdownMessage.textContent =
      remaining > -24 * 60 * 60 * 1000
        ? "¡Hoy es el gran día!"
        : "Gracias por celebrar este día con nosotros.";

    if (countdownTimer) {
      clearInterval(countdownTimer);
    }

    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  countdownParts.days.textContent = String(days).padStart(2, "0");
  countdownParts.hours.textContent = String(hours).padStart(2, "0");
  countdownParts.minutes.textContent = String(minutes).padStart(2, "0");
  countdownParts.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
countdownTimer = window.setInterval(updateCountdown, 1000);

// Oculta la cantidad de boletos si la persona no asistirá.
const attendanceSelect = document.getElementById("attendance");
const ticketField = document.getElementById("ticketField");
const ticketSelect = document.getElementById("ticketCount");

function updateTicketField() {
  const willAttend = attendanceSelect.value === "si";

  ticketField.hidden = !willAttend;
  ticketSelect.disabled = !willAttend;
  ticketSelect.required = willAttend;

  if (!willAttend) {
    ticketSelect.value = "";
  }
}

attendanceSelect.addEventListener("change", updateTicketField);
updateTicketField();

// El número se expresa en formato internacional para el enlace wa.me.
const whatsappNumber = "525583072029";

const rsvpForm = document.getElementById("rsvpForm");
const guestNameInput = document.getElementById("guestName");
const formStatus = document.getElementById("formStatus");
const whatsappFallback = document.getElementById("whatsappFallback");

guestNameInput.addEventListener("input", () => {
  guestNameInput.setCustomValidity("");
});

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!rsvpForm.reportValidity()) {
    return;
  }

  const guestName = guestNameInput.value.trim();

  if (!guestName) {
    guestNameInput.setCustomValidity("Escribe tu nombre completo.");
    guestNameInput.reportValidity();
    return;
  }

  const willAttend = attendanceSelect.value === "si";

  const messageLines = [
    "Hola, deseo confirmar mi asistencia a la boda de Nayeli y Christian.",
    `Nombre: ${guestName}.`,
    willAttend
      ? `Sí asistiré. Número de boletos: ${ticketSelect.value}.`
      : "Lamento no poder asistir.",
    "Fecha: 24 de abril de 2027."
  ];

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines.join("\n"))}`;

  whatsappFallback.href = whatsappUrl;
  whatsappFallback.hidden = false;

  formStatus.textContent =
    "Se preparó tu mensaje en WhatsApp. Recuerda pulsar Enviar para que recibamos la confirmación.";

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});