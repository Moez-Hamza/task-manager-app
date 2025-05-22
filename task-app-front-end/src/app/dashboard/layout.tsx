'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '../../components/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { status } = useSession();
  
  if (status === "unauthenticated") {
    redirect('/auth/login');
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
