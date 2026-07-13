import { Telescope } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { exploring } from "@/lib/data";

export default function Exploring() {
  return (
    <section aria-labelledby="exploring-title" className="relative px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="exploring-title"
          eyebrow="07 · Now"
          title="Currently exploring"
        />
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
            <div
              className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-neon-cyan/10 blur-3xl"
              aria-hidden
            />
            <div className="relative flex flex-wrap justify-center gap-3">
              {exploring.map((topic) => (
                <span
                  key={topic}
                  className="group flex cursor-default items-center gap-2 rounded-full border border-line bg-white/4 px-4 py-2 text-sm text-ink-dim transition-all duration-200 hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-[0_0_18px_rgba(6,182,212,0.2)]"
                >
                  <Telescope className="h-3.5 w-3.5 text-neon-purple transition-colors group-hover:text-neon-cyan" aria-hidden />
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
