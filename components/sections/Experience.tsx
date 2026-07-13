import { Building2, CheckCircle2, CalendarDays } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="experience-title"
          eyebrow="02 · Experience"
          title="Where I've worked"
        />

        <div className="relative border-l border-line pl-8 sm:pl-12">
          {experience.map((job, i) => (
            <Reveal key={i} className="relative pb-4">
              {/* Timeline node */}
              <span
                className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-neon-purple/60 bg-surface shadow-[0_0_16px_rgba(139,92,246,0.5)] sm:-left-[57px]"
                aria-hidden
              >
                <span className="h-2 w-2 rounded-full bg-neon-purple" />
              </span>

              <article className="glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-neon-blue/35 hover:shadow-[0_12px_48px_rgba(59,130,246,0.12)] sm:p-8">
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 text-neon-blue">
                      <Building2 className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{job.role}</h3>
                      <p className="text-neon-cyan">{job.company}</p>
                    </div>
                  </div>
                  <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-ink-dim">
                    <CalendarDays className="h-3.5 w-3.5 text-neon-purple" aria-hidden />
                    {job.period}
                  </span>
                </div>

                <p className="mt-5 text-ink-dim">{job.summary}</p>

                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-dim">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-cyan/80" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
