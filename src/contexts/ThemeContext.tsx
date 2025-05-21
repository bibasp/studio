"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import type { ThemeSettings } from '@/lib/types';
import { DEFAULT_THEME } from '@/lib/types';

interface ThemeContextType extends ThemeSettings {
  setTheme: (settings: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeSettings, setThemeSettings] = useLocalStorage<ThemeSettings>(
    'chronicle-canvas-theme',
    DEFAULT_THEME
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty('--background-hsl', themeSettings.backgroundColor);
    root.style.setProperty('--foreground-hsl', themeSettings.foregroundColor);
    root.style.setProperty('--primary-hsl', themeSettings.primaryColor);
    root.style.setProperty('--accent-hsl', themeSettings.accentColor);

    // For card and popover, typically same as background/foreground but can be customized
    root.style.setProperty('--card-hsl', themeSettings.backgroundColor);
    root.style.setProperty('--card-foreground-hsl', themeSettings.foregroundColor);
    root.style.setProperty('--popover-hsl', themeSettings.backgroundColor);
    root.style.setProperty('--popover-foreground-hsl', themeSettings.foregroundColor);

  }, [themeSettings]);

  const setTheme = (newSettings: Partial<ThemeSettings>) => {
    setThemeSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetTheme = () => {
    setThemeSettings(DEFAULT_THEME);
  };

  return (
    <ThemeContext.Provider value={{ ...themeSettings, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
