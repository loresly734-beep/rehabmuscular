'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ProgressEntry } from '@/lib/rehabData';

interface TipProps { active?: boolean; payload?: { value: number; payload: { label: string } }[]; }

const CustomTip = ({ active, payload }: TipProps) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs text-muted-foreground">{p.payload.label}</p>
      <p className="text-sm font-bold tabular text-foreground">{p.value} ejercicios</p>
    </div>
  );
};

export default function CompletionChartInner({ entries }: { entries: ProgressEntry[] }) {
  const data = entries.map((e) => ({ id: e.id, label: e.date.slice(8, 10) + '/' + e.date.slice(5, 7), count: e.exerciseIds.length }));
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="label" stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} />
        <YAxis allowDecimals={false} stroke="var(--muted-foreground)" tick={{ fontSize: 12 }} tickLine={false} />
        <Tooltip content={<CustomTip />} cursor={{ fill: 'var(--muted)' }} />
        <ReferenceLine y={3} stroke="var(--primary)" strokeDasharray="4 4" />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((d) => (
            <Cell key={`cell-${d.id}`} fill={d.count >= 3 ? 'var(--primary)' : 'var(--input)'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}