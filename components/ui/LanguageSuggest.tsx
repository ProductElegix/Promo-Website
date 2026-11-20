"use client";

import { useEffect, useState } from "react";
import { localePath, LANG_CHOICE_KEY, UK_VISIBLE } from "@/lib/i18n";
import { useLang, usePlainPath } from "./Lang";
import styles from "./LanguageSuggest.module.css";

/** A Ukrainian reader: the browser asks for Ukrainian, or for Russian from a Ukrainian time zone. */
function prefersUkrainian() {
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) => l.toLowerCase());
  if (langs.some((l) => l.startsWith("uk"))) return true;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return langs[0]?.startsWith("ru") && (tz === "Europe/Kyiv" || tz === "Europe/Kiev");
}

/**
 * On an English page, offers the Ukrainian version once to readers whose browser prefers Ukrainian.
 * Never redirects by itself (search engines and people who chose English keep the English page).
 * Either answer is remembered, as is any choice made in the EN / UA switch.
 */
export function LanguageSuggest() {
  const lang = useLang();
  const path = usePlainPath();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lang !== "en" || !UK_VISIBLE) return;
    let chosen: string | null = null;
    try { chosen = localStorage.getItem(LANG_CHOICE_KEY); } catch { /* storage blocked */ }
    if (!chosen && prefersUkrainian()) setOpen(true);
  }, [lang]);

  if (!open) return null;
  const remember = (l: "en" | "uk") => { try { localStorage.setItem(LANG_CHOICE_KEY, l); } catch { /* storage blocked */ } };
  return (
    <div className={styles.banner} role="region" aria-label="Мова сайту" lang="uk">
      <p>Цей сайт є українською.</p>
      <div className={styles.actions}>
        <button type="button" className={styles.stay} onClick={() => { remember("en"); setOpen(false); }}>Залишитися англійською</button>
        <a className={styles.go} href={localePath("uk", path)} hrefLang="uk" onClick={() => remember("uk")}>Українською</a>
      </div>
    </div>
  );
}
