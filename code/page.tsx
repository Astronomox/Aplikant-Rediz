import Image from "next/image";
import { ArrowRight, FileStack, ClipboardCheck, Users, BarChart3, Zap, ShieldCheck, Check } from "lucide-react";

const nav = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const features = [
  {
    icon: FileStack,
    title: "Program Management",
    body: "Create and manage training, bootcamps, fellowships, and workshops from a single dashboard. Set milestones, track cohorts, never lose sight of progress.",
  },
  {
    icon: ClipboardCheck,
    title: "Smart Applications",
    body: "Build custom application forms with drag-and-drop, collect responses, score candidates, and shortlist without touching a spreadsheet.",
  },
  {
    icon: Users,
    title: "Participant Tracking",
    body: "Track attendance, engagement, demographics, and progress across every cohort in real time with visual dashboards.",
  },
  {
    icon: BarChart3,
    title: "Impact Reports",
    body: "Generate donor-ready reports with completion rates, gender breakdowns, geographic data, and learning outcomes in one click.",
    badge: true,
  },
  {
    icon: Zap,
    title: "M&E Surveys",
    body: "Deploy pre/post surveys, collect feedback, and measure program effectiveness with built-in analytics.",
    badge: true,
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    body: "Give your team the right level of access, from field staff taking attendance to org admins managing everything.",
  },
];

const steps = [
  { n: "01", title: "Create Your Program", body: "Set up a training, bootcamp, fellowship, or workshop in minutes. Define dates, capacity, and requirements." },
  { n: "02", title: "Collect Applications", body: "Share a branded application link. Responses flow into your dashboard for review and shortlisting." },
  { n: "03", title: "Track & Manage", body: "Take attendance, monitor engagement, deploy surveys, keep your team aligned with role-based access." },
  { n: "04", title: "Report Impact", body: "Generate reports for funders and stakeholders with completion rates, demographics, and outcomes." },
];

const pricing = [
  {
    tier: "Free",
    price: "₦0",
    period: "forever",
    blurb: "Everything you need to get started, no card required",
    features: ["Unlimited programs", "Unlimited participants", "Application forms", "Attendance tracking (manual + QR)", "1 team member"],
    cta: "Get Started Free",
    featured: false,
  },
  {
    tier: "Growth",
    price: "₦49,000",
    period: "/month",
    blurb: "For small orgs & NGOs that need the full feature set",
    features: ["Everything in Free", "Program tracks / sub-programs", "AI-powered reports", "Certificate email campaigns", "5,000 emails/month", "Team collaboration (10)"],
    cta: "Start Growth",
    featured: true,
  },
  {
    tier: "Enterprise",
    price: "₦129,000",
    period: "/month",
    blurb: "For larger orgs and government agencies at scale",
    features: ["Everything in Growth", "Advanced AI reports", "Priority support", "Remove Aplikant branding"],
    cta: "Go Enterprise",
    featured: false,
  },
];

export default function Home() {
  return (
    <main className="bg-navy text-white">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Image src="/logo-white.png" alt="Aplikant" width={28} height={28} />
            <span className="text-lg font-semibold">Aplikant</span>
          </div>
          <nav className="hidden gap-8 text-sm text-white/70 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-white/80 hover:text-white">Sign In</a>
            <a href="#" className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:brightness-110">
              Sign Up Free
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold">
          <Zap className="h-3.5 w-3.5" />
          AI-Powered Program Management
        </div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
          Run your programs end to end, <span className="text-gold">on one platform</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          Aplikant replaces the need for multiple tools to manage applications, track participants,
          take attendance, and generate impact reports, giving you more time to focus on changing lives.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3.5 font-semibold text-navy transition hover:brightness-110">
            Start for Free <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-xs text-white/40">Free forever · No credit card required · Set up in 5 minutes</p>
        </div>
      </section>

      {/* PRODUCT SHOT — swap src for a real screen recording still or GIF once you have product access */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40">
          <div className="aspect-video w-full bg-gradient-to-br from-white/5 to-transparent" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/5 bg-white/[0.02] py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-white/40">
          Trusted by innovation hubs, NGOs & government agencies
        </p>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[["150+", "Organizations"], ["12,000+", "Participants Tracked"], ["500+", "Programs Managed"], ["98%", "Uptime"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-bold">{n}</div>
              <div className="mt-1 text-xs text-white/40">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-cream py-24 text-navy">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Features</span>
            <h2 className="mt-3 text-4xl font-bold">Everything you need to run programs</h2>
            <p className="mt-4 text-navy/60">From applications to impact reports, Aplikant covers the full program lifecycle.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-navy/10 bg-white p-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5">
                    <f.icon className="h-5 w-5 text-navy" />
                  </div>
                  {f.badge && (
                    <span className="rounded-full bg-mint/10 px-2 py-0.5 text-[10px] font-semibold text-mint">AI POWERED</span>
                  )}
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-cream pb-24 text-navy">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">How It Works</span>
            <h2 className="mt-3 text-4xl font-bold">Up and running in minutes</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold text-sm font-bold text-gold">
                  {s.n}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-cream pb-24 text-navy">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Pricing</span>
            <h2 className="mt-3 text-4xl font-bold">Simple, transparent pricing</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {pricing.map((p) => (
              <div
                key={p.tier}
                className={
                  p.featured
                    ? "relative scale-105 rounded-2xl bg-navy p-8 text-white shadow-2xl shadow-navy/30"
                    : "rounded-2xl border border-navy/10 bg-white p-8"
                }
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
                    Most Popular
                  </span>
                )}
                <h3 className="font-semibold">{p.tier}</h3>
                <p className={p.featured ? "mt-2 text-sm text-white/60" : "mt-2 text-sm text-navy/60"}>{p.blurb}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className={p.featured ? "text-white/50" : "text-navy/50"}>{p.period}</span>
                </div>
                <a
                  href="#"
                  className={
                    p.featured
                      ? "mt-6 block rounded-lg bg-gold py-3 text-center text-sm font-semibold text-navy hover:brightness-110"
                      : "mt-6 block rounded-lg border border-navy/20 py-3 text-center text-sm font-semibold hover:bg-navy/5"
                  }
                >
                  {p.cta}
                </a>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
                      <span className={p.featured ? "text-white/80" : "text-navy/70"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-navy/50">
            Need a custom plan for a multi-program network? <a href="#" className="font-semibold text-gold">Contact sales →</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold">
            <Zap className="h-3.5 w-3.5" /> AI Powered Program Management
          </span>
          <h2 className="mt-6 text-4xl font-bold">Ready to ditch the spreadsheets?</h2>
          <p className="mt-4 text-white/60">
            Join 150+ innovation hubs, NGOs and government agencies across Africa using Aplikant to manage programs, track impact, and delight their funders.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#" className="rounded-lg bg-gold px-6 py-3 font-semibold text-navy hover:brightness-110">Get Started for Free</a>
            <a href="#pricing" className="rounded-lg border border-white/20 px-6 py-3 font-semibold hover:bg-white/5">View Pricing</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-cream py-16 text-navy">
        <div className="mx-auto max-w-6xl px-6 text-sm text-navy/60">
          © {new Date().getFullYear()} Aplikant. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
