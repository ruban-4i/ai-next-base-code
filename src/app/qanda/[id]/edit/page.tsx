import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QandACreateEditView from '@/pages/qanda/views/qanda-create-edit-view';
import { getQandAById } from '@/server/functions/qanda-functions';

interface QandAEditPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: QandAEditPageProps): Promise<Metadata> {
  const result = await getQandAById(params.id);

  if (!(result.success && result.data)) {
    return {
      title: 'Q&A Not Found | Online Test Management',
      description: 'The requested Q&A question could not be found.',
    };
  }

  const qanda = result.data;
  const truncatedQuery =
    qanda.QUERY.length > 100
      ? `${qanda.QUERY.substring(0, 100)}...`
      : qanda.QUERY;

  return {
    title: `Edit: ${truncatedQuery} | Q&A Management`,
    description: `Edit Q&A question: ${truncatedQuery}`,
  };
}

// Loading component for the edit form
function QandAEditLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button disabled size="sm" variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-2 h-4 w-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Skeleton className="mb-2 h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="mb-2 h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Skeleton className="mb-2 h-4 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div>
                  <Skeleton className="mb-2 h-4 w-28" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-36" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-20" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Server component for fetching and displaying Q&A edit form
async function QandAEditContent({ id }: { id: string }) {
  const result = await getQandAById(id);

  if (!(result.success && result.data)) {
    notFound();
  }

  return <QandACreateEditView mode="edit" qanda={result.data} />;
}

export default function QandAEditPage({ params }: QandAEditPageProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={<QandAEditLoading />}>
        <QandAEditContent id={params.id} />
      </Suspense>
    </div>
  );
}
