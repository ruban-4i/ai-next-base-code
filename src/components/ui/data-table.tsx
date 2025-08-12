'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
} from 'lucide-react'

interface PaginationState {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}

interface ServerPaginationInfo {
  currentPage: number
  totalPages: number
  totalCount: number
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  // Optional pagination configuration
  enablePagination?: boolean
  defaultPageSize?: number
  pageSizeOptions?: number[]
  // Server-side pagination
  enableServerPagination?: boolean
  serverPaginationInfo?: ServerPaginationInfo
  onPaginationChange?: (pagination: PaginationState) => void
  initialPagination?: PaginationState
  // Optional search configuration
  enableGlobalFilter?: boolean
  searchPlaceholder?: string
  // Optional styling
  className?: string
  // Optional empty state
  emptyStateMessage?: string
  // Optional loading state
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  enablePagination = true,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  enableServerPagination = false,
  serverPaginationInfo,
  onPaginationChange,
  initialPagination,
  enableGlobalFilter = true,
  searchPlaceholder = 'Search...',
  className,
  emptyStateMessage = 'No results found.',
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(
    initialPagination?.sortBy ? [{ 
      id: initialPagination.sortBy, 
      desc: initialPagination.sortOrder === 'desc' 
    }] : []
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState(initialPagination?.search || '')
  
  // Server-side pagination state
  const [serverPagination, setServerPagination] = useState<PaginationState>({
    page: initialPagination?.page || 1,
    limit: initialPagination?.limit || defaultPageSize,
    sortBy: initialPagination?.sortBy,
    sortOrder: initialPagination?.sortOrder || 'asc',
    search: initialPagination?.search || '',
  })

  // Handle server-side pagination changes
  const handleServerPaginationChange = (newPagination: Partial<PaginationState>) => {
    const updatedPagination = { ...serverPagination, ...newPagination }
    setServerPagination(updatedPagination)
    onPaginationChange?.(updatedPagination)
  }

  // Handle search with debouncing for server-side
  const handleSearchChange = (value: string) => {
    setGlobalFilter(value)
    if (enableServerPagination) {
      // Reset to first page when searching
      handleServerPaginationChange({ search: value, page: 1 })
    }
  }

  // Handle sorting for server-side
  const handleSortingChange = (updaterOrValue: any) => {
    setSorting(updaterOrValue)
    if (enableServerPagination && typeof updaterOrValue === 'function') {
      const newSorting = updaterOrValue(sorting)
      if (newSorting.length > 0) {
        const sort = newSorting[0]
        handleServerPaginationChange({
          sortBy: sort.id,
          sortOrder: sort.desc ? 'desc' : 'asc',
          page: 1, // Reset to first page when sorting
        })
      } else {
        handleServerPaginationChange({
          sortBy: undefined,
          sortOrder: 'asc',
          page: 1,
        })
      }
    }
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: enableServerPagination ? handleSortingChange : setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination && !enableServerPagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableServerPagination ? undefined : getSortedRowModel(),
    getFilteredRowModel: enableServerPagination ? undefined : getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: enableServerPagination ? handleSearchChange : setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
    },
    initialState: {
      pagination: enablePagination && !enableServerPagination
        ? {
            pageSize: defaultPageSize,
          }
        : undefined,
    },
    // Server-side pagination configuration
    manualPagination: enableServerPagination,
    manualSorting: enableServerPagination,
    manualFiltering: enableServerPagination,
    pageCount: enableServerPagination ? serverPaginationInfo?.totalPages : undefined,
  })

  return (
    <div className={className}>
      {/* Search Input */}
      {enableGlobalFilter && (
        <div className="flex items-center py-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter ?? ''}
              onChange={(event) => {
                if (enableServerPagination) {
                  handleSearchChange(event.target.value)
                } else {
                  setGlobalFilter(event.target.value)
                }
              }}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <div className="text-muted-foreground">Loading...</div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="text-muted-foreground">{emptyStateMessage}</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between space-x-2 py-4">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <select
              value={enableServerPagination ? serverPagination.limit : table.getState().pagination.pageSize}
              onChange={(e) => {
                const newPageSize = Number(e.target.value)
                if (enableServerPagination) {
                  handleServerPaginationChange({ limit: newPageSize, page: 1 })
                } else {
                  table.setPageSize(newPageSize)
                }
              }}
              className="h-8 w-[70px] rounded border border-input bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {pageSizeOptions.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination Info and Controls */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page{' '}
              {enableServerPagination 
                ? serverPagination.page 
                : table.getState().pagination.pageIndex + 1
              }{' '}
              of{' '}
              {enableServerPagination 
                ? serverPaginationInfo?.totalPages || 1 
                : table.getPageCount()
              }
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => {
                  if (enableServerPagination) {
                    handleServerPaginationChange({ page: 1 })
                  } else {
                    table.setPageIndex(0)
                  }
                }}
                disabled={
                  enableServerPagination 
                    ? serverPagination.page <= 1 
                    : !table.getCanPreviousPage()
                }
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => {
                  if (enableServerPagination) {
                    handleServerPaginationChange({ page: serverPagination.page - 1 })
                  } else {
                    table.previousPage()
                  }
                }}
                disabled={
                  enableServerPagination 
                    ? serverPagination.page <= 1 
                    : !table.getCanPreviousPage()
                }
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => {
                  if (enableServerPagination) {
                    handleServerPaginationChange({ page: serverPagination.page + 1 })
                  } else {
                    table.nextPage()
                  }
                }}
                disabled={
                  enableServerPagination 
                    ? serverPagination.page >= (serverPaginationInfo?.totalPages || 1)
                    : !table.getCanNextPage()
                }
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => {
                  if (enableServerPagination) {
                    handleServerPaginationChange({ page: serverPaginationInfo?.totalPages || 1 })
                  } else {
                    table.setPageIndex(table.getPageCount() - 1)
                  }
                }}
                disabled={
                  enableServerPagination 
                    ? serverPagination.page >= (serverPaginationInfo?.totalPages || 1)
                    : !table.getCanNextPage()
                }
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {enablePagination && (
        <div className="text-xs text-muted-foreground">
          {enableServerPagination ? (
            <>
              Showing{' '}
              {serverPaginationInfo?.totalCount === 0
                ? 0
                : (serverPagination.page - 1) * serverPagination.limit + 1}
              {' to '}
              {Math.min(
                serverPagination.page * serverPagination.limit,
                serverPaginationInfo?.totalCount || 0
              )}{' '}
              of {serverPaginationInfo?.totalCount || 0} results
            </>
          ) : (
            <>
              Showing{' '}
              {table.getFilteredRowModel().rows.length === 0
                ? 0
                : table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                  1}
              {' to '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </>
          )}
        </div>
      )}
    </div>
  )
}
