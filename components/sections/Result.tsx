import { getContent } from "@/lib/lang";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import { areaVars } from "@/components/ui/areaVars";
import styles from "./Result.module.css";

/** Line chart of the 4 weeks: the focus area and the Life Balance score, 0 to 10. Lines draw in on scroll (Motion: [data-draw]). */
function Chart({ weeks, focus, balance, focusLabel, balanceLabel }: { weeks: string[]; focus: number[]; balance: number[]; focusLabel: string; balanceLabel: string }) {
  // a 2-to-8 scale, so a month of change reads clearly; values stay out of each other's way (label on the far side of the other line)
  const W = 420, H = 230, L = 26, R = 16, T = 22, B = 30, LO = 2, HI = 8;
  const x = (i: number) => L + (i * (W - L - R)) / (weeks.length - 1);
  const y = (v: number) => T + ((HI - v) * (H - T - B)) / (HI - LO);
  const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));
  const above = (mine: number, other: number) => mine >= other;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img" aria-label={`${focusLabel}: ${focus.join(", ")}. ${balanceLabel}: ${balance.join(", ")}.`} data-draw>
      {[2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={y(v)} y2={y(v)} className={styles.grid} />
          <text x={L - 10} y={y(v) + 4} className={styles.axis} textAnchor="end">{v}</text>
        </g>
      ))}
      {weeks.map((w, i) => <text key={w} x={x(i)} y={H - 6} className={styles.axis} textAnchor="middle">{w}</text>)}
      <path d={line(balance)} className={styles.balanceLine} pathLength={1} />
      <path d={line(focus)} className={styles.focusLine} pathLength={1} data-draw-line />
      {balance.map((v, i) => <g key={`b${i}`} data-draw-point className={styles.pointBalance}><circle cx={x(i)} cy={y(v)} r={3.5} /><text x={x(i)} y={above(v, focus[i]) ? y(v) - 11 : y(v) + 19} textAnchor="middle">{fmt(v)}</text></g>)}
      {focus.map((v, i) => <g key={`f${i}`} data-draw-point className={styles.pointFocus}><circle cx={x(i)} cy={y(v)} r={4.5} /><text x={x(i)} y={above(v, balance[i]) ? y(v) - 12 : y(v) + 22} textAnchor="middle">{fmt(v)}</text></g>)}
    </svg>
  );
}

/** "After 4 weeks": an illustrative month, so the page shows what gets better, not only the problem. */
export async function Result() {
  const { c: { RESULT, AREAS } } = await getContent();
  const focusName = AREAS[RESULT.focus].short;
  return (
    <section id="result" className="section" aria-labelledby="result-title">
      <div className="container">
        <div className="section-head centered" data-reveal>
          <span className="label">{RESULT.label}</span>
          <h2 id="result-title" className="display h2"><Rich text={RESULT.title} /></h2>
          <p className="lede">{RESULT.lede}</p>
        </div>
        <div className={styles.board} data-reveal>
          <div className={styles.chartCard} style={areaVars(RESULT.focus)}>
            <div className={styles.legend}>
              <span className={styles.tag}>{RESULT.example}</span>
              <span className={styles.keyFocus}><i />{focusName}</span>
              <span className={styles.keyBalance}><i />{RESULT.balanceLabel}</span>
            </div>
            <Chart weeks={RESULT.weeks} focus={RESULT.focusScores} balance={RESULT.balance} focusLabel={focusName} balanceLabel={RESULT.balanceLabel} />
          </div>
          <div className={styles.wheels}>
            {[RESULT.before, RESULT.after].map((w, i) => (
              <figure key={w.label} className={`${styles.wheel} ${i ? styles.after : ""}`}>
                <Wheel scores={w.scores} size={150} label={`${w.label}: ${w.scores.join(", ")}`} />
                <figcaption>{w.label} · <b>{(w.scores.reduce((a, b) => a + b, 0) / w.scores.length).toFixed(1)}</b></figcaption>
              </figure>
            ))}
          </div>
          <ul className={styles.stats}>
            {RESULT.stats.map((s) => <li key={s.label}><b>{s.value}</b><span>{s.label}</span></li>)}
          </ul>
        </div>
        <p className={styles.note}>{RESULT.note}</p>
      </div>
    </section>
  );
}
