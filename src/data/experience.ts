import type { ExperienceEntry } from '../types';

/**
 * Work history, shown in this order. Only list real work, and leave a field
 * out rather than guess it: dates, location and stack are optional.
 */
export const experience: ExperienceEntry[] = [
  {
    role: 'Full-Stack Developer',
    organization: 'Musod Med',
    type: 'Contract',
    badge: 'Remote',
    start: 'Nov 2026',
    current: true,
    location: 'Remote · Addis Ababa, Ethiopia',
    summary:
      'Building software for Musod Med, a health venture studio in Addis Ababa that builds and scales healthcare technologies. My main project is Manasik Health, a health clearance platform for pilgrims, and I have recently been assigned a second project.',
    highlights: [
      'Built Manasik Health as one Next.js and Supabase app in English and Amharic, where pilgrims register, travel agencies manage their pilgrims, clinic nurses and doctors carry out and sign medical examinations, and administrators oversee the whole process.',
      'Solved the hardest part, registration: connecting each pilgrim with their agency and the clinic doctors who examine them, with simple sign-in options so older pilgrims can get in easily.',
      'Pilgrims receive a digitally signed QR health pass once a doctor signs their result. Checkers can verify it even without internet, and the public check shows only what is needed, never medical details.',
      'Every role sees only its own data: access rules are enforced in the database itself, signed results cannot be changed, and every change is logged.',
      'Ran a full security review and hardening pass before the pilot, backed by automated database access tests, unit tests and end-to-end browser tests.',
      'Work fully remotely, delivering against project milestones and joining regular check-ins with the team.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL'],
  },
  {
    role: 'Software Engineering Intern',
    organization: 'INSA',
    type: 'Internship',
    badge: 'Real-world platform',
    start: 'Dec 2025',
    end: 'Jun 2026',
    location: 'Bole, Addis Ababa, Ethiopia',
    summary:
      'Worked on an internal Q&A platform, inspired by Stack Overflow, that solves a communication problem: instead of tracking down the right person, a developer posts a question once, others answer, and the asker accepts the answer that solved it, saving everyone time and effort. The platform is microservices-based and currently in use.',
    highlights: [
      'Worked as a full-stack developer and built my features myself, end to end: the React frontend, the Spring Boot services and the PostgreSQL data behind them.',
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
      'Built a queue and stock management system for a local phone repair shop. Many customers came in to have their phones fixed and everything was tracked by hand; now customers book an appointment, are served in the order of their appointment time, and are told by email when their phone is ready, or can check its status on the web or through a Telegram bot. The system is delivered and in use by the business.',
    highlights: [
      'Spotted the problem by watching how the shop worked day to day, proposed a web system to the owner, and took the project on once they agreed.',
      'Built appointment booking with a queue ordered by appointment time, email notifications when a repair is finished, and repair-status checks on the web and through a Telegram bot.',
      "Added stock management, so the owner keeps track of the shop's stock in the same system as the repairs.",
      'Built the system end to end on my own: frontend, backend and database.',
      'Set up the project and designed the PostgreSQL database schema with Prisma ORM.',
      'Built a typed Express.js API and a React and TypeScript interface around repair requests and their progress through the workflow.',
      "Shaped the features around the client's day-to-day requirements rather than a generic template.",
    ],
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Express.js', 'Prisma', 'PostgreSQL', 'Telegram Bot API'],
  },
];
