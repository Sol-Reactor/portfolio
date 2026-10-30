import { describe, expect, it } from 'vitest';
import { experience } from './experience';
import { navItems } from './navigation';
import { profile } from './profile';
import { projects } from './projects';
import { skillCategories } from './skills';

const isUrl = (s: string) => /^https?:\/\/\S+$/.test(s);

describe('content data', () => {
  it('has unique project slugs and complete project entries', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of projects) {
      expect(p.name && p.summary && p.problem && p.contribution).toBeTruthy();
      expect(p.decisions.length).toBeGreaterThan(0);
      expect(p.stack.length).toBeGreaterThan(0);
      if (p.links.repo) expect(isUrl(p.links.repo)).toBe(true);
      if (p.links.live) expect(isUrl(p.links.live)).toBe(true);
      if (p.image) expect(p.image.alt.length).toBeGreaterThan(0);
    }
  });

  it('only uses well-formed profile links when set', () => {
    for (const url of [profile.socials.github, profile.socials.linkedin]) {
      if (url) expect(isUrl(url)).toBe(true);
    }
    if (profile.email) expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('has unique nav ids that include every required section', () => {
    const ids = navItems.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(expect.arrayContaining(['home', 'about', 'skills', 'projects', 'contact']));
  });

  it('ships only real experience entries, never template placeholders', () => {
    for (const e of experience) {
      // Template text like "[Your role title]" or "[Mon YYYY]" must never reach production.
      const text = [e.role, e.organization, e.start, e.end, e.location, e.summary, e.badge, ...e.highlights, ...(e.stack ?? [])];
      for (const t of text) if (t) expect(t).not.toMatch(/\[[^\]]*\]/);
      if (e.current) expect(e.end).toBeUndefined();
      for (const l of e.links ?? []) expect(isUrl(l.href)).toBe(true);
    }
  });

    it('has a local logo file for every skill icon', () => {
    const files = Object.keys(import.meta.glob('/public/icons/*.svg'));
    for (const s of skillCategories.flatMap((c) => c.skills)) {
      if (typeof s.icon === 'string') expect(files).toContain(`/public/icons/${s.icon}.svg`);
    }
  });

  it('has no duplicate skills within a category', () => {
    for (const c of skillCategories) {
      const names = c.skills.map((s) => s.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it('has complete experience entries', () => {
    // Dates are optional (never guessed); the role, organisation and some description are not.
    for (const e of experience) {
      expect(e.role && e.organization).toBeTruthy();
      expect(Boolean(e.summary) || e.highlights.length > 0).toBe(true);
    }
  });
});
