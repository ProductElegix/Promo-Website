"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll animation for the product reveal (second screen of the home page). GSAP loads on the visitor's first
 * scroll, touch or key press, like the site-wide motion; until then the block is a plain stacked layout below the fold.
 * Timeline, scrubbed by scroll while the stage sticks to the screen:
 *   1. the statement's words light up one by one;
 *   2. the statement lifts away while the phone rises from below, tilted back, and straightens to face you;
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
    const stop = () => EVENTS.forEach((e) => window.removeEventListener(e, start));
    function start() { stop(); void init(); }
    if (window.scrollY > 0) start();
    else EVENTS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    async function init() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !root) return;
      gsap.registerPlugin(ScrollTrigger);
      // the tall sticky layout only switches on when the animation can run, so nothing is ever stuck half-way
      root.dataset.armed = "";

      ctx = gsap.context(() => {
        const head = root.querySelector("[data-product-head]");
        const words = root.querySelectorAll("[data-word]");
        const phone = root.querySelector("[data-product-phone]");
        const notes = gsap.utils.toArray<HTMLElement>("[data-product-note]", root);
        const side = (el: HTMLElement) => (el.getBoundingClientRect().left + el.offsetWidth / 2 < window.innerWidth / 2 ? -1 : 1);

        gsap.set(phone, { yPercent: 70, rotateX: 38, scale: 0.72, opacity: 0 });
        gsap.set(notes, { opacity: 0, x: (_i: number, el: HTMLElement) => side(el) * 40 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
        });
        tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.06, duration: 0.3 })
          .to({}, { duration: 0.3 })
          .to(head, { yPercent: -30, opacity: 0, duration: 0.8, ease: "power1.in" })
          .to(phone, { yPercent: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }, "<0.15")
          .to(notes, { opacity: 1, x: 0, duration: 0.5, stagger: 0.35, ease: "power2.out" }, "-=0.3")
          .to({}, { duration: 0.6 });
      }, root);

      ScrollTrigger.refresh();
    }

    return () => { cancelled = true; stop(); ctx?.revert(); delete root.dataset.armed; };
  }, []);

  return <span ref={ref} hidden />;
}
