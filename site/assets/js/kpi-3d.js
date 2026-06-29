/* kpi-3d.js — Premium 3D KPI cards for the homepage */
(function () {
  'use strict';

  if (window.__linuxAdminKpi3dLoaded) return;
  window.__linuxAdminKpi3dLoaded = true;

  function addStyles() {
    if (document.getElementById('kpi-3d-style')) return;
    const style = document.createElement('style');
    style.id = 'kpi-3d-style';
    style.textContent = `
      .kpi-3d-section{position:relative;isolation:isolate;padding:78px max(24px,5vw);overflow:hidden;background:radial-gradient(circle at 20% 10%,rgba(74,222,128,.10),transparent 34%),radial-gradient(circle at 80% 20%,rgba(34,211,238,.12),transparent 32%),linear-gradient(180deg,rgba(255,255,255,.015),transparent)}
      .kpi-3d-section:before{content:'';position:absolute;inset:18px;border:1px solid rgba(148,163,184,.10);border-radius:32px;pointer-events:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}
      .kpi-3d-orb{position:absolute;border-radius:999px;filter:blur(6px);opacity:.75;pointer-events:none;animation:kpiFloat 8s ease-in-out infinite}.kpi-3d-orb.o1{width:190px;height:190px;left:7%;top:14%;background:radial-gradient(circle,rgba(74,222,128,.16),transparent 68%)}.kpi-3d-orb.o2{width:230px;height:230px;right:9%;bottom:8%;background:radial-gradient(circle,rgba(167,139,250,.14),transparent 68%);animation-delay:1.8s}.kpi-3d-orb.o3{width:150px;height:150px;right:32%;top:6%;background:radial-gradient(circle,rgba(34,211,238,.14),transparent 70%);animation-delay:3.2s}
      @keyframes kpiFloat{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(0,-18px,0) scale(1.06)}}
      .kpi-3d-inner{max-width:1200px;margin:0 auto;position:relative;z-index:1}.kpi-3d-head{display:flex;align-items:end;justify-content:space-between;gap:22px;flex-wrap:wrap;margin-bottom:30px}.kpi-3d-kicker{font-family:var(--font-mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.16em;color:var(--accent-cyan);display:inline-flex;align-items:center;gap:8px;margin-bottom:12px}.kpi-3d-kicker:before{content:'';width:8px;height:8px;border-radius:999px;background:var(--accent-green);box-shadow:0 0 18px rgba(74,222,128,.95)}
      .kpi-3d-title{margin:0;font-size:clamp(2rem,4.6vw,4.25rem);line-height:.98;letter-spacing:-.055em;font-weight:900;color:var(--text-primary);text-shadow:0 1px 0 rgba(255,255,255,.18),0 14px 34px rgba(0,0,0,.38);transform:translateZ(40px)}
      .kpi-3d-title span{display:block;background:linear-gradient(92deg,#fff 0%,#86efac 24%,#22d3ee 55%,#a78bfa 82%,#fff 100%);background-size:180% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 18px rgba(34,211,238,.20));animation:kpiTitleShine 6s linear infinite}@keyframes kpiTitleShine{to{background-position:-180% center}}
      .kpi-3d-sub{max-width:560px;color:var(--text-body);font-size:.98rem;line-height:1.75;margin:0}.kpi-3d-actions{display:flex;gap:10px;flex-wrap:wrap}.kpi-3d-btn{position:relative;display:inline-flex;align-items:center;gap:8px;padding:12px 17px;border-radius:999px;text-decoration:none;font-weight:800;font-size:.84rem;letter-spacing:-.01em;color:#06111f;background:linear-gradient(135deg,#86efac,#22d3ee);box-shadow:0 14px 28px rgba(34,211,238,.18),0 0 0 1px rgba(255,255,255,.25) inset;transform:translateY(0) perspective(600px) rotateX(0);transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s}.kpi-3d-btn:hover{transform:translateY(-3px) perspective(600px) rotateX(7deg);box-shadow:0 22px 46px rgba(34,211,238,.26),0 0 0 1px rgba(255,255,255,.32) inset}.kpi-3d-btn.secondary{color:var(--text-primary);background:rgba(255,255,255,.065);border:1px solid rgba(148,163,184,.20);box-shadow:0 14px 28px rgba(0,0,0,.18),0 0 0 1px rgba(255,255,255,.04) inset}
      .kpi-3d-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;perspective:1200px}.kpi-3d-card{--rx:0deg;--ry:0deg;--mx:50%;--my:50%;position:relative;min-height:178px;padding:22px;border-radius:26px;background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.035));border:1px solid rgba(148,163,184,.18);box-shadow:0 24px 70px rgba(0,0,0,.36),inset 0 1px 0 rgba(255,255,255,.10);overflow:hidden;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry)) translateZ(0);transition:transform .18s ease,border-color .25s,box-shadow .25s}.kpi-3d-card:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx) var(--my),rgba(255,255,255,.22),transparent 36%);opacity:.7;pointer-events:none}.kpi-3d-card:after{content:'';position:absolute;inset:-1px;background:linear-gradient(115deg,transparent 0 28%,rgba(255,255,255,.18) 45%,transparent 62%);transform:translateX(-130%);transition:transform .7s cubic-bezier(.16,1,.3,1);pointer-events:none}.kpi-3d-card:hover{border-color:rgba(74,222,128,.36);box-shadow:0 34px 95px rgba(0,0,0,.44),0 0 42px rgba(74,222,128,.10),inset 0 1px 0 rgba(255,255,255,.16)}.kpi-3d-card:hover:after{transform:translateX(130%)}
      .kpi-3d-card-inner{position:relative;z-index:1;display:flex;height:100%;flex-direction:column;justify-content:space-between;transform:translateZ(34px)}.kpi-3d-top{display:flex;align-items:center;justify-content:space-between;gap:12px}.kpi-3d-icon{width:44px;height:44px;border-radius:16px;display:grid;place-items:center;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);box-shadow:0 12px 30px rgba(0,0,0,.24);font-size:1.2rem}.kpi-3d-chip{font-family:var(--font-mono);font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(148,163,184,.12)}.kpi-3d-value{font-size:clamp(2rem,4.2vw,3rem);line-height:1;font-weight:900;letter-spacing:-.06em;color:var(--text-primary);text-shadow:0 12px 25px rgba(0,0,0,.38);margin:26px 0 7px}.kpi-3d-value .suffix{font-size:.55em;color:var(--accent-green);letter-spacing:-.04em}.kpi-3d-label{font-size:.84rem;color:var(--text-body);font-weight:700}.kpi-3d-desc{margin-top:6px;color:var(--text-muted);font-size:.73rem;line-height:1.55}.kpi-3d-line{height:3px;border-radius:999px;margin-top:18px;background:linear-gradient(90deg,var(--accent-green),var(--accent-cyan),var(--accent-purple));box-shadow:0 0 18px rgba(34,211,238,.25);transform-origin:left;animation:kpiLine 2.8s ease-in-out infinite}@keyframes kpiLine{0%,100%{transform:scaleX(.55);opacity:.65}50%{transform:scaleX(1);opacity:1}}
      .kpi-3d-card:nth-child(2) .kpi-3d-line{animation-delay:.25s}.kpi-3d-card:nth-child(3) .kpi-3d-line{animation-delay:.5s}.kpi-3d-card:nth-child(4) .kpi-3d-line{animation-delay:.75s}.kpi-3d-card:nth-child(2){--accent-local:#22d3ee}.kpi-3d-card:nth-child(3){--accent-local:#a78bfa}.kpi-3d-card:nth-child(4){--accent-local:#fbbf24}
      [data-theme="light"] .kpi-3d-section{background:radial-gradient(circle at 18% 10%,rgba(34,197,94,.13),transparent 34%),radial-gradient(circle at 84% 18%,rgba(14,165,233,.12),transparent 32%),linear-gradient(180deg,#f8fafc,#fff)}[data-theme="light"] .kpi-3d-card{background:linear-gradient(145deg,rgba(255,255,255,.95),rgba(248,250,252,.78));box-shadow:0 24px 55px rgba(15,23,42,.12),inset 0 1px 0 rgba(255,255,255,.9);border-color:rgba(15,23,42,.10)}[data-theme="light"] .kpi-3d-title{text-shadow:0 1px 0 rgba(255,255,255,.9),0 12px 26px rgba(15,23,42,.12)}[data-theme="light"] .kpi-3d-btn.secondary{background:#fff;color:#0f172a;border-color:rgba(15,23,42,.12)}[data-theme="light"] .kpi-3d-chip,[data-theme="light"] .kpi-3d-icon{background:rgba(15,23,42,.04);border-color:rgba(15,23,42,.08)}
      @media(max-width:980px){.kpi-3d-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.kpi-3d-head{align-items:flex-start}.kpi-3d-actions{width:100%}}@media(max-width:620px){.kpi-3d-section{padding:58px 18px}.kpi-3d-grid{grid-template-columns:1fr}.kpi-3d-card{min-height:160px}.kpi-3d-title{font-size:2.25rem}}
      @media(prefers-reduced-motion:reduce){.kpi-3d-orb,.kpi-3d-title span,.kpi-3d-line{animation:none}.kpi-3d-card,.kpi-3d-btn{transition:none}}
    `;
    document.head.appendChild(style);
  }

  function makeCard(item) {
    return `
      <article class="kpi-3d-card reveal visible" data-kpi-card>
        <div class="kpi-3d-card-inner">
          <div>
            <div class="kpi-3d-top">
              <div class="kpi-3d-icon" aria-hidden="true">${item.icon}</div>
              <div class="kpi-3d-chip">${item.chip}</div>
            </div>
            <div class="kpi-3d-value"><span data-kpi-value="${item.value}">0</span><span class="suffix">${item.suffix || ''}</span></div>
            <div class="kpi-3d-label">${item.label}</div>
            <div class="kpi-3d-desc">${item.desc}</div>
          </div>
          <div class="kpi-3d-line"></div>
        </div>
      </article>`;
  }

  function animateCounters(root) {
    const counters = root.querySelectorAll('[data-kpi-value]');
    const run = el => {
      const target = Number(el.dataset.kpiValue || 0);
      const start = performance.now();
      const duration = 1300;
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * eased).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.55 });
      counters.forEach(el => obs.observe(el));
    } else {
      counters.forEach(run);
    }
  }

  function bindTilt(root) {
    root.querySelectorAll('[data-kpi-card]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const ry = (x - 0.5) * 14;
        const rx = (0.5 - y) * 14;
        card.style.setProperty('--rx', rx.toFixed(2) + 'deg');
        card.style.setProperty('--ry', ry.toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--mx', '50%');
        card.style.setProperty('--my', '50%');
      });
    });
  }

  function render() {
    const statStrip = document.querySelector('.stat-strip');
    if (!statStrip || document.getElementById('kpi-3d-section')) return;

    addStyles();

    const items = [
      { icon: '⚡', chip: 'skills', value: 108, suffix: '+', label: 'Expert Linux skills', desc: 'Routers and deep specialists for SRE, Linux admin, security, proxying, RDP, networking, and platform triage.' },
      { icon: '🛡️', chip: 'safety', value: 3, label: 'Command risk classes', desc: 'Read-only first, disruptive confirmation gates, and destructive-command hard blocks.' },
      { icon: '🔁', chip: 'watch', value: 24, suffix: 'h', label: 'Daily skill refresh loop', desc: 'Tracks distro, kernel, systemd, OpenSSH, package-manager, and networking changes.' },
      { icon: '🚀', chip: 'agent', value: 4, suffix: '+', label: 'Agent-ready platforms', desc: 'Claude Code, Codex, Gemini, Skillfish, and future Linux admin agent workflows.' }
    ];

    const section = document.createElement('section');
    section.id = 'kpi-3d-section';
    section.className = 'kpi-3d-section';
    section.setAttribute('aria-label', 'Premium KPI dashboard');
    section.innerHTML = `
      <div class="kpi-3d-orb o1" aria-hidden="true"></div>
      <div class="kpi-3d-orb o2" aria-hidden="true"></div>
      <div class="kpi-3d-orb o3" aria-hidden="true"></div>
      <div class="kpi-3d-inner">
        <div class="kpi-3d-head">
          <div>
            <div class="kpi-3d-kicker">Canva-inspired KPI layer</div>
            <h2 class="kpi-3d-title">Live Linux Admin <span>Command Center</span></h2>
          </div>
          <p class="kpi-3d-sub">Animated 3D KPI cards for the linux-admin homepage: premium glass cards, live counters, depth tilt, gradient text, and glow buttons built directly into the GitHub Pages site.</p>
          <div class="kpi-3d-actions" aria-label="KPI actions">
            <a class="kpi-3d-btn" href="skills.html">Explore skills →</a>
            <a class="kpi-3d-btn secondary" href="install.html">Install plugin</a>
          </div>
        </div>
        <div class="kpi-3d-grid">
          ${items.map(makeCard).join('')}
        </div>
      </div>`;

    statStrip.insertAdjacentElement('afterend', section);
    animateCounters(section);
    bindTilt(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
