/* ── SHARED ANIMATION UTILITIES ── */

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// 3D tilt on cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-2px) rotateY(${x*8}deg) rotateX(${-y*8}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// Copy snippet buttons
document.querySelectorAll('.copy-snip').forEach(btn => {
  btn.addEventListener('click', () => {
    const snip = btn.closest('.snippet');
    const text = snip ? snip.innerText.replace('copy','').trim() : '';
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'copied!';
      setTimeout(() => { btn.textContent = 'copy'; }, 2000);
    });
  });
});

// Number counter animation
function animateCount(el, target, duration = 1400) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = parseInt(e.target.dataset.count, 10);
      if (!isNaN(target)) { animateCount(e.target, target); counterObs.unobserve(e.target); }
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// Text scramble effect
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#|ABCDEFabcdef0123456789';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(res => { this.resolve = res; });
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 18);
      const end = start + Math.floor(Math.random() * 18);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '', complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--text-muted)">${char}</span>`;
      } else { output += from; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) this.resolve();
    else { this.frameRequest = requestAnimationFrame(this.update); this.frame++; }
  }
}

// Activate scramble on page title if present
const titleEl = document.querySelector('[data-scramble]');
if (titleEl) {
  const finalText = titleEl.dataset.scramble;
  const scrambler = new TextScramble(titleEl);
  setTimeout(() => scrambler.setText(finalText), 600);
}

// Typewriter terminal
class Terminal {
  constructor(el, lines, loop = true) {
    this.el = el;
    this.lines = lines;
    this.loop = loop;
    this.lineIdx = 0;
    this.running = false;
  }
  start() {
    if (this.running) return;
    this.running = true;
    this.el.innerHTML = '';
    this._nextLine();
  }
  _nextLine() {
    if (this.lineIdx >= this.lines.length) {
      if (this.loop) {
        setTimeout(() => {
          this.lineIdx = 0;
          this.el.innerHTML = '';
          this._nextLine();
        }, 3200);
      }
      return;
    }
    const l = this.lines[this.lineIdx];
    const div = document.createElement('div');
    div.className = 'tl';
    div.innerHTML = this._buildHTML(l);
    const cur = this.el.querySelector('.cursor');
    if (cur) cur.remove();
    this.el.appendChild(div);
    const span = div.querySelector('[data-type]');
    if (span && l.type === 'cmd') {
      this._typeChars(span, l.text, () => {
        this.lineIdx++;
        setTimeout(() => this._nextLine(), 360);
      });
    } else {
      this.lineIdx++;
      setTimeout(() => this._nextLine(), l.delay || 40);
    }
    this.el.scrollTop = this.el.scrollHeight;
  }
  _buildHTML(l) {
    if (l.type === 'cmd') return `<span class="tp">›</span><span class="tc" data-type>${''}<span class="cursor"></span></span>`;
    const cls = { out:'to', dim:'td', success:'ts', warn:'tw', err:'te', cyan:'tcy' }[l.type] || 'to';
    return `<span class="${cls}">${l.text}</span>`;
  }
  _typeChars(span, text, cb) {
    let i = 0;
    const speed = 32;
    const tick = () => {
      if (i <= text.length) {
        span.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
        i++;
        setTimeout(tick, speed + Math.random() * speed * 0.5);
      } else {
        span.querySelector('.cursor')?.remove();
        cb();
      }
    };
    tick();
  }
}

// Particle canvas (lightweight)
class Particles {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = opts.color || '#4ade80';
    this.count = opts.count || 55;
    this.speed = opts.speed || 0.3;
    this.size = opts.size || 1.5;
    this.connected = opts.connected !== false;
    this.maxDist = opts.maxDist || 100;
    this.particles = [];
    this._resize();
    this._init();
    window.addEventListener('resize', () => this._resize());
    this._loop();
  }
  _resize() {
    const r = this.canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: 400 };
    this.canvas.width = r.width;
    this.canvas.height = Math.max(r.height, 400);
    this.W = this.canvas.width;
    this.H = this.canvas.height;
  }
  _init() {
    this.particles = Array.from({ length: this.count }, () => ({
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      vx: (Math.random() - 0.5) * this.speed,
      vy: (Math.random() - 0.5) * this.speed,
      r: Math.random() * this.size + 0.5,
    }));
  }
  _loop() {
    const { ctx, W, H, particles, color, connected, maxDist } = this;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color + '88';
      ctx.fill();
    });
    if (connected) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = color + Math.floor((1 - d/maxDist) * 40).toString(16).padStart(2,'0');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(() => this._loop());
  }
}

