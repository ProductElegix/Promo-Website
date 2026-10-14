import type { ReactNode } from "react";
import type { MediaSlot } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Phone } from "@/components/ui/Phone";
import { Rich } from "@/components/ui/Rich";
import styles from "./Hero.module.css";

type Props = {
  id: string;
  media: MediaSlot;
  eyebrow: string;
  title: string;
  lede: string;
  /** app screenshot shown in the phone peeking up from the bottom */
  screen: MediaSlot;
  /** form or buttons under the lede */
  children: ReactNode;
  /** optional glass card, shown only where the phone is hidden (tablet widths) */
  card?: ReactNode;
};

/** Full-bleed photo hero with a white headline and the app peeking in: used on the home and About pages. */
export function PhotoHero({ id, media, eyebrow, title, lede, screen, children, card }: Props) {
  return (
    <section className={`on-dark ${styles.hero}`} aria-labelledby={id}>
      <div className={`grain ${styles.frame}`}>
        <div className={styles.photo}><Media media={media} tone="dark" fill priority sizes="100vw" /></div>
        <div className={`${styles.atmo} ${media.src ? styles.onPhoto : ""}`} aria-hidden="true" />
        <div className={styles.content}>
          <span className={`glass ${styles.eyebrow}`}>{eyebrow}</span>
          <h1 id={id} className={`display ${styles.title}`}><Rich text={title} /></h1>
          <p className={styles.lede}>{lede}</p>
          {children}
        </div>
        <div className={styles.device}><Phone screen={screen} priority className={styles.phone} /></div>
        {card}
      </div>
    </section>
  );
}

export { styles as heroStyles };
