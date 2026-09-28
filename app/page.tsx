import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Announcement } from "@/components/site/announcement";
import { nav } from "@/components/site/content";
import { DarkBand } from "@/components/site/dark-band";
import { Faq } from "@/components/site/faq";
import { H2, Pill, Section, TwoTone } from "@/components/site/frame";
import { Hero } from "@/components/site/hero";
import { PlatformPanels } from "@/components/site/platform";
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
        <Reveal className="px-5 py-16 sm:px-10 lg:px-12 lg:py-24">
          <Pill>Platform</Pill>
          <TwoTone
            lead="Everything you need to run programs."
            rest="From applications to impact reports, Aplikant covers the full program lifecycle."
            className={`mt-5 max-w-4xl ${H2}`}
          />
        </Reveal>
        <div className="border-t border-navy/10">
          <PlatformPanels />
        </div>
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
