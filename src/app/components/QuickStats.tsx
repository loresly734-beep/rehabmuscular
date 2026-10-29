import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function QuickStats() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="glass rounded-lg border-success/30 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Dolor promedio (7d)</span>
          <Icon name="ArrowTrendingDownIcon" size={20} className="text-success" />
        </div>
        <p className="mt-2 font-mono text-3xl font-bold tabular text-success digital-glow">4.6<span className="text-base font-medium text-muted-foreground">/10</span></p>
        <p className="mt-1 text-xs font-medium text-success">−1.8 vs. semana anterior</p>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Ejercicios de hoy</span>
          <Icon name="CheckCircleIcon" size={20} className="text-neon" />
        </div>
        <p className="mt-2 font-mono text-3xl font-bold tabular text-neon digital-glow">2<span className="text-base font-medium text-muted-foreground"> / 5</span></p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full w-2/5 rounded-full bg-neon shadow-neon-sm" /></div>
      </div>
      <div className="glass rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Racha consecutiva</span>
          <Icon name="FireIcon" size={20} className="text-amber" />
        </div>
        <p className="mt-2 font-mono text-3xl font-bold tabular text-foreground">13 <span className="text-base font-medium text-muted-foreground">días</span></p>
        <p className="mt-1 text-xs text-muted-foreground">Récord personal: 13 días</p>
      </div>
      <div className="glass rounded-lg border-amber/40 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Descanso recomendado</span>
          <Icon name="MoonIcon" size={20} className="text-amber" />
        </div>
        <p className="mt-2 font-mono text-3xl font-bold tabular text-amber">48 <span className="text-base font-medium text-muted-foreground">h</span></p>
        <p className="mt-1 text-xs font-medium text-amber">Deltoides: evita sobrecarga hoy</p>
      </div>
    </section>
  );
}