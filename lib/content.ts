/**
 * All copy and media for the landing page lives here.
 *
 * Inline markup (see components/ui/Rich.tsx):
 *   *word*   italic serif accent, for headlines
 *   ==word== highlighted word in a small pill, for body text
 * Text in [square brackets] is a placeholder to fill in before launch. It shows on the page as-is.
 *
 * Media: every image slot has an `alt`, a `brief` (what to shoot or export) and a `ratio`.
 * Leave `src` empty to show the designed placeholder. To use a real image, put the file in
 * /public/images and set `src: "/images/your-file.jpg"`.
 */

export type AreaKey = "health" | "people" | "meaning" | "hobby" | "growth" | "career";

export type MediaSlot = {
  src?: string;
  alt: string;
  brief: string;
  ratio: string; // CSS aspect-ratio, e.g. "4 / 5"
};

/** The 6 life areas, named and ordered exactly as in the app's Life Area radar. */
export const AREAS: Record<AreaKey, { name: string; short: string; description: string; neglect: string }> = {
  health: { name: "Health", short: "Health", description: "Sleep, movement, food and energy.", neglect: "Sleep, food and movement are the first to go when work gets loud." },
  people: { name: "Relationship", short: "Relationship", description: "Family, friends, partner and community.", neglect: "The people who matter get whatever energy is left." },
  meaning: { name: "Spirituality", short: "Spirituality", description: "Values, reflection, mindfulness and inner calm.", neglect: "Busy days leave no time to stop and ask why." },
  hobby: { name: "Leisure", short: "Leisure", description: "Rest, play, creativity and things you do for fun.", neglect: "When did you last do something just for fun?" },
  growth: { name: "Personal Growth", short: "Personal Growth", description: "Learning, skills, reading and new challenges.", neglect: "Learning stopped when the busy season started." },
  career: { name: "Finance & Career", short: "Finance & Career", description: "Work, income, savings and business.", neglect: "Work gets every hour. But is it taking you where you want?" },
};

export const AREA_ORDER: AreaKey[] = ["health", "people", "meaning", "hobby", "growth", "career"];

export const META = {
  title: "Elegix · Life balance tracker for 6 areas of your life",
  description: "Elegix tracks goals, habits and tasks across 6 life areas and shows which part of your life you're neglecting, before it turns into burnout.",
  keywords: ["life balance tracker", "life balance app", "work-life balance app", "wheel of life app", "balance wheel", "habit tracker", "goal tracker", "burnout prevention", "life areas", "personal growth app"],
};

/** What the name means and the brand line: used in the Organization schema and llms.txt. Keep in sync with the About "Why the name" block. */
export const BRAND = {
  slogan: "Choose your balance.",
  nameMeaning: "The name Elegix comes from Valencian and Western Catalan, where elegix means “choose” (and “he or she chooses”). A balanced life isn't something you find. It's something you choose, one week at a time.",
};

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/guides", label: "Guides" },
  { href: "/careers", label: "Careers" },
];
export const NAV_CTA = "Get early access";

/** Official Elegix profiles: site footer and email footer. */
export const SOCIALS = [
  { href: "https://www.instagram.com/elegix.official", label: "Instagram" },
  { href: "https://www.tiktok.com/@elegix.official", label: "TikTok" },
  { href: "https://www.linkedin.com/company/elegixofficial", label: "LinkedIn" },
  { href: "https://x.com/elegixofficial", label: "X" },
  { href: "https://www.pinterest.com/elegixofficial/", label: "Pinterest" },
];

/**
 * Private Telegram group for waitlist members. The invite link is NOT here: it's the server-only
 * env var TELEGRAM_COMMUNITY_URL (Vercel → Settings → Environment Variables), so it never reaches
 * the public site. While it's unset, the email card and the "check your inbox" line are hidden.
 */
export const COMMUNITY = {
  emailTitle: "Your invite to our private community",
  emailText: "A private Telegram group just for early members. Meet the others, see what we're building and help shape it.",
  button: "Join the private group",
  siteLine: "Check your inbox: your invite to our private Telegram community is there.",
};

/** Shown under every signup form. Bump POLICY_VERSION whenever the privacy policy text changes. */
export const POLICY_VERSION = "2026-10-26.1";

/** Who runs Elegix, shown in the privacy policy: an individual entrepreneur (FOP) in Ukraine. */
export const LEGAL_ENTITY = { name: "Eduard Korytskyi", form: "an individual entrepreneur (FOP)", city: "Lutsk", country: "Ukraine" };
export const CONSENT = { before: "By joining, you agree to our", link: "Privacy Policy", after: ". Unsubscribe any time." };


