"use client";

import { useEffect } from "react";

/**
 * Fades in every element marked `data-reveal` as it scrolls into view.
 * Content stays visible without JavaScript and under prefers-reduced-motion (see globals.css).
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    const check = () => {
      const limit = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top >= limit) return true;
        el.classList.add("is-in");
        return false;
      });
      if (!pending.length) stop();
    };
    const stop = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.removeEventListener("hashchange", check);
    };

    // anything already on screen shows immediately, so the first paint never flashes
    check();
    root.classList.add("js-reveal");
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("hashchange", check);
    // anchor jumps and restored scroll positions can land after the first check
    const t = window.setTimeout(check, 300);
    return () => { stop(); window.clearTimeout(t); root.classList.remove("js-reveal"); };
  }, []);
  return null;
}
