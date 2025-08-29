'use client';

import { useState } from 'react';

export function DashboardHeader() {
  const [selectedCountry, setSelectedCountry] = useState('Oman');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="ml-[280px] flex h-[72px] items-center justify-end gap-3 bg-[#f4f6f8] px-10">
      {/* Background Shape */}
      <div className="absolute top-9 right-[-684px] left-[684px] h-[72px] bg-[#f4f6f8]" />

      <div className="relative z-10 flex items-center gap-6">
        {/* Country Selector */}
        <div className="w-[168px]">
          <div className="relative">
            <select
              className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-[rgba(145,158,171,0.2)] bg-transparent px-3.5 pr-10 font-normal text-[#919eab] text-[15px] leading-[22px] transition-colors focus:border-[#00a76f] focus:outline-none"
              onChange={(e) => setSelectedCountry(e.target.value)}
              value={selectedCountry}
            >
              <option value="Oman">Oman</option>
              <option value="UAE">UAE</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
            </select>

            {/* Custom Dropdown Arrow */}
            <div className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-2.5 transform">
              <DropdownArrowIcon />
            </div>
          </div>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="flex items-center gap-1.5">
            <div className="flex h-9 w-[140px] items-center rounded-[10px] bg-[rgba(145,158,171,0.08)] pr-4 pl-0">
              <button className="flex h-9 w-9 items-center justify-center rounded-full">
                <SearchIcon />
              </button>
              <input
                className="flex-1 bg-transparent font-normal text-[#919eab] text-[15px] leading-[22px] placeholder:text-[#919eab] focus:outline-none"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search.."
                type="text"
                value={searchQuery}
              />
            </div>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[rgba(145,158,171,0.08)]">
              <NotificationIcon />
            </button>
          </div>

          {/* User Avatar */}
          <div className="relative">
            <div className="h-10 w-10 rounded-full border-2 border-[#5be49b] p-[2px]">
              <div className="h-full w-full overflow-hidden rounded-full">
                <img
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                  src="/api/placeholder/36/36"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function DropdownArrowIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
      <path d="M5.83333 7.5L10 11.6667L14.1667 7.5H5.83333Z" fill="#919EAB" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg fill="none" height="20" viewBox="0 0 20 20" width="20">
      <path
        d="M14.1667 12.5H13.3417L13.0583 12.225C14.1417 10.9417 14.7917 9.25833 14.7917 7.41667C14.7917 3.31667 11.475 0 7.375 0C3.275 0 0 3.31667 0 7.41667C0 11.5167 3.31667 14.8333 7.41667 14.8333C9.25833 14.8333 10.9417 14.1833 12.225 13.1L12.5 13.3833V14.2083L18.2083 20L20 18.2083L14.1667 12.5ZM7.41667 12.5C4.58333 12.5 2.33333 10.25 2.33333 7.41667C2.33333 4.58333 4.58333 2.33333 7.41667 2.33333C10.25 2.33333 12.5 4.58333 12.5 7.41667C12.5 10.25 10.25 12.5 7.41667 12.5Z"
        fill="#919EAB"
      />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
      <path
        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z"
        fill="#00A76F"
        fillOpacity="0.48"
      />
      <path
        d="M18 8.5C18 12.64 19.11 16.28 19.11 16.28H4.89C4.89 16.28 6 12.64 6 8.5C6 5.42 8.42 3 11.5 3H12.5C15.58 3 18 5.42 18 8.5Z"
        fill="#637381"
      />
    </svg>
  );
}
