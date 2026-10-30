import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { projects } from '../../data/projects';
import { DevHint } from '../ui/DevHint';
import { Section } from '../ui/Section';
import { ProjectCard } from './ProjectCard';

const ALL = 'All';
const INITIAL_COUNT = 6;
const ease = [0.4, 0, 0.2, 1] as const;

/**
 * Filters come from the data: technologies shared by at least two projects (but not by all,
 * which would filter nothing), most common first, skipping any that select the same projects as one already listed.
 */
function buildFilters(): string[] {
  const byTech = new Map<string, string[]>();
  for (const p of projects) for (const t of p.stack) byTech.set(t, [...(byTech.get(t) ?? []), p.slug]);
  const seen = new Set<string>();
  const filters: string[] = [];
  for (const [tech, slugs] of [...byTech].sort((a, b) => b[1].length - a[1].length)) {
    const key = slugs.join(',');
    if (slugs.length < 2 || slugs.length === projects.length || seen.has(key)) continue;
    seen.add(key);
    filters.push(tech);
    if (filters.length === 5) break;
  }
  return [ALL, ...filters];
}
const filters = buildFilters();

export function Projects({ index }: { index: string }) {
  const [active, setActive] = useState(ALL);
  const [showAll, setShowAll] = useState(false);

  const matching = active === ALL ? projects : projects.filter((p) => p.stack.includes(active));
  const visible = showAll ? matching : matching.slice(0, INITIAL_COUNT);

  return (
    <Section
      id="projects"
      index={index}
      eyebrow="Projects"
      title="Featured *work*"
      description="Real projects I designed and built end to end. Hover over a project, or tap it on a phone, to open the live site, the code or the full case study."
    >
      {filters.length > 1 && (
        <div role="group" aria-label="Filter projects by technology" className="mb-12 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActive(f);
                  setShowAll(false);
                }}
                className={`relative isolate h-10 cursor-pointer rounded-lg px-4 text-sm font-semibold transition-colors duration-300 ${
                  isActive ? 'text-white' : 'bg-surface text-muted hover:bg-accent/10 hover:text-accent-soft'
                }`}
              >
                {isActive && (
                  <m.span
                    layoutId="project-filter"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-lg bg-accent shadow-[0_6px_18px_-4px_rgb(99_102_241/0.5)]"
                  />
                )}
                {f}
              </button>
            );
          })}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        Showing {matching.length} {matching.length === 1 ? 'project' : 'projects'}
        {active === ALL ? '' : ` built with ${active}`}.
      </p>

      <m.ul layout className="flex flex-wrap justify-center gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => (
            <m.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, ease, delay: (i % 3) * 0.06 }}
              className="w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]"
            >
              <ProjectCard project={project} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      {matching.length > INITIAL_COUNT && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="group relative inline-flex h-10 w-44 cursor-pointer items-center"
          >
            {/* The square grows into a full-width bar on hover, carrying the arrow along. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-10 rounded-md bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full"
            />
            <ArrowRight
              aria-hidden="true"
              className="relative ml-3 size-4 text-white transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-2"
            />
            <span className="relative ml-6 text-sm font-semibold tracking-wider text-accent-soft uppercase transition-colors duration-500 group-hover:text-white">
              {showAll ? 'Show less' : 'Show more'}
            </span>
          </button>
        </div>
      )}

      {projects.length < 3 && (
        <div className="mt-8">
          <DevHint>Add more real projects in src/data/projects.ts — repository and live links appear automatically.</DevHint>
        </div>
      )}
    </Section>
  );
}
