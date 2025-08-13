'use client';

import { BookOpen, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { toast } from 'sonner';
import { DeleteConfirmationModal } from '@/components/common/delete-confirmation-modal';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { useBoolean } from '@/hooks/use-boolean';
import { useSelectedRow } from '@/hooks/use-selected-row';
import type { Book, BookListResponse } from '@/lib/schemas/books-schema';
import { useBooksColumn } from '@/pages/books/hooks/use-books-column';
import { paths } from '@/route/paths';
import { deleteBook } from '@/server/actions/books-actions';

interface BooksListViewProps {
  initialData: BookListResponse;
}

interface PaginationState {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export function BooksListView({ initialData }: BooksListViewProps) {
  const router = useRouter();

  // Query state management for pagination and filtering
  const [paginationState, setPaginationState] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
      search: parseAsString.withDefault(''),
      category: parseAsString.withDefault(''),
      author: parseAsString.withDefault(''),
      active: parseAsString.withDefault(''),
      sortBy: parseAsString.withDefault(''),
      sortOrder: parseAsString.withDefault('desc'),
    },
    {
      history: 'push',
      shallow: false, // This ensures ISR page refresh
    }
  );

  // Modal and selection state
  const confirm = useBoolean();
  const selected = useSelectedRow<Book>();

  // Get table columns with action handlers
  const columns = useBooksColumn({
    onView: (book) => {
      router.push(paths.books.details(book.BOOK_ID));
    },
    onEdit: (book) => {
      router.push(paths.books.edit(book.BOOK_ID));
    },
    onDelete: (book) => {
      selected.setRow(book);
      confirm.onTrue();
    },
  });

  // Handle delete operation
  const handleDelete = async () => {
    if (!selected.row) return;

    try {
      const result = await deleteBook(selected.row.BOOK_ID);

      if (result.success) {
        toast.success('Book deleted successfully');
        router.refresh(); // Refresh the page to update the list
      } else {
        toast.error(result.error || 'Failed to delete book');
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
      toast.error('An unexpected error occurred');
    } finally {
      confirm.onFalse();
      selected.reset();
    }
  };

  // Calculate stats from current data
  const totalBooks = initialData.totalCount;
  const activeBooks = initialData.data.filter(
    (book) => book.ACTIVE === 'Y'
  ).length;
  const inactiveBooks = initialData.data.filter(
    (book) => book.ACTIVE === 'N'
  ).length;
  const totalValue = initialData.data.reduce(
    (sum, book) => sum + book.PRICE * book.STOCK_QUANTITY,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Books</h1>
          <p className="text-muted-foreground">
            Manage your book inventory and catalog
          </p>
        </div>
        <Button asChild>
          <Link href={paths.books.new}>
            <Plus className="mr-2 h-4 w-4" />
            Add Book
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{totalBooks}</div>
            <p className="text-muted-foreground text-xs">Books in catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Books</CardTitle>
            <BookOpen className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{activeBooks}</div>
            <p className="text-muted-foreground text-xs">Available for sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Inactive Books
            </CardTitle>
            <BookOpen className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{inactiveBooks}</div>
            <p className="text-muted-foreground text-xs">Not available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Value</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">${totalValue.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">Inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Books Catalog</CardTitle>
          <CardDescription>
            View and manage all books in your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            currentPage={initialData.currentPage}
            data={initialData.data}
            onPageChange={(page) => setPaginationState({ page })}
            onPageSizeChange={(limit) => setPaginationState({ limit, page: 1 })}
            onSearchChange={(search) => setPaginationState({ search, page: 1 })}
            pageSize={paginationState.limit}
            searchPlaceholder="Search books by title, author, or ISBN..."
            searchValue={paginationState.search}
            totalCount={initialData.totalCount}
            totalPages={initialData.totalPages}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        description={
          selected.row
            ? `Are you sure you want to delete "${selected.row.BOOK_TITLE}"? This action cannot be undone.`
            : 'Are you sure you want to delete this book?'
        }
        isOpen={confirm.value}
        onClose={confirm.onFalse}
        onConfirm={handleDelete}
        title="Delete Book"
      />
    </div>
  );
}
