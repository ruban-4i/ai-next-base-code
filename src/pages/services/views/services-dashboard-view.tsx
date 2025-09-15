'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { ServicesCategoryTabs } from '../../dashboard-2/components/services-category-tabs';
import { ServicesGrid } from '../../dashboard-2/components/services-grid';
import { ServicesHeader } from '../../dashboard-2/components/services-header';
import { ServicesSidebar } from '../../dashboard-2/components/services-sidebar';
import { ServicesStats } from '../../dashboard-2/components/services-stats';
import {
  getServiceStats,
  getServicesByCategory,
  searchServices,
} from '../../dashboard-2/data/services-data';

export function ServicesDashboardView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('HR Services');
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  // Get stats data
  const stats = getServiceStats();

  // Filter services based on active category and search
  const filteredServices = useMemo(() => {
    let services = getServicesByCategory(activeCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      services = searchServices(searchQuery).filter((service) =>
        activeCategory ? service.category === activeCategory : true
      );
    }

    if (localSearchQuery.trim()) {
      const searchTerm = localSearchQuery.toLowerCase();
      services = services.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm) ||
          service.description.toLowerCase().includes(searchTerm)
      );
    }

    return services;
  }, [activeCategory, searchQuery, localSearchQuery]);

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      {/* Sidebar */}
      <ServicesSidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <ServicesHeader
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Content Container */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-[#3f3f3f] text-[24px] leading-[24px]">
                  All services
                </h1>
                <p className="font-normal text-[#696969] text-[14px] leading-[24px]">
                  Browse and access al available company services and request
                  workflow
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <ServicesStats stats={stats} />

            {/* Services Section */}
            <div className="flex h-[651px] flex-col gap-6 overflow-y-auto">
              {/* Category Tabs and Search */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2.5">
                  <h2 className="font-semibold text-[#3f3f3f] text-[16px] leading-[24px]">
                    Services By category
                  </h2>
                  <ServicesCategoryTabs
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                </div>

                {/* Local Search */}
                <div className="relative w-[307px]">
                  <div className="-translate-y-1/2 absolute top-1/2 left-6 transform">
                    <Search className="h-6 w-6 text-[#2a2e34]" />
                  </div>
                  <Input
                    className="h-auto rounded-lg border-none bg-white py-2.5 pr-6 pl-16 text-[#4d545e] text-[16px] placeholder:text-[#4d545e]"
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    placeholder="Search"
                    value={localSearchQuery}
                  />
                </div>
              </div>

              {/* Services Grid */}
              <ServicesGrid services={filteredServices} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
