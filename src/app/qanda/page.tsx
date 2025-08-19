import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QandAListView from '@/pages/qanda/views/qanda-list-view';
import { getQandAList } from '@/server/functions/qanda-functions';

export const metadata: Metadata = {
  title: 'Q&A Questions | Online Test Management',
  description:
    'Manage questions and answers for online tests. Create, edit, and organize Q&A content.',
};

// Loading component for the list view
function QandAListLoading() {
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

// Server component for fetching and displaying Q&A list
async function QandAListContent() {
  const result = await getQandAList();

  if (!result.success) {
    return <QandAListView error={result.error} initialData={[]} />;
  }

  return <QandAListView initialData={result.data || []} />;
}

export default function QandAListPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={<QandAListLoading />}>
        <QandAListContent />
      </Suspense>
    </div>
  );
}
