import type { ReactNode } from "react";

/*
 * Page frame, after Attio's construction: the page is a drawn grid, not stacked bands.
 *   - Every section spans the full width with a hairline on its bottom edge.
 *   - Inside, a fixed-width column is framed by two vertical hairline rails (lg+),
 *     so the rails run unbroken from the header to the footer.
 *   - Content sits in hairline-bordered cells (see <Cells>).
 * Two tones: "light" (cream, navy lines) and "dark" (navy, white lines).
 */

/** light = cream, paper = white (alternating light sections), dark = navy. */
export type Tone = "light" | "paper" | "dark";

const SECTION: Record<Tone, string> = {
  light: "bg-cream text-navy border-navy/10",
  paper: "bg-white text-navy border-navy/10",
  dark: "bg-navy text-white border-white/10",
};
const RAILS: Record<Tone, string> = {
  light: "lg:border-navy/10",
  paper: "lg:border-navy/10",
  dark: "lg:border-white/10",
};

/** Width of the framed column (Attio's is ~1160px). */
export const COLUMN = "mx-auto w-full max-w-[72.5rem]";

export function Section({
  tone = "light",
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative border-b ${SECTION[tone]} ${className}`}>
      <div className={`${COLUMN} relative lg:border-x ${RAILS[tone]}`}>{children}</div>
    </section>
  );
}

/** Small tinted label above a heading ("Platform", "Pricing"…). */
export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        tone === "dark" ? "bg-gold/15 text-gold" : "bg-navy/[0.07] text-navy/80"
      }`}
    >
      {children}
    </span>
  );
}

/*
 * Type system. One scale for the whole page, phone-first:
 *   display  hero + band headlines   26 / 44 / 56 px
 *   h2       section headings        20 / 28 / 36 px
 *   h3       card titles             14 / 15 px
 *   lede     text under a heading    13 / 16 px
 *   body     card copy               13 / 14 px
 *   label    eyebrows, pills         12 px
 * Headings stay short; supporting copy is always a separate, body-sized paragraph.
 */
export const TYPE = {
  display:
    "text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem]",
  h2: "text-[1.375rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-3xl lg:text-[2.25rem] lg:leading-[1.15]",
  h3: "text-[15px] font-semibold leading-snug",
  lede: "text-sm leading-relaxed sm:text-base",
  body: "text-sm leading-relaxed",
} as const;

/** Section spacing, phone-first. */
export const PAD = {
  x: "px-5 sm:px-8 lg:px-12",
  y: "py-12 sm:py-16 lg:py-20",
} as const;

/** Eyebrow + short heading + lede: the head of every section. */
export function SectionHead({
  eyebrow,
  title,
  lede,
  tone = "light",
  center = false,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  tone?: Tone;
  center?: boolean;
  className?: string;
}) {
  const muted = tone === "dark" ? "text-white/55" : "text-navy/55";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <Pill tone={tone}>{eyebrow}</Pill>
      <h2 className={`mt-4 ${TYPE.h2}`}>{title}</h2>
      {lede && <p className={`mt-3 ${TYPE.lede} ${muted}`}>{lede}</p>}
    </div>
  );
}

/** Attio-sized action buttons: compact, 36-40px tall, square corners by design. */
export const BTN = {
  primary:
    "btn-press inline-flex h-10 items-center justify-center gap-1.5 rounded-none bg-navy px-4 text-sm font-medium text-white shadow-sm hover:bg-navy/90",
  gold: "btn-gold inline-flex h-10 items-center justify-center gap-1.5 rounded-none px-4 text-sm",
  secondary:
    "btn-press inline-flex h-10 items-center justify-center gap-1.5 rounded-none border border-navy/15 bg-white px-4 text-sm font-medium text-navy shadow-sm hover:bg-navy/[0.03]",
  secondaryDark:
    "btn-press inline-flex h-10 items-center justify-center gap-1.5 rounded-none border border-white/15 bg-white/[0.04] px-4 text-sm font-medium text-white hover:bg-white/10",
  small:
    "btn-press group inline-flex h-8 items-center gap-1 rounded-none border border-navy/15 bg-white/70 px-2.5 text-xs font-medium text-navy hover:bg-white",
  smallDark:
    "btn-press group inline-flex h-8 items-center gap-1 rounded-none border border-white/15 bg-white/[0.04] px-2.5 text-xs font-medium text-white hover:bg-white/10",
} as const;

/** Vertical "barcode" hairline texture (Attio's changelog / CTA strips). */
export function TickStrip({ tone = "light", className = "" }: { tone?: Tone; className?: string }) {
  const c = tone === "dark" ? "rgba(255,255,255,0.10)" : "rgba(15,23,42,0.12)";
  return (
    <div
      aria-hidden="true"
      className={`h-12 ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${c} 0 1px, transparent 1px 14px)`,
      }}
    />
  );
}
