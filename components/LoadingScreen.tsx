"use client";

import { useEffect } from "react";
import { profile } from "@/lib/data";
import { markLoaderSeen } from "@/lib/timing";

/**
 * Splash overlay driven entirely by CSS (see .loader-* in globals.css) so it
 * appears and fades on schedule even before JS hydrates. A pre-paint inline
 * script in the layout adds .intro-seen to <html> on repeat session views,
 * which hides this instantly.
 */
export default function LoadingScreen() {
  useEffect(() => {
    markLoaderSeen();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="loader-overlay fixed inset-0 z-[200] flex items-center justify-center bg-void"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="loader-pop relative flex h-24 w-24 items-center justify-center rounded-2xl gradient-border">
          <span className="font-display text-3xl font-bold text-gradient">
            {profile.initials}
          </span>
          <div className="absolute inset-0 rounded-2xl bg-neon-purple/10 blur-xl" />
        </div>
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-raised">
          <div className="loader-fill h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan" />
        </div>
      </div>
    </div>
  );
}
