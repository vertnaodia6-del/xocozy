const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  document.body.classList.toggle('dark', theme === 'dark');
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '<span aria-hidden="true">🌙</span>' : '<span aria-hidden="true">☀️</span>';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Activer le thème clair' : 'Basculer le thème');
  }
}

function getStoredTheme() {
  return localStorage.getItem('xocozy-theme') || 'light';
}

function toggleTheme() {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('xocozy-theme', nextTheme);
  applyTheme(nextTheme);
}

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = getStoredTheme();
  applyTheme(savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
