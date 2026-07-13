"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Phone,
  Copy,
  Check,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { profile } from "@/lib/data";

const contactItems = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
  { label: "GitHub", value: "View profile", href: profile.github, icon: Github },
  { label: "LinkedIn", value: "Connect", href: profile.linkedin, icon: Linkedin },
];

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateForm = (patch: Partial<typeof form>) => {
    setForm((f) => ({ ...f, ...patch }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Without a Web3Forms key, fall back to the visitor's email client
    if (!profile.web3formsKey) {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    // Honeypot: real users never fill this; silently drop bot submissions
    const botcheck = (new FormData(e.currentTarget).get("botcheck") as string) ?? "";
    if (botcheck) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `Portfolio contact from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-white/4 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors duration-200 focus:border-neon-cyan/60 focus:bg-white/6";

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="contact-title"
          eyebrow="08 · Contact"
          title="Let's build something together"
          description={profile.availability}
        />

        <Reveal>
          <div className="gradient-border overflow-hidden rounded-3xl">
            <div className="grid gap-0 rounded-3xl bg-surface/90 backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr]">
              {/* Info panel */}
              <div className="relative border-b border-line p-8 sm:p-10 lg:border-r lg:border-b-0">
                <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-neon-purple/12 blur-3xl" aria-hidden />
                <h3 className="relative font-display text-2xl font-semibold text-ink">Get in touch</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ink-dim">
                  Have an opportunity, a project idea, or just want to talk about AI agents and
                  infrastructure? My inbox is always open.
                </p>

                <ul className="relative mt-8 space-y-3">
                  {contactItems.map(({ label, value, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex cursor-pointer items-center gap-4 rounded-xl border border-transparent p-2.5 transition-all duration-200 hover:border-line hover:bg-white/4"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue/15 to-neon-purple/15 text-neon-cyan transition-transform duration-200 group-hover:scale-110">
                          <Icon className="h-4.5 w-4.5" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs text-ink-faint">{label}</span>
                          <span className="block text-sm text-ink">{value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                  <li className="flex items-center gap-4 p-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue/15 to-neon-purple/15 text-neon-cyan">
                      <MapPin className="h-4.5 w-4.5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs text-ink-faint">Location</span>
                      <span className="block text-sm text-ink">{profile.location}</span>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="relative mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-xs text-ink-dim transition-colors duration-200 hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  {copied ? "Copied to clipboard" : "Copy email address"}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit} className="p-8 sm:p-10" aria-label="Contact form">
                {/* Honeypot — hidden from real users and assistive tech */}
                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-2 block text-sm text-ink-dim">
                      Name <span className="text-neon-purple" aria-hidden>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => updateForm({ name: e.target.value })}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm text-ink-dim">
                      Email <span className="text-neon-purple" aria-hidden>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => updateForm({ email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="contact-message" className="mb-2 block text-sm text-ink-dim">
                    Message <span className="text-neon-purple" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => updateForm({ message: e.target.value })}
                    placeholder="Tell me about your project or opportunity…"
                    className={`${inputClass} resize-none`}
                  />
                  <p className="mt-2 text-xs text-ink-faint">
                    {profile.web3formsKey
                      ? "Your message goes straight to my inbox."
                      : "Submitting opens your email client with this message prefilled."}
                  </p>
                </div>
                <Magnetic className="mt-7 inline-block">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    aria-busy={status === "submitting"}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple px-7 py-3.5 font-medium text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                  >
                    {status === "submitting" ? (
                      <>
                        Sending…
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                </Magnetic>

                {/* Submission status — announced politely to screen readers */}
                <div aria-live="polite" className="mt-5 min-h-6 text-sm">
                  {status === "success" && (
                    <p className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
                      Message sent — I&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="flex items-start gap-2 text-red-400">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      <span>
                        Something went wrong sending your message. Please try again, or email
                        me directly at{" "}
                        <a href={`mailto:${profile.email}`} className="underline underline-offset-2 hover:text-red-300">
                          {profile.email}
                        </a>
                        .
                      </span>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
