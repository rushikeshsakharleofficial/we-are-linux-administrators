/* main.js — Nav, mobile menu, active link, smooth scroll */

(function () {
  'use strict';

  // ── Active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  // ── Mobile hamburger
  const burger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileNav.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Scroll reveal
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ── Number counter
  function animateCount(el, target, duration) {
    let start = null;
    const raf = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + (el.dataset.suffix || '');
      if (p < 1) requestAnimationFrame(raf);
      else el.textContent = target + (el.dataset.suffix || '');
    };
    requestAnimationFrame(raf);
  }
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const t = parseInt(e.target.dataset.count, 10);
        if (!isNaN(t)) { animateCount(e.target, t, 1400); countObs.unobserve(e.target); }
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

  // ── Skill card filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card[data-cat]');
  if (filterTabs.length && skillCards.length) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.cat;
        skillCards.forEach(card => {
          card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
        });
      });
    });
  }
})();
