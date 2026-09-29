import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Beyond } from "@/components/site/dark-band";
import { Features } from "@/components/site/features";
import { PageHero, PAD, Section, SectionHead } from "@/components/site/frame";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Features · Aplikant",
  description:
    "Program management, smart applications, participant tracking, impact reports, M&E surveys and role-based access, in one platform.",
};

export default function FeaturesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Features"
        title="Everything you need to run programs."
        lede="From applications to impact reports, Aplikant covers the full program lifecycle, so your team works in one place instead of six tools."
      />

      <Section tone="paper">
        <Reveal className={`${PAD.x} ${PAD.y}`}>
          <SectionHead
            index="01"
            eyebrow="Core platform"
            title="Six tools, one lifecycle."
            lede="Included from the Free plan up: create programs, collect applications, track every participant and report on outcomes."
          />
        </Reveal>
        <Features cell="bg-white" />
      </Section>

      <Section tone="dark">
        <Beyond index="02" />
      </Section>
    </PageShell>
  );
}
