'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Props {
  email: string;
  password: string;
  onUse: () => void;
}

export default function CredentialsBox({ email, password, onUse }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — keep the visual confirmation only */
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const rows = [
    { id: 'cred-email', label: 'Correo', value: email },
    { id: 'cred-pass', label: 'Contraseña', value: password },
  ];

  return (
    <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="KeyIcon" size={16} className="text-primary" />
          Cuenta de demostración (paciente)
        </p>
        <button
          type="button"
          onClick={onUse}
          className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95"
        >
          Usar
        </button>
      </div>
      <ul className="mt-3 space-y-2">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-2 rounded-md bg-card px-3 py-2">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{r.label}</p>
              <p className="truncate font-mono text-sm text-foreground">{r.value}</p>
            </div>
            <button
              type="button"
              onClick={() => copy(r.id, r.value)}
              aria-label={`Copiar ${r.label.toLowerCase()}`}
              title={`Copiar ${r.label.toLowerCase()}`}
              className="rounded-md p-1.5 text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground active:scale-95"
            >
              <Icon name={copied === r.id ? 'CheckIcon' : 'ClipboardDocumentIcon'} size={16} className={copied === r.id ? 'text-success' : ''} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}