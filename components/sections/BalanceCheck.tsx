"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link, { useContent, useLang, useUi } from "@/components/ui/Lang";
import { AREA_ORDER, type AreaKey } from "@/lib/content";
import { readAttribution } from "@/lib/attribution";
import { track } from "@/lib/track";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { areaVars } from "@/components/ui/areaVars";
import { Rich } from "@/components/ui/Rich";
import { CommunityNote } from "@/components/ui/CommunityNote";
import { Wheel } from "@/components/ui/Wheel";
import styles from "./BalanceCheck.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** the wheel shown on the page before anyone starts: an uneven life, so the idea reads at a glance */
const SAMPLE = [7, 5, 4, 6, 8, 3];
const START = 5;
const TOTAL = AREA_ORDER.length;

type Scores = Record<AreaKey, number>;
type Sent = { email: string; emailed: boolean; invited: boolean };

const freshScores = () => Object.fromEntries(AREA_ORDER.map((a) => [a, START])) as Scores;

/** Free Life Balance Check: the page shows the wheel and one button; the check itself runs in a modal, one area per step, then the result and the email. */
export function BalanceCheck() {
  const { CHECK } = useContent();
  const t = useUi();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function openCheck() {
    dialog.current?.showModal();
    setOpen(true);
    track("check_start");
  }

  return (
    <section id="check" className="section" aria-labelledby="check-title">
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.intro}>
            <span className="label">{CHECK.eyebrow}</span>
            <h2 id="check-title" className="display h2"><Rich text={CHECK.title} /></h2>
            <p className="lede">{CHECK.text}</p>
            <button type="button" className={`btn ${styles.open}`} onClick={openCheck} aria-haspopup="dialog">{CHECK.button}</button>
          </div>
          <button type="button" className={styles.wheelPanel} onClick={openCheck} tabIndex={-1} aria-hidden="true">
            <span className={styles.wheel}><Wheel scores={SAMPLE} size={300} /></span>
          </button>
        </div>
      </div>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby="check-step-title" onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
        {open && <CheckFlow onClose={() => dialog.current?.close()} closeLabel={t.close} />}
      </dialog>
    </section>
  );
}

