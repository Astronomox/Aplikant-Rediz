"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { APP_AUTH_URL, EMAIL_RE, Field, INPUT, PasswordInput } from "./fields";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [busy, setBusy] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    window.location.href = APP_AUTH_URL;
  };

  return (
    <div>
      <p className="text-xs font-medium text-navy/50">Welcome back</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        Sign in to Aplikant
      </h1>
      <p className="mt-2 text-[13px] text-navy/55">
        Pick up where you left off with your programs, participants and reports.
      </p>

      <form onSubmit={submit} noValidate className="mt-7 space-y-4">
        <Field label="Work email" error={errors.email}>
          {({ id, describedBy, invalid }) => (
            <input
              id={id}
              type="email"
              autoComplete="email"
              placeholder="you@organization.org"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              aria-invalid={invalid}
              aria-describedby={describedBy}
              className={INPUT}
            />
          )}
        </Field>
        <Field
          label="Password"
          error={errors.password}
          aside={
            <a href={APP_AUTH_URL} className="text-[11px] font-medium text-navy/55 hover:text-navy">
              Forgot password?
            </a>
          }
        >
          {({ id, describedBy, invalid }) => (
            <PasswordInput
              id={id}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          )}
        </Field>

        <label className="flex items-center gap-2 text-xs text-navy/65">
          <input type="checkbox" className="h-4 w-4 accent-navy" defaultChecked />
          Keep me signed in on this device
        </label>

        <button
          type="submit"
          disabled={busy}
          className="btn-press group flex h-11 w-full items-center justify-center gap-2 rounded-none bg-navy text-sm font-semibold text-white hover:bg-navy/90 disabled:opacity-70"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <>
              Sign in
              <ArrowRight className="arrow-nudge h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-navy/55">
        New to Aplikant?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-navy underline-offset-4 hover:underline"
        >
          Create a free account
        </Link>
      </p>
    </div>
  );
}
