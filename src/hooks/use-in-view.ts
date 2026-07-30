import { useEffect, useRef, useState } from "react";

/**
 * Re-triggerable viewport observer (once: false).
 * Falls back to `true` when IntersectionObserver is unavailable so content
 * that depends on it is never stuck hidden or stuck at zero.
 */
export function useInView<T extends HTMLElement>(amount = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return { ref, inView };
}