// Radar/sonar animation
class Radar {
  constructor(canvas, color = '#4ade80') {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this.angle = 0;
    this.blips = [];
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._genBlips();
    this._loop();
  }
  _resize() {
    const r = this.canvas.parentElement?.getBoundingClientRect() || {};
    this.W = this.canvas.width = r.width || 400;
    this.H = this.canvas.height = r.height || 400;
    this.cx = this.W / 2;
    this.cy = this.H / 2;
    this.R = Math.min(this.W, this.H) * 0.38;
  }
  _genBlips() {
    this.blips = Array.from({ length: 8 }, () => {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * this.R * 0.85 + this.R * 0.1;
      return { a, r, age: Math.random() * 80, size: Math.random() * 3 + 1.5 };
    });
  }
  _loop() {
    const { ctx, W, H, cx, cy, R, color, blips } = this;
    ctx.clearRect(0, 0, W, H);
    // Rings
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, R * i/4, 0, Math.PI*2);
      ctx.strokeStyle = color + '18'; ctx.lineWidth = 1; ctx.stroke();
    }
    // Cross
    ctx.strokeStyle = color + '18'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke();
    // Sweep gradient
    const grad = ctx.createConicalGradient ? null : null;
    for (let sweep = 0; sweep < 80; sweep++) {
      const a = this.angle - sweep * 0.04;
      const alpha = Math.max(0, (80 - sweep) / 80 * 0.3);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, R, a, a + 0.04);
      ctx.closePath();
      ctx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2,'0');
      ctx.fill();
    }
    // Blips
    blips.forEach(b => {
      const da = Math.abs(((b.a - this.angle) % (Math.PI*2) + Math.PI*2) % (Math.PI*2));
      if (da < 0.3 || b.age < 60) b.age = 0;
      b.age++;
      const fade = Math.max(0, 1 - b.age / 80);
      if (fade > 0) {
        const bx = cx + Math.cos(b.a) * b.r;
        const by = cy + Math.sin(b.a) * b.r;
        ctx.beginPath(); ctx.arc(bx, by, b.size, 0, Math.PI*2);
        ctx.fillStyle = color + Math.floor(fade * 200).toString(16).padStart(2,'0');
        ctx.fill();
        ctx.beginPath(); ctx.arc(bx, by, b.size * 2.5, 0, Math.PI*2);
        ctx.strokeStyle = color + Math.floor(fade * 100).toString(16).padStart(2,'0');
        ctx.lineWidth = 1; ctx.stroke();
      }
    });
    // Needle
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(this.angle) * R, cy + Math.sin(this.angle) * R);
    ctx.strokeStyle = color + 'cc'; ctx.lineWidth = 1.5; ctx.stroke();
    this.angle += 0.025;
    requestAnimationFrame(() => this._loop());
  }
}

// Waveform/oscilloscope
class Waveform {
  constructor(canvas, color = '#4ade80') {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this.t = 0;
    this.waves = [
      { freq: 0.02, amp: 0.3, speed: 0.05 },
      { freq: 0.05, amp: 0.15, speed: 0.08 },
      { freq: 0.008, amp: 0.5, speed: 0.02 },
    ];
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._loop();
  }
  _resize() {
    const r = this.canvas.parentElement?.getBoundingClientRect() || {};
    this.W = this.canvas.width = r.width || 600;
    this.H = this.canvas.height = r.height || 200;
  }
  _loop() {
    const { ctx, W, H, color, waves } = this;
    ctx.clearRect(0, 0, W, H);
    this.t++;
    waves.forEach((w, wi) => {
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const y = H/2 + Math.sin(x * w.freq + this.t * w.speed) * H * w.amp
                      + Math.sin(x * w.freq * 0.5 + this.t * w.speed * 0.7) * H * 0.05;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color + ['40','28','18'][wi];
      ctx.lineWidth = wi === 0 ? 1.5 : 1;
      ctx.stroke();
    });
    // Grid lines
    for (let i = 1; i < 4; i++) {
      ctx.beginPath(); ctx.moveTo(0, H*i/4); ctx.lineTo(W, H*i/4);
      ctx.strokeStyle = color + '0a'; ctx.lineWidth = 1; ctx.stroke();
    }
    for (let i = 1; i < 8; i++) {
      ctx.beginPath(); ctx.moveTo(W*i/8, 0); ctx.lineTo(W*i/8, H);
      ctx.strokeStyle = color + '08'; ctx.lineWidth = 1; ctx.stroke();
    }
    requestAnimationFrame(() => this._loop());
  }
}

