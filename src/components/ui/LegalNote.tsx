import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { LEGAL_NOTE } from '@/lib/rehabData';

export default function LegalNote({ compact = false }: { compact?: boolean }) {
  return (
    <div
      role="note"
      className={`flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/10 ${compact ? 'p-3' : 'p-4'}`}
    >
      <Icon name="ShieldExclamationIcon" size={compact ? 18 : 22} className="mt-0.5 shrink-0 text-warning" />
      <p className={`${compact ? 'text-xs' : 'text-sm'} font-medium leading-relaxed text-foreground`}>
        {LEGAL_NOTE}.
      </p>
    </div>
  );
}