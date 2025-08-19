'use client';

import { useCallback, useMemo, useState } from 'react';
import type {
  QandA,
  QandAFilter,
  QandAListResponse,
} from '@/lib/schemas/qanda-schema';

interface UseQandACardsProps {
  initialData: QandAListResponse;
  onFiltersChange?: (filters: QandAFilter) => void;
}

interface UseQandACardsReturn {
  // Data
  data: QandAListResponse;
  filteredData: QandAListResponse;

  // Filters
  filters: QandAFilter;
  setFilters: (filters: QandAFilter) => void;
  clearFilters: () => void;

  // Stats
  totalCount: number;
  filteredCount: number;
  activeCount: number;
  inactiveCount: number;
  multiChoiceCount: number;

  // Utilities
  updateData: (newData: QandAListResponse) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<QandA>) => void;

  // Search and filter helpers
  hasActiveFilters: boolean;
  filterSummary: string;
}

export function useQandACards({
  initialData,
  onFiltersChange,
}: UseQandACardsProps): UseQandACardsReturn {
  const [data, setData] = useState<QandAListResponse>(initialData);
  const [filters, setFiltersState] = useState<QandAFilter>({});

  // Update filters and notify parent
  const setFilters = useCallback(
    (newFilters: QandAFilter) => {
      setFiltersState(newFilters);
      onFiltersChange?.(newFilters);
    },
    [onFiltersChange]
  );

  // Clear all filters
  const clearFilters = useCallback(() => {
    const emptyFilters: QandAFilter = {};
    setFilters(emptyFilters);
  }, [setFilters]);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Text search in query
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.QUERY.toLowerCase().includes(searchTerm) ||
          item.LOOKUP_VALUES.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by active status
    if (filters.active && filters.active !== 'all') {
      filtered = filtered.filter((item) => item.ACTIVE === filters.active);
    }

    // Filter by multi-choice
    if (filters.multiChoice && filters.multiChoice !== 'all') {
      filtered = filtered.filter(
        (item) => item.MULTI_CHOICE === filters.multiChoice
      );
    }

    // Filter by query type
    if (filters.queryType && filters.queryType.trim()) {
      filtered = filtered.filter(
        (item) => item.QUERY_TYPE === filters.queryType
      );
    }

    // Filter by lookup values (category)
    if (filters.lookupValues && filters.lookupValues.trim()) {
      const lookupTerm = filters.lookupValues.toLowerCase();
      filtered = filtered.filter((item) =>
        item.LOOKUP_VALUES.toLowerCase().includes(lookupTerm)
      );
    }

    // Filter by marks range
    if (filters.minMarks !== undefined) {
      filtered = filtered.filter(
        (item) => item.MARKS_PER_QUERY >= filters.minMarks!
      );
    }
    if (filters.maxMarks !== undefined) {
      filtered = filtered.filter(
        (item) => item.MARKS_PER_QUERY <= filters.maxMarks!
      );
    }

    return filtered;
  }, [data, filters]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCount = data.length;
    const filteredCount = filteredData.length;
    const activeCount = data.filter((item) => item.ACTIVE === 'Y').length;
    const inactiveCount = data.filter((item) => item.ACTIVE === 'N').length;
    const multiChoiceCount = data.filter(
      (item) => item.MULTI_CHOICE === 'Y'
    ).length;

    return {
      totalCount,
      filteredCount,
      activeCount,
      inactiveCount,
      multiChoiceCount,
    };
  }, [data, filteredData]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(
      (value) => value && value !== 'all' && value !== ''
    );
  }, [filters]);

  // Generate filter summary text
  const filterSummary = useMemo(() => {
    const activeParts: string[] = [];

    if (filters.search) {
      activeParts.push(`Search: "${filters.search}"`);
    }
    if (filters.active && filters.active !== 'all') {
      activeParts.push(
        `Status: ${filters.active === 'Y' ? 'Active' : 'Inactive'}`
      );
    }
    if (filters.multiChoice && filters.multiChoice !== 'all') {
      activeParts.push(
        `Type: ${filters.multiChoice === 'Y' ? 'Multi-Choice' : 'Single Answer'}`
      );
    }
    if (filters.lookupValues) {
      activeParts.push(`Category: "${filters.lookupValues}"`);
    }
    if (filters.minMarks !== undefined || filters.maxMarks !== undefined) {
      const min = filters.minMarks ?? 0;
      const max = filters.maxMarks ?? 100;
      activeParts.push(`Marks: ${min}-${max}`);
    }

    return activeParts.join(', ');
  }, [filters]);

  // Data manipulation utilities
  const updateData = useCallback((newData: QandAListResponse) => {
    setData(newData);
  }, []);

  const removeItem = useCallback((id: string) => {
    setData((prevData) => prevData.filter((item) => item.QUERY_ID !== id));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<QandA>) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.QUERY_ID === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  return {
    // Data
    data,
    filteredData,

    // Filters
    filters,
    setFilters,
    clearFilters,

    // Stats
    ...stats,

    // Utilities
    updateData,
    removeItem,
    updateItem,

    // Search and filter helpers
    hasActiveFilters,
    filterSummary,
  };
}

// Hook for managing card grid layout responsiveness
export function useCardGrid() {
  const [columns, setColumns] = useState(4);

  // Grid configuration based on screen size
  const gridConfig = useMemo(() => {
    return {
      sm: 1, // Mobile: 1 column
      md: 2, // Tablet: 2 columns
      lg: 3, // Desktop: 3 columns
      xl: 4, // Large desktop: 4 columns
      '2xl': 5, // Extra large: 5 columns
    };
  }, []);

  // CSS classes for responsive grid
  const gridClasses = useMemo(() => {
    return [
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      '2xl:grid-cols-5',
      'gap-4',
      'auto-rows-fr', // Equal height rows
    ].join(' ');
  }, []);

  return {
    columns,
    setColumns,
    gridConfig,
    gridClasses,
  };
}

// Hook for card animations and interactions
export function useCardInteractions() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleCardHover = useCallback((cardId: string | null) => {
    setHoveredCard(cardId);
  }, []);

  const handleCardSelect = useCallback((cardId: string) => {
    setSelectedCards((prev) => {
      if (prev.includes(cardId)) {
        return prev.filter((id) => id !== cardId);
      }
      return [...prev, cardId];
    });
  }, []);

  const selectAllCards = useCallback((cardIds: string[]) => {
    setSelectedCards(cardIds);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCards([]);
  }, []);

  const isCardSelected = useCallback(
    (cardId: string) => {
      return selectedCards.includes(cardId);
    },
    [selectedCards]
  );

  const isCardHovered = useCallback(
    (cardId: string) => {
      return hoveredCard === cardId;
    },
    [hoveredCard]
  );

  return {
    hoveredCard,
    selectedCards,
    handleCardHover,
    handleCardSelect,
    selectAllCards,
    clearSelection,
    isCardSelected,
    isCardHovered,
    hasSelection: selectedCards.length > 0,
    selectionCount: selectedCards.length,
  };
}

export default useQandACards;
