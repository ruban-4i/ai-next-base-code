'use client';

import { CheckCircle, Clock, Megaphone, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ActivityList } from '../components/activity-list';
import { DashboardHeader } from '../components/dashboard-header';
import { HolidaysList } from '../components/holidays-list';
import { RequestTrendsChart } from '../components/request-trends-chart';
import { ServiceUsageChart } from '../components/service-usage-chart';
import { StatsCard } from '../components/stats-card';

export function Dashboard2View() {
  return (
    <>
      {/* Header */}
      <DashboardHeader />

      {/* Dashboard Content */}
      <div className="flex-1 bg-[#f5f7fa] px-6 py-6">
        {/* Welcome Section */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="mb-2 font-semibold text-2xl text-gray-700">
              Good Morning Muna. Zahran ali! 👋
            </h1>
            <p className="font-normal text-gray-500 text-sm">
              Ready to oversee today's operations.
            </p>
          </div>
          <Button className="rounded bg-[#008381] px-4 py-2 text-white hover:bg-[#007170]">
            Check In
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="space-y-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              icon={<Megaphone className="h-6 w-6 text-indigo-500" />}
              iconBgColor="bg-indigo-50"
              title="Announcements"
              value="4"
            />
            <StatsCard
              icon={<Clock className="h-6 w-6 text-amber-500" />}
              iconBgColor="bg-amber-50"
              title="Pending Lists"
              value="59"
            />
            <StatsCard
              icon={<CheckCircle className="h-6 w-6 text-emerald-500" />}
              iconBgColor="bg-emerald-50"
              title="Completed"
              value="123"
            />
            <StatsCard
              icon={<TrendingUp className="h-6 w-6 text-purple-500" />}
              iconBgColor="bg-purple-50"
              title="Efficiency"
              value="87%"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RequestTrendsChart />
            <ServiceUsageChart />
          </div>

          {/* Activity and Holidays Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ActivityList />
            <HolidaysList />
          </div>
        </div>
      </div>
    </>
  );
}
