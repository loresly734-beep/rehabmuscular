'use client';

import React from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ProgressEntry } from '@/lib/rehabData';

interface TipProps { active?: boolean; payload?: { value: number; payload: { label: string; minutes: number } }[]; }

const CustomTip = ({ active, payload }: TipProps) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{p.payload.label}</p>
      <p className="text-sm font-bold tabular text-foreground">Dolor {p.value}/10</p>
      <p className="text-xs tabular text-muted-foreground">{p.payload.minutes} min de terapia</p>
    </div>
  );
};

export default function PainChartInner({ entries }: { entries: ProgressEntry[] }) {
  const data = entries.map((e) => ({ label: e.date.slice(8, 10) + '/' + e.date.slice(5, 7), pain: e.pain, minutes: e.minutes }));
  return (
    <ResponsiveContainer width="100%" height={288}>
      <AreaChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="painFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis domain={[0, 10]} ticks={[0, 3, 6, 10]} stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} />
        <Tooltip content={<CustomTip />} />
        <ReferenceLine y={3} stroke="var(--success)" strokeDasharray="4 4" label={{ value: 'Leve', fill: 'var(--success)', fontSize: 11, position: 'insideTopRight' }} />
        <ReferenceLine y={7} stroke="var(--destructive)" strokeDasharray="4 4" label={{ value: 'Intenso', fill: 'var(--destructive)', fontSize: 11, position: 'insideTopRight' }} />
        <Area type="monotone" dataKey="pain" stroke="var(--accent)" strokeWidth={2.5} fill="url(#painFill)" dot={{ r: 3, fill: 'var(--accent)' }} activeDot={{ r: 5 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}