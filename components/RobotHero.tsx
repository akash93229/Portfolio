"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Hand } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { PROFILE_DATA } from '@/data/profile';
import CursorGlow from '@/components/ui/cursor-glow';
import type { RobotFallbackRef } from '@/components/3d/RobotFallback';

const SplineScene = dynamic(() => import('@/components/ui/spline-scene'), {
  ssr: false,
});

const RobotFallback = dynamic(() => import('@/components/3d/RobotFallback'), {
  ssr: false,
});

interface RobotHeroProps {
  activeTrack: 'fullstack' | 'devops' | 'both';
}

export default function RobotHero({ activeTrack }: RobotHeroProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const [removePoster, setRemovePoster] = useState(false);
  const [hasClickedRobot, setHasClickedRobot] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const splineAppRef = useRef<any>(null);
  const fallbackRef = useRef<RobotFallbackRef>(null);

  // Start 3D right after hydration, not on idle and not on scroll
  useEffect(() => {
    setShouldLoad3D(true);
  }, []);

  // Subheadline dynamically switching with active track
  const getSubheadline = () => {
    switch (activeTrack) {
      case 'fullstack':
        return 'Full Stack Developer: React, Node, Python, Django';
      case 'devops':
        return 'DevOps & Cloud Engineer: AWS, Docker, Terraform, CI/CD';
      case 'both':
      default:
        return 'Full Stack Developer & DevOps Engineer';
    }
  };

  // 6s failsafe: if Spline fails or doesn't become interactive in 6 seconds, fallback gracefully
  useEffect(() => {
    const failsafeTimer = setTimeout(() => {
      if (!isSplineLoaded) {
        console.warn('Spline 6s timeout exceeded: silently switching to fallback');
        setUseFallback(true);
        setIsSplineLoaded(true);
      }
    }, 6000);

    return () => clearTimeout(failsafeTimer);
  }, [isSplineLoaded]);

  // Remove poster from DOM 350ms after 3D scene finishes loading
  useEffect(() => {
    if (isSplineLoaded) {
      const timer = setTimeout(() => {
        setRemovePoster(true);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isSplineLoaded]);

  // Trigger robot wave sequence (2 seconds wave, then return to idle)
  const triggerRobotWave = (partName?: string) => {
    setHasClickedRobot(true);
    setIsInteracting(true);

    if (useFallback || !splineAppRef.current) {
      if (fallbackRef.current) {
        fallbackRef.current.triggerInteraction(partName || 'wave');
      }
      setTimeout(() => setIsInteracting(false), 2200);
      return;
    }

    const app = splineAppRef.current;
    try {
      const allObjects = app.getAllObjects ? app.getAllObjects() : [];
      const lower = (partName || '').toLowerCase();

      let targetObj: any = null;
      if (lower.includes('head') || lower.includes('nod') || lower.includes('shake')) {
        targetObj = allObjects.find((o: any) => /head|neck|visor|face/i.test(o.name));
      } else if (lower.includes('arm') || lower.includes('hand') || lower.includes('wave')) {
        targetObj = allObjects.find((o: any) => /arm|hand|elbow|shoulder|forearm/i.test(o.name));
      } else if (lower.includes('torso') || lower.includes('body') || lower.includes('twist')) {
        targetObj = allObjects.find((o: any) => /torso|spine|chest|body/i.test(o.name));
      }

      if (!targetObj && partName) {
        targetObj = app.findObjectByName ? app.findObjectByName(partName) : null;
      }

      if (targetObj) {
        app.emitEvent('mouseDown', targetObj.id || targetObj.name);
      } else {
        app.emitEvent('mouseDown');
      }
    } catch (e) {
      console.warn('Spline interaction event trigger:', e);
    }

    setTimeout(() => {
      setIsInteracting(false);
    }, 2200);
  };

  // Expose active engine and trigger for inspection/testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__activeRobotEngine = useFallback ? 'fallback' : (isSplineLoaded ? 'spline' : 'loading');
      (window as any).__triggerRobotWave = triggerRobotWave;
    }
  }, [useFallback, isSplineLoaded]);

  const handleSplineLoad = (app: any) => {
    splineAppRef.current = app;
    setIsSplineLoaded(true);
    if (typeof window !== 'undefined') {
      (window as any).__splineApp = app;
      (window as any).__activeRobotEngine = 'spline';
      (window as any).__triggerRobotWave = triggerRobotWave;
    }
    try {
      const allObjects = app.getAllObjects ? app.getAllObjects() : [];
      const names = allObjects.map((o: any) => o.name);
      console.log('--- SPLINE SCENE LOADED ---');
      console.log('Scene URL: https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode');
      console.log('Total Objects in Scene:', allObjects.length);
      console.log('Object Names:', names);
    } catch (e) {
      console.log('Spline scene loaded without getAllObjects inspection', e);
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[calc(100svh-4rem)] min-h-[580px] max-h-[960px] flex items-center justify-between overflow-hidden bg-[#0A0A0A] text-white px-6 sm:px-10 lg:px-16 selection:bg-neutral-800 selection:text-white"
    >
      {/* Visually hidden button for screen readers & keyboard a11y */}
      <button
        onClick={() => triggerRobotWave('wave')}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg"
      >
        Make the robot wave
      </button>

      {/* Subtle Vignette & Dark Backing */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(circle at 70% 50%, transparent 20%, rgba(10, 10, 10, 0.45) 60%, #0A0A0A 95%)',
        }}
        aria-hidden="true"
      />

      {/* Cursor Spotlight Glow */}
      <CursorGlow />

      {/* Interactive 3D Robot Layer */}
      <div
        className="absolute inset-y-0 right-0 w-full sm:w-[58%] lg:w-[54%] z-0 flex items-center justify-end overflow-hidden pointer-events-auto"
        onClick={() => triggerRobotWave()}
      >
        <div className="w-full h-full relative flex items-center justify-center translate-y-4 sm:translate-y-8 lg:translate-y-10 scale-[1.05] sm:scale-100">
          {/* Instant Robot Poster for < 1s LCP & First Paint */}
          {!removePoster && (
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                isSplineLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Image
                src="/robot-poster.webp"
                alt="Akash Malviya - Interactive 3D Robot"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 58vw, 54vw"
                className="object-contain object-right"
              />
            </div>
          )}

          {/* Interactive 3D Canvas with 300ms Crossfade */}
          <div
            className={`w-full h-full transition-opacity duration-300 ${
              isSplineLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {shouldLoad3D && (
              !useFallback ? (
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  onLoad={handleSplineLoad}
                  onSplineMouseDown={(e) => {
                    const targetName = e?.target?.name || 'robot';
                    console.log('Spline onMouseDown target:', targetName);
                    triggerRobotWave(targetName);
                  }}
                  onError={(err) => {
                    console.warn(
                      'Spline load failed, switching to R3F procedural robot fallback',
                      err
                    );
                    setUseFallback(true);
                    setIsSplineLoaded(true);
                  }}
                />
              ) : (
                <RobotFallback
                  ref={fallbackRef}
                  onPartClick={(part) => {
                    triggerRobotWave(part);
                  }}
                />
              )
            )}
          </div>

          {/* "Click the robot" Pulse Pill */}
          <AnimatePresence>
            {!hasClickedRobot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute top-1/4 right-8 sm:right-16 z-30 pointer-events-none"
              >
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl shadow-black/50 animate-bounce">
                  <Hand className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Click the robot</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Left Column Copy & CTAs */}
      <div className="max-w-7xl w-full mx-auto relative z-20 pointer-events-none">
        <div className="max-w-xl lg:max-w-2xl space-y-5 sm:space-y-6">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-900/90 border border-neutral-800 text-neutral-300 backdrop-blur-md shadow-sm pointer-events-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open to roles in India & Remote</span>
          </motion.div>

          {/* Heading with White-to-Gray Gradient */}
          <div className="space-y-2 sm:space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-heading tracking-tight leading-[0.95]"
            >
              <span className="bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-400 bg-clip-text text-transparent block">
                Akash
              </span>
              <span className="bg-gradient-to-b from-neutral-100 via-neutral-300 to-neutral-500 bg-clip-text text-transparent block">
                Malviya
              </span>
            </motion.h1>

            {/* Sub-headline Switching with Track Toggle */}
            <motion.p
              key={activeTrack}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-base sm:text-lg lg:text-xl font-bold font-heading text-neutral-200 tracking-tight"
            >
              {getSubheadline()}
            </motion.p>
          </div>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-sm lg:text-base text-neutral-300 leading-relaxed max-w-lg font-normal"
          >
            3+ years building web applications and running them on AWS. 60% faster deployments, 30% lower cloud cost, 99.9% uptime.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3.5 pt-1 pointer-events-auto"
          >
            <Link
              href="/projects"
              className="px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-black bg-white hover:bg-neutral-200 transition-all flex items-center gap-2 active:scale-95 shadow-lg shadow-white/5"
            >
              <span>View work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={PROFILE_DATA.identity.resumeUrl}
              download="Akash_Malviya_CV.pdf"
              className="px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 transition-all flex items-center gap-2 active:scale-95 shadow-md"
            >
              <Download className="w-4 h-4 text-neutral-400" />
              <span>Download CV</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
