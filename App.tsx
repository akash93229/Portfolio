import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SectionHeading } from './components/SectionHeading';
import { ExperienceItem } from './components/ExperienceItem';
import { ProjectCard } from './components/ProjectCard';
import { SkillBadge } from './components/SkillBadge';
import { EXPERIENCES, PROJECTS, SKILL_GROUPS, EDUCATION, CERTIFICATIONS, KEY_ACHIEVEMENTS } from './constants';
import { Github, Linkedin, Mail, Download, ArrowRight, Cloud, Terminal, Phone, CheckCircle2, AlertCircle, Loader2, Code2, Cpu, GraduationCap, Award, Check, ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark';
    }
    return false;
  });

  // Form State
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Theme Effect
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const scrollToSection = (e: React.MouseEvent | React.UIEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { firstName: '', lastName: '', email: '', message: '' };

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // @ts-ignore
      const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:8000/api/v1';
      const response = await fetch(`${apiUrl}/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      setSubmitStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDownloadResume = () => {
    const resumeUrl = "/Akash_Malviya_Resume.pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Akash_Malviya_DevOps_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className={`relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-50/50'}`}>
        {/* Animated Background Elements */}
        <div className={`absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] rounded-full blur-[100px] animate-pulse ${isDark ? 'bg-blue-900/40' : 'bg-blue-100/60'}`}></div>
        <div className={`absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full blur-[100px] ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-100/50'}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 ${isDark ? 'bg-purple-600' : 'bg-purple-200'}`}></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 animate-slide-up order-2 md:order-1 relative z-10">
            {/* Stylish Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider animate-bounce ${isDark ? 'bg-gradient-to-r from-blue-900/50 to-indigo-900/50 text-blue-400 border border-blue-700/50 shadow-lg shadow-blue-900/20' : 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-200 shadow-lg shadow-blue-100'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Available for Hire</span>
            </div>
            
            {/* Stylish Name with Gradient - Single Line */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="inline-block hover:scale-105 transition-transform duration-300">Akash</span>{' '}
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300">Malviya</span>
            </h1>
            
            {/* Role with Animated Underline */}
            <div className="space-y-4">
              <div className="relative inline-block">
                <p className={`text-xl md:text-2xl font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  DevOps Engineer <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>|</span> Cloud Infrastructure Specialist
                </p>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full"></div>
              </div>
              <p className={`text-lg max-w-lg leading-relaxed font-normal mt-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Results-driven DevOps Engineer with <span className="font-bold text-blue-500">2+ years</span> of hands-on experience architecting cloud-native solutions, automating CI/CD pipelines, and optimizing infrastructure for enterprise-scale applications.
              </p>
            </div>
            
            {/* Buttons with Gradient */}
            <div className="flex flex-wrap gap-4">
              <button onClick={(e) => scrollToSection(e, 'projects')} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 transition-all active:scale-95 flex items-center gap-3 hover:-translate-y-1">
                View Projects <ArrowRight size={18} />
              </button>
              <button onClick={handleDownloadResume} className={`px-8 py-4 font-bold rounded-xl transition-all active:scale-95 flex items-center gap-3 hover:-translate-y-1 ${isDark ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600' : 'bg-white text-slate-900 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg shadow-sm'}`}>
                <Download size={18} /> Download Resume
              </button>
            </div>
            
            {/* Social Links with Hover Effects */}
            <div className="flex items-center gap-4 pt-4">
              <a href="https://www.linkedin.com/in/akash-malviya-47069216a" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-600 hover:bg-blue-900/30 hover:shadow-blue-900/20' : 'bg-white border-2 border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:shadow-blue-100 shadow-sm'}`} aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/akash93229" target="_blank" rel="noopener noreferrer" className={`p-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700 hover:shadow-slate-900/20' : 'bg-white border-2 border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-400 hover:shadow-slate-200 shadow-sm'}`} aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="mailto:akashpasay567@gmail.com" className={`p-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-600 hover:bg-red-900/30 hover:shadow-red-900/20' : 'bg-white border-2 border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-300 hover:shadow-red-100 shadow-sm'}`} aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          {/* Enhanced Image Card with Glowing Border */}
          <div className="order-1 md:order-2 flex justify-center items-center animate-fade-in">
            <div className="relative group">
              {/* Animated Gradient Glow */}
              <div className={`absolute -inset-4 rounded-[32px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60 blur-2xl group-hover:opacity-80 transition-all duration-700 animate-pulse ${isDark ? '' : 'opacity-40 group-hover:opacity-60'}`}></div>
              
              {/* Rotating Background Cards */}
              <div className={`absolute inset-0 rounded-3xl rotate-6 scale-105 group-hover:rotate-12 transition-all duration-700 ease-out ${isDark ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-gradient-to-br from-blue-400 to-indigo-400'}`}></div>
              <div className={`absolute inset-0 rounded-3xl -rotate-6 scale-105 group-hover:-rotate-12 transition-all duration-700 ease-out ${isDark ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gradient-to-br from-indigo-400 to-purple-400'}`}></div>
              
              {/* Main Image Container */}
              <div className={`relative w-[280px] h-[350px] md:w-[340px] md:h-[420px] overflow-hidden rounded-2xl border-4 shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-3xl ${isDark ? 'border-slate-700 bg-slate-800 shadow-blue-900/30' : 'border-white bg-slate-200 shadow-blue-200/50'}`}>
                {/* Gradient Overlay on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                
                <img src="/Akash.png" alt="Akash Malviya" className="w-full h-full object-cover grayscale-[5%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500/1e293b/ffffff?text=Akash+Malviya"; }} />
                
                {/* Stylish Badges on Image */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 z-20">
                  <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white border border-white/20">
                    <Code2 size={14} /><span>DevOps Architect</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white border border-white/20">
                    <Cpu size={14} /><span>Cloud Specialist</span>
                  </div>
                </div>
                
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 z-20">
                  <div className={`p-2 rounded-lg backdrop-blur-md ${isDark ? 'bg-slate-900/80 border border-slate-700' : 'bg-white/80 border border-slate-200'}`}>
                    <Cloud size={20} className="text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Professional Summary */}
      <section id="about" className={`py-24 px-6 border-y relative overflow-hidden ${isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-white border-slate-100'}`}>
        {/* Decorative Background Elements */}
        <div className={`absolute top-10 right-10 w-72 h-72 rounded-full blur-[120px] opacity-30 ${isDark ? 'bg-blue-600' : 'bg-blue-200'}`}></div>
        <div className={`absolute bottom-10 left-10 w-56 h-56 rounded-full blur-[100px] opacity-20 ${isDark ? 'bg-indigo-600' : 'bg-indigo-200'}`}></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Stylish Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 ${isDark ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
              <Terminal size={14} />
              <span>About Me</span>
            </div>
            <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Professional <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">Summary</span>
            </h2>
            <div className={`w-24 h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500`}></div>
          </div>

          {/* Main Content Card */}
          <div className={`relative p-8 md:p-10 rounded-3xl ${isDark ? 'bg-slate-900/80 border border-slate-700/50 shadow-2xl shadow-blue-900/10' : 'bg-white border border-slate-200 shadow-xl shadow-slate-200/50'}`}>
            {/* Gradient Border Accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-10"></div>
            <div className={`absolute inset-[1px] rounded-3xl ${isDark ? 'bg-slate-900' : 'bg-white'}`}></div>
            
            <div className="relative z-10 space-y-8">
              {/* Opening Statement */}
              <div className="text-center">
                <p className={`text-2xl md:text-3xl font-light leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  I <span className="font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">architect</span>, <span className="font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">automate</span>, and <span className="font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">optimize</span>
                </p>
                <p className={`text-lg mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>cloud infrastructure that scales.</p>
              </div>

              {/* Divider */}
              <div className={`flex items-center gap-4 ${isDark ? 'text-slate-700' : 'text-slate-200'}`}>
                <div className="flex-1 h-px bg-current"></div>
                <Cloud size={20} className="text-blue-500" />
                <div className="flex-1 h-px bg-current"></div>
              </div>

              {/* Core Description */}
              <div className={`space-y-6 text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  As a <span className={`font-bold px-2 py-0.5 rounded-md ${isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>DevOps Engineer</span> with <span className="font-bold text-blue-500">2+ years</span> of hands-on experience, I specialize in transforming complex infrastructure challenges into elegant, automated solutions that drive real business value.
                </p>
                <p>
                  My toolkit spans the modern DevOps ecosystem — from <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>AWS cloud services</span> (ECS, Fargate, ECR, CloudWatch) to <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>containerization with Docker</span>, <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>CI/CD automation</span> via GitHub Actions & Jenkins, and <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Infrastructure as Code</span> with Terraform.
                </p>
              </div>

              {/* Impact Metrics */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className={`text-center p-4 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">60%</div>
                  <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Faster Deploys</p>
                </div>
                <div className={`text-center p-4 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">30%</div>
                  <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Cost Savings</p>
                </div>
                <div className={`text-center p-4 rounded-2xl ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">0</div>
                  <p className={`text-xs font-bold uppercase tracking-wider mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Downtime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="mt-12">
            <h3 className={`text-sm font-bold uppercase tracking-widest text-center mb-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              ✨ Key Achievements
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {KEY_ACHIEVEMENTS.map((achievement, idx) => (
                <div key={idx} className={`group flex gap-4 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${isDark ? 'bg-slate-800/50 border border-slate-700/50 hover:border-blue-700/50 hover:bg-slate-800' : 'bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg shadow-sm'}`}>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isDark ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/30' : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/20'}`}>
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <span className={`font-medium leading-relaxed ${isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-700 group-hover:text-slate-900'}`}>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`py-24 px-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50/30'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Technical Arsenal" subtitle="Core competencies and tools listed in my resume." isDark={isDark} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {SKILL_GROUPS.map((group) => (
              <div key={group.category} className={`p-8 rounded-2xl shadow-sm transition-all hover:shadow-md ${isDark ? 'bg-slate-800 border border-slate-700 hover:border-blue-700' : 'bg-white border border-slate-200 hover:border-blue-300'}`}>
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-6">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} isDark={isDark} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-24 px-6 border-y ${isDark ? 'bg-slate-800/50 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Work Experience" subtitle="A detailed timeline of my professional roles and impact." isDark={isDark} />
          <div className="mt-16">
            {EXPERIENCES.map((exp, idx) => (
              <ExperienceItem key={idx} experience={exp} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-24 px-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50/30'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Key Projects" subtitle="Showcasing my work in automation, IaC, and cloud orchestration." isDark={isDark} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={idx} project={project} isDark={isDark} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="https://github.com/akash93229" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all ${isDark ? 'bg-slate-800 text-white border border-slate-700 hover:border-slate-600' : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm'}`}>
              <Github size={20} /> View All Projects on GitHub <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className={`py-24 px-6 ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <SectionHeading title="Education" isDark={isDark} />
            <div className="space-y-8 mt-10">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className={`relative pl-10 border-l-2 ${isDark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-blue-600 ${isDark ? 'bg-slate-900' : 'bg-white'}`}></div>
                  <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{edu.degree}</h4>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold mt-1">
                    <GraduationCap size={16} /><span>{edu.school}</span>
                  </div>
                  <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{edu.period} | {edu.location}</p>
                  <p className={`mt-3 font-light leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Certifications" isDark={isDark} />
            <div className="space-y-4 mt-10">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className={`flex items-center gap-5 p-5 rounded-2xl ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-slate-50 border border-slate-100'}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 shadow-sm ${isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-slate-100'}`}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cert.name}</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{cert.issuer} • <span className={cert.status === 'In Progress' ? 'text-amber-500 font-bold' : 'text-emerald-500 font-bold'}>{cert.status}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 px-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50/50'}`}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Let's Connect" subtitle="Ready to optimize your cloud infrastructure. Let's talk!" isDark={isDark} />
          
          <div className="grid lg:grid-cols-5 gap-12 mt-12">
            {/* Contact Info - Smaller Column */}
            <div className="lg:col-span-2 space-y-4">
              <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:shadow-md shadow-sm'}`}>
                <div className={`p-3 rounded-xl transition-all ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Mail size={22} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Email</p>
                  <a href="mailto:akashpasay567@gmail.com" className={`text-sm font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>akashpasay567@gmail.com</a>
                </div>
              </div>
              <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:shadow-md shadow-sm'}`}>
                <div className={`p-3 rounded-xl transition-all ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Phone size={22} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Phone</p>
                  <a href="tel:+919753072646" className={`text-sm font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>+91 97530-72646</a>
                </div>
              </div>
              <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:shadow-md shadow-sm'}`}>
                <div className={`p-3 rounded-xl transition-all ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Linkedin size={22} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>LinkedIn</p>
                  <a href="https://www.linkedin.com/in/akash-malviya-47069216a" target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>akash-malviya</a>
                </div>
              </div>
              <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white hover:shadow-md shadow-sm'}`}>
                <div className={`p-3 rounded-xl transition-all ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                  <Github size={22} />
                </div>
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>GitHub</p>
                  <a href="https://github.com/akash93229" target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold hover:text-blue-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>akash93229</a>
                </div>
              </div>
            </div>

            {/* Contact Form - Larger Column */}
            <div className="lg:col-span-3">
              <div className="relative group">
                {/* Gradient Border Glow */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-50 blur-sm group-hover:opacity-70 group-hover:blur-md transition-all duration-500 ${isDark ? 'opacity-40' : 'opacity-30'}`}></div>
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-60 ${isDark ? 'opacity-50' : 'opacity-40'}`}></div>
                
                <div className={`relative p-8 md:p-10 rounded-2xl transition-all ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                  {/* Form Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Send a <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Message</span>
                      </h3>
                      <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>I'll respond within 24 hours</p>
                    </div>
                    <div className={`p-3 rounded-xl ${isDark ? 'bg-gradient-to-br from-blue-600/20 to-indigo-600/20 text-blue-400' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600'}`}>
                      <Mail size={24} />
                    </div>
                  </div>

                  {submitStatus === 'success' ? (
                    <div className="py-16 text-center space-y-4">
                      <div className={`inline-flex items-center justify-center p-5 rounded-full ${isDark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Message Sent!</h3>
                      <p className={`text-sm max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Thank you for reaching out. I'll review your message and get back to you within 24 hours.</p>
                      <button onClick={() => setSubmitStatus('idle')} className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all">
                        Send Another Message
                      </button>
                    </div>
                  ) : submitStatus === 'error' ? (
                    <div className="py-16 text-center space-y-4">
                      <div className={`inline-flex items-center justify-center p-5 rounded-full ${isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
                        <AlertCircle size={48} />
                      </div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Something Went Wrong</h3>
                      <p className={`text-sm max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Please try again or contact me directly via email.</p>
                      <button onClick={() => setSubmitStatus('idle')} className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all">
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>First Name</label>
                          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDark ? `bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 hover:border-slate-600 ${errors.firstName ? 'border-red-500' : ''}` : `bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 ${errors.firstName ? 'border-red-400' : ''}`}`} />
                          {errors.firstName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.firstName}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Last Name</label>
                          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDark ? `bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 hover:border-slate-600 ${errors.lastName ? 'border-red-500' : ''}` : `bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 ${errors.lastName ? 'border-red-400' : ''}`}`} />
                          {errors.lastName && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.lastName}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${isDark ? `bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 hover:border-slate-600 ${errors.email ? 'border-red-500' : ''}` : `bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 ${errors.email ? 'border-red-400' : ''}`}`} />
                        {errors.email && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Message</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell me about your project or inquiry..." className={`w-full px-4 py-3.5 rounded-xl border-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none ${isDark ? `bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 hover:border-slate-600 ${errors.message ? 'border-red-500' : ''}` : `bg-slate-50/50 border-slate-200 text-slate-900 placeholder:text-slate-400 hover:border-slate-300 ${errors.message ? 'border-red-400' : ''}`}`}></textarea>
                        {errors.message && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12} /> {errors.message}</p>}
                      </div>
                      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-base hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isSubmitting ? (<><Loader2 className="animate-spin" size={20} /> Sending Message...</>) : (<><Mail size={20} /> Send Message</>)}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 px-6 ${isDark ? 'bg-black' : 'bg-slate-900'} text-white`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 text-2xl font-bold justify-center md:justify-start mb-2">
              <Terminal className="text-blue-400" />
              Akash Malviya
            </div>
            <p className="text-slate-400 text-sm font-light">Cloud Native & DevOps Engineering Specialist</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/akash93229" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/akash-malviya-47069216a" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={22} />
            </a>
            <a href="mailto:akashpasay567@gmail.com" className="text-slate-400 hover:text-white transition-colors">
              <Mail size={22} />
            </a>
          </div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-slate-400 hover:text-white transition-colors">About</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="text-slate-400 hover:text-white transition-colors">Work</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-slate-400 hover:text-white transition-colors">Projects</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Akash Malviya. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
