import type { Metadata } from "next";
import { Building2, Check, GraduationCap, Landmark, Lightbulb } from "lucide-react";
import { DashboardWindow } from "@/components/hero/dashboard-window";
import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/site/browser-frame";
import { Steps } from "@/components/site/dark-band";
import { PageHero, PAD, Section, SectionHead, TYPE } from "@/components/site/frame";
import { PageShell } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "How it works · Aplikant",
  description:
    "Create a program, collect applications, track participants and report impact, in four steps.",
};

const WHO = [
  {
    icon: Lightbulb,
    title: "Innovation hubs",
    body: "Run bootcamps, accelerators and hackathons across cohorts.",
  },
  {
    icon: Building2,
    title: "NGOs",
    body: "Prove outcomes to funders with M&E surveys and impact reports.",
  },
  {
    icon: Landmark,
    title: "Government agencies",
    body: "Manage programs at scale with scoped access for every team.",
  },
  {
    icon: GraduationCap,
    title: "Training organizations",
    body: "Deliver courses and assessments, then certify every graduate.",
  },
];

const PROGRAM_TYPES = [
  "Trainings",
  "Bootcamps",
  "Fellowships",
  "Workshops",
  "Accelerators",
  "Pitch competitions",
  "Hackathons",
];

export default function HowItWorksPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="How it works"
        title="Up and running in minutes."
        lede="Four simple steps take you from your first application form to a donor-ready impact report."
      />

      <Section tone="dark">
        <Reveal className={`${PAD.x} ${PAD.y}`}>
          <SectionHead
            tone="dark"
            index="01"
            eyebrow="The four steps"
            title="From first form to funder report."
          />
        </Reveal>
        <Steps />
      </Section>

      <Section tone="paper">
        <div className={`${PAD.x} ${PAD.y}`}>
          <Reveal>
            <SectionHead
              index="02"
              eyebrow="Your workspace"
              title="Everything lands on one dashboard."
              lede="Programs, participants, completion and applications update as you work, with demographics ready for your next report."
            />
          </Reveal>
          <Reveal className="mt-6 sm:mt-10">
            <BrowserFrame url="aplikant.app/dashboard">
              <DashboardWindow />
            </BrowserFrame>
          </Reveal>
        </div>
      </Section>

      <Section tone="light">
        <div className={`${PAD.x} ${PAD.y}`}>
          <Reveal>
            <SectionHead
              index="03"
              eyebrow="Built for"
              title="Made for the teams that run programs."
            />
          </Reveal>
          <ul className="mt-6 grid gap-px bg-navy/10 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {WHO.map((w, i) => (
              <li key={w.title} className="bg-cream py-4 sm:p-6">
                <Reveal index={i}>
                  <w.icon
                    className="h-4 w-4 text-navy sm:h-5 sm:w-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className={`mt-3 ${TYPE.h3}`}>{w.title}</h3>
                  <p className={`mt-1 ${TYPE.body} text-navy/60`}>{w.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PROGRAM_TYPES.map((t) => (
              <li
                key={t}
                className="flex items-center gap-1.5 rounded-full border border-navy/10 bg-white px-3 py-1 text-xs text-navy/70"
              >
                <Check className="h-3 w-3 text-mint" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </PageShell>
  );
}
