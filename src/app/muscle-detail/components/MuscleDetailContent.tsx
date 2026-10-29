'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import Badge from '@/components/ui/Badge';
import { muscles, getMuscle, exercisesForMuscle } from '@/lib/rehabData';
import MuscleHero from '@/app/muscle-detail/components/MuscleHero';
import ExerciseCatalog from '@/app/muscle-detail/components/ExerciseCatalog';
import MuscleFacts from '@/app/muscle-detail/components/MuscleFacts';

export default function MuscleDetailContent() {
  const params = useSearchParams();
  const muscle = getMuscle(params?.get('m'));
  const exs = exercisesForMuscle(muscle?.id);
  const related = muscles?.filter((m) => m?.region === muscle?.region && m?.id !== muscle?.id)?.slice(0, 4);

  return (
    <div className="animate-fade-up space-y-6">
      <nav aria-label="Ruta" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="font-medium text-primary hover:underline">Modelo anatómico</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span>{muscle?.region}</span>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="font-semibold text-foreground">{muscle?.name}</span>
      </nav>
      <MuscleHero muscle={muscle} exerciseCount={exs?.length} />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ExerciseCatalog exercises={exs} />
        </div>
        <div className="space-y-6">
          <MuscleFacts muscle={muscle} />
          <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <h2 className="text-base font-semibold text-foreground">Otros músculos de {muscle?.region?.toLowerCase()}</h2>
            {related?.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No hay otros músculos registrados en esta región todavía.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {related?.map((r) => (
                  <li key={`rel-${r?.id}`}>
                    <Link href={`/muscle-detail?m=${r?.id}`} className="flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-all duration-150 hover:bg-muted active:scale-95">
                      {r?.name}
                      <Badge tone="muted">{r?.view === 'front' ? 'Anterior' : 'Posterior'}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}