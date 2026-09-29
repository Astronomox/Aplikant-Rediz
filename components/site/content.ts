/*
 * All homepage copy, taken from the live Aplikant site.
 * Rule: nothing here is invented. Where a FAQ answer was not shown on the site, it is
 * written only from facts stated elsewhere on the site (noted per answer).
 */

export const nav = [
  { label: "Discover", href: "/discover" },
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
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

export interface Feature {
  key: FeatureKey;
  tab: string;
  lead: string;
  rest: string;
  ai?: boolean;
  /** Two supporting cells, all from the site's feature and pricing copy. */
  cells: [{ lead: string; rest: string }, { lead: string; rest: string }];
}

export const features: Feature[] = [
  {
    key: "programs",
    tab: "Program management",
    lead: "Every program, one place.",
    rest: "Create and manage training, bootcamps, fellowships, and workshops from a single dashboard. Set milestones, track cohorts, and never lose sight of progress.",
    cells: [
      {
        lead: "Unlimited, on every plan.",
        rest: "Unlimited programs and unlimited participants, including on Free.",
      },
      {
        lead: "Tracks and sub-programs.",
        rest: "Split a program into tracks, with filters across attendance, email and certificates.",
      },
    ],
  },
  {
    key: "applications",
    tab: "Smart applications",
    lead: "Applications without the spreadsheet.",
    rest: "Build custom application forms with drag-and-drop, collect responses, score candidates, and shortlist without touching a spreadsheet.",
    cells: [
      {
        lead: "Free or paid.",
        rest: "Collect application fees via Paystack, or keep applications free.",
      },
      {
        lead: "Start from a template.",
        rest: "Form templates, a branded public page, and admin edits on any application.",
      },
    ],
  },
  {
    key: "participants",
    tab: "Participant tracking",
    lead: "See every cohort, live.",
    rest: "Track attendance, engagement, demographics, and progress across every cohort in real time with beautiful visual dashboards.",
    cells: [
      {
        lead: "Attendance, manual or QR.",
        rest: "Reopen or regenerate a QR session, and check in minors with their guardians.",
      },
      {
        lead: "An ID for every participant.",
        rest: "Each participant gets a unique participant ID in the APK-XXXXXX format.",
      },
    ],
  },
  {
    key: "reports",
    tab: "Impact reports",
    lead: "Donor-ready in one click.",
    rest: "Generate donor-ready reports with completion rates, gender breakdowns, geographic data, and learning outcomes at the click of a button.",
    ai: true,
    cells: [
      {
        lead: "AI-powered reports.",
        rest: "Basic AI reports on Growth, advanced AI reports on Enterprise.",
      },
      {
        lead: "Export anything.",
        rest: "Data export to CSV and PDF, ready for funders and stakeholders.",
      },
    ],
  },
  {
    key: "surveys",
    tab: "M&E surveys",
    lead: "Prove your programs work.",
    rest: "Deploy pre/post surveys, collect feedback, and measure program effectiveness with built-in analytics and response tracking.",
    ai: true,
    cells: [
      {
        lead: "Pre and post.",
        rest: "Deploy surveys before and after a program, with response tracking built in.",
      },
      {
        lead: "Included on Free.",
        rest: "M&E survey data collection is part of the Free plan.",
      },
    ],
  },
  {
    key: "access",
    tab: "Role-based access",
    lead: "The right access for everyone.",
    rest: "Give your team the right level of access, from field staff taking attendance to org admins managing everything.",
    cells: [
      {
        lead: "Scoped reviewers.",
        rest: "Invite reviewers to a single form with scoped admin on Enterprise.",
      },
      {
        lead: "Grows with your team.",
        rest: "From 1 member on Free to 10 on Growth, 20 on Enterprise, unlimited on Custom.",
      },
    ],
  },
];

export const steps = [
  {
    n: "01",
    title: "Create your program",
    body: "Set up a training, bootcamp, fellowship, or workshop in minutes. Define dates, capacity, and application requirements.",
  },
  {
    n: "02",
    title: "Collect applications",
    body: "Share a branded application link. Responses flow into your dashboard for review, scoring, and shortlisting.",
  },
  {
    n: "03",
    title: "Track & manage",
    body: "Take attendance, monitor engagement, deploy surveys, and keep your team aligned with role-based access.",
  },
  {
    n: "04",
    title: "Report impact",
    body: "Generate beautiful reports for funders and stakeholders with completion rates, demographics, outcomes, and more.",
  },
] as const;

/** Growth+ capabilities, from the pricing page. Drives the "more than applications" list. */
export const beyond = [
  {
    title: "Courses & assessments",
    body: "A learning management system with courses, an assessment builder, a gradebook and email delivery.",
  },
  {
    title: "Certificates",
    body: "Certificate templates and certificate email campaigns to every graduate.",
  },
  {
    title: "Competitions & hackathons",
    body: "Run pitch competitions with judges, private judging results and score exports, and hackathons.",
  },
  {
    title: "Live & recorded sessions",
    body: "Video sessions for every program: 10 per program on Growth, unlimited on Enterprise.",
  },
] as const;

export const testimonials = [
  {
    quote: "Aplikant replaced 6 different tools we were using.",
    rest: "Our reporting time dropped from 2 weeks to 2 hours.",
    name: "Amina Okafor",
    role: "Program Director",
    org: "Lagos Innovation Hub",
  },
  {
    quote: "We used to lose track of participants between cohorts.",
    rest: "Now everything is in one place and our funders love the reports.",
    name: "David Kimani",
    role: "Operations Manager",
    org: "Nairobi Tech Hub",
  },
  {
    quote: "The survey and M&E features alone are worth it.",
    rest: "We can now actually prove our programs work with real data.",
    name: "Fatima Bello",
    role: "M&E Lead",
    org: "Abuja Social Impact Lab",
  },
] as const;

export interface Plan {
  tier: string;
  blurb: string;
  price: string;
  prefix?: string;
  period: string;
  note?: string;
  badge?: string;
  featured?: boolean;
  cta: string;
  features: string[];
}

export const plans: Plan[] = [
  {
    tier: "Free",
    blurb: "Everything you need to get started with no card and no expiry",
    price: "Free",
    period: "forever",
    cta: "Get Started Free",
    features: [
      "Unlimited programs",
      "Unlimited participants",
      "Application forms (free + paid)",
      "Paid applications via Paystack (platform fee applies)",
      "Attendance tracking (manual + QR)",
      "QR session reopen + regenerate",
      "1 certificate template",
      "Participant IDs (APK-XXXXXX)",
      "Form templates",
      "Admin edit for participant + application",
      "M&E surveys (data collection)",
      "1 team member",
      "Branded public page",
    ],
  },
  {
    tier: "Growth",
    blurb: "For small orgs & NGOs that need the full feature set on a lean budget",
    price: "₦49,000",
    period: "/month",
    note: "Save 18% billed annually",
    badge: "Most Popular",
    featured: true,
    cta: "Start Growth",
    features: [
      "Everything in Free",
      "Program tracks / sub‑programs",
      "Minor participants + guardian check-in",
      "Learning Management System (Courses)",
      "Basic AI Powered Reports",
      "Assessments: builder, gradebook, email delivery",
      "Certificate email campaigns",
      "Manage Pitch Competitions & Judges",
      "Manage Hackathons",
      "Live & recorded video sessions (10 per program)",
      "Data export (CSV & PDF)",
      "Track filters on Attendance / Email / Certificates",
      "5,000 participant emails per month",
      "4 certificate templates",
      "Team collaboration (up to 10)",
    ],
  },
  {
    tier: "Enterprise",
    blurb: "For larger organizations, NGOs & government agencies that need scale and polish",
    price: "₦129,000",
    period: "/month",
    note: "Save 18% billed annually",
    badge: "Teams",
    cta: "Go Enterprise",
    features: [
      "Everything in Growth",
      "Unlimited video sessions",
      "15,000 participant emails per month",
      "Email delivery tracking and recipient drill-down",
      "Private judging results and score exports",
      "8 certificate templates",
      "Team collaboration (up to 20)",
      "Advanced AI Powered Reports",
      "Scoped admin (per-form reviewer invites)",
      "Priority enterprise support",
      "Remove Aplikant branding",
    ],
  },
  {
    tier: "Custom",
    blurb: "For large multi-program networks that need a tailored plan",
    prefix: "From",
    price: "₦600,000",
    period: "/month",
    cta: "Contact Sales",
    features: [
      "Everything in Enterprise",
      "Unlimited team members",
      "Unlimited certificate templates",
      "Custom participant email volume",
      "Dedicated onboarding & customer success manager",
      "Custom integrations, SSO & SLA support",
    ],
  },
];

export const faqs = [
  {
    q: "Is Aplikant really free forever?",
    // From the Free plan: "no card and no expiry", unlimited programs + participants.
    a: "Yes. The Free plan needs no card and has no expiry. It includes unlimited programs and unlimited participants, application forms, attendance tracking, M&E surveys and a branded public page. Upgrade only when you need more.",
  },
  {
    q: "What types of programs can I manage?",
    // From the features and Growth plan copy.
    a: "Training, bootcamps, fellowships and workshops, with tracks and sub-programs. On Growth and above you can also run courses and assessments, pitch competitions with judges, and hackathons.",
  },
  {
    q: "How does the application form builder work?",
    // From Smart Applications + Free plan copy.
    a: "Build custom forms with drag-and-drop or start from a form template, then share a branded application link. Responses flow into your dashboard for review, scoring and shortlisting. Forms can be free or paid, with paid applications collected via Paystack (a platform fee applies).",
  },
  {
    q: "Can multiple team members use Aplikant?",
    // From the plan limits and Role-Based Access copy.
    a: "Yes. Free includes 1 team member, Growth up to 10, Enterprise up to 20, and Custom unlimited. Role-based access gives everyone the right level, from field staff taking attendance to org admins, and Enterprise adds per-form reviewer invites.",
  },
  {
    q: "Is my data secure?",
    // Verbatim from the site.
    a: "Yes. We use industry-standard encryption, secure cloud infrastructure, and role-based access controls to protect your data. Your participant information is safe with us.",
  },
  {
    q: "Can I generate reports for funders and donors?",
    // From Impact Reports + plan copy.
    a: "Yes. Generate donor-ready impact reports with completion rates, gender breakdowns, geographic data and learning outcomes. Growth adds AI-powered reports and CSV & PDF export, and Enterprise adds advanced AI-powered reports.",
  },
] as const;

export const footer = {
  blurb:
    "Program management software for NGOs and social enterprises to run applications, track participants, measure attendance, and report impact.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
        { label: "Discover Programs", href: "/discover" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Application Management", href: "/features#applications" },
        { label: "M&E Platform", href: "/features#surveys" },
        { label: "Impact Reporting", href: "/features#reports" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
  bottom: "Brought to you by Enovate Labs",
} as const;
