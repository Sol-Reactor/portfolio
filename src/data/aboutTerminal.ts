import type { TerminalConversation } from '../types';

/**
 * The About section's terminal conversation. Edit the questions and answers
 * freely; entries play in order. `typingSpeed` (ms per character) is optional.
 */
export const aboutTerminal: TerminalConversation = {
  prompt: 'C:\\portfolio>',
  command: 'cd about',
  title: 'sol@portfolio: ~/about',
  asker: 'terminal',
  answerer: 'sol',
  finalPrompt: 'sol@portfolio:~$',
  completion: 'Session completed successfully.',
  entries: [
    {
      question: 'Who are you?',
      answer:
        'I am a software engineering student at Mekelle University, passionate about building useful software and continuously improving my engineering skills.',
    },
    {
      question: 'What do you build?',
      answer:
        'I build full-stack web applications, working across modern frontend technologies, backend systems, APIs, and databases.',
    },
    {
      question: 'What technologies do you work with?',
      answer:
        'I work with React, Next.js, TypeScript, JavaScript, and Java Spring Boot, and I continue exploring technologies that help me build reliable applications.',
    },
    {
      question: 'What kind of engineer do you want to become?',
      answer:
        'I want to become an engineer who understands not only how to write code, but also how to design systems, make good architectural decisions, and solve problems thoughtfully.',
    },
    {
      question: 'What are you working toward?',
      answer:
        'I am focused on building meaningful projects, strengthening my software engineering fundamentals, and growing into more advanced engineering work.',
    },
  ],
};
