import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Box } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDark }) => {
  return (
    <div className={`flex flex-col h-full p-7 rounded-2xl shadow-sm transition-all group ${
      isDark 
        ? 'bg-slate-800 border border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10' 
        : 'bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-xl transition-all duration-300 ${
          isDark 
            ? 'bg-blue-900/50 text-blue-400 group-hover:bg-blue-600 group-hover:text-white' 
            : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
        }`}>
          <Box size={24} />
        </div>
        {project.client && (
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
            isDark ? 'bg-slate-700 text-slate-400' : 'bg-slate-100 text-slate-500'
          }`}>
            {project.client}
          </span>
        )}
      </div>
      
      <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}>{project.title}</h3>
      
      <p className={`text-sm leading-relaxed mb-6 flex-grow ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {project.description}
      </p>
      
      <div className={`flex flex-wrap gap-2 mb-6 pt-4 border-t ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
        {project.tech.map((t) => (
          <span key={t} className={`text-[9px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
            isDark 
              ? 'bg-slate-700 text-slate-300 border border-slate-600' 
              : 'bg-slate-50 text-slate-500 border border-slate-100'
          }`}>
            {t}
          </span>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto">
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              isDark 
                ? 'bg-slate-700 text-white hover:bg-slate-600' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <Github size={14} />
            View on GitHub
          </a>
        )}
        {project.demoUrl && (
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        )}
        {!project.link && !project.demoUrl && (
          <div className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
            isDark ? 'bg-slate-700/50 text-slate-500' : 'bg-slate-100 text-slate-400'
          }`}>
            <Github size={14} />
            Private Project
          </div>
        )}
      </div>
    </div>
  );
};
