import { ArrowRight } from "lucide-react";
import { DashboardWindow } from "@/components/hero/dashboard-window";
import { FormFragment, QrFragment } from "@/components/hero/fragments";
import { ProductTour } from "@/components/hero/product-tour";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { ParallaxLayer, ScrollScene } from "@/components/motion/scroll-scene";
import { DotGrid } from "@/components/texture/dot-grid";
import { hero } from "./content";
import { BTN, COLUMN, Pill } from "./frame";

/*
 * Hero, after Attio's: centred copy with compact buttons, then a product window
 * showing the Aplikant dashboard, with feature fragments that pull away from it as
 * you scroll.
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
                {/* Phones/tablets: the still dashboard. Desktop: the product film. */}
                <div className="lg:hidden">
                  <DashboardWindow />
                </div>
                <div className="hidden lg:block">
                  <ProductTour />
                </div>
              </div>
            </ParallaxLayer>

            {/* Fragments drift at their own rates as the hero scrolls away */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
            >
              {/* Parked at the window's outer corners so they never cover the film. */}
              <ParallaxLayer y={-140} className="absolute -left-44 -top-8 z-20">
                <FormFragment />
              </ParallaxLayer>
              <ParallaxLayer y={-190} className="absolute -right-44 -top-12 z-20">
                <QrFragment />
              </ParallaxLayer>
            </div>
          </PlayWhenVisible>
        </div>
      </div>
    </ScrollScene>
  );
}
