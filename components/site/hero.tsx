import { ArrowRight, Check, QrCode, RefreshCw, Sparkles } from "lucide-react";
import { DashboardWindow } from "@/components/hero/dashboard-window";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { ParallaxLayer, ScrollScene } from "@/components/motion/scroll-scene";
import { DotGrid } from "@/components/texture/dot-grid";
import { hero } from "./content";
import { BTN, COLUMN, Pill } from "./frame";

/*
 * Hero, after Attio's: centred copy with compact buttons, then a product "window"
 * that floating fragments pull away from as you scroll.
 *
 * Not a fake dashboard (REFERENCE.md known issue #1): the window holds the animated
 * program-engine graphic, and each fragment is a schematic of a real feature, with
 * no invented people, organisations or numbers.
 */

function WindowChrome({ title }: { title: string }) {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-white/10 px-4">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="text-xs text-white/45">{title}</span>
    </div>
  );
}

/** Fragment: application form (paid via Paystack). */
function FormFragment() {
  return (
    <div className="w-[248px] rounded-xl bg-white p-4 text-navy shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] ring-1 ring-navy/10">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Application form</p>
        <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
          Paid · Paystack
        </span>
      </div>
      <div className="mt-3 space-y-2.5" aria-hidden="true">
        {[0.85, 0.6, 0.72].map((w, i) => (
          <div key={i}>
            <span className="block h-1.5 w-12 rounded-full bg-navy/15" />
            <span className="mt-1.5 block h-6 rounded-md bg-navy/[0.04] ring-1 ring-navy/10">
              <span
                className="fx-fill block h-full rounded-md bg-navy/[0.06]"
                style={{ width: `${String(w * 100)}%` }}
              />
            </span>
          </div>
        ))}
      </div>
      <span className="mt-3 flex h-7 items-center justify-center rounded-md bg-navy text-[11px] font-medium text-white">
        Submit application
      </span>
    </div>
  );
}

/** Fragment: QR attendance session. */
function QrFragment() {
  return (
    <div className="w-[228px] rounded-xl bg-white p-4 text-navy shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] ring-1 ring-navy/10">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">QR attendance</p>
        <span className="flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          Session open
        </span>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-cream py-4 ring-1 ring-navy/5">
        <QrCode className="h-20 w-20 text-navy" strokeWidth={1.25} aria-hidden="true" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] font-medium">
        <span className="flex h-7 items-center justify-center gap-1 rounded-md ring-1 ring-navy/15">
          Reopen
        </span>
        <span className="flex h-7 items-center justify-center gap-1 rounded-md ring-1 ring-navy/15">
          <RefreshCw className="h-3 w-3" aria-hidden="true" /> Regenerate
        </span>
      </div>
    </div>
  );
}

/** Fragment: AI impact report, terminal-style (Attio's agent console). */
function ReportFragment() {
  const lines = ["Completion rates", "Gender breakdowns", "Geographic data", "Learning outcomes"];
  return (
    <div className="w-[284px] overflow-hidden rounded-xl bg-[#0a1020] font-mono text-[11px] text-white/80 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
      <div
        className="flex h-7 items-center gap-1.5 border-b border-white/10 px-3"
        aria-hidden="true"
      >
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="space-y-1.5 p-3">
        <p className="text-white">
          <span className="text-gold">›</span> Generate a donor-ready impact report
        </p>
        <p className="flex items-center gap-1.5 text-white/55">
          <Sparkles className="h-3 w-3 text-gold" aria-hidden="true" /> AI powered report
        </p>
        {lines.map((l) => (
          <p key={l} className="flex items-center gap-1.5 pl-3">
            <Check className="h-3 w-3 text-mint" aria-hidden="true" />
            {l}
          </p>
        ))}
        <p className="pl-3 text-white/45">Export · CSV &amp; PDF</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <ScrollScene className="relative overflow-hidden border-b border-navy/10 bg-cream text-navy">
      {/* Haze behind the window, like Attio's blue wash, in our gold + mint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgba(16,185,129,0.16),transparent_70%),radial-gradient(40%_50%_at_30%_90%,rgba(245,158,11,0.14),transparent_70%)]"
      />
      <DotGrid id="hero-dots" tone="light" fade="top" />

      <div className={`${COLUMN} relative lg:border-x lg:border-navy/10`}>
        {/* Copy */}
        <div className="px-5 pb-12 pt-14 text-center sm:pt-20 lg:px-8 lg:pb-16 lg:pt-24">
          <a
            href="#features"
            className="group inline-flex items-center gap-1 rounded-full border border-navy/10 bg-white/70 py-1 pl-1 pr-2.5 text-xs font-medium text-navy/75 shadow-sm"
          >
            <Pill>New</Pill>
            <span className="ml-1">{hero.pill}</span>
            <ArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
          </a>
          <h1 className="mx-auto mt-6 max-w-4xl text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-navy/55 sm:text-lg">
            {hero.body}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-2.5 sm:flex-row">
            <a href="#pricing" className={BTN.secondary}>
              View pricing
            </a>
            <a href="#" className={BTN.primary}>
              Start for free
            </a>
          </div>
          <p className="mt-4 text-xs text-navy/45">{hero.fine}</p>
        </div>

        {/* Product window + floating fragments */}
        <div className="relative px-4 pb-0 lg:px-16">
          <PlayWhenVisible className="relative mx-auto max-w-[1000px]">
            <ParallaxLayer y={-40} className="relative z-10">
              <div className="overflow-hidden rounded-t-2xl border border-b-0 border-navy/10 bg-navy text-white shadow-[0_-20px_60px_-30px_rgba(15,23,42,0.5)]">
                <WindowChrome title="aplikant.app/dashboard" />
                <DashboardWindow />
              </div>
            </ParallaxLayer>

            {/* Fragments drift at their own rates as the hero scrolls away */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
            >
              <ParallaxLayer y={-140} className="absolute -left-24 top-10 z-20">
                <FormFragment />
              </ParallaxLayer>
              <ParallaxLayer y={-70} className="absolute -left-28 bottom-6 z-20">
                <ReportFragment />
              </ParallaxLayer>
              <ParallaxLayer y={-190} className="absolute -right-20 top-24 z-20">
                <QrFragment />
              </ParallaxLayer>
            </div>
          </PlayWhenVisible>
        </div>
      </div>
    </ScrollScene>
  );
}
