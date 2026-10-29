import React from 'react';
import AppLayout from '@/components/AppLayout';
import AssistantHeader from '@/app/ai-assistant/components/AssistantHeader';
import ChatPanel from '@/app/ai-assistant/components/ChatPanel';
import PainScaleGuide from '@/app/ai-assistant/components/PainScaleGuide';
import RestGuide from '@/app/ai-assistant/components/RestGuide';
import LegalNote from '@/components/ui/LegalNote';

export default function AIAssistantPage() {
  return (
    <AppLayout>
      <div className="animate-fade-up space-y-6">
        <AssistantHeader />
        <LegalNote />
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ChatPanel />
          </div>
          <div className="space-y-6">
            <PainScaleGuide />
            <RestGuide />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}