export type Vec3 = [number, number, number];

export interface MuscleSegment {
  pos: Vec3;
  scale: Vec3;
  rot?: Vec3;
  kind?: 'ellipsoid' | 'capsule';
}

export interface MuscleMeshDef {
  id: string;
  segments: MuscleSegment[];
  focus: Vec3;
  camera: Vec3;
  tension: number;
}

const mirror = (s: MuscleSegment): MuscleSegment => ({
  ...s,
  pos: [-s.pos[0], s.pos[1], s.pos[2]],
  rot: s.rot ? [s.rot[0], -s.rot[1], -s.rot[2]] : undefined,
});

const pair = (list: MuscleSegment[]): MuscleSegment[] => [...list, ...list.map(mirror)];

export const muscleMeshes: MuscleMeshDef[] = [
  {
    id: 'deltoides',
    tension: 62,
    focus: [0.5, 1.42, 0.12],
    camera: [1.3, 1.5, 1.7],
    segments: pair([{ pos: [0.5, 1.42, 0.02], scale: [0.115, 0.15, 0.115], rot: [0, 0, -0.2] }]),
  },
  {
    id: 'pectoral',
    tension: 48,
    focus: [0, 1.3, 0.2],
    camera: [0, 1.4, 1.9],
    segments: pair([{ pos: [0.17, 1.28, 0.16], scale: [0.19, 0.14, 0.09], rot: [0, 0, 0.15] }]),
  },
  {
    id: 'biceps',
    tension: 55,
    focus: [0.58, 1.1, 0.07],
    camera: [1.3, 1.15, 1.6],
    segments: pair([{ pos: [0.57, 1.1, 0.05], scale: [0.065, 0.19, 0.07], rot: [0, 0, -0.08] }]),
  },
  {
    id: 'abdominal',
    tension: 40,
    focus: [0, 1.0, 0.17],
    camera: [0, 1.05, 1.8],
    segments: pair([
      { pos: [0.055, 1.12, 0.14], scale: [0.065, 0.065, 0.05] },
      { pos: [0.055, 1.0, 0.14], scale: [0.065, 0.065, 0.05] },
      { pos: [0.055, 0.88, 0.135], scale: [0.065, 0.065, 0.05] },
    ]),
  },
  {
    id: 'oblicuos',
    tension: 36,
    focus: [0.22, 1.0, 0.1],
    camera: [0.9, 1.05, 1.7],
    segments: pair([{ pos: [0.2, 1.0, 0.07], scale: [0.075, 0.22, 0.09], rot: [0, 0, 0.1] }]),
  },
  {
    id: 'cuadriceps',
    tension: 70,
    focus: [0.17, 0.4, 0.1],
    camera: [0.9, 0.5, 1.8],
    segments: pair([{ pos: [0.17, 0.42, 0.06], scale: [0.11, 0.3, 0.1], rot: [0, 0, 0.03] }]),
  },
  {
    id: 'tibial',
    tension: 28,
    focus: [0.17, -0.18, 0.08],
    camera: [0.9, -0.1, 1.6],
    segments: pair([{ pos: [0.17, -0.2, 0.06], scale: [0.05, 0.22, 0.05] }]),
  },
  {
    id: 'trapecio',
    tension: 74,
    focus: [0, 1.5, -0.14],
    camera: [0, 1.55, -1.8],
    segments: pair([{ pos: [0.1, 1.46, -0.12], scale: [0.2, 0.17, 0.06], rot: [0, 0, -0.35] }]),
  },
  {
    id: 'dorsal',
    tension: 58,
    focus: [0, 1.15, -0.17],
    camera: [0, 1.2, -1.9],
    segments: pair([{ pos: [0.18, 1.12, -0.15], scale: [0.17, 0.23, 0.06], rot: [0, 0, 0.18] }]),
  },
  {
    id: 'triceps',
    tension: 52,
    focus: [0.6, 1.1, -0.06],
    camera: [1.3, 1.15, -1.6],
    segments: pair([{ pos: [0.6, 1.1, -0.05], scale: [0.06, 0.2, 0.065], rot: [0, 0, -0.08] }]),
  },
  {
    id: 'lumbar',
    tension: 66,
    focus: [0, 0.88, -0.15],
    camera: [0, 0.95, -1.8],
    segments: pair([{ pos: [0.06, 0.88, -0.14], scale: [0.055, 0.2, 0.055] }]),
  },
  {
    id: 'gluteo',
    tension: 60,
    focus: [0, 0.62, -0.16],
    camera: [0, 0.7, -1.8],
    segments: pair([{ pos: [0.12, 0.62, -0.1], scale: [0.14, 0.14, 0.12] }]),
  },
  {
    id: 'isquios',
    tension: 64,
    focus: [0.17, 0.35, -0.08],
    camera: [0.9, 0.45, -1.8],
    segments: pair([{ pos: [0.17, 0.35, -0.06], scale: [0.095, 0.28, 0.09] }]),
  },
  {
    id: 'gemelos',
    tension: 45,
    focus: [0.17, -0.12, -0.08],
    camera: [0.9, -0.05, -1.6],
    segments: pair([{ pos: [0.17, -0.12, -0.06], scale: [0.075, 0.2, 0.08] }]),
  },
];

export const getMeshDef = (id: string | null | undefined): MuscleMeshDef | undefined =>
  muscleMeshes.find((m) => m.id === id);

export interface CameraPreset {
  position: Vec3;
  target: Vec3;
}

export const cameraPresets: Record<'front' | 'back' | 'overview', CameraPreset> = {
  front: { position: [0, 0.95, 4.6], target: [0, 0.8, 0] },
  back: { position: [0, 0.95, -4.6], target: [0, 0.8, 0] },
  overview: { position: [3.2, 1.3, 4], target: [0, 0.8, 0] },
};

export const tensionLevel = (t: number): { label: string; color: string } =>
  t >= 65 ? { label: 'Alta', color: '#FF5A5F' } : t >= 45 ? { label: 'Media', color: '#FFB020' } : { label: 'Baja', color: '#22E6C4' };
