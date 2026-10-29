'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import Icon from '@/components/ui/AppIcon';
import { exercises, painLabel, type ProgressEntry } from '@/lib/rehabData';

interface FormValues {
  date: string;
  exerciseIds: string[];
  pain: number;
  minutes: number;
  notes: string;
}

export default function LogForm({ onAdd }: { onAdd: (e: Omit<ProgressEntry, 'id'>) => void }) {
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { date: '2026-10-29', exerciseIds: [], pain: 3, minutes: 15, notes: '' },
  });
  const pain = watch('pain');
  const info = painLabel(Number(pain));

  const onSubmit = (v: FormValues) => {
    setSaving(true);
    // Backend integration: POST new ProgressEntry to the API
    setTimeout(() => {
      onAdd({ date: v.date, exerciseIds: v.exerciseIds, pain: Number(v.pain), minutes: Number(v.minutes), notes: v.notes });
      setSaving(false);
      toast.success('Registro guardado correctamente');
      reset({ date: '2026-10-29', exerciseIds: [], pain: 3, minutes: 15, notes: '' });
    }, 700);
  };

  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-6 xl:sticky xl:top-20 xl:self-start">
      <Toaster position="bottom-right" richColors />
      <h2 className="text-lg font-semibold text-foreground">Registrar sesión</h2>
      <p className="text-xs text-muted-foreground">Todos los campos con * son obligatorios.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
        <div>
          <label htmlFor="log-date" className="block text-sm font-medium text-foreground">Fecha *</label>
          <input
            id="log-date"
            type="date"
            {...register('date', { required: 'Selecciona una fecha' })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date.message}</p>}
        </div>

        <div>
          <span className="block text-sm font-medium text-foreground">Ejercicios completados *</span>
          <p className="text-xs text-muted-foreground">Marca todos los que hiciste hoy.</p>
          <Controller
            name="exerciseIds"
            control={control}
            rules={{ validate: (v) => v.length > 0 || 'Selecciona al menos un ejercicio' }}
            render={({ field }) => (
              <ul className="scrollbar-thin mt-2 max-h-44 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
                {exercises.map((ex) => {
                  const checked = field.value.includes(ex.id);
                  return (
                    <li key={`opt-${ex.id}`}>
                      <label className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${checked ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => field.onChange(checked ? field.value.filter((id) => id !== ex.id) : [...field.value, ex.id])}
                          className="h-4 w-4 accent-primary"
                        />
                        {ex.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          />
          {errors.exerciseIds && <p className="mt-1 text-xs text-destructive">{errors.exerciseIds.message as string}</p>}
        </div>

        <div>
          <label htmlFor="log-pain" className="block text-sm font-medium text-foreground">Nivel de dolor (1–10) *</label>
          <input id="log-pain" type="range" min={1} max={10} {...register('pain', { valueAsNumber: true })} className="mt-2 w-full accent-primary" />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-2xl font-bold tabular text-foreground">{pain}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${info.tone === 'success' ? 'bg-success/10 text-success' : info.tone === 'warning' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'}`}>{info.label}</span>
          </div>
          {Number(pain) >= 7 && (
            <p className="mt-2 flex items-start gap-1 rounded-lg bg-destructive/10 p-2 text-xs text-destructive">
              <Icon name="ExclamationTriangleIcon" size={14} className="mt-0.5 shrink-0" />
              Dolor intenso: suspende los ejercicios y consulta a tu profesional de salud.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="log-min" className="block text-sm font-medium text-foreground">Minutos de terapia *</label>
          <input
            id="log-min"
            type="number"
            {...register('minutes', { required: 'Indica los minutos', min: { value: 1, message: 'Mínimo 1 minuto' }, max: { value: 180, message: 'Máximo 180 minutos' }, valueAsNumber: true })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm tabular text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          {errors.minutes && <p className="mt-1 text-xs text-destructive">{errors.minutes.message}</p>}
        </div>

        <div>
          <label htmlFor="log-notes" className="block text-sm font-medium text-foreground">Notas</label>
          <textarea
            id="log-notes"
            rows={3}
            placeholder="Cómo te sentiste, qué te costó, rigidez matinal…"
            {...register('notes', { maxLength: { value: 240, message: 'Máximo 240 caracteres' } })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          {errors.notes && <p className="mt-1 text-xs text-destructive">{errors.notes.message}</p>}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95 disabled:opacity-70"
        >
          {saving ? <Icon name="ArrowPathIcon" size={18} className="animate-spin" /> : <Icon name="PlusCircleIcon" size={18} />}
          {saving ? 'Guardando…' : 'Guardar registro'}
        </button>
      </form>
    </section>
  );
}