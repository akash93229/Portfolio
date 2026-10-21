"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme, useTrack } from '@/components/providers';
import ExperienceTimeline from '@/components/ExperienceTimeline';

// Lazy load SculptureHero with SSR disabled - mounts ONLY on /experience
const SculptureHero = dynamic(
  () => import('@/components/ui/liquid-sculpture-hero'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100svh-4.5rem)] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-neutral-700 border-t-cyan-500 animate-spin" />
      </div>
    ),
  }
);

export default function ExperiencePage() {
  const { theme } = useTheme();
  const { activeTrack } = useTrack();

  return (
    <div className="w-full">
      {/* Sculpture Hero Section: scaled and offset so headline is 100% visible at 1366x680 and 1440x900 */}
      <section className="relative w-full overflow-hidden">
        <SculptureHero
          theme={theme}
          showNav={false}
          themeToggle={false}
          showCredit={true}
          height="calc(100svh - 4.5rem)"
          sculptureScale={0.78}
          sculptureY={-10}
          eyebrow="Experience"
          headline={"Three years of\nshipping and uptime."}
          headlineAccent="shipping and uptime."
          body="Full Stack Developer and DevOps Engineer with over three years of proven expertise building web applications and running them on AWS."
          backdropText="work"
          primaryCta={{
            label: "View Timeline",
            href: "#timeline",
          }}
          secondaryCta={{
            label: "Contact Me",
            href: "/contact",
          }}
        />
      </section>

      {/* 3D Timeline Section with all 5 roles */}
      <section id="timeline" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border text-cyan-500 bg-cyan-950/40 border-cyan-800/60 inline-block">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black tracking-tight mt-3">
            Production Track Record
          </h2>
          <p className="text-sm sm:text-base opacity-75 max-w-xl mx-auto mt-2">
            Chronological engineering roles delivering high-availability cloud infrastructure and performant full-stack systems.
          </p>
        </div>

        <ExperienceTimeline activeTrack={activeTrack} />
      </section>
    </div>
  );
}
