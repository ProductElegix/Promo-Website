import { Opening } from "@/components/sections/Opening";
import { FactsTicker } from "@/components/sections/FactsTicker";
import { Problem } from "@/components/sections/Problem";
import { Spread } from "@/components/sections/Spread";
import { Orbit } from "@/components/sections/Orbit";
import { Compare } from "@/components/sections/Compare";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AreasList } from "@/components/sections/AreasList";
import { BalanceCheck } from "@/components/sections/BalanceCheck";
import { Trust } from "@/components/sections/Trust";
import { PopularGuides } from "@/components/sections/PopularGuides";
import { Join } from "@/components/sections/Join";
import { Faq } from "@/components/sections/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { getContent } from "@/lib/lang";

export default async function Home() {
  const { c: { FAQ } } = await getContent();
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main id="top">
      <JsonLd data={faqData} />
      <Opening />
      <FactsTicker />
      <Problem />
      <Spread />
      <HowItWorks />
      <Orbit />
      <Compare />
      <AreasList />
      <BalanceCheck />
      <Trust />
      <PopularGuides />
      <Faq />
      <Join />
    </main>
  );
}
