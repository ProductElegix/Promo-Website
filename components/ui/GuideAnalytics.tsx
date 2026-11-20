"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * GA4 events for a guide, so we can see which guides are read and which turn readers into signups:
 * guide_scroll (25/50/75/100% of the body), guide_tool_use (first touch of a calculator or check),
 * cta_click (with its position: side, end). Signups themselves are generate_lead from the form.
 */
export function GuideAnalytics({ slug, bodyId }: { slug: string; bodyId: string }) {
  useEffect(() => {
    const body = document.getElementById(bodyId);
    const sent = new Set<number>();
    let frame = 0;
    const check = () => {
      frame = 0;
      if (!body) return;
      const r = body.getBoundingClientRect();
      const read = (window.innerHeight - r.top) / Math.max(1, r.height);
      for (const p of [25, 50, 75, 100]) {
        if (read * 100 >= p && !sent.has(p)) { sent.add(p); track("guide_scroll", { guide: slug, percent: p }); }
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };

    const used = new Set<string>();
    const onInput = (e: Event) => {
      const tool = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-tool]")?.dataset.tool;
      if (tool && !used.has(tool)) { used.add(tool); track("guide_tool_use", { guide: slug, tool }); }
    };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cta]");
      if (el) track("cta_click", { guide: slug, position: el.dataset.cta ?? "" });
      onInput(e);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("input", onInput);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("input", onInput);
      document.removeEventListener("click", onClick);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [slug, bodyId]);
  return null;
}
