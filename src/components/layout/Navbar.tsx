import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrolled } from '../../hooks/useScrolled';
import { ButtonLink } from '../ui/ButtonLink';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/LogoMark';
import { ResumeButton } from '../ui/ResumeButton';
import { SocialLinks } from '../ui/SocialLinks';
import { ThemeToggle } from '../ui/ThemeToggle';
import { AnimatedLogo } from './AnimatedLogo';

const sectionIds = navItems.map((i) => i.id);
const ease = [0.21, 0.6, 0.35, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const toggle = useRef<HTMLButtonElement>(null);

  // Stable callbacks: the drawer's effect depends on them and must not re-run (and refocus) on every render.
  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus();
  }, []);
  const dismiss = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          scrolled ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.2em] text-ink">
            <LogoMark className="size-8" />
            <AnimatedLogo full={profile.name.toUpperCase()} short={profile.brand} />
            <span className="sr-only">{profile.brand}, back to top</span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative z-10 block rounded-lg px-3.5 py-2 text-sm transition-colors duration-200 ${
                        isActive ? 'text-ink' : 'text-muted hover:text-ink'
                      }`}
                    >
                      {item.label}
                    </a>
                    {/* One shared pill slides between links as the active section changes. */}
                    {isActive && (
                      <m.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-surface-2 ring-1 ring-line"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <ButtonLink href="#contact" size="sm" className="hidden sm:inline-flex">
              Let's Talk
            </ButtonLink>
            <button
              ref={toggle}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="inline-grid size-11 cursor-pointer place-items-center rounded-lg text-ink transition-colors hover:bg-surface-2 lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer open={open} active={active} onClose={close} onNavigate={dismiss} />
    </>
  );
}

/** Right-side drawer for small screens: links, contact shortcut and socials. */
function MobileDrawer({
  open,
  active,
  onClose,
  onNavigate,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  // While open: focus the panel, keep Tab inside it, close on Escape or when the screen grows, and stop page scroll.
  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    el?.querySelector<HTMLElement>('button, a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !el) return;
      const focusable = el.querySelectorAll<HTMLElement>('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onResize = () => mq.matches && onNavigate();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onResize);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onResize);
    };
  }, [open, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            key="overlay"
            aria-hidden="true"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] lg:hidden"
          />
          <m.div
            key="panel"
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-line bg-surface px-5 pt-4 pb-6 shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.2em] text-ink">
                <LogoMark className="size-7" />
                {profile.brand}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-grid size-11 cursor-pointer place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav aria-label="Primary" className="mt-6">
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => {
                  const isActive = active === item.id;
                  return (
                    <m.li
                      key={item.id}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease, delay: 0.08 + i * 0.04 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={onNavigate}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex h-12 items-center gap-3 rounded-lg px-3 text-base transition-colors ${
                          isActive ? 'bg-surface-2 text-ink' : 'text-muted hover:bg-surface-2 hover:text-ink'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-4 w-0.5 rounded-full transition-colors ${isActive ? 'bg-accent-soft' : 'bg-transparent'}`}
                        />
                        {item.label}
                      </a>
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto space-y-4 border-t border-line pt-5">
              <ButtonLink href="#contact" onClick={onNavigate} className="w-full">
                Let's Talk
              </ButtonLink>
              <ResumeButton className="w-full border border-line" />
              <SocialLinks className="-ml-2.5" />
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
