import Link from "next/link";

/**
 * Body text from lib/guides.ts:
 *   [words](/path) → link (next/link for internal paths)
 *   **words**      → bold
 */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) return link[2].startsWith("/") ? <Link key={i} href={link[2]}>{link[1]}</Link> : <a key={i} href={link[2]} rel="noopener">{link[1]}</a>;
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return <strong key={i}><Inline text={part.slice(2, -2)} /></strong>;
        return part;
      })}
    </>
  );
}
