"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll animation for the Spread block: GSAP is loaded once the block comes near the screen.
 * The photos start as a tilted stack below the screen, rise into the centre, then fly out to their
 * places (set in CSS) around the headline. Scrubbed by scroll; only transforms and opacity move.
 */
export function SpreadMotion() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest<HTMLElement>("[data-spread]");
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      void init();
    }, { rootMargin: "150% 0px" });
    io.observe(section);

    async function init() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled || !section) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const stage = section.firstElementChild as HTMLElement;
        const photos = gsap.utils.toArray<HTMLElement>("[data-spread-photo]", section);
        const text = section.querySelector("[data-spread-text]");
        const room = section.querySelector("[data-spread-room]");
        const tilt = [-7, 5, -3, 8, -5, 3];

        // distance from a photo's final place to the centre of the stage (in its own untransformed box)
        const toCentre = (el: HTMLElement) => {
          const s = stage.getBoundingClientRect();
          return { x: s.width / 2 - (el.offsetLeft), y: s.height / 2 - (el.offsetTop) };
        };

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true },
        });

        // 1. a stack rises from below into the middle
        tl.fromTo(photos, {
          x: (_i: number, el: HTMLElement) => toCentre(el).x,
          y: (_i: number, el: HTMLElement) => toCentre(el).y + window.innerHeight * 0.9,
          rotate: (i: number) => tilt[i % tilt.length],
          scale: 1.15,
        }, {
          y: (_i: number, el: HTMLElement) => toCentre(el).y,
          ease: "power2.out", duration: 1, stagger: 0.08,
        });
        // 2. short pause, then they fan out to the corners
        tl.to(photos, { x: 0, y: 0, rotate: 0, scale: 1, ease: "power3.inOut", duration: 1.2, stagger: 0.04 }, "+=0.25");
        if (text) tl.fromTo(text, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.5");
        if (room) tl.fromTo(room, { scale: 1.12 }, { scale: 1, duration: tl.duration() }, 0);
        // 3. hold the finished picture for a moment before the page scrolls on
        tl.to({}, { duration: 0.5 });
      }, section);

      ScrollTrigger.refresh();
    }

    return () => { cancelled = true; io.disconnect(); ctx?.revert(); };
  }, []);

  return <span ref={ref} hidden />;
}
