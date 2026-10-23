"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/ui/NavLink";
import { NAV, NAV_CTA, SOCIALS } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import styles from "./Header.module.css";

/** True when the page under the header bar is a dark section (data-theme="dark" or .on-dark). */
function isOverDark(header: HTMLElement | null) {
  const stack = document.elementsFromPoint(window.innerWidth / 2, 64);
  const target = stack.find((el) => !header?.contains(el));
  return Boolean(target?.closest('[data-theme="dark"], .on-dark'));
}

/**
 * Duna-style header: a full-width row at the top of the page (logo, small uppercase links, CTA) that
 * becomes a compact centred bar once the page scrolls, turns white over dark sections, and opens a
 * full-screen menu with big numbered links on phones and tablets.
 */
export function Header() {
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // scroll position, dark-section detection and scroll-spy on the home page
  useEffect(() => {
    const ids = NAV.filter((n) => n.href.startsWith("/#")).map((n) => n.href.slice(2));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        setOnDark(isOverDark(ref.current));
        if (pathname !== "/") return setActive("");
        const mid = window.innerHeight * 0.45;
        const current = ids.find((id) => {
          const r = document.getElementById(id)?.getBoundingClientRect();
          return r && r.top <= mid && r.bottom > mid;
        });
        setActive(current ? `/#${current}` : "");
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [pathname]);

  // while the menu is open: Escape closes it and the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = overflow; };
  }, [open]);

  // a new page always starts with the menu closed
  useEffect(() => setOpen(false), [pathname]);

  const close = () => setOpen(false);
  const isCurrent = (href: string) => (href.startsWith("/#") ? active === href : pathname === href || pathname.startsWith(`${href}/`));
  const menuLinks = [{ href: "/", label: "Home" }, ...NAV, { href: "/#join", label: NAV_CTA }];
  const className = [styles.header, onDark && styles.onDark, scrolled && styles.scrolled, open && styles.open].filter(Boolean).join(" ");

  return (
    <header ref={ref} className={className}>
      <div className={`${styles.row} caption`}>
        <NavLink href="/" className={styles.logo} onNavigate={close}><span className="visually-hidden">Elegix home</span><Logo /></NavLink>
        <nav aria-label="Main" className={styles.nav}>
          {NAV.map((n) => <NavLink key={n.href} href={n.href} className={styles.navLink} current={isCurrent(n.href)}>{n.label}</NavLink>)}
        </nav>
        <div className={styles.actions}>
          <NavLink href="/#join" className={styles.cta}>{NAV_CTA} <span aria-hidden="true">→</span></NavLink>
          <button type="button" className={`${styles.burger} caption`} aria-expanded={open} aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}>
            {open ? "Close" : "Menu"}<span className={styles.burgerIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="site-menu" className={styles.menu} aria-hidden={!open} inert={!open}>
        <ul className={styles.menuList}>
          {menuLinks.map((n, i) => (
            <li key={n.href}>
              <NavLink href={n.href} className={styles.menuLink} onNavigate={close} current={n.href !== "/#join" && isCurrent(n.href)}>
                <span style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" } as CSSProperties}>
                  <small>{String(i + 1).padStart(2, "0")}</small>{n.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`${styles.menuFoot} caption`}>
          <a href="mailto:hello@elegix.net">hello@elegix.net</a>
          <span className={styles.socials}>
            {SOCIALS.slice(0, 3).map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </span>
        </div>
      </div>
    </header>
  );
}
