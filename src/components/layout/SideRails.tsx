import { m } from 'framer-motion';
import { navItems } from '../../data/navigation';
import { useActiveSection } from '../../hooks/useActiveSection';
import { socialLinks } from '../ui/SocialLinks';

const sectionIds = navItems.map((i) => i.id);

/**
 * Wide-screen side panels: social links on the left, a section indicator on the right.
 * Both repeat the navbar and social links, so they are mouse shortcuts only: hidden from
 * screen readers and the Tab order, which keep the single primary navigation.
 */
export function SideRails() {
  const active = useActiveSection(sectionIds);

  return (
    <div aria-hidden="true" className="hidden xl:block">
      <m.ul
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed bottom-0 left-6 z-30 flex flex-col items-center gap-2"
      >
        {socialLinks.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              tabIndex={-1}
              title={label}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white"
            >
              <Icon className="size-4" />
            </a>
          </li>
        ))}
        <li className="mt-2 h-24 w-px bg-line-strong" />
      </m.ul>

      <m.ul
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="fixed top-1/2 right-6 z-30 flex -translate-y-1/2 flex-col items-center gap-3"
      >
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="group relative flex items-center">
              <a href={`#${item.id}`} tabIndex={-1} className="grid size-5 place-items-center">
                <span
                  className={`block w-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'h-6 bg-accent-soft' : 'h-1.5 bg-line-strong group-hover:bg-muted'
                  }`}
                />
              </a>
              {/* Label slides out on hover, to the left so it never sits off-screen. */}
              <span className="pointer-events-none absolute right-7 rounded-md border border-line bg-surface px-2.5 py-1 font-sans text-[11px] whitespace-nowrap text-ink opacity-0 shadow-sm transition duration-200 group-hover:-translate-x-1 group-hover:opacity-100">
                {item.label}
              </span>
            </li>
          );
        })}
      </m.ul>
    </div>
  );
}
