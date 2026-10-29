'use client';

import React, { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RestTimer({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          setRunning(false);
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const pct = ((seconds - left) / seconds) * 100;
  const finished = left === 0;

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Temporizador de descanso</h2>
        <Icon name="ClockIcon" size={20} className="text-primary" />
      </div>
      <p className={`mt-4 text-center text-5xl font-bold tabular ${finished ? 'text-success' : 'text-foreground'}`}>
        {String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}
      </p>
      <p className="mt-1 text-center text-xs text-muted-foreground">{finished ? '¡Descanso completo! Puedes iniciar la siguiente serie.' : `Descansa ${seconds} segundos entre series`}</p>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => { if (finished) setLeft(seconds); setRunning((r) => !r); }}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95"
        >
          <Icon name={running ? 'PauseIcon' : 'PlayIcon'} size={16} />
          {running ? 'Pausar' : finished ? 'Reiniciar' : 'Iniciar'}
        </button>
        <button
          type="button"
          onClick={() => { setRunning(false); setLeft(seconds); }}
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition-all duration-150 hover:bg-muted active:scale-95"
        >
          <Icon name="ArrowPathIcon" size={16} /> Reiniciar
        </button>
      </div>
    </section>
  );
}