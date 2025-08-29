'use client';

import { DashboardHeader } from '../components/dashboard-header';
import { EmployeeProfile } from '../components/employee-profile';
import { ProfileTabs } from '../components/profile-tabs';
import { SidebarNavigation } from '../components/sidebar-navigation';

export function DashboardView() {
  return (
    <div className="relative min-h-screen w-full bg-[#f4f6f8]">
      {/* Sidebar Navigation */}
      <SidebarNavigation />

      {/* Main Content Area */}
      <div className="ml-[280px] flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Content */}
        <div className="flex flex-col gap-10 overflow-hidden px-10 py-20">
          {/* Breadcrumb Section */}
          <div className="flex w-full flex-wrap items-start justify-end gap-4">
            <div className="flex min-w-[280px] flex-1 flex-col items-start justify-center gap-2">
              <h1 className="whitespace-nowrap font-bold text-[#1c252e] text-[24px] leading-[36px]">
                Abdul Rahman
              </h1>

              <div className="flex w-full items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="whitespace-nowrap font-normal text-[#1c252e] text-[14px] leading-[22px]">
                    My Info
                  </div>
                </div>

                <div className="h-1 w-1 rounded-full bg-[#919eab]" />

                <div className="flex flex-1 items-center gap-1">
                  <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-normal text-[#919eab] text-[14px] leading-[22px]">
                    Abdul Rahman
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <ProfileTabs />

          {/* Employee Profile Content */}
          <EmployeeProfile />
        </div>
      </div>
    </div>
  );
}
