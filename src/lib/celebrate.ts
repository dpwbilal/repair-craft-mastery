/**
 * Lightweight confetti helpers.
 * canvas-confetti is loaded lazily so it never blocks first paint, and all
 * calls no-op on the server or when the user prefers reduced motion.
 */
const canCelebrate = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function load() {
  const mod = await import("canvas-confetti");
  return mod.default;
}

const BRAND = ["#00E5FF", "#0066FF", "#FF5500", "#FFC300", "#FFFFFF"];

/** Full party-popper burst — used when the diploma section scrolls into view. */
export async function partyPopper() {
  if (!canCelebrate()) return;
  const confetti = await load();
  const base = { colors: BRAND, disableForReducedMotion: true, scalar: 0.9 };
  confetti({ ...base, particleCount: 70, spread: 70, angle: 60, origin: { x: 0, y: 0.7 } });
  confetti({ ...base, particleCount: 70, spread: 70, angle: 120, origin: { x: 1, y: 0.7 } });
  window.setTimeout(() => {
    confetti({ ...base, particleCount: 60, spread: 100, startVelocity: 38, origin: { x: 0.5, y: 0.45 } });
  }, 180);
}

/** Small burst anchored to the element that was clicked. */
export async function miniBurst(el: HTMLElement | null) {
  if (!canCelebrate()) return;
  const confetti = await load();
  let origin = { x: 0.5, y: 0.6 };
  if (el) {
    const r = el.getBoundingClientRect();
    origin = {
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
    };
  }
  confetti({
    particleCount: 34,
    spread: 55,
    startVelocity: 24,
    scalar: 0.7,
    ticks: 120,
    colors: BRAND,
    disableForReducedMotion: true,
    origin,
  });
}
