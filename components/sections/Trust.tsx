import Link from "next/link";
import { PRINCIPLES, TRUST } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { Media } from "@/components/ui/Media";
import { Rich } from "@/components/ui/Rich";
import styles from "./Trust.module.css";

/** Faint embossed padlock behind the privacy principle. */
function Lock() {
  return (
    <div className={styles.lock} aria-hidden="true">
      <svg viewBox="0 0 400 520">
        <path d="M110 230 V150 a90 90 0 0 1 180 0 V230" fill="none" />
        <rect x="40" y="230" width="320" height="270" rx="56" fill="none" />
      </svg>
      <LogoMark className={styles.mark} />
    </div>
  );
}

/** The 4 principles, shared with /about. The privacy one is the dark card with the lock. */
export function Principles({ className = "" }: { className?: string }) {
  return (
    <ul className={`${styles.principles} ${className}`}>
      {PRINCIPLES.map((p, i) => (
        <li key={p.title} className={`${styles.principle} ${p.dark ? `on-dark ${styles.privacy}` : ""}`} data-reveal>
          {p.dark && <Lock />}
          <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function Trust() {
  const f = TRUST.founder;
  return (
    <section id="founder" className="section" aria-labelledby="trust-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">{TRUST.eyebrow}</span>
          <h2 id="trust-title" className="display h2"><Rich text={TRUST.title} /></h2>
        </div>
        <div className={styles.grid}>
          <figure className={styles.founder} data-reveal>
            <div className={styles.photo}><Media media={f.media} fill sizes="(max-width: 860px) 100vw, 360px" /></div>
            <div className={styles.note}>
              <blockquote className={styles.quote}>{f.quote || f.fallback}</blockquote>
              <figcaption><b>{f.name}</b>, {f.role} · <Link href={f.storyLink.href} className={styles.story}>{f.storyLink.label} →</Link></figcaption>
            </div>
          </figure>
          <Principles />
        </div>
      </div>
    </section>
  );
}
