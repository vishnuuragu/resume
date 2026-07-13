"use client";

import { useRef } from "react";
import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { Code2, Layout, Server, Brain, Database, Cloud, Cpu } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { skills } from "@/lib/data";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  layout: Layout,
  server: Server,
  brain: Brain,
  database: Database,
  cloud: Cloud,
  cpu: Cpu,
};

function SkillCard({ category, icon, items }: { category: string; icon: string; items: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = categoryIcons[icon] ?? Code2;
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const glow = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, rgba(6,182,212,0.12), transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(-200);
        y.set(-200);
      }}
      className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-neon-cyan/35 hover:shadow-[0_12px_40px_rgba(6,182,212,0.1)]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
        aria-hidden
      />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-cyan/20 text-neon-cyan transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="font-display text-lg font-semibold text-ink">{category}</h3>
        </div>
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-line bg-white/4 px-3 py-1.5 text-[13px] text-ink-dim transition-colors duration-200 hover:border-neon-purple/40 hover:text-ink"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="skills-title"
          eyebrow="04 · Skills"
          title="What I work with"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.category} delay={(i % 3) * 0.08} className="h-full">
              <SkillCard {...group} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
