import { Opening } from "@/components/sections/Opening";
import { FactsTicker } from "@/components/sections/FactsTicker";
import { Problem } from "@/components/sections/Problem";
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
import { FAQ } from "@/lib/content";

const FAQ_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <main id="top">
      <JsonLd data={FAQ_DATA} />
      <Opening />
      <FactsTicker />
      <Problem />
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
