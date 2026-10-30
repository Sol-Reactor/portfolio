import type { LucideIcon } from 'lucide-react';

export interface Profile {
  name: string;
  /** Short identity used in the nav and footer. */
  brand: string;
  /** Professional title, shown with the location above the hero headline. */
  title: string;
  /** Roles typed one after another under your name in the hero. */
  roles: string[];
  /** Skill names (from data/skills.ts) shown as small logo badges in the hero: your core stack. */
  heroStack: string[];
  /** Up to four skill names shown as the floating round badges beside your photo. */
  heroOrbit: string[];
  /** Short introduction under the roles. */
  intro: string;
  /** Portrait shown in the hero, e.g. "/me.jpg" placed in /public. Empty shows a placeholder. */
  photo: string;
  /** Leave empty to hide. Never shown unless you set it. */
  email: string;
  location: string;
  socials: {
    github: string;
    linkedin: string;
  };
  /** Optional link to a PDF résumé, e.g. "/resume.pdf" placed in /public. */
  resumeUrl: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  /** Short kind of product, shown above the name, e.g. "Web application". */
  category: string;
  summary: string;
  problem: string;
  contribution: string;
  decisions: string[];
  stack: string[];
  links: {
    repo?: string;
    live?: string;
  };
  image?: ProjectImage;
}

export type EmploymentType = 'Internship' | 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Independent';

export interface ExperienceEntry {
  role: string;
  organization: string;
  type: EmploymentType;
  /** Free text, e.g. "Jun 2024". Omit when unknown; the date line is then hidden. */
  start?: string;
  end?: string;
  /** Marks an ongoing position: shows "Present" and the pulsing node. Never inferred from a missing end date. */
  current?: boolean;
  /** Short highlight shown beside the type, e.g. "Real-world platform". */
  badge?: string;
  location?: string;
  summary?: string;
  /** Responsibilities and verifiable outcomes, one per line. */
  highlights: string[];
  stack?: string[];
  /** Related projects, certificates or the organisation's site. */
  links?: { label: string; href: string }[];
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location?: string;
  /** Free text, e.g. "Oct 2022". Omit when you'd rather not show it. */
  start?: string;
  /** Graduation, e.g. "Jun 2027". */
  end?: string;
  /** True while studying: the end date reads as an expected graduation. */
  inProgress?: boolean;
  /** Short status shown as a badge, e.g. "Final year". */
  status?: string;
  highlights?: string[];
}

export interface Skill {
  name: string;
  /** A Simple Icons slug (simpleicons.org), or a Lucide icon when there is no brand logo. */
  icon: string | LucideIcon;
  /** Brand colour. Omit for black logos so they follow the text colour in both themes. */
  color?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface Principle {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FocusArea {
  label: string;
  /** Shown when the row is hovered, focused or tapped. */
  description: string;
  icon: LucideIcon;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface TerminalEntry {
  question: string;
  answer: string;
  /** Milliseconds per character; defaults suit most lines. */
  typingSpeed?: { question?: number; answer?: number };
}

export interface TerminalConversation {
  /** Shown before the panel, e.g. "C:\portfolio>" followed by the typed `command`. */
  prompt: string;
  command: string;
  /** Label in the terminal's title bar. */
  title: string;
  /** Prefixes that tell questions and answers apart. */
  asker: string;
  answerer: string;
  finalPrompt: string;
  completion: string;
  entries: TerminalEntry[];
}
