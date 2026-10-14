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
  description: "Elegix tracks your goals, habits and tasks across 6 life areas and shows which part of your life you're neglecting, before it turns into burnout. Join the waitlist.",
  keywords: ["life balance tracker", "life balance app", "work-life balance app", "wheel of life app", "balance wheel", "habit tracker", "goal tracker", "burnout prevention", "life areas", "personal growth app"],
};

export const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#areas", label: "Life areas" },
  { href: "/#check", label: "Balance check" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
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

/** Shown under every signup form. Bump POLICY_VERSION whenever the privacy policy text changes. */
export const POLICY_VERSION = "2026-10-14.7";

/** Who runs Elegix, shown in the privacy policy: an individual entrepreneur (FOP) in Ukraine. */
export const LEGAL_ENTITY = { name: "Eduard Korytskyi", form: "an individual entrepreneur (FOP)", city: "Lutsk", country: "Ukraine" };
export const CONSENT = { before: "By joining, you agree to our", link: "Privacy Policy", after: ". Unsubscribe any time." };

/** Small tag on cards whose numbers are illustrative. */
export const EXAMPLE_TAG = "Example";

// 1
export const HERO = {
  eyebrow: "Life balance tracker · Early access",
  title: "Crushing it at work. *Losing* the rest?",
  lede: "Elegix tracks your goals, habits and tasks across 6 life areas and shows which part of your life you're neglecting, before it turns into burnout.",
  cta: "Get early access",
  trust: ["Free plan", "iOS & Android", "No spam, unsubscribe in one click"],
  media: { src: "/images/hero.jpg", alt: "A woman sitting on a grassy cliff, looking out over the sea in soft morning light", brief: "Hero photo · person outdoors at golden hour, calm · full-bleed 2400×1600", ratio: "3 / 2" } as MediaSlot,
  card: {
    title: "Your balance",
    value: "5.6",
    of: "/10",
    scores: [4, 5, 3, 3, 6, 9],
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
    { label: "What it tracks", them: "Tasks completed", us: "Balance across 6 life areas" },
    { label: "Setup", them: "Build your own system", us: "Ready framework, 2-minute start" },
    { label: "What it tells you", them: "You checked 12 boxes", us: "Health dropped 3 weeks in a row" },
    { label: "Horizon", them: "Today", us: "Your month and your year" },
  ],
  line: "Not another to-do app. A mirror for your *whole life*.",
};

// 4
export const INTRO = {
  label: "The Elegix framework",
  title: "It starts with 6 *life areas*",
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
    { title: "See", text: "One balance score and 6 area scores. Your whole life on one screen." },
    { title: "Act", text: "Goals linked to daily habits and tasks, each with your “why”. Suggestions for the area that needs you most." },
    { title: "Reflect", text: "A 10-minute monthly review. What grew, what dropped, what to change." },
  ],
  cards: [
    { kind: "score", caption: "Balance, quantified", media: { src: "/images/how-score.jpg", alt: "A person running along a park path at sunset", brief: "Morning run, park · 4:5", ratio: "4 / 5" } },
    { kind: "areas", caption: "Every area, scored", media: { src: "/images/how-areas.jpg", alt: "Friends laughing while making pizza together in a kitchen", brief: "Dinner with friends · 4:5", ratio: "4 / 5" } },
    { kind: "next", caption: "Next steps, simplified", media: { src: "/images/how-next.jpg", alt: "A notebook, pen and laptop on a wooden desk", brief: "Planning the week, desk · 4:5", ratio: "4 / 5" } },
  ] as { kind: "score" | "areas" | "next"; caption: string; media: MediaSlot }[],
  score: { label: "Balance", from: "5.6", to: "7.2", scores: [7, 7, 6, 7, 7, 8] },
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

// 7
export const APP = {
  eyebrow: "The Elegix app",
  title: "A calm planner for your *whole* life",
  lede: "Goals, habits and tasks in one place, sorted by life area. No dashboards to build. No guilt trips.",
  chips: ["Balance score", "Monthly review", "Why story", "Ready templates", "iOS & Android"],
  screens: [
    { label: "Home", media: { src: "/images/app/home.jpg", alt: "Elegix app home screen: goals and habits counters, categories, the Life Area balance score and Why Story", brief: "App screenshot · Home", ratio: "9 / 19.5" } },
    { label: "Life Area", media: { src: "/images/app/life-area.jpg", alt: "Elegix Life Area screen: a radar chart of life areas with weekly changes and a balance score out of 10", brief: "App screenshot · Life Area", ratio: "9 / 19.5" } },
  ] as { label: string; media: MediaSlot }[],
};

// 8
export const CHECK = {
  eyebrow: "Free life balance check",
  title: "Find your weakest area in *2 minutes*",
  text: "Rate your 6 life areas from 1 to 10. We'll email your Life Balance score and one first step for your lowest area. Free, and you'll get a spot on the waitlist.",
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
    quote: "Most people don't struggle because they lack ambition. They struggle because modern life got too complex: too many goals, too many notifications, too many tools. We tried every planner and habit tracker, and none answered the bigger question: how do you build a balanced life without the process itself becoming overwhelming? Elegix is our answer. One calm system for the parts of life that matter, one small step at a time.",
    fallback: "Questions, ideas or your own story with burnout? Write to me directly at hello@elegix.net. I read every message.",
    storyLink: { href: "/about#story", label: "Read our story" },
    name: "Edward",
    role: "Founder",
    media: { src: "/images/founder.jpg", alt: "Edward, founder of Elegix, smiling in a white T-shirt in front of tropical greenery", brief: "Founder portrait · natural light · 4:5", ratio: "4 / 5" } as MediaSlot,
  },
  principles: [
    { title: "No guilt, no fake streaks.", text: "We show the picture and one next step." },
    { title: "An honest score.", text: "When there isn't enough data, Elegix says so." },
    { title: "Your data is yours.", text: "We never sell it or show it to anyone." },
    { title: "Built in public.", text: "Follow every update on Instagram, TikTok, LinkedIn, X and Pinterest." },
  ],
};

