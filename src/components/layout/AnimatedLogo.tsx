import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TYPE_MS = 140;
const HOLD_MS = 1100;
const ERASE_MS = 90;

/**
 * Types `full` one letter at a time, holds, then erases back to `short`
 * (which must be a prefix of `full`). Shows `short` at once for reduced motion.
 */
export function AnimatedLogo({ full, short }: { full: string; short: string }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? short.length : 0);
  const [erasing, setErasing] = useState(false);
  const done = (erasing || reduce) && count === short.length;

  useEffect(() => {
    if (done) return;
    let delay = erasing ? ERASE_MS : TYPE_MS;
    if (!erasing && count === full.length) delay = HOLD_MS;
    const id = window.setTimeout(() => {
      if (!erasing && count === full.length) setErasing(true);
      else setCount((c) => c + (erasing ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [count, erasing, done, full.length]);

  return (
    <span aria-hidden="true" className="inline-flex items-center">
      {full.slice(0, count)}
      <span className={`ml-0.5 h-4 w-[2px] bg-accent ${done ? 'opacity-0' : 'animate-blink'}`} />
    </span>
  );
}
