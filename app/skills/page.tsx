"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useTrack, useTheme } from '@/components/providers';
import { PROFILE_DATA } from '@/data/profile';
import PipelineVisual from '@/components/PipelineVisual';
import { Cpu, Terminal, Database, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';

// Dynamically load SkillsGlobe with SSR disabled
const SkillsGlobe = dynamic(() => import('@/components/3d/SkillsGlobe'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-neutral-700 border-t-cyan-500 animate-spin" />
    </div>
  ),
});

const categoryIcons: Record<string, React.ReactNode> = {
  'Cloud & DevOps': <Cloud className="w-5 h-5 text-cyan-400" />,
  'Languages & Frontend': <Terminal className="w-5 h-5 text-indigo-400" />,
  'Backend & APIs': <Cpu className="w-5 h-5 text-emerald-400" />,
  'Databases & Storage': <Database className="w-5 h-5 text-amber-400" />,
  'AI-Assisted Engineering': <Sparkles className="w-5 h-5 text-purple-400" />,
};

export default function SkillsPage() {
  const { activeTrack } = useTrack();
  const { isDark } = useTheme();
  const { groups } = PROFILE_DATA.skills;

  return (
    <div className="py-12 sm:py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border text-cyan-500 bg-cyan-950/40 border-cyan-800/60 inline-block">
          Technical Arsenal
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight">
          Cloud Infrastructure & Full-Stack Capabilities
        </h1>
        <p className="text-base sm:text-lg opacity-80 leading-relaxed">
          Interactive 3D skill orbit, accessible categorized competencies, and simulated production CI/CD delivery pipeline.
        </p>
      </div>

      {/* 1. 3D Skills Orbit Section */}
      <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 relative z-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              3D Interactive Skill Cosmos
            </h2>
            <p className="text-xs sm:text-sm opacity-75 mt-1">
              Drag to rotate the 3D globe. Hover nodes to view technology details.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/60 self-start sm:self-auto">
            WebGL Powered
          </span>
        </div>

        <div className="w-full h-[420px] sm:h-[480px]">
          <SkillsGlobe activeTrack={activeTrack} />
        </div>
      </div>

      {/* 2. Accessible Grouped Lists */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Categorized Engineering Stack
          </h2>
          <p className="text-sm opacity-75 mt-1">
            Production-tested frameworks, cloud infrastructure tooling, and databases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, idx) => {
            const isDimmed = activeTrack !== 'both' && group.track !== 'both' && group.track !== activeTrack;

            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border transition-all duration-300 ${
                  isDimmed ? 'opacity-35 grayscale' : 'opacity-100'
                } ${
                  isDark
                    ? 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-neutral-800/80 border border-neutral-700">
                    {categoryIcons[group.category] || <Cpu className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base sm:text-lg">
                      {group.category}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-500 font-semibold">
                      {group.track === 'both' ? 'Full Stack + DevOps' : group.track.toUpperCase()}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {group.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm leading-snug opacity-90"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive CI/CD Pipeline Visual */}
      <div className="space-y-6 pt-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            Production Pipeline Architecture
          </h2>
          <p className="text-sm opacity-75 mt-1">
            Zero-downtime Blue/Green automated release simulation on AWS ECS Fargate.
          </p>
        </div>

        <PipelineVisual />
      </div>
    </div>
  );
}
