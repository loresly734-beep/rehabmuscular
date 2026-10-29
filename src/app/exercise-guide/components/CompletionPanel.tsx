'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { painLabel, type Exercise } from '@/lib/rehabData';

export default function CompletionPanel({ exercise }: { exercise: Exercise }) {
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pain, setPain] = useState(3);
  const info = painLabel(pain);

  const handleComplete = () => {
    setSaving(true);
    // Backend integration: POST completed exercise + pain to progress API
    setTimeout(() => {
      setSaving(false);
      setCompleted(true);
    }, 700);
  };

  if (completed) {
    return (
      <section className="animate-fade-up rounded-lg border border-success/30 bg-success/10 p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Icon name="CheckBadgeIcon" size={24} className="text-success" />
          <h2 className="text-base font-semibold text-foreground">¡Ejercicio completado!</h2>
        </div>
        <p className="mt-2 text-sm text-foreground">{exercise.name} registrado con dolor {pain}/10 ({info.label.toLowerCase()}).</p>
        <Link href="/progress-tracker" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95">
          Ver mi progreso <Icon name="ArrowRightIcon" size={16} />
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <h2 className="text-base font-semibold text-foreground">¿Cómo te sentiste?</h2>
      <label htmlFor="pain-after" className="mt-3 block text-sm font-medium text-foreground">Dolor después del ejercicio (1–10)</label>
      <p className="text-xs text-muted-foreground">1 = sin dolor, 10 = dolor insoportable</p>
      <input
        id="pain-after"
        type="range"
        min={1}
        max={10}
        value={pain}
        onChange={(e) => setPain(Number(e.target.value))}
        className="mt-3 w-full accent-primary"
      />
      <div className="mt-1 flex items-center justify-between">
        <span className="text-2xl font-bold tabular text-foreground">{pain}</span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${info.tone === 'success' ? 'bg-success/10 text-success' : info.tone === 'warning' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>{info.label}</span>
      </div>
      <button
        type="button"
        onClick={handleComplete}
        disabled={saving}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-95 disabled:opacity-70"
      >
        {saving ? <Icon name="ArrowPathIcon" size={18} className="animate-spin" /> : <Icon name="CheckCircleIcon" size={18} />}
        {saving ? 'Guardando…' : 'Marcar como completado'}
      </button>
    </section>
  );
}