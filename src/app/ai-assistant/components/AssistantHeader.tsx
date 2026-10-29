import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function AssistantHeader() {
  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">Orientación en casa</p>
        <h1 className="mt-1 text-hero-xl font-bold tracking-tight text-foreground">Asistente de rehabilitación</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Resuelve dudas sobre postura, manejo del dolor leve y tiempos de descanso entre ejercicios.
        </p>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-success" />
        <Icon name="SparklesIcon" size={16} className="text-primary" />
        Asistente en línea
      </div>
    </section>
  );
}