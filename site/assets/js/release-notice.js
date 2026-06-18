(function () {
  'use strict';

  var url = 'assets/data/latest-update.json';
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

  function addStyles() {
    if (document.getElementById('release-notice-style')) return;
    var style = document.createElement('style');
    style.id = 'release-notice-style';
    style.textContent = '.release-notice{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(420px,calc(100% - 36px));border:1px solid var(--border-medium);border-radius:20px;background:var(--bg-elevated);color:var(--text-primary);box-shadow:var(--shadow-card);padding:18px}.release-notice h3{margin:0 0 8px;font-size:18px;color:var(--text-primary)}.release-notice p{margin:0 0 12px;color:var(--text-body);line-height:1.5}.release-notice pre{margin:8px 0;padding:10px;border-radius:12px;border:1px solid var(--border-soft);background:var(--bg-secondary);white-space:pre-wrap;font-size:12px;color:var(--accent-green);line-height:1.55}.release-notice button{border:1px solid var(--border-medium);border-radius:999px;background:var(--bg-glass-hover);color:var(--text-primary);padding:9px 13px;cursor:pointer;font-weight:800}.release-notice button:hover{border-color:var(--accent-cyan);color:var(--accent-cyan)}[data-theme="light"] .release-notice{background:#ffffff;color:#0f172a;border-color:rgba(15,23,42,.12);box-shadow:0 18px 45px rgba(15,23,42,.12)}[data-theme="light"] .release-notice h3{color:#0f172a}[data-theme="light"] .release-notice p{color:#334155}[data-theme="light"] .release-notice pre{background:#f8fafc;color:#166534;border-color:rgba(15,23,42,.1)}[data-theme="light"] .release-notice button{background:#ffffff;color:#0f172a;border-color:rgba(15,23,42,.16)}[data-theme="light"] .release-notice button:hover{color:#0891b2;border-color:#0891b2}';
    document.head.appendChild(style);
  }

  function render(data) {
    var id = data.id || data.version || 'latest';
    if (getSeen(id)) return;

    addStyles();

    var claude = data.commands && data.commands.claudeCode ? data.commands.claudeCode.join('\n') : '';
    var codex = data.commands && data.commands.codex ? data.commands.codex.join('\n') : '';
    var node = document.createElement('aside');
    node.className = 'release-notice';
    node.innerHTML = '<h3>' + clean(data.title || 'Plugin update available') + '</h3>' +
      '<p>' + clean(data.summary || 'Update your local plugin to get the latest skills.') + '</p>' +
      '<pre>' + clean(claude + '\n\n' + codex) + '</pre>' +
      '<button type="button">Got it</button>';

    node.querySelector('button').addEventListener('click', function () {
      setSeen(id);
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
