import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { profile } from "@/lib/data";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      {/* Static aurora accents (no JS needed on this page) */}
      <div
        aria-hidden
        className="aurora-a absolute -top-[20%] -left-[15%] h-[60vmax] w-[60vmax] rounded-full bg-neon-blue/14"
      />
      <div
        aria-hidden
        className="aurora-b absolute -bottom-[25%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full bg-neon-purple/12"
      />
      <div aria-hidden className="bg-grid absolute inset-0" />

      <div className="relative">
        <p className="font-mono text-sm tracking-[0.25em] text-neon-cyan uppercase">Error 404</p>
        <h1 className="mt-4 font-display text-7xl font-bold text-gradient sm:text-8xl">404</h1>
        <p className="mt-6 text-lg text-ink-dim">
          This page drifted off into the void.
        </p>
        <p className="mt-1 text-sm text-ink-faint">
          The link may be outdated — everything worth seeing lives on the home page.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3.5 font-medium text-white shadow-[0_0_28px_rgba(99,102,241,0.4)] transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(139,92,246,0.6)]"
        >
          <MoveLeft className="h-4 w-4" aria-hidden />
          Back to {profile.name.split(" ")[0]}&apos;s portfolio
        </Link>
      </div>
    </main>
  );
}
