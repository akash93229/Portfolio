import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3DProps {
  track: 'fullstack' | 'devops' | 'both';
  scrollY: number;
  isDark: boolean;
}

// Low-power / Mobile detection
function checkIsLowPower() {
  if (typeof window === 'undefined') return false;
  const isMobile = window.innerWidth < 768;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  return isMobile || reducedMotion || hardwareConcurrency <= 4;
}

// Central Cloud Core (Hero)
function CloudInfrastructureCore({ track }: { track: 'fullstack' | 'devops' | 'both' }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const colors = useMemo(() => {
    if (track === 'fullstack') {
      return { core: '#06B6D4', glow: '#38BDF8', accent: '#6366F1' };
    }
    if (track === 'devops') {
      return { core: '#6366F1', glow: '#818CF8', accent: '#10B981' };
    }
    return { core: '#818CF8', glow: '#06B6D4', accent: '#10B981' };
  }, [track]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle rotation
    groupRef.current.rotation.y = time * 0.15;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.08;

    if (coreRef.current) {
      coreRef.current.rotation.y = -time * 0.25;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.z = time * 0.2;
      ringRef1.current.rotation.x = 1.1 + Math.sin(time * 0.5) * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.18;
      ringRef2.current.rotation.y = 0.8 + Math.cos(time * 0.4) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Core Sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color={colors.core}
          emissive={colors.glow}
          emissiveIntensity={0.65}
          wireframe={true}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Inner Glowing Orb */}
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial
          color={colors.glow}
          emissive={colors.glow}
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Tech Ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.5, 0.025, 16, 64]} />
        <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.8} />
      </mesh>

      {/* Orbiting Tech Ring 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[3.2, 0.02, 16, 64]} />
        <meshStandardMaterial color={colors.core} emissive={colors.core} emissiveIntensity={0.5} />
      </mesh>

      {/* Orbiting Infrastructure Server Cubes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 1.5) * 0.6;
        return (
          <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
            <group position={[x, y, z]}>
              <mesh>
                <boxGeometry args={[0.35, 0.45, 0.35]} />
                <meshStandardMaterial
                  color="#111827"
                  emissive={i % 2 === 0 ? colors.core : colors.accent}
                  emissiveIntensity={0.6}
                  metalness={0.9}
                  roughness={0.2}
                />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

// DevOps Pipeline Conveyor Cubes in 3D
function PipelineConveyorNodes({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const containerCubes = useRef<THREE.Mesh[]>([]);

  const stages = useMemo(
    () => [
      { name: 'Commit', pos: [-5, -6, -2], color: '#6366F1' },
      { name: 'Test', pos: [-3, -7, -1], color: '#38BDF8' },
      { name: 'Build', pos: [-1, -8, 0], color: '#06B6D4' },
      { name: 'Terraform', pos: [1, -9, 0], color: '#7B42BC' },
      { name: 'Deploy', pos: [3, -10, -1], color: '#10B981' },
      { name: 'Monitor', pos: [5, -11, -2], color: '#F59E0B' },
    ],
    []
  );

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    containerCubes.current.forEach((cube, index) => {
      if (!cube) return;
      const loop = (time * 0.4 + index * 0.35) % 1;
      const stageIdx = Math.floor(loop * (stages.length - 1));
      const nextStageIdx = Math.min(stageIdx + 1, stages.length - 1);
      const subT = (loop * (stages.length - 1)) % 1;

      const p1 = stages[stageIdx].pos;
      const p2 = stages[nextStageIdx].pos;

      cube.position.x = p1[0] + (p2[0] - p1[0]) * subT;
      cube.position.y = p1[1] + (p2[1] - p1[1]) * subT + Math.sin(subT * Math.PI) * 0.4;
      cube.position.z = p1[2] + (p2[2] - p1[2]) * subT;
      cube.rotation.y = time + index;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Fixed Stage Markers */}
      {stages.map((st, i) => (
        <group key={i} position={st.pos as [number, number, number]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.15, 24]} />
            <meshStandardMaterial
              color="#0B0F19"
              emissive={st.color}
              emissiveIntensity={0.8}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <ringGeometry args={[0.4, 0.5, 24]} />
            <meshStandardMaterial color={st.color} emissive={st.color} emissiveIntensity={1} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Conveyor Line */}
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(stages.flatMap((s) => s.pos)), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#38BDF8" transparent opacity={0.4} linewidth={2} />
      </mesh>

      {/* Traveling Container Cubes */}
      {[0, 1, 2].map((idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) containerCubes.current[idx] = el;
          }}
        >
          <boxGeometry args={[0.28, 0.28, 0.28]} />
          <meshStandardMaterial
            color="#2496ED"
            emissive="#38BDF8"
            emissiveIntensity={0.9}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Background Particle Starfield
function ParticleField({ count = 280 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorChoices = [
      new THREE.Color('#38BDF8'),
      new THREE.Color('#6366F1'),
      new THREE.Color('#10B981'),
      new THREE.Color('#94A3B8'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25 - 5;

      const choice = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      col[i * 3] = choice.r;
      col[i * 3 + 1] = choice.g;
      col[i * 3 + 2] = choice.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = Math.sin(time * 0.015) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.65} sizeAttenuation={true} />
    </points>
  );
}

// Contact Portal Ring at Bottom
function ContactPortalRing() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!torusRef.current) return;
    const time = state.clock.getElapsedTime();
    torusRef.current.rotation.z = time * 0.3;
    torusRef.current.rotation.x = Math.PI / 2.5 + Math.sin(time * 0.5) * 0.1;
  });

  return (
    <group position={[0, -18, -3]}>
      <mesh ref={torusRef}>
        <torusGeometry args={[3, 0.05, 16, 64]} />
        <meshStandardMaterial color="#6366F1" emissive="#38BDF8" emissiveIntensity={1} />
      </mesh>
      <pointLight color="#38BDF8" intensity={1.5} distance={8} />
    </group>
  );
}

