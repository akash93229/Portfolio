"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, Terminal, Cpu, Layers } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { useTheme, useTrack } from '@/components/providers';

// Split half-circle icon matching Design B
const HalfCircleThemeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:rotate-180"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2" />
    <path d="M8 1a7 7 0 0 1 0 14V1z" fill="currentColor" />
  </svg>
);

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { activeTrack, setActiveTrack } = useTrack();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile drawer on resize to desktop or route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1100) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Contact', href: '/contact' },
  ];

  const tracks: Array<{ id: 'fullstack' | 'devops' | 'both'; label: string; icon: React.ReactNode }> = [
    { id: 'both', label: 'Both', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'devops', label: 'DevOps', icon: <Cpu className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div
        className={`max-w-6xl mx-auto rounded-full px-5 py-2.5 transition-all duration-300 pointer-events-auto shadow-2xl flex items-center justify-between gap-3 sm:gap-6 whitespace-nowrap ${
          isDark
            ? 'bg-[#0A0A0A]/85 backdrop-blur-xl border border-white/10 text-white'
            : 'bg-[#FFFFFF]/90 backdrop-blur-xl border border-black/10 text-slate-900 shadow-slate-300/30'
        }`}
      >
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs font-heading group-hover:scale-105 transition-transform">
            AM
          </div>
          <span className="font-heading font-semibold text-sm tracking-tight hidden sm:inline">
            {PROFILE_DATA.identity.name}
          </span>
        </Link>

        {/* Navigation Links (Desktop: >= 1100px) */}
        <nav className="hidden min-[1100px]:flex items-center gap-1.5 text-xs font-medium shrink-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? isDark
                      ? 'text-white font-semibold'
                      : 'text-black font-semibold'
                    : isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className={`absolute inset-0 rounded-full ${
                      isDark ? 'bg-neutral-800/80 border border-neutral-700/60' : 'bg-neutral-100 border border-neutral-300/60'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Center Track Switcher (Both | Full Stack | DevOps) */}
        <div
          className={`hidden sm:flex items-center p-1 rounded-full border text-xs shrink-0 ${
            isDark ? 'bg-neutral-900/90 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
          }`}
        >
          {tracks.map((t) => {
            const isActive = activeTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t.id)}
                className={`relative px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isActive
                    ? isDark
                      ? 'text-white'
                      : 'text-neutral-950 font-semibold'
                    : isDark
                    ? 'text-neutral-400 hover:text-neutral-200'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbarActiveTrackPill"
                    className={`absolute inset-0 rounded-full shadow-sm ${
                      isDark ? 'bg-neutral-800' : 'bg-white shadow-neutral-300'
                    }`}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  {t.icon}
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Actions: Theme Toggle + Resume Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Half-circle Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className={`group p-2 rounded-full border transition-colors ${
              isDark
                ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/80 text-neutral-200 hover:text-white'
                : 'border-neutral-200 hover:border-neutral-300 bg-neutral-100 text-neutral-800 hover:text-black'
            }`}
          >
            <HalfCircleThemeIcon />
          </button>

          {/* Resume Button */}
          <a
            href={PROFILE_DATA.identity.resumeUrl}
            download="Akash_Malviya_CV.pdf"
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 active:scale-95 border ${
              isDark
                ? 'bg-white text-black hover:bg-neutral-200 border-white font-semibold'
                : 'bg-black text-white hover:bg-neutral-800 border-black font-semibold'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Hamburger Drawer Toggle (< 1100px) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`min-[1100px]:hidden p-2 rounded-full border ${
              isDark ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-neutral-100 border-neutral-200 text-black'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto max-w-md mx-auto mt-2 rounded-3xl p-5 shadow-2xl border min-[1100px]:hidden ${
              isDark ? 'bg-[#0A0A0A]/95 border-neutral-800 text-white' : 'bg-white/95 border-neutral-200 text-neutral-900'
            }`}
          >
            {/* Mobile Track Selector */}
            <div
              className={`flex items-center justify-between p-1 rounded-full border mb-4 ${
                isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
              }`}
            >
              {tracks.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTrack(t.id);
                  }}
                  className={`flex-1 py-1 text-xs rounded-full transition-all text-center ${
                    activeTrack === t.id
                      ? isDark
                        ? 'bg-neutral-800 text-white font-semibold'
                        : 'bg-white text-black font-semibold shadow-sm'
                      : 'text-neutral-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? isDark
                          ? 'bg-neutral-900 text-white font-semibold'
                          : 'bg-neutral-100 text-black font-semibold'
                        : isDark
                        ? 'hover:bg-neutral-900/60 text-neutral-400'
                        : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
