import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SetupPanel } from "@/components/auth/setup-panel";
import { SignUpForm } from "@/components/auth/sign-up-form";
import photo from "@/public/auth/sign-up-stephen-dawson.jpg";

export const metadata: Metadata = { title: "Create your account · Aplikant" };

export default function SignUpPage() {
  return (
    <AuthShell
      image={photo}
      alt="A data reporting dashboard on a laptop screen"
      credit={{ name: "Stephen Dawson", href: "https://unsplash.com/photos/qwtCeJ5cLYs" }}
      panel={<SetupPanel />}
    >
      <SignUpForm />
    </AuthShell>
  );
}
