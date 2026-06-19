(function () {
  'use strict';

  if (window.__linuxAdminReleaseNoticeLoaded) return;
  window.__linuxAdminReleaseNoticeLoaded = true;

  function ownScriptUrl() {
    var current = document.currentScript;
    if (current && current.src) return current.src;
    var scripts = document.querySelectorAll('script[src*="release-notice.js"]');
    return scripts.length ? scripts[scripts.length - 1].src : '';
  }

  function manifestUrl() {
    var src = ownScriptUrl();
    try {
      return src ? new URL('../data/latest-update.json', src).href : 'assets/data/latest-update.json';
    } catch (e) {
      return 'assets/data/latest-update.json';
    }
  }

  var url = manifestUrl();
  var typeOk = { 'plugin-release': true, 'skill-release': true };

  function getSeen(id) {
    try { return localStorage.getItem('linux-admin-release-seen-' + id); } catch (e) { return null; }
  }

  function setSeen(id) {
    try { localStorage.setItem('linux-admin-release-seen-' + id, '1'); } catch (e) { return; }
  }

  function clean(s) {
    return String(s || '').replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function activeTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function addStyles() {
    if (document.getElementById('release-notice-style')) return;
    var style = document.createElement('style');
    style.id = 'release-notice-style';
    style.textContent = '.release-notice{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(420px,calc(100% - 36px));border-radius:20px;padding:18px;box-shadow:0 20px 60px rgba(0,0,0,.22)}.release-notice h3{margin:0 0 8px;font-size:18px}.release-notice p{margin:0 0 12px;line-height:1.5}.release-notice pre{margin:8px 0;padding:10px;border-radius:12px;white-space:pre-wrap;font-size:12px;line-height:1.55}.release-notice button{border-radius:999px;padding:9px 13px;cursor:pointer;font-weight:800}.release-notice[data-ui-theme="dark"]{background:#0f172a;color:#e5eefb;border:1px solid rgba(148,163,184,.28)}.release-notice[data-ui-theme="dark"] h3{color:#f8fafc}.release-notice[data-ui-theme="dark"] p{color:#cbd5e1}.release-notice[data-ui-theme="dark"] pre{background:#020617;color:#d1fae5;border:1px solid rgba(148,163,184,.18)}.release-notice[data-ui-theme="dark"] button{background:rgba(59,130,246,.16);color:#eff6ff;border:1px solid rgba(147,197,253,.35)}.release-notice[data-ui-theme="light"]{background:#ffffff;color:#0f172a;border:1px solid rgba(15,23,42,.12);box-shadow:0 18px 45px rgba(15,23,42,.12)}.release-notice[data-ui-theme="light"] h3{color:#0f172a}.release-notice[data-ui-theme="light"] p{color:#334155}.release-notice[data-ui-theme="light"] pre{background:#f8fafc;color:#166534;border:1px solid rgba(15,23,42,.1)}.release-notice[data-ui-theme="light"] button{background:#ffffff;color:#0f172a;border:1px solid rgba(15,23,42,.16)}';
    document.head.appendChild(style);
  }

  function syncTheme(node) {
    if (node) node.setAttribute('data-ui-theme', activeTheme());
  }

  function render(data) {
    var id = data.id || data.version || 'latest';
    if (getSeen(id)) return;

    addStyles();

    var claude = data.commands && data.commands.claudeCode ? data.commands.claudeCode.join('\n') : '';
    var codex = data.commands && data.commands.codex ? data.commands.codex.join('\n') : '';
    var node = document.createElement('aside');
    node.className = 'release-notice';
    syncTheme(node);
    node.innerHTML = '<h3>' + clean(data.title || 'Plugin update available') + '</h3>' +
      '<p>' + clean(data.summary || 'Update your local plugin to get the latest skills.') + '</p>' +
      '<pre>' + clean(claude + '\n\n' + codex) + '</pre>' +
      '<button type="button">Got it</button>';

    var observer = null;
    if (window.MutationObserver) {
      observer = new MutationObserver(function () { syncTheme(node); });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    node.querySelector('button').addEventListener('click', function () {
      setSeen(id);
      if (observer) observer.disconnect();
      node.remove();
    });

    document.body.appendChild(node);
  }

  function run() {
    if (!window.fetch) return;
    fetch(url, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || data.showPopup !== true || !typeOk[data.type]) return;
        render(data);
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
