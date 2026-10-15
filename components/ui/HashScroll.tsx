"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * After a client-side navigation to "/#section" (e.g. from /about), bring the section into view.
 * Runs twice so a late layout change (fonts, images) can't leave it off by a few pixels.
 */
export function HashScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    const t1 = window.setTimeout(go, 60);
    const t2 = window.setTimeout(go, 450);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [pathname]);
  return null;
}
