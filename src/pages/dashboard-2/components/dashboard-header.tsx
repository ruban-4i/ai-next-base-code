'use client';

import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function DashboardHeader() {
  return (
    <div className="flex h-[84px] items-center justify-between border-gray-200 border-b bg-white px-6 py-[18px]">
      {/* Search Bar */}
      <div className="relative w-[376px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
          <Search className="h-6 w-6 text-[#2a2e34]" />
        </div>
        <Input
          className="w-full rounded-[34px] border-0 bg-[#f8f8f8] py-2.5 pr-6 pl-16 text-[#4d545e] placeholder:text-[#4d545e] focus:bg-white focus:ring-2 focus:ring-[#008381]"
          placeholder="Search"
          type="text"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Button */}
        <Button
          className="relative rounded-[30px] border-[#dedede] p-2.5 hover:bg-gray-50"
          size="sm"
          variant="outline"
        >
          <Bell className="h-6 w-6 text-gray-600" />
          <div className="-top-1 -right-1 absolute h-1.5 w-1.5 rounded-full bg-red-500" />
        </Button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
            <AvatarFallback className="bg-gray-200 font-semibold text-gray-600">
              MZ
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-700 text-lg leading-normal">
              Muna. Zahran ali!
            </h3>
            <p className="font-normal text-gray-500 text-sm leading-normal">
              Oman
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
