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
    style.textContent = '.release-notice{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(420px,calc(100% - 36px));border:1px solid rgba(148,163,184,.28);border-radius:20px;background:rgba(15,23,42,.97);color:#e5eefb;box-shadow:0 20px 60px rgba(0,0,0,.35);padding:18px}.release-notice h3{margin:0 0 8px;font-size:18px}.release-notice p{margin:0 0 12px;color:#cbd5e1;line-height:1.5}.release-notice pre{margin:8px 0;padding:10px;border-radius:12px;background:rgba(2,6,23,.55);white-space:pre-wrap;font-size:12px;color:#d1fae5}.release-notice button{border:1px solid rgba(147,197,253,.35);border-radius:999px;background:rgba(59,130,246,.16);color:#eff6ff;padding:9px 13px;cursor:pointer;font-weight:800}';
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
