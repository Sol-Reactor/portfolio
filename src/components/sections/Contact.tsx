import { Check, Copy, Mail, MapPin } from 'lucide-react';
import { useEffect, useState, type ComponentType } from 'react';
import { profile } from '../../data/profile';
import { DevHint } from '../ui/DevHint';
import { Reveal } from '../ui/Reveal';
import { Section } from '../ui/Section';
import { socialLinks } from '../ui/SocialLinks';
import { ContactForm } from './ContactForm';

/** Copies the email address; hidden when the Clipboard API is unavailable (the mailto link still works). */
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  if (!navigator.clipboard) return null;

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(email).then(
          () => setCopied(true),
          () => setCopied(false),
        );
      }}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      title={copied ? 'Copied' : 'Copy'}
      className="relative z-10 -my-1 -mr-1.5 grid size-9 shrink-0 cursor-pointer place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {copied ? <Check aria-hidden="true" className="size-4 text-success" /> : <Copy aria-hidden="true" className="size-4" />}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

/** Compact contact card: icon plus the address itself; the whole card is the link. */
function ContactCard({
  Icon,
  text,
  href,
  label,
  copy,
}: {
  Icon: ComponentType<{ className?: string }>;
  text: string;
  href: string;
  label: string;
  copy?: string;
}) {
  const external = href.startsWith('http');
  return (
    <li className="group relative flex min-w-0 items-center gap-3 rounded-[10px] border border-line bg-surface px-4 py-3.5 shadow-sm transition duration-200 hover:border-accent-soft/40 hover:shadow-[0_4px_16px_-4px_rgb(99_102_241/0.25)]">
      <Icon className="size-5 shrink-0 text-accent-soft" />
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="min-w-0 truncate text-sm font-medium text-ink transition-colors group-hover:text-accent-soft after:absolute after:inset-0 after:rounded-[10px]"
      >
        <span className="sr-only">{label}: </span>
        {text}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
      {copy && <CopyEmailButton email={copy} />}
    </li>
  );
}

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export function Contact({ index }: { index: string }) {
  const others = socialLinks.filter((l) => l.label !== 'Email');
  const place = profile.location.split(',').slice(-2).join(',').trim();

  return (
    <Section
      id="contact"
      index={index}
      eyebrow="Contact"
      centered
      title="Let's build something *meaningful.*"
      description="I'm open to software engineering roles, internships, collaborations and well-scoped freelance projects. Reach out directly, or send a message below."
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <ul className="flex flex-wrap justify-center gap-3">
            {profile.email ? (
              <ContactCard Icon={Mail} label="Email" text={profile.email} href={`mailto:${profile.email}`} copy={profile.email} />
            ) : (
              <li>
                <DevHint>Set profile.email in src/data/profile.ts to show your address here.</DevHint>
              </li>
            )}
            {others.map(({ label, href, Icon }) => (
              <ContactCard key={label} Icon={Icon} label={label} text={display(href)} href={href} />
            ))}
          </ul>
          {place && (
            <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted">
              <MapPin aria-hidden="true" className="size-4 text-accent-soft" />
              Based in {place} · East Africa Time (UTC+3)
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