// Matrix rain
class MatrixRain {
  constructor(canvas, color = '#4ade80') {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this.cols = [];
    this._resize();
    window.addEventListener('resize', () => this._resize());
    this._loop();
  }
  _resize() {
    const r = this.canvas.parentElement?.getBoundingClientRect() || {};
    this.W = this.canvas.width = r.width || 600;
    this.H = this.canvas.height = r.height || 400;
    this.fontSize = 12;
    const numCols = Math.floor(this.W / this.fontSize);
    this.cols = this.cols.length ? this.cols.slice(0, numCols) : Array.from({length: numCols}, () => Math.random() * -50);
    while (this.cols.length < numCols) this.cols.push(Math.random() * -50);
  }
  _loop() {
    const { ctx, W, H, fontSize, cols, color } = this;
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = `${fontSize}px monospace`;
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';
    cols.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = color + (y < 0 ? '00' : i % 3 === 0 ? 'ff' : '55');
      ctx.fillText(ch, i * fontSize, y * fontSize);
      if (y * fontSize > H && Math.random() > 0.975) cols[i] = 0;
      else cols[i] = y + 1;
    });
    setTimeout(() => requestAnimationFrame(() => this._loop()), 60);
  }
}

// Network graph
class NetworkGraph {
  constructor(canvas, color = '#22d3ee') {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.color = color;
    this._resize();
    this.nodes = [];
    this.edges = [];
    this.packets = [];
    this._build();
    window.addEventListener('resize', () => { this._resize(); this._build(); });
    this._loop();
  }
  _resize() {
    const r = this.canvas.parentElement?.getBoundingClientRect() || {};
    this.W = this.canvas.width = r.width || 600;
    this.H = this.canvas.height = r.height || 400;
  }
  _build() {
    const { W, H } = this;
    const positions = [
      [.5,.1],[.1,.35],[.9,.35],[.2,.7],[.5,.6],[.8,.7],[.35,.9],[.65,.9]
    ];
    this.nodes = positions.map((p, i) => ({ x: p[0]*W, y: p[1]*H, r: i===0?6:4, label: ['HOST','DNS','GW','DB','APP','LB','SVC','API'][i] }));
    this.edges = [[0,1],[0,2],[0,4],[1,3],[2,5],[3,6],[4,5],[4,6],[5,7],[6,7]];
    this.packets = [];
  }
  _addPacket() {
    if (this.packets.length > 10) return;
    const e = this.edges[Math.floor(Math.random() * this.edges.length)];
    const [a, b] = Math.random() > 0.5 ? e : [e[1], e[0]];
    this.packets.push({ from: a, to: b, t: 0, speed: 0.012 + Math.random() * 0.01 });
  }
  _loop() {
    const { ctx, W, H, nodes, edges, color } = this;
    ctx.clearRect(0, 0, W, H);
    if (Math.random() > 0.92) this._addPacket();
    // Edges
    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.strokeStyle = color + '18'; ctx.lineWidth = 1; ctx.stroke();
    });
    // Packets
    this.packets = this.packets.filter(p => p.t <= 1);
    this.packets.forEach(p => {
      p.t += p.speed;
      const n1 = nodes[p.from], n2 = nodes[p.to];
      const x = n1.x + (n2.x - n1.x) * p.t;
      const y = n1.y + (n2.y - n1.y) * p.t;
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI*2);
      ctx.fillStyle = color + 'cc'; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI*2);
      ctx.strokeStyle = color + '44'; ctx.lineWidth = 1; ctx.stroke();
    });
    // Nodes
    nodes.forEach((n, i) => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 4, 0, Math.PI*2);
      ctx.fillStyle = color + '0f'; ctx.fill();
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = color + '30'; ctx.fill();
      ctx.strokeStyle = color + '88'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.font = '9px monospace'; ctx.fillStyle = color + 'aa';
      ctx.textAlign = 'center';
      ctx.fillText(n.label, n.x, n.y + n.r + 12);
    });
    requestAnimationFrame(() => this._loop());
  }
}

// Boot log scroll animation
class BootLog {
  constructor(el, lines) {
    this.el = el;
    this.lines = lines;
    this.idx = 0;
    this._run();
  }
  _run() {
    if (this.idx >= this.lines.length) {
      setTimeout(() => { this.el.innerHTML = ''; this.idx = 0; this._run(); }, 3000);
      return;
    }
    const l = this.lines[this.idx];
    const div = document.createElement('div');
    div.style.cssText = `font-size:.78rem;line-height:1.7;padding:1px 0;color:${l.color||'#a1a1aa'};opacity:0;transition:opacity .15s`;
    div.textContent = l.text;
    this.el.appendChild(div);
    requestAnimationFrame(() => { div.style.opacity = '1'; });
    this.el.scrollTop = this.el.scrollHeight;
    this.idx++;
    setTimeout(() => this._run(), l.delay || 80);
  }
}

// Expose globals
window.DF = { Terminal, Particles, Radar, Waveform, MatrixRain, NetworkGraph, BootLog, TextScramble };
