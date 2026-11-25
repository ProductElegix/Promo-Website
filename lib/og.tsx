import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { AREA_ORDER, type AreaKey } from "@/lib/content";
import { contentOf } from "@/lib/l10n";
import type { Lang } from "@/lib/i18n";

export const OG_SIZE = { width: 1200, height: 630 };

/** Area colours from globals.css (--<area>-s / --<area>-t), for the share card's tag and wheel. */
const AREA_COLORS: Record<AreaKey, [string, string]> = {
  health: ["#009a44", "#d5f45e"], people: ["#d50524", "#feb5a6"], career: ["#dd4903", "#ffe254"],
  growth: ["#0f14da", "#a8dffe"], hobby: ["#ff5e3b", "#ffd7ab"], meaning: ["#6709c7", "#eaa7fe"],
};

/** Site tokens from globals.css, the same ones as app/opengraph-image.jpg (scripts/og/share-image.html). */
const C = { frame: "#2a2a2a", cream: "#e9e9e5", ink: "#111", muted: "#66665f", paper: "#f2f2f0", lime: "#d5f45e", black: "#000" };

const font = () => readFile(join(process.cwd(), "assets/fonts/InterTight-Medium.ttf"));
const logo = async () => `data:image/svg+xml;base64,${(await readFile(join(process.cwd(), "public/press/elegix-logo-dark-green.svg"))).toString("base64")}`;

/** The Wheel of Life (6 areas x 10 rings, as components/ui/Wheel.tsx): the guide's areas in their colour, the rest in grey. */
function wheel(areas: AreaKey[]) {
  const scores = [8, 5, 6, 4, 7, 9];
  const all = areas.length === 0;
  const R0 = 10, R1 = 50, n = AREA_ORDER.length, span = (2 * Math.PI) / n;
  const pt = (r: number, a: number) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
  let d = "";
  AREA_ORDER.forEach((area, i) => {
    const a1 = -Math.PI / 2 + i * span + 0.04, a2 = a1 + span - 0.08;
    const on = all || areas.includes(area);
    for (let s = 0; s < 10; s++) {
      const r1 = R0 + ((R1 - R0) * s) / 10 + 0.5, r2 = R0 + ((R1 - R0) * (s + 1)) / 10 - 0.5;
      const fill = s < (on && !all ? 10 : scores[i]) ? (on ? AREA_COLORS[area][0] : "#4a4a47") : "#262626";
      d += `<path fill="${fill}" d="M${pt(r2, a1)}A${r2} ${r2} 0 0 1 ${pt(r2, a2)}L${pt(r1, a2)}A${r1} ${r1} 0 0 0 ${pt(r1, a1)}Z"/>`;
    }
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -52 104 104" width="600" height="600">${d}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

const caps = { fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase" as const, lineHeight: 1 };

/** The share card for a guide or life area page, in the site style: cream page in the charcoal frame, title on the left, the area wheel on a black card. */
export async function articleOgImage(g: { title: string; minutes: number; media: { src?: string }; areas?: AreaKey[]; kind: string }, lang: Lang = "en") {
  const AREAS = contentOf(lang).AREAS;
  const [inter, mark] = await Promise.all([font(), logo()]);
  const areas = g.areas ?? [];
  const len = g.title.length;
  const size = len <= 32 ? 76 : len <= 56 ? 64 : len <= 80 ? 54 : 46;
  const read = `${g.minutes} ${lang === "uk" ? "хв читання" : "min read"}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.frame, padding: 10, fontFamily: "Inter Tight" }}>
        <div style={{ flex: 1, display: "flex", background: C.cream, borderRadius: 26, overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "52px 40px 48px 58px" }}>
            <img src={mark} width={149} height={40} style={{ width: 149, height: 40 }} />
            <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto" }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div style={{ ...caps, display: "flex", alignItems: "center", gap: 9, padding: "9px 12px 8px", borderRadius: 7, background: C.ink, color: C.paper }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: C.lime }} />
                  {g.kind}
                </div>
                {areas.slice(0, 2).map((a) => (
                  <div key={a} style={{ ...caps, display: "flex", alignItems: "center", gap: 9, padding: "9px 12px 8px", borderRadius: 7, background: AREA_COLORS[a][1], color: C.ink }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: AREA_COLORS[a][0] }} />
                    {AREAS[a].short}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", marginTop: 24, fontSize: size, lineHeight: 1, letterSpacing: "-0.045em", color: C.ink }}>{g.title}</div>
            </div>
            <div style={{ ...caps, display: "flex", gap: 34, color: C.muted }}>
              <div style={{ display: "flex", color: C.ink }}>elegix.net</div>
              <div style={{ display: "flex" }}>{read}</div>
            </div>
          </div>
          <div style={{ width: 400, margin: "14px 14px 14px 0", borderRadius: 20, background: C.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={wheel(areas)} width={300} height={300} style={{ width: 300, height: 300 }} />
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Inter Tight", data: inter, weight: 500, style: "normal" }] },
  );
}
