import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { DarkBand } from "@/components/site/dark-band";
import { Faq } from "@/components/site/faq";
import { Features } from "@/components/site/features";
import { BTN, PAD, Section, SectionHead } from "@/components/site/frame";
import { Hero } from "@/components/site/hero";
import { PageShell } from "@/components/site/page-shell";
import { Pricing } from "@/components/site/pricing";
import { Scale } from "@/components/site/scale";
import { Testimonials } from "@/components/site/testimonials";

/*
 * Homepage: a numbered sequence of sections (01-06) in alternating tones so each part
 * reads as its own block. Each section links on to its full page.
 */
export default function Home() {
  return (
    <PageShell>
      <Hero />

      <Section id="features" tone="paper">
        <Reveal className={`${PAD.x} ${PAD.y} flex flex-wrap items-end justify-between gap-4`}>
          <SectionHead
            index="01"
            eyebrow="Platform"
            title="Everything you need to run programs."
            lede="From applications to impact reports, Aplikant covers the full program lifecycle."
          />
        </Reveal>
        <Features />
      </Section>

      <DarkBand />

      <Section>
        <Testimonials />
      </Section>

      <Section>
        <Scale />
      </Section>

      <Section id="pricing">
        <Pricing />
      </Section>

      <Section id="faq">
        <Faq />
      </Section>

      <SiteFooter />
    </main>
  );
}
