'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';

interface Msg {
  id: string;
  role: 'user' | 'bot';
  text: string;
  time: string;
}

const quickPrompts = [
  '¿Cómo debo colocar la espalda al hacer el puente?',
  'Tengo dolor leve en el hombro, ¿sigo ejercitando?',
  '¿Cuánto debo descansar entre series?',
  '¿Cuándo usar hielo o calor?',
];

const replyFor = (q: string): string => {
  const t = q.toLowerCase();
  if (t.includes('espalda') || t.includes('postura') || t.includes('puente'))
    return 'Mantén la columna en posición neutra: abdomen ligeramente activo, costillas abajo y hombros relajados. En el puente, sube la cadera apretando glúteos sin arquear la zona lumbar. Si sientes tensión en la espalda baja, reduce la altura.';
  if (t.includes('dolor') || t.includes('hombro'))
    return 'Un dolor leve (1–3/10) que baja al terminar suele ser tolerable. Reduce el rango de movimiento y la carga, y evita pasar de 5/10. Si el dolor aumenta, se irradia o hay hormigueo, suspende y consulta a tu fisioterapeuta o médico.';
  if (t.includes('descans') || t.includes('series'))
    return 'Entre series descansa 30–60 segundos en ejercicios suaves y hasta 90 s en los más exigentes. Entre sesiones del mismo músculo deja 24–48 horas, según la sensación de fatiga y el nivel de dolor.';
  if (t.includes('hielo') || t.includes('calor'))
    return 'Hielo (10–15 min envuelto en tela) tras sesiones con inflamación o dolor agudo reciente. Calor suave antes del ejercicio si hay rigidez muscular. Nunca apliques sobre piel dañada ni durante más de 20 minutos.';
  return 'Gracias por tu consulta. Cuéntame qué músculo trabajas, cómo es el dolor (escala 1–10) y qué ejercicio haces, para orientarte mejor. Recuerda que esta orientación no reemplaza a tu profesional de salud.';
};

const now = () => '00:52';

export default function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'msg-001', role: 'bot', text: '¡Hola! Soy tu asistente de rehabilitación. Puedo orientarte sobre postura, dolor leve y descansos. ¿En qué te ayudo?', time: '00:50' },
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<{ question: string }>({ mode: 'onChange' });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    const userMsg: Msg = { id: `msg-u-${messages.length + 1}`, role: 'user', text, time: now() };
    setMessages((m) => [...m, userMsg]);
    setTyping(true);
    // Backend integration: send question to AI service and stream response here
    setTimeout(() => {
      setMessages((m) => [...m, { id: `msg-b-${m.length + 1}`, role: 'bot', text: replyFor(text), time: now() }]);
      setTyping(false);
    }, 900);
  };

  const onSubmit = (data: { question: string }) => {
    send(data.question.trim());
    reset();
  };

  return (
    <section className="flex h-[640px] flex-col rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="SparklesIcon" size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Asistente RehabMuscular</p>
            <p className="text-xs text-muted-foreground">Orientación, no diagnóstico</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMessages([messages[0]])}
          className="rounded-lg p-2 text-muted-foreground transition-all duration-150 hover:bg-muted active:scale-95"
          aria-label="Reiniciar conversación"
          title="Reiniciar conversación"
        >
          <Icon name="ArrowPathIcon" size={18} />
        </button>
      </div>

      <div className="scrollbar-thin flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`animate-fade-up max-w-[85%] rounded-lg px-4 py-3 ${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
              <p className={`mt-1 text-[11px] tabular ${m.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'}`}>{m.time}</p>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-lg bg-muted px-4 py-3">
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-muted-foreground" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-border p-3">
        <div className="mb-3 flex flex-wrap gap-2">
          {quickPrompts.map((q) => (
            <button
              key={`qp-${q}`}
              type="button"
              onClick={() => send(q)}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground transition-all duration-150 hover:border-primary/40 hover:bg-primary/5 active:scale-95"
            >
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-2">
          <div className="flex-1">
            <label htmlFor="chat-question" className="sr-only">Escribe tu consulta</label>
            <input
              id="chat-question"
              autoComplete="off"
              placeholder="Escribe tu duda sobre postura, dolor leve o descanso…"
              {...register('question', { required: 'Escribe una consulta', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-all focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            {errors.question && <p className="mt-1 text-xs text-destructive">{errors.question.message}</p>}
          </div>
          <button
            type="submit"
            disabled={!isValid || typing}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="PaperAirplaneIcon" size={16} /> Enviar
          </button>
        </form>
        <p className="mt-2 text-[11px] text-muted-foreground">Esta herramienta ofrece orientación y seguimiento de ejercicios terapéuticos en casa, no reemplaza la consulta ni el diagnóstico médico profesional.</p>
      </div>
    </section>
  );
}