"use client";

import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { PAD } from "./frame";

/*
 * Discover: public listings from the live site (aplikant.app/discover). Two kinds:
 * programs, and "other" (standalone public forms). Programs filter by type and
 * country, with live counts. Add new listings to LISTINGS.
 */

interface Listing {
  kind: "program" | "form";
  name: string;
  org: string;
  type: string;
  mode: string;
  location: string;
  country: string;
  dates: string;
  href: string;
}

const LISTINGS: Listing[] = [
  {
    kind: "program",
    name: "Summer Tech Camp 2026",
    org: "Labspace By JD Lab",
    type: "Bootcamp",
    mode: "In-person",
    location: "Minna, Niger",
    country: "Nigeria",
    dates: "Aug 12, 2026 – Sep 2, 2026",
    href: "#",
  },
];

function tally(items: Listing[]) {
  const m = new Map<string, number>();
  for (const i of items) m.set(i.type, (m.get(i.type) ?? 0) + 1);
  return m;
}

function Chip({
  on,
  label,
  n,
  onClick,
}: {
  on: boolean;
  label: string;
  n?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        on
          ? "border-navy bg-navy text-white"
          : "border-navy/15 bg-white text-navy/65 hover:border-navy/30"
      }`}
    >
      {label}
      {n !== undefined && <span className={on ? "text-white/60" : "text-navy/40"}>{n}</span>}
    </button>
  );
}

export function ProgramDirectory() {
  const [kind, setKind] = useState<Listing["kind"]>("program");
  const [type, setType] = useState("All");
  const [country, setCountry] = useState("All");

  const ofKind = useMemo(() => LISTINGS.filter((l) => l.kind === kind), [kind]);
  const types = tally(ofKind);
  const countries = Array.from(new Set(ofKind.map((l) => l.country)));
  const results = ofKind.filter(
    (l) => (type === "All" || l.type === type) && (country === "All" || l.country === country),
  );

  const choose = (k: Listing["kind"]) => {
    setKind(k);
    setType("All");
    setCountry("All");
  };

  return (
    <div className={`${PAD.x} py-6 sm:py-10`}>
      {/* Programs / Other (standalone public forms) */}
      <div className="flex gap-1.5" role="group" aria-label="Listing type">
        <Chip
          on={kind === "program"}
          label="Programs"
          onClick={() => {
            choose("program");
          }}
        />
        <Chip
          on={kind === "form"}
          label="Other"
          onClick={() => {
            choose("form");
          }}
        />
      </div>

      {ofKind.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-navy/10 pt-4">
          <div
            className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Program type"
          >
            <Chip
              on={type === "All"}
              label="All"
              n={ofKind.length}
              onClick={() => {
                setType("All");
              }}
            />
            {Array.from(types).map(([t, n]) => (
              <Chip
                key={t}
                on={type === t}
                label={t}
                n={n}
                onClick={() => {
                  setType(t);
                }}
              />
            ))}
          </div>
          <div className="flex gap-4 text-xs" role="group" aria-label="Country">
            {["All", ...countries].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={country === c}
                onClick={() => {
                  setCountry(c);
                }}
                className={`border-b pb-1 transition-colors ${
                  country === c
                    ? "border-navy font-semibold text-navy"
                    : "border-transparent text-navy/50 hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="mt-5 text-xs text-navy/50" aria-live="polite">
        {results.length} {kind === "program" ? "program" : "form"}
        {results.length === 1 ? "" : "s"} available
      </p>

      <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((l) => (
          <li key={l.name}>
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-navy/10 bg-white">
              {/* Cover: swap for the program's poster when it is available */}
              <div className="relative flex h-32 items-end overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#1e3a8a_0%,#0f172a_60%)] p-4 sm:h-36">
                <span className="absolute right-3 top-3 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-navy">
                  {l.type}
                </span>
                <p className="text-lg font-semibold leading-tight text-white">{l.name}</p>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[11px] font-medium text-navy/50">{l.org}</p>
                <h3 className="mt-1 text-sm font-semibold sm:text-[15px]">{l.name}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[l.type, l.mode].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-navy/10 bg-cream px-2 py-0.5 text-[11px] font-medium text-navy/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 space-y-1 text-xs text-navy/60">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {l.location}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {l.dates}
                  </p>
                </div>
                <a
                  href={l.href}
                  className="btn-press group mt-4 flex h-9 items-center justify-center gap-1.5 rounded-none bg-navy text-xs font-semibold text-white hover:bg-navy/90"
                >
                  Apply Now
                  <ArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <p className="mt-3 rounded-xl border border-dashed border-navy/15 p-6 text-center text-sm text-navy/55">
          {kind === "form" ? "No standalone public forms yet." : "No programs match these filters."}
        </p>
      )}
    </div>
  );
}
