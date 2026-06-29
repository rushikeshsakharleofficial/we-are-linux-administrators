/* monitoring-ce.js — Nagios Core and Observium CE website updates */
(function () {
  'use strict';

  if (window.__linuxAdminMonitoringCeLoaded) return;
  window.__linuxAdminMonitoringCeLoaded = true;

  const SKILL_COUNT = '110';

  function replaceText(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while ((node = walker.nextNode())) {
      node.nodeValue = node.nodeValue
        .replace(/108 specialized skills/g, '110 specialized skills')
        .replace(/108 task-specific skills/g, '110 task-specific skills')
        .replace(/108 Expert Skills/g, '110 Expert Skills')
        .replace(/108 skills/g, '110 skills')
        .replace(/108 Skills/g, '110 Skills')
        .replace(/Browse all 108 skills/g, 'Browse all 110 skills');
    }
  }

  function updateCounts() {
    document.querySelectorAll('[data-count="98"], [data-count="99"], [data-count="106"], [data-count="107"], [data-count="108"]').forEach(el => {
      el.dataset.count = SKILL_COUNT;
      if (/^(98|99|106|107|108)\+?$/.test(el.textContent.trim())) {
        el.textContent = SKILL_COUNT + (el.dataset.suffix || '');
      }
    });
    document.querySelectorAll('[data-kpi-value="108"]').forEach(el => {
      el.dataset.kpiValue = SKILL_COUNT;
      el.textContent = SKILL_COUNT;
    });
    const title = document.querySelector('.page-hero-title');
    if (title && /Expert Skills/.test(title.textContent)) title.textContent = `${SKILL_COUNT} Expert Skills`;
    replaceText(document.body);
  }

  function addSkillCard(grid, beforeName, name, desc, when, cmd, cat) {
    const exists = Array.from(grid.querySelectorAll('.skill-card-name')).some(el => el.textContent.trim() === name);
    if (exists) return;
    const card = document.createElement('div');
    card.className = 'skill-card reveal visible';
    card.setAttribute('data-cat', cat || 'monitoring');
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

  function ensureCards() {
    const grid = document.getElementById('skills-grid');
    if (!grid) return;
    addSkillCard(
      grid,
      '/linux-admin:linux-proxy-expert',
      '/linux-admin:nagios-core-expert',
      'Nagios Core community edition specialist for hosts, services, object configs, plugins, NRPE/NCPA/passive checks, notifications, CGI auth, external commands, and safe config verification.',
      'Use when: Nagios Core checks, alerts, plugins, object files, or monitoring reloads fail.',
      '/linux-admin:nagios-core-expert service checks stuck pending after config change',
      'monitoring'
    );
    addSkillCard(
      grid,
      '/linux-admin:nagios-core-expert',
      '/linux-admin:observium-ce-expert',
      'Observium Community Edition specialist for SNMP device onboarding, poller-wrapper, discovery, RRD/rrdcached, cron, MySQL/PHP, graphs, and CE updates.',
      'Use when: Observium CE device discovery, polling, graphs, SNMP, or RRD storage fails.',
      '/linux-admin:observium-ce-expert graphs flat after adding SNMP device',
      'monitoring'
    );
  }

  function run() {
    updateCounts();
    ensureCards();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();

  setTimeout(run, 400);
  setTimeout(run, 1400);
})();
