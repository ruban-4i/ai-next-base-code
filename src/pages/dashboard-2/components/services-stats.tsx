'use client';

import { CheckCircle, FileText, Grid3X3 } from 'lucide-react';
import type { ServiceStats } from '../data/services-data';

interface ServicesStatsProps {
  stats: ServiceStats;
  className?: string;
}

export function ServicesStats({ stats, className }: ServicesStatsProps) {
  const statsCards = [
    {
      title: 'Total Services',
      value: stats.totalServices.toString(),
      icon: FileText,
      bgColor: 'bg-[#f3f5ff]',
      iconColor: 'text-[#6366f1]',
    },
    {
      title: 'Available Services',
      value: stats.availableServices.toString(),
      icon: CheckCircle,
      bgColor: 'bg-[#fff7f0]',
      iconColor: 'text-[#f97316]',
    },
    {
      title: 'Categories',
      value: stats.categories.toString(),
      icon: Grid3X3,
      bgColor: 'bg-[#f3fff8]',
      iconColor: 'text-[#22c55e]',
    },
  ];

  return (
    <div className={`flex gap-6 ${className}`}>
      {statsCards.map((card) => (
        <div
          className="flex-1 rounded-lg bg-white px-4 py-6 shadow-[0px_4px_16px_0px_rgba(78,78,78,0.03)]"
          key={card.title}
        >
          <div className="flex items-start justify-between">
            {/* Left side - Text content */}
            <div className="flex flex-col gap-2">
              <p className="font-normal text-[#7a7a7a] text-[16px] leading-normal">
                {card.title}
              </p>
              <h3 className="font-bold text-[#3f3f3f] text-[26px] leading-normal">
                {card.value}
              </h3>
            </div>

            {/* Right side - Icon */}
            <div
              className={`${card.bgColor} flex items-center justify-center rounded-[10px] p-3`}
            >
              <card.icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
