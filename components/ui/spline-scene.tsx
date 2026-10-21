"use client";

import React, { Suspense, useRef, useEffect, useState } from 'react';

const Spline = React.lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: (app: any) => void;
  onError?: (err: unknown) => void;
  onSplineMouseDown?: (e: any) => void;
}

export default function SplineScene({
  scene,
  className,
  onLoad,
  onError,
  onSplineMouseDown,
}: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const rafId = useRef<number | null>(null);
  const splineAppRef = useRef<any>(null);

  // Pause rendering & event dispatch when off-screen or tab is hidden
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const visible = entry.isIntersecting && !document.hidden;
          setIsVisible(visible);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Forward global pointermove, pointerdown, pointerup events to Spline canvas with rAF coalescing
  useEffect(() => {
    if (!isVisible) return;

    let lastMoveEvent: PointerEvent | null = null;

    const dispatchMoveToCanvas = () => {
      if (!lastMoveEvent || !containerRef.current) return;
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.touchAction = 'pan-y';

        const mouseEvent = new MouseEvent('mousemove', {
          clientX: lastMoveEvent.clientX,
          clientY: lastMoveEvent.clientY,
          screenX: lastMoveEvent.screenX,
          screenY: lastMoveEvent.screenY,
          bubbles: true,
          cancelable: true,
          view: window,
        });
        canvas.dispatchEvent(mouseEvent);
        if (splineAppRef.current?.requestRender) {
          splineAppRef.current.requestRender();
        }
      }
      rafId.current = null;
    };

    const handlePointerMove = (e: PointerEvent) => {
      lastMoveEvent = e;
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(dispatchMoveToCanvas);
      }
    };

    const forwardPointerEvent = (e: PointerEvent, type: 'mousedown' | 'mouseup') => {
      if (!containerRef.current) return;
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        const mouseEvent = new MouseEvent(type, {
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          bubbles: true,
          cancelable: true,
          view: window,
        });
        canvas.dispatchEvent(mouseEvent);
        if (splineAppRef.current?.requestRender) {
          splineAppRef.current.requestRender();
        }
      }
    };

    const handlePointerDown = (e: PointerEvent) => forwardPointerEvent(e, 'mousedown');
    const handlePointerUp = (e: PointerEvent) => forwardPointerEvent(e, 'mouseup');

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isVisible]);

  const handleSplineLoad = (splineApp: any) => {
    splineAppRef.current = splineApp;
    try {
      const isRetina = typeof window !== 'undefined' && window.devicePixelRatio > 1;
      const targetDpr = isRetina ? Math.min(window.devicePixelRatio, 2) : 1.5;
      if (splineApp._renderer?.setPixelRatio) {
        splineApp._renderer.setPixelRatio(targetDpr);
      }
    } catch {
      // safe fallback
    }
    onLoad?.(splineApp);
  };

  if (hasError) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative cursor-pointer touch-pan-y ${className || ''}`}
      style={{
        willChange: 'transform',
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
          </div>
        }
      >
        <Spline
          scene={scene}
          renderOnDemand={true}
          onLoad={handleSplineLoad}
          onMouseDown={(e) => {
            onSplineMouseDown?.(e);
          }}
          onError={(err) => {
            console.error('Spline failed to load:', err);
            setHasError(true);
            onError?.(err);
          }}
        />
      </Suspense>
    </div>
  );
}
