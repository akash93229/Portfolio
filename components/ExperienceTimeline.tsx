"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import { useTheme } from '@/components/providers';

interface ExperienceTimelineProps {
  activeTrack: 'fullstack' | 'devops' | 'both';
}

export default function ExperienceTimeline({ activeTrack }: ExperienceTimelineProps) {
  const experiences = PROFILE_DATA.experiences;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const { isDark } = useTheme();

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Central Glowing Timeline Tube */}
      <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-500 via-indigo-500 to-emerald-500 rounded-full opacity-40" />

      <div className="space-y-8 md:space-y-12">
        {experiences.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          const isCurrent = exp.current;
          const isDimmed = activeTrack !== 'both' && exp.track !== 'both' && exp.track !== activeTrack;
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start md:items-center transition-opacity duration-300 ${
                isDimmed ? 'opacity-35 grayscale' : 'opacity-100'
              }`}
            >
              {/* Timeline Center Glowing Node */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                    isCurrent
                      ? 'bg-cyan-500 border-white shadow-lg shadow-cyan-500/50 animate-pulse'
                      : isDark
                      ? 'bg-slate-900 border-indigo-400'
                      : 'bg-white border-indigo-500'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isCurrent ? 'bg-white' : isDark ? 'bg-indigo-400' : 'bg-indigo-600'
                    }`}
                  />
                </div>
              </div>

              {/* Content Card (alternating on desktop) */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] pl-12 md:pl-0 ${
                  isLeft ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'
                }`}
              >
                <div
                  onClick={() => toggleExpand(idx)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                    isCurrent
                      ? 'border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                      : isDark
                      ? 'border-neutral-800 bg-neutral-900/60 hover:border-neutral-700'
                      : 'border-neutral-200 bg-white/90 hover:border-neutral-300 shadow-sm'
                  }`}
                >
                  {/* Header info */}
                  <div
                    className={`flex flex-wrap items-center gap-2 mb-2 ${
                      isLeft ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse">
                        Current Role
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {exp.track === 'both' ? 'Full Stack + DevOps' : exp.track.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-cyan-500 font-medium">
                      {exp.period}
                    </span>
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-bold font-heading ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}
                  >
                    {exp.role}
                  </h3>
                  <div
                    className={`flex items-center gap-3 text-xs mt-1 mb-3 ${
                      isDark ? 'text-neutral-400' : 'text-neutral-500'
                    } ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
                  >
                    <span className={`font-semibold ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      {exp.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Highlights (expandable) */}
                  <div className="space-y-2 mt-4 text-left">
                    {exp.highlights.slice(0, isExpanded ? exp.highlights.length : 2).map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className={`flex items-start gap-2 text-xs leading-relaxed ${
                          isDark ? 'text-neutral-300' : 'text-neutral-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div
                    className={`flex flex-wrap gap-1.5 mt-4 pt-3 border-t ${
                      isDark ? 'border-neutral-800/80' : 'border-neutral-200'
                    } ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}
                  >
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                          isDark
                            ? 'bg-neutral-800/60 text-neutral-300 border-neutral-700/50'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {exp.highlights.length > 2 && (
                    <div className="mt-3 text-center">
                      <span className="text-[11px] text-cyan-500 font-semibold inline-flex items-center gap-1 hover:underline">
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            +{exp.highlights.length - 2} more details{' '}
                            <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
