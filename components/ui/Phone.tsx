import type { MediaSlot } from "@/lib/content";
import { Media } from "./Media";
import styles from "./Phone.module.css";

export function Phone({ screen, className = "", priority = false }: { screen: MediaSlot; className?: string; priority?: boolean }) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <div className={styles.screen}>
        <Media media={screen} tone="dark" fill metaTop sizes="300px" priority={priority} />
        <span className={styles.island} aria-hidden="true" />
      </div>
    </div>
  );
}