function CheckFlow({ onClose, closeLabel }: { onClose: () => void; closeLabel: string }) {
  const { AREAS, CHECK, CONSENT } = useContent();
  const t = useUi();
  const lang = useLang();
  const [step, setStep] = useState(0); // 0..5 = areas, 6 = result + email
  const [scores, setScores] = useState<Scores>(freshScores);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<Sent | null>(null);
  const focusRef = useRef<HTMLElement>(null);

  // keep the page still behind the modal
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => { root.style.overflow = prev; };
  }, []);

  // each new step starts at the top, with focus on its main control
  useEffect(() => {
    focusRef.current?.closest("dialog")?.scrollTo({ top: 0 });
    focusRef.current?.focus({ preventScroll: true });
  }, [step, sent]);

  const rating = step < TOTAL;
  const area = rating ? AREA_ORDER[step] : null;
  // the wheel fills as they go: rated areas and the current one show, the rest stay empty
  const wheel = AREA_ORDER.map((a, i) => (i <= step ? scores[a] : 0));
  const values = AREA_ORDER.map((a) => scores[a]);
  const average = values.reduce((sum, n) => sum + n, 0) / values.length;
  const lowest = AREA_ORDER.reduce((low, a) => (scores[a] < scores[low] ? a : low), AREA_ORDER[0]);

  function go(next: number) {
    if (next === TOTAL) track("check_rated", { lowest, average: Number(average.toFixed(1)) });
    setStep(next);
  }

  function restart() {
    setScores(freshScores());
    setError("");
    setStep(0);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) { setError(t.invalidEmail); return; }
    const company = (new FormData(e.currentTarget).get("company") as string) || "";
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: "balance-check", scores, lang, company, consent: true, page: window.location.pathname, attribution: readAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; emailed?: boolean; invited?: boolean };
      if (!res.ok) throw new Error(data.error || t.checkFailed);
      track("generate_lead", { form: "balance-check" });
      setSent({ email: value, emailed: !!data.emailed, invited: !!data.invited });
    } catch (err) {
      setError(err instanceof Error ? err.message : t.checkFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.top}>
        <span className="label">{CHECK.eyebrow}</span>
        <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>
      </div>
      <div className={styles.progress} aria-hidden="true">
        {AREA_ORDER.map((a, i) => <span key={a} style={areaVars(a)} data-on={i < step || (i === step && rating) ? "" : undefined} />)}
      </div>

      <div className={styles.body}>
        <div className={styles.modalWheel}>
          <Wheel scores={wheel} size={260} label={t.ratingsWheel} />
        </div>

        {area ? (
          <div className={styles.step} key={area} style={areaVars(area)}>
            <span className={styles.count}>{step + 1} / {TOTAL}</span>
            <p className={styles.question}>{CHECK.question}</p>
            <h3 id="check-step-title" className={styles.area}>
              <span className={styles.icon} aria-hidden="true"><AreaIcon area={area} /></span>{AREAS[area].name}
            </h3>
            <p className={styles.desc}>{AREAS[area].description}</p>
            <div className={styles.scale}>
              <output className={styles.big} htmlFor="check-range">{scores[area]}<small>/10</small></output>
              <input ref={focusRef as React.RefObject<HTMLInputElement>} id="check-range" type="range" min={1} max={10} step={1} value={scores[area]}
                aria-label={AREAS[area].name} aria-valuetext={t.outOf10(scores[area])}
                onChange={(e) => setScores((s) => ({ ...s, [area]: Number(e.target.value) }))}
                onKeyDown={(e) => { if (e.key === "Enter") go(step + 1); }}
                style={{ ["--p" as string]: `${((scores[area] - 1) / 9) * 100}%` }} />
              <div className={styles.ends}><span>1 · {CHECK.low}</span><span>10 · {CHECK.high}</span></div>
            </div>
            <div className={styles.nav}>
              {step > 0 && <button type="button" className="btn ghost" onClick={() => go(step - 1)}>{CHECK.back}</button>}
              <button type="button" className="btn dark" onClick={() => go(step + 1)}>{step === TOTAL - 1 ? CHECK.finish : CHECK.next}</button>
            </div>
          </div>
        ) : (
          <div className={styles.step} style={areaVars(lowest)} role="status" aria-live="polite">
            <span className={styles.count}>{CHECK.result}</span>
            <b id="check-step-title" className={styles.score}>{average.toFixed(1)}<small>/10</small></b>
            <div className={styles.lowest}>
              <span className={styles.icon} aria-hidden="true"><AreaIcon area={lowest} /></span>
              <div><small>{CHECK.lowest}</small><b>{AREAS[lowest].name} · {scores[lowest]}/10</b></div>
            </div>
            {sent ? (
              <>
                <p className={styles.done} ref={focusRef as React.RefObject<HTMLParagraphElement>} tabIndex={-1}>
                  {sent.emailed ? CHECK.sent : CHECK.done} <b>{sent.email}</b>.
                </p>
                {sent.invited && <CommunityNote className={styles.done} />}
                <div className={styles.nav}><button type="button" className="btn dark" onClick={onClose}>{closeLabel}</button></div>
              </>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate data-clarity-mask="true">
                <label htmlFor="email-check" className={styles.emailTitle}>{CHECK.emailTitle}</label>
                <p className={styles.emailNote}>{CHECK.emailNote}</p>
                <div className={styles.submit}>
                  <input ref={focusRef as React.RefObject<HTMLInputElement>} id="email-check" type="email" inputMode="email" autoComplete="email" placeholder={t.yourEmail} value={email}
                    onChange={(e) => setEmail(e.target.value)} required aria-describedby="check-status" />
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
                  <button type="submit" className="btn lime" disabled={busy}>{busy ? t.sending : CHECK.submit}</button>
                </div>
                <p className={styles.consent}>{CONSENT.before} <Link href="/privacy">{CONSENT.link}</Link>{CONSENT.after}</p>
                <p id="check-status" className={styles.error} role="status" aria-live="polite">{error}</p>
                <div className={styles.nav}>
                  <button type="button" className="btn ghost" onClick={() => setStep(TOTAL - 1)}>{CHECK.back}</button>
                  <button type="button" className={styles.textBtn} onClick={restart}>{CHECK.restart}</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
