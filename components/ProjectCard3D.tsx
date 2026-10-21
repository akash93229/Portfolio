"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { useTheme } from '@/components/providers';

type ProjectItem = (typeof PROFILE_DATA.projects)[0];

interface ProjectCard3DProps {
  project: ProjectItem;
  activeTrack: 'fullstack' | 'devops' | 'both';
}

function getSlug(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('stormlane')) return 'stormlane';
  if (t.includes('strapi')) return 'strapi-ecs-pipeline';
  if (t.includes('documentdb') || t.includes('terraform')) return 'terraform-documentdb';
  return 'stormlane';
}

export default function ProjectCard3D({ project, activeTrack }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const { isDark } = useTheme();

  const slug = getSlug(project.title);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: isDark ? 0.15 : 0.08,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const isDimmed = activeTrack !== 'both' && project.track !== 'both' && project.track !== activeTrack;

  return (
    <div
      style={{ perspective: 1000 }}
      className={`transition-opacity duration-300 h-full ${
        isDimmed ? 'opacity-35 grayscale' : 'opacity-100'
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className={`relative h-full rounded-3xl p-7 md:p-8 flex flex-col justify-between border transition-all duration-300 ${
          isDark
            ? project.featured
              ? 'bg-neutral-900/80 border-cyan-500/40 shadow-xl shadow-cyan-500/5'
              : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
            : project.featured
            ? 'bg-white border-cyan-500/50 shadow-xl shadow-cyan-100'
            : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-md'
        }`}
      >
        {/* Dynamic Light Glare */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />

        <div>
          {/* Top Row Badges */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-neutral-800 text-cyan-400 border border-neutral-700">
                {project.period}
              </span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold bg-neutral-800/80 text-neutral-300">
                {project.track === 'both' ? 'Full Stack + DevOps' : project.track.toUpperCase()}
              </span>
            </div>

            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
                <Sparkles className="w-3 h-3" />
                Featured Build
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <Link href={`/projects/${slug}`} className="group block">
            <h3
              className={`text-xl md:text-2xl font-bold font-heading group-hover:text-cyan-500 transition-colors ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              {project.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-cyan-500 font-medium mt-1 mb-4">
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm leading-relaxed mb-6 opacity-80">
            {project.problem}
          </p>

          {/* Key Outcome Pill */}
          <div
            className={`p-3.5 rounded-2xl border mb-6 ${
              isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
              <p className="text-xs leading-snug">
                <strong className={isDark ? 'text-white' : 'text-neutral-900'}>
                  Outcome:{' '}
                </strong>
                {project.outcome}
              </p>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-md bg-neutral-800/50 border border-neutral-700/60 font-mono opacity-85"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between gap-4 mt-auto">
          <Link
            href={`/projects/${slug}`}
            className="text-xs font-semibold text-cyan-500 hover:text-cyan-400 flex items-center gap-1 transition-colors group"
          >
            <span>View Case Study</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
                aria-label={`${project.title} GitHub`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
