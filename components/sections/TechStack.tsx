"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Braces,
  Server,
  Atom,
  Route,
  Leaf,
  Database,
  Waypoints,
  Sparkles,
  Gem,
  Link2,
  Container,
  Terminal,
  GitBranch,
  Shield,
  Lock,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { techStack } from "@/lib/data";

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code2,
  braces: Braces,
  server: Server,
  atom: Atom,
  route: Route,
  leaf: Leaf,
  database: Database,
  waypoints: Waypoints,
  sparkles: Sparkles,
  gem: Gem,
  link: Link2,
  container: Container,
  terminal: Terminal,
  "git-branch": GitBranch,
  shield: Shield,
  lock: Lock,
};

export default function TechStack() {
  return (
    <section id="tech" aria-labelledby="tech-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="tech-title"
          eyebrow="05 · Tech Stack"
          title="Tools of the trade"
          description="Hover any tile to see how I use it."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {techStack.map((tech, i) => {
            const Icon = techIcons[tech.icon] ?? Code2;
            return (
              <Reveal key={tech.name} delay={(i % 4) * 0.06} className="h-full">
                <motion.div
                  tabIndex={0}
                  className="group glass relative flex h-full min-h-[132px] cursor-default flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-5 text-center outline-none transition-all duration-300 hover:border-neon-blue/40 hover:shadow-[0_0_32px_rgba(59,130,246,0.15)] focus-visible:border-neon-cyan"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 via-transparent to-neon-purple/0 opacity-0 transition-opacity duration-300 group-hover:from-neon-blue/10 group-hover:to-neon-purple/10 group-hover:opacity-100"
                    aria-hidden
                  />
                  <Icon
                    className="relative h-8 w-8 text-ink-dim transition-all duration-300 group-hover:scale-110 group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.7)] group-focus-visible:text-neon-cyan"
                    aria-hidden
                  />
                  <span className="relative font-display text-sm font-medium text-ink">{tech.name}</span>
                  {/* Description reveal */}
                  <span className="relative block max-h-0 overflow-hidden text-xs leading-relaxed text-ink-faint opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 group-focus-visible:max-h-20 group-focus-visible:opacity-100">
                    {tech.description}
                  </span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