// 10
export const JOIN = {
  eyebrow: "Early access",
  title: "Join before launch. Get *founding member* perks.",
  perks: ["First access, in the order you join", "A founding member price, locked for life", "Vote on what we build next", "A free plan, forever"],
  card: { code: "Founding member", line: "Life balance", spec: ["6 life areas", "Goals · Habits · Tasks", "iOS & Android"] },
  startLabel: "How do you want to start?",
  starts: [
    { id: "template", title: "Use the 6-area template" },
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
  { q: "How is Elegix different from Todoist or Notion?", a: "They track whether you finished tasks. Elegix shows whether your life is balanced: 6 areas, one score, a monthly review. No system to build." },
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
    { title: "Company", links: [{ href: "/about", label: "About" }, { href: "mailto:hello@elegix.net", label: "Contact" }] },
    { title: "Legal", links: [{ href: "/privacy", label: "Privacy policy" }, { href: "/terms", label: "Terms of Service" }] },
  ],
  socials: SOCIALS,
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
      { icon: "chart.png", text: "See all 6 areas of your life on one screen" },
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
    areasTitle: "Your 6 life areas",
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
    meaning: "Take 5 quiet minutes tonight, no phone, and write down what mattered most to you today.",
  } as Record<AreaKey, string>,
};

/** The founder story (shown on /about#story), in Edward's words. */
export const STORY = {
  label: "Our story",
  title: "Why we created *Elegix*",
  blocks: [
    { type: "lead", text: "Elegix began with a simple realization:" },
    { type: "p", text: "Most people don't struggle because they lack ambition or motivation. They struggle because modern life has become increasingly complex and overwhelming." },
    { type: "p", text: "As founders, we've experienced this firsthand." },
    { type: "lines", lines: ["Too many goals.", "Too many responsibilities.", "An endless stream of notifications.", "Dozens of productivity tools.", "Constant pressure to do more, achieve more, improve faster, and somehow keep everything under control."] },
    { type: "p", text: "We tried planners, habit trackers, calendars, note-taking apps, and countless productivity systems. Each one solved a specific problem, but none helped us solve the bigger one:" },
    { type: "quote", text: "How do you build a balanced, intentional life without feeling overwhelmed by the very process of trying to improve it?" },
    { type: "p", text: "Over time, we realized that people don't need another productivity app. They need a system that helps them stay connected to what truly matters." },
    { type: "lines", lines: ["A system that makes their goals visible.", "That turns progress into something tangible.", "That helps build lasting habits.", "And supports personal growth without making life feel like an endless list of tasks."] },
    { type: "p", text: "That realization became the foundation of Elegix." },
    { type: "p", text: "We created Elegix to help people organize more than their schedules. We want to help them organize the parts of life that truly matter — health, personal growth, relationships, emotional well-being, daily habits, and long-term goals." },
    { type: "quote", text: "Our mission is simple: to help people build a life they're proud of, one small step at a time." },
    { type: "lines", lines: ["We believe productivity should create freedom — not burnout.", "Planning should bring clarity — not stress.", "Personal growth should feel achievable — not overwhelming."] },
    { type: "p", text: "Elegix exists to bring clarity, structure, and balance into everyday life, giving people the confidence to move forward while staying focused on what matters most to them." },
    { type: "p", text: "Because Elegix isn't just another productivity app. It's a system designed to help people become the person they want to become." },
  ] as ({ type: "lead" | "p" | "quote"; text: string } | { type: "lines"; lines: string[] })[],
  signature: "Edward, Founder",
  cta: "Get early access",
};

