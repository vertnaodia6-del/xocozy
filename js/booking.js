const bookingForm = document.getElementById('bookingForm');
const contactForm = document.getElementById('contactForm');

function showFeedback(element, message, type) {
  element.textContent = message;
  element.className = `form-message ${type}`;
}

function validateBooking(formData) {
  const requiredFields = ['service', 'date', 'time', 'name', 'email', 'phone'];
  return requiredFields.every((field) => formData.get(field)?.toString().trim());
}

function saveBooking(payload) {
  const existing = JSON.parse(localStorage.getItem('xocozy-bookings') || '[]');
  existing.push({ ...payload, createdAt: new Date().toISOString() });
  localStorage.setItem('xocozy-bookings', JSON.stringify(existing));
}

function sendToEmail(form, feedback, type) {
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  const lines = Object.entries(payload)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  const subject = encodeURIComponent(type === 'booking' ? 'Nouvelle demande de réservation XOCOZY' : 'Nouveau message de contact XOCOZY');
  const body = encodeURIComponent(lines || 'Aucune information supplémentaire fournie.');
  const mailtoUrl = `mailto:naodia.vert@linkeo.com?subject=${subject}&body=${body}`;

  window.location.href = mailtoUrl;
  showFeedback(feedback, 'Votre message a été préparé. Votre client e-mail va s’ouvrir avec l’adresse de destination.', 'success');
}

window.addEventListener('DOMContentLoaded', () => {
  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(bookingForm);
      const feedback = document.getElementById('bookingFeedback');
      if (!validateBooking(formData)) {
        showFeedback(feedback, 'Veuillez remplir tous les champs obligatoires.', 'error');
        return;
      }
      const payload = Object.fromEntries(formData.entries());
      saveBooking(payload);
      bookingForm.reset();
      sendToEmail(bookingForm, feedback, 'booking');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const feedback = document.getElementById('contactFeedback');
      const required = ['name', 'email', 'phone', 'message'];
      const valid = required.every((field) => formData.get(field)?.toString().trim());
      if (!valid) {
        showFeedback(feedback, 'Veuillez vérifier votre saisie avant de continuer.', 'error');
        return;
      }
      contactForm.reset();
      sendToEmail(contactForm, feedback, 'contact');
    });
  }
});
