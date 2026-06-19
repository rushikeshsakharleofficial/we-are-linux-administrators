/* main.js — Nav, mobile menu, active link, smooth scroll */

(function () {
  'use strict';

  const PROJECT_VERSION = '1.17.18';
  const SKILL_COUNT = '106';

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
    setMeta('meta[name="description"]', 'linux-admin — Senior Linux administrator and SRE workflow as a Claude Code plugin. 106 skills covering boot, networking, storage, load balancing, security validation, and more.');
    setMeta('meta[property="og:description"]', 'Give Claude Code a senior Linux administrator mental model. Read-only-first diagnostics, safety gates, and 106 skills.');

    document.querySelectorAll('[data-count="98"], [data-count="99"]').forEach(el => {
      el.dataset.count = SKILL_COUNT;
      if (/^(98|99)\+?$/.test(el.textContent.trim())) {
        el.textContent = SKILL_COUNT + (el.dataset.suffix || '');
      }
    });

    replaceText(document.body, [
      [/98 specialized skills/g, '106 specialized skills'],
      [/99 specialized skills/g, '106 specialized skills'],
      [/98 task-specific skills/g, '106 task-specific skills'],
      [/99 task-specific skills/g, '106 task-specific skills'],
      [/98 Expert Skills/g, '106 Expert Skills'],
      [/99 Expert Skills/g, '106 Expert Skills'],
      [/98 skills/g, '106 skills'],
      [/99 skills/g, '106 skills'],
      [/98 Skills/g, '106 Skills'],
      [/99 Skills/g, '106 Skills'],
      [/Browse all 35 skills/g, 'Browse all 106 skills'],
      [/Browse all 99 skills/g, 'Browse all 106 skills'],
      [/Browse all 40\+/g, 'Browse all 106'],
      [/40\+ linux-admin skills/g, '106 linux-admin skills'],
      [/46 skills/g, '106 skills'],
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
      if (['98', '99'].includes(el.textContent.trim())) el.textContent = SKILL_COUNT;
    });
  }

  function addSkillCard(grid, beforeName, name, desc, when, cmd, cat) {
    const exists = Array.from(grid.querySelectorAll('.skill-card-name')).some(el => el.textContent.trim() === name);
    if (exists) return;

    const card = document.createElement('div');
    card.className = 'skill-card reveal visible';
    card.setAttribute('data-cat', cat || 'network');
    card.innerHTML = `
      <div class="skill-card-name">${name}</div>
      <div class="skill-card-desc">${desc}</div>
      <div class="skill-card-when">${when}</div>
      <div class="skill-card-cmd">
        <span>${cmd}</span>
        <button class="copy-btn" aria-label="Copy command">copy</button>
      </div>
    `;

    const ref = Array.from(grid.querySelectorAll('.skill-card-name')).find(el => el.textContent.trim() === beforeName);
    grid.insertBefore(card, ref ? ref.closest('.skill-card') : grid.firstChild);
  }

  function ensureDynamicSkillCards() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;

    addSkillCard(
      grid,
      '/linux-admin:networking-expert',
      '/linux-admin:load-balancer-expert',
      'Router and recommender for HAProxy, NGINX proxy, F5, LVS/IPVS, keepalived, DNS/GSLB, and cloud load balancers.',
      'Use when: choosing, designing, auditing, or troubleshooting any load-balancing layer.',
      '/linux-admin:load-balancer-expert recommend best LB for HTTP and SMTP traffic',
      'network'
    );

    addSkillCard(
      grid,
      '/linux-admin:load-balancer-expert',
      '/linux-admin:nginx-proxy-expert',
      'NGINX reverse proxy and load balancing specialist for upstreams, TLS/SNI, 502/503/504, headers, WebSocket, and gRPC.',
      'Use when: NGINX is proxying traffic to backend applications.',
      '/linux-admin:nginx-proxy-expert debug 502 from upstream app',
      'webservers'
    );

    addSkillCard(
      grid,
      '/linux-admin:load-balancer-expert',
      '/linux-admin:f5-expert',
      'F5 BIG-IP style specialist for virtual servers, pools, monitors, profiles, SNAT, persistence, and HA failover.',
      'Use when: F5 LTM/GSLB objects or appliance HA are involved.',
      '/linux-admin:f5-expert pool members down after monitor change',
      'network'
    );

    addSkillCard(
      grid,
      '/linux-admin:load-balancer-expert',
      '/linux-admin:lvs-ipvs-expert',
      'Linux LVS/IPVS specialist for ipvsadm, ldirectord, NAT/DR/TUN modes, schedulers, persistence, and ARP/DSR behavior.',
      'Use when: kernel Layer 4 Linux load balancing is involved.',
      '/linux-admin:lvs-ipvs-expert VIP reachable but real servers timeout',
      'network'
    );

    addSkillCard(
      grid,
      '/linux-admin:load-balancer-expert',
      '/linux-admin:keepalived-expert',
      'keepalived VRRP specialist for VIP ownership, failover, health scripts, split-brain, and IPVS integration.',
      'Use when: VIP failover or VRRP behavior is wrong.',
      '/linux-admin:keepalived-expert VIP active on both nodes',
      'network'
    );

    addSkillCard(
      grid,
      '/linux-admin:load-balancer-expert',
      '/linux-admin:dns-gslb-expert',
      'DNS/GSLB specialist for weighted, geo, latency, failover, TTL, resolver-cache, and multi-region routing.',
      'Use when: DNS answers decide which region or VIP receives traffic.',
      '/linux-admin:dns-gslb-expert users routed to wrong region',
      'dns'
    );

    addSkillCard(
      grid,
      '/linux-admin:load-balancer-expert',
      '/linux-admin:cloud-lb-expert',
      'AWS/Azure/GCP managed load balancer specialist for listeners, target health, TLS, source IP, security rules, and logs.',
      'Use when: managed cloud load balancer health or routing is failing.',
      '/linux-admin:cloud-lb-expert AWS ALB targets unhealthy',
      'network'
    );

    addSkillCard(
      grid,
      '/linux-admin:os-security-expert',
      '/linux-admin:security-expert',
      'Defensive Linux security validation for owned servers. Uses incident-driven review, safe dummy tests, scoring, and specialist fix routing.',
      'Use when: validating server security controls without exploit chains, stealth, or disruptive testing.',
      '/linux-admin:security-expert audit owned web server',
      'security'
    );
  }

  syncProjectCopy();
  ensureDynamicSkillCards();

  // Active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link[data-page]').forEach(a => {
    if (a.dataset.page === path) a.classList.add('active');
  });

  // Mobile navbar toggle
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('.nav-link').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
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
