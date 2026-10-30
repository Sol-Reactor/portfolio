import { m, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Briefcase, CalendarDays, GraduationCap, MapPin } from 'lucide-react';
import { useRef } from 'react';
import { education } from '../../data/education';
import { experience } from '../../data/experience';
import type { EducationEntry, ExperienceEntry } from '../../types';
import { Section } from '../ui/Section';
import { TagList } from '../ui/Tag';

const ease = [0.21, 0.6, 0.35, 1] as const;

function Entry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const current = entry.current === true;
  const dates = entry.start ? [entry.start, current ? 'Present' : entry.end].filter(Boolean) : [];
  return (
    <m.li
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease, delay: index * 0.05 }}
      className="relative pl-10 sm:pl-14"
    >
      {/* Node on the track; only a current position pulses. */}
      <span aria-hidden="true" className="absolute top-1.5 left-0 grid size-4 place-items-center">
        {current && <span className="absolute inset-0 rounded-full bg-accent-soft/40 motion-safe:animate-ping" />}
        <span
          className={`relative size-4 rounded-full border-[3px] border-bg ${current ? 'bg-accent-soft' : 'bg-line-strong'} ring-1 ring-line-strong`}
        />
      </span>

      <article className="group rounded-xl border border-transparent p-0 transition-colors duration-300 sm:-m-5 sm:p-5 sm:hover:border-line sm:hover:bg-surface/60">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-xs text-muted">
          {dates.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-accent-soft">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              {dates.join(' – ')}
            </span>
          )}
          {entry.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-3.5" />
              {entry.location}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Briefcase aria-hidden="true" className="size-3.5" />
            {entry.type}
          </span>
          {entry.badge && (
            <span className="rounded-full border border-line-strong px-2 py-0.5 text-[10px] tracking-widest text-ink/80 uppercase">
              {entry.badge}
            </span>
          )}
          {current && (
            <span className="rounded-full border border-accent-soft/30 bg-accent/10 px-2 py-0.5 text-[10px] tracking-widest text-accent-soft uppercase">
              Current
            </span>
          )}
        </div>

        <h3 className="mt-3 text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.25] font-bold tracking-[-0.025em]">{entry.role}</h3>
        <p className="mt-1 text-xs font-bold tracking-[0.09em] text-accent-soft uppercase">{entry.organization}</p>

        {entry.summary && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{entry.summary}</p>}

        {entry.highlights.length > 0 && (
          <ul className="mt-4 max-w-2xl space-y-2">
            {entry.highlights.map((h) => (
              <li key={h} className="relative pl-5 text-[0.855rem] leading-[1.65] text-ink/90">
                <span aria-hidden="true" className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent-soft/80" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {entry.stack && entry.stack.length > 0 && (
          <div className="mt-5">
            <TagList items={entry.stack} label="Technologies used" />
          </div>
        )}

        {entry.links && entry.links.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {entry.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent-soft underline-offset-4 hover:underline"
                >
                  {l.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </article>
    </m.li>
  );
}

function Timeline({ entries }: { entries: ExperienceEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  // The accent line fills in as the visitor scrolls through the timeline.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative max-w-3xl space-y-12">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7.5px] w-px bg-line" />
      <m.span
        aria-hidden="true"
        style={{ scaleY: fill }}
        className="absolute top-2 bottom-2 left-[7.5px] w-px origin-top bg-accent-soft"
      />
      {entries.map((e, i) => (
        <Entry key={`${e.organization}-${e.role}`} entry={e} index={i} />
      ))}
    </ol>
  );
}

/** Degree entries, drawn on the same kind of track as the work timeline. */
function EducationList({ entries }: { entries: EducationEntry[] }) {
  return (
    <ol className="relative max-w-3xl space-y-10">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7.5px] w-px bg-line" />
      {entries.map((e, i) => (
        <m.li
          key={`${e.institution}-${e.degree}`}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease, delay: i * 0.05 }}
          className="relative pl-10 sm:pl-14"
        >
          <span
            aria-hidden="true"
            className="absolute top-1.5 left-0 grid size-4 place-items-center rounded-full border-[3px] border-bg bg-accent-soft ring-1 ring-line-strong"
          />
          <article className="rounded-xl border border-transparent transition-colors duration-300 sm:-m-5 sm:p-5 sm:hover:border-line sm:hover:bg-surface/60">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
              {(e.start || e.end) && (
                <span className="inline-flex items-center gap-1.5 text-accent-soft">
                  <CalendarDays aria-hidden="true" className="size-3.5" />
                  {e.inProgress && e.end
                    ? `Expected graduation: ${e.end}`
                    : [e.start, e.end].filter(Boolean).join(' – ')}
                </span>
              )}
              {e.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {e.location}
                </span>
              )}
              {e.status && (
                <span className="rounded-full border border-accent-soft/30 bg-accent/10 px-2 py-0.5 text-[10px] tracking-widest text-accent-soft uppercase">
                  {e.status}
                </span>
              )}
            </div>
            <h4 className="mt-3 text-[clamp(1.05rem,2.2vw,1.3rem)] leading-[1.25] font-bold tracking-[-0.025em] text-heading">
              {e.degree}
            </h4>
            <p className="mt-1 text-xs font-bold tracking-[0.09em] text-accent-soft uppercase">{e.institution}</p>
            {e.highlights && e.highlights.length > 0 && (
              <ul className="mt-4 max-w-2xl space-y-2">
                {e.highlights.map((h) => (
                  <li key={h} className="relative pl-5 text-[0.855rem] leading-[1.65] text-ink/90">
                    <span aria-hidden="true" className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent-soft/80" />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </article>
        </m.li>
      ))}
    </ol>
  );
}

export function Experience({ index }: { index: string }) {
  return (
    <Section
      id="experience"
      index={index}
      eyebrow="Experience & Education"
      title="Where I've *worked* and studied"
      description="An internship on a platform in real use, software built for a real business, and the degree I'm completing."
    >
      <Timeline entries={experience} />

      {education.length > 0 && (
        <div className="mt-20">
          <h3 className="mb-10 flex items-center gap-2.5 text-sm font-medium tracking-[0.14em] text-accent-soft uppercase">
            <GraduationCap aria-hidden="true" className="size-5" />
            Education
          </h3>
          <EducationList entries={education} />
        </div>
      )}
    </Section>
  );
}
