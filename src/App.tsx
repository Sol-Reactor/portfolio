import { domMax, LazyMotion, MotionConfig } from 'framer-motion';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { SideRails } from './components/layout/SideRails';
import { About } from './components/sections/About';
import { Approach } from './components/sections/Approach';
import { Contact } from './components/sections/Contact';
import { Experience } from './components/sections/Experience';
import { Hero } from './components/sections/hero/Hero';
import { Projects } from './components/sections/Projects';
import { Skills } from './components/sections/Skills';
import { showExperience } from './data/navigation';

/**
 * Section order: who I am, then proof (projects), then capabilities and history, then contact.
 * Numbering is derived, so hiding a section never leaves a gap. Keep data/navigation.ts in the same order.
 */
const sections = [
  { id: 'about', Component: About },
  { id: 'projects', Component: Projects },
  { id: 'skills', Component: Skills },
  ...(showExperience ? [{ id: 'experience', Component: Experience }] : []),
  { id: 'approach', Component: Approach },
  { id: 'contact', Component: Contact },
];

export function App() {
  return (
    // LazyMotion + `m` components. domMax adds layout animations (sliding nav and filter pills, grid reflow).
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        <SideRails />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          {sections.map(({ id, Component }, i) => (
            <Component key={id} index={String(i + 1).padStart(2, '0')} />
          ))}
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
