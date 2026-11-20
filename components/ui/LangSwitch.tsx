"use client";

import { localePath, LANG_CHOICE_KEY, UK_VISIBLE, type Lang } from "@/lib/i18n";
import { useLang, usePlainPath, useUi } from "./Lang";

const LABEL: Record<Lang, string> = { en: "EN", uk: "UA" };

/**
 * EN / UA switch: the same page in the other language. A plain link (full page load), because the two
 * languages are separate root layouts with their own <html lang>. Remembers the choice for the language banner.
 */
export function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const path = usePlainPath();
  const t = useUi();
  if (!UK_VISIBLE && lang === "en") return null;
  const remember = (l: Lang) => { try { localStorage.setItem(LANG_CHOICE_KEY, l); } catch { /* storage blocked */ } };
  return (
    <span className={`lang-switch ${className}`} role="group" aria-label={t.language}>
      {(["en", "uk"] as const).map((l) => l === lang
        ? <span key={l} aria-current="true" lang={l}>{LABEL[l]}</span>
        : <a key={l} href={localePath(l, path)} hrefLang={l} lang={l} onClick={() => remember(l)}>{LABEL[l]}</a>)}
    </span>
  );
}