// 1
export const HERO = {
  eyebrow: "Life balance tracker · Early access",
  title: "Crushing it at work. *Losing* the rest?",
  /** Start of the page's h1 for Google and screen readers (not shown; the eyebrow above says it visually). */
  h1Prefix: "Elegix, the life balance tracker",
  lede: "Elegix tracks your goals, habits and tasks across 6 life areas and shows which part of your life you're neglecting, before it turns into burnout.",
  cta: "Get early access",
  trust: ["Free app", "iOS & Android", "No spam"],
  media: { src: "/images/hero.jpg", alt: "A woman sitting on a grassy cliff, looking out over the sea in soft morning light", brief: "Hero photo · person outdoors at golden hour, calm · full-bleed 2400×1600", ratio: "3 / 2" } as MediaSlot,
  card: {
    title: "Example balance",
    value: "5.6",
    of: "/10",
    scores: [4, 5, 3, 3, 6, 9],
    rows: [
      { area: "career" as AreaKey, value: "9.2", trend: "up" as const },
      { area: "health" as AreaKey, value: "4.1", trend: "down" as const },
    ],
  },
};

/** Home opening (black, Duna style): two caption lines under the headline and the facts row next to the form. */
export const OPENING = {
  // two caption lines at the top of the first screen
  captions: [["Life balance tracker.", "6 areas, one score."], ["Goals, habits and tasks.", "iOS & Android."]],
  // statement under the first screen: the first part bright, the rest muted
  // *word* = lime accent; the lead is bright, the rest muted
  statement: { label: "What is Elegix", lead: "Elegix tracks your goals, habits and tasks across *6 life areas*", rest: " and shows which part of your life you're *neglecting*, before it turns into *burnout*." },
  // photo strip under the statement (the middle one is larger), then a short text under the middle photo
  strip: [
    { src: "/images/ready/hobby.jpg", alt: "Hands playing a guitar" },
    { src: "/images/area-health.jpg", alt: "A man running on a track at sunrise" },
    { src: "/images/how-areas.jpg", alt: "Friends laughing while making pizza together in a kitchen" },
    { src: "/images/area-growth.jpg", alt: "A stack of books on a green armchair" },
    { src: "/images/ready/career.jpg", alt: "A laptop on a desk" },
  ],
  about: {
    title: "Not another planner. A *mirror* for your whole life.",
    text: "Most apps reward you for doing more. Elegix shows what doing more is costing you: a 1-minute weekly check-in, one Life Balance score and one small next step for the area that needs you most.",
  },
  card: { title: "Ready to get started?", text: "Join the early access list. We'll email you once, when your spot opens." },
};

/** Facts ticker under the hero: a value and a short caption, scrolling on a dark strip. */
export const FACTS = [
  { value: "6", caption: "life areas" },
  { value: "1", caption: "balance score" },
  { value: "2 min", caption: "to set up" },
  { value: "1 min", caption: "weekly check-in" },
  { value: "Free", caption: "iOS & Android" },
];

// 2
export const PROBLEM = {
  eyebrow: "Sound familiar?",
  title: "You close every task. So why does life feel *off*?",
  text: "Your inbox is at zero. Your gym bag hasn't moved in three weeks. You keep meaning to call your parents. You're ==productive==, just not ==balanced==.",
  cards: [
    { area: "meaning" as AreaKey, text: "Your last real day off? Can't remember.", src: "/images/area-meaning.jpg" },
    { area: "health" as AreaKey, text: "Sleep is the first thing to go.", src: "/images/how-score.jpg" },
    { area: "people" as AreaKey, text: "Friends stopped asking you out.", src: "/images/area-people.jpg" },
    { area: "hobby" as AreaKey, text: "Hobbies turned into someday.", src: "/images/area-hobby.jpg" },
  ],
  closing: "Burnout doesn't arrive in a day. It builds quietly in the parts of your life you stopped looking at.",
};

