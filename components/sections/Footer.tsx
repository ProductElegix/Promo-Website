import { FOOTER } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { NavLink } from "@/components/ui/NavLink";
import styles from "./Footer.module.css";

/** Black footer: four small caption columns, the logo mark, and a giant wordmark with a faded echo above it. */
export function Footer() {
  return (
    <footer className={`on-dark ${styles.footer}`} data-theme="dark">
      <div className={`${styles.top} caption`}>
        <div className={styles.about}>
          <h2 className={styles.head}>{FOOTER.caption}</h2>
          <p>{FOOTER.about}</p>
          <a href={`mailto:${FOOTER.email}`} className={styles.email}>Email us</a>
        </div>
        <nav aria-label="Social">
          <h2 className={styles.head}>Follow</h2>
          <ul>{FOOTER.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>
        </nav>
        <nav aria-label="Footer">
          <h2 className={styles.head}>Navigation</h2>
          <ul>{FOOTER.nav.map((l) => <li key={l.href}><NavLink href={l.href}>{l.label}</NavLink></li>)}</ul>
        </nav>
        <div className={styles.legal}>
          <h2 className={styles.head}>© {new Date().getFullYear()} Elegix. All rights reserved</h2>
          <ul>
            {FOOTER.legal.map((l) => <li key={l.href}><NavLink href={l.href}>{l.label}</NavLink></li>)}
            <li><a href="#top">Back to top</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.mark} aria-hidden="true"><LogoMark /></div>

      <div className={styles.wordmark} aria-hidden="true">
        <span className={styles.echo}>{FOOTER.wordmark}</span>
        <span className={styles.solid}>{FOOTER.wordmark}</span>
      </div>
    </footer>
  );
}
