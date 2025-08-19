import { ArrowLeft, FileX, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { paths } from '@/route/paths';

export const metadata: Metadata = {
  title: 'Q&A Not Found | Online Test Management',
  description: 'The requested Q&A question could not be found.',
};

export default function QandANotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="mx-auto max-w-md">
        <CardContent className="space-y-6 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileX className="h-8 w-8 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <h1 className="font-bold text-2xl">Q&A Not Found</h1>
            <p className="text-muted-foreground">
              The Q&A question you're looking for doesn't exist or may have been
              deleted.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <Link href={paths.qanda.root}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Q&A
              </Link>
            </Button>

            <Button asChild>
              <Link href={paths.qanda.new}>
                <Plus className="mr-2 h-4 w-4" />
                Create Question
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
