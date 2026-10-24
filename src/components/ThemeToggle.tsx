'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')} className="theme-toggle" aria-label="Toggle light or dark theme">
      <Sun className="theme-sun" size={20} aria-hidden="true" />
      <Moon className="theme-moon" size={20} aria-hidden="true" />
    </button>
  );
}
