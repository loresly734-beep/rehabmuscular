'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import Badge from '@/components/ui/Badge';
import { exercises, getExercise, getMuscle } from '@/lib/rehabData';
import StepViewer from '@/app/exercise-guide/components/StepViewer';
import RestTimer from '@/app/exercise-guide/components/RestTimer';
import PrecautionsPanel from '@/app/exercise-guide/components/PrecautionsPanel';
import CompletionPanel from '@/app/exercise-guide/components/CompletionPanel';

export default function ExerciseGuideContent() {
  const params = useSearchParams();
  const initial = getExercise(params?.get('e'));
  const [exerciseId, setExerciseId] = useState<string>(initial?.id);
  const exercise = getExercise(exerciseId);
  const muscle = getMuscle(exercise?.muscleId);
  const siblings = exercises?.filter((e) => e?.muscleId === exercise?.muscleId);

  return (
    <div className="animate-fade-up space-y-6">
      <nav aria-label="Ruta" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="font-medium text-primary hover:underline">Modelo anatómico</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href={`/muscle-detail?m=${muscle?.id}`} className="font-medium text-primary hover:underline">{muscle?.name}</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="font-semibold text-foreground">{exercise?.name}</span>
      </nav>

      <section className="rounded-lg border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="primary">{muscle?.name}</Badge>
              <Badge tone={exercise?.difficulty === 'Suave' ? 'success' : exercise?.difficulty === 'Moderado' ? 'warning' : 'destructive'}>{exercise?.difficulty}</Badge>
            </div>
            <h1 className="mt-3 text-hero-xl font-bold tracking-tight text-foreground">{exercise?.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exercise?.summary}</p>
          </div>
          <div className="grid w-full grid-cols-4 gap-2 md:w-96">
            <div className="rounded-lg bg-primary/10 p-3 text-center"><p className="text-[11px] font-medium text-muted-foreground">Series</p><p className="text-xl font-bold tabular text-foreground">{exercise?.sets}</p></div>
            <div className="rounded-lg bg-primary/10 p-3 text-center"><p className="text-[11px] font-medium text-muted-foreground">Reps</p><p className="text-sm font-bold tabular leading-7 text-foreground">{exercise?.reps}</p></div>
            <div className="rounded-lg bg-accent/10 p-3 text-center"><p className="text-[11px] font-medium text-muted-foreground">Descanso</p><p className="text-xl font-bold tabular text-foreground">{exercise?.restSec}s</p></div>
            <div className="rounded-lg bg-muted p-3 text-center"><p className="text-[11px] font-medium text-muted-foreground">Tiempo</p><p className="text-xl font-bold tabular text-foreground">{exercise?.durationMin}m</p></div>
          </div>
        </div>
        {siblings?.length > 1 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Otros ejercicios de {muscle?.name}:</span>
            {siblings?.map((s) => (
              <button
                key={`sib-${s?.id}`}
                type="button"
                onClick={() => setExerciseId(s?.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                  s?.id === exerciseId ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground'
                }`}
              >
                {s?.name}
              </button>
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <StepViewer key={exercise?.id} exercise={exercise} />
        </div>
        <div className="space-y-6">
          <RestTimer key={`timer-${exercise?.id}`} seconds={exercise?.restSec} />
          <PrecautionsPanel precautions={exercise?.precautions} />
          <CompletionPanel key={`done-${exercise?.id}`} exercise={exercise} />
        </div>
      </div>
    </div>
  );
}