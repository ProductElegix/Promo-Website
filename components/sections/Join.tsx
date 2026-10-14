import Image from "next/image";
import Link from "next/link";
import { JOIN, TRUST } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Rich } from "@/components/ui/Rich";
import { StartPicker } from "./StartPicker";
import styles from "./Join.module.css";

/** Early access: a full-bleed photo with a cream panel overlapping it at the bottom right. */
export function Join() {
  const sig = JOIN.signature;
  const photo = TRUST.founder.media;
  return (
    <section id="join" className={styles.join} aria-labelledby="join-title">
      <div className={styles.stage}>
        <div className={styles.photo} data-parallax><Media media={JOIN.media} fill sizes="100vw" /></div>
        <div className={styles.panel} data-reveal>
          <span className="label">{JOIN.eyebrow}</span>
          <h2 id="join-title" className={`display ${styles.title}`}><Rich text={JOIN.title} /></h2>
          <ul className={styles.perks}>{JOIN.perks.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
          <div id="join-form" className={styles.form}><StartPicker /></div>
          <div className={styles.footer}>
            <div className={styles.person}>
              {photo.src && <Image src={photo.src} alt="" width={56} height={56} className={styles.thumb} />}
              <div><b>{sig.name}</b><span>{sig.role}</span></div>
            </div>
            <Link href={sig.link.href} className={styles.storyBtn}><span>{sig.link.label}</span><i aria-hidden="true">↗</i></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
