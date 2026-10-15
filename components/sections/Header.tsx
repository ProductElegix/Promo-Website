"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { NAV, NAV_CTA } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // scroll-spy on the home page: highlight the section crossing the middle of the screen
  useEffect(() => {
    const ids = NAV.filter((n) => n.href.startsWith("/#")).map((n) => n.href.slice(2));
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (pathname !== "/") return setActive("");
      const mid = window.innerHeight * 0.45;
      const current = ids.find((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect();
        return r && r.top <= mid && r.bottom > mid;
      });
      setActive(current ? `/#${current}` : "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const isCurrent = (href: string) => (href.startsWith("/#") ? active === href : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.capsule}>
        <NavLink href="/" className={styles.logo} onNavigate={close}><span className="visually-hidden">Elegix home</span><Logo /></NavLink>
        <nav aria-label="Main" className={styles.nav}>
          {NAV.map((n) => <NavLink key={n.href} href={n.href} current={isCurrent(n.href)}>{n.label}</NavLink>)}
        </nav>
        <NavLink href="/#join" className={`btn ${styles.cta}`}>{NAV_CTA}</NavLink>
        <button type="button" className={styles.burger} aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
      <div id="mobile-menu" className={styles.menu} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n) => <NavLink key={n.href} href={n.href} onNavigate={close} current={isCurrent(n.href)}>{n.label}</NavLink>)}
          <NavLink href="/#join" className="btn lime" onNavigate={close}>{NAV_CTA}</NavLink>
        </nav>
      </div>
    </header>
  );
}
