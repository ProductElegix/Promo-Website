"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll animation for the product reveal (second screen of the home page). GSAP loads on the visitor's first
 * scroll, touch or key press, or after 2.5 s; until then CSS holds the block in its starting pose.
 * Timeline, scrubbed by scroll while the stage sticks to the screen:
 *   1. once the block fills the screen, the statement's words light up one by one (the phone already peeks up below it);
 *   2. the statement lifts away while the phone rises and turns in 3D to face you, a light sweeping its glass;
 *   3. the three notes slide in one after another; then the picture holds for a moment.
 * Only transforms and opacity move.
 */
export function ProductRevealMotion() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("[data-product]");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
    const stop = () => { EVENTS.forEach((e) => window.removeEventListener(e, start)); window.clearTimeout(idle); };
    function start() { stop(); void init(); }
    // load on the first scroll or touch, or once the page is idle, whichever comes first, so it's ready before the block is reached
    let idle = 0;
    if (window.scrollY > 0) start();
    else {
      EVENTS.forEach((e) => window.addEventListener(e, start, { passive: true }));
      idle = window.setTimeout(start, 2500);
    }

    async function init() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !root) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const head = root.querySelector("[data-product-head]");
        const words = root.querySelectorAll("[data-word]");
        const phone = root.querySelector("[data-product-phone]");
        const sheen = root.querySelector("[data-product-sheen]");
        const notes = gsap.utils.toArray<HTMLElement>("[data-product-note]", root);
        const side = (el: HTMLElement) => (el.getBoundingClientRect().left + el.offsetWidth / 2 < window.innerWidth / 2 ? -1 : 1);

        // the phone already peeks up from the bottom edge, tilted back, so the stage is never an empty black screen
        // turned away in 3D; it straightens to face you as it rises, while a light sweeps across the glass
        // (the CSS already shows this pose before GSAP loads; every part is set here so none of it is read back from the CSS matrix)
        gsap.set(phone, { x: 0, y: 0, z: 0, skewX: 0, skewY: 0, yPercent: 80, rotateX: 34, rotateY: -22, rotateZ: 7, scale: 0.8, opacity: 0.55, transformPerspective: 1400 });
        gsap.set(sheen, { xPercent: -100 });
        gsap.set(notes, { opacity: 0, x: (_i: number, el: HTMLElement) => side(el) * 40 });

        // once the stage fills the screen and sticks: the words light up one by one (the phone peeks up below them),
        // then the statement lifts away as the phone rises and straightens, then the notes come in
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
        });
        tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.04, duration: 0.2 });
        tl.to(head, { yPercent: -35, opacity: 0, duration: 0.45, ease: "power1.in" }, "+=0.1")
          .to(phone, { yPercent: 0, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, "<")
          .to(sheen, { xPercent: 420, duration: 1, ease: "power1.inOut" }, "<0.2")
          .to(notes, { opacity: 1, x: 0, duration: 0.45, stagger: 0.3, ease: "power2.out" }, "-=0.35")
          .to({}, { duration: 0.4 });
      }, root);

      ScrollTrigger.refresh();
    }

    return () => { cancelled = true; stop(); ctx?.revert(); };
  }, []);

  return <span ref={ref} hidden />;
}
