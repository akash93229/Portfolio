"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

export interface RobotFallbackRef {
  triggerInteraction: (part?: string) => void;
}

interface ProceduralRobotProps {
  onPartClick?: (partName: string) => void;
  interactionAction: { type: string; startTime: number } | null;
}

function ProceduralRobot({ onPartClick, interactionAction }: ProceduralRobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.active = true;
    };

    const handlePointerLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const action = interactionAction;

    // Base cursor targets
    let targetHeadYaw = mouse.current.active ? mouse.current.x * THREE.MathUtils.degToRad(35) : 0;
    let targetHeadPitch = mouse.current.active ? -mouse.current.y * THREE.MathUtils.degToRad(20) : 0;
    let targetTorsoYaw = mouse.current.active ? mouse.current.x * THREE.MathUtils.degToRad(12) : 0;
    let targetTorsoPitch = 0;
    let targetLeftArmZ = -0.2;
    let targetRightArmZ = 0.2;
    let targetRightArmX = 0;
    let targetLeftArmX = 0;
    let torsoBounce = 0;

    // Check active click interaction animation sequence
    if (action) {
      const elapsed = t - action.startTime;

      if (action.type === 'head' && elapsed < 2.0) {
        // Nod yes 2x (0 to 1s), then shake no 2x (1s to 2s)
        if (elapsed < 1.0) {
          targetHeadPitch = Math.sin(elapsed * Math.PI * 4) * THREE.MathUtils.degToRad(22);
          targetHeadYaw = 0;
        } else {
          targetHeadPitch = 0;
          targetHeadYaw = Math.sin((elapsed - 1.0) * Math.PI * 4) * THREE.MathUtils.degToRad(25);
        }
      } else if (action.type === 'torso' && elapsed < 1.8) {
        // Body twist +/-12 deg plus bounce
        targetTorsoYaw = Math.sin(elapsed * Math.PI * 3) * THREE.MathUtils.degToRad(15);
        torsoBounce = Math.abs(Math.sin(elapsed * Math.PI * 3)) * 0.08;
      } else if ((action.type === 'leftArm' || action.type === 'left') && elapsed < 2.0) {
        // Left arm lifts and waves, body leans slightly toward it
        targetLeftArmZ = -1.3 + Math.sin(elapsed * Math.PI * 6) * THREE.MathUtils.degToRad(25);
        targetLeftArmX = -0.4;
        targetTorsoYaw = THREE.MathUtils.degToRad(-8);
      } else if (
        (action.type === 'rightArm' || action.type === 'right' || action.type === 'wave' || action.type === 'default') &&
        elapsed < 2.2
      ) {
        // Wave sequence: right arm raises, forearm waves 3 times (+/-25 deg), head nods, torso twists, left arm swings gently
        if (elapsed < 1.8) {
          targetRightArmZ = 1.35 + Math.sin(elapsed * Math.PI * 5) * THREE.MathUtils.degToRad(25);
          targetRightArmX = 0.45;
          targetHeadPitch = Math.sin(elapsed * Math.PI * 4) * THREE.MathUtils.degToRad(12);
          targetHeadYaw = THREE.MathUtils.degToRad(15);
          targetTorsoYaw = Math.sin(elapsed * Math.PI * 2) * THREE.MathUtils.degToRad(12);
          targetLeftArmZ = -0.3 + Math.sin(elapsed * Math.PI * 2) * 0.15;
        }
      }
    }

    // Smooth damping (spring-like ease)
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        targetHeadYaw,
        5,
        delta
      );
      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        targetHeadPitch,
        5,
        delta
      );
    }

    if (torsoRef.current) {
      torsoRef.current.rotation.y = THREE.MathUtils.damp(
        torsoRef.current.rotation.y,
        targetTorsoYaw,
        4.5,
        delta
      );
      torsoRef.current.rotation.x = THREE.MathUtils.damp(
        torsoRef.current.rotation.x,
        targetTorsoPitch,
        4.5,
        delta
      );
      // Idle breathing + bounce
      const breath = 1.0 + Math.sin(t * 1.8) * 0.015 + torsoBounce;
      torsoRef.current.scale.set(1, breath, 1);
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.damp(
        leftArmRef.current.rotation.z,
        targetLeftArmZ,
        4.5,
        delta
      );
      leftArmRef.current.rotation.x = THREE.MathUtils.damp(
        leftArmRef.current.rotation.x,
        targetLeftArmX,
        4.5,
        delta
      );
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = THREE.MathUtils.damp(
        rightArmRef.current.rotation.z,
        targetRightArmZ,
        4.5,
        delta
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.damp(
        rightArmRef.current.rotation.x,
        targetRightArmX,
        4.5,
        delta
      );
    }
  });

  const chromeMaterial = new THREE.MeshPhysicalMaterial({
    color: '#0A0A0A',
    metalness: 0.95,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });

  const blackGlossMaterial = new THREE.MeshPhysicalMaterial({
    color: '#080808',
    metalness: 0.85,
    roughness: 0.15,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
  });

  const visorMaterial = new THREE.MeshPhysicalMaterial({
    color: '#000000',
    metalness: 0.98,
    roughness: 0.05,
    clearcoat: 1.0,
  });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} scale={[1.3, 1.3, 1.3]}>
      {/* Torus / Base Waist */}
      <mesh
        position={[0, 0, 0]}
        material={blackGlossMaterial}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('torso');
        }}
      >
        <cylinderGeometry args={[0.7, 0.85, 0.4, 32]} />
      </mesh>

      {/* Main Upper Body / Torso */}
      <group
        ref={torsoRef}
        position={[0, 0.8, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('torso');
        }}
      >
        <mesh material={blackGlossMaterial}>
          <cylinderGeometry args={[1.1, 0.75, 1.3, 32]} />
        </mesh>

        {/* Chest Plate Detail */}
        <mesh position={[0, 0.2, 0.55]} material={chromeMaterial}>
          <boxGeometry args={[0.9, 0.7, 0.1]} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.85, 0]} material={blackGlossMaterial}>
          <cylinderGeometry args={[0.28, 0.32, 0.4, 32]} />
        </mesh>

        {/* Head Group */}
        <group
          ref={headRef}
          position={[0, 1.35, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onPartClick?.('head');
          }}
        >
          {/* Chrome Head Sphere */}
          <mesh material={chromeMaterial}>
            <sphereGeometry args={[0.55, 32, 32]} />
          </mesh>

          {/* Dark Mirror Visor */}
          <mesh position={[0, 0.05, 0.42]} material={visorMaterial}>
            <boxGeometry args={[0.72, 0.32, 0.2]} />
          </mesh>
        </group>

        {/* Left Shoulder & Arm */}
        <group
          ref={leftArmRef}
          position={[-1.25, 0.4, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onPartClick?.('leftArm');
          }}
        >
          <mesh material={blackGlossMaterial}>
            <sphereGeometry args={[0.32, 24, 24]} />
          </mesh>
          <mesh position={[-0.2, -0.6, 0]} rotation={[0, 0, 0.2]} material={blackGlossMaterial}>
            <cylinderGeometry args={[0.22, 0.2, 0.9, 24]} />
          </mesh>
          <mesh position={[-0.35, -1.3, 0.1]} rotation={[0.2, 0, 0.2]} material={chromeMaterial}>
            <cylinderGeometry args={[0.18, 0.16, 0.8, 24]} />
          </mesh>
        </group>

        {/* Right Shoulder & Arm */}
        <group
          ref={rightArmRef}
          position={[1.25, 0.4, 0]}
          onClick={(e) => {
            e.stopPropagation();
            onPartClick?.('rightArm');
          }}
        >
          <mesh material={blackGlossMaterial}>
            <sphereGeometry args={[0.32, 24, 24]} />
          </mesh>
          <mesh position={[0.2, -0.6, 0]} rotation={[0, 0, -0.2]} material={blackGlossMaterial}>
            <cylinderGeometry args={[0.22, 0.2, 0.9, 24]} />
          </mesh>
          <mesh position={[0.35, -1.3, 0.1]} rotation={[0.2, 0, -0.2]} material={chromeMaterial}>
            <cylinderGeometry args={[0.18, 0.16, 0.8, 24]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

const RobotFallback = forwardRef<
  RobotFallbackRef,
  { onPartClick?: (part: string) => void }
>(function RobotFallback({ onPartClick }, ref) {
  const [currentAction, setCurrentAction] = useState<{
    type: string;
    startTime: number;
  } | null>(null);

  useImperativeHandle(ref, () => ({
    triggerInteraction: (part?: string) => {
      let actionType = 'wave';
      const p = (part || '').toLowerCase();
      if (p.includes('head')) actionType = 'head';
      else if (p.includes('torso') || p.includes('body')) actionType = 'torso';
      else if (p.includes('left')) actionType = 'leftArm';
      else if (p.includes('right') || p.includes('hand') || p.includes('arm')) actionType = 'rightArm';

      setCurrentAction({
        type: actionType,
        startTime: performance.now() / 1000,
      });
    },
  }));

  const handlePartClick = (part: string) => {
    let actionType = 'wave';
    const p = part.toLowerCase();
    if (p.includes('head')) actionType = 'head';
    else if (p.includes('torso') || p.includes('body')) actionType = 'torso';
    else if (p.includes('left')) actionType = 'leftArm';
    else if (p.includes('right') || p.includes('arm')) actionType = 'rightArm';

    setCurrentAction({
      type: actionType,
      startTime: performance.now() / 1000,
    });
    onPartClick?.(part);
  };

  return (
    <div
      className="w-full h-full relative cursor-pointer"
      onClick={() => handlePartClick('wave')}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.4, 4.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#E0E7FF" />
        <pointLight position={[0, 2, 2]} intensity={1.2} color="#FFFFFF" />
        <ProceduralRobot
          onPartClick={handlePartClick}
          interactionAction={currentAction}
        />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
});

export default RobotFallback;
