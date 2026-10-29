"use client";

import { useState } from "react";
import { AREAS, AREA_ORDER, type AreaKey } from "@/lib/content";
import type { GuideToolName } from "@/lib/guides";
import { Wheel } from "./Wheel";
import styles from "./GuideTool.module.css";

/** Interactive tools inside guides. Nothing here is sent anywhere: the numbers stay in the browser. */
export function GuideTool({ name }: { name: GuideToolName }) {
  if (name === "wheel-calculator") return <WheelCalculator />;
  if (name === "burnout-check") return <BurnoutCheck />;
  if (name === "hours-calculator") return <HoursCalculator />;
  return <WheelTemplate />;
}

const AREA_PAGE: Record<AreaKey, string> = {
  health: "/life-areas/health", people: "/life-areas/relationships", meaning: "/life-areas/spirituality",
  hobby: "/life-areas/leisure", growth: "/life-areas/personal-growth", career: "/life-areas/finance-and-career",
};

function WheelCalculator() {
  const [scores, setScores] = useState<Record<AreaKey, number>>(() => Object.fromEntries(AREA_ORDER.map((a) => [a, 5])) as Record<AreaKey, number>);
  const values = AREA_ORDER.map((a) => scores[a]);
  const average = values.reduce((s, n) => s + n, 0) / values.length;
  const lowest = AREA_ORDER.reduce((low, a) => (scores[a] < scores[low] ? a : low), AREA_ORDER[0]);
  const highest = AREA_ORDER.reduce((high, a) => (scores[a] > scores[high] ? a : high), AREA_ORDER[0]);
  const gap = scores[highest] - scores[lowest];
  return (
    <figure className={styles.tool} aria-labelledby="wheel-calc-title">
      <p id="wheel-calc-title" className={styles.title}>Wheel of Life calculator</p>
      <p className={styles.hint}>Rate each area from 0 to 10 for how satisfied you are with it right now. Your wheel updates as you go.</p>
      <div className={styles.split}>
        <div className={styles.sliders}>
          {AREA_ORDER.map((a) => (
            <label key={a} className={styles.slider}>
              <span>{AREAS[a].name}<b>{scores[a]}</b></span>
              <input type="range" min={0} max={10} value={scores[a]} style={{ accentColor: `var(--${a}-s)` }}
                onChange={(e) => setScores({ ...scores, [a]: Number(e.target.value) })} />
            </label>
          ))}
        </div>
        <div className={styles.result}>
          <Wheel scores={values} size={200} label={`Your Wheel of Life: average ${average.toFixed(1)} out of 10`} />
          <p><b>Average:</b> {average.toFixed(1)} / 10</p>
          <p><b>Lowest area:</b> <a href={AREA_PAGE[lowest]}>{AREAS[lowest].name}</a> ({scores[lowest]})</p>
          <p><b>Biggest gap:</b> {gap} points{gap >= 4 ? ", a bumpy wheel" : gap > 0 ? ", fairly even" : ", perfectly even"}</p>
        </div>
      </div>
      <figcaption className={styles.note}>Start with your lowest area: choose one small step for it this week. Your scores stay in your browser.</figcaption>
    </figure>
  );
}

const BURNOUT_SIGNS = [
  "I'm tired even after a full night's sleep",
  "Sleep is the first thing I cut when I'm busy",
  "I tend to get sick at the start of holidays",
  "Exercise has quietly disappeared from my weeks",
  "Everything feels urgent and nothing feels important",
  "Small tasks feel heavy and sit for days",
  "I feel cynical about work I used to care about",
  "I can't switch off from work in the evening",
  "Friends have stopped asking me to things",
  "Hobbies have become “someday”",
  "I'm short with the people closest to me",
  "I numb out (scrolling, snacks, TV) instead of resting",
];

function BurnoutCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => BURNOUT_SIGNS.map(() => false));
  const count = checked.filter(Boolean).length;
  const band = count <= 3
    ? "Few warning signs. Keep an eye on them with a short weekly check-in."
    : count <= 7
      ? "Several warning signs. Start with steps 1 and 2 below this week: make it visible and protect your sleep."
      : "Many warning signs. Take this seriously: follow the steps below and talk to a doctor or a mental health professional.";
  return (
    <figure className={styles.tool} aria-labelledby="burnout-check-title">
      <p id="burnout-check-title" className={styles.title}>Burnout self-check: 12 signs</p>
      <p className={styles.hint}>Tick each statement that has been true for you most weeks over the last month.</p>
      <ul className={styles.checks}>
        {BURNOUT_SIGNS.map((s, i) => (
          <li key={s}>
            <label>
              <input type="checkbox" checked={checked[i]} onChange={() => setChecked(checked.map((c, j) => (j === i ? !c : c)))} />
              <span>{s}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className={styles.score} role="status" aria-live="polite"><b>{count} of 12.</b> {band}</p>
      <figcaption className={styles.note}>This is a reflection tool, not a diagnosis. Your answers stay in your browser.</figcaption>
    </figure>
  );
}

function HoursCalculator() {
  const [h, setH] = useState({ work: 45, commute: 1, sleep: 7.5, admin: 12 });
  const free = Math.max(0, 168 - h.work - h.commute * 5 - h.sleep * 7 - h.admin);
  const field = (key: keyof typeof h, label: string, unit: string, step = 1) => (
    <label className={styles.field}>
      <span>{label}</span>
      <span className={styles.input}><input type="number" min={0} step={step} value={h[key]} onChange={(e) => setH({ ...h, [key]: Math.max(0, Number(e.target.value) || 0) })} />{unit}</span>
    </label>
  );
  return (
    <figure className={styles.tool} aria-labelledby="hours-calc-title">
      <p id="hours-calc-title" className={styles.title}>Where do your 168 hours go?</p>
      <p className={styles.hint}>Every week has 168 hours. Fill in your usual numbers to see what's really left for the rest of your life.</p>
      <div className={styles.fields}>
        {field("work", "Work, including email after hours", "h / week")}
        {field("commute", "Commute", "h / workday", 0.25)}
        {field("sleep", "Sleep", "h / night", 0.5)}
        {field("admin", "Chores, errands and life admin", "h / week")}
      </div>
      <p className={styles.score} role="status" aria-live="polite">
        <b>{free.toFixed(1)} free hours a week</b>, about {(free / 7).toFixed(1)} a day, for health, people, rest, growth and meaning.
        {free > 0 && <> Split evenly across those 5 areas, that's {(free / 5).toFixed(1)} hours each.</>}
      </p>
      <figcaption className={styles.note}>The question isn't whether you have time. It's which area of your life gets it. Your numbers stay in your browser.</figcaption>
    </figure>
  );
}

function WheelTemplate() {
  return (
    <figure className={styles.tool}>
      <p className={styles.title}>Free printable Wheel of Life template</p>
      <p className={styles.hint}>A one-page PDF with the 6 areas of life, rings from 1 to 10 and a question for each area. Print it, colour in your scores and keep it to compare next month.</p>
      <a className="btn" href="/downloads/wheel-of-life-template.pdf" download>Download the PDF (A4)</a>
    </figure>
  );
}
