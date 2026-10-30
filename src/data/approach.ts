import {
  Accessibility,
  Blocks,
  Bug,
  Code2,
  DatabaseZap,
  Network,
  PenTool,
  Wrench,
} from 'lucide-react';
import type { FocusArea, Principle } from '../types';

/** Short tags shown beside the About text; the description opens on hover. */
export const focusAreas: FocusArea[] = [
  {
    label: 'Full-stack development',
    description:
      'From the React interface to the API and the database, I build and connect every layer myself, as in my school management and social network projects.',
    icon: Blocks,
  },
  {
    label: 'Practical, useful applications',
    description:
      'I build tools that solve a real problem, like running a school, practising with quizzes or selling products online, not demos that only look good.',
    icon: Wrench,
  },
  {
    label: 'Maintainable architecture',
    description:
      'Clear folder structure, small components and separate layers for routes, controllers and data, so the code stays easy to read and change later.',
    icon: Code2,
  },
  {
    label: 'API development & integration',
    description:
      'REST APIs with Express, JWT authentication, input validation and role-based access, plus integrating services like Cloudinary and Socket.IO.',
    icon: Network,
  },
  {
    label: 'Database design',
    description:
      'Designing schemas and relationships in PostgreSQL, with Prisma or plain SQL, so the data stays consistent as the app grows.',
    icon: DatabaseZap,
  },
];

/** Principles I work by — written as intentions, not claims of mastery. */
export const principles: Principle[] = [
  {
    title: 'Clean architecture',
    description: 'Separate business logic from frameworks and I/O so each part can change and be tested on its own.',
    icon: Blocks,
  },
  {
    title: 'Maintainability first',
    description: 'Small modules, descriptive names and fewer clever tricks. Code is read far more often than it is written.',
    icon: Code2,
  },
  {
    title: 'Deliberate API design',
    description: 'Consistent resource naming, explicit validation and meaningful status codes make APIs easy to consume.',
    icon: Network,
  },
  {
    title: 'Data modelling',
    description: 'Start from the data and its relationships; a sound schema prevents a whole class of bugs later.',
    icon: DatabaseZap,
  },
  {
    title: 'Testing & debugging',
    description: 'Reproduce first, then fix. Tests guard the behaviour that matters most and document intent.',
    icon: Bug,
  },
  {
    title: 'Performance & accessibility',
    description: 'Semantic HTML, keyboard support and a lean bundle are part of the feature, not an afterthought.',
    icon: Accessibility,
  },
  {
    title: 'Thoughtful UI/UX',
    description: 'Clear hierarchy, honest feedback and fewer steps. Good interfaces get out of the way.',
    icon: PenTool,
  },
];
