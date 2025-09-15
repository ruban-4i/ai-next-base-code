'use client';

import {
  ChevronLeft,
  Grid3X3,
  HelpCircle,
  Home,
  Plus,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { paths } from '@/route/paths';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function DashboardSidebar({
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  const handleToggle = () => {
    setCollapsed(!collapsed);
    onToggle?.();
  };

  const navigationItems = [
    {
      label: 'Home',
      icon: Home,
      href: paths.dashboard2.root,
      active: true,
    },
    {
      label: 'All services',
      icon: Grid3X3,
      href: `${paths.dashboard2.root}/services`,
      active: false,
    },
    {
      label: 'Create Form',
      icon: Plus,
      href: `${paths.dashboard2.root}/create-form`,
      active: false,
    },
  ];

  const bottomItems = [
    {
      label: 'Help',
      icon: HelpCircle,
      href: '#',
    },
    {
      label: 'Configuration',
      icon: Settings,
      href: '#',
    },
  ];

  return (
    <div
      className={`border-gray-200 border-r bg-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-[280px]'} flex h-full flex-col`}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-6">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-900 to-gray-700">
              <span className="font-bold text-lg text-white">A</span>
            </div>
          </div>
        )}
        <Button
          className="h-9 w-9 rounded-full p-2 hover:bg-gray-100"
          onClick={handleToggle}
          size="sm"
          variant="ghost"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex items-center gap-4 rounded-lg px-4 py-3 transition-colors ${
                  item.active
                    ? 'bg-[#008381] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium text-base">{item.label}</span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Items */}
      <div className="border-gray-200 border-t p-4">
        <nav className="space-y-2">
          {bottomItems.map((item) => (
            <Link href={item.href} key={item.label}>
              <div className="flex items-center gap-4 rounded-lg px-4 py-3 text-gray-600 transition-colors hover:bg-gray-50">
                <item.icon className="h-6 w-6 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium text-base">{item.label}</span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
