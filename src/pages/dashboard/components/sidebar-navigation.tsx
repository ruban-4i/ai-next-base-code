'use client';

import Link from 'next/link';
import { useState } from 'react';
import { paths } from '@/route/paths';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  isActive?: boolean;
  hasSubmenu?: boolean;
}

export function SidebarNavigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      href: '/',
      isActive: false,
    },
    {
      id: 'my-info',
      label: 'My Info',
      icon: <MyInfoIcon />,
      href: paths.dashboard.root,
      isActive: true,
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <AttendanceIcon />,
      hasSubmenu: true,
    },
    {
      id: 'payslip',
      label: 'Payslip',
      icon: <PayslipIcon />,
    },
    {
      id: 'expense',
      label: 'Expense management',
      icon: <ExpenseIcon />,
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="relative">
      {/* Sidebar */}
      <div className="flex h-screen w-[280px] flex-col border-[rgba(145,158,171,0.12)] border-r bg-[#1c252e]">
        {/* Logo Section */}
        <div className="px-6 py-6 pb-2">
          <div className="relative h-12 w-12">
            <LogoIcon />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-4 pb-10">
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavItem item={item} key={item.id} />
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="-right-[13px] absolute top-[27px] flex h-[26px] w-[26px] items-center justify-center rounded-full border border-[rgba(145,158,171,0.08)] bg-white shadow-[0px_1px_2px_0px_rgba(145,158,171,0.16)] transition-shadow hover:shadow-md"
          onClick={toggleSidebar}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  );
}

function NavItem({ item }: { item: MenuItem }) {
  const baseClasses =
    'flex items-center justify-start min-h-11 pl-3 pr-2 py-1 rounded-lg w-full transition-colors';
  const activeClasses = 'bg-[rgba(0,167,111,0.08)]';
  const inactiveClasses = 'bg-transparent hover:bg-[rgba(255,255,255,0.04)]';

  const content = (
    <>
      {/* Icon */}
      <div className="flex items-center justify-center pr-3">
        <div className="h-6 w-6">{item.icon}</div>
      </div>

      {/* Text */}
      <div className="flex flex-1 flex-col items-center justify-center pr-4">
        <div
          className={`w-full overflow-hidden text-ellipsis whitespace-nowrap text-14px leading-[22px] ${
            item.isActive
              ? 'font-semibold text-[#00a76f]'
              : 'font-medium text-[#637381]'
          }`}
        >
          {item.label}
        </div>
      </div>

      {/* Arrow for submenu */}
      {item.hasSubmenu && (
        <div className="flex items-center justify-center pl-2">
          <div className="h-4 w-4">
            <ArrowForwardIcon />
          </div>
        </div>
      )}
    </>
  );

  if (item.href) {
    return (
      <Link
        className={`${baseClasses} ${item.isActive ? activeClasses : inactiveClasses}`}
        href={item.href}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseClasses} ${item.isActive ? activeClasses : inactiveClasses}`}
    >
      {content}
    </button>
  );
}

// Icon Components
function DashboardIcon() {
  return (
    <div className="relative h-6 w-6">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
          fill="currentColor"
          fillOpacity="0.48"
        />
        <path d="M13 11h8v2h-8v-2z" fill="currentColor" />
      </svg>
    </div>
  );
}

function MyInfoIcon() {
  return (
    <div className="relative h-6 w-6">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V8.5C15 9.3 14.3 10 13.5 10H10.5C9.7 10 9 9.3 9 8.5V6.5L3 7V9H21ZM3 10V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V10H3Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function AttendanceIcon() {
  return (
    <div className="relative h-6 w-6">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19Z"
          fill="currentColor"
          fillOpacity="0.48"
        />
        <path d="M7 10H17V16H7V10Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function PayslipIcon() {
  return (
    <div className="relative h-6 w-6">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function ExpenseIcon() {
  return (
    <div className="relative h-6 w-6">
      <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
        <path
          d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

function LogoIcon() {
  return (
    <div className="relative h-12 w-12">
      <svg fill="none" height="48" viewBox="0 0 48 48" width="48">
        <path
          d="M16.5 26.8L14.2 22.9L8.5 33.7H13.1L16.5 26.8Z"
          fill="#5BE49B"
        />
        <path d="M24 12L16.8 26.8L20.2 33.7H34.5L24 12Z" fill="#00A76F" />
        <path d="M37.5 27L39.5 33.7H44L37.5 27Z" fill="#5BE49B" />
      </svg>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path d="M10 8L6 4V12L10 8Z" fill="#637381" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg fill="none" height="16" viewBox="0 0 16 16" width="16">
      <path d="M6 4L10 8L6 12V4Z" fill="#637381" />
    </svg>
  );
}
