# Elegix — landing site

Waitlist landing page for Elegix, the life balance tracker. Next.js 16 (App Router), TypeScript, CSS Modules. No UI library.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Configure the waitlist

The waitlist runs on Mailgun (US region, sending domain `mail.elegix.net`). Every signup from any form on the page:

1. is added to the Mailgun mailing list `waitlist@mail.elegix.net` with its details as member variables (`source`, `start`, `scores`, `joinedAt`). **This list is the waitlist.** See it in Mailgun → Send → Mailing lists → `waitlist@mail.elegix.net`, where you can also download the members as CSV.
2. gets a confirmation email from "Edward from Elegix" `<edward@mail.elegix.net>` (replies go to `hello@elegix.net`). People who took the balance check get their score, all 7 areas and a first step for their weakest area instead of the welcome content.

The emails follow the Figma file "[DS] Foundation Elegix" → Email Template → Welcome eng. Layout lives in `lib/email/template.ts`, copy in `EMAIL` in `lib/content.ts`. Images (logo, illustration, icons) are PNGs in `lib/email/assets/`, attached inline (`cid:`), so they show without public hosting; after changing a PNG run `node lib/email/build-assets.mjs`. Open and click tracking follow the domain settings in Mailgun. The footer's unsubscribe link is our own: `/unsubscribe?e=…&t=…` on the public site, signed with `UNSUBSCRIBE_SECRET`. The page asks to confirm (so link scanners can't unsubscribe anyone), then marks the person `subscribed: no` on the waitlist list. Without `UNSUBSCRIBE_SECRET` the footer falls back to Mailgun's `%unsubscribe_url%`.

A failed email never loses a signup: the person is already on the list. The API allows 5 signups a minute per IP, and a hidden honeypot field filters simple bots.

Environment variables (already set in Vercel for Production and for the `dev` preview):

| Variable | Value |
|---|---|
| `MAILGUN_API_KEY` | Mailgun API key (sensitive) |
| `MAILGUN_DOMAIN` | `mail.elegix.net` |
| `MAILGUN_REGION` | `us` |
| `MAIL_FROM` | `Edward from Elegix <edward@mail.elegix.net>` |
| `UNSUBSCRIBE_SECRET` | Random secret that signs unsubscribe links (sensitive) |
| `MAILGUN_TEST_MODE` | `yes` only in `.env.local`: Mailgun accepts emails but doesn't deliver them, so local testing never emails anyone. List signups are still real. |
| `WAITLIST_WEBHOOK_URL` | Optional. Also forwards every signup as a JSON POST, for example to Google Sheets via Make or Zapier. |

Webhook payload (balance-check signups include `scores`):

```json
{ "email": "name@example.com", "source": "balance-check", "start": null, "scores": { "health": 8, "people": 6, "career": 9, "growth": 4, "hobby": 2, "meaning": 5, "home": 7 }, "joinedAt": "2026-10-14T01:00:00.000Z" }
```

Without Mailgun and without a webhook, the forms log signups to the terminal in development and tell visitors the waitlist isn't open yet in production. Nothing is lost silently.

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

## Workflow

Two branches, two sites:

| Branch | Site | Who sees it |
|---|---|---|
| `dev` | https://elegix-site-dev.vercel.app | Only people logged in to the Vercel team (Vercel Authentication) |
| `main` | https://elegix-site.vercel.app | Everyone (production) |

1. Commit and push changes to `dev`. Vercel rebuilds the dev site in about a minute.
2. Review the dev site.
3. When it looks right, open a pull request from `dev` into `main`: https://github.com/ProductElegix/Promo-Website/compare/main...dev
4. Merge the pull request. Vercel publishes `main` to production.

Never commit straight to `main`. Any other branch or pull request also gets its own preview link from Vercel.

## Deploy

The Vercel project `elegix-site` is connected to this repo (production branch `main`). Mailgun and `NEXT_PUBLIC_SITE_URL` are already set in the project's environment variables for production and for the `dev` preview.
