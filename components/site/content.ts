/*
 * All homepage copy, taken from the live Aplikant site.
 * Rule: nothing here is invented. Where a FAQ answer was not shown on the site, it is
 * written only from facts stated elsewhere on the site (noted per answer).
 */

export const nav = [
  { label: "Discover", href: "#" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  pill: "AI-powered program management",
  title: "Run your programs end to end, on one platform.",
  body: "Aplikant is an AI-powered platform that replaces the need for multiple tools to manage applications, track participants, take attendance, deliver courses and assessments, send emails, and generate impact reports, giving you more time to focus on changing lives.",
  fine: "Free forever · No credit card required · Set up in 5 minutes",
} as const;

export const stats = [
  { value: "150+", label: "Organizations" },
  { value: "12,000+", label: "Participants tracked" },
  { value: "500+", label: "Programs managed" },
  { value: "98%", label: "Uptime" },
] as const;

export type FeatureKey =
  "programs" | "applications" | "participants" | "reports" | "surveys" | "access";
