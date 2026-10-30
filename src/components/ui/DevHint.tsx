import type { ReactNode } from 'react';

/**
 * Shown only during `npm run dev` to point at content that still needs
 * filling in. Compiled out of production builds.
 */
export function DevHint({ children }: { children: ReactNode }) {
  if (!import.meta.env.DEV) return null;
  return (
    <p className="rounded-lg border border-dashed border-amber-600/50 bg-amber-100/60 px-4 py-3 font-mono text-xs leading-relaxed text-amber-900 dark:border-amber-400/50 dark:bg-amber-400/5 dark:text-amber-200">
      <span className="font-semibold">DEV · </span>
      {children}
    </p>
  );
}
