'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface HolidayItem {
  id: string;
  name: string;
  date: string;
  countdown: string;
  icon: string;
}

const holidayData: HolidayItem[] = [
  {
    id: '1',
    name: 'Independence day',
    date: 'Aug 15',
    countdown: '12 days',
    icon: '🇮🇳',
  },
  {
    id: '2',
    name: 'Labour day',
    date: 'Sep 23',
    countdown: '1 Month',
    icon: '⚒️',
  },
  {
    id: '3',
    name: "Children's day",
    date: 'Oct 2',
    countdown: '2 Month',
    icon: '👶',
  },
  {
    id: '4',
    name: 'Diwali day',
    date: 'Aug 15',
    countdown: '12 days',
    icon: '🪔',
  },
];

export function HolidaysList() {
  return (
    <Card className="border border-[#e8e8e8] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-700 text-sm">
          Upcoming Holidays
        </h3>
        <button className="font-semibold text-[#008381] text-xs hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-2">
        {holidayData.map((holiday) => (
          <div
            className="flex items-center justify-between px-3 py-1"
            key={holiday.id}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-lg text-white">
                  {holiday.icon}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-gray-700 text-sm leading-[20.8px]">
                  {holiday.name}
                </span>
                <span className="font-medium text-gray-500 text-xs leading-[20.8px]">
                  {holiday.date}
                </span>
              </div>
            </div>
            <div className="font-medium text-gray-500 text-sm">
              {holiday.countdown}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
