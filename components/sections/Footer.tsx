import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { NavLink } from "@/components/ui/NavLink";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`on-dark ${styles.footer}`}>
      <p className={`container display ${styles.slogan}`}><Rich text={FOOTER.slogan} /></p>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Elegix home"><Logo /></Link>
          <p>{FOOTER.about}</p>
          <div className={styles.signup}><WaitlistForm source="footer" variant="glass" placeholder="Your email" buttonLabel="Join" /></div>
        </div>
        {FOOTER.columns.map((c) => (
          <nav key={c.title} className={styles.col} aria-label={c.title}>
            <h2 className={styles.h}>{c.title}</h2>
            <ul>{c.links.map((l) => <li key={l.label}>{l.href.startsWith("/") ? <NavLink href={l.href}>{l.label}</NavLink> : <a href={l.href}>{l.label}</a>}</li>)}</ul>
          </nav>
        ))}
        <nav className={styles.col} aria-label="Social">
          <h2 className={styles.h}>Follow</h2>
          <ul>{FOOTER.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>
        </nav>
      </div>
      <div className={`container ${styles.base}`}>
        <span>© {new Date().getFullYear()} Elegix. All rights reserved.</span>
        <span className={styles.baseLinks}><a href="https://unsplash.com" rel="noopener">Photos: Unsplash</a><a href="mailto:hello@elegix.net">hello@elegix.net</a></span>
      </div>
      <div className={styles.wordmark} aria-hidden="true">{FOOTER.wordmark}</div>
    </footer>
  );
}
