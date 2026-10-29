import React from 'react';
import Icon from '@/components/ui/AppIcon';

const levels = [
  { id: 'pain-lvl-1', range: '1 – 3', label: 'Leve', tone: 'bg-success/10 text-success', advice: 'Puedes continuar con rango controlado. Observa si disminuye al terminar.' },
  { id: 'pain-lvl-2', range: '4 – 6', label: 'Moderado', tone: 'bg-warning/10 text-warning', advice: 'Reduce carga y repeticiones. Aplica descanso extra y vuelve a evaluar.' },
  { id: 'pain-lvl-3', range: '7 – 10', label: 'Intenso', tone: 'bg-destructive/10 text-destructive', advice: 'Detén el ejercicio y consulta a tu profesional de salud.' },
];

export default function PainScaleGuide() {
  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center gap-2">
        <Icon name="HeartIcon" size={20} className="text-accent" />
        <h2 className="text-base font-semibold text-foreground">Escala de dolor (1–10)</h2>
      </div>
      <ul className="mt-3 space-y-3">
        {levels?.map((l) => (
          <li key={l?.id} className={`rounded-lg p-3 ${l?.tone}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tabular">{l?.range}</span>
              <span className="text-xs font-semibold">{l?.label}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-foreground">{l?.advice}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}