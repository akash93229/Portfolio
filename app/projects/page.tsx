"use client";

import React from 'react';
import { useTrack, useTheme } from '@/components/providers';
import { PROFILE_DATA } from '@/data/profile';
import ProjectCard3D from '@/components/ProjectCard3D';

export default function ProjectsPage() {
  const { activeTrack } = useTrack();
  const { isDark } = useTheme();
  const projects = PROFILE_DATA.projects;

  return (
    <div className="py-12 sm:py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border text-cyan-500 bg-cyan-950/40 border-cyan-800/60 inline-block">
          Featured Engineering Work
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight">
          Production Systems & Showcase Projects
        </h1>
        <p className="text-base sm:text-lg opacity-80 leading-relaxed">
          Architectural deep dives into production systems, open-source Terraform cloud modules, and spatial full-stack applications.
        </p>
      </div>

      {/* Grid of the 3 projects with 3D tilt and glare */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard3D
            key={idx}
            project={project}
            activeTrack={activeTrack}
          />
        ))}
      </div>
    </div>
  );
}
