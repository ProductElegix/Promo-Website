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

export type AreaKey = "health" | "people" | "career" | "growth" | "hobby" | "meaning" | "home";

export type MediaSlot = {
  src?: string;
  alt: string;
  brief: string;
  ratio: string; // CSS aspect-ratio, e.g. "4 / 5"
};

export const AREAS: Record<AreaKey, { name: string; short: string; description: string; neglect: string }> = {
  health: { name: "Health & Body", short: "Health", description: "Sleep, movement, food and energy.", neglect: "Sleep, food and movement are the first to go when work gets loud." },
  people: { name: "Relationships & People", short: "People", description: "Family, friends, partner and community.", neglect: "The people who matter get whatever energy is left." },
  career: { name: "Career & Finance", short: "Career", description: "Work, income, savings and business.", neglect: "Work gets every hour. But is it taking you where you want?" },
  growth: { name: "Development & Training", short: "Growth", description: "Learning, skills, reading and courses.", neglect: "Learning stopped when the busy season started." },
  hobby: { name: "Hobbies & Leisure", short: "Hobbies", description: "Play, creativity, rest and things you do for fun.", neglect: "When did you last do something just for fun?" },
  meaning: { name: "Meaning & Awareness", short: "Meaning", description: "Values, reflection, mindfulness and purpose.", neglect: "Busy days leave no time to ask why." },
  home: { name: "Life & Environment", short: "Home", description: "Home, surroundings, routines and order.", neglect: "Your space ends up looking like your head." },
};

export const AREA_ORDER: AreaKey[] = ["health", "people", "career", "growth", "hobby", "meaning", "home"];

export const META = {
  title: "Elegix · Life balance tracker",
  description: "Elegix tracks your goals, habits and tasks across 7 life areas and shows which part of your life you're neglecting.",
};

export const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#areas", label: "Life areas" },
  { href: "/#check", label: "Balance check" },
  { href: "/#faq", label: "FAQ" },
];
export const NAV_CTA = "Get early access";

/** Shown under every signup form. Bump POLICY_VERSION whenever the privacy policy text changes. */
export const POLICY_VERSION = "2026-10-14";
export const CONSENT = { before: "By joining, you agree to our", link: "Privacy Policy", after: ". Unsubscribe any time." };

/** Small tag on cards whose numbers are illustrative. */
export const EXAMPLE_TAG = "Example";

// 1
export const HERO = {
  eyebrow: "Life balance tracker · Early access",
  title: "Crushing it at work. *Losing* the rest?",
  lede: "Elegix tracks your goals, habits and tasks across 7 life areas and shows which part of your life you're neglecting, before it turns into burnout.",
  cta: "Get early access",
  trust: ["Free plan", "iOS & Android", "No spam, unsubscribe in one click"],
  media: { src: "/images/hero.jpg", alt: "A woman sitting on a grassy cliff, looking out over the sea in soft morning light", brief: "Hero photo · person outdoors at golden hour, calm · full-bleed 2400×1600", ratio: "3 / 2" } as MediaSlot,
  card: {
    title: "Your balance",
    value: "5.6",
    of: "/10",
    scores: [4, 5, 9, 6, 3, 5, 6],
    rows: [
      { area: "career" as AreaKey, value: "9.2", trend: "up" as const },
      { area: "health" as AreaKey, value: "4.1", trend: "down" as const },
    ],
  },
};

// 2
export const PROBLEM = {
  eyebrow: "Sound familiar?",
  title: "You close every task. So why does life feel *off*?",
  text: "Your inbox is at zero. Your gym bag hasn't moved in three weeks. You keep meaning to call your parents. You're ==productive==, just not ==balanced==.",
  cards: [
    { area: "meaning" as AreaKey, text: "Your last real day off? Can't remember." },
    { area: "health" as AreaKey, text: "Sleep is the first thing to go." },
    { area: "people" as AreaKey, text: "Friends stopped asking you out." },
    { area: "hobby" as AreaKey, text: "Hobbies turned into someday." },
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
    { label: "What it tracks", them: "Tasks completed", us: "Balance across 7 life areas" },
    { label: "Setup", them: "Build your own system", us: "Ready framework, 2-minute start" },
    { label: "What it tells you", them: "You checked 12 boxes", us: "Health dropped 3 weeks in a row" },
    { label: "Horizon", them: "Today", us: "Your month and your year" },
  ],
  line: "Not another to-do app. A mirror for your *whole life*.",
};

