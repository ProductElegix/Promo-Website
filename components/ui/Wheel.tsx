import { AREA_ORDER } from "@/lib/content";

type Props = { scores: number[]; size?: number; ring?: string; className?: string; label?: string };

/** Wheel of Life: 6 areas x 10 rings, filled up to each area's score. */
export function Wheel({ scores, size = 160, ring = "#e3e7e3", className, label }: Props) {
  const R0 = 10, R1 = 50, n = AREA_ORDER.length;
  const pt = (r: number, a: number) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
  const cells: React.ReactNode[] = [];
  AREA_ORDER.forEach((area, i) => {
    const span = (2 * Math.PI) / n;
    const a1 = -Math.PI / 2 + i * span + 0.04, a2 = a1 + span - 0.08;
    for (let s = 0; s < 10; s++) {
      const r1 = R0 + ((R1 - R0) * s) / 10 + 0.5, r2 = R0 + ((R1 - R0) * (s + 1)) / 10 - 0.5;
      cells.push(
        <path key={`${area}-${s}`} fill={s < scores[i] ? `var(--${area}-s)` : ring}
          d={`M${pt(r2, a1)}A${r2} ${r2} 0 0 1 ${pt(r2, a2)}L${pt(r1, a2)}A${r1} ${r1} 0 0 0 ${pt(r1, a1)}Z`} />
      );
    }
  });
  return (
    <svg data-wheel viewBox="-52 -52 104 104" width={size} height={size} className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {cells}
    </svg>
  );
}
