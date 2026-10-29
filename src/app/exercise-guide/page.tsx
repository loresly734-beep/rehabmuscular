import React, { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import ExerciseGuideContent from '@/app/exercise-guide/components/ExerciseGuideContent';

export default function ExerciseGuidePage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}>
        <ExerciseGuideContent />
      </Suspense>
    </AppLayout>
  );
}