"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Download, ArrowUp, ExternalLink } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { useTheme } from '@/components/providers';

export default function Footer() {
  const { isDark } = useTheme();
  const { identity } = PROFILE_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t transition-colors duration-300 py-16 px-6 lg:px-12 relative z-10 ${
        isDark ? 'bg-[#0A0A0A] border-white/10 text-neutral-400' : 'bg-[#E5E3DF] border-black/10 text-neutral-600'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Identity & Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm font-heading">
                AM
              </div>
              <span className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                {identity.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Full Stack Developer & DevOps Engineer with 3+ years of experience delivering production cloud systems on AWS, containerized workflows, and resilient web applications.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={identity.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`p-2 rounded-full border transition-colors ${
                  isDark
                    ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:text-white'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white hover:text-black'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={identity.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`p-2 rounded-full border transition-colors ${
                  isDark
                    ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:text-white'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white hover:text-black'
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${identity.contact.email}`}
                aria-label="Email"
                className={`p-2 rounded-full border transition-colors ${
                  isDark
                    ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:text-white'
                    : 'border-neutral-300 hover:border-neutral-400 bg-white hover:text-black'
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:underline transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:underline transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:underline transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={identity.resumeUrl}
                  download="Akash_Malviya_CV.pdf"
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Curriculum Vitae</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-neutral-800 text-neutral-500' : 'border-neutral-300 text-neutral-600'
        }`}>
          <div>
            © {new Date().getFullYear()} Akash Malviya. Built to ship. All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
