import { ArrowRight, Check } from "lucide-react";
import { Disclosure } from "@/components/disclosure";
import { Reveal } from "@/components/motion/reveal";
import { plans, type Plan } from "./content";
import { BTN, PAD, SectionHead } from "./frame";

/*
 * Pricing: the four real tiers as hairline cells (Attio's changelog-card construction),
 * each over a barcode tick strip whose ticks rise under the hovered plan.
 * Growth is the navy cell. Feature lists collapse below lg.
 */

function Ticks({ dark }: { dark: boolean }) {
  const c = dark ? "rgba(255,255,255,0.18)" : "rgba(15,23,42,0.14)";
  const hot = dark ? "rgba(245,158,11,0.9)" : "rgba(15,23,42,0.55)";
  return (
    <div aria-hidden="true" className="relative mt-auto h-6 overflow-hidden sm:h-12">
      <div
        className="absolute inset-x-0 bottom-0 h-5 transition-[height] duration-500 ease-out group-hover:h-12 motion-reduce:transition-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${c} 0 1px, transparent 1px 12px)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-0 opacity-0 transition-[height,opacity] duration-500 ease-out group-hover:h-12 group-hover:opacity-100 motion-reduce:transition-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${hot} 0 1px, transparent 1px 12px)`,
        }}
      />
    </div>
  );
}

function PlanCell({ plan: p, index }: { plan: Plan; index: number }) {
  const dark = p.featured === true;
  return (
    <div
      className={`group relative flex flex-col ${
        dark ? "bg-navy text-white" : "bg-cream text-navy"
      } ${index > 0 ? "border-t border-navy/10 sm:border-t-0" : ""} ${
        index % 2 === 1 ? "sm:border-l" : ""
      } ${index > 1 ? "sm:border-t lg:border-t-0" : ""} ${index > 0 ? "lg:border-l" : ""} border-navy/10`}
    >
      {dark && <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-gold" />}
      <Reveal index={index} className="flex flex-1 flex-col px-5 pb-3 pt-5 sm:px-6 sm:pb-4 sm:pt-7">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-medium">{p.tier}</h3>
          {p.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                dark ? "bg-gold text-navy" : "bg-navy/[0.07] text-navy/70"
              }`}
            >
              {p.badge}
            </span>
          )}
        </div>
        <p
          className={`mt-1 text-[13px] leading-snug sm:min-h-[2.75rem] sm:text-sm ${dark ? "text-white/55" : "text-navy/55"}`}
        >
          {p.blurb}
        </p>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-1.5 sm:mt-6">
          {p.prefix && (
            <span className={`text-sm ${dark ? "text-white/55" : "text-navy/55"}`}>{p.prefix}</span>
          )}
          <span className="text-2xl font-medium leading-none tracking-tight sm:text-[2rem]">
            {p.price}
          </span>
          <span className={`text-sm ${dark ? "text-white/50" : "text-navy/50"}`}>{p.period}</span>
        </div>
        <p
          className={`mt-1.5 text-xs font-medium sm:mt-2 sm:h-4 ${dark ? "text-gold" : "text-[#047857]"}`}
        >
          {p.note ?? ""}
        </p>

        <a
          href="#"
          className={`mt-4 w-full sm:mt-5 ${dark ? BTN.gold : p.tier === "Custom" ? BTN.primary : BTN.secondary}`}
        >
          {p.cta}
        </a>

        <Disclosure label="What's included" onDark={dark} className="mt-2 sm:mt-4 lg:mt-6">
          <ul className="space-y-2 pb-2 text-[13px] leading-snug">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check
                  className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${dark ? "text-gold" : "text-mint"}`}
                  aria-hidden="true"
                />
                <span className={dark ? "text-white/75" : "text-navy/70"}>{f}</span>
              </li>
            ))}
          </ul>
        </Disclosure>
      </Reveal>
      <Ticks dark={dark} />
    </div>
  );
}

export function Pricing() {
  return (
    <>
      <div className={`grid gap-5 ${PAD.x} ${PAD.y} lg:grid-cols-12 lg:items-end`}>
        <Reveal className="lg:col-span-7">
          <SectionHead
            eyebrow="Pricing"
            title="Simple, transparent pricing."
            lede="Start free forever. Upgrade when you're ready to grow."
          />
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9 lg:text-right">
          <a href="#" className={BTN.small}>
            Compare all plans &amp; features
            <ArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
      <div className="grid border-t border-navy/10 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p, i) => (
          <PlanCell key={p.tier} plan={p} index={i} />
        ))}
      </div>
    </>
  );
}
