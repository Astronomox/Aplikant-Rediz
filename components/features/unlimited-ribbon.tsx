"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/*
 * "Unlimited" motion graphic: a Möbius ribbon on a lemniscate (∞) that moves like water.
 *
 * Shape: ~22 fine strands spread across a width that follows cos(t/2 + phase), so over
 * one lap the ribbon makes a half-turn (a true Möbius twist) and the far face is drawn
 * dimmer for depth. `phase` drifts, so the twist slowly travels around the loop.
 *
 * Water: every strand is displaced along the curve normal by three travelling waves
 * (different wavelengths, speeds and directions) whose sum interferes into swells and
 * ripples. Each strand lags by its depth in the ribbon, so the surface rolls instead of
 * moving as one sheet. The width also "breathes". Caustic glints (short bright runs
 * where a travelling light wave peaks) play across the surface, and two soft currents
 * with long fading tails flow along the centre.
 *
 * All motion terms are smooth functions of time, and every wave has a whole number of
 * cycles per lap and depends on |u| (not u), so the Möbius join is seamless.
 *
 * Canvas 2D, devicePixelRatio-aware. The rAF loop runs only while on screen; under
 * prefers-reduced-motion a single still frame is drawn.
 */

const W = 360;
const H = 180;
const STRANDS = 22;
const SEGMENTS = 300;
const RIBBON = 24; // base half-width in px
const TAU = Math.PI * 2;
const GOLD = [245, 158, 11] as const;
const MINT = [16, 185, 129] as const;

/** Bernoulli lemniscate, centred, x-radius `a`. */
function lemniscate(t: number, a: number) {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return { x: (a * c) / d, y: (a * s * c) / d };
}

const mix = (k: number) =>
  `${String(Math.round(GOLD[0] + (MINT[0] - GOLD[0]) * k))}, ${String(
    Math.round(GOLD[1] + (MINT[1] - GOLD[1]) * k),
  )}, ${String(Math.round(GOLD[2] + (MINT[2] - GOLD[2]) * k))}`;

interface Sample {
  x: number;
  y: number;
  nx: number;
  ny: number;
  t: number;
}

/** Centre line + unit normals, precomputed once. */
function sampleCurve(a: number): Sample[] {
  const pts: Sample[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = (i / SEGMENTS) * TAU;
    const p = lemniscate(t, a);
    const q = lemniscate(t + 0.001, a);
    const dx = q.x - p.x;
    const dy = q.y - p.y;
    const len = Math.hypot(dx, dy) || 1;
    pts.push({ x: p.x + W / 2, y: p.y + H / 2, nx: -dy / len, ny: dx / len, t });
  }
  return pts;
}

/**
 * Surface displacement (px, along the normal) at curve position t for a strand at
 * depth d (0 = centre, 1 = edge), at time s (seconds). Three travelling waves:
 * a long slow swell, a mid ripple running the other way, and a fine fast chop.
 */
function water(t: number, d: number, s: number) {
  const lag = d * 1.4; // outer strands trail: the surface rolls
  return (
    3.2 * Math.sin(3 * t - 0.9 * s - lag) +
    1.8 * Math.sin(7 * t + 1.6 * s - lag * 1.3) +
    0.9 * Math.sin(13 * t - 2.7 * s + lag * 0.7)
  );
}

/** Brightness of the caustic light at (t, d, s): peaks form thin moving glints. */
function caustic(t: number, d: number, s: number) {
  const v = Math.sin(9 * t - 1.9 * s + d * 2.4) * Math.sin(5 * t + 1.2 * s - d * 1.7);
  return v > 0.78 ? (v - 0.78) / 0.22 : 0;
}

/** Point on strand `u` (-0.5..0.5) at sample p, time s. */
function strandPoint(p: Sample, u: number, s: number, phase: number) {
  const d = Math.abs(u) * 2;
  const breathe = 1 + 0.12 * Math.sin(s * 0.7 + p.t * 2);
  const twist = Math.cos(p.t / 2 + phase);
  const off = u * 2 * RIBBON * breathe * twist + water(p.t, d, s);
  return { x: p.x + p.nx * off, y: p.y + p.ny * off, twist, d };
}

