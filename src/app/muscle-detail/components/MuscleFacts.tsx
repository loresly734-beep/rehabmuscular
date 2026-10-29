import React from 'react';
import Icon from '@/components/ui/AppIcon';
import type { Muscle } from '@/lib/rehabData';

export default function MuscleFacts({ muscle }: { muscle: Muscle }) {
  const rows = [
    { id: 'fact-origin', label: 'Origen', value: muscle.origin, icon: 'MapPinIcon' },
    { id: 'fact-insertion', label: 'Inserción', value: muscle.insertion, icon: 'FlagIcon' },
  ];
  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <h2 className="text-base font-semibold text-foreground">Datos anatómicos</h2>
      <dl className="mt-3 space-y-3">
        {rows.map((r) => (
          <div key={r.id} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name={r.icon as any} size={16} />
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{r.label}</dt>
              <dd className="text-sm text-foreground">{r.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Molestias frecuentes</h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {muscle.commonInjuries.map((c) => (
          <li key={`inj-${muscle.id}-${c}`} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{c}</li>
        ))}
      </ul>
      <div className="mt-5 flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3">
        <Icon name="ExclamationTriangleIcon" size={18} className="mt-0.5 shrink-0 text-warning" />
        <p className="text-xs leading-relaxed text-foreground">Si el dolor es agudo, hay hormigueo persistente o hinchazón, suspende los ejercicios y consulta a tu fisioterapeuta o médico.</p>
      </div>
    </section>
  );
}