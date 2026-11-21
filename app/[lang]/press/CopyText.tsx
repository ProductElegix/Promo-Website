"use client";

import { useState } from "react";
import { track } from "@/lib/track";
import styles from "./press.module.css";
import { RollText } from "@/components/ui/RollText";

/** "Copy" button for a ready-made description; says "Copied" for a moment after a click. */
export function CopyText({ text, label, done, id }: { text: string; label: string; done: string; id: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      track("press_copy", { item: id });
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked: the text is still selectable */ }
  };
  return (
    <button type="button" className={`btn ghost ${styles.copy}`} onClick={copy} aria-live="polite">
      <RollText key={copied ? "done" : "label"}>{copied ? done : label}</RollText>
    </button>
  );
}
