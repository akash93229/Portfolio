"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal, Cpu, Sparkles, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { useTrack, useTheme } from '@/components/providers';
import { PROFILE_DATA } from '@/data/profile';
import RobotHero from '@/components/RobotHero';
import ImpactStrip from '@/components/ImpactStrip';
import CinematicSmokeEntrance from '@/components/CinematicSmokeEntrance';

// Warm network early at module load so browser cache has the Spline scene ready
if (typeof window !== 'undefined') {
  try {
    fetch('https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode', {
      mode: 'cors',
    }).catch(() => {});
  } catch {
    // ignore
  }
}

export default function HomePage() {
  const { activeTrack } = useTrack();
  const { isDark } = useTheme();
  const featuredProject = PROFILE_DATA.projects.find((p) => p.featured) || PROFILE_DATA.projects[0];

  return (
    <div className="w-full relative">
      {/* Cinematic Realistic Smoke Entrance */}
      <CinematicSmokeEntrance />

      {/* 1. Robot Hero (Always dark #0A0A0A panel regardless of theme) */}
      <RobotHero activeTrack={activeTrack} />

      {/* 2. Impact Strip (Real numbers only) */}
      <ImpactStrip />

      {/* 3. Two Track Cards: Full Stack -> /projects and DevOps -> /skills */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span
            className={`text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border ${
              isDark
                ? 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60'
                : 'text-indigo-700 bg-indigo-100 border-indigo-300'
            }`}
          >
            Dual Specialization
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-heading font-bold mt-3 ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Bridging Product Engineering & Cloud Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Full Stack Card -> links to /projects */}
          <Link
            href="/projects"
            className={`group p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              isDark
                ? 'bg-neutral-900/50 border-neutral-800 hover:border-cyan-500/50 hover:bg-neutral-900'
                : 'bg-white border-neutral-200 hover:border-cyan-500/50 hover:shadow-xl'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-cyan-500">
                  Track 01
                </span>
                <span className="text-xs opacity-50">•</span>
                <span className="text-xs opacity-75">React • Node • Python • Django</span>
              </div>
              <h3
                className={`text-2xl font-bold font-heading mb-3 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                Full Stack Development
              </h3>
              <p className="text-sm leading-relaxed mb-6 opacity-80">
                End-to-end web applications with reactive frontends, resilient RESTful microservices, and dynamic routing architectures like StormLane.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-cyan-500 group-hover:translate-x-1 transition-transform">
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* DevOps Card -> links to /skills */}
          <Link
            href="/skills"
            className={`group p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
              isDark
                ? 'bg-neutral-900/50 border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-900'
                : 'bg-white border-neutral-200 hover:border-indigo-500/50 hover:shadow-xl'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-indigo-500">
                  Track 02
                </span>
                <span className="text-xs opacity-50">•</span>
                <span className="text-xs opacity-75">AWS • Docker • Terraform • CI/CD</span>
              </div>
              <h3
                className={`text-2xl font-bold font-heading mb-3 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                DevOps & Cloud Systems
              </h3>
              <p className="text-sm leading-relaxed mb-6 opacity-80">
                Automated continuous delivery pipelines, Infrastructure as Code on AWS ECS Fargate, DocumentDB modules, and 99.9% production uptime.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-500 group-hover:translate-x-1 transition-transform">
              <span>View Skills & CI/CD Visual</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Featured Project Card (StormLane) */}
      <section className="py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span
              className={`text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border ${
                isDark
                  ? 'text-amber-400 bg-amber-950/60 border-amber-800/60'
                  : 'text-amber-800 bg-amber-100 border-amber-300'
              }`}
            >
              Showcase Build
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-heading font-bold mt-3 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Featured Engineering Project
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-semibold flex items-center gap-1.5 hover:underline text-cyan-500"
          >
            <span>All 3 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div
          className={`p-8 sm:p-10 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
            isDark ? 'bg-neutral-900/70 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-neutral-800 text-cyan-400 border border-neutral-700">
                  {featuredProject.period}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/60">
                  <Sparkles className="w-3 h-3" />
                  Featured Build
                </span>
              </div>

              <h3
                className={`text-2xl sm:text-3xl font-heading font-bold ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}
              >
                {featuredProject.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-cyan-400">
                {featuredProject.tagline}
              </p>
              <p className="text-sm leading-relaxed opacity-80">
                {featuredProject.problem}
              </p>

              <div
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm leading-relaxed">
                  <strong className={isDark ? 'text-white' : 'text-neutral-900'}>
                    Outcome:{' '}
                  </strong>
                  {featuredProject.outcome}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-neutral-800/60 border border-neutral-700/60 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <Link
                href="/projects/stormlane"
                className="w-full py-3.5 px-6 rounded-full text-center text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              {featuredProject.liveUrl && (
                <a
                  href={featuredProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-full text-center text-xs font-semibold text-cyan-400 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 transition-all flex items-center justify-center gap-2"
                >
                  <span>Live App Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {featuredProject.githubUrl && (
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-full text-center text-xs font-semibold text-neutral-300 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700 transition-all flex items-center justify-center gap-2"
                >
                  <span>GitHub Repository</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing CTA Strip */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto text-center">
        <div
          className={`p-10 sm:p-14 rounded-3xl border transition-all ${
            isDark ? 'bg-[#0A0A0A] border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'
          }`}
        >
          <span
            className={`text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border ${
              isDark
                ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60'
                : 'text-emerald-700 bg-emerald-100 border-emerald-300'
            }`}
          >
            Let's Collaborate
          </span>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight mt-4 max-w-2xl mx-auto ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Ready to ship high-uptime, scalable cloud applications?
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto mt-4 opacity-80 leading-relaxed">
            Open to full-time roles, contract development, and infrastructure engagements across India and Remote.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
              Get in Touch
            </Link>
            <a
              href={PROFILE_DATA.identity.resumeUrl}
              download="Akash_Malviya_CV.pdf"
              className="px-7 py-3.5 rounded-full text-sm font-semibold border transition-all flex items-center gap-2 active:scale-95 bg-neutral-900/80 border-neutral-700 text-white hover:bg-neutral-800"
            >
              <Download className="w-4 h-4 text-neutral-400" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
