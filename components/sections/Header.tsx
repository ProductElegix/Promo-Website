"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NAV, NAV_CTA } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV.map((n) => n.href.split("#")[1]);
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // highlight the nav link of the section crossing the middle of the screen
      const mid = window.innerHeight * 0.45;
      const current = ids.find((id) => {
        const r = document.getElementById(id)?.getBoundingClientRect();
        return r && r.top <= mid && r.bottom > mid;
      });
      setActive(current ?? "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.capsule}>
        <Link href="/" className={styles.logo} aria-label="Elegix home" onClick={close}><Logo /></Link>
        <nav aria-label="Main" className={styles.nav}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} aria-current={active && n.href.endsWith(`#${active}`) ? "true" : undefined}>{n.label}</a>
          ))}
        </nav>
        <a href="/#join" className={`btn ${styles.cta}`}>{NAV_CTA}</a>
        <button type="button" className={styles.burger} aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          <span /><span />
        </button>
      </div>
      <div id="mobile-menu" className={styles.menu} hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={close}>{n.label}</a>)}
          <a href="/#join" className="btn lime" onClick={close}>{NAV_CTA}</a>
        </nav>
      </div>
    </header>
  );
}
