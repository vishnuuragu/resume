import Reveal from "@/components/Reveal";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ id, eyebrow, title, description }: Props) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 font-mono text-sm tracking-[0.25em] text-neon-cyan uppercase">
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-dim">{description}</p>}
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
    </Reveal>
  );
}
