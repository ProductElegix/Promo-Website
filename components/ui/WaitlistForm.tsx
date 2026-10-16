"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CONSENT } from "@/lib/content";
import { CommunityNote } from "./CommunityNote";
import { readAttribution } from "@/lib/attribution";
import styles from "./WaitlistForm.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = {
  source: string;
  variant?: "underline" | "bar" | "glass";
  start?: string;
  placeholder?: string;
  buttonLabel?: string;
};

type Status = { kind: "idle" | "ok" | "err"; text: string };

export function WaitlistForm({ source, variant = "underline", start, placeholder = "Your email for early access", buttonLabel = "Join" }: Props) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [invited, setInvited] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setStatus({ kind: "err", text: "Enter a valid email, like name@example.com." });
      return;
    }
    const company = (new FormData(e.currentTarget).get("company") as string) || "";
    setBusy(true);
    setStatus({ kind: "idle", text: "" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, start, company, consent: true, page: window.location.pathname, attribution: readAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; emailed?: boolean; invited?: boolean };
      if (!res.ok) throw new Error(data.error || "We couldn't save your email. Please try again.");
      window.gtag?.("event", "generate_lead", { form: source });
      setStatus({ kind: "ok", text: data.emailed ? `You're on the list. We've sent a confirmation to ${value}.` : `You're on the list. We'll email ${value} when your spot opens.` });
      setInvited(!!data.invited);
      setEmail("");
    } catch (err) {
      setStatus({ kind: "err", text: err instanceof Error ? err.message : "We couldn't save your email. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const id = `email-${source}`;
  return (
    <div className={styles.wrap} data-clarity-mask="true">
      <form className={`${styles.form} ${styles[variant]}`} onSubmit={onSubmit} noValidate>
        <label htmlFor={id} className="visually-hidden">Email</label>
        <input id={id} type="email" inputMode="email" autoComplete="email" placeholder={placeholder}
          value={email} onChange={(e) => setEmail(e.target.value)} required aria-describedby={`${id}-status`} />
        {/* honeypot for bots */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="visually-hidden" aria-hidden="true" />
        <button type="submit" className={variant === "underline" ? "btn" : styles.barBtn} disabled={busy}>
          {busy ? "Joining…" : buttonLabel}
        </button>
      </form>
      <p className={styles.consent}>{CONSENT.before} <Link href="/privacy">{CONSENT.link}</Link>{CONSENT.after}</p>
      <p id={`${id}-status`} className={`${styles.msg} ${styles[status.kind]}`} role="status" aria-live="polite">{status.text}</p>
      {status.kind === "ok" && invited && <CommunityNote className={styles.community} />}
    </div>
  );
}
