/**
 * Renders copy from lib/content.ts:
 *   *word*   → accent word in muted gray (<em>)
 *   ==word== → word set in ink with a hairline underline (<mark class="hl">)
 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*|==[^=]+==)/).map((part, i) => {
        if (part.startsWith("==") && part.endsWith("==") && part.length > 4) return <mark key={i} className="hl">{part.slice(2, -2)}</mark>;
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        return part;
      })}
    </>
  );
}