// Camera Glide Controller
function CameraGlideController({
  scrollY,
  track,
}: {
  scrollY: number;
  track: 'fullstack' | 'devops' | 'both';
}) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    const docHeight = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const scrollProgress = Math.min(1, Math.max(0, scrollY / docHeight));

    // Target camera position along scroll path
    // Hero: z: 6, y: 0
    // Conveyor / DevOps: z: 9, y: -8
    // Projects: z: 7, y: -13
    // Contact: z: 6, y: -18
    const targetY = -scrollProgress * 18;
    const trackOffsetX = track === 'fullstack' ? -0.8 : track === 'devops' ? 0.8 : 0;

    // Mouse parallax
    const parallaxX = mouseRef.current.x * 0.45;
    const parallaxY = -mouseRef.current.y * 0.3;

    camera.position.x += (trackOffsetX + parallaxX - camera.position.x) * 0.05;
    camera.position.y += (targetY + parallaxY - camera.position.y) * 0.06;
    camera.position.z += (6 + Math.sin(scrollProgress * Math.PI) * 2.5 - camera.position.z) * 0.05;

    camera.lookAt(0, targetY - 0.5, 0);
  });

  return null;
}

export default function Scene3D({ track, scrollY, isDark }: Scene3DProps) {
  const [isLowPower, setIsLowPower] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsLowPower(checkIsLowPower());

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
      style={{ opacity: isDark ? 0.95 : 0.45, transition: 'opacity 0.6s ease' }}
    >
      <Canvas
        dpr={[1, isLowPower ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{
          antialias: !isLowPower,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={isDark ? 0.65 : 1.1} />
        <directionalLight position={[10, 10, 5]} intensity={isDark ? 1.2 : 0.8} color="#E0F2FE" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#818CF8" />

        <CameraGlideController scrollY={scrollY} track={track} />
        <ParticleField count={isLowPower ? 120 : 260} />
        <CloudInfrastructureCore track={track} />
        <PipelineConveyorNodes scrollProgress={scrollY} />
        <ContactPortalRing />
      </Canvas>
    </div>
  );
}
