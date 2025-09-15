import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
}

export function StatsCard({ title, value, icon, iconBgColor }: StatsCardProps) {
  return (
    <Card className="bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-gray-500 text-sm">{title}</p>
          <p className="font-bold text-2xl text-gray-700">{value}</p>
        </div>
        <div
          className={`flex items-center justify-center rounded-[10px] p-3 ${iconBgColor}`}
        >
          <div className="h-6 w-6">{icon}</div>
        </div>
      </div>
    </Card>
  );
}
