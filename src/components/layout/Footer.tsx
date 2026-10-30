import { ArrowUp } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { profile } from '../../data/profile';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/LogoMark';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/40">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <a href="#home" className="inline-flex items-center gap-2.5 font-mono text-sm font-semibold tracking-[0.2em] text-ink">
            <LogoMark className="size-8" />
            {profile.brand}
            <span className="sr-only">, back to top</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {profile.name}, {profile.title.toLowerCase()} building practical, reliable web applications.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 font-sans text-[11px] tracking-widest text-muted uppercase">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
            {navItems
              .filter((i) => i.id !== 'home')
              .map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-9 items-center text-sm text-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <SocialLinks className="-ml-2.5 md:-mr-2.5 md:ml-0" />
          <a
            href="#home"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-line px-4 text-sm text-muted transition-colors duration-200 hover:border-line-strong hover:text-ink"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            Back to top
          </a>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-1 py-5 font-sans text-[11px] tracking-widest text-muted uppercase sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>Built with React, TypeScript & Tailwind CSS</p>
        </Container>
      </div>
    </footer>
  );
}
