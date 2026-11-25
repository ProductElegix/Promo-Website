"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
  interface Window { __lenis?: Lenis }
}

/**
 * Inertia ("smooth") wheel scrolling with Lenis, driven by the GSAP ticker so the ScrollTrigger
 * effects in Motion stay in sync (the same setup as the Duna site).
 * Only for a mouse or trackpad: phones and tablets keep their native scroll and never download it,
 * and it stays off with prefers-reduced-motion. It loads when the browser is idle after the page,
 * so it costs nothing on the first paint.
 * Native scrolling is kept inside the guide check dialog, the phone menu and anything marked
 * data-lenis-prevent (the table of contents), and the page doesn't move while one of them is open.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: Lenis | undefined;
    let cleanup = () => {};
    let cancelled = false;

    async function init() {
      const [{ default: LenisCtor }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"), import("gsap"), import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisCtor({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        anchors: true,
        stopInertiaOnNavigate: true,
        allowNestedScroll: true,
        autoRaf: false,
        prevent: (node) => node.nodeName === "DIALOG" || node.id === "site-menu" || node.hasAttribute?.("data-lenis-prevent"),
      });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // a modal dialog or the phone menu locks the page (overflow: hidden): pause the smooth scroll meanwhile
      const root = document.documentElement;
      const sync = () => {
        const locked = root.style.overflow === "hidden" || document.body.style.overflow === "hidden";
        if (locked) lenis!.stop(); else lenis!.start();
      };
      const watch = new MutationObserver(sync);
      watch.observe(root, { attributes: true, attributeFilter: ["style"] });
      watch.observe(document.body, { attributes: true, attributeFilter: ["style"] });

      cleanup = () => {
        watch.disconnect();
        gsap.ticker.remove(raf);
        lenis?.destroy();
        delete window.__lenis;
      };
    }

    // Safari has no requestIdleCallback
    const hasIdle = "requestIdleCallback" in window;
    const handle = hasIdle ? window.requestIdleCallback(() => void init(), { timeout: 2500 }) : window.setTimeout(() => void init(), 1200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle); else window.clearTimeout(handle);
      cleanup();
    };
  }, []);

  return null;
}
