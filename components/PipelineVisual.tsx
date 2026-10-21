import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Server,
  Cpu,
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

const stageIcons: Record<string, React.ReactNode> = {
  'stage-1': <Terminal className="w-5 h-5" />,
  'stage-2': <ShieldCheck className="w-5 h-5" />,
  'stage-3': <Layers className="w-5 h-5" />,
  'stage-4': <Server className="w-5 h-5" />,
  'stage-5': <Cpu className="w-5 h-5" />,
  'stage-6': <Activity className="w-5 h-5" />,
};

export default function PipelineVisual() {
  const stages = PROFILE_DATA.pipelineStages;
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '$ git push origin main [deploy: v2.4.0-prod]',
    '✓ Pre-commit hooks passed (ESLint, Prettier, TypeScript 100% strict)',
    '✓ GitHub Actions runner initiated [ubuntu-latest ephemeral]',
  ]);

  const currentStage = stages[activeStageIndex];

  // Pipeline simulation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setTimeout(() => {
        if (activeStageIndex < stages.length - 1) {
          const nextIndex = activeStageIndex + 1;
          setActiveStageIndex(nextIndex);
          setTerminalLogs((prev) => [
            ...prev,
            `→ Executing Stage ${stages[nextIndex].stageNumber}: ${stages[nextIndex].title}`,
            `$ ${stages[nextIndex].command}`,
            `✓ Status: PASSED [${stages[nextIndex].metrics}]`,
          ]);
        } else {
          setIsRunning(false);
          setTerminalLogs((prev) => [
            ...prev,
            '★ BLUE/GREEN DEPLOYMENT COMPLETED: Zero downtime, 99.9% uptime maintained.',
          ]);
        }
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [isRunning, activeStageIndex, stages]);

  const handleStartPipeline = () => {
    setActiveStageIndex(0);
    setTerminalLogs([
      '$ git push origin main [deploy: v2.4.0-prod]',
      '✓ Pre-commit hooks passed (ESLint, Prettier, TypeScript 100% strict)',
      '→ Starting automated CI/CD pipeline on AWS ECS Fargate...',
    ]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStageIndex(0);
    setTerminalLogs([
      '$ pipeline reset to stage 01',
      'Ready for automated execution.',
    ]);
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-slate-800 p-6 md:p-8 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Zero-Downtime Blue/Green Pipeline
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-white">
            AWS ECS Fargate & GitHub Actions Pipeline
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Modeled directly from enterprise production architecture at Pearl Thoughts & UpScaleWebAi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartPipeline}
            disabled={isRunning}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs md:text-sm flex items-center gap-2 transition-all ${
              isRunning
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 active:scale-95'
            }`}
          >
            <Play className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Deploying...' : 'Simulate Pipeline Run'}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all active:scale-95"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pipeline Stages Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8 relative z-10">
        {stages.map((stage, idx) => {
          const isCurrent = idx === activeStageIndex;
          const isPassed = idx < activeStageIndex;
          return (
            <button
              key={stage.id}
              onClick={() => {
                setIsRunning(false);
                setActiveStageIndex(idx);
              }}
              className={`p-3.5 rounded-xl text-left transition-all border relative flex flex-col justify-between ${
                isCurrent
                  ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50 -translate-y-1'
                  : isPassed
                  ? 'bg-slate-900/80 border-emerald-500/40 text-slate-300 hover:bg-slate-850'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:bg-slate-850/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-mono font-bold ${
                    isCurrent
                      ? 'text-cyan-400'
                      : isPassed
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  {stage.stageNumber}
                </span>
                <span
                  className={`p-1 rounded-md ${
                    isCurrent
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {stageIcons[stage.id]}
                </span>
              </div>
              <div>
                <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {stage.title}
                </p>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{stage.subtitle}</p>
              </div>

              {isPassed && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 absolute top-2 right-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card & Live Terminal */}
      <div className="grid lg:grid-cols-12 gap-6 relative z-10">
        {/* Left: Active Stage Details */}
        <div className="lg:col-span-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
                Stage {currentStage.stageNumber}: {currentStage.subtitle}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {currentStage.metrics}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">{currentStage.title}</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {currentStage.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">
                Integrated Toolchain:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentStage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block mb-1">
              Command line execution:
            </span>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-cyan-400 border border-slate-800 overflow-x-auto">
              $ {currentStage.command}
            </div>
          </div>
        </div>

        {/* Right: Simulated Real-Time Console Terminal */}
        <div className="lg:col-span-6 rounded-xl bg-[#07090E] border border-slate-800 overflow-hidden flex flex-col">
          {/* Terminal Title Bar */}
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">github-runner-01.aws.internal</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Live CI Telemetry
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-xs text-slate-300 h-64 overflow-y-auto space-y-2 bg-[#05060A]/90">
            {terminalLogs.map((log, i) => (
              <div
                key={i}
                className={`${
                  log.startsWith('★')
                    ? 'text-emerald-400 font-bold bg-emerald-950/30 p-2 rounded border border-emerald-900/50'
                    : log.startsWith('✓')
                    ? 'text-emerald-300'
                    : log.startsWith('$')
                    ? 'text-cyan-400'
                    : 'text-slate-400'
                }`}
              >
                {log}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
                <span className="inline-block w-2 h-4 bg-cyan-400" />
                <span>Running step execution...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
