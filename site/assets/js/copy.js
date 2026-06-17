/* copy.js — Copy button for command blocks */
(function () {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.command-block, .skill-card-cmd, .terminal-body, [data-copy-parent]');
      const text = block ? block.innerText.replace(/^copy$/gm, '').trim() : '';
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
      navigator.clipboard.writeText(target.innerText.trim()).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      });
    });
  });
})();
