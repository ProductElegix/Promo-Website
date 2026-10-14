# Elegix — landing site

Waitlist landing page for Elegix, the life balance tracker. Next.js 16 (App Router), TypeScript, CSS Modules. No UI library.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Configure the waitlist

Copy `.env.example` to `.env.local` and set `WAITLIST_WEBHOOK_URL`. Every signup is sent there as a JSON POST:

```json
{ "email": "name@example.com", "source": "hero", "start": "template", "joinedAt": "2026-10-14T01:00:00.000Z" }
```

Signups from the free balance check (`source: "balance-check"`) also carry the visitor's ratings, so you can send their score and a first step for the lowest area:

```json
{ "email": "name@example.com", "source": "balance-check", "start": null, "scores": { "health": 8, "people": 6, "career": 9, "growth": 4, "hobby": 2, "meaning": 5, "home": 7 }, "joinedAt": "…" }
```

Any service that accepts a webhook works: Formspree, Make, Zapier, a Supabase Edge Function, Google Sheets via Apps Script.

- In development without the variable, signups are logged to the terminal and the form shows success.
- In production without the variable, the form tells visitors the waitlist isn't open yet. Nothing is lost silently.
- A hidden honeypot field filters simple bots.

## Edit copy and images

All text and image slots live in `lib/content.ts`. In that file, `*word*` sets a word in italic serif, `==word==` highlights it in a small pill, and text in `[square brackets]` is a placeholder to fill in before launch (it shows on the page as-is).

Every image slot shows a hatched placeholder with a short brief of what belongs there (for example "Gym session, natural light"). To use a real photo:

1. Put the file in `public/images/`.
2. Set `src: "/images/your-file.jpg"` on that slot in `lib/content.ts`.

The slot then renders an optimised `next/image`. Phone mockups take app screenshots at 1170×2532.

## Structure

```
app/
  layout.tsx            fonts (Instrument Serif, Inter), metadata
  page.tsx              section order
  globals.css           design tokens and shared classes
  api/waitlist/route.ts waitlist endpoint
  privacy/page.tsx      placeholder privacy policy (replace before launch)
components/
  sections/             one component + CSS module per section
  ui/                   Logo, Pill, Media (image slot), Phone, Wheel, WaitlistForm
lib/content.ts          all copy and image slots
```

## Design system

- Grounds: cream `#f6f5ef` (default), black `#0c100e` (statements), deep green `#233629` (about).
- Type: Instrument Serif in capitals for headlines, Inter for everything else.
- Accent: brand green `#009a44` on light grounds, lime `#d5f45e` on dark grounds.
- Life-area colours from the brand book are used only on area pills, the wheel and the time circles.
- Section labels use brackets: `[ How it works ]`.

The brand display face, Averique, needs a web licence. When you have it, load it with `next/font/local` in `app/layout.tsx` and point `--font-serif` at it.

## Deploy

Push to GitHub and import the repo in Vercel, then add `WAITLIST_WEBHOOK_URL` and `NEXT_PUBLIC_SITE_URL` in the project's environment variables.
