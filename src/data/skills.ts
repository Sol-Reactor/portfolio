import { Database, Layout, Network, Server } from 'lucide-react';
import type { SkillCategory } from '../types';

/**
 * Grouped skills. No proficiency levels on purpose — projects show depth better than bars.
 * A string `icon` is a Simple Icons slug and needs its SVG in /public/icons, e.g. from
 * https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/<slug>.svg
 */
export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'The part people see and touch: fast, responsive and accessible interfaces built from typed, reusable components.',
    icon: Layout,
    skills: [
      { name: 'HTML', icon: 'html5', color: '#E34F26' },
      { name: 'CSS', icon: 'css3', color: '#1572B6' },
      { name: 'JavaScript', icon: 'javascript', color: '#E8C900' },
      { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
      { name: 'React', icon: 'react', color: '#3FB6D8' },
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'Vue.js', icon: 'vuedotjs', color: '#4FC08D' },
      { name: 'Tailwind CSS', icon: 'tailwindcss', color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    description: 'The engine behind the screen: secure REST APIs, authentication and real-time services with clear, predictable behaviour.',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: 'nodedotjs', color: '#5FA04E' },
      { name: 'Express.js', icon: 'express' },
      { name: 'NestJS', icon: 'nestjs', color: '#E0234E' },
      { name: 'Java', icon: 'openjdk', color: '#ED8B00' },
      { name: 'Spring Boot', icon: 'springboot', color: '#6DB33F' },
      { name: 'REST APIs', icon: Network, color: '#0F6496' },
      { name: 'Socket.IO', icon: 'socketdotio' },
    ],
  },
  {
    title: 'Database & Tools',
    description: 'Where the data lives and how the work ships: sound schemas, version control and tooling that keeps delivery smooth.',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', icon: 'postgresql', color: '#4169E1' },
      { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
      { name: 'Prisma', icon: 'prisma' },
      { name: 'Git', icon: 'git', color: '#F05032' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Docker', icon: 'docker', color: '#2496ED' },
      { name: 'Vite', icon: 'vite', color: '#646CFF' },
      { name: 'Vitest', icon: 'vitest', color: '#6E9F18' },
    ],
  },
];
