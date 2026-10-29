import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { ProgressEntry } from '@/lib/rehabData';

export default function ProgressSummary({ entries }: { entries: ProgressEntry[] }) {
  const last7 = entries.slice(-7);
  const prev7 = entries.slice(-14, -7);
  const avg = (arr: ProgressEntry[]) => (arr.length ? arr.reduce((s, e) => s + e.pain, 0) / arr.length : 0);
  const avgNow = avg(last7);
  const avgPrev = avg(prev7);
  const diff = avgNow - avgPrev;
  const totalExercises = entries.reduce((s, e) => s + e.exerciseIds.length, 0);
  const totalMinutes = entries.reduce((s, e) => s + e.minutes, 0);
  const maxPain = entries.length ? Math.max(...entries.map((e) => e.pain)) : 0;

  const cards = [
    {
      id: 'sum-pain',
      label: 'Dolor promedio (7 días)',
      value: avgNow.toFixed(1),
      suffix: '/10',
      note: prev7.length ? `${diff <= 0 ? '' : '+'}${diff.toFixed(1)} vs. semana anterior` : 'Sin semana previa',
      icon: diff <= 0 ? 'ArrowTrendingDownIcon' : 'ArrowTrendingUpIcon',
      cls: diff <= 0 ? 'border-success/20 bg-success/10' : 'border-destructive/20 bg-destructive/10',
      noteCls: diff <= 0 ? 'text-success' : 'text-destructive',
    },
    { id: 'sum-ex', label: 'Ejercicios completados', value: String(totalExercises), suffix: '', note: `${entries.length} sesiones registradas`, icon: 'CheckCircleIcon', cls: 'border-border bg-card', noteCls: 'text-muted-foreground' },
    { id: 'sum-min', label: 'Minutos de terapia', value: String(totalMinutes), suffix: ' min', note: `${(totalMinutes / Math.max(entries.length, 1)).toFixed(0)} min por sesión`, icon: 'ClockIcon', cls: 'border-border bg-card', noteCls: 'text-muted-foreground' },
    { id: 'sum-max', label: 'Pico de dolor', value: String(maxPain), suffix: '/10', note: 'Registrado el 20/10/2026', icon: 'ExclamationTriangleIcon', cls: 'border-warning/25 bg-warning/10', noteCls: 'text-warning' },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <div key={c.id} className={`rounded-lg border p-4 ${c.cls}`}>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium tracking-wide text-muted-foreground">{c.label}</span>
            <Icon name={c.icon as any} size={20} className="text-primary" />
          </div>
          <p className="mt-2 text-3xl font-bold tabular text-foreground">{c.value}<span className="text-base font-medium text-muted-foreground">{c.suffix}</span></p>
          <p className={`mt-1 text-xs font-medium ${c.noteCls}`}>{c.note}</p>
        </div>
      ))}
    </section>
  );
}