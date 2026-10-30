import type { Project } from '../types';

/**
 * Featured projects, shown in this order. Only list real work — add
 * `links.repo` / `links.live` when they exist, and an `image` (put the file
 * in /public/projects, ideally WebP about 1200px wide) when you have one.
 */
export const projects: Project[] = [
  {
    slug: 'haya-school-management',
    category: 'School management system',
    image: { src: '/projects/haya.webp', alt: 'Haya School landing page with a welcome headline, Enroll Now and Contact Us buttons, and a classroom photo', width: 1200, height: 510 },
    name: 'Haya — School Management System',
    summary:
      'A full-stack school management system with separate dashboards for administrators, teachers, students and parents.',
    problem:
      'Schools juggle students, teachers, classes, attendance and announcements across paper and spreadsheets. Each role needs to see different information, and only that information.',
    contribution:
      'Built the whole system: the Express and Prisma REST API, the database schema, JWT authentication with role-based access, and the React and Redux frontend.',
    decisions: [
      'Four roles (Admin, Teacher, Student, Parent) with role-based access control enforced on the API, not just hidden in the UI.',
      'JWT authentication with bcrypt-hashed passwords, plus Helmet for secure HTTP headers.',
      'Prisma as the data layer so the schema, migrations and queries stay typed and in one place.',
      'Redux Toolkit for shared state, and five switchable themes for a customizable interface.',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'Prisma'],
    links: {
      repo: 'https://github.com/Sol-Reactor/school-management',
      live: 'https://manageschool-fawn.vercel.app',
    },
  },
  {
    slug: 'familia',
    category: 'Social network',
    image: { src: '/projects/familia.webp', alt: 'Familia login screen with email and password fields and a sign-up link', width: 1096, height: 892 },
    name: 'Familia — Social Network',
    summary:
      'A Facebook-style social network with real-time updates and image uploads, built to practise a modern stack on both the frontend and the backend.',
    problem:
      'A social app has to handle accounts, posts with images and live activity between users, which makes it a demanding end-to-end practice project.',
    contribution:
      'Built the frontend and the backend: the Express API with Prisma, real-time events with Socket.IO, image uploads to Cloudinary, and the React client.',
    decisions: [
      'Socket.IO on both server and client so new activity reaches users without refreshing.',
      'Images are uploaded through Multer straight to Cloudinary instead of being stored on the API server.',
      'Request bodies are validated with Joi, and passwords hashed with bcrypt behind JWT authentication.',
      'TanStack Query handles server data and caching, while Zustand keeps the small amount of client state.',
    ],
    stack: ['React', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'Node.js', 'Express', 'Prisma', 'Socket.IO', 'Cloudinary'],
    links: {
      repo: 'https://github.com/Sol-Reactor/familia',
      live: 'https://familia-sable.vercel.app',
    },
  },
  {
    slug: 'myquiz',
    category: 'Learning platform',
    image: { src: '/projects/myquiz.webp', alt: "The quiz app's home page, branded AuraQuest, with a coding-quiz headline, practice buttons and statistics cards", width: 1200, height: 593 },
    name: 'MyQuiz — Quiz Platform',
    summary:
      'A full-stack quiz app that helps students learn by testing themselves, with score tracking and an admin dashboard for creating quizzes.',
    problem:
      'Students learn better by answering questions than by re-reading notes, but need somewhere to take quizzes and see how they are improving over time.',
    contribution:
      'Built the Express REST API on PostgreSQL, JWT authentication with user and admin roles, and the React frontend with user and admin dashboards.',
    decisions: [
      'Role-based access: users take quizzes and review their results, while admins create and manage quizzes.',
      'Plain SQL through the pg driver on PostgreSQL, with seed scripts to set up quizzes and an admin account.',
      'A RESTful API with protected routes for submitting answers and reading results.',
    ],
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
    links: {
      repo: 'https://github.com/Sol-Reactor/Ma-Quiz',
      live: 'https://ma-quiz-mu.vercel.app',
    },
  },
  {
    slug: 'rakeb-store',
    category: 'E-commerce',
    image: { src: '/projects/rakeb.webp', alt: 'Rakeb Store product grid showing items with prices and edit and delete controls', width: 1200, height: 600 },
    name: 'Rakeb — E-commerce Store',
    summary:
      'My first deployed project, built after three months of learning React: an online store with a product catalog and theme switching.',
    problem:
      'An online shop needs a product catalog that loads from a real database, works on any screen size and is protected against abuse.',
    contribution:
      'Built the React frontend and the Node.js and Express backend on PostgreSQL, and deployed it to Render.',
    decisions: [
      'Zustand for lightweight state management instead of a heavier store.',
      'Helmet sets security headers, and Arcjet adds rate limiting to the API.',
      'Tailwind CSS with DaisyUI for a responsive layout with switchable themes.',
    ],
    stack: ['React', 'Zustand', 'Tailwind CSS', 'DaisyUI', 'Node.js', 'Express', 'PostgreSQL'],
    links: {
      repo: 'https://github.com/Sol-Reactor/RAKEB',
      live: 'https://rakeb-8wul.onrender.com',
    },
  },
  {
    slug: 'sola-portfolio',
    category: 'Personal website',
    image: { src: '/projects/portfolio.webp', alt: "This portfolio's dark hero section with the name Solomon, a typed role, call-to-action buttons and a portrait", width: 1200, height: 601 },
    name: 'SOL — Developer Portfolio',
    summary: 'This site: a fast, accessible, content-driven portfolio built with React, TypeScript and Tailwind CSS.',
    problem:
      'A portfolio has to communicate engineering ability within seconds, work on any device, and be easy to keep current without touching layout code.',
    contribution:
      'Designed and built the whole site: information architecture, visual design, component system, typed content layer and tooling.',
    decisions: [
      'All content lives in typed data files, so updating projects or experience never means editing components.',
      'Sections with no real data hide themselves in production instead of shipping placeholder content.',
      'Motion is limited to short entrance and hover transitions and is disabled for visitors who prefer reduced motion.',
      'No UI framework or CSS-in-JS runtime: Tailwind CSS plus a handful of small components keeps the JavaScript bundle lean.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vitest'],
    links: {},
  },
  // Add your projects here, for example:
  // {
  //   slug: 'task-api',
  //   name: 'Task Management API',
  //   category: 'REST API',
  //   summary: '…',
  //   problem: '…',
  //   contribution: '…',
  //   decisions: ['…'],
  //   stack: ['Java', 'Spring Boot', 'PostgreSQL'],
  //   links: { repo: 'https://github.com/…', live: 'https://…' },
  //   image: { src: '/projects/task-api.webp', alt: 'Dashboard showing…', width: 1200, height: 750 },
  // },
];
