import Image from "next/image";
import { getContent } from "@/lib/lang";
import { areaVars } from "@/components/ui/areaVars";
import { Rich } from "@/components/ui/Rich";
import { SpreadMotion } from "./SpreadMotion";
import styles from "./Spread.module.css";

/** Perspective "room" drawn as nested rectangles and converging lines, in a 100×100 box stretched to the stage. */
function Room() {
  const back = { x0: 30, y0: 26, x1: 70, y1: 74 };
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  // depth rings: closer rings are further apart, like a floor seen in perspective
  const rings = [0, 0.1, 0.22, 0.37, 0.56, 0.8, 1.1].map((d) => d / 1.1);
  const rects = rings.map((t) => ({ x0: lerp(back.x0, -6, t), y0: lerp(back.y0, -6, t), x1: lerp(back.x1, 106, t), y1: lerp(back.y1, 106, t) }));
  const cols = 8, rows = 6;
  const lines: [number, number, number, number][] = [];
  for (let i = 1; i < cols; i++) {
    const x = lerp(back.x0, back.x1, i / cols);
    lines.push([x, back.y0, x, back.y1]); // back wall
    lines.push([x, back.y0, lerp(-6, 106, i / cols), -6]); // ceiling
    lines.push([x, back.y1, lerp(-6, 106, i / cols), 106]); // floor
  }
  for (let j = 1; j < rows; j++) {
    const y = lerp(back.y0, back.y1, j / rows);
    lines.push([back.x0, y, back.x1, y]);
    lines.push([back.x0, y, -6, lerp(-6, 106, j / rows)]);
    lines.push([back.x1, y, 106, lerp(-6, 106, j / rows)]);
  }
  return (
    <svg className={styles.room} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" data-spread-room>
      {rects.map((r, i) => <rect key={i} x={r.x0} y={r.y0} width={r.x1 - r.x0} height={r.y1 - r.y0} />)}
      {lines.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} />)}
    </svg>
  );
}

/**
 * "Six areas. One life.": a pinned block. A stack of tilted photos rises from below into the middle of the screen,
 * then fans out to the corners around the headline while the visitor scrolls, and the page moves on.
 * As the block leaves the screen, the photos drift up at different speeds (parallax), as if at different depths.
 * Without JavaScript or with reduced motion the photos simply sit in their final places around the headline.
 */
export async function Spread() {
  const { c: { SPREAD, AREAS } } = await getContent();
  return (
    <section className={styles.spread} aria-labelledby="spread-title" data-spread>
      <div className={styles.stage}>
        <Room />
        <div className={styles.head} data-spread-head>
          <h2 id="spread-title" className={`display ${styles.title}`}><Rich text={SPREAD.title} /></h2>
          <p className={styles.text} data-spread-text>{SPREAD.text}</p>
        </div>
        <ul className={styles.photos}>
          {SPREAD.photos.map((p, i) => (
            <li key={p.src} className={`${styles.photo} ${styles[`p${i + 1}`]}`} style={areaVars(p.area)} data-spread-photo>
              <div data-spread-drift>
              <div className={styles.card}>
                <div className={styles.frame}>
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 767px) 40vw, 20vw" />
                </div>
                <span className={styles.tag}><i aria-hidden="true" />{AREAS[p.area].name}</span>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <SpreadMotion />
    </section>
  );
}
