"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/track";
import styles from "./Article.module.css";

/** End of a guide: "Was this helpful?" (a GA4 event, no form) and share buttons, with the phone's own share sheet where there is one. */
export function ArticleActions({ slug, title, url }: { slug: string; title: string; url: string }) {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  const [copied, setCopied] = useState(false);
  const [native, setNative] = useState(false);
  useEffect(() => { setNative(typeof navigator !== "undefined" && "share" in navigator); }, []);

  const answer = (v: "yes" | "no") => { setVote(v); track("guide_feedback", { guide: slug, helpful: v }); };
  const shared = (via: string) => track("share", { method: via, content_type: "guide", item_id: slug });

  async function copy() {
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); shared("copy"); } catch { /* clipboard blocked: the links below still work */ }
  }
  async function share() {
    try { await navigator.share({ title, url }); shared("native"); } catch { /* cancelled */ }
  }

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}` },
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];

  return (
    <div className={styles.actions}>
      <div className={styles.helpful} aria-live="polite">
        {vote ? (
          <p>{vote === "yes" ? "Thanks! Glad it helped." : "Thanks. Tell us what was missing at hello@elegix.net and we'll improve it."}</p>
        ) : (
          <>
            <p>Was this guide helpful?</p>
            <div className={styles.actionRow}>
              <button type="button" className={styles.actionBtn} onClick={() => answer("yes")}>Yes</button>
              <button type="button" className={styles.actionBtn} onClick={() => answer("no")}>Not really</button>
            </div>
          </>
        )}
      </div>
      <div className={styles.share}>
        <p>Share this guide</p>
        <div className={styles.actionRow}>
          {native && <button type="button" className={styles.actionBtn} onClick={share}>Share…</button>}
          <button type="button" className={styles.actionBtn} onClick={copy}>{copied ? "Link copied" : "Copy link"}</button>
          {links.map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noopener" className={styles.actionBtn} onClick={() => shared(l.name.toLowerCase())}>{l.name}</a>
          ))}
        </div>
      </div>
    </div>
  );
}
