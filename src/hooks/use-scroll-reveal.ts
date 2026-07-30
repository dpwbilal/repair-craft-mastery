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

    let els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    els.forEach((el) => io.observe(el));

    // Pick up any element mounted after the first pass.
    const mo = new MutationObserver(() => {
      const next = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      next.filter((el) => !els.includes(el)).forEach((el) => io.observe(el));
      els = next;
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Failsafe: if the JS thread lagged, never leave on-screen content hidden.
    const failsafe = window.setInterval(() => {
      for (const el of els) {
        if (el.classList.contains("is-revealed")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("is-revealed");
      }
    }, 1500);

    return () => {
      window.clearInterval(failsafe);
      mo.disconnect();
      io.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
