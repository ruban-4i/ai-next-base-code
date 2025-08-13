'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import {
  ArrowUpDown,
  DollarSign,
  Edit,
  Eye,
  MoreHorizontal,
  Package,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UseBooleanReturn } from '@/hooks/use-boolean';
import type { UseSelectedRowReturn } from '@/hooks/use-selected-row';
import type { Book } from '@/lib/schemas/books-schema';
import { paths } from '@/route/paths';

interface UseBooksColumnsProps {
  onView?: (book: Book) => void;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  onToggleStatus?: (book: Book) => void;
  confirm?: UseBooleanReturn;
  selected?: UseSelectedRowReturn<Book>;
}

export function useBooksColumn({
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: UseBooksColumnsProps = {}): ColumnDef<Book>[] {
  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  // Get status badge variant and text
  const getStatusBadge = (active: string) => {
    return active === 'Y'
      ? { variant: 'default' as const, text: 'Active' }
      : { variant: 'secondary' as const, text: 'Inactive' };
  };

  // Get stock status
  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { variant: 'destructive' as const, text: 'Out of Stock' };
    if (quantity < 10)
      return { variant: 'secondary' as const, text: 'Low Stock' };
    return { variant: 'default' as const, text: 'In Stock' };
  };

  // Get category badge variant
  const getCategoryVariant = (category: string) => {
    const categoryColors: Record<
      string,
      'default' | 'secondary' | 'destructive' | 'outline'
    > = {
      Programming: 'default',
      'Computer Science': 'secondary',
      'Artificial Intelligence': 'destructive',
      'Frontend Development': 'outline',
      'Database Management': 'default',
      'Cloud Technology': 'secondary',
    };
    return categoryColors[category] || 'outline';
  };

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: 'BOOK_TITLE',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Book Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const book = row.original;
        return (
          <div className="space-y-1">
            <div className="font-medium">{book.BOOK_TITLE}</div>
            <div className="text-muted-foreground text-sm">
              by {book.AUTHOR}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'CATEGORY',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const category = row.getValue('CATEGORY') as string;
        return <Badge variant={getCategoryVariant(category)}>{category}</Badge>;
      },
    },
    {
      accessorKey: 'ISBN',
      header: 'ISBN',
      cell: ({ row }) => {
        const isbn = row.getValue('ISBN') as string;
        return <div className="font-mono text-sm">{isbn}</div>;
      },
    },
    {
      accessorKey: 'PRICE',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          <DollarSign className="mr-1 h-4 w-4" />
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = row.getValue('PRICE') as number;
        return <div className="font-medium">{formatPrice(price)}</div>;
      },
    },
    {
      accessorKey: 'STOCK_QUANTITY',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          <Package className="mr-1 h-4 w-4" />
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const stock = row.getValue('STOCK_QUANTITY') as number;
        const stockStatus = getStockStatus(stock);
        return (
          <div className="space-y-1">
            <div className="font-medium">{stock}</div>
            <Badge className="text-xs" variant={stockStatus.variant}>
              {stockStatus.text}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: 'PAGES_COUNT',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Pages
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const pages = row.getValue('PAGES_COUNT') as number;
        return (
          <div className="text-muted-foreground text-sm">
            {pages.toLocaleString()}
          </div>
        );
      },
    },
    {
      accessorKey: 'ACTIVE',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const active = row.getValue('ACTIVE') as string;
        const statusBadge = getStatusBadge(active);
        return <Badge variant={statusBadge.variant}>{statusBadge.text}</Badge>;
      },
    },
    {
      accessorKey: 'CREATION_DATE',
      header: ({ column }) => (
        <Button
          className="h-auto p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant="ghost"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = row.getValue('CREATION_DATE') as string;
        return (
          <div className="text-muted-foreground text-sm">
            {formatDate(date)}
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const book = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0" variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link
                  className="cursor-pointer"
                  href={paths.books.details(book.BOOK_ID)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="cursor-pointer"
                  href={paths.books.edit(book.BOOK_ID)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Book
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => onDelete?.(book)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}
