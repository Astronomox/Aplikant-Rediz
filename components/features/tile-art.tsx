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

/** Impact Reports: bars grow, a completion ring draws. */
const BAR_HEIGHTS = [38, 58, 46, 72, 64, 88, 80];
export function ReportArt({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-end gap-5">
      <div className="flex h-[92px] items-end gap-1.5">
        {BAR_HEIGHTS.map((h, n) => (
          <span
            key={n}
            className={`fx-grow w-3 rounded-t-sm ${
              n === BAR_HEIGHTS.length - 2
                ? "bg-gold"
                : dark
                  ? "bg-white/40"
                  : "bg-gradient-to-t from-navy/70 to-navy/40"
            }`}
            style={{ height: `${String(h)}%`, ...i(n) }}
          />
        ))}
      </div>
      <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke={dark ? "white" : "#0f172a"}
          strokeOpacity={0.1}
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="28"
          className="fx-ring"
        />
      </svg>
    </div>
  );
}

/** M&E Surveys: a "post" bar outgrows the "pre" bar. */
export function PrePostArt() {
  return (
    <div className="w-[170px] space-y-3 text-[10px] font-semibold uppercase tracking-widest text-navy/45">
      {[
        { label: "Pre", width: "42%", color: "bg-navy/30", n: 0 },
        { label: "Post", width: "88%", color: "bg-mint", n: 2 },
      ].map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="w-8">{row.label}</span>
          <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-navy/[0.07]">
            <span
              className={`fx-fill absolute inset-y-0 left-0 rounded-full ${row.color}`}
              style={{ width: row.width, ...i(row.n) }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Program Management (How It Works step 1): three program cards fanning out. */
export function ProgramStackArt() {
  return (
    <div className="relative h-[110px] w-[190px]">
      {[2, 1, 0].map((n) => (
        <div
          key={n}
          className="absolute inset-x-0 top-0 rounded-xl bg-white p-3 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.5)] ring-1 ring-navy/10"
          style={{
            transform: `translate(${String(n * 14)}px, ${String(n * 14)}px) rotate(${String(n * -3)}deg)`,
            opacity: 1 - n * 0.2,
          }}
        >
          <span className="block h-1.5 w-16 rounded-full bg-navy/60" />
          <span className="mt-2 block h-1.5 w-24 rounded-full bg-navy/15" />
          <span className="mt-1.5 block h-1.5 w-20 rounded-full bg-navy/15" />
          <span className="mt-3 flex gap-1">
            <span className="h-3 w-8 rounded bg-gold/70" />
            <span className="h-3 w-8 rounded bg-mint/40" />
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Role-Based Access: an org admin fans access out to reviewers and field staff.
 * Roles are the ones the site names (org admins, per-form reviewers, field staff).
 */
export function RolesArt() {
  const chip =
    "rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-navy shadow-sm ring-1 ring-navy/10";
  return (
    <div className="relative flex w-[300px] flex-col items-center">
      <span className={`${chip} flex items-center gap-1.5`}>
        <span className="h-2 w-2 rounded-full bg-gold" /> Org admin
      </span>
      <svg viewBox="0 0 300 56" className="h-14 w-full" fill="none" aria-hidden="true">
        {[60, 150, 240].map((x) => (
          <g key={x}>
            <path
              d={`M150 0 C150 28, ${String(x)} 28, ${String(x)} 56`}
              stroke="#0f172a"
              strokeOpacity={0.15}
            />
            <path
              d={`M150 0 C150 28, ${String(x)} 28, ${String(x)} 56`}
              stroke="#f59e0b"
              strokeWidth={1.5}
              pathLength={100}
              strokeDasharray="14 86"
              strokeDashoffset={100}
              strokeLinecap="round"
              className="fx-dash"
              style={{ animationDelay: `${String(-x / 150)}s` }}
            />
          </g>
        ))}
      </svg>
      <div className="flex w-full justify-between">
        <span className={chip}>Reviewer</span>
        <span className={chip}>Team member</span>
        <span className={chip}>Field staff</span>
      </div>
    </div>
  );
}
