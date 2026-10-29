import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const points = [
  { id: 'pt-model', icon: 'UserIcon', title: 'Modelo anatómico interactivo', text: 'Toca un músculo y abre su guía de ejercicios.' },
  { id: 'pt-guide', icon: 'PlayCircleIcon', title: 'Guías paso a paso', text: 'Series, repeticiones, descanso y precauciones claras.' },
  { id: 'pt-pain', icon: 'ChartBarIcon', title: 'Registro de dolor 1–10', text: 'Observa cómo baja tu dolor semana a semana.' },
];

export default function AuthBrandSide() {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden bg-auth-panel p-10 lg:flex">
      <div className="flex items-center gap-2">
        <AppLogo size={44} />
        <span className="text-xl font-bold tracking-tight text-background">RehabMuscular</span>
      </div>
      <div>
        <h2 className="text-hero-xl font-bold text-background">Tu recuperación, guiada desde casa en Huánuco</h2>
        <ul className="mt-8 space-y-5">
          {points.map((p) => (
            <li key={p.id} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/15 text-background">
                <Icon name={p.icon as any} size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-background">{p.title}</p>
                <p className="text-sm text-background/80">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-background/80">Esta herramienta ofrece orientación y seguimiento de ejercicios terapéuticos en casa, no reemplaza la consulta ni el diagnóstico médico profesional.</p>
    </aside>
  );
}