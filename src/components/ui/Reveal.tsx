import { m } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Fades content up once as it enters the viewport. Motion is skipped
 * automatically for reduced-motion users via <MotionConfig reducedMotion="user">.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1], delay }}
    >
      {children}
    </m.div>
  );
}
