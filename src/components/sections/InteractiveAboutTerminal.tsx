import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Pause, Play, RotateCcw, SkipForward, SquareTerminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { aboutTerminal as convo } from '../../data/aboutTerminal';
import { ButtonLink } from '../ui/ButtonLink';

type StepKind = 'command' | 'question' | 'answer';
interface Step {
  kind: StepKind;
  text: string;
  /** ms per character */
  speed: number;
  /** ms to wait after the line finishes */
  pauseAfter: number;
}

// The whole conversation as one flat timeline. Step 0 is the command typed above the panel.
const steps: Step[] = [
  { kind: 'command', text: convo.command, speed: 75, pauseAfter: 550 },
  ...convo.entries.flatMap((e): Step[] => [
    { kind: 'question', text: e.question, speed: e.typingSpeed?.question ?? 38, pauseAfter: 380 },
    { kind: 'answer', text: e.answer, speed: e.typingSpeed?.answer ?? 14, pauseAfter: 750 },
  ]),
];

const START = { step: 0, chars: 0 };
const END = { step: steps.length, chars: 0 };

const ease = [0.21, 0.6, 0.35, 1] as const;
const appear = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease },
};

/** Thin block cursor; blinks with the theme's step animation (no fading or glow). */
function Cursor() {
  return <span aria-hidden="true" className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-blink bg-[#a5b4fc]" />;
}

const controlBtn =
  'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 text-xs text-[#a8a8a8] transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-[#a5b4fc]';

/**
 * About-me told as a VS Code-style terminal conversation. Purely visual storytelling:
 * nothing is executed. Starts the first time it scrolls into view, never restarts on its own.
 */
export function InteractiveAboutTerminal() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);
  const inView = useInView(rootRef, { once: true, amount: 0.35 });

  const [pos, setPos] = useState(START);
  const [paused, setPaused] = useState(false);

  // Reduced motion: show the finished conversation without typing.
  const view = reduce ? END : pos;
  const done = view.step >= steps.length;
  const running = inView && !paused && !done;

  // One timer at a time drives the timeline: type the next character, or wait, then move on.
  useEffect(() => {
    if (!running) return;
    const step = steps[pos.step]!;
    const typing = pos.chars < step.text.length;
    const id = window.setTimeout(
      () => setPos((p) => (typing ? { step: p.step, chars: p.chars + 1 } : { step: p.step + 1, chars: 0 })),
      typing ? step.speed : step.pauseAfter,
    );
    return () => window.clearTimeout(id);
  }, [running, pos]);

  // Follow new text inside the terminal only (never the page), unless the visitor scrolled up to reread.
  useEffect(() => {
    const body = bodyRef.current;
    if (body && stickToBottom.current) body.scrollTop = body.scrollHeight;
  }, [view.step, view.chars]);

  const onBodyScroll = () => {
    const b = bodyRef.current;
    if (b) stickToBottom.current = b.scrollHeight - b.scrollTop - b.clientHeight < 40;
  };

  const skip = () => {
    setPaused(false);
    setPos(END);
  };
  const replay = () => {
    stickToBottom.current = true;
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
    setPaused(false);
    setPos(START);
  };

  /** Text of step i as currently visible: full if finished, partial if typing, empty if not reached. */
  const textOf = (i: number) => {
    if (i < view.step) return steps[i]!.text;
    if (i === view.step) return steps[i]!.text.slice(0, view.chars);
    return '';
  };
  const showPanel = view.step >= 1;
  // The cursor sits on the most recent line while waiting between lines.
  const cursorAt = done ? -1 : view.chars === 0 && view.step > 0 ? view.step - 1 : view.step;

  return (
    <div ref={rootRef} className="min-w-0">
      {/* Accessible transcript: the animated version below is hidden from screen readers. */}
      <div className="sr-only">
        <p>
          {convo.prompt} {convo.command}
        </p>
        <dl>
          {convo.entries.map((e) => (
            <div key={e.question}>
              <dt>{e.question}</dt>
              <dd>{e.answer}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p aria-hidden="true" className="mb-4 font-mono text-sm text-muted">
        <span className="text-accent-soft">{convo.prompt}</span> <span className="text-ink">{textOf(0)}</span>
        {cursorAt === 0 && <Cursor />}
      </p>

      <AnimatePresence>
        {showPanel && (
          <m.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden rounded-xl border border-[#232640] bg-[#11131f] font-mono shadow-[0_18px_40px_-20px_rgb(0_0_0/0.55)]"
          >
            {/* Header: window dots, label and controls. */}
            <div className="flex items-center gap-3 border-b border-[#232640] bg-[#161929] px-3 py-1.5 sm:px-4">
              <div aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="size-2.5 rounded-full bg-[#28c840]/80" />
              </div>
              <p className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-xs text-[#a8a8a8]">
                <SquareTerminal aria-hidden="true" className="size-3.5 shrink-0 text-[#a5b4fc]" />
                <span className="truncate">{convo.title}</span>
              </p>
              <div className="flex shrink-0 items-center gap-0.5">
                {done ? (
                  !reduce && (
                    <button type="button" onClick={replay} className={controlBtn}>
                      <RotateCcw aria-hidden="true" className="size-3.5" />
                      <span>Replay</span>
                      <span className="sr-only">conversation</span>
                    </button>
                  )
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setPaused((p) => !p)}
                      aria-label={paused ? 'Resume animation' : 'Pause animation'}
                      title={paused ? 'Resume' : 'Pause'}
                      className={controlBtn}
                    >
                      {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
                    </button>
                    <button type="button" onClick={skip} className={controlBtn}>
                      <SkipForward aria-hidden="true" className="size-3.5" />
                      <span className="hidden sm:inline">Skip animation</span>
                      <span className="sm:hidden">Skip</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Conversation */}
            <div
              ref={bodyRef}
              onScroll={onBodyScroll}
              aria-hidden="true"
              className="h-[24rem] space-y-4 overflow-y-auto px-4 py-5 text-[13px] leading-relaxed sm:h-[26rem] sm:px-5 sm:text-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#3a3a3a]"
            >
              {steps.map((step, i) => {
                if (i === 0 || i > view.step || (i === view.step && view.chars === 0 && !done)) return null;
                const text = textOf(i);
                return step.kind === 'question' ? (
                  <m.p key={i} {...appear} className="break-words text-[#f0f0f0]">
                    <span className="mr-2 text-[#a5b4fc]">{convo.asker}:</span>
                    {text}
                    {cursorAt === i && <Cursor />}
                  </m.p>
                ) : (
                  <m.p key={i} {...appear} className="border-l-2 border-[#a5b4fc]/40 pl-3 break-words text-[#c8c8c8]">
                    <span className="mr-2 font-semibold text-[#f0f0f0]">{convo.answerer}:</span>
                    {text}
                    {cursorAt === i && <Cursor />}
                  </m.p>
                );
              })}

              {done && (
                <m.div {...appear} transition={{ duration: 0.4, ease, delay: reduce ? 0 : 0.1 }} className="space-y-2 pt-1">
                  <p className="text-[#f0f0f0]">
                    <span className="text-[#6cc785]">{convo.finalPrompt}</span>
                    <Cursor />
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-[#8fd19e]">
                    <CheckCircle2 aria-hidden="true" className="size-3.5" />
                    {convo.completion}
                  </p>
                </m.div>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Navigation: appears once the session completes; hidden (not just transparent) before, so it can't be tabbed to. */}
      <m.div
        initial={false}
        animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, ease }}
        className={`mt-6 flex flex-wrap gap-3 ${done ? '' : 'invisible'}`}
      >
        <ButtonLink href="#projects">
          Explore My Projects
          <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </ButtonLink>
        <ButtonLink href="#contact" variant="secondary">
          Contact Me
        </ButtonLink>
      </m.div>
    </div>
  );
}
