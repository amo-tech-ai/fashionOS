import { useState, useEffect } from 'react';

const COLOR_SCHEME_KEY = 'fashionos-color-scheme';

type ColorScheme = 'light' | 'dark' | 'auto';

export function usePersistedColorScheme(defaultValue: ColorScheme = 'light') {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COLOR_SCHEME_KEY);
      if (stored === 'light' || stored === 'dark') {
        setColorScheme(stored);
      }
    } catch (error) {
      console.error('Failed to read color scheme from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Persist to localStorage when color scheme changes
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    
    try {
      localStorage.setItem(COLOR_SCHEME_KEY, nextColorScheme);
    } catch (error) {
      console.error('Failed to save color scheme to localStorage:', error);
    }
  };

  return { colorScheme, toggleColorScheme, isLoading };
}
