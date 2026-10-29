'use client';

import React from 'react';

interface Props {
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

const Zone = ({ id, d, label, activeId, onHover, onSelect }: { id: string; d: string; label: string } & Props) => (
  <path
    d={d}
    className={`muscle-zone ${activeId === id ? 'is-active' : ''}`}
    onMouseEnter={() => onHover(id)}
    onMouseLeave={() => onHover(null)}
    onFocus={() => onHover(id)}
    onBlur={() => onHover(null)}
    onClick={() => onSelect(id)}
    tabIndex={0}
    role="button"
    aria-label={label}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(id); }}
  />
);

export default function BodyFront(props: Props) {
  return (
    <svg viewBox="0 0 200 400" className="h-auto w-full" role="img" aria-label="Modelo anatómico vista anterior">
      {/* silhouette */}
      <circle cx="100" cy="28" r="18" className="body-silhouette" />
      <rect x="92" y="44" width="16" height="12" className="body-silhouette" />
      <path d="M62 62 Q100 52 138 62 L150 118 L142 170 L132 190 L68 190 L58 170 L50 118 Z" className="body-silhouette" />
      <path d="M62 66 L40 78 L28 150 L38 154 L52 100 Z" className="body-silhouette" />
      <path d="M138 66 L160 78 L172 150 L162 154 L148 100 Z" className="body-silhouette" />
      <path d="M68 190 L62 300 L66 372 L82 372 L88 300 L98 192 Z" className="body-silhouette" />
      <path d="M132 190 L138 300 L134 372 L118 372 L112 300 L102 192 Z" className="body-silhouette" />
      {/* muscle zones */}
      <Zone id="deltoides" label="Deltoides izquierdo" d="M44 70 Q56 58 68 64 L70 92 Q56 94 46 90 Z" {...props} />
      <Zone id="deltoides" label="Deltoides derecho" d="M156 70 Q144 58 132 64 L130 92 Q144 94 154 90 Z" {...props} />
      <Zone id="pectoral" label="Pectoral mayor" d="M74 66 Q100 60 126 66 L124 96 Q100 108 76 96 Z" {...props} />
      <Zone id="biceps" label="Bíceps braquial izquierdo" d="M42 96 L58 98 L52 138 L36 136 Z" {...props} />
      <Zone id="biceps" label="Bíceps braquial derecho" d="M158 96 L142 98 L148 138 L164 136 Z" {...props} />
      <Zone id="abdominal" label="Recto abdominal" d="M86 106 L114 106 L112 168 L88 168 Z" {...props} />
      <Zone id="oblicuos" label="Oblicuo izquierdo" d="M70 104 L84 108 L86 168 L72 172 L64 140 Z" {...props} />
      <Zone id="oblicuos" label="Oblicuo derecho" d="M130 104 L116 108 L114 168 L128 172 L136 140 Z" {...props} />
      <Zone id="cuadriceps" label="Cuádriceps izquierdo" d="M70 196 L96 196 L90 280 L72 282 Z" {...props} />
      <Zone id="cuadriceps" label="Cuádriceps derecho" d="M130 196 L104 196 L110 280 L128 282 Z" {...props} />
      <Zone id="tibial" label="Tibial anterior izquierdo" d="M70 294 L86 294 L82 360 L70 360 Z" {...props} />
      <Zone id="tibial" label="Tibial anterior derecho" d="M130 294 L114 294 L118 360 L130 360 Z" {...props} />
    </svg>
  );
}