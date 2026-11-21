"use client";

import { useState } from "react";
import { useLang } from "./Lang";
import type { GuideToolName } from "@/lib/guides";
import { CheckBand } from "@/components/sections/BalanceCheck";
import styles from "./GuideTool.module.css";
import { RollText } from "@/components/ui/RollText";

/** Interactive tools inside guides. The calculators keep their numbers in the browser; the Wheel of Life one is the Life Balance Check (it can email the result). */
export function GuideTool({ name }: { name: GuideToolName }) {
  // the Wheel of Life "calculator" is the site's one Life Balance Check: the same band and step-by-step modal as on the home page
  if (name === "wheel-calculator") return <CheckBand compact />;
  if (name === "burnout-check") return <BurnoutCheck />;
  if (name === "hours-calculator") return <HoursCalculator />;
  return <WheelTemplate />;
}

const TEXT = {
  en: {
    signs: [
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
    ],
    few: "Few warning signs. Keep an eye on them with a short weekly check-in.",
    several: "Several warning signs. Start with steps 1 and 2 below this week: make it visible and protect your sleep.",
    many: "Many warning signs. Take this seriously: follow the steps below and talk to a doctor or a mental health professional.",
    burnoutTitle: "Burnout self-check: 12 signs",
    burnoutHint: "Tick each statement that has been true for you most weeks over the last month.",
    of12: (n: number) => `${n} of 12.`,
    burnoutNote: "This is a reflection tool, not a diagnosis. Your answers stay in your browser.",
    hoursTitle: "Where do your 168 hours go?",
    hoursHint: "Every week has 168 hours. Fill in your usual numbers to see what's really left for the rest of your life.",
    work: "Work, including email after hours", commute: "Commute", sleep: "Sleep", admin: "Chores, errands and life admin",
    hWeek: "h / week", hWorkday: "h / workday", hNight: "h / night",
    free: (f: string) => `${f} free hours a week`,
    perDay: (d: string) => `, about ${d} a day, for health, people, rest, growth and meaning.`,
    split: (e: string) => ` Split evenly across those 5 areas, that's ${e} hours each.`,
    hoursNote: "The question isn't whether you have time. It's which area of your life gets it. Your numbers stay in your browser.",
    templateTitle: "Free printable Wheel of Life template",
    templateHint: "A one-page PDF with the 6 areas of life, rings from 1 to 10 and a question for each area. Print it, colour in your scores and keep it to compare next month.",
    download: "Download the PDF (A4)",
  },
  uk: {
    signs: [
      "Я втомлений навіть після повноцінного сну",
      "Коли я зайнятий, першим скорочую сон",
      "Я часто хворію на початку відпустки",
      "Спорт непомітно зник із моїх тижнів",
      "Усе здається терміновим і нічого важливим",
      "Дрібні задачі здаються важкими й лежать днями",
      "Я цинічно ставлюся до роботи, яка колись була мені важлива",
      "Увечері я не можу відключитися від роботи",
      "Друзі перестали кликати мене кудись",
      "Хобі перетворилися на «колись»",
      "Я різкий із найближчими людьми",
      "Замість відпочинку я «вимикаюся» (стрічка, перекуси, серіали)",
    ],
    few: "Мало тривожних ознак. Стеж за ними за допомогою короткої щотижневої перевірки.",
    several: "Кілька тривожних ознак. Почни цього тижня з кроків 1 і 2 нижче: зроби це видимим і захисти свій сон.",
    many: "Багато тривожних ознак. Постався до цього серйозно: виконай кроки нижче й поговори з лікарем або фахівцем із ментального здоров’я.",
    burnoutTitle: "Самоперевірка на вигорання: 12 ознак",
    burnoutHint: "Познач кожне твердження, яке було правдою для тебе більшість тижнів за останній місяць.",
    of12: (n: number) => `${n} з 12.`,
    burnoutNote: "Це інструмент для рефлексії, а не діагноз. Твої відповіді залишаються в браузері.",
    hoursTitle: "Куди йдуть твої 168 годин?",
    hoursHint: "У кожному тижні 168 годин. Введи свої звичні цифри й подивись, скільки насправді лишається на решту життя.",
    work: "Робота, разом із поштою після роботи", commute: "Дорога", sleep: "Сон", admin: "Побут, справи й дрібниці",
    hWeek: "год / тиждень", hWorkday: "год / робочий день", hNight: "год / ніч",
    free: (f: string) => `${f} вільних годин на тиждень`,
    perDay: (d: string) => `, приблизно ${d} на день, на здоров’я, людей, відпочинок, розвиток і сенс.`,
    split: (e: string) => ` Якщо розділити порівну між цими 5 сферами, це ${e} год на кожну.`,
    hoursNote: "Питання не в тому, чи є в тебе час. А в тому, якій сфері життя він дістається. Твої цифри залишаються в браузері.",
    templateTitle: "Безкоштовний шаблон колеса життя для друку",
    templateHint: "PDF на одну сторінку з 6 сферами життя, кільцями від 1 до 10 і питанням для кожної сфери. Роздрукуй, зафарбуй свої оцінки й збережи, щоб порівняти наступного місяця.",
    download: "Завантажити PDF (A4)",
  },
};
const useText = () => TEXT[useLang()];

function BurnoutCheck() {
  const t = useText();
  const BURNOUT_SIGNS = t.signs;
  const [checked, setChecked] = useState<boolean[]>(() => BURNOUT_SIGNS.map(() => false));
  const count = checked.filter(Boolean).length;
  const band = count <= 3
    ? t.few
    : count <= 7
      ? t.several
      : t.many;
  return (
    <figure className={styles.tool} aria-labelledby="burnout-check-title">
      <p id="burnout-check-title" className={styles.title}>{t.burnoutTitle}</p>
      <p className={styles.hint}>{t.burnoutHint}</p>
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
      <p className={styles.score} role="status" aria-live="polite"><b>{t.of12(count)}</b> {band}</p>
      <figcaption className={styles.note}>{t.burnoutNote}</figcaption>
    </figure>
  );
}

function HoursCalculator() {
  const t = useText();
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
      <p id="hours-calc-title" className={styles.title}>{t.hoursTitle}</p>
      <p className={styles.hint}>{t.hoursHint}</p>
      <div className={styles.fields}>
        {field("work", t.work, t.hWeek)}
        {field("commute", t.commute, t.hWorkday, 0.25)}
        {field("sleep", t.sleep, t.hNight, 0.5)}
        {field("admin", t.admin, t.hWeek)}
      </div>
      <p className={styles.score} role="status" aria-live="polite">
        <b>{t.free(free.toFixed(1))}</b>{t.perDay((free / 7).toFixed(1))}
        {free > 0 && <>{t.split((free / 5).toFixed(1))}</>}
      </p>
      <figcaption className={styles.note}>{t.hoursNote}</figcaption>
    </figure>
  );
}

function WheelTemplate() {
  const t = useText();
  return (
    <figure className={styles.tool}>
      <p className={styles.title}>{t.templateTitle}</p>
      <p className={styles.hint}>{t.templateHint}</p>
      <a className={`btn ${styles.download}`} href="/downloads/wheel-of-life-template.pdf" download><RollText>{t.download}</RollText></a>
    </figure>
  );
}
