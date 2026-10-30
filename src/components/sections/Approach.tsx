import { principles } from '../../data/approach';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';

export function Approach({ index }: { index: string }) {
  return (
    <Section
      id="approach"
      index={index}
      eyebrow="Engineering approach"
      title="How I *build* software"
      description="Principles I work by and keep getting better at — the habits behind the code."
    >
      <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {principles.map(({ title, description, icon: Icon }, i) => (
          <li key={title} className="bg-bg">
            <Reveal delay={(i % 4) * 0.05} className="h-full p-6 transition-colors duration-200 hover:bg-surface">
              <Icon aria-hidden="true" className="mb-4 size-5 text-accent-soft" />
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </Reveal>
          </li>
        ))}
        {/* Seven principles: one filler cell keeps the 2- and 4-column grids even. */}
        <li aria-hidden="true" className="hidden bg-bg sm:block" />
      </ul>
    </Section>
  );
}
