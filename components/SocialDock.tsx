"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

/** Floating vertical social dock — desktop only. */
export default function SocialDock() {
  return (
    <motion.aside
      aria-label="Social links"
      className="fixed bottom-0 left-6 z-[60] hidden flex-col items-center gap-1 xl:flex"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-ink-faint transition-all duration-200 hover:-translate-y-1 hover:text-neon-cyan"
        >
          <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" aria-hidden />
        </a>
      ))}
      <div className="mt-2 h-24 w-px bg-gradient-to-b from-line to-transparent" />
    </motion.aside>
  );
}
