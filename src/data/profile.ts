import type { Profile } from '../types';

/**
 * Your identity. Fields left as empty strings are hidden on the site, so
 * nothing placeholder-looking ships by accident. In development, the page
 * shows a hint wherever something still needs filling in.
 */
export const profile: Profile = {
  name: 'Solomon',
  brand: 'SOL',
  title: 'Full-Stack Developer',
  roles: ['Frontend Developer', 'Backend Developer', 'Full-Stack Engineer', 'UI Designer', 'Problem Solver', 'Lifelong Learner'],
  heroStack: ['React', 'TypeScript', 'Node.js', 'Spring Boot', 'PostgreSQL'],
  heroOrbit: ['Docker', 'Tailwind CSS', 'Next.js', 'Prisma'],
  intro:
    "I focus on building reliable, scalable, and user-centered web applications — from React and TypeScript interfaces to Java Spring Boot and Node.js services.",
  photo: '/me.webp',
  email: 'solomonshmels@gmail.com',
  location: 'Bole, Addis Ababa, Ethiopia',
  socials: {
    github: 'https://github.com/Sol-Reactor',
    linkedin: 'https://www.linkedin.com/in/solomon-shmels',
  },
  // Put your Europass PDF in /public (e.g. public/cv.pdf), then set resumeUrl: '/cv.pdf' to show the Download CV button.
  resumeUrl: '',
};
