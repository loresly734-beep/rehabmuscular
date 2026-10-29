'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import PoseFigure from '@/components/ui/PoseFigure';
import { exercisesForMuscle, getMuscle, LEGAL_NOTE, type Exercise } from '@/lib/rehabData';
import { getMeshDef, tensionLevel } from '@/app/components/anatomyModel';

type Tab = 'ficha' | 'ejercicios' | 'series' | 'asistente';

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'ficha', label: 'Ficha', icon: 'DocumentTextIcon' },
  { id: 'ejercicios', label: 'Ejercicios', icon: 'PlayCircleIcon' },
  { id: 'series', label: 'Series', icon: 'ClockIcon' },
  { id: 'asistente', label: 'IA', icon: 'SparklesIcon' },
];

const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

function Ficha({ muscleId }: { muscleId: string }) {
  const m = getMuscle(muscleId);
  const def = getMeshDef(muscleId);
  const level = tensionLevel(def?.tension ?? 0);
  return (
    <div className="space-y-3">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neon/80">{m.latin}</p>
        <h3 className="mt-1 text-xl font-bold text-foreground">{m.name}</h3>
      </div>
      <div className="rounded-lg border border-neon/20 bg-neon/5 p-3">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span>Nivel de tensión</span>
          <span style={{ color: level.color }}>{level.label} · {def?.tension ?? 0}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/40">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${def?.tension ?? 0}%`, background: level.color, boxShadow: `0 0 10px ${level.color}` }} />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{m.fn}</p>
      <dl className="grid grid-cols-2 gap-2 text-xs">
        <div className="hud-cell"><dt>Origen</dt><dd>{m.origin}</dd></div>
        <div className="hud-cell"><dt>Inserción</dt><dd>{m.insertion}</dd></div>
      </dl>
      <div className="hud-cell">
        <dt>Lesiones frecuentes</dt>
        <dd className="mt-1 flex flex-wrap gap-1.5">
          {m.commonInjuries.map((i) => (
            <span key={`inj-${i}`} className="rounded-full border border-amber/40 bg-amber/10 px-2 py-0.5 text-[11px] text-amber">{i}</span>
          ))}
        </dd>
      </div>
      <p className="flex items-center gap-2 text-xs text-muted-foreground"><Icon name="ClockIcon" size={14} className="text-amber" />{m.restHint}</p>
      <Link href={`/muscle-detail?m=${m.id}`} className="hud-btn-ghost flex w-full items-center justify-center gap-2 py-2 text-sm">
        Abrir página completa <Icon name="ArrowRightIcon" size={16} />
      </Link>
    </div>
  );
}

