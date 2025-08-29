'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('details');

  const tabs: Tab[] = [
    {
      id: 'details',
      label: 'Details',
      icon: <DetailsIcon />,
      isActive: activeTab === 'details',
    },
    {
      id: 'compensation',
      label: 'Compensation',
      icon: <CompensationIcon />,
      isActive: activeTab === 'compensation',
    },
  ];

  return (
    <div className="flex items-center gap-10">
      {tabs.map((tab) => (
        <button
          className={`relative flex h-12 min-h-12 min-w-12 items-center justify-center gap-2 transition-colors ${
            tab.isActive
              ? 'border-[#1c252e] border-b-2'
              : 'border-transparent border-b-2 hover:border-[rgba(28,37,46,0.2)]'
          }`}
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          {/* Tab Icon */}
          <div className="h-6 w-6 overflow-hidden">{tab.icon}</div>

          {/* Tab Label */}
          <div
            className={`whitespace-nowrap font-medium text-[14px] leading-[22px] ${
              tab.isActive ? 'text-[#1c252e]' : 'text-[#637381]'
            }`}
          >
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  );
}

// Icon Components
function DetailsIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 12H16V14H8V12ZM8 16H13V18H8V16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CompensationIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.52 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 14.07 11.5 11.8 10.9Z"
        fill="currentColor"
      />
    </svg>
  );
}
