'use client';

import type { ReactNode } from 'react';
import { DashboardSidebar } from '@/pages/dashboard-2/components/dashboard-sidebar';

interface Dashboard2LayoutProps {
  children: ReactNode;
}

export default function Dashboard2Layout({ children }: Dashboard2LayoutProps) {
  const handleToggle = () => {
    // Handle sidebar toggle if needed
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Shared Sidebar */}
      <DashboardSidebar isCollapsed={false} onToggle={handleToggle} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