// 4
export const INTRO = {
  label: "The Elegix framework",
  title: "It starts with 7 *life areas*",
  lede: "Every goal, habit and task belongs to an area. Together they make your balance score.",
  sample: { area: "health" as AreaKey, score: "4.1 / 10", text: "Sleep, movement, food", streak: "Dropped 3 weeks in a row" },
  link: { href: "#how", label: "See how it works" },
};

// 5
export const HOW = {
  label: "How it works",
  title: "Know your balance. Change what happens *next*.",
  cta: "Get early access",
  steps: [
    { title: "See", text: "One balance score and 7 area scores. Your whole life on one screen." },
    { title: "Act", text: "Goals linked to daily habits and tasks, each with your “why”. Suggestions for the area that needs you most." },
    { title: "Reflect", text: "A 10-minute monthly review. What grew, what dropped, what to change." },
  ],
  cards: [
    { kind: "score", caption: "Balance, quantified", media: { src: "/images/how-score.jpg", alt: "A person running along a park path at sunset", brief: "Morning run, park · 4:5", ratio: "4 / 5" } },
    { kind: "areas", caption: "Every area, scored", media: { src: "/images/how-areas.jpg", alt: "Friends laughing while making pizza together in a kitchen", brief: "Dinner with friends · 4:5", ratio: "4 / 5" } },
    { kind: "next", caption: "Next steps, simplified", media: { src: "/images/how-next.jpg", alt: "A notebook, pen and laptop on a wooden desk", brief: "Planning the week, desk · 4:5", ratio: "4 / 5" } },
  ] as { kind: "score" | "areas" | "next"; caption: string; media: MediaSlot }[],
  score: { label: "Balance", from: "5.6", to: "7.2", scores: [7, 7, 8, 7, 6, 7, 8] },
  changes: [
    { area: "health" as AreaKey, change: "+23%" },
    { area: "people" as AreaKey, change: "+12%" },
    { area: "career" as AreaKey, change: "−4%" },
    { area: "hobby" as AreaKey, change: "+18%" },
  ],
  next: { title: "Next step", item: "20-minute walk", area: "health" as AreaKey },
};

