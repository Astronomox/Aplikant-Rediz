import type { CSSProperties } from "react";

/*
 * Small looping illustrations for the feature tiles and How It Works cards.
 * Abstract on purpose: no names, numbers or fake product data, just the *idea*
 * of each capability in motion. Animations are the fx-* classes in globals.css
 * (lg+ only, off under reduced motion, paused off screen); without them each
 * piece renders as a finished static illustration.
 */

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/** Smart Applications: form fields fill in, then a check pops. */
export function FormArt({ dark = false }: { dark?: boolean }) {
  const track = dark ? "bg-white/10" : "bg-navy/10";
  const fill = dark ? "bg-white/70" : "bg-navy/70";
  const label = dark ? "bg-white/20" : "bg-navy/15";
  return (
    <div className="relative w-[160px] space-y-2.5">
      {[0, 1, 2].map((n) => (
        <div key={n} className="flex items-center gap-2">
          <span className={`h-1.5 w-7 rounded-full ${label}`} />
          <span className={`relative h-2.5 flex-1 overflow-hidden rounded-full ${track}`}>
            <span className={`fx-fill absolute inset-0 rounded-full ${fill}`} style={i(n)} />
          </span>
        </div>
      ))}
      <span className="fx-pop absolute -bottom-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-mint text-white shadow-[0_0_20px_rgba(16,185,129,0.6)]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

/** Participant Tracking: a cohort grid checking in. */
const CHECKIN_ORDER = [3, 9, 1, 12, 6, 0, 14, 7, 10, 4, 13, 2, 8, 11, 5];
export function CheckInArt({ dark = false }: { dark?: boolean }) {
  return (
    <div className="grid w-[150px] grid-cols-5 gap-2">
      {CHECKIN_ORDER.map((order, n) => (
        <span
          key={n}
          className={`fx-checkin h-5 w-5 rounded-full ${dark ? "bg-white/10" : "bg-navy/[0.08]"}`}
          style={i(order)}
        />
      ))}
    </div>
  );
}
