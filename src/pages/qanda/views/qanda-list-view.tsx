'use client';

import { AlertTriangle, FileX, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type {
  QandAFilter,
  QandAListResponse,
} from '@/lib/schemas/qanda-schema';
import { paths } from '@/route/paths';
import { deleteQandA } from '@/server/actions/qanda-actions';
import QandACard from '../components/qanda-card';
import QandASearchFilter from '../components/qanda-search-filter';

interface QandAListViewProps {
  initialData: QandAListResponse;
  onFiltersChange?: (filters: QandAFilter) => void;
  isLoading?: boolean;
  error?: string;
}

export function QandAListView({
  initialData,
  onFiltersChange,
  isLoading = false,
  error,
}: QandAListViewProps) {
  const [data, setData] = useState<QandAListResponse>(initialData);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (qandaId: string) => {
    if (deleteId) {
      return;
    } // Prevent multiple deletes

    const qanda = data.find((item) => item.QUERY_ID === qandaId);
    if (!qanda) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete this Q&A question?\n\n"${qanda.QUERY.substring(0, 100)}..."`
    );

    if (!confirmed) {
      return;
    }

    setDeleteId(qandaId);

    startTransition(async () => {
      try {
        const result = await deleteQandA(qandaId);

        if (result.success) {
          // Remove the deleted item from local state
          setData((prevData) =>
            prevData.filter((item) => item.QUERY_ID !== qandaId)
          );
          toast.success('Q&A question deleted successfully');
        } else {
          toast.error(result.error || 'Failed to delete Q&A question');
        }
      } catch {
        toast.error('Failed to delete Q&A question');
        // Error already handled by toast
      } finally {
        setDeleteId(null);
      }
    });
  };

  // Filter data based on current filters (for immediate UI feedback)
  const filteredData = data;

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <Skeleton className="h-12 w-full" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((skeletonId) => (
            <Card className="h-64" key={`skeleton-${skeletonId}`}>
              <CardHeader>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-6 w-20" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
                <Skeleton className="h-6 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Q&A Questions</h1>
            <p className="text-muted-foreground">
              Manage questions and answers for online tests
            </p>
          </div>
          <Button asChild>
            <Link href={paths.qanda.new}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Link>
          </Button>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Q&A Questions</h1>
          <p className="text-muted-foreground">
            Manage questions and answers for online tests
            {filteredData.length > 0 && (
              <span className="ml-2">
                ({filteredData.length} question
                {filteredData.length !== 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>
        <Button asChild>
          <Link href={paths.qanda.new}>
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <QandASearchFilter
        className="w-full"
        onFiltersChange={
          onFiltersChange ||
          (() => {
            // No-op function for server-side rendering
          })
        }
      />

      {/* Content */}
      {filteredData.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-12">
          <CardContent className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <FileX className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-lg">No Q&A questions found</h3>
              <p className="text-muted-foreground">
                Get started by creating your first question.
              </p>
            </div>
            <Button asChild>
              <Link href={paths.qanda.new}>
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredData.map((qanda) => (
            <div className="relative" key={qanda.QUERY_ID}>
              <QandACard onDelete={handleDelete} qanda={qanda} />
              {deleteId === qanda.QUERY_ID && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/80">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Deleting...
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Loading overlay for actions */}
      {isPending && !deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50">
          <div className="flex items-center gap-2 rounded-lg bg-background p-4 shadow-lg">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default QandAListView;
