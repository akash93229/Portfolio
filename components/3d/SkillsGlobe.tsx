"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PROFILE_DATA } from '@/data/profile';

interface SkillNodeProps {
  position: [number, number, number];
  name: string;
  category: string;
  color: string;
  isHovered: boolean;
  onHover: (name: string | null) => void;
}

function SkillNode({ position, name, category, color, isHovered, onHover }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    if (isHovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
    } else {
      const pulse = 1 + Math.sin(time * 2 + position[0]) * 0.05;
      meshRef.current.scale.lerp(new THREE.Vector3(pulse, pulse, pulse), 0.1);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(name);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color="#0F172A"
          emissive={color}
          emissiveIntensity={isHovered ? 1.6 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating 2D label attached in 3D space */}
      <Html distanceFactor={10} position={[0, 0.55, 0]} center pointerEvents="none">
        <div
          className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 backdrop-blur-md border ${
            isHovered
              ? 'bg-slate-900/95 text-white border-cyan-400 shadow-lg shadow-cyan-500/30 scale-110'
              : 'bg-slate-900/70 text-slate-300 border-slate-700/60'
          }`}
          style={{ borderColor: isHovered ? color : undefined }}
        >
          <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: color }} />
          {name}
        </div>
      </Html>
    </group>
  );
}

function GlobeOrbitGroup({
  activeTrack,
  hoveredSkill,
  setHoveredSkill,
}: {
  activeTrack: 'fullstack' | 'devops' | 'both';
  hoveredSkill: string | null;
  setHoveredSkill: (name: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitIcons = PROFILE_DATA.skills.orbitIcons;

  // Distribute skills evenly on a sphere using Fibonacci spiral
  const nodes = useMemo(() => {
    const total = orbitIcons.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return orbitIcons.map((skill, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sphereRadius = 3.2;
      const x = Math.cos(theta) * radius * sphereRadius;
      const z = Math.sin(theta) * radius * sphereRadius;

      return {
        ...skill,
        position: [x, y * sphereRadius, z] as [number, number, number],
      };
    });
  }, [orbitIcons]);

  useFrame((_, delta) => {
    if (groupRef.current && !hoveredSkill) {
      groupRef.current.rotation.y += delta * 0.15; // Slow ambient rotation
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe outer guide ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[3.15, 3.2, 64]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 2, 0]}>
        <ringGeometry args={[3.15, 3.2, 64]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>

      {nodes.map((node) => {
        const isDimmed = activeTrack !== 'both' && node.track !== 'both' && node.track !== activeTrack;

        return (
          <group key={node.name} visible={!isDimmed || hoveredSkill === node.name}>
            <SkillNode
              position={node.position}
              name={node.name}
              category={node.category}
              color={node.color}
              isHovered={hoveredSkill === node.name}
              onHover={setHoveredSkill}
            />
          </group>
        );
      })}
    </group>
  );
}

export default function SkillsGlobe({
  activeTrack,
}: {
  activeTrack: 'fullstack' | 'devops' | 'both';
}) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeSkillInfo = useMemo(() => {
    if (!hoveredSkill) return null;
    return PROFILE_DATA.skills.orbitIcons.find((s) => s.name === hoveredSkill);
  }, [hoveredSkill]);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden glass-panel border border-slate-800 touch-pan-y">
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/50">
          Interactive 3D Orbit
        </span>
        <p className="text-xs text-slate-400 mt-1">Drag to rotate • Hover node for details</p>
      </div>

      {activeSkillInfo && (
        <div className="absolute bottom-4 left-4 right-4 z-10 md:right-auto md:max-w-xs pointer-events-none p-3.5 rounded-xl bg-slate-900/95 border border-cyan-500/50 backdrop-blur-xl shadow-xl animate-fade-in">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: activeSkillInfo.color }}
            />
            <span className="font-bold text-white text-sm">{activeSkillInfo.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 ml-auto bg-slate-800 px-2 py-0.5 rounded">
              {activeSkillInfo.category}
            </span>
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        style={{ touchAction: 'pan-y' }}
        gl={{ powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#38BDF8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#818CF8" />

        <GlobeOrbitGroup
          activeTrack={activeTrack}
          hoveredSkill={hoveredSkill}
          setHoveredSkill={setHoveredSkill}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
