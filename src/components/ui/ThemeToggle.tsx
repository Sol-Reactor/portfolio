import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

type Theme = 'light' | 'dark';

// index.html applies the saved theme before React loads, so read it back from the page.
const current = (): Theme => (document.documentElement.classList.contains('dark') ? 'dark' : 'light');

/** Switches the whole site between the cream light theme and the dark grid theme. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(current);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  const toggle = () => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-grid size-11 cursor-pointer place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
    >
      {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}
