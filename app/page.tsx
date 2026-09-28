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
 * Homepage. Construction after attio.com: one framed column with hairline rails from
 * header to footer, sections separated by full-width hairlines, content in cells.
 * Palette stays Aplikant's (navy, gold, mint, cream). Copy is the live site's; see
 * components/site/content.ts.
 */
export default function Home() {
  return (
    <main className="overflow-x-clip bg-cream text-navy">
      <Announcement />
      <SiteHeader nav={nav} />

      <Hero />

      <Section id="features">
        <Reveal className={`${PAD.x} ${PAD.y}`}>
          <SectionHead
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
