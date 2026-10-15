import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Compare } from "@/components/sections/Compare";
import { Intro } from "@/components/sections/Intro";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { AreasList } from "@/components/sections/AreasList";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { BalanceCheck } from "@/components/sections/BalanceCheck";
import { Trust } from "@/components/sections/Trust";
import { Join } from "@/components/sections/Join";
import { PrivacyBlock } from "@/components/sections/PrivacyBlock";
import { Faq } from "@/components/sections/Faq";
import { Manifesto } from "@/components/sections/Manifesto";
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
      <Hero />
      <Problem />
      <Compare />
      <Intro />
      <HowItWorks />
      <Features />
      <AreasList />
      <AppShowcase />
      <BalanceCheck />
      <Trust />
      <PrivacyBlock />
      <Join />
      <Faq />
      <Manifesto />
    </main>
  );
}
