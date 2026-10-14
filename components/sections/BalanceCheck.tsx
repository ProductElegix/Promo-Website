"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { AREAS, AREA_ORDER, CHECK, CONSENT, type AreaKey } from "@/lib/content";
import { readAttribution } from "@/lib/attribution";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import styles from "./BalanceCheck.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Result = { average: number; lowest: AreaKey; email: string; emailed: boolean };

export function BalanceCheck() {
  const [scores, setScores] = useState<Record<AreaKey, number>>(
    () => Object.fromEntries(AREA_ORDER.map((a) => [a, 5])) as Record<AreaKey, number>,
  );
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) { setError("Enter a valid email, like name@example.com."); return; }
    const company = (new FormData(e.currentTarget).get("company") as string) || "";
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: "balance-check", scores, company, consent: true, page: window.location.pathname, attribution: readAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; emailed?: boolean };
      if (!res.ok) throw new Error(data.error || "We couldn't save your check. Please try again.");
      const values = AREA_ORDER.map((a) => scores[a]);
      const average = values.reduce((sum, n) => sum + n, 0) / values.length;
      const lowest = AREA_ORDER.reduce((low, a) => (scores[a] < scores[low] ? a : low), AREA_ORDER[0]);
      setResult({ average, lowest, email: value, emailed: !!data.emailed });
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't save your check. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="check" className="section" aria-labelledby="check-title">
      <div className="container">
        <div className={styles.card} data-reveal>
          <div className={styles.intro}>
            <span className="label">{CHECK.eyebrow}</span>
            <h2 id="check-title" className="display h2"><Rich text={CHECK.title} /></h2>
            <p className="lede">{CHECK.text}</p>
            <div className={styles.wheel}><Wheel scores={AREA_ORDER.map((a) => scores[a])} size={180} label="Your ratings as a wheel of life" /></div>
          </div>

          {result ? (
            <div className={styles.result} role="status" aria-live="polite">
              <span className={styles.resultLabel}>{CHECK.result}</span>
              <b className={styles.resultValue}>{result.average.toFixed(1)}<small>/10</small></b>
              <div className={styles.lowest} style={areaVars(result.lowest)}>
                <span className={styles.icon} aria-hidden="true"><AreaIcon area={result.lowest} /></span>
                <div><small>{CHECK.lowest}</small><b>{AREAS[result.lowest].name} · {scores[result.lowest]}/10</b></div>
              </div>
              <p className={styles.done}>{result.emailed ? CHECK.sent : CHECK.done} <b>{result.email}</b>.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <fieldset className={styles.sliders}>
                <legend>{CHECK.question}</legend>
                {AREA_ORDER.map((a) => (
                  <label key={a} className={styles.slider} style={areaVars(a)}>
                    <span className={styles.name}><span className={styles.icon} aria-hidden="true"><AreaIcon area={a} /></span>{AREAS[a].short}</span>
                    <input type="range" min={1} max={10} step={1} value={scores[a]}
                      onChange={(e) => setScores((s) => ({ ...s, [a]: Number(e.target.value) }))}
                      aria-valuetext={`${scores[a]} out of 10`} style={{ ["--p" as string]: `${((scores[a] - 1) / 9) * 100}%` }} />
                    <output className={styles.value}>{scores[a]}</output>
                  </label>
                ))}
              </fieldset>
              <div className={styles.submit}>
                <label htmlFor="email-check" className="visually-hidden">Email</label>
                <input id="email-check" type="email" inputMode="email" autoComplete="email" placeholder="Your email" value={email}
                  onChange={(e) => setEmail(e.target.value)} required aria-describedby="check-status" />
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
                <button type="submit" className="btn" disabled={busy}>{busy ? "Sending…" : CHECK.button}</button>
              </div>
              <p className={styles.consent}>{CONSENT.before} <Link href="/privacy">{CONSENT.link}</Link>{CONSENT.after}</p>
              <p id="check-status" className={styles.error} role="status" aria-live="polite">{error}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