// 6
export const AREAS_SECTION = {
  label: "Seven areas",
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

// 7
export const APP = {
  eyebrow: "The Elegix app",
  title: "A calm planner for your *whole* life",
  lede: "Goals, habits and tasks in one place, sorted by life area. No dashboards to build. No guilt trips.",
  chips: ["Balance score", "Monthly review", "Why story", "Ready templates", "iOS & Android"],
  screens: [
    { label: "Home", media: { alt: "Elegix home screen", brief: "App screenshot · Home · 1170×2532", ratio: "9 / 19.5" } },
    { label: "Balance", media: { alt: "Elegix balance screen", brief: "App screenshot · Balance · 1170×2532", ratio: "9 / 19.5" } },
    { label: "Monthly review", media: { alt: "Elegix monthly review screen", brief: "App screenshot · Monthly review · 1170×2532", ratio: "9 / 19.5" } },
  ] as { label: string; media: MediaSlot }[],
};

// 8
export const CHECK = {
  eyebrow: "Free life balance check",
  title: "Find your weakest area in *2 minutes*",
  text: "Rate your 7 life areas from 1 to 10. We'll email your Life Balance score and one first step for your lowest area. Free, and you'll get a spot on the waitlist.",
  question: "How satisfied are you with each area right now?",
  button: "Take the free check",
  result: "Your balance",
  lowest: "Your weakest area",
  done: "We'll email your score and a first step to",
  sent: "We've emailed your score and a first step to",
};

// 9
export const TRUST = {
  eyebrow: "Who's behind it",
  title: "Why we're building *Elegix*",
  founder: {
    quote: "[Founder story: 2–3 sentences about why you came to this problem]",
    name: "Edward",
    role: "Founder",
    media: { alt: "Portrait of Edward, founder of Elegix", brief: "Founder portrait · natural light · 4:5", ratio: "4 / 5" } as MediaSlot,
  },
  principles: [
    { title: "No guilt, no fake streaks.", text: "We show the picture and one next step." },
    { title: "An honest score.", text: "When there isn't enough data, Elegix says so." },
    { title: "Your data is yours.", text: "We never sell it or show it to anyone." },
    { title: "Built in public.", text: "Follow every update on [Instagram / Threads / X]." },
  ],
};

// 10
export const JOIN = {
  eyebrow: "Early access",
  title: "Join before launch. Get *founding member* perks.",
  perks: ["First access, in the order you join", "Founding member price, [−X%] locked for life", "Vote on what we build next", "A free plan, forever"],
  card: { code: "Founding member", line: "Life balance", spec: ["7 life areas", "Goals · Habits · Tasks", "iOS & Android"] },
  startLabel: "How do you want to start?",
  starts: [
    { id: "template", title: "Use the 7-area template" },
    { id: "own", title: "Set it up my way" },
    { id: "unsure", title: "Not sure yet" },
  ],
  button: "Reserve my spot",
  note: "No payment now. One email when your spot opens.",
};

// 11
export const FAQ_SECTION = {
  title: "Answers that help you *decide*",
  text: "Didn't find your question? Write to us any time.",
  email: "hello@elegix.net",
};

export const FAQ = [
  { q: "How is Elegix different from Todoist or Notion?", a: "They track whether you finished tasks. Elegix shows whether your life is balanced: 7 areas, one score, a monthly review. No system to build." },
  { q: "Is the balance score real or just a number?", a: "It combines a quick weekly self-rating of each area with what you actually do. If there's too little data, Elegix tells you instead of guessing." },
  { q: "I've given up on every planner. Why would this one stick?", a: "You start from a ready template in 2 minutes, and the app asks for one short check-in a week. There's nothing to maintain." },
  { q: "When does it launch?", a: "We're finishing the first version. Waitlist members get in first, in the order they joined." },
  { q: "Will it be free?", a: "Yes, there's a free plan. Premium adds unlimited goals and habits, with a free trial first." },
  { q: "Which platforms?", a: "iOS and Android, one account on all your devices." },
  { q: "What happens to my data?", a: "It's used only to run the app for you. We never sell it, and you can delete it any time." },
  { q: "What do I get for joining early?", a: "First access, a founding member price and a say in what we build next." },
];

// 12
export const MANIFESTO = {
  eyebrow: "What we believe",
  paragraphs: [
    "We believe a good life isn't the most productive one. It's a ==balanced== one.",
    "Most apps make you better at work and leave everything else to chance.",
    "You don't burn out in a day. You burn out in the parts of your life you stopped looking at.",
    "We built Elegix so you can see all of it.",
  ],
  cta: "Get early access",
};

export const FOOTER = {
  slogan: "Design a life you're *proud of*",
  about: "A life balance tracker for people who want to grow at work without losing the rest of their life.",
  columns: [
    { title: "Product", links: [{ href: "/#how", label: "How it works" }, { href: "/#areas", label: "Life areas" }, { href: "/#check", label: "Balance check" }, { href: "/#faq", label: "FAQ" }] },
    { title: "Company", links: [{ href: "/#trust", label: "About" }, { href: "mailto:hello@elegix.net", label: "Contact" }] },
    { title: "Legal", links: [{ href: "/privacy", label: "Privacy policy" }] },
  ],
  // Replace "#" with real profile URLs when the accounts exist.
  socials: [
    { href: "#", label: "Instagram" },
    { href: "#", label: "Threads" },
    { href: "#", label: "X" },
  ],
  wordmark: "elegix",
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
      { icon: "chart.png", text: "See all 7 areas of your life on one screen" },
      { icon: "battery.png", text: "Notice what's slipping before it turns into burnout" },
      { icon: "timer.png", text: "Have time to rest, not just work" },
      { icon: "box.png", text: "Turn big goals into small daily steps, without guilt" },
    ],
    button: { label: "Take the free Life Balance Check", href: "https://elegix-site.vercel.app/#check" },
    reply: "Which area of your life do you want to work on first? Just hit reply, I read every answer.",
  },
  check: {
    subject: "Your Life Balance score: {score}/10",
    title: "Your Life Balance score: {score}/10",
    subtitle: "Your lowest area right now is {area}. That's not a failure. It's the best place to start.",
    areasTitle: "Your 7 life areas",
    stepTitle: "Your first step for {area}",
    button: { label: "See how Elegix works", href: "https://elegix-site.vercel.app/#how" },
    reply: "Want to talk through your result? Just hit reply, I read every answer.",
  },
  belief: { title: "At Elegix, we believe", text: "A good life isn't the most productive one. It's a balanced one." },
  wait: { title: "While you wait", name: "Edward, Founder", note: "Coming soon to iOS & Android" },
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
    meaning: "Spend 5 minutes tonight writing down what mattered most to you today.",
    home: "Clear one surface you see every day, and keep it clear for a week.",
  } as Record<AreaKey, string>,
};

