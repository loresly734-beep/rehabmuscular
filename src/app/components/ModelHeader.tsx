import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ModelHeader() {
  return (
    <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-neon/90">Huánuco · Telerrehabilitación · Módulo 3D</p>
        <h1 className="mt-1 text-hero-xl font-bold tracking-tight text-foreground">
          Escáner <span className="text-neon digital-glow">anatómico</span> interactivo
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Gira el modelo, pasa el cursor sobre un músculo para ver su ficha holográfica y haz clic para acercar la cámara y abrir su panel de ejercicios.
        </p>
      </div>
      <div className="glass flex items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground">
        <Icon name="ClockIcon" size={16} className="text-neon" />
        SYNC: 29/10/2026 · 00:52
      </div>
    </section>
  );
}