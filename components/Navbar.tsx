"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { introDelay } from "@/lib/timing";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view for active nav highlighting
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70] flex justify-center px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: introDelay(0.1), ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.nav
          aria-label="Primary"
          className={`glass-strong mt-3 flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? "py-2 shadow-[0_8px_32px_rgba(3,5,15,0.6)]" : "py-3.5"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple text-sm text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]">
              {profile.initials}
            </span>
            <span className="hidden text-ink sm:inline">
              Vishnu<span className="text-gradient">.dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                    active === link.href ? "text-ink" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/8 shadow-[inset_0_0_12px_rgba(139,92,246,0.15)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-cmdk"))}
              className="hidden cursor-pointer items-center gap-2 rounded-lg border border-line bg-white/4 px-3 py-2 text-xs text-ink-faint transition-colors hover:border-neon-purple/40 hover:text-ink-dim md:flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" aria-hidden />
              <span>Ctrl K</span>
            </button>
            <a
              href="#contact"
              className="hidden cursor-pointer rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 text-sm font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-shadow duration-200 hover:shadow-[0_0_28px_rgba(99,102,241,0.55)] lg:inline-block"
            >
              Hire Me
            </a>
            <button
              type="button"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col bg-void/92 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <nav aria-label="Mobile" className="mt-28 flex flex-col items-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`w-full max-w-sm rounded-xl px-6 py-3.5 text-center font-display text-xl transition-colors ${
                    active === link.href
                      ? "bg-white/8 text-ink"
                      : "text-ink-dim hover:bg-white/5 hover:text-ink"
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
