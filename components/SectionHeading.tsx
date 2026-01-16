import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  isDark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, isDark = false }) => {
  return (
    <div className="mb-10">
      <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {subtitle && <p className={`mt-3 text-lg font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>}
      <div className="mt-5 h-1.5 w-12 bg-blue-600 rounded-full"></div>
    </div>
  );
};
