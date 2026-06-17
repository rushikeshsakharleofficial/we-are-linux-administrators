/* main.js — Nav, mobile menu, active link, smooth scroll */

(function () {
  'use strict';

  const REAL = {
    skillCount: '98',
    version: '1.17.3',
    repo: 'https://github.com/rushikeshsakharleofficial/we-are-linux-administrators'
  };

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

  // ── One-time cache refresh with skeleton overlay
  const CACHE_REFRESH_KEY = `linux-admin-site-refreshed:${REAL.version}:skeleton-v1`;
  const CACHE_REFRESH_PARAM = 'site_refreshed';

  function injectSkeletonStyles() {
    if (document.getElementById('site-skeleton-refresh-style')) return;
    const style = document.createElement('style');
    style.id = 'site-skeleton-refresh-style';
    style.textContent = `
      .site-skeleton-refresh {
        position: fixed;
        inset: 0;
        z-index: 9999;
        pointer-events: none;
        display: grid;
        place-items: center;
        background: rgba(3, 7, 18, 0.34);
        -webkit-backdrop-filter: blur(7px);
        backdrop-filter: blur(7px);
        opacity: 0;
        animation: skeletonFadeIn 160ms ease-out forwards;
      }
      .site-skeleton-refresh-card {
        width: min(760px, calc(100vw - 32px));
        padding: 22px;
        border-radius: 24px;
        background: rgba(15, 23, 42, 0.76);
        border: 1px solid rgba(255, 255, 255, 0.12);
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
      }
      .site-skeleton-line,
      .site-skeleton-pill,
      .site-skeleton-block {
        position: relative;
        overflow: hidden;
        background: rgba(255,255,255,0.09);
      }
      .site-skeleton-line::after,
      .site-skeleton-pill::after,
      .site-skeleton-block::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
        animation: skeletonShimmer 1.05s infinite;
      }
      .site-skeleton-pill { width: 116px; height: 20px; border-radius: 999px; margin-bottom: 18px; }
      .site-skeleton-line { height: 16px; border-radius: 999px; margin-bottom: 12px; }
      .site-skeleton-line.wide { width: 72%; height: 28px; }
      .site-skeleton-line.mid { width: 58%; }
      .site-skeleton-line.short { width: 38%; }
      .site-skeleton-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; margin-top: 22px; }
      .site-skeleton-block { height: 96px; border-radius: 18px; }
      @media (max-width: 680px) { .site-skeleton-grid { grid-template-columns: 1fr; } }
      @keyframes skeletonFadeIn { to { opacity: 1; } }
      @keyframes skeletonShimmer { to { transform: translateX(100%); } }
    `;
    document.head.appendChild(style);
  }

  function showRefreshSkeleton() {
    if (document.getElementById('site-skeleton-refresh')) return;
    injectSkeletonStyles();
    const overlay = document.createElement('div');
    overlay.id = 'site-skeleton-refresh';
    overlay.className = 'site-skeleton-refresh';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = `
      <div class="site-skeleton-refresh-card">
        <div class="site-skeleton-pill"></div>
        <div class="site-skeleton-line wide"></div>
        <div class="site-skeleton-line mid"></div>
        <div class="site-skeleton-line short"></div>
        <div class="site-skeleton-grid">
          <div class="site-skeleton-block"></div>
          <div class="site-skeleton-block"></div>
          <div class="site-skeleton-block"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function refreshOnceForFreshAssets() {
    const url = new URL(window.location.href);
    const returnedFromRefresh = url.searchParams.get(CACHE_REFRESH_PARAM) === '1';

    if (returnedFromRefresh) {
      url.searchParams.delete(CACHE_REFRESH_PARAM);
      url.searchParams.delete('_v');
      window.history.replaceState({}, document.title, url.toString());
      try { window.localStorage.setItem(CACHE_REFRESH_KEY, 'done'); } catch (_) {}
      return;
    }

    try {
      if (window.localStorage.getItem(CACHE_REFRESH_KEY) === 'done') return;
      window.localStorage.setItem(CACHE_REFRESH_KEY, 'done');
    } catch (_) {}

    showRefreshSkeleton();
    window.setTimeout(() => {
      const freshUrl = new URL(window.location.href);
      freshUrl.searchParams.set(CACHE_REFRESH_PARAM, '1');
      freshUrl.searchParams.set('_v', REAL.version);
      window.location.replace(freshUrl.toString());
    }, 180);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshOnceForFreshAssets, { once: true });
  } else {
    refreshOnceForFreshAssets();
  }

  // ── Safe neutral copy cleanup
  const copyFixes = new Map([
    ['Browse all 35 skills →', 'Browse all skills →'],
    ['Animated feature pages', 'Feature pages'],
    ['interactive canvas animations', 'visual explanations'],
    ['Live boot log stream', 'Boot troubleshooting'],
    ['Live oscilloscope', 'Performance troubleshooting'],
    ['Canvas packet filter', 'Firewall troubleshooting'],
    ['40+', REAL.skillCount],
    ['46 skills', `${REAL.skillCount} skills`],
    ['35 skills', 'all skills'],
    ['v1.17.2', `v${REAL.version}`]
  ]);

  function replaceTextNode(node) {
    let value = node.nodeValue;
    let changed = false;
    copyFixes.forEach((replacement, source) => {
      if (value.includes(source)) {
        value = value.split(source).join(replacement);
        changed = true;
      }
    });
    if (changed) node.nodeValue = value;
  }

  function cleanCopy(root = document.body) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);

    document.querySelectorAll('meta[name="description"], meta[property="og:description"]').forEach(meta => {
      let value = meta.getAttribute('content') || '';
      value = value.replace('40+', REAL.skillCount).replace('46 skills', `${REAL.skillCount} skills`).replace('v1.17.2', `v${REAL.version}`);
      meta.setAttribute('content', value);
    });

    document.querySelectorAll('a[href*="rushikesh-sakharle"], a[href*="we-are-linux-administrators/linux-admin"]').forEach(link => {
      link.setAttribute('href', REAL.repo);
    });
  }

  cleanCopy();

  // ── Scroll reveal — show elements already in viewport immediately
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 80 && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        obs.observe(el);
      }
    });
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
