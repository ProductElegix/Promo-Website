"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { useContent, usePlainPath, useUi } from "@/components/ui/Lang";
import { LangSwitch } from "@/components/ui/LangSwitch";
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
  const pathname = usePlainPath();
  const { NAV, NAV_CTA, SOCIALS } = useContent();
  const t = useUi();
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
  }, [pathname, NAV]);

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
  /** pages that belong to a menu section without sitting under its path: free tools are part of Guides, stories of About */
  const SECTION_OF: Record<string, string> = { "/tools": "/guides", "/stories": "/about", "/authors": "/about" };
  const section = Object.entries(SECTION_OF).find(([p]) => pathname === p || pathname.startsWith(`${p}/`))?.[1];
  const isCurrent = (href: string) => (href.startsWith("/#") ? active === href : section === href || pathname === href || pathname.startsWith(`${href}/`));
  /** "Get early access": the signup form at the bottom of this page when there is one, the home page form otherwise */
  const toJoin = (e: MouseEvent<HTMLAnchorElement>) => {
    close();
    if (pathname === "/" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const form = document.getElementById("join");
    if (!form) return;
    e.preventDefault();
    // after the phone menu closes and the page can scroll again
    setTimeout(() => form.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  const menuLinks = [{ href: "/", label: t.home }, ...NAV, { href: "/#join", label: NAV_CTA }];
  const className = [styles.header, onDark && styles.onDark, scrolled && styles.scrolled, open && styles.open].filter(Boolean).join(" ");

  return (
    <header ref={ref} className={className}>
      <div className={`${styles.row} caption`}>
        <NavLink href="/" className={styles.logo} onNavigate={close}><span className="visually-hidden">{t.elegixHome}</span><Logo /></NavLink>
        <nav aria-label={t.mainNav} className={styles.nav}>
          {NAV.map((n) => <NavLink key={n.href} href={n.href} className={styles.navLink} current={isCurrent(n.href)}>{n.label}</NavLink>)}
        </nav>
        <div className={styles.actions}>
          <LangSwitch className={styles.lang} />
          <NavLink href="/#join" className={styles.cta} onClick={toJoin}>{NAV_CTA}</NavLink>
          <button type="button" className={`${styles.burger} caption`} aria-expanded={open} aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}>
            {open ? t.close : t.menu}<span className={styles.burgerIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="site-menu" className={styles.menu} aria-hidden={!open} inert={!open}>
        <ul className={styles.menuList}>
          {menuLinks.map((n, i) => (
            <li key={n.href}>
              <NavLink href={n.href} className={styles.menuLink} onNavigate={close} onClick={n.href === "/#join" ? toJoin : undefined} current={n.href !== "/#join" && isCurrent(n.href)}>
                <span style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" } as CSSProperties}>
                  <small>{String(i + 1).padStart(2, "0")}</small>{n.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className={`${styles.menuFoot} caption`}>
          <a href="mailto:hello@elegix.net">hello@elegix.net</a>
          <LangSwitch />
          <span className={styles.socials}>
            {SOCIALS.slice(0, 3).map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
          </span>
        </div>
      </div>
    </header>
  );
}
