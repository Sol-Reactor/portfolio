import type { ExperienceEntry } from '../types';

/**
 * Work history, shown in this order. Only list real work, and leave a field
 * out rather than guess it: dates, location and stack are optional.
 */
export const experience: ExperienceEntry[] = [
  {
    role: 'Software Engineering Intern',
    organization: 'INSA',
    type: 'Internship',
    badge: 'Real-world platform',
    start: 'Dec 2025',
    end: 'Jun 2026',
    location: 'Bole, Addis Ababa, Ethiopia',
    summary:
      'Contributed to an internal knowledge base and Q&A platform inspired by Stack Overflow: a microservices-based system where developers ask questions, share code snippets and solve bugs efficiently. The platform is currently in use.',
    highlights: [
      'Contributed features to the platform across a React frontend and Spring Boot services backed by PostgreSQL.',
      'Integrated new work into an existing microservices architecture, with services run in Docker containers.',
      'Gained hands-on experience with production-oriented development: service boundaries, API integration and working within a shared codebase.',
    ],
    stack: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'Microservices'],
  },
  {
    role: 'Full-Stack Developer, Freelance Project',
    organization: 'PRQMS: Phone Repair Queue Management System',
    type: 'Freelance',
    badge: 'Delivered & in use',
    start: 'Jun 2026',
    end: 'Sep 2026',
    summary:
      'Built a web-based queue management system for an individual who runs a phone repair business, to organize repair requests and give the repair workflow more structure than manual tracking. The system is delivered and now in use by the business.',
    highlights: [
      'Approached the business owner myself, proposed a web system to manage the repair work, and took the project on once they agreed.',
      'Built the system end to end on my own: frontend, backend and database.',
      'Set up the project and designed the PostgreSQL database schema with Prisma ORM.',
      'Built a typed Express.js API and a React and TypeScript interface around repair requests and their progress through the workflow.',
      "Shaped the features around the client's day-to-day requirements rather than a generic template.",
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Express.js', 'Prisma', 'PostgreSQL'],
  },
];
