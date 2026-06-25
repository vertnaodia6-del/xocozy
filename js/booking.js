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
      showFeedback(feedback, 'Votre demande de réservation a bien été enregistrée.', 'success');
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
      showFeedback(feedback, 'Merci, votre message a bien été envoyé.', 'success');
    });
  }
});
