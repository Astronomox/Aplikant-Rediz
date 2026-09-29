import type { Metadata } from "next";
import { PageHero, Section } from "@/components/site/frame";
import { PageShell } from "@/components/site/page-shell";
import { ProgramDirectory } from "@/components/site/program-directory";

export const metadata: Metadata = {
  title: "Discover Opportunities · Aplikant",
  description: "Find programs and standalone public forms from organizations around the world.",
};

export default function DiscoverPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Discover"
        title="Discover Opportunities"
        lede="Find programs and standalone public forms from organizations around the world."
      />
      <Section tone="paper">
        <ProgramDirectory />
      </Section>
    </PageShell>
  );
}
