import type { CSSProperties } from "react";

/**
 * Staggered rolling label for buttons: on hover / keyboard focus each letter rolls up
 * and its copy rolls in from below, one letter after another. Pure CSS (see .roll in globals.css).
 * The real text stays in the DOM once (read by screen readers, search engines and copy-paste);
 * the letters are drawn by ::before / ::after from data-c, so nothing is duplicated.
 */
export function RollText({ children }: { children: string }) {
  let i = 0;
  const words = children.split(" ");
  return (
    <span className="roll">
      <span className="visually-hidden">{children}</span>
      <span className="roll-chars" aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi} className="roll-w">
            {Array.from(w).map((c) => {
              const n = i++;
              return <span key={n} className="roll-c" data-c={c} style={{ "--i": n } as CSSProperties} />;
            })}
            {wi < words.length - 1 && <span className="roll-c" data-c={" "} style={{ "--i": i++ } as CSSProperties} />}
          </span>
        ))}
      </span>
    </span>
  );
}
