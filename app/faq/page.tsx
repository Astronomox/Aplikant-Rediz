import type { Metadata } from "next";
import { Faq } from "@/components/site/faq";
import { PageHero, Section } from "@/components/site/frame";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "FAQ · Aplikant",
  description: "Answers about plans, programs, forms, team access, security and reports.",
};

export default function FaqPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions."
        lede="Everything you need to know about Aplikant: plans, programs, forms, your team, security and reports."
      />
      <Section tone="paper">
        <Faq head={false} />
      </Section>
    </PageShell>
  );
}
