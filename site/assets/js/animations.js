/* animations.js — Terminal typewriter, hero grid, flow diagram pulse */

// ── Terminal typewriter
class TerminalTyper {
  constructor(el, lines, opts = {}) {
    this.el = el;
    this.lines = lines;
    this.loop = opts.loop !== false;
    this.cmdSpeed = opts.cmdSpeed || 34;
    this.lineDelay = opts.lineDelay || 55;
    this.loopDelay = opts.loopDelay || 3500;
    this.idx = 0;
  }
  start() {
    this.el.innerHTML = '';
    this.idx = 0;
    this._next();
    return this;
  }
  _next() {
    if (this.idx >= this.lines.length) {
      if (this.loop) setTimeout(() => this.start(), this.loopDelay);
      return;
    }
    const l = this.lines[this.idx];
    const div = document.createElement('div');
    div.className = 'tl';
    this.el.appendChild(div);

    const cls = { cmd:'tc', out:'to', dim:'td', success:'ts', warn:'tw', err:'te', cyan:'tcy' }[l.type] || 'to';

    if (l.type === 'cmd') {
      const pfx = document.createElement('span');
      pfx.className = 'tp'; pfx.textContent = '›';
      div.appendChild(pfx);
      const txt = document.createElement('span');
      txt.className = 'tc';
      div.appendChild(txt);
      const cur = document.createElement('span');
      cur.className = 'cursor';
      txt.appendChild(cur);
      this._typeChars(txt, cur, l.text, () => {
        cur.remove(); this.idx++; setTimeout(() => this._next(), 380);
      });
    } else {
      const span = document.createElement('span');
      span.className = cls;
      span.innerHTML = l.text;
      div.appendChild(span);
      this.el.scrollTop = this.el.scrollHeight;
      this.idx++;
      setTimeout(() => this._next(), l.delay || this.lineDelay);
    }
    this.el.scrollTop = this.el.scrollHeight;
  }
  _typeChars(el, cursor, text, cb) {
    let i = 0;
    const tick = () => {
      el.textContent = text.slice(0, i);
      el.appendChild(cursor);
      if (i < text.length) { i++; setTimeout(tick, this.cmdSpeed + Math.random() * this.cmdSpeed * 0.4); }
      else cb();
    };
    tick();
  }
}
window.TerminalTyper = TerminalTyper;

// ── Hero terminal typing animation
(function () {
  const body = document.getElementById('ht-body');
  if (!body) return;
  const lines = [
    { type: 'cmd',     text: '/linux-admin:network can ping 8.8.8.8 but DNS fails' },
    { type: 'cyan',    text: '[ READ-ONLY ] Collecting evidence before any changes...' },
    { type: 'out',     text: 'Checking resolv.conf → nameserver 127.0.0.53 (systemd-resolved)' },
    { type: 'out',     text: 'Testing DNS fallback → dig @8.8.8.8 google.com ... OK' },
    { type: 'out',     text: 'Checking stub listener → ss -tlnp | grep 53 → not listening' },
    { type: 'amber',   text: '✦ Root cause: systemd-resolved stub resolver not running' },
    { type: 'success', text: '✓ Fix: systemctl enable --now systemd-resolved' },
    { type: 'dim',     text: '# Class 2 — confirm before executing' },
  ];
  const clsMap = { out:'ht-out', dim:'ht-dim', success:'ht-success', cyan:'ht-cyan', amber:'ht-amber' };
  function run() {
    body.innerHTML = '';
    let i = 0;
    function next() {
      if (i >= lines.length) { setTimeout(run, 4200); return; }
      const l = lines[i];
      if (l.type === 'cmd') {
        const div = document.createElement('div');
        div.className = 'ht-line';
        const prompt = document.createElement('span');
        prompt.className = 'ht-prompt'; prompt.textContent = '›';
        const span = document.createElement('span');
        span.className = 'ht-cmd';
        const cur = document.createElement('span');
        cur.className = 'ht-cur';
        span.appendChild(cur);
        div.appendChild(prompt); div.appendChild(span);
        body.appendChild(div);
        let j = 0;
        (function tick() {
          span.textContent = l.text.slice(0, j);
          span.appendChild(cur);
          if (j < l.text.length) { j++; setTimeout(tick, 26 + Math.random() * 12); }
          else { cur.remove(); i++; setTimeout(next, 380); }
        })();
      } else {
        const span = document.createElement('span');
        span.className = clsMap[l.type] || 'ht-out';
        span.textContent = l.text;
        if (l.type === 'dim') {
          const cur = document.createElement('span');
          cur.className = 'ht-cur';
          span.appendChild(cur);
        }
        body.appendChild(span);
        i++;
        setTimeout(next, l.type === 'cyan' ? 110 : 60);
      }
      body.scrollTop = body.scrollHeight;
    }
    next();
  }
  run();
})();

// ── Floating card animation
document.querySelectorAll('.float-card').forEach((card, i) => {
  card.style.animation = `float-y ${3 + i * 0.4}s ease-in-out infinite`;
  card.style.animationDelay = `${i * 0.6}s`;
});
if (!document.querySelector('#float-style')) {
  const s = document.createElement('style');
  s.id = 'float-style';
  s.textContent = '@keyframes float-y{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}';
  document.head.appendChild(s);
}

// ── Flow diagram pulse
document.querySelectorAll('.flow-node').forEach((node, i) => {
  setTimeout(() => node.classList.add('flow-active'), i * 300);
});

// ── Glow on hover for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    card.style.setProperty('--gx', x + '%');
    card.style.setProperty('--gy', y + '%');
  });
});
