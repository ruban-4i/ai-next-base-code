'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  avatar: string;
  highlighted?: boolean;
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    title: 'Travel Request Approved',
    timestamp: '10Mins ago',
    avatar: '/placeholder-avatar-1.jpg',
  },
  {
    id: '2',
    title: 'Access card issues',
    timestamp: '1 hour ago',
    avatar: '/placeholder-avatar-2.jpg',
    highlighted: true,
  },
  {
    id: '3',
    title: 'Salary letter generated',
    timestamp: 'Yesterday',
    avatar: '/placeholder-avatar-3.jpg',
  },
  {
    id: '4',
    title: 'Vehicle request',
    timestamp: '2 days ago',
    avatar: '/placeholder-avatar-4.jpg',
  },
];

export function ActivityList() {
  return (
    <Card className="border border-[#e8e8e8] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700 text-sm">Recent Activity</h3>
        <button className="font-semibold text-[#008381] text-xs hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2.5">
        {activityData.map((item) => (
          <div
            className={`flex items-center justify-between rounded px-3 py-1 ${
              item.highlighted ? 'bg-[#f8f8f8]' : ''
            }`}
            key={item.id}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage alt="User" src={item.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-sm text-white">
                  {item.title.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-700 text-sm leading-[20.8px]">
                {item.title}
              </span>
            </div>
            <div className="font-medium text-gray-500 text-sm">
              {item.timestamp}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
