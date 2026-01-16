import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Github, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent | React.UIEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? isDark 
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg' 
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className={`flex items-center gap-3 text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}
        >
          <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
            <Terminal size={18} />
          </div>
          <span className="hidden sm:inline">Akash Malviya</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`text-sm font-bold hover:text-blue-600 transition-colors uppercase tracking-widest ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          {/* GitHub Link */}
          <a 
            href="https://github.com/akash93229" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-all ${
              isDark 
                ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              isDark 
                ? 'text-yellow-400 hover:bg-slate-800' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')}
            className="px-6 py-2.5 text-xs font-black uppercase tracking-widest bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <a 
            href="https://github.com/akash93229" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`p-2 rounded-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <Github size={20} />
          </a>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${isDark ? 'text-yellow-400' : 'text-slate-600'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className={`p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 border-b shadow-2xl py-8 flex flex-col items-center gap-8 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => scrollToSection(e, link.id)} 
              className={`text-lg font-bold uppercase tracking-widest ${
                isDark ? 'text-slate-300 hover:text-blue-400' : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => scrollToSection(e, 'contact')} 
            className="w-[80%] text-center px-6 py-4 text-xs font-black uppercase tracking-widest bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20"
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};
