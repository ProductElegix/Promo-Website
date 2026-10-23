"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Site-wide motion with GSAP, loaded lazily after the page is interactive (not in the main bundle).
 * - [data-hero-item]: hero eyebrow, headline, text and actions stagger in on load
 * - [data-hero-phone]: the phone slides up and tilts into place
 * - [data-hero-photo]: gentle parallax while scrolling past the hero
 * - [data-parallax]: the same for section photos (Early access)
 * - [data-scale-in]: a full-bleed photo eases from slightly zoomed in to its natural size as it scrolls into view
 * - [data-drift]: objects around the phone in the closing block drift in from the sides
 * - [data-reveal]: headings and cards fade up once as they scroll into view
 * - svg[data-wheel] path: wheel-of-life segments draw in from the centre
 * Content is fully visible without JavaScript and with prefers-reduced-motion; only transforms
 * and opacity are animated, so nothing shifts the layout.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // close to the CSS --ease, cubic-bezier(0.22, 1, 0.36, 1): fast start, long soft landing
        const ease = "expo.out";

        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        if (heroItems.length) gsap.from(heroItems, { y: 28, opacity: 0, duration: 0.9, ease, stagger: 0.09, delay: 0.05 });

        gsap.utils.toArray<HTMLElement>("[data-hero-phone]").forEach((el) =>
          gsap.from(el, { y: 120, rotate: 4, opacity: 0, duration: 1.3, ease: "power4.out", delay: 0.35 }),
        );

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
    })();

    return () => { cancelled = true; ctx?.revert(); };
  }, [pathname]);

  return null;
}
