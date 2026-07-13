"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  FileDown,
  MapPin,
  Braces,
  Bot,
  Database,
  Terminal,
  Cloud,
  ChevronDown,
} from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { profile, typingRoles } from "@/lib/data";

function useTyping(words: string[], speed = 70, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[wordIndex % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, speed, pause, reduced]);

  return text;
}

const floatingIcons = [
  { Icon: Bot, className: "top-[8%] left-[6%]", delay: 0 },
  { Icon: Braces, className: "top-[18%] right-[4%]", delay: 1.2 },
  { Icon: Database, className: "bottom-[24%] left-[2%]", delay: 2.1 },
  { Icon: Terminal, className: "bottom-[10%] right-[10%]", delay: 0.6 },
  { Icon: Cloud, className: "top-[45%] right-[-3%]", delay: 1.7 },
];

const codeLines = [
  { code: "class Engineer:", indent: 0 },
  { code: 'name = "Vishnu R"', indent: 1 },
  { code: 'focus = ["AI Agents", "Backend", "Cloud"]', indent: 1 },
  { code: "", indent: 0 },
  { code: "async def build(self, idea):", indent: 1 },
  { code: "system = await self.architect(idea)", indent: 2 },
  { code: "return self.ship(system)  # ✓ production", indent: 2 },
];

export default function Hero() {
  const typed = useTyping(typingRoles);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Mouse parallax on the visual column
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 });
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMouseMove}
      aria-label="Introduction"
      className="relative flex min-h-dvh items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        {/* ── Text column ── */}
        <div>
          <motion.div {...enter(1.4)}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-ink-dim">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-dot" aria-hidden />
              {profile.availability}
            </span>
          </motion.div>

          <motion.p {...enter(1.55)} className="mt-8 font-mono text-sm text-neon-cyan sm:text-base">
            Hi, I&apos;m
          </motion.p>

          <motion.h1
            {...enter(1.65)}
            className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]">
              {profile.name}
            </span>
          </motion.h1>

          <motion.div
            {...enter(1.75)}
            className="mt-4 flex h-10 items-center font-display text-xl text-ink sm:text-2xl lg:text-3xl"
            aria-live="polite"
          >
            <span>{typed}</span>
            <span
              className="ml-1 inline-block h-[1.1em] w-[3px] animate-pulse rounded bg-neon-cyan"
              aria-hidden
            />
          </motion.div>

          <motion.p {...enter(1.85)} className="mt-6 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
            {profile.subtitle}
          </motion.p>

          <motion.div {...enter(1.95)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-6 py-3.5 font-medium text-white shadow-[0_0_28px_rgba(99,102,241,0.4)] transition-shadow duration-300 hover:shadow-[0_0_44px_rgba(139,92,246,0.6)]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resumeUrl}
                download
                className="glass inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3.5 font-medium text-ink transition-colors duration-300 hover:border-neon-cyan/50 hover:text-neon-cyan"
              >
                <FileDown className="h-4 w-4" aria-hidden />
                Download Resume
              </a>
            </Magnetic>
          </motion.div>

          <motion.p {...enter(2.05)} className="mt-8 flex items-center gap-2 text-sm text-ink-faint">
            <MapPin className="h-4 w-4 text-neon-purple" aria-hidden />
            {profile.location}
          </motion.p>
        </div>

        {/* ── Visual column ── */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: px, y: py }}
          aria-hidden
        >
          {/* Glowing sphere */}
          <div className="absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/25 via-neon-purple/20 to-neon-cyan/15 blur-[60px]" />
            <div className="absolute inset-10 rounded-full border border-white/8" />
            <div className="absolute inset-0 rounded-full border border-neon-purple/15 animate-spin-slow" style={{ borderStyle: "dashed" }} />
          </div>

          {/* Code card */}
          <motion.div
            className="gradient-border relative mx-auto max-w-md rounded-2xl p-1 shadow-[0_24px_80px_rgba(3,5,15,0.7)]"
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
          >
            <div className="rounded-xl bg-surface/95 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-ink-faint">agent.py</span>
              </div>
              <pre className="overflow-x-auto font-mono text-[13px] leading-7">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: reduced ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + i * 0.12, duration: 0.4 }}
                    style={{ paddingLeft: line.indent * 20 }}
                  >
                    <code
                      className={
                        line.code.startsWith("class") || line.code.includes("async def")
                          ? "text-neon-purple"
                          : line.code.includes("#")
                            ? "text-ink-dim"
                            : line.code.includes('"')
                              ? "text-neon-cyan"
                              : "text-ink"
                      }
                    >
                      {line.code || " "}
                    </code>
                  </motion.div>
                ))}
              </pre>
            </div>
          </motion.div>

          {/* Floating tech icons */}
          {floatingIcons.map(({ Icon, className, delay }, i) => (
            <motion.div
              key={i}
              className={`glass absolute flex h-12 w-12 items-center justify-center rounded-xl text-neon-cyan shadow-[0_0_20px_rgba(6,182,212,0.15)] ${className}`}
              animate={reduced ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay }}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 cursor-pointer text-ink-faint transition-colors hover:text-neon-cyan sm:block"
        animate={reduced ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <ChevronDown className="h-6 w-6" aria-hidden />
      </motion.a>
    </section>
  );
}
