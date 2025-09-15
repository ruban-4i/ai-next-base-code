'use client';

import { ChevronDown, Grid3X3, HelpCircle, Home, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { paths } from '@/route/paths';

interface ServicesSidebarProps {
  className?: string;
}

export function ServicesSidebar({ className }: ServicesSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      href: paths.dashboard2.root,
      active: false,
    },
    {
      icon: Grid3X3,
      label: 'All services',
      href: paths.services.root,
      active: true,
    },
  ];

  const bottomMenuItems = [
    {
      icon: HelpCircle,
      label: 'Help',
      active: false,
    },
    {
      icon: Settings,
      label: 'Configuration',
      active: false,
    },
  ];

  return (
    <div
      className={`flex h-full w-[280px] flex-col justify-between bg-white px-4 py-6 ${className}`}
    >
      {/* Header Section */}
      <div className="flex flex-col gap-20">
        {/* Logo */}
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="font-bold text-lg text-white">AI</span>
          </div>
          {/* Expand/Collapse Button */}
          <Button
            className="-right-2 absolute top-8 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={() => setIsExpanded(!isExpanded)}
            size="icon"
            variant="ghost"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
            />
          </Button>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
                  item.active
                    ? 'bg-[#008381] text-white'
                    : 'text-[#545454] hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="font-medium text-base">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex flex-col gap-0">
        {bottomMenuItems.map((item) => (
          <div
            className={`flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
              item.active
                ? 'bg-[#008381] text-white'
                : 'text-[#3f3f3f] hover:bg-gray-50'
            }`}
            key={item.label}
          >
            <item.icon className="h-6 w-6" />
            <span className="font-medium text-base">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
