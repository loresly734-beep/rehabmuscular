'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Badge, { statusTone } from '@/components/ui/Badge';
import { todayPlan, getExercise, getMuscle, type TodayPlanItem } from '@/lib/rehabData';

export default function TodayPlan() {
  const [items, setItems] = useState<TodayPlanItem[]>(todayPlan);
  // Backend integration: persist daily plan status per patient here

  const markDone = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'Completado' } : i)));
  const skip = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'Omitido' } : i)));

  const done = items.filter((i) => i.status === 'Completado').length;

  return (
    <section className="hud-frame p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-neon">Plan de hoy</h2>
          <p className="text-xs text-muted-foreground">Jueves 29/10/2026 · {done} de {items.length} completados</p>
        </div>
        <Icon name="CalendarDaysIcon" size={22} className="text-primary" />
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-neon shadow-neon-sm transition-all duration-300" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((it) => {
          const ex = getExercise(it.exerciseId);
          const mu = getMuscle(ex.muscleId);
          return (
            <li key={it.id} className="group rounded-lg border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-neon/30 hover:bg-neon/5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{ex.name}</p>
                  <p className="text-xs text-muted-foreground">{mu.name} · {ex.sets} series × {ex.reps}</p>
                </div>
                <span className="shrink-0 text-xs font-semibold tabular text-muted-foreground">{it.time}</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <Badge tone={statusTone(it.status)}>{it.status}</Badge>
                <div className="flex items-center gap-1">
                  {(it.status === 'Pendiente' || it.status === 'En curso') && (
                    <>
                      <Link
                        href={`/exercise-guide?e=${ex.id}`}
                        className="hud-btn flex items-center gap-1 px-2.5 py-1 text-xs"
                      >
                        <Icon name="PlayIcon" size={12} /> Iniciar
                      </Link>
                      <button type="button" onClick={() => markDone(it.id)} aria-label="Marcar completado" title="Marcar completado" className="rounded-md p-1.5 text-success transition-all hover:bg-success/10 active:scale-95">
                        <Icon name="CheckIcon" size={16} />
                      </button>
                      <button type="button" onClick={() => skip(it.id)} aria-label="Omitir ejercicio" title="Omitir hoy" className="rounded-md p-1.5 text-muted-foreground transition-all hover:bg-muted active:scale-95">
                        <Icon name="ForwardIcon" size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Link href="/progress-tracker" className="hud-btn-ghost mt-4 flex items-center justify-center gap-2 px-3 py-2 text-sm">
        Registrar mi dolor de hoy <Icon name="ArrowRightIcon" size={16} />
      </Link>
    </section>
  );
}