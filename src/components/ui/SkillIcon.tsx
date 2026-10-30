import type { Skill } from '../../types';

// Brand logos from Simple Icons v13.21.0, saved in /public/icons (add a slug's SVG there for a new skill).
// Used as a mask so the colour comes from CSS: the brand colour when known, otherwise the text colour
// (keeps black logos visible in dark mode).
const iconUrl = (slug: string) => `/icons/${slug}.svg`;

export function SkillIcon({ icon: Icon, color, className = 'size-4' }: Pick<Skill, 'icon' | 'color'> & { className?: string }) {
  if (typeof Icon !== 'string') {
    return <Icon aria-hidden="true" className={`shrink-0 ${className}`} style={{ color }} />;
  }
  const mask = `url(${iconUrl(Icon)}) center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`shrink-0 ${className}`}
      style={{ backgroundColor: color ?? 'currentColor', mask, WebkitMask: mask }}
    />
  );
}
