
export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  demoUrl?: string;
  period: string;
  client?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  location: string;
  description?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  status: string;
}
