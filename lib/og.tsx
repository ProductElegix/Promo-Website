import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { AreaKey } from "@/lib/content";
import { contentOf } from "@/lib/l10n";
import type { Lang } from "@/lib/i18n";

export const OG_SIZE = { width: 1200, height: 630 };

/** Area colours from globals.css (--<area>-s / --<area>-t), for the share card's tag. */
const AREA_COLORS: Record<AreaKey, [string, string]> = {
  health: ["#009a44", "#d5f45e"], people: ["#d50524", "#feb5a6"], career: ["#dd4903", "#ffe254"],
  growth: ["#0f14da", "#a8dffe"], hobby: ["#ff5e3b", "#ffd7ab"], meaning: ["#6709c7", "#eaa7fe"],
};

const font = () => readFile(join(process.cwd(), "assets/fonts/InterTight-Medium.ttf"));

async function photo(src?: string) {
  if (!src) return null;
  const buf = await readFile(join(process.cwd(), "public", src));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

/** The share card for a guide or life area page: its photo, darkened, with the title and area tag on top. */
export async function articleOgImage(g: { title: string; minutes: number; media: { src?: string }; areas?: AreaKey[]; kind: string }, lang: Lang = "en") {
  const AREAS = contentOf(lang).AREAS;
  const [bg, inter] = await Promise.all([photo(g.media.src), font()]);
  const area = g.areas?.[0];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#111", fontFamily: "Inter Tight" }}>
        {bg && <img src={bg} width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />}
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", fontSize: 34, color: "#fff", letterSpacing: "-0.02em" }}>Elegix</div>
            <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: "#111", background: "#d5f45e", padding: "8px 12px 6px", borderRadius: 6 }}>{g.kind}</div>
            {area && (
              <div style={{ display: "flex", fontSize: 18, letterSpacing: "0.1em", textTransform: "uppercase", color: AREA_COLORS[area][1], background: AREA_COLORS[area][0], padding: "8px 12px 6px", borderRadius: 6 }}>{AREAS[area].short}</div>
            )}
          </div>
          <div style={{ display: "flex", fontSize: g.title.length > 70 ? 56 : 66, lineHeight: 1.05, letterSpacing: "-0.035em", color: "#fff", maxWidth: 900 }}>{g.title}</div>
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,.75)" }}>{`www.elegix.net · ${g.minutes} ${lang === "uk" ? "хв читання" : "min read"}`}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Inter Tight", data: await inter, weight: 500, style: "normal" }] },
  );
}
