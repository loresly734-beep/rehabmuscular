import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const sitemap = [
  { id: 'sm-model', href: '/', label: 'Modelo anatómico interactivo' },
  { id: 'sm-muscle', href: '/muscle-detail', label: 'Detalle del músculo' },
  { id: 'sm-exercise', href: '/exercise-guide', label: 'Guía de ejercicios' },
  { id: 'sm-ai', href: '/ai-assistant', label: 'Asistente de IA' },
  { id: 'sm-progress', href: '/progress-tracker', label: 'Registro de progreso' },
  { id: 'sm-auth', href: '/sign-up-login-screen', label: 'Ingreso / Registro' },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-neon/20 bg-[#030b1c]/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8 2xl:px-16">
        <div>
          <div className="flex items-center gap-2">
            <AppLogo size={36} />
            <span className="font-mono text-lg font-bold uppercase tracking-[0.2em] text-neon digital-glow">RehabMuscular</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Telerrehabilitación guiada para pacientes en recuperación en Huánuco, Perú.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-neon/80">Mapa del sitio</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2">
            {sitemap?.map((s) => (
              <li key={s?.id}>
                <Link href={s?.href} className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                  {s?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-amber/40 bg-amber/10 p-4">
          <div className="flex items-start gap-2">
            <Icon name="ShieldExclamationIcon" size={20} className="mt-0.5 text-amber" />
            <p className="text-xs font-medium leading-relaxed text-foreground">
              Esta herramienta ofrece orientación y seguimiento de ejercicios terapéuticos en casa, no reemplaza la consulta ni el diagnóstico médico profesional.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-neon/15 py-4 text-center font-mono text-xs text-muted-foreground">
        © 2026 RehabMuscular · Huánuco, Perú
      </div>
    </footer>
  );
}