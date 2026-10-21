import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PROFILE_DATA } from '@/data/profile';
import {
  GraduationCap,
  Award,
  Cpu,
  Sparkles,
  ArrowRight,
  Download,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  UserCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | Akash Malviya',
  description:
    'Background, education (Truba RGPV, CGPA 7.8/10), professional cloud training (Jetking AWS, Docker, Kubernetes, Terraform), and AI-assisted development approach of Akash Malviya.',
  openGraph: {
    title: 'About Akash Malviya | Full Stack Developer & DevOps Engineer',
    description:
      'Learn about Akash Malviya’s background, engineering philosophy, RGPV education, cloud certifications, and AI-assisted workflow.',
  },
};

export default function AboutPage() {
  const { identity, education, training } = PROFILE_DATA;

  return (
    <div className="py-12 sm:py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      {/* Top Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border text-cyan-400 bg-cyan-950/60 border-cyan-800/60 inline-block">
          Profile & Background
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight">
          Engineering reliable web systems and automated cloud delivery.
        </h1>
        <p className="text-base sm:text-lg opacity-80 leading-relaxed">
          {identity.summary}
        </p>
      </div>

      {/* Main Grid: Narrative + Photo Slot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-3xl p-8 border bg-card/60 backdrop-blur-md border-border space-y-6">
            <h2 className="text-2xl font-bold font-heading">
              Engineering Philosophy
            </h2>
            <p className="text-sm sm:text-base leading-relaxed opacity-85">
              Over the last 3+ years, I have worked across fast-moving startups and product teams including UpScaleWebAi, Pearl Thoughts, and ITSC Technologies. My dual focus across full-stack engineering and cloud infrastructure ensures that code written in application repositories runs predictably, scalably, and cost-effectively in production.
            </p>
            <p className="text-sm sm:text-base leading-relaxed opacity-85">
              From architecting zero-downtime Blue/Green deployments on AWS ECS Fargate with Terraform, to engineering intelligent spatial and temporal routing engines like StormLane, I prioritize developer velocity, system observability, and rock-solid uptime.
            </p>

            <div className="pt-4 border-t border-border flex flex-wrap gap-4 text-xs font-mono opacity-80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bhopal, India (Open to Relocation & Remote)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>3+ Years Production Experience</span>
              </div>
            </div>
          </div>

          {/* AI-Assisted Development Note */}
          <div className="rounded-3xl p-8 border bg-card/60 backdrop-blur-md border-border space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                AI-Assisted Development Note
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed opacity-85">
              I actively integrate advanced AI coding tools (Claude 3.7 / 3.5 Sonnet, GitHub Copilot, Cursor) into my engineering workflow to accelerate architectural planning, generate comprehensive test matrices, automate repetitive boilerplate, and conduct shift-left code reviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl border border-border bg-background/50 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Architectural planning with Claude</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-background/50 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Fast iteration with Copilot & Cursor</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-background/50 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Automated test suite generation</span>
              </div>
              <div className="p-3 rounded-xl border border-border bg-background/50 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Human-verified production security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Photo Slot + Quick Stats (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Profile Photo TODO Slot */}
          <div className="rounded-3xl p-8 border bg-card/60 backdrop-blur-md border-border text-center space-y-4 relative overflow-hidden">
            <div className="w-36 h-36 mx-auto rounded-2xl bg-neutral-800/80 border-2 border-dashed border-neutral-600 flex flex-col items-center justify-center p-4 text-neutral-400 relative group">
              <UserCheck className="w-10 h-10 mb-2 opacity-60" />
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                Photo Slot
              </span>
              <span className="text-[10px] opacity-60">Akash Malviya</span>
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading">{identity.name}</h3>
              <p className="text-xs font-mono text-cyan-400 mt-1">
                Full Stack Developer & DevOps Engineer
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={identity.resumeUrl}
                download="Akash_Malviya_CV.pdf"
                className="px-4 py-2 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </a>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-full text-xs font-semibold border border-border hover:bg-muted transition-all"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Education Card */}
          <div className="rounded-3xl p-8 border bg-card/60 backdrop-blur-md border-border space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-heading">Education</h2>
            </div>
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1.5 pt-2">
                <h3 className="text-base font-semibold">{edu.degree}</h3>
                <p className="text-xs opacity-75">{edu.institution}</p>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="opacity-60">{edu.period} • {edu.location}</span>
                  <span className="font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
                    {edu.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Training Badges */}
          <div className="rounded-3xl p-8 border bg-card/60 backdrop-blur-md border-border space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold font-heading">Training & Certifications</h2>
            </div>
            <div className="space-y-3 pt-2">
              {training.map((t, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-border bg-background/50 flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold">{t.name}</h4>
                    <p className="text-[11px] opacity-70">{t.issuer}</p>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-1 rounded-full border shrink-0 ${
                      t.status === 'Completed'
                        ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60'
                        : 'text-amber-400 bg-amber-950/60 border-amber-800/60'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
