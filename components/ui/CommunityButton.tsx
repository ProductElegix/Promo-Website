import { COMMUNITY } from "@/lib/content";

/** "Join the Telegram community" button; renders nothing until COMMUNITY.url is set in lib/content.ts. */
export function CommunityButton({ tone = "light", withText = false }: { tone?: "light" | "dark"; withText?: boolean }) {
  if (!COMMUNITY.url) return null;
  return (
    <div style={{ display: "grid", gap: 8, justifyItems: "inherit" }}>
      {withText && <p style={{ fontSize: "0.9rem", opacity: 0.85, margin: 0 }}>{COMMUNITY.text}</p>}
      <a href={COMMUNITY.url} target="_blank" rel="noopener" className={`btn ${tone === "dark" ? "lime" : ""}`} data-community-link style={{ whiteSpace: "normal", textAlign: "center", maxWidth: "100%" }}>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
          <path d="M21.9 4.3 18.6 19.9c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1 9.3-8.4c.4-.4-.1-.6-.6-.2L5.9 13.4 1 11.9c-1.1-.3-1.1-1.1.2-1.6L20.5 2.9c.9-.3 1.7.2 1.4 1.4Z" />
        </svg>
        {COMMUNITY.button}
      </a>
    </div>
  );
}
