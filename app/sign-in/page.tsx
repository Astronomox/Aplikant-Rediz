import type { Metadata } from "next";
import { AnalyticsPanel } from "@/components/auth/analytics-panel";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import photo from "@/public/auth/sign-in-luke-chesser.jpg";

export const metadata: Metadata = { title: "Sign in · Aplikant" };

export default function SignInPage() {
  return (
    <AuthShell
      image={photo}
      alt="Performance analytics graphs on a laptop screen"
      credit={{ name: "Luke Chesser", href: "https://unsplash.com/photos/JKUTrJ4vK00" }}
      panel={<AnalyticsPanel />}
    >
      <SignInForm />
    </AuthShell>
  );
}
