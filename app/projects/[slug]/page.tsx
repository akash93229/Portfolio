import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Server,
  Zap,
} from 'lucide-react';
import { PROJECTS_BY_SLUG, getAllProjectSlugs } from '@/data/projects-map';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_BY_SLUG[slug];

  if (!project) {
    return {
      title: 'Project Not Found | Akash Malviya',
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: `${project.tagline}. Architectural problem, Akash Malviya's role, technology stack, and verified outcomes.`,
    openGraph: {
      title: `${project.title} | Akash Malviya Case Study`,
      description: project.problem,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS_BY_SLUG[slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-16 px-6 lg:px-12 max-w-5xl mx-auto space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border border-border hover:bg-muted transition-colors opacity-80 hover:opacity-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono px-3 py-1 rounded-md bg-neutral-800 text-cyan-400 border border-neutral-700">
            {project.period}
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-neutral-800 text-neutral-300">
            {project.track === 'both' ? 'Full Stack + DevOps' : project.track.toUpperCase()}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Build
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl font-medium text-cyan-500">
          {project.tagline}
        </p>
      </div>

      {/* Action Links Bar */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-black flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <span>Live Application</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold border border-border hover:bg-muted flex items-center gap-2 transition-all active:scale-95"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
        )}
      </div>

      {/* Problem & Role Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md space-y-3">
          <div className="flex items-center gap-2 text-cyan-500">
            <Zap className="w-5 h-5" />
            <h2 className="text-lg font-bold font-heading">The Challenge / Problem</h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed opacity-85">
            {project.problem}
          </p>
        </div>

        <div className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md space-y-3">
          <div className="flex items-center gap-2 text-indigo-500">
            <Server className="w-5 h-5" />
            <h2 className="text-lg font-bold font-heading">My Architectural Role</h2>
          </div>
          <p className="text-sm sm:text-base leading-relaxed opacity-85">
            {project.role}
          </p>
        </div>
      </div>

      {/* Outcome Section */}
      <div className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
          <h2 className="text-xl font-bold font-heading">Proven Outcome</h2>
        </div>
        <p className="text-base sm:text-lg leading-relaxed font-medium">
          {project.outcome}
        </p>

        {/* Verified Metrics Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-emerald-500/20">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="opacity-90">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Description */}
      <div className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md space-y-4">
        <h2 className="text-xl font-bold font-heading">System Architecture Overview</h2>
        <p className="text-sm sm:text-base leading-relaxed opacity-85">
          {project.description}
        </p>
      </div>

      {/* Full Tech Stack */}
      <div className="p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold font-heading">Technologies & Tooling</h2>
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs sm:text-sm px-3.5 py-1.5 rounded-xl bg-neutral-800/80 border border-neutral-700 font-mono text-cyan-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA to next projects */}
      <div className="pt-8 border-t border-border flex items-center justify-between">
        <Link
          href="/projects"
          className="text-sm font-semibold flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Projects</span>
        </Link>
        <Link
          href="/contact"
          className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          Discuss this project
        </Link>
      </div>
    </div>
  );
}
