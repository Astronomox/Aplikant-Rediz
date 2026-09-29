/*
 * Background texture: a dot lattice with sparse construction lines and square nodes.
 *
 * Pure SVG patterns, so it is resolution-independent and costs no image requests.
 * Two layers:
 *   - dots on a 24px lattice
 *   - a 312px (13 x 24) "construction" tile of diagonal and dashed hairlines with small
 *     square nodes. Every endpoint sits on a lattice point, and 312 is not a multiple of
 *     the section widths we use, so the repeat is hard to spot.
 * Colour comes from `currentColor`; strength is set by the tone preset.
 */

const CELL = 24;
const TILE = CELL * 13;
const p = (n: number) => n * CELL; // lattice units -> px

/** Diagonal hairlines, in lattice units: [x1, y1, x2, y2]. */
const DIAGONALS: [number, number, number, number][] = [
  [1, 2, 5, 6],
  [5, 6, 8, 3],
  [8, 3, 12, 7],
  [3, 9, 6, 12],
  [9, 10, 11, 12],
];
/** Dashed straight guides. */
const GUIDES: [number, number, number, number][] = [
  [5, 6, 5, 11],
  [8, 3, 12, 3],
  [0, 9, 3, 9],
];
/** Square nodes at a subset of line endpoints. */
const NODES: [number, number][] = [
  [5, 6],
  [8, 3],
  [12, 7],
  [3, 9],
  [9, 10],
];

type Tone = "dark" | "light";
type Fade = "none" | "radial" | "top" | "bottom";

const TONE: Record<Tone, { color: string; dots: number; lines: number }> = {
  // On navy: white at ~9% for dots, ~7% for lines.
  dark: { color: "text-white", dots: 0.09, lines: 0.07 },
  // On cream: navy dots only, barely there. Enough to stop the surface reading as flat.
  light: { color: "text-navy", dots: 0.07, lines: 0 },
};

const FADE: Record<Fade, string | undefined> = {
  none: undefined,
  radial: "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
  top: "linear-gradient(to bottom, black, transparent 85%)",
  bottom: "linear-gradient(to top, black, transparent 85%)",
};

interface DotGridProps {
  /** Unique per page: SVG pattern ids are document-global. */
  id: string;
  tone?: Tone;
  fade?: Fade;
  className?: string;
}

export function DotGrid({ id, tone = "dark", fade = "radial", className = "" }: DotGridProps) {
  const t = TONE[tone];
  const mask = FADE[fade];

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${t.color} ${className}`}
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <defs>
        <pattern id={`${id}-dots`} width={CELL} height={CELL} patternUnits="userSpaceOnUse">
          <circle cx={1} cy={1} r={1} fill="currentColor" fillOpacity={t.dots} />
        </pattern>
        {t.lines > 0 && (
          <pattern id={`${id}-lines`} width={TILE} height={TILE} patternUnits="userSpaceOnUse">
            <g
              stroke="currentColor"
              strokeOpacity={t.lines}
              strokeWidth={1}
              fill="none"
              transform="translate(1 1)"
            >
              {DIAGONALS.map(([x1, y1, x2, y2]) => (
                <line
                  key={["d", x1, y1, x2, y2].join("-")}
                  x1={p(x1)}
                  y1={p(y1)}
                  x2={p(x2)}
                  y2={p(y2)}
                />
              ))}
              {GUIDES.map(([x1, y1, x2, y2]) => (
                <line
                  key={["g", x1, y1, x2, y2].join("-")}
                  x1={p(x1)}
                  y1={p(y1)}
                  x2={p(x2)}
                  y2={p(y2)}
                  strokeDasharray="2 4"
                />
              ))}
            </g>
            {NODES.map(([x, y]) => (
              <rect
                key={["n", x, y].join("-")}
                x={p(x) - 1.5}
                y={p(y) - 1.5}
                width={5}
                height={5}
                fill="currentColor"
                fillOpacity={t.lines * 2.2}
              />
            ))}
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}-dots)`} />
      {t.lines > 0 && <rect width="100%" height="100%" fill={`url(#${id}-lines)`} />}
    </svg>
  );
}
