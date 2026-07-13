"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Briefcase, Rocket } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { timeline } from "@/lib/data";

const typeConfig = {
  education: { icon: GraduationCap, color: "text-neon-blue", ring: "border-neon-blue/50", glow: "shadow-[0_0_16px_rgba(59,130,246,0.45)]", badge: "Education" },
  work: { icon: Briefcase, color: "text-neon-purple", ring: "border-neon-purple/50", glow: "shadow-[0_0_16px_rgba(139,92,246,0.45)]", badge: "Work" },
  learning: { icon: Rocket, color: "text-neon-cyan", ring: "border-neon-cyan/50", glow: "shadow-[0_0_16px_rgba(6,182,212,0.45)]", badge: "Journey" },
};

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="timeline-title"
          eyebrow="06 · Timeline"
          title="The journey so far"
        />

        <div ref={ref} className="relative">
          {/* Track + animated fill */}
          <div className="absolute top-0 bottom-0 left-[22px] w-px bg-line sm:left-1/2" aria-hidden />
          <motion.div
            className="absolute top-0 bottom-0 left-[22px] w-px origin-top bg-gradient-to-b from-neon-blue via-neon-purple to-neon-cyan sm:left-1/2"
            style={{ scaleY }}
            aria-hidden
          />

          <ol className="space-y-12">
            {timeline.map((item, i) => {
              const config = typeConfig[item.type];
              const Icon = config.icon;
              const left = i % 2 === 0;
              return (
                <li key={item.title} className="relative">
                  <div
                    className={`absolute left-[22px] z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border bg-surface sm:left-1/2 ${config.ring} ${config.glow}`}
                    aria-hidden
                  >
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>

                  <Reveal
                    className={`ml-14 sm:ml-0 sm:w-[calc(50%-3rem)] ${left ? "" : "sm:ml-auto"}`}
                    y={20}
                  >
                    <article className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-neon-purple/35">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-mono text-xs ${config.color}`}>{item.year}</span>
                        <span className="rounded-full border border-line px-2.5 py-0.5 text-[10px] tracking-wider text-ink-faint uppercase">
                          {config.badge}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold text-ink">{item.title}</h3>
                      <p className="text-sm text-ink-dim">{item.place}</p>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-faint">{item.description}</p>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
