"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PROFILE_DATA } from '@/data/profile';
import { ShieldCheck, Zap, TrendingDown, Clock, Layers, Award } from 'lucide-react';
import { useTheme } from '@/components/providers';

const statIcons = [
  <ShieldCheck key="uptime" className="w-5 h-5 text-emerald-500" />,
  <Zap key="deploy" className="w-5 h-5 text-cyan-500" />,
  <TrendingDown key="cost" className="w-5 h-5 text-indigo-500" />,
  <Clock key="speed" className="w-5 h-5 text-amber-500" />,
  <Layers key="provision" className="w-5 h-5 text-purple-500" />,
  <Award key="exp" className="w-5 h-5 text-teal-500" />,
];

export default function ImpactStrip() {
  const { isDark } = useTheme();
  const stats = PROFILE_DATA.impactStats;

  return (
    <section className="relative py-16 md:py-20 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className={`text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border ${
              isDark
                ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60'
                : 'text-cyan-700 bg-cyan-100 border-cyan-300'
            }`}
          >
            Verified Production Metrics
          </span>
          <h2
            className={`text-2xl sm:text-3xl font-heading font-bold mt-3 ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Proven Engineering & Cloud Infrastructure Impact
          </h2>
          <p
            className={`text-sm max-w-xl mx-auto mt-2 ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Real enterprise numbers achieved across UpScaleWebAi, Pearl Thoughts, and ITSC Technologies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className={`p-5 rounded-2xl text-center flex flex-col justify-between border transition-all duration-300 ${
                isDark
                  ? 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                  : 'bg-white/80 border-neutral-200 hover:border-neutral-300 hover:shadow-md'
              }`}
            >
              <div className="flex justify-center mb-2">{statIcons[idx]}</div>
              <div>
                <div
                  className={`text-3xl sm:text-4xl font-extrabold font-heading tracking-tight ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {stat.value}
                </div>
                <p
                  className={`text-xs font-bold mt-1 ${
                    isDark ? 'text-neutral-200' : 'text-neutral-800'
                  }`}
                >
                  {stat.label}
                </p>
                <p
                  className={`text-[11px] mt-1 leading-snug ${
                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                  }`}
                >
                  {stat.sublabel}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
