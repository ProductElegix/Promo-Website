import { MANIFESTO } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { Rich } from "@/components/ui/Rich";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section id="manifesto" className={`section ${styles.manifesto}`} aria-labelledby="manifesto-title">
      <div className={`container ${styles.inner}`} data-reveal>
        <LogoMark className={styles.mark} />
        <span id="manifesto-title" className="eyebrow">{MANIFESTO.eyebrow}</span>
        {MANIFESTO.paragraphs.map((p) => <p key={p} className={styles.p}><Rich text={p} /></p>)}
        <a href="#join" className="btn">{MANIFESTO.cta}</a>
      </div>
    </section>
  );
}
