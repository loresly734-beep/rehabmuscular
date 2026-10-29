'use client';

import React, { useMemo, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { exercises, formatDateEs, painLabel, type ProgressEntry } from '@/lib/rehabData';

const PAGE_SIZE = 6;

interface Props {
  entries: ProgressEntry[];
  onRemove: (id: string) => void;
}

export default function HistoryTable({ entries, onRemove }: Props) {
  const [filter, setFilter] = useState<'Todos' | 'Leve' | 'Moderado' | 'Intenso'>('Todos');
  const [dir, setDir] = useState<'desc' | 'asc'>('desc');
  const [page, setPage] = useState(1);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const rows = useMemo(() => {
    const f = entries.filter((e) => filter === 'Todos' || painLabel(e.pain).label === filter);
    return [...f].sort((a, b) => (dir === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [entries, filter, dir]);

  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const nameOf = (id: string) => exercises.find((e) => e.id === id)?.name ?? id;

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Historial de sesiones</h2>
          <p className="text-xs text-muted-foreground">{rows.length} registros</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(['Todos', 'Leve', 'Moderado', 'Intenso'] as const).map((f) => (
            <button
              key={`hf-${f}`}
              type="button"
              onClick={() => { setFilter(f); setPage(1); }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                filter === f ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-4">
          <EmptyState icon="ClipboardDocumentListIcon" title="Aún no hay registros de sesión" description="Cuando guardes tu primera sesión con fecha, ejercicios y dolor, aparecerá aquí." actionLabel="Ver todos" onAction={() => setFilter('Todos')} />
        </div>
      ) : (
        <div className="scrollbar-thin mt-4 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-semibold">
                  <button type="button" onClick={() => setDir((d) => (d === 'desc' ? 'asc' : 'desc'))} className="flex items-center gap-1 transition-colors hover:text-foreground">
                    Fecha <Icon name={dir === 'desc' ? 'ChevronDownIcon' : 'ChevronUpIcon'} size={12} />
                  </button>
                </th>
                <th className="py-2 pr-3 font-semibold">Ejercicios completados</th>
                <th className="py-2 pr-3 font-semibold">Dolor</th>
                <th className="py-2 pr-3 font-semibold">Min</th>
                <th className="py-2 pr-3 font-semibold">Notas</th>
                <th className="py-2 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((r) => {
                const p = painLabel(r.pain);
                return (
                  <tr key={r.id} className="group border-b border-border/60 transition-colors hover:bg-muted/50">
                    <td className="py-3 pr-3 font-semibold tabular text-foreground">{formatDateEs(r.date)}</td>
                    <td className="py-3 pr-3">
                      <div className="flex flex-wrap gap-1">
                        {r.exerciseIds.map((id) => (
                          <span key={`${r.id}-${id}`} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">{nameOf(id)}</span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold tabular text-foreground">{r.pain}</span>
                        <Badge tone={p.tone}>{p.label}</Badge>
                      </div>
                    </td>
                    <td className="py-3 pr-3 tabular text-foreground">{r.minutes}</td>
                    <td className="max-w-[220px] truncate py-3 pr-3 text-muted-foreground" title={r.notes}>{r.notes || '—'}</td>
                    <td className="py-3 text-right">
                      {confirmId === r.id ? (
                        <div className="flex items-center justify-end gap-1">
                          <button type="button" onClick={() => { onRemove(r.id); setConfirmId(null); }} className="rounded-md bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground transition-all active:scale-95">Eliminar</button>
                          <button type="button" onClick={() => setConfirmId(null)} className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground transition-all active:scale-95">Cancelar</button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmId(r.id)}
                          aria-label={`Eliminar registro del ${formatDateEs(r.date)}`}
                          title="Eliminar registro — esta acción no se puede deshacer"
                          className="rounded-md p-1.5 text-muted-foreground opacity-0 transition-all duration-150 hover:bg-destructive/10 hover:text-destructive focus:opacity-100 group-hover:opacity-100"
                        >
                          <Icon name="TrashIcon" size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-muted-foreground">Mostrando {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, rows.length)} de {rows.length}</p>
          <div className="flex items-center gap-1">
            <button type="button" disabled={current === 1} onClick={() => setPage(current - 1)} className="rounded-md border border-border p-1.5 text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-40" aria-label="Página anterior">
              <Icon name="ChevronLeftIcon" size={16} />
            </button>
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={`page-${i + 1}`}
                type="button"
                onClick={() => setPage(i + 1)}
                className={`h-8 min-w-8 rounded-md px-2 text-xs font-semibold tabular transition-all active:scale-95 ${current === i + 1 ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground hover:bg-muted'}`}
              >
                {i + 1}
              </button>
            ))}
            <button type="button" disabled={current === pages} onClick={() => setPage(current + 1)} className="rounded-md border border-border p-1.5 text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-40" aria-label="Página siguiente">
              <Icon name="ChevronRightIcon" size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}