import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Badge from '@/components/ui/Badge';
import type { Muscle } from '@/lib/rehabData';

export default function MuscleHero({ muscle, exerciseCount }: { muscle: Muscle; exerciseCount: number }) {
  return (
    <section className="rounded-lg border border-border bg-card p-5 sm:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">{muscle.region}</Badge>
            <Badge tone="muted">{muscle.view === 'front' ? 'Vista anterior' : 'Vista posterior'}</Badge>
          </div>
          <h1 className="mt-3 text-hero-xl font-bold tracking-tight text-foreground">{muscle.name}</h1>
          <p className="mt-1 text-sm italic text-muted-foreground">{muscle.latin}</p>
          <h2 className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">Función principal</h2>
          <p className="mt-1 text-base leading-relaxed text-foreground">{muscle.fn}</p>
        </div>
        <div className="grid w-full grid-cols-2 gap-3 md:w-72">
          <div className="rounded-lg bg-primary/10 p-3">
            <p className="text-[13px] font-medium text-muted-foreground">Ejercicios</p>
            <p className="mt-1 text-2xl font-bold tabular text-foreground">{exerciseCount}</p>
          </div>
          <div className="rounded-lg bg-warning/10 p-3">
            <p className="text-[13px] font-medium text-muted-foreground">Descanso</p>
            <p className="mt-1 text-sm font-semibold leading-tight text-foreground">{muscle.restHint}</p>
          </div>
          <Link href="/ai-assistant" className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-95">
            <Icon name="ChatBubbleLeftRightIcon" size={18} />
            Preguntar al asistente sobre este músculo
          </Link>
        </div>
      </div>
    </section>
  );
}