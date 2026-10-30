import { m } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import type { Skill, SkillCategory } from '../../types';
import { Section } from '../ui/Section';
import { SkillIcon } from '../ui/SkillIcon';

const ease = [0.21, 0.6, 0.35, 1] as const;

// Each piece receives its own start time through `custom`, so the tree draws in order:
// root, trunk, branch bar, then each branch and its node.
const pop = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (delay: number) => ({ opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 18, delay } }),
};
const growX = {
  hidden: { scaleX: 0 },
  show: (delay: number) => ({ scaleX: 1, transition: { duration: 0.45, ease, delay } }),
};
const growY = {
  hidden: { scaleY: 0 },
  show: (delay: number) => ({ scaleY: 1, transition: { duration: 0.35, ease, delay } }),
};

const line = 'bg-accent-soft/50';

function RootNode({ title, description, icon: Icon }: Pick<SkillCategory, 'title' | 'description' | 'icon'>) {
  return (
    <m.div
      variants={pop}
      custom={0}
      className="relative z-10 max-w-sm rounded-2xl bg-accent px-5 py-4 text-white shadow-[0_10px_24px_-10px_rgb(99_102_241/0.6)] lg:text-center"
    >
      <h3 className="inline-flex items-center gap-2.5 font-display text-xl font-bold text-white">
        <Icon aria-hidden="true" className="size-5" />
        {title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-white/85">{description}</p>
    </m.div>
  );
}

function SkillNode({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <m.span
      variants={pop}
      custom={delay}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative z-10 inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-sans text-[13px] whitespace-nowrap text-ink shadow-[0_2px_8px_-2px_rgb(99_102_241/0.18)] transition-[color,border-color,box-shadow] duration-200 hover:border-accent/50 hover:text-accent-soft hover:shadow-[0_10px_24px_-8px_rgb(99_102_241/0.45)]"
    >
      <SkillIcon icon={skill.icon} color={skill.color} />
      {skill.name}
    </m.span>
  );
}

function SkillTree({ title, description, icon, skills }: SkillCategory) {
  const n = skills.length;
  const nodeDelay = (i: number) => 0.75 + i * 0.09;

  return (
    <m.article initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
      {/* Wide screens: a top-down tree with every skill on one row. */}
      <div className="hidden flex-col items-center lg:flex">
        <RootNode title={title} description={description} icon={icon} />
        <m.span aria-hidden="true" variants={growY} custom={0.3} className={`h-8 w-px origin-top ${line}`} />
        <div className="relative w-full">
          {/* The bar runs from the centre of the first column to the centre of the last. */}
          <m.span
            aria-hidden="true"
            variants={growX}
            custom={0.45}
            className={`absolute top-0 h-px ${line}`}
            style={{ left: `${50 / n}%`, right: `${50 / n}%` }}
          />
          <ul aria-label={`${title} skills`} className="flex">
            {skills.map((skill, i) => (
              <li key={skill.name} className="flex flex-1 flex-col items-center">
                <m.span aria-hidden="true" variants={growY} custom={nodeDelay(i) - 0.1} className={`h-8 w-px origin-top ${line}`} />
                <SkillNode skill={skill} delay={nodeDelay(i)} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Phones and tablets: the same tree turned sideways, branching down the left edge. */}
      <div className="lg:hidden">
        <RootNode title={title} description={description} icon={icon} />
        <ul aria-label={`${title} skills`} className="relative ml-7 pt-2">
          <m.span
            aria-hidden="true"
            variants={growY}
            custom={0.3}
            className={`absolute top-0 bottom-[1.4rem] left-0 w-px origin-top ${line}`}
          />
          {skills.map((skill, i) => (
            <li key={skill.name} className="relative flex items-center py-1.5 pl-8">
              <m.span
                aria-hidden="true"
                variants={growX}
                custom={0.4 + i * 0.07}
                className={`absolute top-1/2 left-0 h-px w-7 origin-left ${line}`}
              />
              <SkillNode skill={skill} delay={0.5 + i * 0.07} />
            </li>
          ))}
        </ul>
      </div>
    </m.article>
  );
}

export function Skills({ index }: { index: string }) {
  return (
    <Section
      id="skills"
      index={index}
      eyebrow="Skills"
      title="Technical *toolkit*"
      description="The languages, frameworks and tools I build with, branching out from where they sit in the stack."
    >
      <div className="space-y-20">
        {skillCategories.map((category) => (
          <SkillTree key={category.title} {...category} />
        ))}
      </div>
    </Section>
  );
}
