import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import QandADetailsView from '@/pages/qanda/views/qanda-details-view';
import { paths } from '@/route/paths';
import { getQandAById } from '@/server/functions/qanda-functions';

interface QandADetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: QandADetailsPageProps): Promise<Metadata> {
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
    title: `${truncatedQuery} | Q&A Details`,
    description: `View details for Q&A question: ${truncatedQuery}`,
  };
}

// Loading component for the details view
function QandADetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button disabled size="sm" variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Q&A
          </Button>
          <div>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="mb-2 h-4 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div>
                <Skeleton className="mb-2 h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-5 w-20" />
              </CardHeader>
              <CardContent>
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Server component for fetching and displaying Q&A details
async function QandADetailsContent({ id }: { id: string }) {
  const result = await getQandAById(id);

  if (!(result.success && result.data)) {
    notFound();
  }

  return <QandADetailsView qanda={result.data} />;
}

export default function QandADetailsPage({ params }: QandADetailsPageProps) {
  return (
    <div className="container mx-auto px-4 py-6">
      <Suspense fallback={<QandADetailsLoading />}>
        <QandADetailsContent id={params.id} />
      </Suspense>
    </div>
  );
}
