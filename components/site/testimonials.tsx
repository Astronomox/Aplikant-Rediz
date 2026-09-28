"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { DotGrid } from "@/components/texture/dot-grid";
import { testimonials } from "./content";
import { Pill } from "./frame";

/*
 * Testimonials, after Attio's serif pull-quote + customer logo tabs.
 * Quotes, names and organisations are from the live site.
 *
 * The three organisation marks below are ILLUSTRATIVE placeholders, commissioned
 * for this page (the site had no logos). Replace them with the organisations' real
 * logos, with permission, before launch.
 */

function LagosMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2 21 7v10l-9 5-9-5V7z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 8v8h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function NairobiMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="currentColor" />
    </svg>
  );
}
function AbujaMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="9" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="15" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="15" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const MARKS: Record<string, () => ReactElement> = {
  "Lagos Innovation Hub": LagosMark,
  "Nairobi Tech Hub": NairobiMark,
  "Abuja Social Impact Lab": AbujaMark,
};

const CYCLE_MS = 6000;

export function Testimonials() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e) setVisible(e.isIntersecting);
    });
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible || reduced) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [visible, reduced, active]);

  const t = testimonials[active];
  if (!t) return null;
  const tr = reduced ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div ref={ref}>
      <div className="relative px-5 py-20 text-center sm:py-28">
        <DotGrid id="quote-grid" tone="light" fade="radial" />
        <Pill>Testimonials</Pill>
        <p className="mt-3 text-sm text-navy/50">Loved by program managers</p>
        <div className="relative mx-auto mt-8 grid max-w-3xl">
          <AnimatePresence initial={false}>
            <m.figure
              key={t.name}
              className="[grid-area:1/1]"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={tr}
            >
              <blockquote className="font-serif text-[1.75rem] leading-[1.2] tracking-[-0.01em] text-navy sm:text-4xl lg:text-[2.75rem]">
                “{t.quote} <span className="text-navy/40">{t.rest}”</span>
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="block font-medium text-navy">{t.name}</span>
                <span className="block text-navy/50">
                  {t.role} · {t.org}
                </span>
              </figcaption>
            </m.figure>
          </AnimatePresence>
        </div>
      </div>

      {/* Organisation tabs */}
      <div
        className="grid border-t border-navy/10 sm:grid-cols-3"
        role="tablist"
        aria-label="Testimonials"
      >
        {testimonials.map((q, i) => {
          const on = i === active;
          const Mark = MARKS[q.org] ?? LagosMark;
          return (
            <button
              key={q.org}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => {
                setActive(i);
              }}
              className={`relative flex h-16 items-center justify-center gap-2.5 text-sm font-semibold tracking-tight transition-colors ${
                i > 0 ? "border-t border-navy/10 sm:border-l sm:border-t-0" : ""
              } ${on ? "bg-white text-navy" : "text-navy/40 hover:text-navy/70"}`}
            >
              <Mark />
              {q.org}
              {on && (
                <m.span
                  key={`bar-${String(active)}-${String(visible)}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gold"
                  initial={{ scaleX: reduced || !visible ? 1 : 0 }}
                  animate={{ scaleX: 1 }}
                  transition={
                    reduced || !visible
                      ? { duration: 0 }
                      : { duration: CYCLE_MS / 1000, ease: "linear" }
                  }
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
