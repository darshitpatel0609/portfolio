import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ThemePreference } from '../types/app';

const STORAGE_KEY = 'vitebase-theme';

interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: 'light' | 'dark';
  setPreference: (next: ThemePreference) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredPreference(): ThemePreference {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') {
      return raw;
    }
  } catch {
    // Ignore storage errors
  }
  return 'dark';
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() =>
    readStoredPreference()
  );
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme());

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setSystemTheme(media.matches ? 'dark' : 'light');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const resolvedTheme: 'light' | 'dark' =
    preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setPreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setPreference]);

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference, toggleTheme }),
    [preference, resolvedTheme, setPreference, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
