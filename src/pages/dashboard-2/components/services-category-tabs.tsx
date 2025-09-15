'use client';

import { serviceCategories } from '../data/services-data';

interface ServicesCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

export function ServicesCategoryTabs({
  activeCategory,
  onCategoryChange,
  className,
}: ServicesCategoryTabsProps) {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      {serviceCategories.map((category) => (
        <button
          className={`px-3 py-2 font-medium text-[12px] transition-colors ${
            activeCategory === category
              ? 'rounded-[4px] bg-[#008381] font-semibold text-white'
              : 'text-[#7a7a7a] hover:bg-gray-50 hover:text-[#3f3f3f]'
          }`}
          key={category}
          onClick={() => onCategoryChange(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
