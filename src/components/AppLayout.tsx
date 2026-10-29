import React from 'react';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background bg-clinic-glow text-foreground">
      <Topbar />
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-6 sm:px-6 lg:px-8 2xl:px-16">{children}</main>
      <Footer />
    </div>
  );
}