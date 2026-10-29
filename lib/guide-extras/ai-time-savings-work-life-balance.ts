import type { GuideExtra } from "@/lib/guides";

const extra: GuideExtra = {
  updated: "2026-10-29",
  sections: [
    {
      h2: "Does AI actually save time at work?",
      blocks: [
        { p: "Yes, AI saves time on specific tasks, but studies of whole jobs find the overall saving is modest and often eaten up by new work, so the hours only reach your life if you protect them." },
        { p: "Two large studies show both sides:" },
        { list: [
          "**Big gains on narrow tasks.** In a study of 5,179 customer support agents, an AI assistant raised issues resolved per hour by about 14% on average, and by about 34% for new and less experienced agents, with little effect for the most experienced ([Brynjolfsson, Li and Raymond, NBER, 2023](https://nber.org/papers/w31161)).",
          "**Small gains across whole jobs.** A study of about 25,000 workers in 11 occupations in Denmark found AI chatbots saved users about 3% of their work hours on average, with no measurable change in earnings or recorded hours. AI also created new tasks for 8.4% of workers, such as checking AI output ([Humlum and Vestergaard, 2025](https://bfi.uchicago.edu/wp-content/uploads/2025/04/BFI_WP_2025-56-3.pdf)).",
        ] },
        { p: "Put together with the numbers above, the picture is clear. AI can make a task much faster. Across a full week, the saving is a few hours at best, and in most jobs, nothing in the system sends those hours home. Your contract hours stay the same. Your inbox refills. If you want the time, you have to claim it." },
      ],
    },
    {
      h2: "How much time does AI save by role? Examples",
      blocks: [
        { p: "AI saves the most time on writing, summarising, searching and first drafts, so roles heavy in those tasks see the biggest weekly gains." },
        { p: "These are fictional examples to help you estimate your own number, not survey data:" },
        { list: [
          "**Marketing manager (Lina):** first drafts of posts and emails, campaign summaries. Estimate: 3 hours a week. Risk: the team doubles the number of campaigns because “drafts are quick now”.",
          "**Software developer (Tomás):** boilerplate code, tests, explaining old code. Estimate: 2–4 hours a week. Risk: more time spent reviewing generated code, and faster sprint expectations.",
          "**Sales rep (Priya):** call notes, follow-up emails, account research. Estimate: 2 hours a week. Risk: the saved time becomes more calls on the same quota day.",
          "**Team lead (Jonas):** meeting summaries, status reports, performance review drafts. Estimate: 2 hours a week. Risk: more meetings, since notes are now “free”.",
          "**Freelance designer (Ana):** client emails, proposals, invoices, mood boards. Estimate: 3 hours a week. Risk: taking an extra client instead of ending the day earlier.",
          "**Teacher (Daniel):** lesson plan drafts, worksheets, parent emails. Estimate: 1–2 hours a week. Risk: the time is absorbed by marking that was already running late.",
        ] },
        { p: "Notice that every role has a saving and a risk. The saving is technical. The risk is about expectations, and that's the part you can do something about." },
      ],
    },
    {
      h2: "A weekly template to track AI time savings",
      blocks: [
        { p: "The simplest way to track AI time savings is a five-line weekly log: tasks AI helped with, minutes saved, where the time actually went, where you want it to go next week, and one line of reflection." },
        { p: "Copy this into a note and fill it in every Friday. It takes about five minutes:" },
        { steps: [
          { title: "1. Tasks AI helped with", text: "List them with a rough time saving each. Example: “Meeting notes, 3 meetings, 45 min. Report draft, 60 min. Emails, 30 min.”" },
          { title: "2. Total saved", text: "Add it up and round down. Example: “About 2 hours.”" },
          { title: "3. Where it actually went", text: "Be honest. Example: “1.5 hours went to extra requests from another team. 30 minutes to email.”" },
          { title: "4. Where it goes next week", text: "Pick your lowest life area and book a block. Example: “Leisure is at 3. Wednesday 18:00–20:00, climbing with Joe.”" },
          { title: "5. One line of reflection", text: "Example: “I said yes to the extra requests because I had space. Next time I'll check my top three first.”" },
        ] },
        { p: "After four weeks you'll have real numbers: how much AI saves you, how much leaks back into work, and whether the protected block holds. That's also exactly the evidence you need for a conversation with your manager. If you already do a [weekly review](/guides/weekly-review), add this log to it instead of creating a new habit." },
      ],
    },
    {
      h2: "How do I talk to my manager about AI time savings?",
      blocks: [
        { p: "Talk to your manager about AI time savings by sharing what you've measured, proposing where the time should go, and agreeing on it explicitly, so that expectations don't reset by drift." },
        { p: "Many people avoid the topic because they worry that admitting AI saves time means getting more work. But staying quiet usually leads to the same result, without any say in it. A clear, positive framing works best. Here is a script you can adapt:" },
        { list: [
          "**Share the result:** “I've been tracking how AI helps me. Over the last month it's saved me around two hours a week, mostly on reports and meeting notes.”",
          "**Show the value:** “That's let me deliver [the report] faster and with fewer errors.”",
          "**Propose the split:** “I'd like to use about half of that for [deep work on the Q3 project / learning a new skill], and keep the rest as buffer so I can stop working late.”",
          "**Name the risk:** “What I want to avoid is the time being filled with extra requests by default. Can we agree on what my priorities are, so new work goes through you?”",
          "**Agree on a check-in:** “Can we review this in a month?”",
        ] },
        { p: "If you're a manager, have this conversation with your team before they have to bring it up. Decide together which work AI should speed up, and whether faster delivery means more output, better quality or shorter days. Each is a valid choice. The mistake is not choosing." },
        { tip: "Proposing to spend saved time on learning or deep work is often the easiest first ask, because it benefits both you and the team. It's a natural link to your [personal growth](/life-areas/personal-growth) and [career](/life-areas/finance-and-career) goals." },
      ],
    },
    {
      h2: "Can AI cause burnout?",
      blocks: [
        { p: "AI doesn't cause burnout by itself, but it can add to it when it raises expectations, speeds up the pace of work and adds new tasks like checking and correcting output." },
        { p: "Watch for these AI-specific pressures:" },
        { list: [
          "**Faster deadlines.** “It only takes a minute now” turns into a shorter time for everything.",
          "**Review load.** Checking AI drafts is real work, and it's tiring because errors are hard to spot.",
          "**Always-on output.** When producing is easy, there's always more you could produce.",
          "**Learning pressure.** New tools every month, and the feeling that you'll fall behind if you don't keep up.",
          "**Job worry.** Uncertainty about what AI means for your role can keep you working longer to prove your worth.",
        ] },
        { p: "If several of these sound familiar and you're also tired, cynical or struggling to switch off, check yourself against the [12 signs of burnout](/guides/signs-of-burnout) and talk to someone. A doctor or a mental health professional is the right person if it's affecting your health." },
      ],
    },
    {
      h2: "Common mistakes with AI time savings",
      blocks: [
        { list: [
          "**Not measuring.** If you don't know how much time you saved, you can't protect it or talk about it.",
          "**Leaving the time scattered.** Fifteen minutes here and there always goes to email. Combine it into one or two blocks.",
          "**Spending it all on more output.** Some extra output is fine. All of it means AI made your job bigger, not your life better.",
          "**Assuming your manager knows.** Most managers have no idea how much time AI saves each person. Tell them, with numbers.",
          "**Choosing the area every evening.** Decide once a week where the time goes. Daily debates end in defaults, as the guide on [decision fatigue](/guides/decision-fatigue) explains.",
        ] },
      ],
    },
    {
      h2: "Employees, freelancers and managers: what changes?",
      blocks: [
        { list: [
          "**Employees:** your hours are usually fixed, so saved time either becomes more work or more breathing room within the same hours. Agree with your manager what it should be, and keep your end-of-day time.",
          "**Freelancers paid by the project:** AI savings go straight to you. Decide in advance whether you'll take more work or work fewer hours, and set a weekly hour limit so the choice is real.",
          "**Freelancers paid by the hour:** faster work means lower invoices unless you change your pricing. Consider project or value pricing, so the saving isn't only your client's.",
          "**Managers:** you set the norms. If you send AI-drafted messages at 22:00, your team will read it as the new pace. Use the savings to cut meetings and protect focus time, and say so out loud.",
        ] },
        { p: "Whatever your situation, the weekly question is the same: where should the time go? If you're not sure which part of your life needs it, start with the free [Life Balance Check](/#check)." },
      ],
    },
  ],
  faq: [
    { q: "Can AI cause burnout?", a: "AI can add to burnout when it speeds up the pace of work, raises expectations and adds review tasks. The tools themselves aren't the problem; how the saved time and new expectations are managed is." },
    { q: "Should I tell my boss that AI saves me time?", a: "Usually yes, ideally with numbers and a proposal for where the time should go. If you stay quiet, the time tends to fill with extra work anyway, without you having a say." },
    { q: "How do I track the time AI saves me?", a: "Keep a short weekly log of the tasks AI helped with and the minutes saved, then note where that time actually went. After a month you'll know your real number and how much of it leaks back into work." },
    { q: "Which jobs save the most time with AI?", a: "Roles with a lot of writing, summarising, searching and first drafts tend to save the most, such as marketing, support, sales and many office jobs. Across whole jobs, large studies find the average saving is a few percent of work hours." },
  ],
};

export default extra;
