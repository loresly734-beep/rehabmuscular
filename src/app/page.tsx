import React from 'react';
import AppLayout from '@/components/AppLayout';
import ModelHeader from '@/app/components/ModelHeader';
import AnatomyExplorer from '@/app/components/AnatomyExplorer';
import TodayPlan from '@/app/components/TodayPlan';
import QuickStats from '@/app/components/QuickStats';

export default function InteractiveAnatomicalModelPage() {
  return (
    <AppLayout>
      <div className="animate-fade-up space-y-6">
        <ModelHeader />
        <QuickStats />
        <div className="grid gap-6 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <AnatomyExplorer />
          </div>
          <TodayPlan />
        </div>
      </div>
    </AppLayout>
  );
}