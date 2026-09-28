import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Announcement } from "@/components/site/announcement";
import { nav } from "@/components/site/content";
import { DarkBand } from "@/components/site/dark-band";
import { Faq } from "@/components/site/faq";
import { Features } from "@/components/site/features";
import { PAD, Section, SectionHead } from "@/components/site/frame";
import { Hero } from "@/components/site/hero";
import { Pricing } from "@/components/site/pricing";
import { Scale } from "@/components/site/scale";
import { Testimonials } from "@/components/site/testimonials";
import { Reveal } from "@/components/motion/reveal";

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
