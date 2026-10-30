import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { focusAreas } from '../../data/approach';
import { Section } from '../ui/Section';
import { InteractiveAboutTerminal } from './InteractiveAboutTerminal';

const ease = [0.21, 0.6, 0.35, 1] as const;
const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } } as const;
const stagger = (each: number) => ({ hidden: {}, show: { transition: { staggerChildren: each } } });

const fromRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

export function About({ index }: { index: string }) {
  // Which focus row is open: hover on desktop, tap or keyboard focus elsewhere.
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section id="about" index={index} eyebrow="About" title="Practical software, *built to last.*">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <InteractiveAboutTerminal />

        <m.div {...inView} variants={stagger(0.1)}>
          <m.h3 variants={fromRight} className="mb-4 font-sans text-xs tracking-widest text-muted uppercase">
            What I focus on
          </m.h3>
          <m.ul
            variants={stagger(0.1)}
            onMouseLeave={() => setOpen(null)}
            className="divide-y divide-line rounded-xl border border-line bg-surface shadow-[0_2px_10px_-4px_rgb(99_102_241/0.2)]"
          >
            {focusAreas.map(({ label, description, icon: Icon }) => {
              const isOpen = open === label;
              const panelId = `focus-${label.replace(/\W+/g, '-').toLowerCase()}`;
              return (
                <m.li key={label} variants={fromRight}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onMouseEnter={() => setOpen(label)}
                    onFocus={() => setOpen(label)}
                    onClick={() => setOpen(isOpen ? null : label)}
                    className={`group flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors duration-200 ${
                      isOpen ? 'bg-surface-2' : ''
                    }`}
                  >
                    <m.span
                      animate={isOpen ? { rotate: -8, scale: 1.2 } : { rotate: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="grid shrink-0 place-items-center"
                    >
                      <Icon aria-hidden="true" className="size-5 text-accent-soft" />
                    </m.span>
                    <span
                      className={`flex-1 transition-transform duration-300 ${isOpen ? 'translate-x-1 text-accent-soft' : ''}`}
                    >
                      {label}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 shrink-0 text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden bg-surface-2"
                      >
                        <p className="px-5 pb-4 pl-14 text-sm leading-relaxed text-muted">{description}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.li>
              );
            })}
          </m.ul>
        </m.div>
      </div>
    </Section>
  );
}
