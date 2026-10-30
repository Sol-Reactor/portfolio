import { describe, expect, it } from 'vitest';
import { validateContactField as validate } from './contactValidation';

describe('contact form validation', () => {
  it('requires a name of at least two characters', () => {
    expect(validate('name', '')).not.toBe('');
    expect(validate('name', ' a ')).not.toBe('');
    expect(validate('name', 'Abebe')).toBe('');
  });

  it('accepts only well-formed email addresses', () => {
    expect(validate('email', 'name@example.com')).toBe('');
    for (const bad of ['', 'name', 'name@', 'name@example', 'na me@example.com']) {
      expect(validate('email', bad)).not.toBe('');
    }
  });

  it('treats the subject as optional but bounded', () => {
    expect(validate('subject', '')).toBe('');
    expect(validate('subject', 'x'.repeat(121))).not.toBe('');
  });

  it('requires a message of at least ten characters', () => {
    expect(validate('message', 'Hi there')).not.toBe('');
    expect(validate('message', 'Hello Solomon, I have a project idea.')).toBe('');
  });
});
