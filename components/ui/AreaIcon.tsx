import type { AreaKey } from "@/lib/content";

const PATHS: Record<AreaKey, React.ReactNode> = {
  health: (
    <>
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" fill="currentColor" />
      <path d="M3.5 8.5h2l1.2-2.5 2 4.5 1.3-2h2.5" fill="none" stroke="var(--t, #fff)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  people: <path fill="currentColor" d="M8 14.2S1.5 10.4 1.5 5.9A3.4 3.4 0 0 1 8 4.3a3.4 3.4 0 0 1 6.5 1.6C14.5 10.4 8 14.2 8 14.2z" />,
  career: <path fill="currentColor" d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2a1.5 1.5 0 0 1 1.5 1.5V4H13a1.5 1.5 0 0 1 1.5 1.5v6.5A1.5 1.5 0 0 1 13 13.5H3A1.5 1.5 0 0 1 1.5 12V5.5A1.5 1.5 0 0 1 3 4h2.5z" />,
  growth: (
    <>
      <rect fill="currentColor" x="2" y="9" width="3" height="5" rx="1" />
      <rect fill="currentColor" x="6.5" y="5.5" width="3" height="8.5" rx="1" />
      <rect fill="currentColor" x="11" y="2" width="3" height="12" rx="1" />
    </>
  ),
  hobby: <path fill="currentColor" d="M8 1.5l1.9 4 4.4.5-3.3 3 .9 4.4L8 11.2l-3.9 2.2.9-4.4-3.3-3 4.4-.5z" />,
  meaning: (
    <>
      <circle fill="currentColor" cx="8" cy="6" r="4" />
      <rect fill="currentColor" x="2.5" y="11.5" width="11" height="2.5" rx="1.25" />
    </>
  ),
};

export function AreaIcon({ area, className }: { area: AreaKey; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      {PATHS[area]}
    </svg>
  );
}
