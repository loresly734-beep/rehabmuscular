'use client';

import React, { useMemo, useState } from 'react';
import { progressSeed, type ProgressEntry } from '@/lib/rehabData';
import ProgressSummary from '@/app/progress-tracker/components/ProgressSummary';
import LogForm from '@/app/progress-tracker/components/LogForm';
import PainChart from '@/app/progress-tracker/components/PainChart';
import CompletionChart from '@/app/progress-tracker/components/CompletionChart';
import HistoryTable from '@/app/progress-tracker/components/HistoryTable';

export default function ProgressTrackerContent() {
  const [entries, setEntries] = useState<ProgressEntry[]>(progressSeed);
  // Backend integration: load and persist ProgressEntry records per patient here

  const sorted = useMemo(() => [...entries].sort((a, b) => a.date.localeCompare(b.date)), [entries]);

  const addEntry = (e: Omit<ProgressEntry, 'id'>) =>
    setEntries((prev) => [...prev, { ...e, id: `log-${String(prev.length + 1).padStart(3, '0')}` }]);

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="animate-fade-up space-y-6">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Seguimiento diario</p>
          <h1 className="mt-1 text-hero-xl font-bold tracking-tight text-foreground">Mi registro de progreso</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Anota la fecha, los ejercicios completados y tu nivel de dolor (1 al 10) para ver cómo evoluciona tu recuperación.</p>
        </div>
        <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">Última actualización: 29/10/2026 · 00:52</div>
      </section>

      <ProgressSummary entries={sorted} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <PainChart entries={sorted} />
          <CompletionChart entries={sorted} />
        </div>
        <LogForm onAdd={addEntry} />
      </div>

      <HistoryTable entries={sorted} onRemove={removeEntry} />
    </div>
  );
}