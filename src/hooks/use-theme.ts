import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export function useTheme() {
  // The document ships with class="dark", so start dark to avoid a
  // hydration mismatch / wrong toggle icon on first paint.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("ati-theme")) as Theme | null;
    const initial: Theme = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("ati-theme", next);
      } catch {
        // storage can be blocked (private mode) — theme still applies in-memory
      }
      return next;
    });
  };

  return { theme, toggle };
}