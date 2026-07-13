"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Wrench,
  Layers,
  GitCommitHorizontal,
  Mail,
  Github,
  Linkedin,
  Copy,
  FileDown,
  CornerDownLeft,
} from "lucide-react";
import { profile } from "@/lib/data";

type Action = {
  id: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  run: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setIndex(0);
  }, []);

  const go = useCallback(
    (hash: string) => {
      close();
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [close]
  );

  const actions: Action[] = useMemo(
    () => [
      { id: "home", label: "Go to Home", hint: "Navigate", icon: Home, run: () => go("#home") },
      { id: "about", label: "Go to About", hint: "Navigate", icon: User, run: () => go("#about") },
      { id: "experience", label: "Go to Experience", hint: "Navigate", icon: Briefcase, run: () => go("#experience") },
      { id: "projects", label: "Go to Projects", hint: "Navigate", icon: FolderGit2, run: () => go("#projects") },
      { id: "skills", label: "Go to Skills", hint: "Navigate", icon: Wrench, run: () => go("#skills") },
      { id: "tech", label: "Go to Tech Stack", hint: "Navigate", icon: Layers, run: () => go("#tech") },
      { id: "timeline", label: "Go to Timeline", hint: "Navigate", icon: GitCommitHorizontal, run: () => go("#timeline") },
      { id: "contact", label: "Go to Contact", hint: "Navigate", icon: Mail, run: () => go("#contact") },
      {
        id: "copy-email",
        label: "Copy Email Address",
        hint: "Action",
        icon: Copy,
        run: async () => {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
            close();
          }, 900);
        },
      },
      {
        id: "resume",
        label: "Download Resume",
        hint: "Action",
        icon: FileDown,
        run: () => {
          close();
          window.open(profile.resumeUrl, "_blank");
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "Social",
        icon: Github,
        run: () => {
          close();
          window.open(profile.github, "_blank");
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "Social",
        icon: Linkedin,
        run: () => {
          close();
          window.open(profile.linkedin, "_blank");
        },
      },
    ],
    [close, go]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen);
    };
  }, [close]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[index]) {
      e.preventDefault();
      filtered[index].run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-start justify-center bg-black/55 px-4 pt-[16vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            className="glass-strong w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
                ESC
              </kbd>
            </div>

            <ul className="max-h-[320px] overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-ink-faint">No results found</li>
              )}
              {filtered.map((action, i) => {
                const Icon = action.icon;
                const isCopied = copied && action.id === "copy-email";
                return (
                  <li key={action.id} role="option" aria-selected={i === index}>
                    <button
                      type="button"
                      onClick={action.run}
                      onMouseEnter={() => setIndex(i)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        i === index ? "bg-white/8 text-ink" : "text-ink-dim"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${i === index ? "text-neon-cyan" : "text-ink-faint"}`} aria-hidden />
                      <span className="flex-1">{isCopied ? "Copied!" : action.label}</span>
                      <span className="text-[10px] tracking-wide text-ink-faint uppercase">{action.hint}</span>
                      {i === index && <CornerDownLeft className="h-3.5 w-3.5 text-ink-faint" aria-hidden />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
