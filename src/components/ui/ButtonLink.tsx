import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'border border-line-strong text-ink hover:border-muted hover:bg-surface-2',
};

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: 'md' | 'sm';
  children: ReactNode;
}

/** Link styled as a button. External URLs open in a new tab automatically. */
export function ButtonLink({ variant = 'primary', size = 'md', className = '', href = '', children, ...rest }: ButtonLinkProps) {
  const external = /^https?:\/\//.test(href);
  const sizing = size === 'sm' ? 'h-10 px-4 text-sm' : 'h-12 px-6 text-[0.95rem]';
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ${sizing} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
