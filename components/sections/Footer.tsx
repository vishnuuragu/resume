"use client";

import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { profile } from "@/lib/data";

const socials = [
  { label: "GitHub", href: profile.github, icon: Github },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-surface/40 px-6 py-10 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="flex items-center gap-1.5 text-sm text-ink-faint">
          © {new Date().getFullYear()} {profile.name} · Built with
          <Heart className="h-3.5 w-3.5 text-neon-purple" aria-label="love" />
          and way too much coffee
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-ink-faint transition-all duration-200 hover:-translate-y-0.5 hover:text-neon-cyan"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </a>
          ))}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="glass ml-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-ink-dim transition-all duration-200 hover:-translate-y-1 hover:border-neon-purple/50 hover:text-neon-purple"
          >
            <ArrowUp className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