function Catalogo({ muscleId, onTrain }: { muscleId: string; onTrain: (e: Exercise) => void }) {
  const list = exercisesForMuscle(muscleId);
  const [open, setOpen] = useState<string>(list[0]?.id ?? '');
  const [step, setStep] = useState(0);

  useEffect(() => { setOpen(list[0]?.id ?? ''); setStep(0); }, [muscleId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const ex = list.find((e) => e.id === open);
    if (!ex) return;
    const t = setInterval(() => setStep((s) => (s + 1) % ex.steps.length), 2200);
    return () => clearInterval(t);
  }, [open, list]);

  return (
    <ul className="space-y-2">
      {list.map((ex) => {
        const isOpen = open === ex.id;
        const cur = ex.steps[Math.min(step, ex.steps.length - 1)];
        return (
          <li key={ex.id} className={`rounded-lg border transition-all duration-200 ${isOpen ? 'border-neon/50 bg-neon/5 shadow-neon' : 'border-white/10 bg-white/[0.03]'}`}>
            <button type="button" onClick={() => { setOpen(ex.id); setStep(0); }} className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left">
              <span>
                <span className="block text-sm font-semibold text-foreground">{ex.name}</span>
                <span className="text-[11px] text-muted-foreground">{ex.sets} series × {ex.reps} · {ex.difficulty}</span>
              </span>
              <Icon name={isOpen ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} className="text-neon" />
            </button>
            {isOpen && (
              <div className="animate-fade-up space-y-3 border-t border-white/10 px-3 py-3">
                <div className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-neon/20 bg-black/30 p-2">
                  <div className="hud-scanline" />
                  <div className="shrink-0"><PoseFigure pose={cur.pose} size={104} /></div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-neon/80">Paso {Math.min(step, ex.steps.length - 1) + 1} / {ex.steps.length}</p>
                    <p className="text-sm font-semibold text-foreground">{cur.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{cur.instruction}</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {ex.precautions.map((p) => (
                    <li key={`${ex.id}-${p}`} className="flex items-start gap-1.5 text-[11px] text-amber"><Icon name="ExclamationTriangleIcon" size={12} className="mt-0.5 shrink-0" />{p}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => onTrain(ex)} className="hud-btn flex w-full items-center justify-center gap-2 py-2 text-sm">
                  <Icon name="PlayIcon" size={16} /> Entrenar este ejercicio
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Contador({ exercise }: { exercise: Exercise }) {
  const [setNo, setSetNo] = useState(1);
  const [reps, setReps] = useState(0);
  const [left, setLeft] = useState(exercise.restSec);
  const [running, setRunning] = useState(false);
  const repTarget = parseInt(exercise.reps, 10) || 10;
  const done = setNo > exercise.sets;

  useEffect(() => { setSetNo(1); setReps(0); setLeft(exercise.restSec); setRunning(false); }, [exercise]);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => { if (running && left === 0) setRunning(false); }, [left, running]);

  const completeSet = () => {
    setSetNo((s) => s + 1);
    setReps(0);
    setLeft(exercise.restSec);
    setRunning(true);
  };

  const pct = ((exercise.restSec - left) / exercise.restSec) * 100;

  return (
    <div className="space-y-3">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neon/80">Ejercicio activo</p>
        <p className="text-sm font-semibold text-foreground">{exercise.name}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="hud-cell text-center">
          <dt>Serie</dt>
          <dd className="font-mono text-3xl font-bold text-neon digital-glow">{done ? exercise.sets : setNo}<span className="text-base text-muted-foreground">/{exercise.sets}</span></dd>
        </div>
        <div className="hud-cell text-center">
          <dt>Repeticiones</dt>
          <dd className="font-mono text-3xl font-bold text-neon digital-glow">{reps}<span className="text-base text-muted-foreground">/{repTarget}</span></dd>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button type="button" disabled={done} onClick={() => setReps((r) => Math.min(r + 1, repTarget))} className="hud-btn flex-1 py-2 text-sm disabled:opacity-40">+ Repetición</button>
        <button type="button" disabled={done || reps === 0} onClick={() => setReps((r) => Math.max(r - 1, 0))} className="hud-btn-ghost px-3 py-2 text-sm disabled:opacity-40" aria-label="Quitar repetición">−</button>
      </div>
      <button type="button" disabled={done} onClick={completeSet} className="hud-btn-ghost flex w-full items-center justify-center gap-2 py-2 text-sm disabled:opacity-40">
        <Icon name="CheckIcon" size={16} /> Completar serie
      </button>
      <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Descanso</p>
        <p className={`font-mono text-4xl font-bold digital-glow ${left === 0 ? 'text-amber' : 'text-neon'}`}>{fmt(left)}</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-neon transition-all duration-700" style={{ width: `${pct}%` }} /></div>
        <div className="mt-3 flex justify-center gap-2">
          <button type="button" onClick={() => { if (left === 0) setLeft(exercise.restSec); setRunning((r) => !r); }} className="hud-btn px-4 py-1.5 text-xs">{running ? 'Pausar' : 'Iniciar'}</button>
          <button type="button" onClick={() => { setRunning(false); setLeft(exercise.restSec); }} className="hud-btn-ghost px-4 py-1.5 text-xs">Reiniciar</button>
        </div>
      </div>
      {done && <p className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 p-2 text-center text-xs font-semibold text-emerald-300">¡Todas las series completadas! Registra tu dolor en Mi progreso.</p>}
    </div>
  );
}

interface Msg { id: string; role: 'user' | 'bot'; text: string; }

const replyFor = (q: string, muscle: string): string => {
  const t = q.toLowerCase();
  if (t.includes('postura') || t.includes('espalda')) return `Para trabajar ${muscle}, mantén la columna neutra, costillas abajo y hombros relajados. Si pierdes la postura, reduce el rango.`;
  if (t.includes('dolor')) return 'Un dolor leve (1–3/10) que baja al terminar suele ser tolerable. Si supera 5/10, se irradia o hay hormigueo, detente y consulta a tu profesional.';
  if (t.includes('descans') || t.includes('serie')) return 'Descansa 30–60 s entre series suaves y hasta 90 s en las exigentes; deja 24–48 h entre sesiones del mismo músculo.';
  return `Cuéntame cómo es el dolor (1–10) y qué ejercicio de ${muscle} haces para orientarte mejor. Esta orientación no reemplaza a tu profesional de salud.`;
};

function Asistente({ muscleName }: { muscleName: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 'h-0', role: 'bot', text: `Sistema en línea. Analizando ${muscleName}. ¿Dudas sobre postura, dolor leve o descanso?` }]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = (q: string) => {
    const v = q.trim();
    if (v.length < 2 || typing) return;
    setMsgs((m) => [...m, { id: `h-u-${m.length}`, role: 'user', text: v }]);
    setText('');
    setTyping(true);
    // Backend integration: send question to AI service here
    setTimeout(() => {
      setMsgs((m) => [...m, { id: `h-b-${m.length}`, role: 'bot', text: replyFor(v, muscleName) }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="flex h-[420px] flex-col">
      <div className="flex items-center gap-3 pb-3">
        <div className="holo-orb" aria-hidden="true"><span /></div>
        <div>
          <p className="text-sm font-semibold text-foreground">AURA · Asistente de salud</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neon/80">● En línea</p>
        </div>
      </div>
      <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto pr-1" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <p className={`animate-fade-up max-w-[88%] rounded-lg px-3 py-2 text-xs leading-relaxed ${m.role === 'user' ? 'border border-neon/40 bg-neon/15 text-foreground' : 'border border-white/10 bg-white/[0.06] text-foreground/90'}`}>{m.text}</p>
          </div>
        ))}
        {typing && <div className="flex gap-1 px-2"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" /><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" /></div>}
        <div ref={end} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {['¿Postura correcta?', 'Dolor leve', '¿Cuánto descansar?'].map((q) => (
          <button key={`hq-${q}`} type="button" onClick={() => send(q)} className="rounded-full border border-neon/30 px-2.5 py-1 text-[11px] text-neon transition-all hover:bg-neon/10 active:scale-95">{q}</button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="mt-2 flex gap-2">
        <label htmlFor="hud-chat" className="sr-only">Escribe tu consulta</label>
        <input id="hud-chat" value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" placeholder="Escribe tu consulta…" className="hud-input flex-1 px-3 py-2 text-xs" />
        <button type="submit" className="hud-btn px-3 py-2" aria-label="Enviar"><Icon name="PaperAirplaneIcon" size={16} /></button>
      </form>
    </div>
  );
}

export default function HudPanel({ muscleId, onClose }: { muscleId: string; onClose: () => void }) {
  const m = getMuscle(muscleId);
  const list = exercisesForMuscle(muscleId);
  const [tab, setTab] = useState<Tab>('ficha');
  const [active, setActive] = useState<Exercise>(list[0]);

  useEffect(() => { setActive(exercisesForMuscle(muscleId)[0]); setTab('ficha'); }, [muscleId]);

  return (
    <aside className="hud-panel animate-hud-in flex flex-col" aria-label={`Panel de ${m.name}`}>
      <div className="flex items-center justify-between border-b border-neon/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-neon shadow-neon" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon">Escáner · {m.region}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar panel" className="rounded-md p-1 text-muted-foreground transition-all hover:bg-white/10 hover:text-foreground active:scale-95"><Icon name="XMarkIcon" size={18} /></button>
      </div>
      <div className="grid grid-cols-4 gap-1 border-b border-white/10 p-2" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-0.5 rounded-md py-1.5 text-[11px] font-semibold transition-all active:scale-95 ${tab === t.id ? 'bg-neon/15 text-neon shadow-neon-sm' : 'text-muted-foreground hover:text-foreground'}`}>
            <Icon name={t.icon as any} size={16} />{t.label}
          </button>
        ))}
      </div>
      <div className="scrollbar-thin max-h-[560px] flex-1 overflow-y-auto p-4">
        {tab === 'ficha' && <Ficha muscleId={muscleId} />}
        {tab === 'ejercicios' && <Catalogo muscleId={muscleId} onTrain={(e) => { setActive(e); setTab('series'); }} />}
        {tab === 'series' && <Contador exercise={active} />}
        {tab === 'asistente' && <Asistente muscleName={m.name} />}
      </div>
      <p className="border-t border-white/10 px-4 py-2 text-[10px] leading-snug text-muted-foreground">{LEGAL_NOTE}.</p>
    </aside>
  );
}
