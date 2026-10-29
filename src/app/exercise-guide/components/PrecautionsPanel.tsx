import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function PrecautionsPanel({ precautions }: { precautions: string[] }) {
  return (
    <section className="rounded-lg border border-warning/30 bg-warning/10 p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Icon name="ExclamationTriangleIcon" size={20} className="text-warning" />
        <h2 className="text-base font-semibold text-foreground">Precauciones</h2>
      </div>
      <ul className="mt-3 space-y-2">
        {precautions.map((p) => (
          <li key={`prec-${p}`} className="flex items-start gap-2 text-sm text-foreground">
            <Icon name="CheckCircleIcon" size={16} className="mt-0.5 shrink-0 text-warning" />
            {p}
          </li>
        ))}
        <li key="prec-pain-stop" className="flex items-start gap-2 text-sm font-semibold text-foreground">
          <Icon name="HandRaisedIcon" size={16} className="mt-0.5 shrink-0 text-destructive" />
          Suspende si el dolor supera 7/10 o aparece hormigueo.
        </li>
      </ul>
    </section>
  );
}