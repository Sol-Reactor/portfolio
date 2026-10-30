import { Download } from 'lucide-react';
import { profile } from '../../data/profile';

/**
 * "Download CV" button. Appears once profile.resumeUrl points at a PDF (e.g. "/cv.pdf" in /public).
 * Until then it shows only in development, dashed and inert, so production never has a dead link.
 */
export function ResumeButton({ className = '' }: { className?: string }) {
  const base = `inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-[0.95rem] font-medium ${className}`;

  if (!profile.resumeUrl) {
    if (!import.meta.env.DEV) return null;
    return (
      <span
        title="Development only: put your CV PDF in /public and set profile.resumeUrl to show this button"
        className={`${base} cursor-not-allowed border border-dashed border-amber-500/60 text-amber-600 dark:text-amber-300`}
      >
        <Download aria-hidden="true" className="size-4" />
        Download CV
      </span>
    );
  }

  return (
    <a
      href={profile.resumeUrl}
      download={`${profile.name}-CV.pdf`}
      className={`group ${base} text-ink transition-colors duration-200 hover:bg-surface-2 hover:text-accent-soft`}
    >
      <Download aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
      Download CV
      <span className="sr-only">(PDF)</span>
    </a>
  );
}
