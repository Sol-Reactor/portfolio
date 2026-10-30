import { ArrowUpRight, CheckCircle2, Eye, X } from 'lucide-react';
import { useRef, useState, type ReactNode, type RefObject } from 'react';
import type { Project } from '../../types';
import { TagList } from '../ui/Tag';
import { GitHubIcon } from '../ui/SocialLinks';

function ProjectVisual({ project }: { project: Project }) {
  const zoom = 'transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.07]';
  if (project.image) {
    return (
      <img
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-top ${zoom}`}
      />
    );
  }
  // No screenshot yet: a typographic panel instead of a stock image.
  return (
    <div aria-hidden="true" className={`relative grid h-full w-full place-items-center bg-surface-2 ${zoom}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      <span className="relative font-sans text-sm tracking-widest text-muted uppercase">{project.slug}</span>
    </div>
  );
}

/** Full write-up, opened from the card's Details button. Native <dialog> handles Escape and focus. */
function ProjectDetails({ project, dialogRef }: { project: Project; dialogRef: RefObject<HTMLDialogElement | null> }) {
  const { repo, live } = project.links;
  const close = () => dialogRef.current?.close();
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${project.slug}-title`}
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto max-h-[90svh] w-[min(42rem,calc(100%-2rem))] overflow-y-auto rounded-2xl border border-line bg-bg p-0 text-ink shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[11px] tracking-[0.16em] text-accent-soft uppercase">{project.category}</p>
            <h3 id={`${project.slug}-title`} className="mt-1.5 text-2xl font-bold sm:text-3xl">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close details"
            className="inline-grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="font-sans text-xs tracking-widest text-accent-soft uppercase">Problem</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-sans text-xs tracking-widest text-accent-soft uppercase">My contribution</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{project.contribution}</dd>
          </div>
        </dl>

        <h4 className="mt-6 font-sans text-xs tracking-widest text-accent-soft uppercase">Key engineering decisions</h4>
        <ul className="mt-3 space-y-2.5">
          {project.decisions.map((d) => (
            <li key={d} className="flex gap-3 text-sm leading-relaxed text-ink/90">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-soft" />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <TagList items={project.stack} label="Technologies used" />
        </div>

        {(repo || live) && (
          <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-line-strong px-4 text-sm font-medium transition-colors duration-200 hover:bg-surface-2"
              >
                <GitHubIcon className="size-4" />
                Source code
                <span className="sr-only">for {project.name} (opens in a new tab)</span>
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Live demo
                <ArrowUpRight aria-hidden="true" className="size-4" />
                <span className="sr-only">of {project.name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}

/** Round icon action shown on the image overlay. */
function OverlayAction({
  label,
  title,
  revealed,
  children,
  ...target
}: { label: string; title: string; revealed: boolean; children: ReactNode } & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
)) {
  const className = `grid size-12 cursor-pointer place-items-center rounded-full bg-black/55 text-white transition duration-300 hover:bg-accent group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 ${
    revealed ? 'pointer-events-auto translate-y-0 scale-100' : 'pointer-events-none translate-y-3 scale-75'
  }`;
  return target.href ? (
    <a href={target.href} target="_blank" rel="noopener noreferrer" aria-label={label} title={title} className={className}>
      {children}
    </a>
  ) : (
    <button type="button" onClick={target.onClick} aria-label={label} title={title} className={className}>
      {children}
    </button>
  );
}

/**
 * Card: framed image, overlapping category tag, centred name and one-line summary.
 * Hover (or keyboard focus) lifts the card and reveals round actions over the image;
 * on touch screens the first tap on the image reveals them.
 */
export function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [touched, setTouched] = useState(false);
  const { live, repo } = project.links;

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border-2 border-transparent bg-surface p-3 shadow-[0_4px_10px_-2px_rgb(0_0_0/0.18)] transition-[transform,border-color,box-shadow] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] focus-within:border-accent-soft/60 hover:-translate-y-2 hover:border-accent-soft/60 hover:shadow-[0_22px_30px_-10px_rgb(0_0_0/0.35),0_0_24px_rgb(99_102_241/0.2)]">
      <div className="relative h-56 overflow-hidden rounded-xl sm:h-60">
        <ProjectVisual project={project} />

        <div
          onClick={(e) => e.target === e.currentTarget && setTouched((t) => !t)}
          className={`absolute inset-0 flex items-center justify-center gap-4 bg-[#263b69]/55 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 ${
            touched ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <OverlayAction
            label={`Details about ${project.name}`}
            title="Details"
            revealed={touched}
            onClick={() => dialogRef.current?.showModal()}
          >
            <Eye aria-hidden="true" className="size-5" />
          </OverlayAction>
          {live && (
            <OverlayAction label={`Live site of ${project.name} (opens in a new tab)`} title="Live site" revealed={touched} href={live}>
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </OverlayAction>
          )}
          {repo && (
            <OverlayAction label={`Source code of ${project.name} (opens in a new tab)`} title="Source code" revealed={touched} href={repo}>
              <GitHubIcon className="size-5" />
            </OverlayAction>
          )}
        </div>
      </div>

      <div className="relative px-2 pt-7 pb-2 text-center">
        <p className="absolute -top-4 left-1/2 w-3/5 -translate-x-1/2 truncate rounded-md border border-line bg-surface-2 px-3 py-1.5 font-sans text-[11px] tracking-wider text-muted uppercase">
          {project.category}
        </p>
        <h3 className="truncate text-lg font-bold text-accent-soft">{project.name}</h3>
        <p className="mt-1 truncate text-sm text-muted">{project.summary}</p>
      </div>

      <ProjectDetails project={project} dialogRef={dialogRef} />
    </article>
  );
}
