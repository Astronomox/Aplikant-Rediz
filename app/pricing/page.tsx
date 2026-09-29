import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { BTN, PageHero, PAD, Section, SectionHead } from "@/components/site/frame";
import { PageShell } from "@/components/site/page-shell";
import { Pricing } from "@/components/site/pricing";

export const metadata: Metadata = {
  title: "Pricing · Aplikant",
  description:
    "Start free forever. Growth, Enterprise and Custom plans when you are ready to grow.",
};

/** true = included, false = not included, string = a specific limit. From the plan copy. */
type Cell = boolean | string;
const TIERS = ["Free", "Growth", "Enterprise", "Custom"] as const;
const ROWS: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  { label: "Programs & participants", cells: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
  { label: "Application forms (free + paid)", cells: [true, true, true, true] },
  { label: "Attendance (manual + QR)", cells: [true, true, true, true] },
  { label: "M&E surveys", cells: [true, true, true, true] },
  { label: "Team members", cells: ["1", "Up to 10", "Up to 20", "Unlimited"] },
  { label: "Certificate templates", cells: ["1", "4", "8", "Unlimited"] },
  { label: "Participant emails / month", cells: [false, "5,000", "15,000", "Custom"] },
  { label: "Tracks & sub-programs", cells: [false, true, true, true] },
  { label: "Courses & assessments", cells: [false, true, true, true] },
  { label: "Pitch competitions & hackathons", cells: [false, true, true, true] },
  {
    label: "Live & recorded video sessions",
    cells: [false, "10 per program", "Unlimited", "Unlimited"],
  },
  { label: "AI-powered reports", cells: [false, "Basic", "Advanced", "Advanced"] },
  { label: "Data export (CSV & PDF)", cells: [false, true, true, true] },
  { label: "Scoped reviewer access", cells: [false, false, true, true] },
  { label: "Remove Aplikant branding", cells: [false, false, true, true] },
  { label: "Priority support", cells: [false, false, true, true] },
  { label: "Dedicated success manager", cells: [false, false, false, true] },
  { label: "Custom integrations, SSO & SLA", cells: [false, false, false, true] },
];

function Mark({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-mint" aria-label="Included" />;
  if (value === false)
    return <Minus className="mx-auto h-4 w-4 text-navy/20" aria-label="Not included" />;
  return <span className="text-navy/80">{value}</span>;
}

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing."
        lede="Start free forever, with no card and no expiry. Upgrade when you're ready to grow. Save 18% when you pay annually."
      />

      <Section tone="light">
        <Pricing head={false} />
      </Section>

      <Section id="compare" tone="paper" className="scroll-mt-16">
        <div className={`${PAD.x} ${PAD.y}`}>
          <Reveal>
            <SectionHead index="01" eyebrow="Compare plans" title="Every plan, side by side." />
          </Reveal>
          {/* The table scrolls sideways inside its own box on narrow screens. */}
          <div className="mt-6 overflow-x-auto sm:mt-10">
            <table className="w-full min-w-[560px] border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-navy/15">
                  <th className="sticky left-0 bg-white py-3 pr-4 font-medium text-navy/50">
                    Feature
                  </th>
                  {TIERS.map((t) => (
                    <th
                      key={t}
                      className={`px-3 py-3 text-center font-semibold ${t === "Growth" ? "text-[#b45309]" : ""}`}
                    >
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label} className="border-b border-navy/10">
                    <th className="sticky left-0 bg-white py-2.5 pr-4 font-normal text-navy/75">
                      {r.label}
                    </th>
                    {r.cells.map((c, i) => (
                      <td
                        key={TIERS[i]}
                        className={`px-3 py-2.5 text-center ${i === 1 ? "bg-gold/[0.06]" : ""}`}
                      >
                        <Mark value={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-navy/60 sm:text-sm">
            Questions about a plan?
            <Link href="/faq" className={BTN.small}>
              Read the FAQ <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
