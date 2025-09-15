'use client';

import type { Service } from '../data/services-data';
import { ServiceCard } from './service-card';

interface ServicesGridProps {
  services: Service[];
  className?: string;
}

export function ServicesGrid({ services, className }: ServicesGridProps) {
  if (services.length === 0) {
    return (
      <div className={`flex h-64 items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="mb-2 text-[#7a7a7a] text-lg">No services found</p>
          <p className="text-[#7a7a7a] text-sm">
            Try adjusting your search or filter criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {services.map((service) => (
        <ServiceCard
          className="cursor-pointer transition-transform hover:scale-[1.02]"
          key={service.id}
          service={service}
        />
      ))}
    </div>
  );
}
