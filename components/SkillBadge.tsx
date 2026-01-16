import React from 'react';

interface SkillBadgeProps {
  skill: string;
  isDark?: boolean;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, isDark = false }) => {
  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-default shadow-sm ${
      isDark 
        ? 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-blue-600 hover:text-blue-400' 
        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
    }`}>
      {skill}
    </span>
  );
};
