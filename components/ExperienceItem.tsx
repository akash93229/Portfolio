import React from 'react';
import { Experience } from '../types';
import { Calendar, MapPin, Building2 } from 'lucide-react';

interface ExperienceItemProps {
  experience: Experience;
  isDark?: boolean;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isDark = false }) => {
  return (
    <div className={`relative pl-10 pb-12 border-l-2 last:border-0 last:pb-0 ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
      {/* Dot indicator */}
      <div className={`absolute -left-[9px] top-1.5 w-4 h-4 border-2 border-blue-600 rounded-full z-10 shadow-sm shadow-blue-500/20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}></div>
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-3">
        <div>
          <h3 className={`text-xl font-black leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>{experience.role}</h3>
          <div className="flex items-center gap-2 text-blue-600 font-bold mt-2.5">
            <Building2 size={16} />
            <span className="text-sm">{experience.company}</span>
          </div>
        </div>
        <div className={`flex flex-col items-start md:items-end gap-2 text-xs font-bold ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          <span className={`flex items-center gap-2 px-3 py-1.5 rounded-lg shadow-sm ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-400' : 'bg-slate-50 border border-slate-100 text-slate-500'}`}>
            <Calendar size={12} className="text-blue-500" />
            {experience.duration}
          </span>
          <span className="flex items-center gap-2 px-2">
            <MapPin size={12} />
            {experience.location}
          </span>
        </div>
      </div>
      
      <ul className={`space-y-4 list-none text-base font-normal leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {experience.bullets.map((bullet, idx) => (
          <li key={idx} className="flex gap-4 items-start">
            <span className="mt-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 opacity-40"></span>
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
};
