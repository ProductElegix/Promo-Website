"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

/**
 * One link behaviour for the whole site navigation:
 * - "/#section" on the home page: smooth-scrolls to the section (sticky-header offset via scroll-margin-top)
 * - "/#section" on any other page: client-side navigation to the home page, landing on the section
 * - "/" on the home page: smooth-scrolls to the top
 * - the page you're already on (e.g. About on /about): smooth-scrolls to the top
 * - other paths: normal client-side navigation (no full reload), landing at the top (see ScrollToTop)
 */
export function NavLink({ href, children, className, onNavigate, current }: {
  href: string; children: ReactNode; className?: string; onNavigate?: () => void; current?: boolean;
}) {
  const pathname = usePathname();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (href === pathname && pathname !== "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (pathname !== "/") return;
    if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", "/");
      return;
    }
    const id = href.startsWith("/#") ? href.slice(2) : null;
    const el = id ? document.getElementById(id) : null;
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `/#${id}`);
    }
  };
  return <Link href={href} className={className} onClick={onClick} aria-current={current ? "page" : undefined}>{children}</Link>;
}
