"use client";

import { type Transition } from "framer-motion";
import { REVEAL_EASE } from "@/components/motion/reveal";

/*
 * Animated versions of the six lucide-react feature icons.
 *
 * Geometry is lucide-react 1.48.0's own icon node data (file-stack, clipboard-check,
 * users, chart-column, zap, shield-check), rendered with the same 24x24 grid, 2px
 * stroke and round caps/joins as <LucideIcon />. lucide-react does not export this
 * data publicly, and per-part motion (sheets fanning, figures separating, bars
 * growing) is impossible through its single opaque <svg>, so each element is
 * rendered here as an `m.*` SVG element. If lucide is upgraded and an icon's
 * design changes, update the matching `d`/attrs below.
 *
 * Variant labels propagate from the parent card:
 *   hidden  -> before scroll-in (strokes undrawn)
 *   visible -> strokes drawn in, staggered by the card's index
 *   hover   -> per-icon micro-interaction, same timing as the icon chip
 */

/** Shared by every icon part and by the chip, so they move as one. */
export const HOVER_TRANSITION: Transition = { duration: 0.35, ease: REVEAL_EASE };
