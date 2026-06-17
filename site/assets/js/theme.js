/* theme.js — Dark/light toggle with localStorage */
(function () {
  const STORAGE_KEY = 'la-theme';
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');

  function getPreferred() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      if (btn) btn.setAttribute('aria-label', 'Switch to dark mode');
      if (btn) btn.textContent = '☀️';
    } else {
      html.removeAttribute('data-theme');
      if (btn) btn.setAttribute('aria-label', 'Switch to light mode');
      if (btn) btn.textContent = '🌙';
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  applyTheme(getPreferred());

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    });
  }
})();
