/* main.js — shared website runtime */
(function () {
  'use strict';

  const PROJECT_VERSION = '1.17.75';
  const SKILL_COUNT = '103';
  const STALE_COUNTS = new Set(['46', '95', '98', '99', '101', '102', '106', '107', '108']);

  function setMeta(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function syncProjectCopy() {
    setMeta('meta[name="description"]', `linux-admin — 103 Linux administrator/SRE skills with safe routing, incident management, and portable agent workflows.`);
    setMeta('meta[property="og:description"]', `linux-admin 1.17.75 — 103 Linux/SRE skills with read-only-first diagnostics and rollback-aware operations.`);

    document.querySelectorAll('[data-count]').forEach(el => {
      const current = String(el.dataset.count || '').replace('+', '');
      if (STALE_COUNTS.has(current)) el.dataset.count = SKILL_COUNT;
      const text = el.textContent.trim().replace('+', '');
      if (STALE_COUNTS.has(text)) el.textContent = SKILL_COUNT + (el.dataset.suffix || '');
    });

    document.querySelectorAll('.stat-num').forEach(el => {
      if (STALE_COUNTS.has(el.textContent.trim())) el.textContent = SKILL_COUNT;
    });

    const title = document.querySelector('.page-hero-title');
    if (title && /Expert Skills/.test(title.textContent)) title.textContent = `${SKILL_COUNT} Expert Skills`;
  }

  syncProjectCopy();

  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });

  const burger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    const close = () => {
      mobileNav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', close));
    document.addEventListener('click', event => {
      if (!burger.contains(event.target) && !mobileNav.contains(event.target)) close();
    });
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  function animateCount(el, target, duration = 900) {
    const startTime = performance.now();
    function frame(now) {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = target + (el.dataset.suffix || '');
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = parseInt(entry.target.dataset.count, 10);
        if (!Number.isNaN(target)) animateCount(entry.target, target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
  }

  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card[data-cat]');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.cat;
      skillCards.forEach(card => {
        card.style.display = category === 'all' || card.dataset.cat === category ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const text = button.closest('.skill-card-cmd, .code-block, pre')?.innerText.replace(/copy$/i, '').trim();
      if (!text || !navigator.clipboard) return;
      await navigator.clipboard.writeText(text);
      const old = button.textContent;
      button.textContent = 'copied';
      setTimeout(() => { button.textContent = old; }, 1200);
    });
  });
})();
