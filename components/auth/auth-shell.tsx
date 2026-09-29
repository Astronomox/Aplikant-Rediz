import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/*
 * Split-screen auth layout.
 *   lg+  form column (left) | full-height photo with a live data panel (right)
 *   <lg  a short photo banner above the form
 * Photos are free under the Unsplash License; the photographer is credited on the image.
 */

export interface Credit {
  name: string;
  href: string;
}

export function AuthShell({
  image,
  alt,
  credit,
  panel,
  children,
}: {
  image: StaticImageData;
  alt: string;
  credit: Credit;
  panel: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-dvh bg-cream text-navy lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Form side */}
      <div className="order-2 flex flex-col px-5 pb-8 pt-6 sm:px-10 lg:order-1 lg:px-16 lg:py-10">
        <Link href="/" aria-label="Aplikant home" className="hidden w-fit lg:block">
          <Image
            src="/logo.png"
            alt="Aplikant"
            width={144}
            height={72}
            className="-my-4 h-auto w-[118px]"
          />
        </Link>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center lg:py-10">
          {children}
        </div>
        <p className="mx-auto mt-8 text-center text-[11px] text-navy/40">
          © {new Date().getFullYear()} Aplikant ·{" "}
          <Link href="/" className="hover:text-navy">
            Back to site
          </Link>
        </p>
      </div>

      {/* Image side */}
      <div className="relative order-1 h-52 overflow-hidden bg-navy sm:h-64 lg:order-2 lg:h-auto">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
        {/* Navy wash so the panel and brand read over any photo */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,23,42,0.35)_0%,rgba(15,23,42,0.75)_55%,rgba(15,23,42,0.95)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(245,158,11,0.18),transparent_70%)]" />

        {/* Phones: logo over the banner */}
        <Link href="/" aria-label="Aplikant home" className="absolute left-5 top-4 lg:hidden">
          <Image
            src="/logo-white.png"
            alt="Aplikant"
            width={144}
            height={72}
            className="-my-4 h-auto w-[104px]"
          />
        </Link>

        <div className="absolute inset-0 hidden items-center justify-center p-10 lg:flex">
          {panel}
        </div>

        <a
          href={credit.href}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-2 right-3 text-[10px] text-white/50 hover:text-white lg:bottom-4 lg:right-5"
        >
          Photo: {credit.name} on Unsplash
        </a>
      </div>
    </main>
  );
}