/** Privacy policy (/privacy). [Brackets] are details only the owner can fill in. Bump POLICY_VERSION when this changes. */
export const PRIVACY = {
  title: "Privacy policy",
  updated: "Last updated: 14 October 2026",
  intro: "This policy explains what we collect when you join the Elegix waitlist or take the Life Balance check on this site, why, where it's kept and how to remove it. Elegix is run by [legal name], [country], [postal address] (\"we\").",
  sections: [
    {
      title: "What we collect",
      items: [
        "Your email address.",
        "Which form you used (for example the hero, the balance check or the early access form) and, in the early access form, how you'd like to start.",
        "If you take the Life Balance check: your 7 area ratings from 1 to 10. You decide what to enter; they are your own estimates, not medical information.",
        "When you joined, and a record of your consent: the date, the page and the version of this policy.",
        "Where you came from, if your link had it: the referring website and campaign tags (utm_source, utm_medium, utm_campaign).",
        "Whether you opened our emails. Our email provider records opens with a small invisible image, along with the device and approximate location of the open.",
      ],
    },
    {
      title: "Why we collect it",
      items: [
        "To keep your place on the waitlist and email you when your spot opens.",
        "To send you your Life Balance score and a first step for your weakest area.",
        "To understand which pages and campaigns bring people in, and to improve the product.",
        "We never sell your data and never use it for advertising by others.",
      ],
    },
    {
      title: "Where it's kept",
      items: [
        "Your details are stored in our mailing list at Mailgun (Mailgun Technologies, Inc., United States), which also sends our emails. Mailgun processes the data on our behalf.",
        "This site is hosted on Vercel. We don't use analytics or advertising cookies. Your browser stores the campaign tags above locally so they can be sent with your signup.",
      ],
    },
    {
      title: "How long we keep it",
      items: [
        "Until you unsubscribe or ask us to delete it. When you unsubscribe we stop emailing you and keep only a note that you unsubscribed, so we don't email you by mistake.",
      ],
    },
    {
      title: "Your choices and rights",
      items: [
        "Unsubscribe any time with the link at the bottom of every email.",
        "Ask us for a copy of your data, to correct it or to delete it: write to hello@elegix.net and we'll reply within 30 days.",
        "If you're in the EU or UK, you can also complain to your local data protection authority.",
      ],
    },
  ],
  contact: "Questions about privacy: hello@elegix.net",
};
