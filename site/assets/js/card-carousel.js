/* Card Fan Carousel — Vanilla JS with GSAP */

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width) {
  let idealPx;
  if (width < 480) idealPx = 22 * 16;
  else if (width < 640) idealPx = 26 * 16;
  else if (width < 768) idealPx = 28 * 16;
  else if (width < 1024) idealPx = 34 * 16;
  else idealPx = 38 * 16;

  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards, slot) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

class CardFanCarousel {
  constructor(containerId, cards) {
    this.container = document.getElementById(containerId);
    this.cards = cards;
    this.totalCards = cards.length;
    this.needsPagination = this.totalCards > MAX_VISIBLE;
    this.centerIndex = this.needsPagination ? HALF : this.totalCards >> 1;
    this.isAnimating = false;
    this.hasEntered = false;
    this.direction = null;
    this.prevVisible = new Set();
    this.activeSlot = null;
    this.leaveTimer = null;

    if (!this.container || !this.totalCards) return;
    this.render();
    this.setupAnimations();
  }

  render() {
    const html = this.cards.map((card, i) => {
      const img = `<div class="relative w-full h-full overflow-hidden"><img src="${card.imgUrl}" alt="${card.alt || `Card ${i}`}" class="absolute inset-0 w-full h-full object-cover z-10" loading="lazy"></div>`;
      if (card.linkUrl) {
        return `<a href="${card.linkUrl}" target="${card.linkUrl.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer" class="fan-card block cursor-pointer">${img}</a>`;
      }
      return `<div class="fan-card">${img}</div>`;
    }).join('');

    const chevronLeft = `<svg class="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
    const chevronRight = `<svg class="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    const arrowClass = "relative flex items-center justify-center rounded-full border-[1.5px] border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-[16px] text-black/40 dark:text-white/55 cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-black/25 dark:hover:border-white/25 hover:text-black/70 dark:hover:text-white/80 active:opacity-70 transition-colors duration-300";

    const pagination = this.needsPagination ? `
      <div class="flex items-center justify-center gap-4 mt-4 md:mt-6 z-30">
        <button class="${arrowClass} w-10 h-10 md:w-12 md:h-12 carousel-prev" aria-label="Previous">${chevronLeft}</button>
        <div class="flex items-center gap-2">
          ${this.cards.map((_, i) => `<span class="carousel-dot w-2 h-2 rounded-full transition-all duration-300 ${i === this.centerIndex ? 'bg-black/70 dark:bg-white/80 scale-[1.3]' : 'bg-black/15 dark:bg-white/15'}" data-index="${i}"></span>`).join('')}
        </div>
        <button class="${arrowClass} w-10 h-10 md:w-12 md:h-12 carousel-next" aria-label="Next">${chevronRight}</button>
      </div>
    ` : '';

    this.container.innerHTML = `
      <section class="flex flex-col items-center w-full py-4 lg:py-8 px-4 md:px-8 relative z-20">
        <div class="flex items-center justify-center w-full max-w-[90rem]">
          <div class="fan-layout flex relative justify-center items-center w-full max-w-[80rem]">
            ${html}
          </div>
        </div>
        ${pagination}
      </section>
    `;

    if (this.needsPagination) {
      this.container.querySelector('.carousel-prev')?.addEventListener('click', () => this.cycle('left'));
      this.container.querySelector('.carousel-next')?.addEventListener('click', () => this.cycle('right'));
    }
  }

