'use client';

import { Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Service } from '../data/services-data';

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <div
      className={`rounded-lg border border-[#e8e8e8] bg-white p-4 shadow-[0px_2px_24px_0px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-lg ${className}`}
    >
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-3">
        {/* Title and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Service Icon */}
            <div
              className={`${service.iconBgColor} flex items-center justify-center rounded-lg p-2`}
            >
              <span className="text-xl">{service.icon}</span>
            </div>

            {/* Service Title */}
            <h3 className="font-semibold text-[#212121] text-[16px] leading-normal">
              {service.title}
            </h3>
          </div>

          {/* Status Badge */}
          <Badge
            className={`h-[37px] px-3 py-2 font-medium text-[14px] ${
              service.status === 'Available'
                ? 'bg-[#e9fff8] text-[#0d9668] hover:bg-[#e9fff8]'
                : 'bg-red-50 text-red-600 hover:bg-red-50'
            }`}
            variant="secondary"
          >
            {service.status}
          </Badge>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-[#d1d1d1]" />
      </div>

      {/* Description Section */}
      <div className="mb-6">
        <h4 className="mb-2 font-semibold text-[#181818] text-[14px] leading-normal">
          {service.title}
        </h4>
        <p className="font-medium text-[#494949] text-[14px] leading-[20px]">
          {service.description}
        </p>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between">
        {/* Manager Info */}
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-[#5c5c5c]" />
          <span className="font-medium text-[#5c5c5c] text-[12px] leading-[20.8px]">
            {service.manager}
          </span>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-[#5c5c5c]" />
          <span className="font-medium text-[#5c5c5c] text-[12px] leading-[20.8px]">
            {service.estimatedDays}
          </span>
        </div>
      </div>
    </div>
  );
}
