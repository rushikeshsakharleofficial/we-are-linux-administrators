/* main.js — Nav, mobile menu, active link, smooth scroll */

(function () {
  'use strict';

  const PROJECT_VERSION = '1.17.8';
  const SKILL_COUNT = '99';

  function setMeta(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function replaceText(root, replacements) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      let text = node.nodeValue;
      replacements.forEach(([from, to]) => {
        text = text.replace(from, to);
      });
      node.nodeValue = text;
    }
  }

  function syncProjectCopy() {
    setMeta('meta[name="description"]', 'linux-admin — Senior Linux administrator and SRE workflow as a Claude Code plugin. 99 skills covering boot, networking, storage, containers, kernel, auth, security validation, and more.');
    setMeta('meta[property="og:description"]', 'Give Claude Code a senior Linux administrator mental model. Read-only-first diagnostics, distro-aware commands, safety gates, and 99 skills.');

    document.querySelectorAll('[data-count="98"]').forEach(el => {
      el.dataset.count = SKILL_COUNT;
      if (/^98\+?$/.test(el.textContent.trim())) {
        el.textContent = SKILL_COUNT + (el.dataset.suffix || '');
      }
    });

    replaceText(document.body, [
      [/98 specialized skills/g, '99 specialized skills'],
      [/98 task-specific skills/g, '99 task-specific skills'],
      [/98 Expert Skills/g, '99 Expert Skills'],
      [/98 skills/g, '99 skills'],
      [/98 Skills/g, '99 Skills'],
      [/Total Skills/g, 'Total Skills'],
      [/Browse all 35 skills/g, 'Browse all 99 skills'],
      [/Browse all 40\+/g, 'Browse all 99'],
      [/40\+ linux-admin skills/g, '99 linux-admin skills'],
      [/46 skills/g, '99 skills'],
      [/Animated feature pages/g, 'Feature deep dives'],
      [/Each skill has a dedicated deep-dive page with interactive canvas animations and investigation walkthroughs\./g, 'Selected skills have dedicated deep-dive pages with practical investigation walkthroughs.'],
      [/Animated radar sonar — triage routing in real time/g, 'Triage routing walkthrough'],
      [/Live boot log stream — initramfs & fstab failures/g, 'Boot log review — initramfs & fstab failures'],
      [/Packet flow graph — DNS & routing diagnostics/g, 'Packet flow review — DNS & routing diagnostics'],
      [/Animated disk fill bars — inode & df\/du triage/g, 'Disk and inode triage walkthrough'],
      [/Live oscilloscope — CPU, memory, OOM analysis/g, 'CPU, memory, and OOM analysis'],
      [/Matrix rain — panic & call trace triage/g, 'Kernel panic and call trace triage'],
      [/Floating container cards — Docker & Podman debugging/g, 'Docker and Podman debugging walkthrough'],
      [/Key-lock animation — SSH & PAM forensics/g, 'SSH and PAM forensic checks'],
      [/Canvas packet filter — nftables & iptables triage/g, 'nftables and iptables triage'],
      [/Traffic lights — command classification walkthrough/g, 'Command classification walkthrough']
    ]);

    const skillsTitle = document.querySelector('.page-hero-title');
    if (skillsTitle && /Expert Skills/.test(skillsTitle.textContent)) {
      skillsTitle.textContent = `${SKILL_COUNT} Expert Skills`;
    }

    document.querySelectorAll('.stat-num').forEach(el => {
      if (el.textContent.trim() === '98') el.textContent = SKILL_COUNT;
    });
  }

  function ensureSecurityExpertCard() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    const exists = Array.from(grid.querySelectorAll('.skill-card-name'))
      .some(el => el.textContent.trim() === '/linux-admin:security-expert');
    if (exists) return;

    const card = document.createElement('div');
    card.className = 'skill-card reveal visible';
    card.setAttribute('data-cat', 'security');
    card.innerHTML = `
      <div class="skill-card-name">/linux-admin:security-expert</div>
      <div class="skill-card-desc">Defensive Linux security validation for owned servers. Uses incident-driven review, safe dummy tests, scoring, and specialist fix routing.</div>
      <div class="skill-card-when">Use when: validating server security controls without exploit chains, stealth, or disruptive testing.</div>
      <div class="skill-card-cmd">
        <span>/linux-admin:security-expert audit owned web server</span>
        <button class="copy-btn" aria-label="Copy command">copy</button>
      </div>
    `;

    const osSecurity = Array.from(grid.querySelectorAll('.skill-card-name'))
      .find(el => el.textContent.trim() === '/linux-admin:os-security-expert');
    const refCard = osSecurity ? osSecurity.closest('.skill-card') : null;
    grid.insertBefore(card, refCard || grid.firstChild);
  }

  syncProjectCopy();
  ensureSecurityExpertCard();

  // Active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  // Mobile hamburger
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

  // Scroll reveal — show elements already in viewport immediately
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
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

  // Number counter
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

  if ('IntersectionObserver' in window) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const t = parseInt(e.target.dataset.count, 10);
          if (!isNaN(t)) {
            animateCount(e.target, t, 1400);
            countObs.unobserve(e.target);
          }
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));
  }

  // Skill card filter tabs
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
