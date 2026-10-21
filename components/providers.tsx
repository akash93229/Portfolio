"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
type Track = 'fullstack' | 'devops' | 'both';

interface ThemeContextType {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface TrackContextType {
  activeTrack: Track;
  setActiveTrack: (track: Track) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const TrackContext = createContext<TrackContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  // Default dark on first load (do not auto-follow prefers-color-scheme)
  const [theme, setThemeState] = useState<Theme>('dark');
  const [activeTrack, setActiveTrack] = useState<Track>('both');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
    } else {
      setThemeState('dark'); // Explicitly dark by default
    }

    const savedTrack = localStorage.getItem('portfolio-active-track') as Track | null;
    if (savedTrack === 'fullstack' || savedTrack === 'devops' || savedTrack === 'both') {
      setActiveTrack(savedTrack);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('portfolio-active-track', activeTrack);
  }, [activeTrack, mounted]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, setTheme }}>
      <TrackContext.Provider value={{ activeTrack, setActiveTrack }}>
        {children}
      </TrackContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within Providers');
  return context;
}

export function useTrack() {
  const context = useContext(TrackContext);
  if (!context) throw new Error('useTrack must be used within Providers');
  return context;
}
