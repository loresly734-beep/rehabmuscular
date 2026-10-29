import React from 'react';

type Tone = 'success' | 'warning' | 'destructive' | 'primary' | 'muted' | 'accent';

const tones: Record<Tone, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  muted: 'bg-muted text-muted-foreground',
};

export default function Badge({ tone = 'muted', children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export const statusTone = (s: string): Tone =>
  s === 'Completado' ? 'success' : s === 'En curso' ? 'primary' : s === 'Omitido' ? 'destructive' : 'muted';