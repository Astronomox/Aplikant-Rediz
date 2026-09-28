"use client";

import Link from "next/link";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { APP_AUTH_URL, EMAIL_RE, Field, INPUT, PasswordInput } from "./fields";

/** 0-4: length, mixed case, number, symbol. */
function strength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const LEVELS = ["Too short", "Weak", "Fair", "Good", "Strong"];
const LEVEL_COLOR = ["bg-navy/15", "bg-[#ef4444]", "bg-gold", "bg-mint/70", "bg-mint"];

const PERKS = ["Free forever", "No credit card", "Set up in 5 minutes"];

export function SignUpForm() {
  const [form, setForm] = useState({ name: "", org: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form | "agree", string>>>({});
  const [busy, setBusy] = useState(false);
  const score = strength(form.password);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Enter your full name.";
    if (!form.org.trim()) next.org = "Enter your organization's name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (form.password.length < 8) next.password = "Use at least 8 characters.";
    if (!agree) next.agree = "Please accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    window.location.href = APP_AUTH_URL;
  };

  return (
    <div>
      <p className="text-xs font-medium text-navy/50">Get started</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        Create your workspace
      </h1>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        {PERKS.map((p) => (
          <li key={p} className="flex items-center gap-1.5 text-xs text-navy/60">
            <Check className="h-3.5 w-3.5 text-mint" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>

      <form onSubmit={submit} noValidate className="mt-6 space-y-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Full name" error={errors.name}>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                autoComplete="name"
                placeholder="Amina Okafor"
                value={form.name}
                onChange={set("name")}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={INPUT}
              />
            )}
          </Field>
          <Field label="Organization" error={errors.org}>
            {({ id, describedBy, invalid }) => (
              <input
                id={id}
                autoComplete="organization"
                placeholder="Lagos Innovation Hub"
                value={form.org}
                onChange={set("org")}
                aria-invalid={invalid}
                aria-describedby={describedBy}
                className={INPUT}
              />
            )}
          </Field>
        </div>
        <Field label="Work email" error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="email"
              autoComplete="email"
              placeholder="you@organization.org"
              value={form.email}
              onChange={set("email")}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={INPUT}
            />
          )}
        </Field>
        <Field label="Password" error={errors.password}>
          {({ id, describedBy, invalid }) => (
            <>
              <PasswordInput
                id={id}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={set("password")}
                aria-invalid={invalid}
                aria-describedby={describedBy}
              />
              {form.password && (
                <div className="mt-2 flex items-center gap-2" aria-live="polite">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((n) => (
                      <span
                        key={n}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          score >= n ? (LEVEL_COLOR[score] ?? "bg-mint") : "bg-navy/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="w-14 text-right text-[11px] text-navy/55">{LEVELS[score]}</span>
                </div>
              )}
            </>
          )}
        </Field>

        <div>
          <label className="flex items-start gap-2 text-xs text-navy/65">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked);
              }}
              aria-invalid={Boolean(errors.agree)}
              className="mt-0.5 h-4 w-4 accent-navy"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="font-medium text-navy underline-offset-4 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-navy underline-offset-4 hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.agree && <p className="mt-1.5 text-[11px] text-[#b91c1c]">{errors.agree}</p>}
        </div>

        <button
          type="submit"
          disabled={busy}
          className="btn-gold group flex h-11 w-full items-center justify-center gap-2 rounded-none text-sm disabled:opacity-70"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              Create free account
              <ArrowRight className="arrow-nudge h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-navy/55">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-navy underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
