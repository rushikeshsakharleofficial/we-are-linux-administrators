/* components.js — hero spotlight, btn-glow mouse, live skill search */

(function () {
  'use strict';

  /* ── HERO SPOTLIGHT — cursor radial glow ── */
  function initHeroSpotlight() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--spot-x', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      hero.style.setProperty('--spot-y', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    });
    hero.addEventListener('mouseleave', () => {
      hero.style.setProperty('--spot-x', '-200%');
      hero.style.setProperty('--spot-y', '-200%');
    });
  }

  /* ── BTN-GLOW — mouse-tracking inner shine ── */
  function initBtnGlow() {
    document.querySelectorAll('.btn-glow').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        btn.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    });
  }

  /* ── LIVE SKILL SEARCH ── */
  function initSkillSearch() {
    const input = document.getElementById('skill-search-input');
    if (!input) return;
    const cards = Array.from(document.querySelectorAll('.skill-card[data-cat]'));
    const tabs = document.querySelectorAll('.filter-tab');

    let activeTab = 'all';

    // Intercept tab clicks to track current category
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        activeTab = tab.dataset.cat || 'all';
        filterCards();
      });
    });

    function filterCards() {
      const q = input.value.trim().toLowerCase();
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matchSearch = !q || text.includes(q);
        const matchTab = activeTab === 'all' || card.dataset.cat === activeTab;
        card.style.display = (matchSearch && matchTab) ? '' : 'none';
      });
    }

    input.addEventListener('input', filterCards);
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { input.value = ''; filterCards(); input.blur(); }
    });
  }

  /* ── INIT ── */
  function init() {
    initHeroSpotlight();
    initBtnGlow();
    initSkillSearch();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
