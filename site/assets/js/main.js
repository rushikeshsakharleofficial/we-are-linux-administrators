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

  // ── Human copy cleanup
  // Keep UI/UX untouched. This only corrects stale or over-promising website copy
  // using facts from the current codebase: linux-admin v1.17.3, 98 skills, and the official repo URL.
  const REAL = {
    skillCount: '98',
    version: '1.17.3',
    repo: 'https://github.com/rushikeshsakharleofficial/we-are-linux-administrators'
  };

  const copyFixes = new Map([
    ['Browse all 35 skills →', 'Browse all skills →'],
    ['Animated feature pages', 'Feature pages'],
    ['Each skill has a dedicated deep-dive page with interactive canvas animations and investigation walkthroughs.', 'Each core skill has a dedicated feature page with practical investigation workflows, examples, and visual explanations.'],
    ['Animated radar sonar — triage routing in real time', 'Triage workflow — route symptoms to the right expert skill'],
    ['Live boot log stream — initramfs & fstab failures', 'Boot troubleshooting — initramfs and fstab failure paths'],
    ['Packet flow graph — DNS & routing diagnostics', 'Network troubleshooting — DNS and routing diagnostic flow'],
    ['Animated disk fill bars — inode & df/du triage', 'Storage troubleshooting — inode, disk usage, and df/du mismatch flow'],
    ['Live oscilloscope — CPU, memory, OOM analysis', 'Performance troubleshooting — CPU, memory, load, and OOM analysis'],
    ['Matrix rain — panic & call trace triage', 'Kernel troubleshooting — panic, oops, and call trace triage'],
    ['Floating container cards — Docker & Podman debugging', 'Container troubleshooting — Docker and Podman investigation flow'],
    ['Key-lock animation — SSH & PAM forensics', 'Auth troubleshooting — SSH, PAM, sudo, and access investigation'],
    ['Canvas packet filter — nftables & iptables triage', 'Firewall troubleshooting — nftables, iptables, and rule review'],
    ['Traffic lights — command classification walkthrough', 'Safety workflow — command risk classification walkthrough'],
    ['Safety gates on destructive commands', 'Safety-aware command workflow'],
    ['PreToolUse hook classifies every command. Class 3 (rm -rf, dd, mkfs) is blocked. Class 2 requires explicit confirmation.', 'Risky commands are treated carefully: destructive actions are avoided, disruptive actions require review, and safe diagnostic commands stay fast.'],
    ['Every shell command passes through a classification gate before execution. No exceptions.', 'The plugin is written around a command risk model: observe first, review risk, then decide whether a change is safe.'],
    ['Three-class protection model', 'Three-level safety model'],
    ['Every Bash command is classified before execution. The classification determines whether it passes, halts for confirmation, or is blocked entirely.', 'Commands are discussed through a simple risk model: read-only diagnostics, disruptive changes, and destructive actions that should be avoided or reviewed manually.'],
    ['0 Blind rm -rf', 'Safety-first'],
    ['AI-powered Linux administration expertise for Claude Code. Read-only-first, evidence-based, safety-gated.', 'Linux administration workflows for Claude Code. Read-only-first, evidence-based, and written for safer changes.'],
    ['Browse all 40+ linux-admin skills organized by category: core operations, networking, storage, security, migration, DNS, containers, and more.', 'Browse 98 linux-admin skills organized by category: core operations, networking, storage, security, migration, DNS, containers, and more.'],
    ['Four ways to install the linux-admin plugin. The npx one-liner is the fastest — it detects Claude Code and runs the install automatically.', 'Four ways to install the linux-admin plugin. The npx option is the fastest path when Node.js is available.'],
    ['v1.17.2', `v${REAL.version}`],
    ['Plan complex Linux migrations with AI-orchestrated parallel agents. Risk-first strategy, rollback gates, validated cutover checklists.', 'Plan Linux migrations with a risk-first workflow: inventory, validation, cutover planning, and rollback steps before changes.'],
    ['Plan and execute Linux server migrations with AI multi-agent orchestration. CentOS to Rocky, server rebuilds, database migrations, firewall audits.', 'Plan Linux server migrations with structured runbooks for OS upgrades, rebuilds, databases, storage, DNS, and firewall review.'],
    ['multi', 'guided'],
    ['Agent orchestration', 'Workflow planning'],
    ['AI agents deep Linux administration expertise', 'Claude Code structured Linux administration guidance'],
    ['evidence-first, safety-gated, distro-aware', 'evidence-first, safety-aware, distro-aware'],
    ['production-grade SRE reasoning without the headcount cost', 'structured SRE-style guidance for small teams']
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
      value = value.replace('40+', REAL.skillCount).replace('46 skills', `${REAL.skillCount} skills`);
      value = value.replace('safety gates., 46 skills.', 'safety-aware workflows and 98 skills.');
      value = value.replace('AI multi-agent orchestration', 'structured migration planning');
      value = value.replace('enforces read-only-first, evidence-before-change, and three-class command safety gates', 'is written around read-only-first diagnostics, evidence-before-change, and a three-level command risk model');
      value = value.replace('No blind rm -rf, no guessing, no unconfirmed destructive ops.', 'Evidence first, fewer risky shortcuts, and clearer review before changes.');
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