// 3
export const COMPARE = {
  eyebrow: "Why other apps fail",
  title: "Your apps count tasks. Nobody counts your *life*.",
  lede: "To-do apps ask “Did you get it done?” Elegix asks “Are you living the way you want?”",
  columns: ["To-do apps and Notion", "Elegix"],
  rows: [
    { label: "What it tracks", them: "Tasks completed", us: "Balance across 6 life areas" },
    { label: "Setup", them: "Build your own system", us: "Ready framework, 2-minute start" },
    { label: "What it tells you", them: "How many boxes you checked", us: "Which area is slipping, and for how long" },
    { label: "Horizon", them: "Today", us: "Your month and your year" },
  ],
  line: "Not another to-do app. One clear view of all *6 areas* of your life.",
};

// 4 · How it works: the 6 areas, then three steps shown as cards with the app inside
export const HOW = {
  label: "How it works",
  title: "Know your balance. Change what happens *next*.",
  lede: "Every goal, habit and task belongs to one of 6 life areas. Together they make your Life Balance score.",
  more: { href: "/about", label: "Learn more about Elegix" },
  steps: [
    {
      key: "balance",
      title: "See",
      text: "One Life Balance score and 6 area scores, so you see at a glance which part of your life needs you.",
      screen: "Life Area",
      tint: ["health", "growth"] as [AreaKey, AreaKey],
      scroll: 0,
    },
    {
      key: "goals",
      title: "Act",
      text: "Goals linked to daily habits and tasks, each with your “why” next to it, and one next step for the area that needs you most.",
      screen: "Home",
      tint: ["hobby", "people"] as [AreaKey, AreaKey],
      scroll: 0,
    },
    {
      key: "review",
      title: "Reflect",
      text: "A 1-minute weekly check-in, plus a 10-minute monthly review: what grew, what dropped, what to change next.",
      screen: "Life Area",
      tint: ["meaning", "growth"] as [AreaKey, AreaKey],
      scroll: 36,
    },
  ] as { key: "balance" | "goals" | "review"; title: string; text: string; screen: string; tint: [AreaKey, AreaKey]; scroll: number }[],
  /** demo values in the floating chips; each chip is labelled as an example */
  example: "Example",
  next: { title: "Next step", item: "20-minute walk", area: "health" as AreaKey },
  trends: { title: "Example week", rows: [
    { area: "health" as AreaKey, trend: "up" as const },
    { area: "people" as AreaKey, trend: "up" as const },
    { area: "career" as AreaKey, trend: "down" as const },
  ] },
};

// 6
export const AREAS_SECTION = {
  label: "Six areas",
  title: "Which area are you *neglecting*?",
  media: {
    health: { src: "/images/area-health.jpg", alt: "A man running on a track at sunrise", brief: "Morning run, park", ratio: "4 / 5" },
    people: { src: "/images/area-people.jpg", alt: "Friends clinking glasses of red wine over dinner", brief: "Dinner with friends", ratio: "4 / 5" },
    career: { src: "/images/area-career.jpg", alt: "A woman working on a laptop at a wooden table", brief: "Deep work, desk", ratio: "4 / 5" },
    growth: { src: "/images/area-growth.jpg", alt: "A stack of books on a green armchair next to plants", brief: "Reading, sofa", ratio: "4 / 5" },
    hobby: { src: "/images/area-hobby.jpg", alt: "Close-up of hands playing a guitar", brief: "Hobby, hands at work", ratio: "4 / 5" },
    meaning: { src: "/images/area-meaning.jpg", alt: "A woman standing at a tall window at dusk", brief: "Reflection, window light", ratio: "4 / 5" },
    home: { src: "/images/area-home.jpg", alt: "A bright, tidy living room with plants and an orange armchair", brief: "Home, plants, order", ratio: "4 / 5" },
  } as Record<AreaKey, MediaSlot>,
};

/**
 * "One picture" block (after Problem): a big ring with the logo mark in the middle and round photos of
 * every life area scattered around it. x/y are the circle centre in % of the stage, size in % of its width.
 */
