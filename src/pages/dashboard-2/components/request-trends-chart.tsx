'use client';

import { Card } from '@/components/ui/card';

interface ChartDataPoint {
  day: string;
  value: number;
}

const mockData: ChartDataPoint[] = [
  { day: 'Sun', value: 20 },
  { day: 'Mon', value: 35 },
  { day: 'Tue', value: 25 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 30 },
  { day: 'Fri', value: 40 },
  { day: 'Sat', value: 35 },
];

export function RequestTrendsChart() {
  const maxValue = Math.max(...mockData.map((d) => d.value));
  const yAxisLabels = [50, 40, 30, 20, 10, 0];

  return (
    <Card className="bg-white p-6 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-700 text-sm">
            Request Trends
          </h3>
        </div>
        <button className="font-semibold text-[#008381] text-xs hover:underline">
          View Details
        </button>
      </div>

      <div className="relative">
        {/* Chart Container */}
        <div className="flex">
          {/* Y-Axis */}
          <div className="mr-6 flex h-[280px] w-8 flex-col justify-between">
            {yAxisLabels.map((label) => (
              <div
                className="text-right font-medium text-gray-400 text-sm"
                key={label}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div className="relative flex-1">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {yAxisLabels.map((_, index) => (
                <div className="w-full border-gray-200 border-t" key={index} />
              ))}
            </div>

            {/* Line Chart */}
            <div className="relative h-[280px] px-4">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 280"
              >
                {/* Primary Line (Green) */}
                <path
                  d={`M 20,${280 - (mockData[0].value / maxValue) * 240} 
                      C 50,${280 - (mockData[0].value / maxValue) * 240} 50,${280 - (mockData[1].value / maxValue) * 240} 80,${280 - (mockData[1].value / maxValue) * 240}
                      C 110,${280 - (mockData[1].value / maxValue) * 240} 110,${280 - (mockData[2].value / maxValue) * 240} 140,${280 - (mockData[2].value / maxValue) * 240}
                      C 170,${280 - (mockData[2].value / maxValue) * 240} 170,${280 - (mockData[3].value / maxValue) * 240} 200,${280 - (mockData[3].value / maxValue) * 240}
                      C 230,${280 - (mockData[3].value / maxValue) * 240} 230,${280 - (mockData[4].value / maxValue) * 240} 260,${280 - (mockData[4].value / maxValue) * 240}
                      C 290,${280 - (mockData[4].value / maxValue) * 240} 290,${280 - (mockData[5].value / maxValue) * 240} 320,${280 - (mockData[5].value / maxValue) * 240}
                      C 350,${280 - (mockData[5].value / maxValue) * 240} 350,${280 - (mockData[6].value / maxValue) * 240} 380,${280 - (mockData[6].value / maxValue) * 240}`}
                  fill="none"
                  stroke="#10b981"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />

                {/* Secondary Line (Red) */}
                <path
                  d={`M 20,${280 - (mockData[0].value / maxValue) * 200} 
                      C 50,${280 - (mockData[0].value / maxValue) * 200} 50,${280 - (mockData[1].value / maxValue) * 180} 80,${280 - (mockData[1].value / maxValue) * 180}
                      C 110,${280 - (mockData[1].value / maxValue) * 180} 110,${280 - (mockData[2].value / maxValue) * 160} 140,${280 - (mockData[2].value / maxValue) * 160}
                      C 170,${280 - (mockData[2].value / maxValue) * 160} 170,${280 - (mockData[3].value / maxValue) * 220} 200,${280 - (mockData[3].value / maxValue) * 220}
                      C 230,${280 - (mockData[3].value / maxValue) * 220} 230,${280 - (mockData[4].value / maxValue) * 190} 260,${280 - (mockData[4].value / maxValue) * 190}
                      C 290,${280 - (mockData[4].value / maxValue) * 190} 290,${280 - (mockData[5].value / maxValue) * 210} 320,${280 - (mockData[5].value / maxValue) * 210}
                      C 350,${280 - (mockData[5].value / maxValue) * 210} 350,${280 - (mockData[6].value / maxValue) * 185} 380,${280 - (mockData[6].value / maxValue) * 185}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />

                {/* Data Points */}
                {mockData.map((point, index) => (
                  <g key={point.day}>
                    {/* Main line point */}
                    <circle
                      className="hover:r-6 transition-all"
                      cx={20 + index * 60}
                      cy={280 - (point.value / maxValue) * 240}
                      fill="#10b981"
                      r="4"
                    />

                    {/* Wednesday peak tooltip */}
                    {index === 3 && (
                      <g>
                        <circle
                          cx={200}
                          cy={280 - (point.value / maxValue) * 240}
                          fill="#279f51"
                          r="6"
                        />
                        {/* Tooltip */}
                        <rect
                          fill="#279f51"
                          height="30"
                          rx="6"
                          width="90"
                          x="155"
                          y="20"
                        />
                        <text
                          fill="white"
                          fontSize="14"
                          fontWeight="500"
                          textAnchor="middle"
                          x="200"
                          y="40"
                        >
                          2.5k
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="mt-4 flex justify-between px-4">
              {mockData.map((point) => (
                <div
                  className="font-medium text-gray-400 text-sm"
                  key={point.day}
                >
                  {point.day}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
