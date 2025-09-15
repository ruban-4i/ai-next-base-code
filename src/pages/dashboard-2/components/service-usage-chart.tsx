'use client';

import { Card } from '@/components/ui/card';

interface ServiceData {
  name: string;
  value: number;
  color: string;
}

const serviceData: ServiceData[] = [
  { name: 'Access card', value: 30, color: '#818cf8' },
  { name: 'Vehicle Request', value: 25, color: '#fbbf24' },
  { name: 'Salary Letter', value: 20, color: '#34d399' },
  { name: 'Travel Request', value: 25, color: '#fb7185' },
];

export function ServiceUsageChart() {
  const total = serviceData.reduce((sum, item) => sum + item.value, 0);

  // Simple pie chart using conic-gradient
  const gradientStops = serviceData
    .reduce((acc, item, index) => {
      const percentage = (item.value / total) * 100;
      const previousPercentage = serviceData
        .slice(0, index)
        .reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0);

      return `${acc}, ${item.color} ${previousPercentage}% ${previousPercentage + percentage}%`;
    }, '')
    .substring(2); // Remove leading comma and space

  return (
    <Card className="bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-700 text-sm">
            Service Usage Distribution
          </h3>
        </div>
        <button className="font-semibold text-[#008381] text-xs hover:underline">
          Export
        </button>
      </div>

      <div className="flex items-center gap-8">
        {/* Pie Chart */}
        <div className="relative">
          <div
            className="h-80 w-80 rounded-full"
            style={{
              background: `conic-gradient(${gradientStops})`,
            }}
          />

          {/* Tooltip for Vehicle Request */}
          <div className="absolute top-1/2 left-1/2 translate-x-8 translate-y-4 transform">
            <div className="rounded-lg border bg-white px-4 py-2 font-medium text-gray-700 text-sm shadow-lg">
              20 Vehicle request
            </div>
            <div className="-bottom-2 -translate-x-1/2 absolute left-1/2 h-0 w-0 transform border-t-4 border-t-white border-r-4 border-r-transparent border-l-4 border-l-transparent" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {serviceData.map((item) => (
            <div className="flex items-center gap-3" key={item.name}>
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="font-medium text-gray-700 text-sm">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
