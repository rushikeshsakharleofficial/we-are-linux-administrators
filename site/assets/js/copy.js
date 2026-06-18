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

  // Release notice loader: plugin/skill updates only, never website-only changes.
  const releaseNotice = document.createElement('script');
  releaseNotice.src = 'assets/js/release-notice.js?v=20260618-theme-sync';
  releaseNotice.defer = true;
  document.body.appendChild(releaseNotice);
})();
