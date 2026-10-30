import type { NavItem } from '../types';
import { experience } from './experience';

/** The Experience section and its nav link appear only when there are real entries. */
export const showExperience = experience.length > 0;

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  ...(showExperience ? [{ id: 'experience', label: 'Experience' }] : []),
  { id: 'contact', label: 'Contact' },
];
