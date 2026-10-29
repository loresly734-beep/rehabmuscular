'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { muscles, exercisesForMuscle } from '@/lib/rehabData';
import { muscleMeshes, getMeshDef, cameraPresets, tensionLevel, type MuscleMeshDef, type Vec3 } from '@/app/components/anatomyModel';

export interface CameraRequest {
  key: number;
  position: Vec3;
  target: Vec3;
}

interface ViewerProps {
  hoverId: string | null;
  selectedId: string | null;
  cameraRequest: CameraRequest;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

const BONE = '#16324f';
const FLESH = '#7a2a3a';
const CYAN = '#2BF3FF';

function Limb({ from, to, radius, color = BONE, opacity = 0.55 }: { from: Vec3; to: Vec3; radius: number; color?: string; opacity?: number }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return { position: a.clone().add(b).multiplyScalar(0.5), quaternion: q, length: len };
  }, [from, to]);
  return (
    <mesh position={position} quaternion={quaternion}>
      <capsuleGeometry args={[radius, Math.max(length - radius * 2, 0.01), 8, 16]} />
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.6} metalness={0.2} />
    </mesh>
  );
}

function BodyBase() {
  return (
    <group>
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color={BONE} transparent opacity={0.55} roughness={0.6} metalness={0.2} />
      </mesh>
      <Limb from={[0, 1.65, 0]} to={[0, 1.55, 0]} radius={0.06} />
      <mesh position={[0, 1.15, 0]} scale={[0.3, 0.5, 0.17]}>
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial color={BONE} transparent opacity={0.5} roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.7, 0]} scale={[0.27, 0.2, 0.16]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color={BONE} transparent opacity={0.5} roughness={0.6} metalness={0.2} />
      </mesh>
      {[1, -1].map((s) => (
        <group key={`limb-${s}`}>
          <Limb from={[0.38 * s, 1.45, 0]} to={[0.6 * s, 1.0, 0]} radius={0.055} />
          <Limb from={[0.6 * s, 1.0, 0]} to={[0.7 * s, 0.55, 0.05]} radius={0.045} />
          <mesh position={[0.72 * s, 0.45, 0.06]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={BONE} transparent opacity={0.55} />
          </mesh>
          <Limb from={[0.17 * s, 0.62, 0]} to={[0.17 * s, 0.05, 0]} radius={0.08} />
          <Limb from={[0.17 * s, 0.05, 0]} to={[0.17 * s, -0.5, 0]} radius={0.055} />
          <mesh position={[0.17 * s, -0.55, 0.06]} scale={[0.06, 0.04, 0.12]}>
            <sphereGeometry args={[1, 12, 12]} />
            <meshStandardMaterial color={BONE} transparent opacity={0.55} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function MuscleMesh({ def, hovered, selected, onHover, onSelect }: { def: MuscleMeshDef; hovered: boolean; selected: boolean; onHover: (id: string | null) => void; onSelect: (id: string) => void }) {
  const matRefs = useRef<THREE.MeshStandardMaterial[]>([]);
  const glow = useRef(0);
  const active = hovered || selected;

  useFrame((state, delta) => {
    const target = active ? 1 : 0;
    glow.current = THREE.MathUtils.damp(glow.current, target, 8, delta);
    const pulse = active ? 0.75 + Math.sin(state.clock.elapsedTime * 5) * 0.25 : 0;
    const base = new THREE.Color(FLESH);
    const neon = new THREE.Color(CYAN);
    matRefs.current.forEach((m) => {
      if (!m) return;
      m.color.copy(base).lerp(neon, glow.current * 0.55);
      m.emissive.copy(neon);
      m.emissiveIntensity = glow.current * (0.7 + pulse * 0.9);
    });
  });

  return (
    <group
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); onHover(def.id); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { onHover(null); document.body.style.cursor = 'auto'; }}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); onSelect(def.id); }}
    >
      {def.segments.map((s, i) => (
        <mesh key={`${def.id}-seg-${i}`} position={s.pos} scale={s.scale} rotation={s.rot ?? [0, 0, 0]}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshStandardMaterial
            ref={(m) => { if (m) matRefs.current[i] = m; }}
            color={FLESH}
            roughness={0.45}
            metalness={0.1}
            transparent
            opacity={active ? 0.97 : 0.88}
          />
        </mesh>
      ))}
    </group>
  );
}

function ScanRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = (state.clock.elapsedTime * 0.35) % 1;
    ref.current.position.y = -0.7 + t * 2.9;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.45;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.62, 0.65, 64]} />
      <meshBasicMaterial color={CYAN} transparent opacity={0.3} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function Platform() {
  return (
    <group position={[0, -0.72, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.75, 0.78, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 0.96, 64]} />
        <meshBasicMaterial color="#19B6C9" transparent opacity={0.4} />
      </mesh>
      <gridHelper args={[4, 28, '#1B6C86', '#0F2F4A']} position={[0, -0.001, 0]} />
    </group>
  );
}

