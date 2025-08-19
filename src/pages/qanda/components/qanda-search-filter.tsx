'use client';

import { Filter, RotateCcw, Search, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { QandAFilter } from '@/lib/schemas/qanda-schema';

interface QandASearchFilterProps {
  onFiltersChange: (filters: QandAFilter) => void;
  initialFilters?: QandAFilter;
  className?: string;
}

export function QandASearchFilter({
  onFiltersChange,
  initialFilters = {},
  className = '',
}: QandASearchFilterProps) {
  const [filters, setFilters] = useState<QandAFilter>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  // Custom debounce implementation
  const timeoutRef = useRef<NodeJS.Timeout>();

  const debouncedFiltersChange = useCallback(
    (newFilters: QandAFilter) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        onFiltersChange(newFilters);
      }, 300);
    },
    [onFiltersChange]
  );

  // Update filters and trigger callback
  const updateFilters = useCallback(
    (newFilters: Partial<QandAFilter>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      debouncedFiltersChange(updatedFilters);
    },
    [filters, debouncedFiltersChange]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    const emptyFilters: QandAFilter = {};
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  }, [onFiltersChange]);

  // Count active filters (excluding search)
  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) =>
      key !== 'search' && value && value !== 'all' && value !== ''
  ).length;

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value !== 'all' && value !== ''
  );

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
        <Input
          className="pr-4 pl-10"
          onChange={(e) => updateFilters({ search: e.target.value })}
          placeholder="Search Q&A questions..."
          type="text"
          value={filters.search || ''}
        />
        {filters.search && (
          <Button
            className="-translate-y-1/2 absolute top-1/2 right-2 h-6 w-6 transform p-0 hover:bg-muted"
            onClick={() => updateFilters({ search: '' })}
            size="sm"
            variant="ghost"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          className="gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          variant="outline"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge className="ml-1 h-5 w-5 p-0 text-xs" variant="secondary">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            className="gap-2 text-muted-foreground hover:text-foreground"
            onClick={clearFilters}
            size="sm"
            variant="ghost"
          >
            <RotateCcw className="h-4 w-4" />
            Clear all
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 rounded-lg border bg-muted/20 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Active Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="active-filter">Status</Label>
              <Select
                onValueChange={(value) =>
                  updateFilters({
                    active: value as 'Y' | 'N' | 'all',
                  })
                }
                value={filters.active || 'all'}
              >
                <SelectTrigger id="active-filter">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Y">Active</SelectItem>
                  <SelectItem value="N">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Multi Choice Filter */}
            <div className="space-y-2">
              <Label htmlFor="multichoice-filter">Question Type</Label>
              <Select
                onValueChange={(value) =>
                  updateFilters({
                    multiChoice: value as 'Y' | 'N' | 'all',
                  })
                }
                value={filters.multiChoice || 'all'}
              >
                <SelectTrigger id="multichoice-filter">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="Y">Multi-Choice</SelectItem>
                  <SelectItem value="N">Single Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lookup Values (Category) Filter */}
            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Input
                id="category-filter"
                onChange={(e) =>
                  updateFilters({ lookupValues: e.target.value })
                }
                placeholder="Filter by category..."
                type="text"
                value={filters.lookupValues || ''}
              />
            </div>
          </div>

          <Separator />

          {/* Marks Range Filters */}
          <div className="space-y-3">
            <Label>Marks Range</Label>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  className="text-muted-foreground text-sm"
                  htmlFor="min-marks"
                >
                  Minimum Marks
                </Label>
                <Input
                  id="min-marks"
                  max="100"
                  min="0"
                  onChange={(e) =>
                    updateFilters({
                      minMarks: e.target.value
                        ? Number.parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  placeholder="0"
                  type="number"
                  value={filters.minMarks || ''}
                />
              </div>

              <div className="space-y-2">
                <Label
                  className="text-muted-foreground text-sm"
                  htmlFor="max-marks"
                >
                  Maximum Marks
                </Label>
                <Input
                  id="max-marks"
                  max="100"
                  min="0"
                  onChange={(e) =>
                    updateFilters({
                      maxMarks: e.target.value
                        ? Number.parseInt(e.target.value)
                        : undefined,
                    })
                  }
                  placeholder="100"
                  type="number"
                  value={filters.maxMarks || ''}
                />
              </div>
            </div>
          </div>

          {/* Active Filter Summary */}
          {hasActiveFilters && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="font-medium text-sm">Active Filters:</Label>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <Badge className="gap-1" variant="secondary">
                      Search: "{filters.search}"
                      <Button
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => updateFilters({ search: '' })}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {filters.active && filters.active !== 'all' && (
                    <Badge className="gap-1" variant="secondary">
                      Status: {filters.active === 'Y' ? 'Active' : 'Inactive'}
                      <Button
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => updateFilters({ active: 'all' })}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {filters.multiChoice && filters.multiChoice !== 'all' && (
                    <Badge className="gap-1" variant="secondary">
                      Type:{' '}
                      {filters.multiChoice === 'Y'
                        ? 'Multi-Choice'
                        : 'Single Answer'}
                      <Button
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => updateFilters({ multiChoice: 'all' })}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {filters.lookupValues && (
                    <Badge className="gap-1" variant="secondary">
                      Category: "{filters.lookupValues}"
                      <Button
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => updateFilters({ lookupValues: '' })}
                        size="sm"
                        variant="ghost"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}

                  {(filters.minMarks || filters.maxMarks) && (
                    <Badge className="gap-1" variant="secondary">
                      Marks: {filters.minMarks || 0}-{filters.maxMarks || 100}
                      <Button
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() =>
                          updateFilters({
                            minMarks: undefined,
                            maxMarks: undefined,
                          })
                        }
                        size="sm"
                        variant="ghost"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default QandASearchFilter;
