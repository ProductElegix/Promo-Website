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
 * - [data-reveal]: cards fade up once as they scroll into view. When the block is a big heading, or holds
 *   one (a section head), the heading's lines rise out of a mask instead (GSAP SplitText, as on the Duna
 *   site) and the tag, lede and button around it fade up just after
 * - [data-wipe]: a photo frame wipes up from the bottom while the photo settles from a slight zoom (Duna)
 * - [data-rise]: big letters rise one after another out of their box (the footer wordmark)
 * - everything else (headings, photos, text blocks, cards) gets a quiet default; see "everything else" below
 * - svg[data-wheel] path: wheel-of-life segments draw in from the centre
 * - [data-split-words]: words light up one after another as the paragraph scrolls through the screen
 * - [data-strip]: the photo strip opens up from behind the middle photo while scrolling
 * - svg[data-draw]: a line chart draws its main line from left to right, then the points pop in
 * - [data-count]: a number counts up from 0 when it scrolls into view
 * - [data-timeline-fill]: the road to launch fills up to the current stage while scrolling; [data-milestone] steps fade in one by one
 * Content is fully visible without JavaScript and with prefers-reduced-motion; only transforms
 * and opacity are animated, so nothing shifts the layout.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let splits: { revert: () => void }[] = [];
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
      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/SplitText")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      splits = [];

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

        /** a heading's lines rise one after another out of a mask; returns when the last line has started */
        const riseLines = (heading: HTMLElement, trigger: HTMLElement) => {
          const split = SplitText.create(heading, {
            type: "lines", mask: "lines", linesClass: "sline", aria: "none", autoSplit: true,
            onSplit: (self) => gsap.from(self.lines, {
              yPercent: 110, duration: 1.2, ease, stagger: 0.09,
              scrollTrigger: { trigger, start: "top 88%", once: true },
            }),
          });
          splits.push(split);
          return Math.max(0, split.lines.length - 1) * 0.09;
        };
        const HEADING = ":is(h1, h2).display";

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          // what is already on screen when the page opens shows immediately, no flash
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
          if (el.matches(HEADING)) { riseLines(el, el); return; }
          const heading = el.querySelector<HTMLElement>(`:scope > ${HEADING}`);
          if (!heading) {
            gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease, clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
            return;
          }
          const before = Array.from(el.children).filter((c) => c.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING);
          const after = Array.from(el.children).filter((c) => c !== heading && !before.includes(c));
          const lines = riseLines(heading, el);
          // explicit end values: buttons have a CSS opacity transition, which a from() tween would read mid-way
          if (before.length) gsap.fromTo(before, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease, clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          if (after.length) gsap.fromTo(after, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease, stagger: 0.08, delay: 0.25 + lines, clearProps: "transform,opacity", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
        });

        // photo frames wipe up from the bottom while the photo settles; cards in one row follow each other
        gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
          const row = el.closest("li");
          const index = row?.parentElement ? Array.from(row.parentElement.children).indexOf(row) % 3 : 0;
          const scrollTrigger = { trigger: el, start: "top 92%", once: true };
          gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
            clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease, delay: index * 0.1, scrollTrigger,
            onComplete: () => { gsap.set(el, { clearProps: "clipPath" }); },
          });
          const img = el.querySelector("img");
          // clearProps hands the photo back to its CSS hover zoom
          if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease, delay: index * 0.1, scrollTrigger, clearProps: "transform" });
        });

        /* ---------- everything else on every page, without markup of its own ----------
         * Whatever the marked effects above don't already move gets a quiet default, so every page
         * (guides, articles, tools, legal pages, the footer) moves the same way:
         * - section headings: lines rise out of a mask
         * - photos (next/image fill frames): wipe up while the photo settles
         * - text blocks, list items, cards, buttons: fade up, batched so a row comes in one after another
         * Skips: the first screen, the header, dialogs, the sticky contents list, anything inside an
         * element that already has its own motion, and [data-no-motion]. */
        const OWN = "[data-reveal], [data-wipe], [data-rise], [data-strip], [data-drift], [data-split-words], [data-timeline], [data-hero-item], [data-hero-phone], [data-hero-photo], [data-parallax], [data-scale-in], [data-no-motion], [data-spread], [data-product], header, dialog, [data-lenis-prevent]";
        const page = document.querySelector<HTMLElement>(".page");
        const footer = document.querySelector<HTMLElement>("footer");
        const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;
        const free = (el: Element) => !el.closest(OWN) && below(el);

        if (page) {
          page.querySelectorAll<HTMLElement>("h2, h1.display").forEach((h) => {
            if (!free(h) || h.closest("li, a, summary, button")) return;
            h.dataset.motionDone = "";
            riseLines(h, h);
          });

          page.querySelectorAll<HTMLImageElement>('img[data-nimg="fill"]').forEach((img) => {
            const frame = img.parentElement;
            if (!frame || !free(frame) || frame.offsetWidth < 96 || frame.closest("[data-motion-done]")) return;
            frame.dataset.motionDone = "";
            gsap.fromTo(frame, { clipPath: "inset(100% 0% 0% 0%)" }, {
              clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease, scrollTrigger: { trigger: frame, start: "top 92%", once: true },
              onComplete: () => { gsap.set(frame, { clearProps: "clipPath" }); },
            });
            gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.6, ease, clearProps: "transform", scrollTrigger: { trigger: frame, start: "top 92%", once: true } });
          });
        }

        // blocks: the outermost text block, list item, card or button not already moving
        const BLOCK = "p, li, figure, blockquote, table, details, form, .btn, [class*='card'], [class*='Card']";
        const blocks: HTMLElement[] = [];
        [page, footer].forEach((root) => root?.querySelectorAll<HTMLElement>(BLOCK).forEach((el) => {
          if (!free(el) || el.closest("[data-motion-done]") || el.closest("nav ul, .area-tags, [class*='chips'], [class*='tabs']")) return;
          if (blocks.some((b) => b.contains(el))) return;
          blocks.push(el);
        }));
        gsap.set(blocks, { y: 24, opacity: 0 });
        ScrollTrigger.batch(blocks, {
          start: "top 92%", once: true,
          onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease, stagger: 0.07, overwrite: true, clearProps: "transform,opacity" }),
        });

        // big letters rise out of their box one after another
        gsap.utils.toArray<HTMLElement>("[data-rise]").forEach((el) => {
          const split = SplitText.create(el, { type: "chars", aria: "none" });
          splits.push(split);
          gsap.from(split.chars, { yPercent: 105, duration: 1.3, ease, stagger: 0.05, scrollTrigger: { trigger: el, start: "top 98%", once: true } });
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

        gsap.utils.toArray<SVGSVGElement>("svg[data-draw]").forEach((svg) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: svg, start: "top 80%", once: true } });
          tl.fromTo(svg.querySelectorAll("[data-draw-line]"), { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" })
            .from(svg.querySelectorAll("[data-draw-point]"), { opacity: 0, duration: 0.4, stagger: 0.06 }, 0.3);
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count) || 0;
          const n = { v: 0 };
          gsap.to(n, { v: to, duration: 1.6, ease: "power2.out", onUpdate: () => { el.textContent = String(Math.round(n.v)); },
            scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-timeline-fill]").forEach((el) => {
          const vertical = el.parentElement!.offsetHeight > el.parentElement!.offsetWidth;
          const list = el.closest("[data-timeline]") ?? el;
          gsap.from(el, { [vertical ? "scaleY" : "scaleX"]: 0, ease: "none", scrollTrigger: { trigger: list, start: "top 80%", end: "bottom 55%", scrub: 0.6 } });
          gsap.from(list.querySelectorAll("[data-milestone]"), { y: 24, opacity: 0, duration: 0.9, ease, stagger: 0.12, scrollTrigger: { trigger: list, start: "top 85%", once: true } });
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

    return () => { cancelled = true; stop(); ctx?.revert(); splits.forEach((sp) => sp.revert());
      document.querySelectorAll<HTMLElement>("[data-motion-done]").forEach((el) => delete el.dataset.motionDone);
    };
  }, [pathname]);

  return null;
}
