'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Icon from '@/components/ui/AppIcon';
import EmptyState from '@/components/ui/EmptyState';
import { muscles, type Region } from '@/lib/rehabData';
import { cameraPresets, getMeshDef } from '@/app/components/anatomyModel';
import type { CameraRequest } from '@/app/components/AnatomyViewer3D';
import HudPanel from '@/app/components/HudPanel';

const AnatomyViewer3D = dynamic(() => import('@/app/components/AnatomyViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-neon">
      <div className="holo-orb" aria-hidden="true"><span /></div>
      <p className="font-mono text-xs uppercase tracking-[0.3em]">Inicializando modelo 3D…</p>
    </div>
  ),
});

const regions: Region[] = ['Hombro', 'Brazo', 'Pecho', 'Core', 'Espalda', 'Cadera', 'Muslo', 'Pierna'];
const ZOOM_DELAY_MS = 750;

export default function AnatomyExplorer() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [panelId, setPanelId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState<Region | 'Todas'>('Todas');
  const [cam, setCam] = useState<CameraRequest>({ key: 0, position: cameraPresets.front.position, target: cameraPresets.front.target });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(
    () =>
      muscles.filter(
        (m) =>
          (region === 'Todas' || m.region === region) &&
          (m.name.toLowerCase().includes(query.toLowerCase()) || m.latin.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, region]
  );

  const moveCamera = useCallback((position: CameraRequest['position'], target: CameraRequest['target']) => {
    setCam((c) => ({ key: c.key + 1, position, target }));
  }, []);

  const selectMuscle = useCallback((id: string) => {
    const def = getMeshDef(id);
    setSelectedId(id);
    setPanelId(null);
    if (timer.current) clearTimeout(timer.current);
    if (def) moveCamera(def.camera, def.focus);
    timer.current = setTimeout(() => setPanelId(id), ZOOM_DELAY_MS);
  }, [moveCamera]);

  const resetView = (v: 'front' | 'back' | 'overview') => {
    if (timer.current) clearTimeout(timer.current);
    setSelectedId(null);
    setPanelId(null);
    moveCamera(cameraPresets[v].position, cameraPresets[v].target);
  };

  const hovered = hoverId ? muscles.find((m) => m.id === hoverId) : null;

  return (
    <section className="hud-frame p-3 sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="inline-flex rounded-lg border border-neon/20 bg-black/30 p-1" role="group" aria-label="Vista de cámara">
          {([
            { id: 'front', label: 'Anterior' },
            { id: 'back', label: 'Posterior' },
            { id: 'overview', label: 'Orbital' },
          ] as const).map((v) => (
            <button key={`view-${v.id}`} type="button" onClick={() => resetView(v.id)} className="rounded-md px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-all duration-150 hover:bg-neon/10 hover:text-neon active:scale-95">
              {v.label}
            </button>
          ))}
        </div>
        <div className="relative w-full md:max-w-xs">
          <Icon name="MagnifyingGlassIcon" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neon/70" />
          <label htmlFor="muscle-search" className="sr-only">Buscar músculo</label>
          <input id="muscle-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar músculo (ej. glúteo)" className="hud-input w-full py-2 pl-9 pr-3 text-sm" />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(['Todas', ...regions] as const).map((r) => (
          <button key={`region-${r}`} type="button" onClick={() => setRegion(r)} className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-150 active:scale-95 ${region === r ? 'border-neon bg-neon/20 text-neon shadow-neon-sm' : 'border-white/10 text-muted-foreground hover:border-neon/40 hover:text-foreground'}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <div className={`relative overflow-hidden rounded-xl border border-neon/25 bg-[#030b1c] ${panelId ? 'lg:col-span-3' : 'lg:col-span-5'} h-[460px] sm:h-[560px] lg:h-[620px]`}>
          <div className="hud-corners pointer-events-none absolute inset-0 z-10" />
          <div className="pointer-events-none absolute left-4 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-neon/80">
            <p>● SCAN ACTIVO</p>
            <p className="mt-1 text-muted-foreground">{hovered ? `OBJETIVO: ${hovered.name}` : 'ARRASTRA PARA ROTAR · RUEDA PARA ZOOM'}</p>
          </div>
          <div className="pointer-events-none absolute bottom-3 right-4 z-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Clic en un músculo para acercar</div>
          <AnatomyViewer3D hoverId={hoverId} selectedId={selectedId} cameraRequest={cam} onHover={setHoverId} onSelect={selectMuscle} />
        </div>

        {panelId && (
          <div className="lg:col-span-2">
            <HudPanel muscleId={panelId} onClose={() => resetView('front')} />
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon/80">Músculos detectados ({filtered.length})</h3>
        {filtered.length === 0 ? (
          <div className="mt-2">
            <EmptyState icon="MagnifyingGlassIcon" title="No hay músculos con ese nombre" description="Prueba con otro término o cambia el filtro de región para ver más músculos." actionLabel="Limpiar filtros" onAction={() => { setQuery(''); setRegion('Todas'); }} />
          </div>
        ) : (
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onMouseEnter={() => setHoverId(m.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onClick={() => selectMuscle(m.id)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-xs transition-all duration-150 active:scale-95 ${selectedId === m.id ? 'border-neon bg-neon/15 text-neon shadow-neon-sm' : 'border-white/10 bg-white/[0.03] text-foreground hover:border-neon/40 hover:bg-neon/5'}`}
                >
                  <span className="font-semibold">{m.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{m.view === 'front' ? 'ANT' : 'POST'}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}