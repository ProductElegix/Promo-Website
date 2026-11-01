"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide scroll motion with GSAP. GSAP is downloaded and set up only on the visitor's first scroll,
 * touch, click or key press: every effect below starts below the first screen, so there is nothing to
 * animate before that, and the page loads and becomes interactive without paying for it (mobile speed).
 * The hero entrance ([data-hero-item], [data-hero-phone]) is pure CSS in globals.css, so it runs at once.
 * - [data-hero-photo]: gentle parallax while scrolling past the hero
 * - [data-parallax]: the same for section photos (Early access)
 * - [data-scale-in]: a full-bleed photo eases from slightly zoomed in to its natural size as it scrolls into view
 * - [data-drift]: objects around the phone in the closing block drift in from the sides
 * - [data-reveal]: headings and cards fade up once as they scroll into view
 * - svg[data-wheel] path: wheel-of-life segments draw in from the centre
 * - [data-split-words]: words light up one after another as the paragraph scrolls through the screen
 * - [data-strip]: the photo strip opens up from behind the middle photo while scrolling
 * Content is fully visible without JavaScript and with prefers-reduced-motion; only transforms
 * and opacity are animated, so nothing shifts the layout.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const EVENTS = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;
    const stop = () => EVENTS.forEach((e) => window.removeEventListener(e, start));
    function start() {
      stop();
      void init();
    }
    // a page opened already scrolled (back navigation, #anchor) needs the effects straight away
    if (window.scrollY > 0) start();
    else EVENTS.forEach((e) => window.addEventListener(e, start, { passive: true }));

    async function init() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // close to the CSS --ease, cubic-bezier(0.22, 1, 0.36, 1): fast start, long soft landing
        const ease = "expo.out";

        gsap.utils.toArray<HTMLElement>("[data-hero-photo]").forEach((el) =>
          gsap.to(el, { yPercent: 12, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true } }),
        );

        // photos inside sections drift slightly while the section passes through the screen
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
          gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }),
        );

        gsap.utils.toArray<HTMLElement>("[data-scale-in]").forEach((el) =>
          gsap.fromTo(el, { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "top 20%", scrub: true } }),
        );

        // everyday objects around the phone drift in from the sides
        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((el, i) =>
          gsap.from(el, { x: (el.getBoundingClientRect().left < window.innerWidth / 2 ? -1 : 1) * 60, y: 30, opacity: 0, duration: 1.1, ease, delay: (i % 3) * 0.08, scrollTrigger: { trigger: el, start: "top 95%", once: true } }),
        );

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          // what is already on screen when the page opens shows immediately, no flash
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
          gsap.from(el, { y: 28, opacity: 0, duration: 1.1, ease, scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-split-words]").forEach((el) =>
          gsap.fromTo(el.querySelectorAll("[data-word]"), { opacity: 0.12 }, {
            opacity: 1, ease: "none", stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 40%", scrub: 0.6 },
          }),
        );

        gsap.utils.toArray<HTMLElement>("[data-strip]").forEach((strip) => {
          const items = Array.from(strip.children) as HTMLElement[];
          const mid = (items.length - 1) / 2;
          items.forEach((item, i) =>
            gsap.fromTo(item,
              { xPercent: (mid - i) * 55, scale: i === mid ? 0.9 : 0.8, opacity: i === mid ? 1 : 0.4 },
              { xPercent: 0, scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: strip, start: "top 95%", end: "top 30%", scrub: 0.8 } }),
          );
        });

        gsap.utils.toArray<SVGSVGElement>("svg[data-wheel]").forEach((svg) => {
          const cells = svg.querySelectorAll("path");
          gsap.from(cells, {
            scale: 0.4, opacity: 0, transformOrigin: "0px 0px", duration: 0.5, ease: "back.out(1.6)",
            stagger: { each: 0.004, from: "start" },
            scrollTrigger: { trigger: svg, start: "top 92%", once: true },
          });
        });
      });

      ScrollTrigger.refresh();
    }

    return () => { cancelled = true; stop(); ctx?.revert(); };
  }, [pathname]);

  return null;
}
