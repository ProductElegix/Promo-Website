import { getContent } from "@/lib/lang";
import { ui } from "@/lib/ui";
import { LogoMark } from "@/components/ui/Logo";
import { NavLink } from "@/components/ui/NavLink";
import styles from "./Footer.module.css";

/** Black footer: four small caption columns, the logo mark, and a giant wordmark with a faded echo above it. */
export async function Footer() {
  const { lang, c: { FOOTER } } = await getContent();
  const t = ui(lang);
  return (
    <footer className={`on-dark ${styles.footer}`} data-theme="dark">
      <div className={`${styles.top} caption`}>
        <div className={styles.about}>
          <h2 className={styles.head}>{FOOTER.caption}</h2>
          <p>{FOOTER.about}</p>
          <p className={styles.name}>{FOOTER.name}</p>
          <a href={`mailto:${FOOTER.email}`} className={styles.email}>{t.emailUs}</a>
        </div>
        <nav aria-label={t.social}>
          <h2 className={styles.head}>{t.follow}</h2>
          <ul>{FOOTER.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>
        </nav>
        <nav aria-label={t.footerNav}>
          <h2 className={styles.head}>{t.navigation}</h2>
          <ul>{FOOTER.nav.map((l) => <li key={l.href}><NavLink href={l.href}>{l.label}</NavLink></li>)}</ul>
        </nav>
        <div className={styles.legal}>
          <h2 className={styles.head}>© {new Date().getFullYear()} Elegix. {t.rightsReserved}</h2>
          <ul>
            {FOOTER.legal.map((l) => <li key={l.href}><NavLink href={l.href}>{l.label}</NavLink></li>)}
            <li><a href="#top">{t.backToTop}</a></li>
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
