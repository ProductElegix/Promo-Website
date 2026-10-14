"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./ClarityConsent.module.css";

const KEY = "elegix_cookie_consent"; // "yes" | "no"

declare global {
  interface Window { clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }; gtag?: (...args: unknown[]) => void }
}

/** Loads the Clarity tag (the official snippet) and signals consent to it. */
function loadClarity(id: string) {
  if (window.clarity || document.getElementById("ms-clarity")) return;
  const w = window as Window;
  const q = function (...args: unknown[]) { (q.q = q.q || []).push(args); } as NonNullable<Window["clarity"]>;
  w.clarity = q;
  const t = document.createElement("script");
  t.id = "ms-clarity"; t.async = true; t.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(t);
  w.clarity("consent");
}

function read(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}
function save(v: "yes" | "no") {
  try { localStorage.setItem(KEY, v); } catch { /* storage blocked: ask again next visit */ }
}

/** Google Analytics Consent Mode: analytics cookies only after "Accept"; ads stay denied. */
function grantGoogle() {
  window.gtag?.("consent", "update", { analytics_storage: "granted" });
}

/** Small cookie banner: Clarity and GA cookies run only after "Accept". The choice is remembered in this browser. */
export function ClarityConsent({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const v = read();
    if (v === "yes") loadClarity(id);
    else if (v !== "no") setOpen(true);
  }, [id]);

  if (!open) return null;
  return (
    <div className={styles.banner} role="region" aria-label="Cookie preferences">
      <p>We use cookies to see how people use this site and improve it. <Link href="/privacy">Privacy Policy</Link></p>
      <div className={styles.actions}>
        <button type="button" className={styles.decline} onClick={() => { save("no"); setOpen(false); }}>Decline</button>
        <button type="button" className={styles.accept} onClick={() => { save("yes"); setOpen(false); loadClarity(id); grantGoogle(); }}>Accept</button>
      </div>
    </div>
  );
}
