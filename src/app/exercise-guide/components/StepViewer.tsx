'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PoseFigure from '@/components/ui/PoseFigure';
import type { Exercise } from '@/lib/rehabData';

export default function StepViewer({ exercise }: { exercise: Exercise }) {
  const [index, setIndex] = useState(0);
  const [visited, setVisited] = useState<string[]>([exercise.steps[0].id]);
  const step = exercise.steps[index];
  const isFirst = index === 0;
  const isLast = index === exercise.steps.length - 1;

  const go = (next: number) => {
    setIndex(next);
    setVisited((v) => (v.includes(exercise.steps[next].id) ? v : [...v, exercise.steps[next].id]));
  };

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Guía visual paso a paso</h2>
        <span className="text-sm font-semibold tabular text-muted-foreground">Paso {index + 1} de {exercise.steps.length}</span>
      </div>

      <ol className="mt-4 flex items-center gap-2" aria-label="Progreso de pasos">
        {exercise.steps.map((s, i) => (
          <li key={s.id} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir al paso ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'step' : undefined}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-150 active:scale-95 ${
                i === index ? 'animate-pulse-ring bg-primary text-primary-foreground' : visited.includes(s.id) ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              }`}
            >
              {i + 1}
            </button>
            {i < exercise.steps.length - 1 && <div className={`h-1 flex-1 rounded-full transition-colors ${i < index ? 'bg-primary' : 'bg-muted'}`} />}
          </li>
        ))}
      </ol>

      <div key={step.id} className="animate-fade-up mt-6 grid gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg bg-secondary/60 p-4">
          <PoseFigure pose={step.pose} size={280} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Paso {index + 1}</p>
          <h3 className="mt-1 text-xl font-bold text-foreground">{step.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-foreground">{step.instruction}</p>
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            <Icon name="LightBulbIcon" size={16} className="text-warning" />
            Respira con normalidad y mueve solo hasta donde no sientas dolor agudo.
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => go(index - 1)}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="ArrowLeftIcon" size={16} /> Anterior
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => go(index + 1)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Siguiente <Icon name="ArrowRightIcon" size={16} />
        </button>
      </div>
    </section>
  );
}