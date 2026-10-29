import type { GuideExtra } from "@/lib/guides";

const extra: GuideExtra = {
  updated: "2026-10-29",
  sections: [
    {
      h2: "What is work-life balance, in plain terms?",
      blocks: [
        { p: "Work-life balance is when your work gets the time and energy it needs without permanently taking the time and energy your health, relationships and rest need." },
        { p: "The key word is “permanently”. A hard week is not a balance problem. A hard year where you stopped exercising, saw your friends twice and slept six hours a night is. Three simple tests tell you which one you're in:" },
        { list: [
          "**The recovery test:** after a normal weekend, do you start Monday with energy, or already tired?",
          "**The neglect test:** is there an area of your life you've been “getting back to” for more than three months?",
          "**The choice test:** when work takes an evening, did you decide that, or did it just happen?",
        ] },
        { p: "If you pass all three, your balance is probably fine, even if you work long hours. If you fail two, the rest of this guide is for you." },
      ],
    },
    {
      h2: "Where do your 168 hours go?",
      blocks: [
        { p: "Every week has 168 hours, and once you subtract work, commuting, sleep and admin, most full-time professionals have far fewer free hours than they think." },
        { p: "Try it with your own numbers. Be honest about the hours you really work, including email at night, not the hours in your contract." },
        { tool: "hours-calculator" },
        { p: "Here's a worked example. Maya, a fictional product manager, works 50 hours a week, commutes 6, sleeps 49 (seven a night) and spends 21 on admin: cooking, cleaning, shopping, getting ready. That leaves her 42 free hours. It sounds like a lot until she looks at where they go: about 20 go to her phone and TV, which leaves roughly 22 for everything else in her life." },
        { p: "Maya doesn't need to work less to feel better. She moves 4 of those screen hours to two evening runs and one dinner with friends, and her week feels completely different. The point of counting is not guilt. It's to see the hours you can actually choose." },
        { tip: "If your free hours come out under 20 a week for more than a season, that's not a time-management problem. It's a workload problem, and it's worth raising with your manager (scripts below)." },
      ],
    },
    {
      h2: "What does good work-life balance look like? Examples",
      blocks: [
        { p: "Good work-life balance looks different for every person, but it always includes regular sleep, time with people you care about and at least one thing you do just because you enjoy it." },
        { p: "These fictional examples show the range:" },
        { list: [
          "**Daniel, 34, lawyer:** works 55 hours in trial months and 42 in quiet ones. He keeps two things fixed all year: the gym on Tuesday and Thursday mornings and Sunday lunch with his parents.",
          "**Priya, 29, designer, remote:** works 9:00 to 17:30, closes her laptop and puts it in a drawer. Her balance problem wasn't hours but loneliness, so she joined a climbing club that meets twice a week.",
          "**Tom, 41, sales director, two kids:** leaves at 17:00 three days a week for school pickup and works an hour after bedtime on those days. He doesn't check email on Saturdays.",
          "**Lena, 37, founder:** works six days during a fundraise, but treats it as a season with an end date. After the round closed she took ten days off and went back to five days a week.",
        ] },
        { p: "None of them has a perfect week. All of them have a few non-negotiables and know when they are in a heavy season." },
      ],
    },
    {
      h2: "How do you know your work-life balance is poor? A 10-question check",
      blocks: [
        { p: "Your work-life balance is probably poor if you answer “yes” to four or more of these questions." },
        { list: [
          "Do you check work messages within 30 minutes of waking up?",
          "Have you cancelled plans with friends or family because of work more than twice in the last month?",
          "Do you feel guilty when you're not working, even on holiday?",
          "Has someone close to you mentioned that you work too much?",
          "Have you stopped a hobby or sport you used to love, “for now”, more than six months ago?",
          "Do you regularly sleep less than you need because of work?",
          "Do you eat lunch at your desk most days?",
          "Is Sunday evening spent dreading Monday or already preparing for it?",
          "Do you feel you can't say no to requests at work?",
          "When you picture next year, does it look the same as this one, just busier?",
        ] },
        { p: "Four or more “yes” answers is a signal to act, not a diagnosis. If you also feel exhausted, numb or cynical most days, read the [signs of burnout](/guides/signs-of-burnout) and talk to a doctor or a mental health professional." },
      ],
    },
    {
      h2: "Work-life balance tips for your situation",
      blocks: [
        { p: "The best work-life balance tips depend on what is eating your time, so start with the group that sounds most like you." },
        { p: "**Remote and hybrid workers.** Your problem is usually that work has no edges." },
        { list: [
          "Create a shutdown ritual: write tomorrow's top three tasks, close every tab, say “done” out loud. It sounds silly and it works.",
          "Work in one place only. If you work from the sofa, the sofa becomes the office.",
          "Replace the commute with a 15-minute walk at the start and end of the day.",
          "Turn off work notifications on your phone after your hard stop, or remove work apps from it completely.",
        ] },
        { p: "**Managers.** Your hours set the norm for your team, whether you want them to or not." },
        { list: [
          "Schedule messages sent after hours to arrive at 9:00 the next morning.",
          "Say out loud when you're leaving: “I'm off to my kid's game, back tomorrow.” It gives your team permission.",
          "Protect one meeting-free block a week for yourself and your team.",
          "In one-to-ones, ask “What's your workload like, out of 10?” and act on anything above 8.",
        ] },
        { p: "**Parents.** Your time is already split, so the risk is giving both sides your worst hours." },
        { list: [
          "Pick the two or three moments a week your kids will remember (bedtime, a match, Saturday breakfast) and protect those, rather than trying to be home more in general.",
          "Agree with your partner who covers what each week, on Sunday, so the week isn't negotiated day by day.",
          "Keep one small thing just for you. Parents usually cut their own health and leisure first.",
          "Read [how to balance career and family](/guides/choosing-between-career-and-family) for decision exercises and scripts.",
        ] },
        { p: "**Founders and freelancers.** Nobody tells you to stop, and every hour feels like money." },
        { list: [
          "Set working hours and put them in your email signature or on your booking page. Clients respect hours you state.",
          "Decide a weekly hour limit and a minimum day rate, so you don't fill gaps with low-value work out of fear.",
          "Take one full day off a week. Put it in your calendar as a recurring meeting with yourself.",
          "Plan time off in advance and tell clients a month ahead. Unplanned breaks only happen when you burn out.",
        ] },
      ],
    },
    {
      h2: "How do you talk to your manager about work-life balance?",
      blocks: [
        { p: "Talk to your manager about work-life balance by bringing a specific problem, a specific proposal and a focus on results, not by asking for “better balance” in general." },
        { steps: [
          { title: "Prepare one concrete problem", text: "For example: “For six weeks I've worked about 55 hours, mostly because of the evening calls with the US team.” Numbers make it a work conversation, not a complaint." },
          { title: "Bring a proposal", text: "Offer a solution you could live with: rotating the late calls, moving one project to next quarter, a hard stop on three days." },
          { title: "Link it to the work", text: "Explain how the change protects quality: fewer mistakes, better focus, staying in the role longer." },
          { title: "Agree a trial", text: "Ask for four weeks, then a short check-in. A trial is much easier to say yes to than a permanent change." },
          { title: "Follow up in writing", text: "Send a two-line summary after the meeting so you both remember what you agreed." },
        ] },
        { p: "A script to copy:" },
        { tip: "“I want to keep doing good work on [project], and I've noticed I'm running at about [X] hours a week, which isn't sustainable for me. I'd like to try [proposal] for the next four weeks and check in with you on [date]. Would that work?”" },
      ],
    },
    {
      h2: "Boundary scripts you can copy",
      blocks: [
        { p: "A good boundary script is short, friendly, gives an alternative and doesn't over-explain." },
        { list: [
          "**Late request:** “I've finished for today. I'll look at this first thing tomorrow and get back to you by 11.”",
          "**Weekend message:** “Thanks, I'll pick this up on Monday morning. If it's truly urgent, call me.”",
          "**Too many projects:** “I can take this on. Which of [A] or [B] should I pause to make room?”",
          "**Meeting during a protected block:** “That slot doesn't work for me. Could we do 10:00 or 15:00 instead?”",
          "**Being asked to stay late again:** “I can stay late tonight, but I can't make it a habit. Can we look at the workload together this week?”",
          "**Holiday:** “I'm offline from [date] to [date] with no email access. [Name] is covering anything urgent.”",
          "**To yourself:** “If I don't stop now, tomorrow's work will be worse, not better.”",
        ] },
        { p: "Expect a little friction the first two or three times. Most people adjust quickly once your boundary is consistent. The ones who don't usually tell you something useful about the job." },
      ],
    },
    {
      h2: "Work-life integration vs work-life balance: which is better?",
      blocks: [
        { p: "Work-life integration blends work and life through the day, while work-life balance keeps them in separate blocks, and neither is better for everyone." },
        { list: [
          "**Balance:** clear start and end times, separate spaces, work stays at work. Suits people who find it hard to switch off, and jobs with predictable hours.",
          "**Integration:** school run at 15:00, work again at 20:00, a run at lunch. Suits people with flexible jobs, caring duties or work across time zones.",
          "**Risk of balance:** it can feel rigid, and one late meeting can make you feel you've failed.",
          "**Risk of integration:** without limits, work leaks into every hour, and you're never fully off or fully on.",
        ] },
        { p: "A simple rule if you choose integration: blend the hours, but keep a weekly total and at least one fully offline day. Whichever style you pick, check it with a [weekly review](/guides/weekly-review) rather than judging it day by day." },
      ],
    },
    {
      h2: "What does the research say about long working hours?",
      blocks: [
        { p: "Research is clear that very long working hours harm health over time, and that many working parents struggle to balance job and family." },
        { list: [
          "Working 55 or more hours a week is linked to an estimated 35% higher risk of stroke and a 17% higher risk of dying from heart disease, compared with 35–40 hours. The WHO and ILO linked about 745,000 deaths in 2016 to long working hours ([WHO, 2021](https://www.who.int/news/item/17-05-2021-long-working-hours-increasing-deaths-from-heart-disease-and-stroke-who-ilo)).",
          "In the US, 54% of full-time working parents say balancing work and family is difficult, and 60% think they spend too little time with their children ([Pew Research Center, 2026](https://www.pewresearch.org/social-trends/2026/06/16/for-working-parents-the-boundary-between-work-and-family-is-often-blurred/)).",
          "The same survey found that 59% of full-time working parents handle work tasks while they're with their kids, which shows how blurred the line has become.",
        ] },
        { p: "These numbers are about populations, not about you. If you're worried about your health, the right next step is a conversation with your doctor." },
      ],
    },
    {
      h2: "Common work-life balance mistakes",
      blocks: [
        { p: "The most common mistake is trying to fix balance with one big change instead of one small rule that you keep." },
        { list: [
          "**Waiting for a quiet period.** It rarely comes. Start with one boundary this week.",
          "**Only cutting hours.** Fewer hours spent scrolling or doing chores won't feel better. Decide what the time is for.",
          "**Fixing only one area.** A gym habit won't fix loneliness. Check all six areas with the free [Life Balance Check](/#check).",
          "**Copying someone else's routine.** A 5am routine that works for a single founder may break a parent of toddlers.",
          "**Making too many decisions.** Fixed routines beat daily choices, especially at night when [decision fatigue](/guides/decision-fatigue) sets in.",
          "**Not saying anything.** Most managers only learn about overload after someone resigns.",
        ] },
        { p: "If your employer is open to it, a shorter week is the biggest structural change of all. See [how to use a four-day week well](/guides/four-day-work-week-extra-day)." },
      ],
    },
  ],
  faq: [
    { q: "What are some examples of work-life balance?", a: "Leaving work at a set time most days, not checking email on weekends, keeping a weekly sport or hobby, and having dinner with family a fixed number of nights a week. The details differ, but each example protects time for something other than work." },
    { q: "How many hours a week is a healthy amount to work?", a: "There is no single number for everyone, but the WHO and ILO found that working 55 or more hours a week is linked to a higher risk of stroke and heart disease than working 35 to 40 hours." },
    { q: "What is the difference between work-life balance and work-life integration?", a: "Balance keeps work and personal life in separate blocks of time. Integration blends them through the day, for example a school run in the afternoon and work again in the evening." },
    { q: "How do I ask my boss for better work-life balance?", a: "Bring one specific problem with numbers, one proposal you could live with and an offer to trial it for four weeks. Focus on how the change will protect the quality of your work." },
    { q: "Why is work-life balance important?", a: "Without it, health, relationships and rest slowly wear down, which over time raises the risk of burnout and makes work itself harder to do well." },
  ],
};

export default extra;
