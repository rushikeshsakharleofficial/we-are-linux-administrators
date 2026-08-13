/* main.js — small, dependency-free site behaviour */
(function () {
  'use strict';

  const PROJECT_VERSION = '1.18.0';
  const SKILL_COUNT = '80';

  document.querySelectorAll('[data-project-version]').forEach(el => { el.textContent = PROJECT_VERSION; });
  document.querySelectorAll('[data-skill-count]').forEach(el => { el.textContent = SKILL_COUNT; });
  document.querySelectorAll('[data-count]').forEach(el => {
    const n = Number(el.getAttribute('data-count'));
    if (Number.isFinite(n) && n >= 80) {
      el.setAttribute('data-count', SKILL_COUNT);
      if (/^\d+\+?$/.test(el.textContent.trim())) el.textContent = SKILL_COUNT + (el.dataset.suffix || '');
    }
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.parentElement || ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) continue;
    node.nodeValue = node.nodeValue
      .replace(/101 Expert Skills/g, '80 Expert Skills')
      .replace(/101 expert skills/g, '80 expert skills')
      .replace(/101 task-specific skills/g, '80 focused skills')
      .replace(/101 specialized skills/g, '80 focused skills')
      .replace(/101 linux-admin skills/g, '80 linux-admin skills')
      .replace(/Browse all 101 skills/g, 'Browse all 80 skills')
      .replace(/101 skills/g, '80 skills')
      .replace(/1\.17\.73/g, PROJECT_VERSION);
  }

  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === path) link.classList.add('active');
  });

  const burger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-card[data-cat]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => { card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none'; });
    });
  });
})();
