import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

// latin-ext is required: the Naira sign (₦, U+20A6) is not in Inter's latin subset,
// and without it the browser falls back to a system font that renders it badly.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aplikant — Run your programs end to end",
  description:
    "Aplikant helps you manage applications, track participants, take attendance, and generate impact reports on one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Font variable is set on <body> so it overrides the :root fallback in globals.css */}
      <body className={`${inter.variable} font-sans antialiased`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
