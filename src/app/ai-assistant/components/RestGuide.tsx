import React from 'react';
import Icon from '@/components/ui/AppIcon';

const rests = [
  { id: 'rest-1', label: 'Entre series', value: '30–60 s' },
  { id: 'rest-2', label: 'Mismo músculo', value: '24–48 h' },
  { id: 'rest-3', label: 'Tras dolor 7+', value: '72 h' },
  { id: 'rest-4', label: 'Sueño reparador', value: '7–8 h' },
];

export default function RestGuide() {
  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Icon name="MoonIcon" size={20} className="text-primary" />
        <h2 className="text-base font-semibold text-foreground">Tiempos de descanso</h2>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-3">
        {rests?.map((r) => (
          <li key={r?.id} className="rounded-lg bg-muted p-3">
            <p className="text-xs text-muted-foreground">{r?.label}</p>
            <p className="mt-1 text-lg font-bold tabular text-foreground">{r?.value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}