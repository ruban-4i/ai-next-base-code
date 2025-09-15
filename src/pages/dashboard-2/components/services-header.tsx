'use client';

import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ServicesHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  className?: string;
}

export function ServicesHeader({
  searchQuery = '',
  onSearchChange,
  className,
}: ServicesHeaderProps) {
  return (
    <div
      className={`flex h-[84px] items-center justify-between bg-white px-6 py-[18px] ${className}`}
    >
      {/* Search Section */}
      <div className="relative w-[376px]">
        <div className="-translate-y-1/2 absolute top-1/2 left-6 transform">
          <Search className="h-6 w-6 text-[#2a2e34]" />
        </div>
        <Input
          className="h-auto rounded-[34px] border-none bg-[#f8f8f8] py-2.5 pr-6 pl-16 text-[#4d545e] text-[16px] placeholder:text-[#4d545e]"
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search"
          value={searchQuery}
        />
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Button */}
        <div className="relative">
          <Button
            className="h-[44px] w-[44px] rounded-full border border-[#dedede] bg-white hover:bg-gray-50"
            size="icon"
            variant="ghost"
          >
            <Bell className="h-6 w-6 text-[#2a2e34]" />
          </Button>
          {/* Notification Badge */}
          <div className="absolute top-[13px] left-[25px] h-1.5 w-1.5 rounded-full bg-red-500" />
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-[13px]">
          {/* Profile Image */}
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-400 to-red-500">
              <span className="font-semibold text-lg text-white">MZ</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-[#3f3f3f] text-[18px] leading-normal">
              Muna. Zahran ali!
            </h3>
            <p className="font-normal text-[#727272] text-[14px] leading-normal">
              Oman
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