export const ORBIT = {
  label: "Six areas, one view",
  title: "Elegix brings work, health, people and everything in between into *one picture*",
  caption: "Six life areas, one balance score. See where your energy goes, and what is quietly slipping.",
  photos: [
    { area: "health", src: "/images/area-health.jpg", x: 27, y: 30, size: 7.6 },
    { area: "people", src: "/images/area-people.jpg", x: 22, y: 52, size: 7.6 },
    { area: "hobby", src: "/images/ready/hobby.jpg", x: 22, y: 76, size: 7.6 },
    { area: "growth", src: "/images/area-growth.jpg", x: 37, y: 86, size: 7.6 },
    { area: "meaning", src: "/images/ready/meaning.jpg", x: 50, y: 98, size: 7.6 },
    { area: "career", src: "/images/area-career.jpg", x: 63, y: 12, size: 7.6 },
    { area: "people", src: "/images/ready/people.jpg", x: 75, y: 22, size: 7.6 },
    { area: "hobby", src: "/images/area-hobby.jpg", x: 72, y: 46, size: 7.6 },
    { area: "hobby", src: "/images/area-home.jpg", x: 66, y: 66, size: 7.6 },
    { area: "meaning", src: "/images/area-meaning.jpg", x: 71, y: 94, size: 7.6 },
    { area: "health", src: "/images/ready/health.jpg", x: 34, y: 14, size: 6 },
    { area: "growth", src: "/images/ready/growth.jpg", x: 84, y: 70, size: 6 },
  ] as { area: AreaKey; src: string; x: number; y: number; size: number }[],
};

/** Real app screenshots: the hero phone, the How it works cards, the About hero and Ready. */
export const APP = {
  screens: [
    { label: "Home", media: { src: "/images/app/home.jpg", alt: "Elegix app home screen: goals and habits counters, categories, the Life Area balance score and Why Story", brief: "App screenshot · Home", ratio: "9 / 19.5" } },
    { label: "Life Area", media: { src: "/images/app/life-area.jpg", alt: "Elegix Life Area screen: a radar chart of life areas with weekly changes and a balance score out of 10", brief: "App screenshot · Life Area", ratio: "9 / 19.5" } },
  ] as { label: string; media: MediaSlot }[],
};

// 8
export const CHECK = {
  eyebrow: "Free Life Balance Check",
  title: "Find your weakest area in *2 minutes*",
  text: "Rate your 6 life areas from 1 to 10. We'll email your Life Balance score and one first step for your lowest area. Free, and you'll get a spot on the waitlist.",
  question: "How satisfied are you with each area right now?",
  button: "Take the free check",
  result: "Your Life Balance score",
  lowest: "Your weakest area",
  done: "We'll email your score and a first step to",
  sent: "We've emailed your score and a first step to",
};

// 9
export const TRUST = {
  eyebrow: "Who's behind it",
  title: "Why I started *Elegix*",
  founder: {
    quote: "I tried every planner and habit tracker. Each fixed one piece, and none answered the bigger question: how do you build a balanced life without the process itself becoming overwhelming? Elegix is my answer.",
    fallback: "Questions, ideas or your own story with burnout? Write to me directly at hello@elegix.net. I read every message.",
    storyLink: { href: "/about#story", label: "Read my story" },
    name: "Edward Korytskyi",
    role: "Founder",
    /** Edward's personal profiles (LinkedIn first). They go into the Person schema as sameAs. */
    profiles: [] as string[],
    knowsAbout: ["Work-life balance", "Burnout", "Wheel of Life", "Goal setting", "Habit building", "Life planning"],
    media: { src: "/images/founder.jpg", alt: "Edward Korytskyi, founder of Elegix, smiling in a white T-shirt in front of tropical greenery", brief: "Founder portrait · natural light · 4:5", ratio: "4 / 5" } as MediaSlot,
  },
};

/** The team on /about#team. Add `photo` when a portrait arrives; until then initials show. */
export const TEAM = {
  label: "Team",
  title: "The people behind *Elegix*",
  members: [
    { name: "Edward Korytskyi", role: "Founder", photo: "/images/founder.jpg" },
    { name: "Alina Krupa", role: "CMO", photo: "/images/alina-krupa.jpg" },
    { name: "Maksym Zhuravskyi", role: "CTO" },
    { name: "Yevhenii Bohomol", role: "Product Analyst" }, // placeholder title, to confirm with Edward
  ] as { name: string; role: string; photo?: string; linkedin?: string }[],
};

/** Shared by the founder block on the home page and "Our principles" on /about. The last one (dark, with the lock) carries the privacy promise. */
export const PRINCIPLES: { title: string; text: string; dark?: boolean }[] = [
  { title: "Freedom, not burnout.", text: "Productivity should create freedom. If a planner makes you feel worse, it's the planner's fault." },
  { title: "One step, not a wall of tasks.", text: "No guilt, no fake streaks. Elegix shows the picture and one small next step." },
  { title: "An honest score.", text: "When there isn't enough data, Elegix says so instead of guessing." },
  { title: "Your data is yours.", text: "It's never sold. Analytics run only if you say yes, and you can have your data deleted any time.", dark: true },
];

