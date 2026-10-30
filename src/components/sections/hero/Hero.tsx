import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { profile } from '../../../data/profile';
import { skillCategories } from '../../../data/skills';
import { ButtonLink } from '../../ui/ButtonLink';
import { Container } from '../../ui/Container';
import { ResumeButton } from '../../ui/ResumeButton';
import { SkillIcon } from '../../ui/SkillIcon';
import { SocialLinks } from '../../ui/SocialLinks';
import { HeroPhoto } from './HeroPhoto';
import { TypingRoles } from './TypingRoles';

const ease = [0.21, 0.6, 0.35, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const allSkills = skillCategories.flatMap((c) => c.skills);
const pick = (names: string[]) => names.map((n) => allSkills.find((s) => s.name === n)).filter((s) => s !== undefined);
const heroStack = pick(profile.heroStack);
const orbit = pick(profile.heroOrbit).slice(0, 4);

// Round badges beside the photo: varied sizes and offsets so the column feels composed, not gridded.
const orbitStyle = [
  'size-24 xl:size-28',
  'size-14 ml-8 xl:size-16',
  'size-28 xl:size-32',
  'size-18 ml-4 xl:size-20',
];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-24 lg:pt-24"
    >
      {/* Background: a faint grid fading from the top (light theme), plus one soft accent glow. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50 dark:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 -z-10 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
      />

      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)_auto] lg:gap-10 xl:gap-14">
        {/* Who I am, what I build, where to go next. */}
        <m.div initial="hidden" animate="show" transition={{ staggerChildren: 0.08 }} className="min-w-0">
          <m.p variants={rise} className="text-sm font-medium tracking-[0.14em] text-accent-soft uppercase">
            Hello, I'm
          </m.p>
          <m.h1
            id="hero-heading"
            variants={rise}
            className="mt-3 text-[clamp(3rem,7.5vw,5.75rem)] leading-[0.92] font-bold tracking-[-0.045em]"
          >
            {profile.name}
            <span className="text-accent-soft">.</span>
          </m.h1>
          <m.p variants={rise} className="mt-4 text-[clamp(1rem,2.2vw,1.3rem)] font-medium tracking-[0.01em] text-accent-soft">
            <TypingRoles roles={profile.roles} />
          </m.p>
          <m.p variants={rise} className="mt-5 max-w-[46ch] text-base leading-[1.72] text-muted text-pretty">
            {profile.intro}
          </m.p>

          <m.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#projects" className="hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgb(99_102_241/0.7)]">
              Explore My Work
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink
              href="#contact"
              variant="secondary"
              className="border-accent-soft/50 text-accent-soft hover:-translate-y-0.5 hover:border-accent-soft hover:bg-accent/10"
            >
              Contact Me
            </ButtonLink>
            <ResumeButton />
          </m.div>

          <m.div variants={rise} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {heroStack.length > 0 && (
              <ul aria-label="Core stack" className="flex items-center gap-2.5">
                {heroStack.map((s) => (
                  <li
                    key={s.name}
                    title={s.name}
                    className="grid size-11 place-items-center rounded-xl border border-line bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
                  >
                    <SkillIcon icon={s.icon} color={s.color} className="size-6" />
                    <span className="sr-only">{s.name}</span>
                  </li>
                ))}
              </ul>
            )}
            {/* The left side rail carries these on wide screens. */}
            <span aria-hidden="true" className="hidden h-6 w-px bg-line sm:block xl:hidden" />
            <SocialLinks className="-ml-2.5 sm:ml-0 xl:hidden" />
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="min-w-0 lg:self-end"
        >
          <HeroPhoto />
        </m.div>

        {orbit.length > 0 && (
          <m.ul
            aria-label="More tools I use"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } }}
            className="hidden h-full flex-col justify-evenly gap-4 lg:flex"
          >
            {orbit.map((s, i) => (
              <m.li
                key={s.name}
                variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } } }}
                title={s.name}
                className={orbitStyle[i]}
              >
                <span
                  className="grid size-full animate-float place-items-center rounded-full border border-line bg-surface shadow-[0_8px_24px_-12px_rgb(0_0_0/0.5)]"
                  style={{ animationDelay: `${i * -1.4}s` }}
                >
                  <SkillIcon icon={s.icon} color={s.color} className="size-[45%]" />
                  <span className="sr-only">{s.name}</span>
                </span>
              </m.li>
            ))}
          </m.ul>
        )}
      </Container>

      {/* Scroll cue: a mouse outline with a moving wheel. */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <span className="relative block h-10 w-6.5 rounded-full border-2 border-accent-soft/50 transition-colors group-hover:border-accent-soft">
          <span className="absolute top-2 left-1/2 h-2 w-1 -translate-x-1/2 animate-scroll-wheel rounded-full bg-accent-soft" />
        </span>
      </a>
    </section>
  );
}
