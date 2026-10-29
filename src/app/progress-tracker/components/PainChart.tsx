'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { ProgressEntry } from '@/lib/rehabData';

const PainChartInner = dynamic(() => import('@/app/progress-tracker/components/PainChartInner'), {
  ssr: false,
  loading: () => <div className="h-72 animate-pulse rounded-lg bg-muted" />,
});

export default function PainChart({ entries }: { entries: ProgressEntry[] }) {
  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Evolución del dolor</h2>
          <p className="text-xs text-muted-foreground">Escala 1–10 · Hubo un pico el 20/10 tras cargar peso</p>
        </div>
      </div>
      <div className="mt-4">
        <PainChartInner entries={entries} />
      </div>
    </section>
  );
}