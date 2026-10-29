import React, { Suspense } from 'react';
import AppLayout from '@/components/AppLayout';
import MuscleDetailContent from '@/app/muscle-detail/components/MuscleDetailContent';

export default function MuscleDetailPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-muted" />}>
        <MuscleDetailContent />
      </Suspense>
    </AppLayout>
  );
}