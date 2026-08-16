/* main.js — shared website runtime */
(function () {
  'use strict';

  const PROJECT_VERSION = '1.18.16';
  const SKILL_COUNT = '70';
  const REPO = 'rushikeshsakharleofficial/we-are-linux-administrators';
  const STALE_COUNTS = new Set(['46', '72', '73', '74', '75', '76', '77', '78', '80', '82', '83', '85', '89', '91', '95', '98', '99', '101', '102', '103', '106', '107', '108']);
  const REMOVED_SKILLS = new Set([
    'change-plan-expert', 'incident-timeline-expert', 'maintenance-window-expert',
    'post-change-validation-expert', 'preflight-check-expert', 'production-safety-expert',
    'risk-assessment-expert', 'rollback-expert',
    'tcp-expert', 'udp-expert', 'tcpdump-expert', 'vlan-bonding-expert',
    'chrony-expert', 'date-timectl-expert',
    'disk-mounting-expert', 'filesystem-expert', 'smart-disk-expert', 'quota-expert', 'lvm-expert', 'raid-expert', 'iscsi-expert', 'nfs-expert', 'samba-expert',
    'cpu-expert', 'memory-expert', 'swap-expert', 'capacity-planning-expert',
    'file-permissions-expert', 'acl-permissions-expert',
    'user-permissions-expert', 'pam-expert', 'sssd-ldap-expert', 'sudoers-expert',
    'rsyslog-expert', 'logrotate-expert', 'root-cause-expert',
    'bash-script-expert', 'runbook-expert', 'auditd-expert', 'fail2ban-expert',
    'os-security-expert', 'patching-expert'
  ]);

  function setMeta(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute('content', value);
  }

  function replaceText(text) {
    return text
      .replace(/\b(?:46|72|73|74|75|76|77|78|80|82|83|85|89|91|95|98|99|101|102|103|106|107|108)\s+(?=skills\b)/gi, `${SKILL_COUNT} `)
      .replace(/\b(?:46|72|73|74|75|76|77|78|80|82|83|85|89|91|95|98|99|101|102|103|106|107|108)\s+(?=Expert Skills|Focused Skills\b)/gi, `${SKILL_COUNT} `)
      .replace(/\bBrowse all (?:35|40\+|46|72|73|74|75|76|77|78|80|82|83|85|89|91|95|98|99|101|102|103|106|107|108)(?=\s+skills?\b)/gi, `Browse all ${SKILL_COUNT}`)
      .replace(/npm install -g linux-admin/g, `npm install -g github:${REPO}`)
      .replace(/npm registry/gi, 'GitHub source');
  }

  document.querySelectorAll('.skill-card-name').forEach(nameEl => {
    const match = nameEl.textContent.trim().match(/^\/linux-admin:([a-z0-9-]+)$/i);
    if (match && REMOVED_SKILLS.has(match[1])) nameEl.closest('.skill-card')?.remove();
  });

  const grid = document.getElementById('skills-grid');
  if (grid) {
    const exists = Array.from(grid.querySelectorAll('.skill-card-name'))
      .some(el => el.textContent.trim() === '/linux-admin:incident-report-creator-expert');
    if (!exists) {
      const card = document.createElement('div');
      card.className = 'skill-card reveal visible';
      card.dataset.cat = 'ops-workflow';
      card.innerHTML = `
        <div class="skill-card-name">/linux-admin:incident-report-creator-expert</div>
        <div class="skill-card-desc">Table-first incident management reports from one verified dataset, exported consistently to Word, Excel, PDF, PowerPoint, or all four.</div>
        <div class="skill-card-when">Use when: incident facts are verified and a PIR, RCA, management report, action tracker, or presentation pack is required.</div>
        <div class="skill-card-cmd"><span>/linux-admin:incident-report-creator-expert create PIR in docx xlsx pdf and pptx</span><button class="copy-btn" aria-label="Copy command">copy</button></div>`;
      grid.prepend(card);
    }
  }

  setMeta('meta[name="description"]', `linux-admin — ${SKILL_COUNT} focused Linux administrator/SRE skills with parent-domain routing, condition-specific chunks, incident management, and portable agent workflows.`);
  setMeta('meta[property="og:description"]', `linux-admin ${PROJECT_VERSION} — ${SKILL_COUNT} focused Linux/SRE skills with condition-based chunk routing and rollback-aware operations.`);
  if (/skills\.html$/i.test(location.pathname)) {
    document.title = `linux-admin — Skills | ${SKILL_COUNT} Focused Linux & SRE Skills`;
    setMeta('meta[property="og:title"]', `linux-admin — Skills | ${SKILL_COUNT} Focused Linux & SRE Skills`);
  }

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
  if (title && /Expert Skills|Focused Skills/.test(title.textContent)) title.textContent = `${SKILL_COUNT} Focused Skills`;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
    const next = replaceText(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  document.querySelectorAll('a[href*="/releases/tag/"]').forEach(link => {
    if (/v1\.17\.18|v1\.17\.75|v1\.18\.[0-9]+/.test(link.textContent + link.href)) {
      link.href = `https://github.com/${REPO}/releases/latest`;
      link.textContent = 'latest published release';
    }
  });
  document.querySelectorAll('a[href="https://www.npmjs.com/package/linux-admin"]').forEach(link => {
    link.href = `https://github.com/${REPO}`;
    link.textContent = 'GitHub source';
  });

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
      const container = button.closest('.skill-card-cmd, .code-block, .terminal-body, pre');
      if (!container || !navigator.clipboard) return;
      const text = container.innerText.replace(/copy$/i, '').trim();
      if (!text) return;
      await navigator.clipboard.writeText(text);
      const old = button.textContent;
      button.textContent = 'copied';
      setTimeout(() => { button.textContent = old; }, 1200);
    });
  });
})();
