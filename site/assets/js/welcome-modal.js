/* Welcome / Feature Announcement Modal — Vanilla JS */

(function () {
  'use strict';

  const MODAL_KEY = 'la-welcome-dismissed-v1';

  function createModal() {
    const overlay = document.createElement('div');
    overlay.id = 'welcome-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'welcome-title');

    overlay.innerHTML = `
      <div class="wm-content" id="welcome-modal">
        <button class="wm-close" id="wm-close" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="wm-body">
          <div class="wm-header">
            <h2 class="wm-title" id="welcome-title">
              <span aria-hidden="true">🤘</span>
              What's new in linux-admin v1.17.18
            </h2>
            <p class="wm-desc">New expert skills, Terminal Portfolio, and image card redesign.</p>
          </div>

          <div class="wm-sections">
            <div class="wm-section">
              <h3 class="wm-section-title">New skills added</h3>
              <p class="wm-section-body">
                <strong class="wm-tag">/linux-admin:security-expert</strong> — Defensive security validation for owned servers. Safe dummy tests, scoring, and fix routing.
                <br><br>
                <strong class="wm-tag">/linux-admin:load-balancer-expert</strong> — HAProxy, NGINX proxy, F5, LVS/IPVS, keepalived, DNS/GSLB, and cloud LBs.
              </p>
            </div>
            <div class="wm-section">
              <h3 class="wm-section-title flex-row">
                Terminal Portfolio
                <span class="wm-badge">New</span>
              </h3>
              <p class="wm-section-body">
                Interactive terminal with real Linux diagnostic scenarios — DNS failure, OOM, boot failures, disk full, and more. Type <code class="wm-code">dns-fail</code> to try it.
              </p>
            </div>
          </div>
        </div>

        <div class="wm-footer">
          <div class="wm-help">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="wm-help-icon"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <div>
              <p class="wm-help-title">Need help or have a question?</p>
              <p class="wm-help-desc">Open an issue on GitHub or check the full documentation.</p>
              <a href="https://github.com/rushikeshsakharleofficial/we-are-linux-administrators" target="_blank" rel="noopener" class="wm-help-link">
                GitHub repository
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
            </div>
          </div>

          <div class="wm-actions">
            <label class="wm-check-label">
              <input type="checkbox" id="wm-dont-show" class="wm-checkbox">
              <span>Don't show again</span>
            </label>
            <div class="wm-spacer"></div>
            <a href="terminal.html" class="wm-cta" id="wm-cta">
              Try Terminal
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 17 17 7"></polyline><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Close handlers
    function close() {
      if (document.getElementById('wm-dont-show')?.checked) {
        localStorage.setItem(MODAL_KEY, '1');
      }
      overlay.classList.add('wm-out');
      setTimeout(() => overlay.remove(), 250);
    }

    document.getElementById('wm-close').addEventListener('click', close);
    document.getElementById('wm-cta').addEventListener('click', () => {
      if (document.getElementById('wm-dont-show')?.checked) {
        localStorage.setItem(MODAL_KEY, '1');
      }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('wm-in'));
  }

  function init() {
    if (localStorage.getItem(MODAL_KEY)) return;
    // Small delay so page paints first
    setTimeout(createModal, 800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
