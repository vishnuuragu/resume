"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionTemplate,
} from "framer-motion";
import {
  Bot,
  GraduationCap,
  ScanEye,
  Network,
  Radar,
  Github,
  ExternalLink,
  Check,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { projects, profile, type Project } from "@/lib/data";

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  bot: Bot,
  graduation: GraduationCap,
  scan: ScanEye,
  network: Network,
  radar: Radar,
};

const filters = ["All", "AI / ML", "Backend", "Infrastructure"] as const;

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Icon = projectIcons[project.icon] ?? Bot;

  // Tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 150, damping: 20 });

  // Spotlight
  const spotX = useMotionValue(-200);
  const spotY = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${spotX}px ${spotY}px, rgba(139,92,246,0.14), transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    spotX.set(-200);
    spotY.set(-200);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-md transition-colors duration-300 hover:border-neon-purple/40"
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
        aria-hidden
      />
      {/* Top glow line */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      {/* Visual header */}
      <div className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}>
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div className="glass relative flex h-20 w-20 items-center justify-center rounded-2xl shadow-[0_0_32px_rgba(139,92,246,0.25)] transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-9 w-9 text-ink" aria-hidden />
        </div>
        <span className="absolute top-4 right-4 rounded-full border border-line bg-void/60 px-3 py-1 text-[11px] tracking-wide text-ink-dim backdrop-blur">
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-200 group-hover:text-gradient">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[13px] text-ink-faint">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-cyan/70" aria-hidden />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-line bg-white/4 px-2.5 py-1 font-mono text-[11px] text-ink-dim transition-colors duration-200 hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          <a
            href={project.github ?? profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-line py-2.5 text-sm text-ink-dim transition-all duration-200 hover:border-neon-purple/50 hover:text-ink"
          >
            <Github className="h-4 w-4" aria-hidden />
            GitHub
          </a>
          <a
            href={project.demo ?? "#contact"}
            target={project.demo ? "_blank" : undefined}
            rel={project.demo ? "noopener noreferrer" : undefined}
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neon-blue/85 to-neon-purple/85 py-2.5 text-sm font-medium text-white transition-shadow duration-200 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)]"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            {project.demo ? "Live Demo" : "Details"}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="projects-title"
          eyebrow="03 · Projects"
          title="Featured work"
          description="A selection of systems I've designed and shipped — from autonomous AI agents to self-hosted infrastructure."
        />

        {/* Filter */}
        <Reveal className="mb-12 flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative cursor-pointer rounded-full px-5 py-2.5 text-sm transition-colors duration-200 ${
                filter === f ? "text-white" : "text-ink-dim hover:text-ink"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
