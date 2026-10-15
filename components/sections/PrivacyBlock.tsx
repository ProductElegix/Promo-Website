import Link from "next/link";
import { PRIVACY_BLOCK } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { Rich } from "@/components/ui/Rich";
import styles from "./PrivacyBlock.module.css";

/** Dark card with a huge faint padlock behind the promise. */
export function PrivacyBlock() {
  return (
    <section className="section" aria-labelledby="privacy-title">
      <div className="container">
        <div className={`on-dark grain ${styles.card}`} data-reveal>
          <div className={styles.lock} aria-hidden="true">
            <svg viewBox="0 0 400 520" className={styles.lockSvg}>
              <path d="M110 230 V150 a90 90 0 0 1 180 0 V230" fill="none" />
              <rect x="40" y="230" width="320" height="270" rx="56" fill="none" />
            </svg>
            <LogoMark className={styles.mark} />
          </div>
          <div className={styles.content}>
            <h2 id="privacy-title" className={`display ${styles.title}`}><Rich text={PRIVACY_BLOCK.title} /></h2>
            <p className={styles.text}>{PRIVACY_BLOCK.text}</p>
            <Link href={PRIVACY_BLOCK.link.href} className={styles.link}>{PRIVACY_BLOCK.link.label} →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