// 10
export const JOIN = {
  eyebrow: "Early access",
  title: "Join before *launch*.",
  // one plain line under the title instead of a perks list
  sub: "First access and a founding member price, locked for life.",
  perks: ["First access, in the order you join", "A founding member price, locked for life", "Vote on what we build next", "Behind-the-scenes updates as it's built"],
  media: { src: "/images/join.jpg", alt: "Morning sun casting leaf shadows on a warm, weathered wall with a plant in the corner", brief: "Early access · warm, sunlit, calm · 2400×1600", ratio: "3 / 2" } as MediaSlot,
  signature: { name: "Edward Korytskyi", role: "Founder, Elegix" },
  button: "Reserve my spot",
  note: "No payment now. One email when your spot opens.",
};

// 11
export const FAQ_SECTION = {
  title: "Questions before you *join*",
  text: "Didn't find your question? Write to us any time. We read every message.",
  email: "hello@elegix.net",
};

export const FAQ = [
  { q: "How is Elegix different from Todoist or Notion?", a: "They track whether you finished tasks. Elegix shows whether your life is balanced: 6 areas, one Life Balance score, a weekly check-in and a monthly review. No system to build." },
  { q: "Is the Life Balance score real or just a number?", a: "It combines your 1-minute weekly check-in, where you rate each area, with what you actually do. If there's too little data, Elegix tells you instead of guessing." },
  { q: "I've given up on every planner. Why would this one stick?", a: "You start from a ready template in 2 minutes. After that it's a 1-minute weekly check-in, plus a 10-minute monthly review. There's nothing to maintain." },
  { q: "When does it launch?", a: "We're finishing the first version. Waitlist members get in first, in the order they joined." },
  { q: "Is it free?", a: "Yes, Elegix is free to use. An optional Premium plan adds more, and its pricing will be announced before launch. Waitlist members hear first." },
  { q: "Which platforms?", a: "iOS and Android, one account on all your devices." },
  { q: "What happens to my data?", a: "It's used only to run the app for you. It's never sold, and you can delete it any time." },
  { q: "What do I get for joining early?", a: "First access, a founding member price and a say in what we build next." },
  { q: "What does Elegix mean?", a: "It comes from Valencian and Western Catalan, where elegix means “choose”. We picked it because Elegix is about consciously choosing how you spend your time and energy across the areas of your life." },
];

export const FOOTER = {
  caption: "Elegix",
  about: "A life balance tracker for people who want to grow at work without losing the rest of their life.",
  name: "Elegix: Valencian for “choose”.",
  email: "hello@elegix.net",
  nav: [{ href: "/about", label: "About" }, { href: "/guides", label: "Guides" }, { href: "/careers", label: "Careers" }, { href: "/#faq", label: "FAQ" }, { href: "/#join", label: "Early access" }],
  legal: [{ href: "/privacy", label: "Privacy policy" }, { href: "/terms", label: "Terms" }],
  socials: SOCIALS,
  wordmark: "Elegix",
};

/**
 * Emails sent by /api/waitlist through Mailgun, built in lib/email/template.ts after the Figma file
 * "[DS] Foundation Elegix" → Email Template → Welcome eng. {score} and {area} are filled in per person.
 */
export const EMAIL = {
  tagline: ["Design a life", "you're proud of"],
  welcome: {
    subject: "You're on the Elegix waitlist",
    title: "You're in. Let's bring your whole life back into balance.",
    subtitle: "You're on the Elegix waitlist. We'll email you the moment your spot opens.",
    gridTitle: "With Elegix, you'll:",
    grid: [
      { icon: "chart.png", text: "See all 6 areas of your life on one screen" },
      { icon: "battery.png", text: "Notice what's slipping before it turns into burnout" },
      { icon: "timer.png", text: "Have time to rest, not just work" },
      { icon: "box.png", text: "Turn big goals into small daily steps, without guilt" },
    ],
    button: { label: "Take the free Life Balance Check", href: "https://www.elegix.net/#check" },
    reply: "Which area of your life do you want to work on first? Just hit reply, I read every answer.",
  },
  check: {
    subject: "Your Life Balance score: {score}/10",
    title: "Your Life Balance score: {score}/10",
    subtitle: "Your lowest area right now is {area}. That's not a failure. It's the best place to start.",
    areasTitle: "Your 6 life areas",
    stepTitle: "Your first step for {area}",
    button: { label: "See how Elegix works", href: "https://www.elegix.net/#how" },
    reply: "Want to talk through your result? Just hit reply, I read every answer.",
  },
  belief: { title: "At Elegix, we believe", text: "A good life isn't the most productive one. It's a balanced one." },
  wait: { title: "While you wait", name: "Edward Korytskyi, Founder", note: "Coming soon to iOS & Android" },
  footer: {
    sent: "This email was sent to {email} because you joined the Elegix waitlist. If you'd rather not receive these emails, you can",
    unsubscribe: "unsubscribe",
    copyright: "© 2026 Elegix",
  },
  firstSteps: {
    health: "Pick one evening this week and be in bed 30 minutes earlier. Just one.",
    people: "Message one person you've been meaning to call and put a time in the calendar.",
    career: "Write down where you want work to take you in a year, then check if this week moved you closer.",
    growth: "Choose one book or course and give it 15 minutes, three times this week.",
    hobby: "Block one hour this weekend for something you do just for fun, with no goal attached.",
    meaning: "Take 5 quiet minutes tonight, no phone, and write down what mattered most to you today.",
  } as Record<AreaKey, string>,
};

