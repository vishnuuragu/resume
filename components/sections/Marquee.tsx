import { marqueeTech } from "@/lib/data";
import { Sparkle } from "lucide-react";

/** Infinite technology marquee — pure CSS animation, duplicated list. */
export default function Marquee() {
  const items = [...marqueeTech, ...marqueeTech];

  return (
    <div
      aria-hidden
      className="marquee-track relative z-10 overflow-hidden border-y border-line bg-surface/40 py-4 backdrop-blur-sm"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="marquee-inner flex w-max items-center gap-10 animate-marquee">
        {items.map((tech, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-sm tracking-wide text-ink-faint transition-colors hover:text-ink">
              {tech}
            </span>
            <Sparkle className="h-3 w-3 text-neon-purple/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
