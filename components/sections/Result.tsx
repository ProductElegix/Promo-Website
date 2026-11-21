import { getContent } from "@/lib/lang";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { areaVars } from "@/components/ui/areaVars";
import styles from "./Result.module.css";

/** A smooth path through the points (Catmull-Rom as cubic Béziers), so the month reads as one movement. */
function smooth(pts: [number, number][]) {
  return pts.map(([x, y], i) => {
    if (!i) return `M${x.toFixed(1)} ${y.toFixed(1)}`;
    const [x0, y0] = pts[i - 2] ?? pts[i - 1], [x1, y1] = pts[i - 1], [x3, y3] = pts[i + 1] ?? [x, y];
    const c1 = [x1 + (x - x0) / 6, y1 + (y - y0) / 6], c2 = [x - (x3 - x1) / 6, y - (y3 - y1) / 6];
    return `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join("");
}

/** The 4 weeks: the focus area as a filled curve, the Life Balance score as a quiet dashed line. Draws in on scroll (Motion: [data-draw]). */
function Chart({ weeks, focus, balance, focusLabel, balanceLabel }: { weeks: string[]; focus: number[]; balance: number[]; focusLabel: string; balanceLabel: string }) {
  const W = 560, H = 260, L = 8, R = 8, T = 24, B = 34, LO = 1, HI = 9;
  const x = (i: number) => L + (i * (W - L - R)) / (weeks.length - 1);
  const y = (v: number) => T + ((HI - v) * (H - T - B)) / (HI - LO);
  const f = focus.map((v, i) => [x(i), y(v)] as [number, number]);
  const b = balance.map((v, i) => [x(i), y(v)] as [number, number]);
  const area = `${smooth(f)}L${x(weeks.length - 1)} ${H - B}L${x(0)} ${H - B}Z`;
  const last = focus.length - 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-label={`${focusLabel}: ${focus.join(", ")}. ${balanceLabel}: ${balance.join(", ")}.`} data-draw>
      <defs>
        <linearGradient id="result-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--s)", stopOpacity: .38 }} />
          <stop offset="1" style={{ stopColor: "var(--s)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      {weeks.map((w, i) => (
        <g key={w}>
          <line x1={x(i)} x2={x(i)} y1={T - 8} y2={H - B} className={styles.grid} />
          <text x={x(i)} y={H - 10} className={styles.axis} textAnchor={i === 0 ? "start" : i === last ? "end" : "middle"}>{w}</text>
        </g>
      ))}
      <path d={area} fill="url(#result-fill)" data-draw-point />
      <path d={smooth(b)} className={styles.balanceLine} />
      <path d={smooth(f)} className={styles.focusLine} pathLength={1} data-draw-line />
      {focus.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={i === last ? 6 : 4} className={i === last ? styles.dotEnd : styles.dot} data-draw-point />
      ))}
      <circle cx={x(last)} cy={y(focus[last])} r={14} className={styles.halo} data-draw-point />
    </svg>
  );
}

const avg = (s: number[]) => s.reduce((a, b) => a + b, 0) / s.length;

/** "After 4 weeks": an illustrative month on one dark panel, so the page shows what gets better, not only the problem.
 *  Left: the focus area's number and its curve; right: the wheel before and after, and three facts. */
export async function Result() {
  const { lang, c: { RESULT, AREAS } } = await getContent();
  const focusName = AREAS[RESULT.focus].short;
  const first = RESULT.focusScores[0], last = RESULT.focusScores[RESULT.focusScores.length - 1];
  const num = (v: number) => (lang === "uk" ? v.toFixed(1).replace(".", ",") : v.toFixed(1));
  return (
    <section id="result" className="section" aria-labelledby="result-title">
      <div className="container">
        <div className="section-head centered" data-reveal>
          <span className="label">{RESULT.label}</span>
          <h2 id="result-title" className="display h2"><Rich text={RESULT.title} /></h2>
          <p className="lede">{RESULT.lede}</p>
        </div>
        <div className={`on-dark ${styles.panel}`} data-theme="dark" data-reveal>
          <div className={styles.main} style={areaVars(RESULT.focus)}>
            <div className={styles.head}>
              <div className={styles.focus}>
                <span className={styles.focusName}><span className={styles.icon}><AreaIcon area={RESULT.focus} /></span>{focusName}</span>
                <span className={styles.big}>{last}<small>/10</small></span>
                <span className={styles.delta}><b>+{last - first}</b> {RESULT.inWeeks}</span>
              </div>
              <div className={styles.legend}>
                <span className={styles.keyFocus}><i />{focusName}</span>
                <span className={styles.keyBalance}><i />{RESULT.balanceLabel}</span>
              </div>
            </div>
            <Chart weeks={RESULT.weeks} focus={RESULT.focusScores} balance={RESULT.balance} focusLabel={focusName} balanceLabel={RESULT.balanceLabel} />
          </div>
          <div className={styles.side}>
            <p className={styles.sideTitle}>{RESULT.monthLabel}</p>
            <div className={styles.wheels}>
              {[RESULT.before, RESULT.after].map((w, i) => (
                <figure key={w.label} className={`${styles.wheel} ${i ? styles.after : ""}`}>
                  <Wheel scores={w.scores} size={150} ring="rgba(255,255,255,.08)" label={`${w.label}: ${w.scores.join(", ")}`} />
                  <figcaption><span>{w.label}</span><b>{num(avg(w.scores))}</b></figcaption>
                </figure>
              ))}
            </div>
            <ul className={styles.stats}>
              {RESULT.stats.map((s) => <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>)}
            </ul>
          </div>
        </div>
        <p className={styles.note}>{RESULT.note}</p>
      </div>
    </section>
  );
}
