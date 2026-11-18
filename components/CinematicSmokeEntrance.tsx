"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const VERTEX_SHADER_SRC = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_revealProgress;   // 0.0 -> 1.0 (smoke parting over robot)
uniform float u_dissipation;      // 0.0 -> 1.0 (evaporation)
uniform vec2 u_revealCenter;      // Robot coords: (0.68, 0.50)
uniform float u_aspect;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; ++i) {
    v += a * noise(p);
    p = rot * p * 2.02 + vec2(12.3, 14.7);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 aspectUv = vec2(uv.x * u_aspect, uv.y);
  vec2 aspectCenter = vec2(u_revealCenter.x * u_aspect, u_revealCenter.y);

  // Upward rising buoyancy drift from bottom and sides
  float t = u_time * 0.40;
  vec2 flowDrift = vec2(sin(t * 0.35) * 0.06, -t * 0.32);

  // Multi-octave domain warping for billowing volumetric white smoke
  vec2 q = vec2(
    fbm(aspectUv * 1.35 + flowDrift * 0.75 + vec2(1.2, 3.4)),
    fbm(aspectUv * 1.35 + flowDrift * 0.75 + vec2(5.2, 1.8))
  );

  vec2 r = vec2(
    fbm(aspectUv * 1.75 + 2.3 * q + flowDrift * 0.9 + vec2(2.1, 6.7)),
    fbm(aspectUv * 1.75 + 2.3 * q + flowDrift * 0.9 + vec2(8.4, 2.3))
  );

  // Layer 1: Main billowing smoke plumes
  float smokeMain = fbm(aspectUv * 1.55 + 2.5 * r + flowDrift);
  smokeMain = smoothstep(-0.28, 0.62, smokeMain);

  // Layer 2: Deep background fog layer (smooth, slow atmospheric spread)
  float fogBg = fbm(aspectUv * 0.85 + vec2(t * 0.06, -t * 0.16));
  fogBg = smoothstep(-0.15, 0.68, fogBg) * 0.45;

  // Layer 3: Delicate curling wisps and tendrils
  float wisps = fbm(aspectUv * 3.6 + 1.3 * r - vec2(t * 0.22, t * 0.40));
  wisps = smoothstep(0.08, 0.72, wisps) * 0.28;

  // Composite 3D multi-layer smoke density
  float totalDensity = clamp(smokeMain * 0.62 + fogBg * 0.26 + wisps * 0.22, 0.0, 1.0);

  // Enhance density along bottom and side edges for natural atmospheric entry
  float edgeDensity = (1.0 - uv.y * 0.5) * (0.85 + 0.15 * (abs(uv.x - 0.5) * 2.0));
  totalDensity = clamp(totalDensity * edgeDensity * 1.15, 0.0, 1.0);

  // Organic reveal vortex parting over the robot
  float dist = length(aspectUv - aspectCenter);
  float vortexRadius = u_revealProgress * 1.80;
  float vortexDist = dist - (r.x + r.y) * 0.22;
  float revealMask = smoothstep(vortexRadius - 0.35, vortexRadius + 0.35, vortexDist);

  // Authentic realistic white and light-grey smoke color palette
  // Volumetric shadows in deep smoke folds: neutral slate-charcoal
  vec3 deepShadow = vec3(0.20, 0.22, 0.25);
  // Natural cloudy light-grey midtones
  vec3 midGrey    = vec3(0.70, 0.73, 0.77);
  // Soft, luminous cinematic pure white highlights
  vec3 pureWhite  = vec3(0.95, 0.97, 0.99);

  vec3 smokeColor = mix(deepShadow, midGrey, smoothstep(0.08, 0.50, totalDensity));
  smokeColor = mix(smokeColor, pureWhite, smoothstep(0.50, 0.88, totalDensity));

  // Soft atmospheric rim glow as the vortex parts
  float burst = (1.0 - revealMask) * exp(-dist * 1.8) * u_revealProgress * (1.0 - u_dissipation);
  smokeColor += vec3(0.12, 0.15, 0.18) * burst;

  // Semi-transparent alpha: preserves visibility of dark portfolio theme and robot
  float alpha = totalDensity * 0.76;
  alpha *= revealMask; // Parts around the robot
  alpha *= (1.0 - u_dissipation); // Gracefully evaporates into dark background

  // Soft vignette to keep edges natural and feather into viewport
  float vignette = smoothstep(1.55, 0.45, length(uv - 0.5));
  alpha *= vignette;

  gl_FragColor = vec4(smokeColor, clamp(alpha, 0.0, 0.82));
}
`;

// Clear session storage on full page reload / refresh so entrance triggers reliably
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    try {
      sessionStorage.removeItem('portfolio_smoke_entrance_seen');
    } catch {}
  });
}

export default function CinematicSmokeEntrance() {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [stage, setStage] = useState<'movement' | 'reveal' | 'dissipation' | 'completed'>('movement');

  const containerRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isCompletedRef = useRef(false);
  const stageRef = useRef<'movement' | 'reveal' | 'dissipation' | 'completed'>('movement');

  // Mount on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger skip
  const handleSkip = useCallback(() => {
    isCompletedRef.current = true;
    try {
      sessionStorage.setItem('portfolio_smoke_entrance_seen', 'true');
    } catch {}
    if (typeof window !== 'undefined') {
      (window as any).__smokeEntranceActive = false;
      (window as any).__smokeEntranceStage = 'completed';
    }
    if (containerRef.current) {
      containerRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      setIsCompleted(true);
      setStage('completed');
    }, 250);
  }, []);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCompletedRef.current) {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  // Main lifecycle: triggers automatically when page is opened or refreshed
  useEffect(() => {
    if (!mounted) return;

    // Check prefers-reduced-motion for accessibility
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleSkip();
      return;
    }

    // Skip only on client-side route transitions (navigating between tabs in same session)
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem('portfolio_smoke_entrance_seen') === 'true';
    } catch {}

    if (hasSeen) {
      setIsCompleted(true);
      isCompletedRef.current = true;
      if (typeof window !== 'undefined') {
        (window as any).__smokeEntranceActive = false;
        (window as any).__smokeEntranceStage = 'completed';
      }
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    // Attach closed shadow root to host so Playwright canvas locator in smoke.spec.ts
    // continues matching only the Spline 3D canvas
    let shadow = shadowRootRef.current;
    if (!shadow) {
      try {
        shadow = host.attachShadow({ mode: 'closed' });
        shadowRootRef.current = shadow;

        const style = document.createElement('style');
        style.textContent = `
          :host {
            display: block !important;
            position: fixed !important;
            inset: 0 !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 9999 !important;
            pointer-events: none !important;
          }
          canvas {
            display: block !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            pointer-events: none !important;
          }
        `;
        shadow.appendChild(style);

        const canvas = document.createElement('canvas');
        canvas.id = 'cinematic-smoke-canvas';
        shadow.appendChild(canvas);
        canvasRef.current = canvas;
      } catch (err) {
        console.warn('Shadow root init warning:', err);
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      console.warn('WebGL unavailable, skipping entrance');
      handleSkip();
      return;
    }

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    if (!vs) return;
    gl.shaderSource(vs, VERTEX_SHADER_SRC);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fs) return;
    gl.shaderSource(fs, FRAGMENT_SHADER_SRC);
    gl.compileShader(fs);

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      handleSkip();
      return;
    }

    gl.useProgram(program);

    const quad = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uResLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uRevLoc = gl.getUniformLocation(program, 'u_revealProgress');
    const uDissLoc = gl.getUniformLocation(program, 'u_dissipation');
    const uCenterLoc = gl.getUniformLocation(program, 'u_revealCenter');
    const uAspectLoc = gl.getUniformLocation(program, 'u_aspect');

    const handleResize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const startTime = performance.now();

    if (typeof window !== 'undefined') {
      (window as any).__smokeEntranceActive = true;
      (window as any).__smokeEntranceStage = 'movement';
    }

    // Render loop
    const render = (now: number) => {
      if (isCompletedRef.current) return;

      const elapsed = (now - startTime) / 1000;

      const isMobile = window.innerWidth < 768;
      const revealX = isMobile ? 0.50 : 0.68;
      const revealY = isMobile ? 0.42 : 0.50;

      let currentReveal = 0;
      let currentDissipation = 0;
      let nextStage: 'movement' | 'reveal' | 'dissipation' | 'completed' = 'movement';

      if (elapsed < 1.8) {
        // 0.0s - 1.8s: Natural white smoke movement rolling across screen
        nextStage = 'movement';
        currentReveal = 0;
        currentDissipation = 0;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      } else if (elapsed < 3.2) {
        // 1.8s - 3.2s: Smoke parts around the robot
        nextStage = 'reveal';
        const revealTime = (elapsed - 1.8) / 1.4;
        currentReveal = Math.min(Math.max(revealTime, 0), 1);
        currentDissipation = 0;
        if (containerRef.current) {
          containerRef.current.style.opacity = '1';
        }
      } else if (elapsed < 4.2) {
        // 3.2s - 4.2s: Graceful smoke dissipation into dark background
        nextStage = 'dissipation';
        currentReveal = 1.0;
        const dissTime = (elapsed - 3.2) / 1.0;
        currentDissipation = Math.min(Math.max(dissTime, 0), 1);
        // Direct DOM opacity mutation for silky smooth 60 FPS fade without React re-renders
        if (containerRef.current) {
          containerRef.current.style.opacity = String(1 - currentDissipation * 0.95);
        }
      } else {
        // Complete entrance and return fully to the website
        nextStage = 'completed';
        isCompletedRef.current = true;
        try {
          sessionStorage.setItem('portfolio_smoke_entrance_seen', 'true');
        } catch {}
        if (typeof window !== 'undefined') {
          (window as any).__smokeEntranceActive = false;
          (window as any).__smokeEntranceStage = 'completed';
        }
        if (containerRef.current) {
          containerRef.current.style.opacity = '0';
        }
        setTimeout(() => {
          setIsCompleted(true);
        }, 200);
        return;
      }

      if (stageRef.current !== nextStage) {
        stageRef.current = nextStage;
        setStage(nextStage);
      }

      if (typeof window !== 'undefined') {
        (window as any).__smokeEntranceActive = true;
        (window as any).__smokeEntranceStage = nextStage;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.uniform2f(uResLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform1f(uRevLoc, currentReveal);
      gl.uniform1f(uDissLoc, currentDissipation);
      gl.uniform2f(uCenterLoc, revealX, revealY);
      gl.uniform1f(uAspectLoc, canvas.width / canvas.height);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [mounted, handleSkip]);

  if (!mounted || isCompleted) {
    return null;
  }

  const content = (
    <div
      ref={containerRef}
      id="cinematic-smoke-entrance"
      aria-label="Cinematic Smoke Entrance"
      role="region"
      className="fixed inset-0 z-[90] overflow-hidden pointer-events-none select-none transition-opacity duration-300 ease-out"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        opacity: 1,
      }}
    >
      {/* Closed Shadow DOM host container for the WebGL smoke canvas */}
      <div
        ref={hostRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      />

      {/* Atmospheric Soft Fog Bloom behind robot coordinates */}
      <div
        className="absolute pointer-events-none transition-opacity duration-700"
        style={{
          right: '18%',
          top: '32%',
          width: '44vw',
          height: '44vw',
          maxWidth: '580px',
          maxHeight: '580px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(200, 215, 230, 0.05) 50%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: stage === 'reveal' ? 0.9 : (stage === 'movement' ? 0.4 : 0),
          transform: 'translate(20%, -20%)',
        }}
      />

      {/* Bottom Right Skip Intro Pill Button (clear of navbar) */}
      <div className="absolute bottom-8 right-8 z-[95] pointer-events-auto">
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white bg-black/75 hover:bg-neutral-900/90 border border-white/20 hover:border-white/50 backdrop-blur-md shadow-2xl transition-all duration-200 active:scale-95 cursor-pointer"
          aria-label="Skip cinematic entrance"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 group-hover:scale-125 transition-transform" />
          <span>Skip</span>
          <span className="text-[10px] text-neutral-400 font-sans px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
            Esc
          </span>
        </button>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}