  getVisibleMap(center) {
    const map = new Map();
    if (!this.needsPagination) {
      this.cards.forEach((_, i) => map.set(i, i));
      return map;
    }
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      map.set(((center + slot - HALF) % this.totalCards + this.totalCards) % this.totalCards, slot);
    }
    return map;
  }

  cycle(direction) {
    if (this.isAnimating || !this.needsPagination) return;
    this.isAnimating = true;
    this.direction = direction;
    this.centerIndex = direction === 'right' ? (this.centerIndex + 1) % this.totalCards : (this.centerIndex - 1 + this.totalCards) % this.totalCards;
    this.updateAnimations();
  }

  setupAnimations() {
    window.addEventListener('resize', () => {
      if (!this.isAnimating) this.updateAnimations();
    });
    this.updateAnimations();
  }

  updateAnimations() {
    const fanLayout = this.container.querySelector('.fan-layout');
    if (!fanLayout) return;

    const cardElements = Array.from(fanLayout.querySelectorAll('.fan-card'));
    const visibleMap = this.getVisibleMap(this.centerIndex);
    const previouslyVisible = this.prevVisible;
    const direction = this.direction;
    const isFirstMount = !this.hasEntered;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = this.needsPagination ? MAX_VISIBLE : this.totalCards;
    const config = (slot) => getSlotConfig(slotCount, slot);

    if (isFirstMount) this.isAnimating = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        this.isAnimating = false;
        if (isFirstMount) this.hasEntered = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.2, ease: 'elastic.out(1.05,.78)', delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === 'right' ? 40 : -40;
          gsap.set(card, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === 'right' ? 30 : -30, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: 'power2.out', onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: 'power2.out', onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === 'right' ? -40 : 40;
        gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === 'right' ? -30 : 30, duration: 0.4, ease: 'power2.in', zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    this.prevVisible = new Set(visibleMap.keys());
    this.updateHoverLayout(this.activeSlot);
    this.setupHoverHandlers(cardElements, visibleMap);
  }

  setupHoverHandlers(cardElements, visibleMap) {
    const visibleEntries = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot });
    });
    visibleEntries.sort((a, b) => a.slot - b.slot);

    const centerSlot = visibleEntries.length >> 1;
    const config = (slot) => getSlotConfig(this.needsPagination ? MAX_VISIBLE : this.totalCards, slot);

    const updateHoverLayout = (hoveredSlot) => {
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);

      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        let targetX = base.x * mult;
        let targetY = base.y * hM;
        let targetRot = base.rot;
        let targetScale = base.scale;
        let delay = 0;

        if (hoveredSlot !== null) {
          const distance = Math.abs(slot - hoveredSlot);
          delay = distance * 0.02;

          if (slot === hoveredSlot) {
            targetY -= 2.5 * hM;
            targetScale *= 1.08;
          } else {
            const normalized = centerSlot > 0 ? (slot - centerSlot) / centerSlot : 0;
            const pushStrength = 8 * (1 - Math.abs(normalized)) * (1 + 0.2 * Math.max(0, 3 - distance));

            if (slot < hoveredSlot) {
              targetX -= pushStrength * mult;
              targetRot -= 3 / (distance + 1);
            } else {
              targetX += pushStrength * mult;
              targetRot += 3 / (distance + 1);
            }

            if (slot === visibleEntries.length - 1 && hoveredSlot < centerSlot) targetY -= 1 * hM;
            if (slot === 0 && hoveredSlot > centerSlot) targetY -= 1 * hM;
          }
        } else {
          delay = Math.abs(slot - centerSlot) * 0.02;
        }

        gsap.to(el, {
          x: `${targetX}rem`, y: `${targetY}rem`, rotation: targetRot, scale: targetScale,
          duration: 0.5, delay, ease: 'elastic.out(1,.75)', overwrite: 'auto',
        });
        gsap.set(el, { zIndex: base.zIndex });
      });
    };

    visibleEntries.forEach(({ el, slot }) => {
      el.addEventListener('mouseenter', () => {
        if (this.isAnimating) return;
        if (this.leaveTimer) { clearTimeout(this.leaveTimer); this.leaveTimer = null; }
        if (this.activeSlot !== slot) { this.activeSlot = slot; updateHoverLayout(slot); }
      });
    });

    this.container.addEventListener('mouseleave', () => {
      if (this.isAnimating) return;
      if (this.leaveTimer) clearTimeout(this.leaveTimer);
      this.leaveTimer = setTimeout(() => { this.activeSlot = null; updateHoverLayout(null); }, 50);
    });

    this.updateHoverLayout = updateHoverLayout;
  }

  updateHoverLayout(slot) {
    if (this.updateHoverLayout) this.updateHoverLayout(slot);
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardFanCarousel;
}
