'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';

const navItems = [
  { id: 'nav-model', href: '/', label: 'Modelo anatómico', icon: 'UserIcon' },
  { id: 'nav-muscle', href: '/muscle-detail', label: 'Músculo', icon: 'BoltIcon' },
  { id: 'nav-exercise', href: '/exercise-guide', label: 'Ejercicios', icon: 'PlayCircleIcon' },
  { id: 'nav-ai', href: '/ai-assistant', label: 'Asistente IA', icon: 'ChatBubbleLeftRightIcon' },
  { id: 'nav-progress', href: '/progress-tracker', label: 'Mi progreso', icon: 'ChartBarIcon' },
];

export default function Topbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-neon/20 bg-[#030b1c]/70 shadow-[0_0_30px_rgba(43,243,255,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8 2xl:px-16">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size={40} />
            <span className="hidden font-mono text-lg font-bold uppercase tracking-[0.2em] text-neon digital-glow sm:block">RehabMuscular</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 active:scale-95 ${
                isActive(item.href)
                  ? 'bg-neon/15 text-neon shadow-neon-sm' :'text-muted-foreground hover:bg-white/5 hover:text-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-neon/25 bg-neon/5 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success shadow-neon-sm" />
            <span className="font-mono text-xs font-semibold text-foreground">Racha: 13 días</span>
          </div>
          <Link
            href="/sign-up-login-screen"
            className="hud-btn hidden items-center gap-2 px-3 py-2 text-sm sm:flex"
          >
            <Icon name="UserCircleIcon" size={18} />
            Mi cuenta
          </Link>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-foreground transition-all duration-150 hover:bg-muted active:scale-95 lg:hidden"
          >
            <Icon name={open ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-neon/20 bg-[#030b1c]/95 transition-all duration-300 lg:hidden ${
          open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 p-3" aria-label="Navegación móvil">
          {navItems.map((item) => (
            <Link
              key={`m-${item.id}`}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                isActive(item.href) ? 'bg-neon/15 text-neon' : 'text-foreground hover:bg-white/5'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              {item.label}
            </Link>
          ))}
          <Link
            href="/sign-up-login-screen"
            onClick={() => setOpen(false)}
            className="hud-btn mt-1 flex items-center justify-center gap-2 px-3 py-3 text-sm"
          >
            <Icon name="UserCircleIcon" size={20} />
            Mi cuenta
          </Link>
        </nav>
      </div>
    </header>
  );
}