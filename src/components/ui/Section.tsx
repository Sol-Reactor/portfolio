import type { ReactNode } from 'react';
import { Container } from './Container';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  /** Centre the heading block (used where the section's content is centred too). */
  centered?: boolean;
  children: ReactNode;
}

/** Renders *word* in a title as <em>, which headings show in the accent colour. */
function emphasize(title: string) {
  return title.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}

/** Consistent section shell: anchor id, numbered eyebrow, heading and spacing. */
export function Section({ id, index, eyebrow, title, description, centered = false, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line py-20 sm:py-28">
      <Container>
        <Reveal className={`mb-12 max-w-2xl sm:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
          <p
            className={`mb-4 flex items-center gap-3 font-sans text-xs font-medium tracking-[0.14em] text-accent-soft uppercase ${centered ? 'justify-center' : ''}`}
          >
            <span>{index}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>{eyebrow}</span>
          </p>
          <h2 id={headingId} className="text-[clamp(1.85rem,4vw,2.6rem)] leading-[1.2] font-semibold text-balance">
            {emphasize(title)}
          </h2>
          {description && <p className="mt-4 text-base leading-[1.7] text-muted text-pretty sm:text-lg">{description}</p>}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
