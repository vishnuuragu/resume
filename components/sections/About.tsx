"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { about, stats, profile } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gradient tabular-nums sm:text-5xl">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="about-title"
          eyebrow="01 · About"
          title="Engineering intelligent systems"
        />

        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Profile visual */}
          <Reveal className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-neon-blue/25 via-neon-purple/20 to-neon-cyan/15 blur-3xl" aria-hidden />
              <motion.div
                className="gradient-border relative flex h-56 w-56 items-center justify-center rounded-full sm:h-72 sm:w-72"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-surface/90">
                  {/* Swap for <Image> of your photo when ready */}
                  <span className="font-display text-6xl font-bold text-gradient sm:text-7xl">
                    {profile.initials}
                  </span>
                </div>
              </motion.div>
              <div
                className="glass absolute -right-2 bottom-6 flex items-center gap-2 rounded-full px-4 py-2 text-xs text-ink-dim shadow-[0_8px_24px_rgba(3,5,15,0.5)]"
                aria-hidden
              >
                <Terminal className="h-3.5 w-3.5 text-neon-cyan" />
                Linux Power User
              </div>
              <div
                className="glass absolute -left-4 top-8 flex items-center gap-2 rounded-full px-4 py-2 text-xs text-ink-dim shadow-[0_8px_24px_rgba(3,5,15,0.5)]"
                aria-hidden
              >
                <Sparkles className="h-3.5 w-3.5 text-neon-purple" />
                AI Engineer
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div className="space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={`leading-relaxed ${i === 0 ? "text-lg text-ink" : "text-ink-dim"}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Animated counters */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="glass group relative overflow-hidden rounded-2xl p-6 text-center transition-colors duration-300 hover:border-neon-purple/40 sm:p-8">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 opacity-0 transition-opacity duration-300 group-hover:from-neon-blue/8 group-hover:to-neon-purple/8 group-hover:opacity-100"
                  aria-hidden
                />
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-3 text-sm text-ink-dim">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
