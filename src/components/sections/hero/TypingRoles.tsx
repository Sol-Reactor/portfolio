import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TYPE_MS = 70;
const ERASE_MS = 35;
const HOLD_MS = 1700;
const GAP_MS = 300;

/**
 * Types each role, holds it, erases it and moves to the next, forever.
 * Screen readers get the full list once; reduced motion shows the first role, still.
 */
export function TypingRoles({ roles }: { roles: string[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    if (reduce || roles.length === 0) return;
    const word = roles[index]!;
    let delay: number;
    let next: () => void;
    if (!erasing && count < word.length) {
      delay = TYPE_MS;
      next = () => setCount((c) => c + 1);
    } else if (!erasing) {
      delay = HOLD_MS;
      next = () => setErasing(true);
    } else if (count > 0) {
      delay = ERASE_MS;
      next = () => setCount((c) => c - 1);
    } else {
      delay = GAP_MS;
      next = () => {
        setErasing(false);
        setIndex((i) => (i + 1) % roles.length);
      };
    }
    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [roles, index, count, erasing, reduce]);

  if (roles.length === 0) return null;
  const text = reduce ? roles[0] : roles[index]!.slice(0, count);

  return (
    <>
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true" className="inline-flex min-h-[1.5em] items-center">
        {text}
        <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-blink bg-accent-soft" />
      </span>
    </>
  );
}