/** The About page (/about). Structure after a "what is X" page; every fact here is true pre-launch. */
export const ABOUT_PAGE = {
  meta: {
    title: "About Elegix",
    description: "What Elegix is, who it's for and why we're building it: a calm planner that keeps all 6 areas of your life in balance.",
  },
  hero: {
    label: "About Elegix",
    title: "What is *Elegix*?",
    lede: "A life balance tracker for people who want to grow at work without losing the rest of their life. Our mission is simple: to help people build a life they're proud of, one small step at a time.",
    cta: "Get early access",
    secondary: { href: "/#check", label: "Take the free balance check" },
    facts: [
      { value: "6", label: "life areas, from health to career" },
      { value: "1", label: "balance score that updates as you go" },
      { value: "10 min", label: "monthly review of your whole life" },
    ],
  },
  features: {
    label: "What you get",
    title: "One calm planner for your *whole* life",
    items: [
      { icon: "health" as AreaKey, title: "6 life areas, one balance score", text: "Every goal, habit and task belongs to an area, so you can see on one screen which part of your life is growing and which one you've been neglecting." },
      { icon: "growth" as AreaKey, title: "Goals linked to daily habits", text: "Break big goals into small daily steps and tasks, and keep your “why” next to each one so you remember what it's for." },
      { icon: "meaning" as AreaKey, title: "A 10-minute monthly review", text: "Once a month, see what grew, what dropped and choose what to change next. No spreadsheets, no system to maintain." },
      { icon: "hobby" as AreaKey, title: "Ready templates, 2-minute start", text: "Start from a template built around the 6 areas, or set it up your way. Either way you're planning in minutes, not evenings." },
    ],
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
    label: "Flexible",
    title: "Two ways to use *Elegix*",
    lede: "A quick check-in on busy days, or a deeper look when you have a little more time.",
    items: [
      { title: "Daily check-in", time: "2 minutes", points: ["Tick off today's habits and tasks", "See your balance score update", "Notice which area needs you next"] },
      { title: "Monthly review", time: "10 minutes", points: ["See which areas grew and which dropped", "Read back your “why” for each goal", "Choose one area to focus on next month"] },
    ],
  },
  idea: {
    label: "The idea behind it",
    title: "Built on the *Wheel of Life*",
    text: "The Wheel of Life is a classic coaching exercise: rate each area of your life, look at the shape, and the gaps become obvious. It works, but people do it once and forget it. Elegix turns it into something you use every day, linked to your real goals, habits and tasks.",
    points: ["Rate each area honestly, from 1 to 10", "Connect every goal and habit to an area", "Watch your balance change week by week", "Change one thing at a time, without guilt"],
  },
  story: { label: "Our story", id: "story" },
  beliefs: {
    label: "What we believe",
    title: "Our *principles*",
    items: [
      { title: "Freedom, not burnout.", text: "Productivity should create freedom. If a planner makes you feel worse, it's the planner's fault." },
      { title: "Clarity, not stress.", text: "Planning should make your life clearer, not add another list to worry about." },
      { title: "Achievable, not overwhelming.", text: "Personal growth happens in small steps. We show one next step, never a wall of tasks." },
      { title: "Honest and private.", text: "When there isn't enough data, Elegix says so. Your data is yours; we never sell it." },
    ],
  },
  publicBuild: { title: "Built in public", text: "Elegix is in development and we share every step. Follow along:" },
  cta: { title: "Ready to see your *whole* life?", text: "Join the waitlist and get early access, a founding member price and a say in what we build next." },
};
