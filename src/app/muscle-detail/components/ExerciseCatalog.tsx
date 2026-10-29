'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import type { Exercise, Difficulty } from '@/lib/rehabData';

const diffTone = (d: Difficulty) => (d === 'Suave' ? 'success' : d === 'Moderado' ? 'warning' : 'destructive');

export default function ExerciseCatalog({ exercises }: { exercises: Exercise[] }) {
  const [filter, setFilter] = useState<Difficulty | 'Todos'>('Todos');
  const list = exercises.filter((e) => filter === 'Todos' || e.difficulty === filter);

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-foreground">Catálogo de ejercicios de rehabilitación</h2>
        <div className="flex flex-wrap gap-2">
          {(['Todos', 'Suave', 'Moderado', 'Avanzado'] as const).map((f) => (
            <button
              key={`diff-${f}`}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                filter === f ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-4">
          <EmptyState icon="BoltSlashIcon" title="Sin ejercicios en este nivel" description="Aún no hay ejercicios de esa dificultad para este músculo. Prueba con otro nivel." actionLabel="Ver todos" onAction={() => setFilter('Todos')} />
        </div>
      ) : (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {list.map((ex) => (
            <li key={ex.id} className="group flex flex-col rounded-lg border border-border bg-background p-4 transition-all duration-150 hover:border-primary/40 hover:shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold leading-snug text-foreground">{ex.name}</h3>
                <Badge tone={diffTone(ex.difficulty)}>{ex.difficulty}</Badge>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{ex.summary}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-muted p-2"><p className="text-[11px] text-muted-foreground">Series</p><p className="text-sm font-bold tabular text-foreground">{ex.sets}</p></div>
                <div className="rounded-md bg-muted p-2"><p className="text-[11px] text-muted-foreground">Reps</p><p className="text-sm font-bold tabular text-foreground">{ex.reps}</p></div>
                <div className="rounded-md bg-muted p-2"><p className="text-[11px] text-muted-foreground">Descanso</p><p className="text-sm font-bold tabular text-foreground">{ex.restSec}s</p></div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="ClockIcon" size={14} /> {ex.durationMin} min · {ex.steps.length} pasos
              </div>
              <Link href={`/exercise-guide?e=${ex.id}`} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150hover:bg-primary/90 active:scale-95">
                Ver guía paso a paso <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}