'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ProgressEntry } from '@/lib/rehabData';

const CompletionChartInner = dynamic(() => import('@/app/progress-tracker/components/CompletionChartInner'), {
  ssr: false,
  loading: () => <div className="h-60 animate-pulse rounded-lg bg-muted" />,
});

export default function CompletionChart({ entries }: { entries: ProgressEntry[] }) {
  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-foreground">Ejercicios completados por día</h2>
      <p className="text-xs text-muted-foreground">Meta diaria: 3 ejercicios · Barras claras = por debajo de la meta</p>
      <div className="mt-4">
        <CompletionChartInner entries={entries} />
      </div>
    </section>
  );
}