/** The founder story (shown on /about#story), in Edward's words. */
export const STORY = {
  label: "Our story",
  title: "Why I created *Elegix*",
  blocks: [
    { type: "lead", text: "Elegix began with a simple realization:" },
    { type: "p", text: "Most people don't struggle because they lack ambition or motivation. They struggle because modern life has become increasingly complex and overwhelming." },
    { type: "p", text: "I've experienced this firsthand." },
    { type: "lines", lines: ["Too many goals.", "Too many responsibilities.", "An endless stream of notifications.", "Dozens of productivity tools.", "Constant pressure to do more, achieve more, improve faster, and somehow keep everything under control."] },
    { type: "p", text: "I tried planners, habit trackers, calendars, note-taking apps, and countless productivity systems. Each one solved a specific problem, but none helped me solve the bigger one:" },
    { type: "quote", text: "How do you build a balanced, intentional life without feeling overwhelmed by the very process of trying to improve it?" },
    { type: "p", text: "Over time, I realized that people don't need another productivity app. They need a system that helps them stay connected to what truly matters." },
    { type: "lines", lines: ["A system that makes their goals visible.", "That turns progress into something tangible.", "That helps build lasting habits.", "And supports personal growth without making life feel like an endless list of tasks."] },
    { type: "p", text: "That realization became the foundation of Elegix." },
    { type: "p", text: "I created Elegix to help people organize more than their schedules: the parts of life that truly matter. Health, relationships, inner calm, rest, personal growth and career, through daily habits and long-term goals." },
    { type: "quote", text: "Our mission is simple: to help people build a life they're proud of, one small step at a time." },
    { type: "lines", lines: ["I believe productivity should create freedom — not burnout.", "Planning should bring clarity — not stress.", "Personal growth should feel achievable — not overwhelming."] },
    { type: "p", text: "Elegix isn't just another productivity app. It's a system that brings clarity, structure and balance into everyday life, and helps people become the person they want to become." },
  ] as ({ type: "lead" | "p" | "quote"; text: string } | { type: "lines"; lines: string[] })[],
  signature: "Edward Korytskyi, Founder",
  cta: "Get early access",
};

