import Image from "next/image";
import { JOIN, TRUST } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Join.module.css";

/** Early access: a full-bleed photo with a cream panel overlapping it at the bottom right. */
export function Join() {
  const sig = JOIN.signature;
  const photo = TRUST.founder.media;
  return (
    <section id="join" className={`on-dark ${styles.join}`} data-theme="dark" aria-labelledby="join-title">
      <div className={styles.stage}>
        <div className={styles.photo} data-parallax data-scale-in><Media media={JOIN.media} fill sizes="100vw" /></div>
        <div className={styles.panel} data-reveal>
          <span className="label">{JOIN.eyebrow}</span>
          <h2 id="join-title" className={`display ${styles.title}`}><Rich text={JOIN.title} /></h2>
          <ul className={styles.perks}>{JOIN.perks.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
          <div id="join-form" className={styles.form}>
            <WaitlistForm source="join" variant="underline" placeholder="Your email" buttonLabel={JOIN.button} />
            <p className={styles.note}>{JOIN.note}</p>
          </div>
          <div className={styles.footer}>
            <div className={styles.person}>
              {photo.src && <Image src={photo.src} alt={`Portrait of ${sig.name}`} width={56} height={56} className={styles.thumb} />}
              <div><b>{sig.name}</b><span>{sig.role}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
