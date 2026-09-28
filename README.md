# Aplikant — homepage redesign

Marketing homepage for [Aplikant](https://aplikant.app), the program management platform for innovation hubs, NGOs and government agencies: applications, participant tracking, attendance, surveys and impact reports on one platform.

Built with Next.js 14 (App Router), TypeScript (strict), Tailwind CSS and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the dev server                          |
| `npm run build`        | Production build                              |
| `npm run start`        | Serve the production build                    |
| `npm run lint`         | ESLint across the repo, zero warnings allowed |
| `npm run lint:fix`     | ESLint with autofix                           |
| `npm run typecheck`    | `tsc --noEmit`                                |
| `npm run format`       | Prettier write                                |
| `npm run format:check` | Prettier check                                |

## Structure

```
app/
  layout.tsx            Root layout: Inter (latin + latin-ext for ₦), motion provider
  page.tsx              The homepage, assembled from sections
  globals.css           Tailwind layers, button/link primitives, fx-* motion graphics
components/
  site/                 Page sections (hero, platform, dark band, pricing, FAQ…)
    content.ts          All page copy in one place
    frame.tsx           Grid frame, pills, two-tone headings, button styles
  hero/                 Program-engine motion graphic and lifecycle data
  features/             Animated feature icons and illustrations
  motion/               Reveal, scroll scenes, parallax, reduced-motion hook
  fx/                   Aurora, count-up, play-when-visible
  texture/              Dot-grid background pattern
public/                 Logos
```

## Design notes

- **Palette:** navy `#0f172a`, gold `#f59e0b`, mint `#10b981`, cream `#f0fdf4`.
- **Layout:** one framed column with hairline rails from header to footer; sections separated by full-width hairlines; content in bordered cells.
- **Motion:** CSS for looping graphics (paused off screen), Framer Motion for scroll-linked and interactive motion, a canvas for the Möbius ribbon. Everything respects `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, keyboard-operable tabs and accordions, visible focus, 40px+ touch targets on mobile.
