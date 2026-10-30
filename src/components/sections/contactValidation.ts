export type ContactField = 'name' | 'email' | 'subject' | 'message';
export type ContactValues = Record<ContactField, string>;

export const emptyContact: ContactValues = { name: '', email: '', subject: '', message: '' };

/** Returns an error message for the field, or '' when the value is acceptable. */
export function validateContactField(field: ContactField, value: string): string {
  const v = value.trim();
  switch (field) {
    case 'name':
      return v.length < 2 ? 'Please enter your name.' : '';
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address, like name@example.com.';
    case 'subject':
      return v.length > 120 ? 'Please keep the subject under 120 characters.' : '';
    case 'message':
      return v.length < 10 ? 'Please write a message of at least 10 characters.' : '';
  }
}
