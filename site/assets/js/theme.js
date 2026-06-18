/* theme.js — robust dark/light toggle */
(function () {
  'use strict';

  const STORAGE_KEY = 'la-theme';
  const html = document.documentElement;

  function readStoredTheme() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch (_) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      // Storage may be disabled; theme still works for the current page.
    }
  }

  function systemTheme() {
    try {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    } catch (_) {
      return 'dark';
    }
  }

  function getCurrentTheme() {
    return html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function updateButtons(theme) {
    const next = theme === 'light' ? 'dark' : 'light';
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.removeAttribute('onclick');
      btn.setAttribute('aria-label', `Switch to ${next} mode`);
      btn.setAttribute('title', `Switch to ${next} mode`);
      btn.textContent = theme === 'light' ? '☀️' : '🌙';
      if (!btn.id) btn.textContent += ' Toggle theme';
    });
  }

  function applyTheme(theme, persist) {
    const normalized = theme === 'light' ? 'light' : 'dark';
    if (normalized === 'light') {
      html.setAttribute('data-theme', 'light');
      html.style.colorScheme = 'light';
    } else {
      html.removeAttribute('data-theme');
      html.style.colorScheme = 'dark';
    }
    updateButtons(normalized);
    if (persist) writeStoredTheme(normalized);
  }

  function bindButtons() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.removeAttribute('onclick');
      if (btn.dataset.themeBound === '1') return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', event => {
        event.preventDefault();
        applyTheme(getCurrentTheme() === 'light' ? 'dark' : 'light', true);
      });
    });
  }

  applyTheme(readStoredTheme() || systemTheme(), false);
  bindButtons();

  document.addEventListener('DOMContentLoaded', () => {
    updateButtons(getCurrentTheme());
    bindButtons();
  });
})();
