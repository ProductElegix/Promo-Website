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
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, icon: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z" /> },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, icon: <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77zm-1.08 16.18h1.7L7.4 4.73H5.58z" /> },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, icon: <path d="M21.5 4.1 18.4 19.3c-.23 1.03-.85 1.28-1.72.8l-4.75-3.5-2.3 2.2c-.25.26-.47.47-.96.47l.34-4.83 8.8-7.95c.38-.34-.08-.53-.6-.19L6.33 13.2 1.65 11.74c-1.02-.32-1.04-1.02.21-1.5L20.2 3.1c.85-.31 1.6.2 1.3 1z" /> },
    { name: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, icon: <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.55.12-.17.25-.64.8-.78.96-.14.17-.29.19-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.85 2.03 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.11-.22-.17-.47-.3z" /> },
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
        <p>Share</p>
        <div className={styles.actionRow}>
          {native && <button type="button" className={`${styles.iconBtn} ${styles.nativeShare}`} onClick={share} aria-label="Share" title="Share"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></svg></button>}
          <button type="button" className={styles.iconBtn} onClick={copy} aria-label={copied ? "Link copied" : "Copy link"} title={copied ? "Link copied" : "Copy link"}>
            {copied
              ? <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
              : <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>}
          </button>
          {links.map((l) => (
            <a key={l.name} href={l.href} target="_blank" rel="noopener" className={styles.iconBtn} aria-label={`Share on ${l.name}`} title={l.name} onClick={() => shared(l.name.toLowerCase())}>
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">{l.icon}</svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
