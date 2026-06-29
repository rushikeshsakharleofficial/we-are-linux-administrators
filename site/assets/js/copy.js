/* copy.js — Copy button for command blocks */
function cleanCopyText(raw) {
  return raw
    .replace(/^copy$/gm, '')
    .split('\n')
    .filter(l => !/^\s*#/.test(l.trim()))   // strip comment lines
    .map(l => l.replace(/^\s*\$\s+/, '').replace(/^\s*\$\s*$/, ''))  // strip $ prompt
    .filter(l => l.trim())
    .join('\n')
    .trim();
}

(function () {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.command-block, .skill-card-cmd, .terminal-body, [data-copy-parent]');
      const text = block ? cleanCopyText(block.innerText) : '';
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2000);
      }).catch(() => {
        btn.textContent = 'err';
        setTimeout(() => { btn.textContent = 'copy'; }, 1500);
      });
    });
  });

  // Direct-target copy (data-copy="#id")
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.copy);
      if (!target) return;
      navigator.clipboard.writeText(cleanCopyText(target.innerText)).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      });
    });
  });

  function loadSiteScript(attr, scriptPath) {
    if (document.querySelector('script[' + attr + '="1"]')) return;
    const script = document.createElement('script');
    const currentScript = document.currentScript;
    script.setAttribute(attr, '1');
    script.src = currentScript && currentScript.src
      ? new URL(scriptPath, currentScript.src).href
      : 'assets/js/' + scriptPath;
    script.defer = true;
    document.body.appendChild(script);
  }

  // Homepage premium KPI cards.
  loadSiteScript('data-kpi-3d-loader', 'kpi-3d.js?v=20260628-kpi-3d');

  // Monitoring CE, optimization, and universal contract website count/card updates.
  loadSiteScript('data-monitoring-ce-loader', 'monitoring-ce.js?v=20260629-universal-contract-112');

  // Release notice loader: plugin/skill updates only, never website-only changes.
  loadSiteScript('data-release-notice-loader', 'release-notice.js?v=20260618-path-safe');
})();
