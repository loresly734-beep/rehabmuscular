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

export default function BodyBack(props: Props) {
  return (
    <svg viewBox="0 0 200 400" className="h-auto w-full" role="img" aria-label="Modelo anatómico vista posterior">
      <circle cx="100" cy="28" r="18" className="body-silhouette" />
      <rect x="92" y="44" width="16" height="12" className="body-silhouette" />
      <path d="M62 62 Q100 52 138 62 L150 118 L142 170 L132 190 L68 190 L58 170 L50 118 Z" className="body-silhouette" />
      <path d="M62 66 L40 78 L28 150 L38 154 L52 100 Z" className="body-silhouette" />
      <path d="M138 66 L160 78 L172 150 L162 154 L148 100 Z" className="body-silhouette" />
      <path d="M68 190 L62 300 L66 372 L82 372 L88 300 L98 192 Z" className="body-silhouette" />
      <path d="M132 190 L138 300 L134 372 L118 372 L112 300 L102 192 Z" className="body-silhouette" />
      <Zone id="trapecio" label="Trapecio" d="M82 50 L118 50 L136 70 L100 100 L64 70 Z" {...props} />
      <Zone id="dorsal" label="Dorsal ancho izquierdo" d="M64 98 L96 104 L94 150 L72 152 L62 124 Z" {...props} />
      <Zone id="dorsal" label="Dorsal ancho derecho" d="M136 98 L104 104 L106 150 L128 152 L138 124 Z" {...props} />
      <Zone id="triceps" label="Tríceps izquierdo" d="M40 82 L58 90 L52 138 L34 134 Z" {...props} />
      <Zone id="triceps" label="Tríceps derecho" d="M160 82 L142 90 L148 138 L166 134 Z" {...props} />
      <Zone id="lumbar" label="Erector lumbar" d="M88 150 L112 150 L110 192 L90 192 Z" {...props} />
      <Zone id="gluteo" label="Glúteo mayor izquierdo" d="M68 194 L98 194 L96 232 L70 232 Z" {...props} />
      <Zone id="gluteo" label="Glúteo mayor derecho" d="M132 194 L102 194 L104 232 L130 232 Z" {...props} />
      <Zone id="isquios" label="Isquiotibiales izquierdo" d="M70 238 L94 238 L90 296 L72 296 Z" {...props} />
      <Zone id="isquios" label="Isquiotibiales derecho" d="M130 238 L106 238 L110 296 L128 296 Z" {...props} />
      <Zone id="gemelos" label="Gemelo izquierdo" d="M70 302 L88 302 L84 358 L70 358 Z" {...props} />
      <Zone id="gemelos" label="Gemelo derecho" d="M130 302 L112 302 L116 358 L130 358 Z" {...props} />
    </svg>
  );
}