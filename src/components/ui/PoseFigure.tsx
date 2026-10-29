import React from 'react';
import type { ExerciseStep } from '@/lib/rehabData';

// Simple stick-figure SVG per pose — visual step guide
export default function PoseFigure({ pose, size = 220 }: { pose: ExerciseStep['pose']; size?: number }) {
  return (
    <svg viewBox="0 0 200 160" width={size} height={(size * 160) / 200} role="img" aria-label={`Postura: ${pose}`}>
      <line x1="10" y1="140" x2="190" y2="140" className="pose-floor" />
      {pose === 'stand' && (
        <g>
          <circle cx="100" cy="32" r="14" className="pose-head" />
          <line x1="100" y1="46" x2="100" y2="95" className="pose-limb" />
          <line x1="100" y1="58" x2="72" y2="86" className="pose-limb" />
          <line x1="100" y1="58" x2="128" y2="86" className="pose-limb" />
          <line x1="100" y1="95" x2="82" y2="138" className="pose-limb" />
          <line x1="100" y1="95" x2="118" y2="138" className="pose-limb" />
        </g>
      )}
      {pose === 'raise' && (
        <g>
          <circle cx="100" cy="32" r="14" className="pose-head" />
          <line x1="100" y1="46" x2="100" y2="95" className="pose-limb" />
          <line x1="100" y1="58" x2="150" y2="50" className="pose-limb-accent" />
          <line x1="100" y1="58" x2="72" y2="86" className="pose-limb" />
          <line x1="100" y1="95" x2="82" y2="138" className="pose-limb" />
          <line x1="100" y1="95" x2="118" y2="138" className="pose-limb" />
        </g>
      )}
      {pose === 'sit' && (
        <g>
          <line x1="60" y1="108" x2="120" y2="108" className="pose-floor" />
          <circle cx="90" cy="34" r="14" className="pose-head" />
          <line x1="90" y1="48" x2="90" y2="100" className="pose-limb" />
          <line x1="90" y1="62" x2="122" y2="82" className="pose-limb-accent" />
          <line x1="90" y1="100" x2="132" y2="100" className="pose-limb" />
          <line x1="132" y1="100" x2="132" y2="138" className="pose-limb" />
        </g>
      )}
      {pose === 'lie' && (
        <g>
          <circle cx="36" cy="118" r="13" className="pose-head" />
          <line x1="50" y1="124" x2="118" y2="124" className="pose-limb" />
          <line x1="118" y1="124" x2="140" y2="94" className="pose-limb" />
          <line x1="140" y1="94" x2="162" y2="124" className="pose-limb" />
          <line x1="60" y1="124" x2="86" y2="108" className="pose-limb-accent" />
        </g>
      )}
      {pose === 'bridge' && (
        <g>
          <circle cx="34" cy="122" r="13" className="pose-head" />
          <line x1="48" y1="126" x2="104" y2="96" className="pose-limb-accent" />
          <line x1="104" y1="96" x2="132" y2="94" className="pose-limb" />
          <line x1="132" y1="94" x2="148" y2="136" className="pose-limb" />
          <line x1="48" y1="130" x2="80" y2="132" className="pose-limb" />
        </g>
      )}
      {pose === 'wall' && (
        <g>
          <line x1="150" y1="10" x2="150" y2="140" className="pose-floor" />
          <circle cx="100" cy="36" r="14" className="pose-head" />
          <line x1="100" y1="50" x2="108" y2="98" className="pose-limb" />
          <line x1="104" y1="62" x2="148" y2="62" className="pose-limb-accent" />
          <line x1="108" y1="98" x2="90" y2="138" className="pose-limb" />
          <line x1="108" y1="98" x2="124" y2="138" className="pose-limb" />
        </g>
      )}
      {pose === 'lunge' && (
        <g>
          <circle cx="100" cy="30" r="14" className="pose-head" />
          <line x1="100" y1="44" x2="100" y2="92" className="pose-limb" />
          <line x1="100" y1="92" x2="140" y2="104" className="pose-limb" />
          <line x1="140" y1="104" x2="140" y2="138" className="pose-limb-accent" />
          <line x1="100" y1="92" x2="62" y2="138" className="pose-limb" />
        </g>
      )}
    </svg>
  );
}