/** The About page (/about): what Elegix is, how it works and who's behind it. */
export const ABOUT_PAGE = {
  meta: {
    title: "What is Elegix? About the life balance tracker",
    description: "Elegix is a life balance tracker: goals, habits and tasks across 6 life areas, one Life Balance score and a 1-minute weekly check-in. Meet the team.",
  },
  hero: {
    label: "What is Elegix",
    title: "Built for a *balanced* life, not a busier one",
    media: { src: "/images/about-hero.jpg", alt: "A man sitting on a cliff edge, looking out over misty mountains at dawn", brief: "About hero · calm person outdoors · 2400×1600", ratio: "3 / 2" } as MediaSlot,
    lede: "Elegix is a life balance tracker. It links your goals, habits and tasks to 6 life areas and shows, in one Life Balance score, which part of your life needs you next.",
    mission: { label: "Our mission", text: "To help people build a life they're *proud of*, one *small step* at a time. Not by doing more, but by seeing *all six areas* at once." },
    strip: [
      { src: "/images/area-people.jpg", alt: "Friends clinking glasses of red wine over dinner" },
      { src: "/images/area-meaning.jpg", alt: "A woman standing at a tall window at dusk" },
      { src: "/images/about-hero.jpg", alt: "A man looking out over misty mountains at dawn" },
      { src: "/images/area-home.jpg", alt: "A bright, tidy living room with plants and an orange armchair" },
      { src: "/images/area-career.jpg", alt: "A woman working on a laptop at a wooden table" },
    ],
    cta: "Get early access",
  },
  areas: {
    label: "The 6 life areas",
    title: "Everything you do belongs to an *area*",
    lede: "Every goal, habit and task sits in one of these areas. Together they make your Life Balance score.",
  },
  audience: {
    label: "Who it's for",
    title: "Who is *Elegix* for?",
    lede: "For anyone who's good at getting things done and tired of everything else quietly slipping.",
    items: [
      { title: "For people crushing it at work", text: "Your career is moving, but sleep, friends and hobbies keep getting pushed to “later”. Elegix shows the trade-off before it turns into burnout." },
      { title: "For those who've tried every planner", text: "Notion setups, to-do apps, habit trackers. Each solved one problem. Elegix gives you one framework for all of it, ready from day one." },
      { title: "For anyone who wants to feel in control again", text: "Too many goals, notifications and tools. Elegix brings them into one calm place and shows you the next small step." },
    ],
  },
  modes: {
    label: "The rhythm",
    title: "A weekly check-in and a *monthly review*",
    lede: "A 1-minute weekly check-in, plus a 10-minute monthly review. That's the whole routine.",
    items: [
      { title: "Weekly check-in", time: "1 minute", points: ["Rate each of the 6 areas from 1 to 10", "See your Life Balance score update", "Notice which area needs you next"] },
      { title: "Monthly review", time: "10 minutes", points: ["See which areas grew and which dropped", "Read back your “why” for each goal", "Choose one area to focus on next month"] },
    ],
  },
  idea: {
    label: "The idea behind it",
    title: "Built on the *Wheel of Life*",
    text: "The Wheel of Life is a classic coaching exercise: rate each area of your life, look at the shape, and the gaps become obvious. It works, but people do it once and forget it. Elegix turns it into something you use every day, linked to your real goals, habits and tasks.",
    points: ["Rate each area honestly, from 1 to 10", "Connect every goal and habit to an area", "Watch your balance change week by week", "Change one thing at a time, without guilt"],
  },
  pricing: {
    label: "Pricing",
    title: "Free to use. *Premium* if you want more.",
    text: "Elegix is free to download and use. An optional Premium plan adds more, and its pricing will be announced before launch. Waitlist members hear first.",
  },
  name: {
    label: "Why the name",
    title: "Why “Elegix”?",
    text: ["In Valencian and Western Catalan, ", "elegix", " means “choose”, and also “she chooses”. That’s the whole idea behind the app: a balanced life isn’t something you find. It’s something you choose, one week at a time."],
  },
  faq: ["How is Elegix different from Todoist or Notion?", "Is the Life Balance score real or just a number?", "I've given up on every planner. Why would this one stick?", "Is it free?", "Which platforms?", "What happens to my data?", "What does Elegix mean?"],
  story: { label: "Our story", id: "story" },
  beliefs: { label: "What we believe", title: "Our *principles*" },
  publicBuild: { title: "Built in public", text: "Elegix is in development and we share every step. Follow along:" },
  cta: { title: "Ready to see your *whole* life?", text: "Join the waitlist and get early access, a founding member price and a say in what we build next." },
};

/** Closing "Ready when you are": the app in the middle, one everyday object per life area around it. */
export const READY = {
  label: "Get started",
  title: "Ready when *you* are",
  lede: "A good life isn't the most productive one. It's a ==balanced== one.",
  cta: "Get early access",
  objects: [
    { area: "health" as AreaKey, src: "/images/ready/health.jpg", alt: "A water bottle with fresh mint" },
    { area: "growth" as AreaKey, src: "/images/ready/growth.jpg", alt: "A notebook with a pen" },
    { area: "people" as AreaKey, src: "/images/ready/people.jpg", alt: "Two cups of coffee on a wooden tray, seen from above" },
    { area: "meaning" as AreaKey, src: "/images/ready/meaning.jpg", alt: "Two candles in glass holders" },
    { area: "hobby" as AreaKey, src: "/images/ready/hobby.jpg", alt: "A pair of over-ear headphones" },
    { area: "career" as AreaKey, src: "/images/ready/career.jpg", alt: "A laptop on a desk" },
  ],
};

