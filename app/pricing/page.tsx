import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
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

/** Features every tier gets, listed once above the table instead of as all-check rows. */
const INCLUDED = [
  "Unlimited programs",
  "Unlimited participants",
  "Application forms (free + paid) with Paystack-paid applications",
  "Attendance tracking (manual + QR), with QR reopen + regenerate",
  "Participant IDs (APK-XXXXXX)",
  "Form templates",
  "Admin edit for participant + application",
  "M&E survey data collection",
  "Role-based access",
  "Multi-currency billing (NGN & USD via Paystack)",
  "Data encrypted & securely hosted",
];

/** true = included, false = not included, string = a specific limit. From the live plan copy. */
type Cell = boolean | string;
type Row = { label: string; cells: [Cell, Cell, Cell, Cell] };
const TIERS = ["Free", "Growth", "Enterprise", "Custom"] as const;
const GROUPS: { title: string; rows: Row[] }[] = [
  {
    title: "Programs & Team",
    rows: [
      { label: "Team members", cells: ["1", "10", "20", "Unlimited"] },
      { label: "Program tracks / sub‑programs", cells: [false, true, true, true] },
      { label: "Minor participants + guardian check-in", cells: [false, true, true, true] },
    ],
  },
  {
    title: "Certificates",
    rows: [
      { label: "Certificate templates", cells: ["1", "4", "8", "Unlimited"] },
      { label: "Certificate email campaigns", cells: [false, true, true, true] },
    ],
  },
  {
    title: "Communications",
    rows: [
      {
        label: "Participant emails / month",
        cells: ["Transactional only", "5,000", "15,000", "Custom volume"],
      },
      { label: "Email delivery tracking & recipient drill-down", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Reporting & AI",
    rows: [
      { label: "AI Powered Reports", cells: [false, "Basic", "Advanced", "Advanced"] },
      { label: "Data export (CSV & PDF)", cells: [false, true, true, true] },
      { label: "Track filters on Attendance / Email / Certificates", cells: [false, true, true, true] },
    ],
  },
  {
    title: "Learning & Engagement",
    rows: [
      { label: "Learning Management System (Courses)", cells: [false, true, true, true] },
      { label: "Assessments: builder, gradebook, email delivery", cells: [false, true, true, true] },
      { label: "Manage Pitch Competitions & Hackathons", cells: [false, true, true, true] },
      { label: "Private judging results + score exports", cells: [false, false, true, true] },
    ],
  },
  {
    title: "Video Sessions",
    rows: [
      {
        label: "Live & recorded video sessions",
        cells: [false, "10 per program", "Unlimited", "Unlimited"],
      },
    ],
  },
  {
    title: "Admin, Branding & Support",
    rows: [
      { label: "Scoped admin (per-form reviewer invites)", cells: [false, false, true, true] },
      { label: "Remove Aplikant branding", cells: ["Required", "Required", "Removable", "Removable"] },
      { label: "Support", cells: ["Community", "Standard", "Priority", "Dedicated CSM"] },
    ],
  },
  {
    title: "Custom / Enterprise-scale",
    rows: [
      { label: "Custom integrations, SSO & SLA", cells: [false, false, false, true] },
      {
        label: "Dedicated onboarding & customer success manager",
        cells: [false, false, false, true],
      },
    ],
  },
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
            <SectionHead
              index="01"
              eyebrow="Compare plans"
              title="Every plan, side by side."
              lede="See what's included on every plan, and what changes as you grow."
            />
          </Reveal>

          <Reveal className="mt-6 sm:mt-10">
            <div className="border border-navy/10 bg-white p-5 sm:p-6">
              <h3 className="text-[13px] font-semibold uppercase tracking-wide text-navy/50">
                Included in every plan
              </h3>
              <ul className="mt-4 grid gap-x-6 gap-y-2 text-[13px] leading-snug sm:grid-cols-2 sm:text-sm lg:grid-cols-3">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" aria-hidden="true" />
                    <span className="text-navy/75">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The table scrolls sideways inside its own box on narrow screens. */}
          <div className="mt-6 overflow-x-auto sm:mt-10">
            <table className="w-full min-w-[640px] border-collapse text-left text-xs sm:text-sm">
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
                {GROUPS.map((g) => (
                  <Fragment key={g.title}>
                    <tr className="border-b border-navy/10 bg-navy/[0.03]">
                      <th
                        colSpan={TIERS.length + 1}
                        scope="colgroup"
                        className="sticky left-0 py-2 pr-4 text-[11px] font-semibold uppercase tracking-wide text-navy/50"
                      >
                        {g.title}
                      </th>
                    </tr>
                    {g.rows.map((r) => (
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
                  </Fragment>
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
