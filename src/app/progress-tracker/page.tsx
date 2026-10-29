import React from 'react';
import AppLayout from '@/components/AppLayout';
import ProgressTrackerContent from '@/app/progress-tracker/components/ProgressTrackerContent';

export default function ProgressTrackerPage() {
  return (
    <AppLayout>
      <ProgressTrackerContent />
    </AppLayout>
  );
}