function draw(ctx: CanvasRenderingContext2D, pts: Sample[], ms: number) {
  ctx.clearRect(0, 0, W, H);
  const s = ms / 1000;
  const phase = s * 0.28;

  const grad = (alpha: number) => {
    const g = ctx.createLinearGradient(W * 0.08, 0, W * 0.92, 0);
    g.addColorStop(0, `rgba(${mix(0)}, ${String(alpha)})`);
    g.addColorStop(0.5, `rgba(${mix(0.5)}, ${String(alpha)})`);
    g.addColorStop(1, `rgba(${mix(1)}, ${String(alpha)})`);
    return g;
  };
  const front = grad(0.9);
  const back = grad(0.16);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // 1. The ribbon surface: back face first (dim), then front face.
  for (const facing of [-1, 1]) {
    ctx.strokeStyle = facing > 0 ? front : back;
    for (let k = 0; k < STRANDS; k++) {
      const u = k / (STRANDS - 1) - 0.5;
      const d = Math.abs(u) * 2;
      ctx.lineWidth = 0.55 + d * 0.45;
      ctx.globalAlpha = facing > 0 ? 0.22 + (1 - d) * 0.55 : 1;
      ctx.beginPath();
      let pen = false;
      for (const p of pts) {
        const q = strandPoint(p, u, s, phase);
        if (Math.sign(q.twist) !== facing) {
          pen = false;
          continue;
        }
        if (pen) ctx.lineTo(q.x, q.y);
        else {
          ctx.moveTo(q.x, q.y);
          pen = true;
        }
      }
      ctx.stroke();
    }
  }

  // 2. Caustic glints on the front face: short bright runs, additive.
  ctx.globalCompositeOperation = "lighter";
  ctx.strokeStyle = "rgba(255, 244, 214, 1)";
  for (let k = 0; k < STRANDS; k += 2) {
    const u = k / (STRANDS - 1) - 0.5;
    const d = Math.abs(u) * 2;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      if (!a || !b) continue;
      const glow = caustic(a.t, d, s);
      if (glow <= 0) continue;
      const qa = strandPoint(a, u, s, phase);
      if (qa.twist <= 0) continue;
      const qb = strandPoint(b, u, s, phase);
      ctx.globalAlpha = glow * 0.55 * (1 - d * 0.5);
      ctx.lineWidth = 1 + glow * 1.4;
      ctx.beginPath();
      ctx.moveTo(qa.x, qa.y);
      ctx.lineTo(qb.x, qb.y);
      ctx.stroke();
    }
  }

  // 3. Two soft currents along the centre line, long tails fading out.
  const current = (offset: number, rgb: string) => {
    const head = (((s * 0.085 + offset) % 1) + 1) % 1;
    const headIdx = head * SEGMENTS;
    const TAIL = 110;
    for (let k = 0; k < TAIL; k++) {
      const i0 = Math.floor(headIdx - k);
      const a = pts[((i0 % SEGMENTS) + SEGMENTS) % SEGMENTS];
      const b = pts[(((i0 + 1) % SEGMENTS) + SEGMENTS) % SEGMENTS];
      if (!a || !b) continue;
      const fade = 1 - k / TAIL;
      const qa = strandPoint(a, 0, s, phase);
      const qb = strandPoint(b, 0, s, phase);
      ctx.globalAlpha = fade * fade * fade * 0.8;
      ctx.strokeStyle = `rgb(${rgb})`;
      ctx.lineWidth = 0.8 + fade * 2.4;
      ctx.beginPath();
      ctx.moveTo(qa.x, qa.y);
      ctx.lineTo(qb.x, qb.y);
      ctx.stroke();
    }
    const h = pts[Math.floor(headIdx) % SEGMENTS];
    if (!h) return;
    const q = strandPoint(h, 0, s, phase);
    ctx.globalAlpha = 1;
    const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 14);
    g.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    g.addColorStop(0.3, `rgba(${rgb}, 0.7)`);
    g.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(q.x, q.y, 14, 0, TAU);
    ctx.fill();
  };
  current(0, mix(0));
  current(0.5, mix(1));

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

export function UnlimitedRibbon() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = W * dpr;
    el.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pts = sampleCurve(W * 0.42);

    if (reduced) {
      draw(ctx, pts, 4000);
      return;
    }

    let raf = 0;
    let running = false;
    const loop = (now: number) => {
      draw(ctx, pts, now);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry?.isIntersecting ?? false;
      if (visible && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!visible && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Scales down on narrow screens; the canvas keeps its aspect ratio via height: auto.
  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      style={{
        width: W,
        maxWidth: "100%",
        height: "auto",
        aspectRatio: `${String(W)} / ${String(H)}`,
      }}
    />
  );
}
