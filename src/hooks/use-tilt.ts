import { useCallback, useRef } from "react";

/**
 * Cursor-following 3D tilt.
 * Writes the transform straight to the node inside a rAF frame — no React
 * state, so hovering never re-renders and stays at 60fps. Disabled for
 * coarse pointers (touch) and reduced-motion users.
 */
export function useTilt<T extends HTMLElement>(max = 9) {
  const ref = useRef<T | null>(null);
  const frame = useRef(0);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || !enabled()) return;
      const { clientX, clientY } = e;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (clientX - r.left) / r.width - 0.5;
        const py = (clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(1200px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translate3d(0,0,0) scale(1.02)`;
      });
    },
    [max],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    cancelAnimationFrame(frame.current);
    if (el) el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale(1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
