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
import type { Topics, TopicsListResponse } from '@/lib/schemas/topics-schema';
import { useTopicsColumn } from '@/pages/topics/hooks/use-topics-column';
import { deleteTopic } from '@/server/actions/topics-actions';

interface TopicsListViewProps {
  initialData: TopicsListResponse;
}

export function TopicsListView({ initialData }: TopicsListViewProps) {
  const router = useRouter();

  // Custom hooks for delete functionality
  const selected = useSelectedRow<Topics>();
  const confirm = useBoolean(false);

  // Use nuqs for URL state management with ISR page refresh
  const [urlParams, setUrlParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(initialData.currentPage),
      limit: parseAsInteger.withDefault(10),
      search: parseAsString.withDefault(''),
      sortBy: parseAsString.withDefault(''),
      sortOrder: parseAsString.withDefault('asc'),
    },
    {
      history: 'push',
      shallow: false, // This ensures ISR page refresh
    }
  );

  // Get table columns with action handlers
  const columns = useTopicsColumn({
    onView: (topic) => {
      router.push(`/topics/${topic.TOPIC_ID}`);
    },
    onEdit: (topic) => {
      router.push(`/topics/${topic.TOPIC_ID}/edit`);
    },
    onDelete: (topic) => {
      selected.setRow(topic);
      confirm.onTrue();
    },
  });

  // Handle delete confirmation
  const handleDelete = async () => {
    if (!selected.row) {
      return;
    }

    try {
      const result = await deleteTopic(selected.row.TOPIC_ID);

      if (result.success) {
        toast.success('Topic deleted successfully');
        confirm.onFalse();
        selected.reset();
        // Trigger ISR refresh
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to delete topic');
      }
    } catch {
      // Handle error silently
      toast.error('An unexpected error occurred');
    }
  };

  // Handle table pagination and sorting
  const handlePaginationChange = (pagination: {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
  }) => {
    setUrlParams({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: pagination.sortBy || '',
      sortOrder: pagination.sortOrder || 'asc',
      search: pagination.search || '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-semibold text-2xl tracking-tight">Topics</h1>
          <p className="text-muted-foreground text-sm">
            Manage topics and their associated questions
          </p>
        </div>
        <Button asChild>
          <Link href="/topics/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Topic
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Topics</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{initialData.totalCount}</div>
            <p className="text-muted-foreground text-xs">Across all streams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Topics</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {initialData.data.filter((topic) => topic.ACTIVE === 'Y').length}
            </div>
            <p className="text-muted-foreground text-xs">Currently available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Total Questions
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {initialData.data.reduce(
                (sum, topic) => sum + topic.QUERIES_COUNT,
                0
              )}
            </div>
            <p className="text-muted-foreground text-xs">Questions available</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Topics List</CardTitle>
          <CardDescription>
            View and manage all topics in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={initialData.data}
            defaultPageSize={urlParams.limit}
            emptyStateMessage="No topics found matching your search."
            enableGlobalFilter={true}
            enablePagination={true}
            enableServerPagination={true}
            initialPagination={{
              page: urlParams.page,
              limit: urlParams.limit,
              sortBy: urlParams.sortBy || undefined,
              sortOrder: (urlParams.sortOrder as 'asc' | 'desc') || 'asc',
              search: urlParams.search || undefined,
            }}
            onPaginationChange={handlePaginationChange}
            pageSizeOptions={[10, 20, 30, 40, 50]}
            searchPlaceholder="Search topics by name, stream, or description..."
            serverPaginationInfo={{
              currentPage: initialData.currentPage,
              totalPages: initialData.totalPages,
              totalCount: initialData.totalCount,
            }}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={confirm.value}
        message={`Are you sure you want to delete "${selected.row?.TOPIC_NAME}"? This action cannot be undone.`}
        onClose={() => {
          confirm.onFalse();
          selected.reset();
        }}
        onDelete={handleDelete}
        title="Delete Topic"
      />
    </div>
  );
}