function CameraRig({ request, interacting }: { request: CameraRequest; interacting: React.MutableRefObject<boolean> }) {
  const { camera, gl } = useThree();
  const target = useRef(new THREE.Vector3(0, 0.8, 0));
  const goalPos = useRef(new THREE.Vector3(...cameraPresets.front.position));
  const goalTarget = useRef(new THREE.Vector3(...cameraPresets.front.target));
  const animating = useRef(true);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    goalPos.current.set(...request.position);
    goalTarget.current.set(...request.target);
    animating.current = true;
  }, [request]);

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY }; interacting.current = true; };
    const up = () => { drag.current = null; interacting.current = false; };
    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current = { x: e.clientX, y: e.clientY };
      animating.current = false;
      const offset = camera.position.clone().sub(target.current);
      const sph = new THREE.Spherical().setFromVector3(offset);
      sph.theta -= dx * 0.008;
      sph.phi = THREE.MathUtils.clamp(sph.phi - dy * 0.006, 0.4, Math.PI - 0.4);
      offset.setFromSpherical(sph);
      camera.position.copy(target.current).add(offset);
      goalPos.current.copy(camera.position);
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      animating.current = false;
      const offset = camera.position.clone().sub(target.current);
      const len = THREE.MathUtils.clamp(offset.length() * (1 + e.deltaY * 0.001), 1.1, 7);
      offset.setLength(len);
      camera.position.copy(target.current).add(offset);
      goalPos.current.copy(camera.position);
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    el.addEventListener('pointermove', move);
    el.addEventListener('wheel', wheel, { passive: false });
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('wheel', wheel);
    };
  }, [camera, gl, interacting]);

  useFrame((_, delta) => {
    if (animating.current) {
      camera.position.lerp(goalPos.current, 1 - Math.exp(-3.2 * delta));
      target.current.lerp(goalTarget.current, 1 - Math.exp(-3.2 * delta));
      if (camera.position.distanceTo(goalPos.current) < 0.01 && target.current.distanceTo(goalTarget.current) < 0.01) animating.current = false;
    }
    camera.lookAt(target.current);
  });
  return null;
}

function FloatingHud({ id }: { id: string }) {
  const { camera, size } = useThree();
  const def = getMeshDef(id);
  const ref = useRef<HTMLDivElement | null>(null);
  const info = muscles.find((m) => m.id === id);
  const count = exercisesForMuscle(id).length;
  const level = tensionLevel(def?.tension ?? 0);

  useEffect(() => {
    const host = document.getElementById('anatomy-hud-layer');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'pointer-events-none absolute left-0 top-0 z-20';
    host.appendChild(el);
    ref.current = el;
    return () => { host.removeChild(el); ref.current = null; };
  }, []);

  useFrame(() => {
    if (!ref.current || !def) return;
    const v = new THREE.Vector3(...def.focus).project(camera);
    const x = (v.x * 0.5 + 0.5) * size.width;
    const y = (-v.y * 0.5 + 0.5) * size.height;
    const flip = x > size.width * 0.55;
    ref.current.style.transform = `translate(${x + (flip ? -232 : 24)}px, ${y - 40}px)`;
    ref.current.innerHTML = `
      <div style="width:208px" class="hud-tag ${flip ? 'hud-tag-left' : ''}">
        <div class="hud-tag-title">${info?.name ?? ''}</div>
        <div class="hud-tag-latin">${info?.latin ?? ''}</div>
        <div class="hud-tag-row"><span>GRUPO</span><b>${info?.region ?? ''}</b></div>
        <div class="hud-tag-row"><span>TENSIÓN</span><b style="color:${level.color}">${level.label} · ${def.tension}%</b></div>
        <div class="hud-tag-bar"><i style="width:${def.tension}%;background:${level.color}"></i></div>
        <div class="hud-tag-row"><span>EJERCICIOS</span><b>${count} disponibles</b></div>
      </div>`;
  });
  return null;
}

function Scene({ hoverId, selectedId, cameraRequest, onHover, onSelect }: ViewerProps) {
  const interacting = useRef(false);
  const hudId = hoverId ?? selectedId;
  return (
    <>
      <color attach="background" args={['#030b1c']} />
      <fog attach="fog" args={['#030b1c', 6, 14]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#cfeaff" />
      <directionalLight position={[-3, 3, -4]} intensity={0.8} color="#2BF3FF" />
      <pointLight position={[0, 1, 2.5]} intensity={0.6} color="#19B6C9" />
      <Platform />
      <ScanRing />
      <BodyBase />
      {muscleMeshes.map((def) => (
        <MuscleMesh key={def.id} def={def} hovered={hoverId === def.id} selected={selectedId === def.id} onHover={onHover} onSelect={onSelect} />
      ))}
      {hudId && <FloatingHud id={hudId} />}
      <CameraRig request={cameraRequest} interacting={interacting} />
    </>
  );
}

export default function AnatomyViewer3D(props: ViewerProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return (
    <div className="relative h-full w-full">
      {ready && (
        <Canvas camera={{ position: cameraPresets.front.position, fov: 38, near: 0.1, far: 50 }} dpr={[1, 2]} gl={{ antialias: true }}>
          <Scene {...props} />
        </Canvas>
      )}
      <div id="anatomy-hud-layer" className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
