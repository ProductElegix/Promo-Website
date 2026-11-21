"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll animation for the product reveal (second screen of the home page). GSAP loads on the visitor's first
 * scroll, touch or key press, like the site-wide motion; until then the block is a plain stacked layout below the fold.
 * Timeline, scrubbed by scroll while the stage sticks to the screen:
 *   1. once the block fills the screen, the statement's words light up one by one (the phone already peeks up below it);
 *   2. the statement lifts away while the phone rises, straightens and faces you;
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

        // the phone already peeks up from the bottom edge, tilted back, so the stage is never an empty black screen
        gsap.set(phone, { yPercent: 80, rotateX: 34, scale: 0.8, opacity: 0.55 });
        gsap.set(notes, { opacity: 0, x: (_i: number, el: HTMLElement) => side(el) * 40 });

        // once the stage fills the screen and sticks: the words light up one by one (the phone peeks up below them),
        // then the statement lifts away as the phone rises and straightens, then the notes come in
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
        });
        tl.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.04, duration: 0.2 });
        tl.to(head, { yPercent: -35, opacity: 0, duration: 0.45, ease: "power1.in" }, "+=0.1")
          .to(phone, { yPercent: 0, rotateX: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" }, "<")
          .to(notes, { opacity: 1, x: 0, duration: 0.45, stagger: 0.3, ease: "power2.out" }, "-=0.35")
          .to({}, { duration: 0.4 });
      }, root);

      ScrollTrigger.refresh();
    }

    return () => { cancelled = true; stop(); ctx?.revert(); delete root.dataset.armed; };
  }, []);

  return <span ref={ref} hidden />;
}
