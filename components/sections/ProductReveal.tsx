import { APP as APP_EN } from "@/lib/content";
import { getContent } from "@/lib/lang";
import { Phone } from "@/components/ui/Phone";
import { Phone3D } from "@/components/ui/Phone3D";
import { Words } from "./Opening";
import { ProductRevealMotion } from "./ProductRevealMotion";
import styles from "./ProductReveal.module.css";

/**
 * Second screen of the home page, inside the black opening: the "What is Elegix" statement lights up word by word,
 * then the phone with the real Life Area screen (in 3D once three.js loads) rises from below, turns to face you and three notes appear around it.
 * Scroll-scrubbed by ProductRevealMotion; without JavaScript or with reduced motion it's a plain stacked layout.
 */
export async function ProductReveal() {
  const { c: { OPENING, PRODUCT, APP } } = await getContent();
  const screen = (APP.screens[APP_EN.screens.findIndex((s) => s.label === PRODUCT.screen)] ?? APP.screens[0]).media;
  return (
    <div className={styles.reveal} data-product>
      <div className={styles.stage}>
        <div className={styles.head} data-product-head>
          <span className="label">{OPENING.statement.label}</span>
          <p className={styles.statement}><Words text={OPENING.statement.lead + OPENING.statement.rest} /></p>
        </div>
        <div className={styles.device} data-product-device>
          <div className={styles.phoneWrap} data-product-phone>
            <Phone screen={screen} className={styles.phone} />
            {screen.src && <Phone3D src={screen.src} sectionSelector="[data-product]" turn={[0.3, 0.72]} className={styles.phone3d} />}
          </div>
          <ul className={styles.notes}>
            {PRODUCT.callouts.map((n, i) => (
              <li key={n.title} className={`${styles.note} ${styles[`n${i + 1}`]}`} data-product-note>
                <b>{n.title}</b>
                <span>{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ProductRevealMotion />
    </div>
  );
}
