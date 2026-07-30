import { useEffect } from "react";

/**
 * One shared IntersectionObserver for every [data-reveal] element.
 * Shared by the landing page and the course detail pages.
 */
export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.15 || (e.isIntersecting && e.intersectionRatio > 0)) {
            e.target.classList.add("is-revealed");
          } else if (e.intersectionRatio === 0) {
            // fully off-screen — re-arm so the reveal plays again next time
            e.target.classList.remove("is-revealed");
          }
        }
      },
      { threshold: [0, 0.15] },
    );

    const observed = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };
    scan();

    // Pick up late-mounted elements a couple of times instead of running a
    // permanent MutationObserver + polling loop (both caused scroll jank).
    const t1 = window.setTimeout(scan, 400);
    const t2 = window.setTimeout(scan, 1600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
