/**
 * SOL monogram: an "S" with a terminal cursor, on the accent square.
 * Mirrors public/favicon.svg so the tab icon and the in-page mark match.
 */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={`shrink-0 ${className}`}>
      <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
      <path
        transform="translate(-2 0)"
        fill="#fff"
        d="M20.5 10.2c-1-1-2.6-1.7-4.6-1.7-2.9 0-4.9 1.5-4.9 3.8 0 2.4 2 3.2 4.6 3.8 2.3.5 3.1 1 3.1 2 0 1.1-1.1 1.8-2.8 1.8-1.6 0-3-.6-4-1.6l-1.5 1.8c1.3 1.3 3.3 2 5.4 2 3.2 0 5.3-1.6 5.3-4.1 0-2.4-1.8-3.3-4.6-3.9-2.2-.5-3-.9-3-1.9 0-.9.9-1.6 2.4-1.6 1.3 0 2.4.5 3.2 1.3l1.4-1.7Z"
      />
      <rect x="21.5" y="20.6" width="5.5" height="2.6" rx="0.8" fill="#a9c4ff" />
    </svg>
  );
}
