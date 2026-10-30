import { AnimatePresence, m } from 'framer-motion';
import { AlertCircle, ArrowUp, Send } from 'lucide-react';
import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { profile } from '../../data/profile';
import { emptyContact as empty, validateContactField as validate, type ContactField as Field, type ContactValues as Values } from './contactValidation';

/**
 * Optional form backend. Set VITE_CONTACT_ENDPOINT (e.g. a Formspree form URL) in .env.local
 * to deliver messages directly. It is a public form URL, not a secret. Without it, the form
 * hands the message to the visitor's email app instead and says so.
 */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'handoff' | 'error';

const fields: {
  name: Field;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  multiline?: boolean;
}[] = [
  { name: 'name', label: 'Name', placeholder: 'Your name', autoComplete: 'name' },
  { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', placeholder: 'What is it about?', optional: true },
  { name: 'message', label: 'Message', multiline: true },
];

/** Animated check drawn on success. */
function SuccessMark() {
  return (
    <svg viewBox="0 0 52 52" aria-hidden="true" className="size-18 text-accent-soft">
      <m.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <m.path
        d="M15 27l7 7 15-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      />
    </svg>
  );
}

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Once a field has shown an error, re-check it as the visitor fixes it.
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = Object.fromEntries(fields.map((f) => [f.name, validate(f.name, values[f.name])])) as Record<Field, string>;
    setErrors(found);
    const firstInvalid = fields.find((f) => found[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }
    // Honeypot: real visitors never see or fill this field.
    if (new FormData(e.currentTarget).get('company')) return;

    const subject = values.subject.trim() || `Portfolio message from ${values.name.trim()}`;

    if (!endpoint) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('handoff');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, subject, _replyto: values.email }),
      });
      setStatus(res.ok ? 'sent' : 'error');
      if (res.ok) setValues(empty);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: Field) =>
    `w-full rounded-[10px] border-[1.5px] bg-surface px-4 py-3.5 text-base text-ink shadow-sm transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-muted/70 focus:ring-[3px] ${
      errors[field] ? 'border-danger focus:ring-danger/20' : 'border-line hover:border-line-strong focus:border-accent-soft focus:ring-accent/20'
    }`;

  if (status === 'sent' || status === 'handoff') {
    const sent = status === 'sent';
    return (
      <m.div
        role="status"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center"
      >
        <SuccessMark />
        <h3 className="text-2xl font-bold">{sent ? 'Message sent' : 'Your email app should now be open'}</h3>
        <p className="max-w-sm leading-relaxed text-muted">
          {sent ? (
            <>Thank you for reaching out. I read every message and will reply to the address you gave.</>
          ) : (
            <>
              Your message is ready to send there. If nothing opened, email me directly at{' '}
              <a href={`mailto:${profile.email}`} className="text-accent-soft underline underline-offset-4">
                {profile.email}
              </a>
              .
            </>
          )}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="inline-flex h-11 cursor-pointer items-center rounded-lg border border-line-strong px-4 text-sm font-medium transition-colors hover:bg-surface-2"
          >
            {sent ? 'Send another message' : 'Back to the form'}
          </button>
          <a
            href="#home"
            className="inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowUp aria-hidden="true" className="size-4" />
            Back to top
          </a>
        </div>
      </m.div>
    );
  }

  const sending = status === 'sending';

  return (
    <form ref={formRef} noValidate onSubmit={(e) => void onSubmit(e)} aria-busy={sending} className="space-y-5">
      {fields.map((f) => (
        <FieldShell key={f.name} id={`${id}-${f.name}`} label={f.label} optional={f.optional} error={errors[f.name]}>
          {f.multiline ? (
            <textarea
              id={`${id}-${f.name}`}
              name={f.name}
              required
              placeholder="Tell me about your project, role or idea"
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              onBlur={(e) => setErrors((er) => ({ ...er, [f.name]: validate(f.name, e.target.value) }))}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? `${id}-${f.name}-error` : undefined}
              className={`${inputClass(f.name)} h-40 max-h-72 min-h-30 resize-y leading-relaxed`}
            />
          ) : (
            <input
              id={`${id}-${f.name}`}
              name={f.name}
              type={f.type ?? 'text'}
              autoComplete={f.autoComplete}
              required={!f.optional}
              placeholder={f.placeholder}
              value={values[f.name]}
              onChange={(e) => set(f.name, e.target.value)}
              onBlur={(e) => setErrors((er) => ({ ...er, [f.name]: validate(f.name, e.target.value) }))}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? `${id}-${f.name}-error` : undefined}
              className={inputClass(f.name)}
            />
          )}
        </FieldShell>
      ))}

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <AnimatePresence>
        {status === 'error' && (
          <m.p
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>
              Your message couldn't be sent. Please try again, or email me directly at{' '}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                {profile.email}
              </a>
              .
            </span>
          </m.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex h-12 min-w-48 cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-accent px-8 text-[0.95rem] font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_8px_22px_-6px_rgb(99_102_241/0.55)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-65 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {sending ? (
            <>
              Sending
              <span aria-hidden="true" className="inline-flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-1 rounded-full bg-current motion-safe:animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </>
          ) : (
            <>
              {endpoint ? 'Send message' : 'Send via email app'}
              <Send aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-muted">
          {endpoint ? 'Messages go straight to my inbox.' : 'Opens your email app with the message ready to send.'}
        </p>
      </div>
    </form>
  );
}

function FieldShell({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-danger">
          <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