/** Careers (/careers): honest for an early team. No listings until there are real roles. */
export const CAREERS = {
  meta: {
    title: "Careers at Elegix: work on a life balance app",
    description: "Careers at Elegix, the life balance app. A small early-stage team with a 4-day week. No open roles yet, but we'd like to hear from you.",
  },
  label: "Careers",
  h1Prefix: "Careers at Elegix",
  title: "Help build a *calmer* way to live",
  lede: "Elegix helps people see all 6 areas of their life and grow without burning out. We're a small, early-stage team, building it in public.",
  media: { src: "/images/area-career.jpg", alt: "A woman working on a laptop at a wooden table", brief: "Careers hero", ratio: "3 / 2" } as MediaSlot,
  cta: "Introduce yourself",
  statement: {
    label: "Why we build it",
    text: "Most apps reward people for doing more. We're building one that shows what doing more is *costing* them, and helps them *grow* without *burning out*.",
    strip: [
      { src: "/images/ready/growth.jpg", alt: "A handwritten notebook page with a pen" },
      { src: "/images/ready/career.jpg", alt: "A laptop on a desk next to a small model motorbike" },
      { src: "/images/how-areas.jpg", alt: "Friends laughing while making pizza together in a kitchen" },
      { src: "/images/ready/people.jpg", alt: "Two cups of coffee on a wooden tray" },
      { src: "/images/ready/health.jpg", alt: "A glass water bottle on a table by an open window" },
    ],
  },
  how: {
    label: "Our culture",
    title: "What it's like to build *Elegix*",
    lede: "We're building a product against burnout, so the way we work has to match it.",
    items: [
      { title: "Calm over hustle", text: "We're building a product against burnout, so we try not to run on it ourselves: clear priorities and one next step.", src: "/images/ready/meaning.jpg", alt: "Two candles glowing on a wooden table" },
      { title: "Built in public", text: "We share progress and decisions openly, with our early members and on our socials.", src: "/images/how-next.jpg", alt: "A notebook, pen and laptop on a wooden desk" },
      { title: "Small team, real ownership", text: "Everyone works close to the product and to the people who use it.", src: "/images/ready/people.jpg", alt: "Two cups of coffee on a wooden tray" },
      { title: "A 4-day week", text: "We work four days a week, with Wednesday off. Nobody goes more than two days without a break.", src: "/images/how-score.jpg", alt: "A person walking along a waterfront path at sunset" },
    ],
  },
  product: {
    label: "What you'd work on",
    title: "A life balance tracker for *iOS and Android*",
    text: "Elegix links goals, habits and tasks to 6 life areas: Health, Relationship, Spirituality, Leisure, Personal Growth and Finance & Career. One Life Balance score shows which part of life needs attention next.",
    points: [
      "One Life Balance score and 6 area scores",
      "Goals, habits and tasks linked to an area and a “why”",
      "A 1-minute weekly check-in and a 10-minute monthly review",
      "Free to use, with an optional Premium plan",
    ],
    link: { href: "/about", label: "More about Elegix" },
  },
  faq: {
    title: "Questions about *working* with us",
    items: [
      { q: "Is Elegix hiring right now?", a: "Not for specific roles yet. We're a small, early-stage team. When a role opens, we'll post it on this page and on our socials first." },
      { q: "How can I get in touch about a job?", a: "Email hello@elegix.net with the subject “Careers”. Tell us what you do, what you'd like to work on and why this problem matters to you. A link to your work helps." },
      { q: "What does the Elegix team work on?", a: "A life balance tracker for iOS and Android. It links goals, habits and tasks to 6 life areas and shows, in one Life Balance score, which part of your life needs you next." },
      { q: "What is the work week like?", a: "We work four days a week, with Wednesday off, so nobody goes more than two days without a break. We try to keep clear priorities and one next step, the same way the app does." },
      { q: "Who is on the team?", a: "Edward Korytskyi (founder), Alina Krupa (CMO), Maksym Zhuravskyi (CTO) and Yevhenii Bohomol. You can meet the team on the About page." },
    ],
  },
  open: {
    title: "No open roles *right now*",
    text: "We're not hiring for specific roles yet. If Elegix feels like your kind of problem, introduce yourself: tell us what you do and what you'd like to work on.",
    button: "Introduce yourself",
    email: "hello@elegix.net",
    subject: "Careers",
    team: { href: "/about#team", label: "Meet the team" },
  },
};

