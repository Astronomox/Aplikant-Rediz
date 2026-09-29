# Aplikant Redesign — Reference Pack

## Palette (extracted from live site CSS)

- Navy: #0f172a
- Gold: #f59e0b
- Mint: #10b981
- Cream/light bg: #f0fdf4

## Stack (from Wappalyzer, matches original site)

React, Tailwind CSS, shadcn/ui, Radix UI, lucide-react icons, Framer Motion, Google Font API (Inter-style), Supabase backend, Cloudflare hosting.

## Assets

- assets/logo.png — color logo, use on light backgrounds
- assets/logo-white.png — white logo, use on navy backgrounds

## Known issues in the original (fix these)

1. Hero "dashboard" mockup is a static fake screenshot — looks templated
2. Pricing cards have no visual hierarchy — 4 equal-weight tiers
3. ₦ symbol renders with a broken strikethrough character
4. Color logic mixed — navy/mint sections applied inconsistently
5. Generic wavy SVG section divider — looks like a template
6. Testimonials use stock-feeling photos with no verifiable source

## Code (drop into Next.js app router project)

- code/tailwind.config.ts
- code/globals.css → app/globals.css
- code/page.tsx → app/page.tsx

## Not available

No real dashboard/logged-in screenshots exist — the SPA only saved the shell, no data was captured. Homepage rebuild only; do not invent dashboard UI.
