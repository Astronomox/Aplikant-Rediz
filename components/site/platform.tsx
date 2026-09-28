"use client";

import { useEffect, useRef, useState } from "react";
import { animatedFeatureIcons } from "@/components/features/animated-feature-icons";
import { TileArt } from "@/components/features/tile-art";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { DotGrid } from "@/components/texture/dot-grid";
import { features, type Feature, type FeatureKey } from "./content";
import { TwoTone } from "./frame";

/*
 * Platform section, after Attio's pinned rail:
 *   lg+   a sticky left rail lists every feature; a 2px gold bar sits on the page's
 *         left rail line beside the active one (scroll-spy), click to jump.
 *   <lg   the rail becomes a horizontal chip strip pinned under the header.
 * Each feature is a panel: two-tone copy cell, a tinted art cell with the feature's
 * illustration, then two supporting cells. Hairlines between everything.
 */

const panelId = (k: FeatureKey) => `feature-${k}`;

function useActiveFeature() {
  const [active, setActive] = useState<FeatureKey>("programs");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id.replace("feature-", "") as FeatureKey);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    features.forEach((f) => {
      const el = document.getElementById(panelId(f.key));
      if (el) io.observe(el);
    });
    return () => {
      io.disconnect();
    };
  }, []);
  return active;
}

function Rail({ active, onJump }: { active: FeatureKey; onJump: (k: FeatureKey) => void }) {
  return (
    <nav aria-label="Features" className="sticky top-28 hidden py-16 lg:block">
      <ul>
        {features.map((f) => {
          const on = f.key === active;
          return (
            <li key={f.key} className="relative">
              {/* Active bar sits on the page's rail line */}
              <span
                aria-hidden="true"
                className={`absolute -left-px top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gold transition-opacity duration-300 ${
                  on ? "opacity-100" : "opacity-0"
                }`}
              />
              <button
                type="button"
                aria-current={on ? "true" : undefined}
                onClick={() => {
                  onJump(f.key);
                }}
                className={`w-full py-2 pl-8 text-left text-[15px] transition-colors duration-300 ${
                  on ? "text-navy" : "text-navy/35 hover:text-navy/70"
                }`}
              >
                {f.tab}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ChipStrip({ active, onJump }: { active: FeatureKey; onJump: (k: FeatureKey) => void }) {
  const strip = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const s = strip.current;
    const chip = s?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!s || !chip) return;
    s.scrollTo({
      left: chip.offsetLeft - (s.clientWidth - chip.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);
  return (
    <div className="sticky top-16 z-30 border-b border-navy/10 bg-cream/90 backdrop-blur-md lg:hidden">
      <div
        ref={strip}
        className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {features.map((f) => {
          const on = f.key === active;
          return (
            <button
              key={f.key}
              type="button"
              data-chip={f.key}
              onClick={() => {
                onJump(f.key);
              }}
              className={`relative shrink-0 border-r border-navy/10 px-4 py-3 text-sm transition-colors ${
                on ? "bg-white text-navy" : "text-navy/50"
              }`}
            >
              {f.tab}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-0.5 bg-gold transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Panel({ feature: f, index }: { feature: Feature; index: number }) {
  const Icon = animatedFeatureIcons[f.key];
  const darkArt = f.key === "programs";
  return (
    <article id={panelId(f.key)} className="scroll-mt-32 border-b border-navy/10 last:border-b-0">
      {/* Copy cell */}
      <Reveal className="px-5 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-20">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold">
            <Icon index={index} className="h-4 w-4" />
          </span>
          {f.ai && (
            <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#047857]">
              AI POWERED
            </span>
          )}
        </div>
        <TwoTone
          as="h3"
          lead={f.lead}
          rest={f.rest}
          className="mt-5 max-w-xl text-xl leading-snug sm:text-2xl"
        />
      </Reveal>

      {/* Art cell */}
      <div
        className={`relative flex min-h-[190px] items-center justify-center overflow-hidden border-y px-6 py-8 sm:min-h-[240px] sm:py-12 lg:min-h-[320px] ${
          darkArt ? "border-white/10 bg-navy" : "border-navy/10 bg-navy/[0.035]"
        }`}
      >
        <DotGrid id={`art-${f.key}`} tone={darkArt ? "dark" : "light"} fade="radial" />
        <div aria-hidden="true" className="relative max-w-full">
          <TileArt icon={f.key} />
        </div>
      </div>

      {/* Supporting cells */}
      <div className="grid sm:grid-cols-2">
        {f.cells.map((c, i) => (
          <div
            key={c.lead}
            className={`px-5 py-6 sm:px-10 sm:py-8 ${i === 1 ? "border-t border-navy/10 sm:border-l sm:border-t-0" : ""}`}
          >
            <TwoTone
              as="p"
              lead={c.lead}
              rest={c.rest}
              className="max-w-sm text-[15px] leading-relaxed"
            />
          </div>
        ))}
      </div>
    </article>
  );
}

export function PlatformPanels() {
  const active = useActiveFeature();
  const reduced = usePrefersReducedMotion();
  const jump = (k: FeatureKey) => {
    document
      .getElementById(panelId(k))
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  };

  return (
    <div className="lg:grid lg:grid-cols-[17rem_1fr]">
      <div className="lg:border-r lg:border-navy/10">
        <Rail active={active} onJump={jump} />
      </div>
      <PlayWhenVisible>
        <ChipStrip active={active} onJump={jump} />
        {features.map((f, i) => (
          <Panel key={f.key} feature={f} index={i} />
        ))}
      </PlayWhenVisible>
    </div>
  );
}
