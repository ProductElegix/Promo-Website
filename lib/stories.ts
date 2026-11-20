/**
 * Personal stories (/stories/…): one long-form page per person on the team, in their own words.
 * Each one renders with the same Article layout as the guides and ends in the waitlist.
 *
 * To add someone's story: add an entry below with `person` matching their name in TEAM (lib/content.ts).
 * Their team card on /about then gets a "Read story" link and the page joins the sitemap. People without
 * an entry simply have no link, so nothing half-written is ever published.
 */
import type { MediaSlot } from "@/lib/content";
import type { Block, Guide } from "@/lib/guides";

export type Author = {
  name: string;
  role: string;
  photo?: string;
  bio: string;
  linkedin?: string;
};

export type Story = Omit<Guide, "related" | "areas"> & {
  /** must match the name in TEAM.members */
  person: string;
  author: Author;
  /** paragraphs between the photo and the first heading */
  intro: Block[];
  /** slugs of guides to link at the end */
  related: string[];
};

const EDWARD_PHOTO: MediaSlot = { src: "/images/founder.jpg", alt: "Edward Korytskyi, founder of Elegix, smiling in a white T-shirt in front of tropical greenery", brief: "Founder portrait", ratio: "3 / 2" };

export const STORIES: Story[] = [
  {
    slug: "why-i-built-elegix",
    person: "Edward Korytskyi",
    title: "What I managed to do by 23, and why I did half of it wrong",
    metaTitle: "Why I built Elegix: burnout at 20 and what I changed",
    description: "Edward Korytskyi, founder of Elegix, on a boarding school, 20-hour workdays, weighing 106 pounds at 20, and why he built an app that shows which area of life is slipping.",
    label: "Founder story",
    lede: "A boarding school, 5 days without sleep, 106 pounds, and an island where it's always 82°F.",
    published: "2026-11-20",
    updated: "2026-11-20",
    minutes: 6,
    media: EDWARD_PHOTO,
    author: {
      name: "Edward Korytskyi",
      role: "Founder of Elegix",
      photo: "/images/founder.jpg",
      bio: "Designer turned founder. Spent 7 years in product design and ran his own studio before burning out at 20. Now builds Elegix and Builders Node from the island of Roatán.",
      linkedin: "https://www.linkedin.com/in/korytsky",
    },
    intro: [
      { p: "I'm 23, and for as long as I can remember I've been afraid of one thing: that at 20 I wouldn't have what other people have at 60. That fear made me very productive and nearly broke me. Below is an honest list of what I managed to do, along with the price I paid for it." },
    ],
    sections: [
      {
        h2: "School from 7am to 7pm",
        blocks: [
          { p: "For 11 years I went to a boarding school in Ukraine where we stayed from 7am to 7pm. I got home at 8pm, and on days with sports after class, at 10pm. My whole life happened in the few hours left before sleep: games, Discord, YouTube, anime, and alongside all that, design, code, video editing and streaming, which I taught myself." },
          { p: "At 13 that turned into my first income. I took freelance orders and made about 250 hryvnias a month, roughly $10. My parents didn't really believe in that money, and I can't blame them: it sat in an e-wallet that you could barely withdraw from in Ukraine. Around the same time I was making Minecraft videos that I'm still embarrassed about, though without them I wouldn't know half of what I know now." },
        ],
      },
      {
        h2: "The part that looks like success",
        blocks: [
          { p: "Over time the freelancing grew into my own studio, which was already making decent money. The first money that felt big to me went on a tablet for my mom, and she was very happy with it. And over 7 years in design I worked my way up to senior product designer." },
          { p: "If I stopped the story here, it would make a nice success story. But it had a second half." },
        ],
      },
      {
        h2: "What it cost",
        blocks: [
          { p: "For a long time I was sure that the more you work, the more you earn, so 20 hours of work a day seemed normal to me. Once I got a big project with very tight deadlines and didn't sleep for 5 days straight. By the 5th day I simply couldn't function: neither coffee nor cola helped, and all that was left was a terrible weakness. Then I slept for 2 days." },
          { p: "Another time I went so long without eating that I stopped even wanting to. I went to a café only because I knew I had to, ordered my usual, and realized I couldn't get down anything but liquid. That day I managed the broth from a soup and a tiny bit of solid food, waited a day, and my stomach started working again." },
          { p: "And one day at home I looked in the mirror and saw a very thin and very weak person. I was 20 and weighed 48 kilograms, about 106 pounds. I wanted so badly to have at 20 what people have at 60 that I almost got their health instead." },
        ],
      },
      {
        h2: "What I changed",
        blocks: [
          { p: "After that I started doing the opposite, and 3 things made the biggest difference." },
          { p: "**I stopped taking projects I didn't need.** If time is already short, there's no point giving it to things that are someone else's or simply unnecessary. The first push came from the book Essentialism." },
          { p: "**I made myself the main project.** It was the one I had neglected the most. I started training at home, then moved to calisthenics, then to the gym. In a year I got up to 65 kilograms, about 143 pounds. Now I do 10 pull-ups with 25 kilograms of added weight and hold a handstand, even though that handstand didn't work for months." },
          { p: "**I deleted social media.** I realized I was hooked on scrolling and that it was eating the time I barely had anyway. Now I only create content, I don't consume it." },
          { p: "Later I left design too, because I was tired of building other people's dreams instead of my own." },
        ],
      },
      {
        h2: "An island where it's always 82°F",
        blocks: [
          { p: "First there were 5 months in Montenegro, and then the island of Roatán, 10,000 kilometers from home, where I arrived with one bag, a laptop and $4,000. The first thing that throws you off is the weather: there are no seasons here, and it's always 28°C." },
          { p: "The second is the language. I spoke neither English nor Spanish, and at first I couldn't talk to anyone at all. And when we went to buy clothes and I finally said something, it came out as \"I need a new dress,\" when all I wanted was new clothes. For an introvert who finds it hard to approach people first even in his own language, that was a real test. By the way, I never did beat my introversion. I just accepted it." },
        ],
      },
      {
        h2: "What I have now",
        blocks: [
          { p: "I wake up at 10am, learn English from movies and anime, and build my own things. The first, Elegix, is an app that shows which of the 6 areas of your life is slipping, before you get to your own 106 pounds. I badly needed something like that myself. The second, Builders Node, is an offline community of people who also want to build something of their own." },
          { p: "I still don't know what happens if it doesn't work out. But the most important thing I've managed in 23 years isn't the studio or the island. It's realizing that you don't have to make it to everything, only to what's yours." },
          { p: "If this resonates, join the waitlist below. Elegix isn't launched yet, but you can already get early access, and I'll keep writing about building my own things without breaking myself a second time." },
        ],
      },
    ],
    related: ["signs-of-burnout", "wheel-of-life", "work-life-balance"],
    cta: {
      title: "See which area is slipping, *before* it costs you",
      text: "Elegix tracks your goals, habits and tasks across 6 life areas and shows which one needs you next. Free app for iOS and Android. Join the waitlist for early access.",
    },
  },
  {
    slug: "alina-krupa",
    person: "Alina Krupa",
    title: "I loved a company that was never mine",
    metaTitle: "Why Alina Krupa joined Elegix as CMO and co-founder",
    description: "Alina Krupa spent years at C-level in IT and iGaming, measuring everything except her own life. Why she left, and why she co-founded Elegix.",
    label: "Co-founder story",
    lede: "Years at C-level taught me to measure everything. Everything except my own life.",
    published: "2026-11-20",
    updated: "2026-11-20",
    minutes: 4,
    media: { src: "/images/alina-krupa.jpg", alt: "Alina Krupa, CMO and co-founder of Elegix, in the evening light", brief: "Alina portrait", ratio: "3 / 2", position: "50% 20%" },
    author: {
      name: "Alina Krupa",
      role: "CMO & Co-founder of Elegix",
      photo: "/images/alina-krupa.jpg",
      bio: "Spent years in IT and iGaming, from growing international markets to running teams and business lines at C-level.",
      linkedin: "https://www.linkedin.com/in/alinakrupa/",
    },
    intro: [
      { p: "It's been more than a year since, for reasons I won't go into, I left a company I probably loved more than anyone should love their job." },
    ],
    sections: [
      {
        h2: "A business that was never mine",
        blocks: [
          { p: "I truly lived for it. I woke up thinking about the business and fell asleep thinking about it. I worried about every decision, every person on the team, every result. I celebrated wins as if they were my own and took problems as if it were my personal business." },
          { p: "Even though, formally, it was never mine." },
          { p: "After I left, for the first time in a long while I had to think not about what to do next with the company, but about what to do next with myself." },
          { p: "I don't regret any of it. Those years gave me people I value, huge experience and the courage to take responsibility. But slowly I realized how much I had put off for the sake of work." },
        ],
      },
      {
        h2: "I measured everything except myself",
        blocks: [
          { p: "Over my years in IT and iGaming I went from growing international markets to running teams and business lines at C-level. Strategy, marketing, finance, operations. I was used to everything being measurable: revenue, ROI, performance, growth." },
          { p: "I could spend hours finding where a business was losing resources, and never notice where my own were going." },
          { p: "When did I last properly rest? When did I last take care of my health before something already hurt? When did I last spend time with the people I love without checking work messages?" },
          { p: "The strangest part is that from the outside everything looked great: the title, the results, the ambition. The postponed plans and constant tiredness had simply become normal." },
          { p: "So I started asking myself: why do we plan a business's growth so carefully, and barely plan our own lives?" },
        ],
      },
      {
        h2: "How I came to Elegix",
        blocks: [
          { p: "Around then I met [Edward Korytskyi](/stories/why-i-built-elegix), the founder of Elegix. We talked a lot about his idea: about goals, priorities, and how easy it is to lose what matters among everyday tasks. I kept recognizing myself in those conversations." },
          { p: "I realized I didn't just want to support the idea. I wanted to build this product together, the one I had needed so much myself." },
          { p: "That's how I joined Elegix as CMO and co-founder." },
          { p: "Elegix brings the 6 key areas of life into one system. It helps you see what you give your attention to, what you keep putting off, and where you're losing balance." },
        ],
      },
      {
        h2: "Ambition without a life on hold",
        blocks: [
          { p: "I still love my work. I love hard problems, big goals and the feeling of a result. And I'm not giving up on ambition." },
          { p: "I just don't want to keep waiting for the next quarter, launch or deadline to finally have time for myself." },
          { p: "I can't say I've found the perfect balance. I still have a lot to learn." },
          { p: "I used to give almost all my time to a business I loved. Now, together with the team, I'm building our own product, one that reminds me my life deserves attention too." },
          { p: "We're preparing the first version of Elegix for iOS and Android and opening the waitlist. If this story feels familiar, I'd love to see you among the first people to use Elegix." },
        ],
      },
    ],
    related: ["signs-of-burnout", "work-life-balance", "how-to-choose-priorities-in-life"],
    cta: {
      title: "Plan your life as carefully as your *business*",
      text: "Elegix links your goals, habits and tasks to 6 life areas and shows which one you keep putting off. Free app for iOS and Android. Join the waitlist for early access.",
    },
  },
];

export const storyBySlug = (slug: string) => STORIES.find((s) => s.slug === slug);
export const storyByPerson = (name: string) => STORIES.find((s) => s.person === name);
export const storyHref = (s: Pick<Story, "slug">) => `/stories/${s.slug}`;
