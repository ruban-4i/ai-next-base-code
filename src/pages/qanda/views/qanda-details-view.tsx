'use client';

import {
  ArrowLeft,
  Award,
  CheckCircle,
  Edit,
  FileText,
  Minus,
  Tag,
  ToggleLeft,
  ToggleRight,
  Trash2,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { convertToUI, type QandA } from '@/lib/schemas/qanda-schema';
import { paths } from '@/route/paths';
import { deleteQandA, toggleQandAActive } from '@/server/actions/qanda-actions';

interface QandADetailsViewProps {
  qanda: QandA;
}

export function QandADetailsView({ qanda }: QandADetailsViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isActive, setIsActive] = useState(qanda.ACTIVE === 'Y');

  const uiData = convertToUI(qanda);

  const handleToggleActive = () => {
    startTransition(async () => {
      try {
        const result = await toggleQandAActive(qanda.QUERY_ID, qanda.ACTIVE);

        if (result.success) {
          setIsActive(!isActive);
          toast.success(
            `Q&A ${isActive ? 'deactivated' : 'activated'} successfully`
          );
        } else {
          toast.error(result.error || 'Failed to update status');
        }
      } catch {
        toast.error('Failed to update status');
        // Error already handled by toast
      }
    });
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this Q&A question?\n\nThis action cannot be undone.'
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteQandA(qanda.QUERY_ID);

        if (result.success) {
          toast.success('Q&A question deleted successfully');
          router.push(paths.qanda.root);
        } else {
          toast.error(result.error || 'Failed to delete Q&A question');
        }
      } catch {
        toast.error('Failed to delete Q&A question');
        // Error already handled by toast
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild size="sm" variant="outline">
            <Link href={paths.qanda.root}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Q&A
            </Link>
          </Button>
          <div>
            <h1 className="font-bold text-2xl tracking-tight">Q&A Details</h1>
            <p className="text-muted-foreground">
              View and manage question details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="gap-2"
            disabled={isPending}
            onClick={handleToggleActive}
            variant="outline"
          >
            {isActive ? (
              <>
                <ToggleRight className="h-4 w-4" />
                Active
              </>
            ) : (
              <>
                <ToggleLeft className="h-4 w-4" />
                Inactive
              </>
            )}
          </Button>

          <Button asChild variant="outline">
            <Link href={paths.qanda.edit(qanda.QUERY_ID)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>

          <Button
            disabled={isPending}
            onClick={handleDelete}
            variant="destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {!isActive && (
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            This Q&A question is currently inactive and won't appear in tests.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Question */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base leading-relaxed">
                {qanda.QUERY}
              </p>
            </CardContent>
          </Card>

          {/* Category & Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Category & Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-medium text-muted-foreground text-sm">
                  Category
                </div>
                <div className="mt-1">
                  <Badge className="text-sm" variant="outline">
                    {qanda.LOOKUP_VALUES || 'General'}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="font-medium text-muted-foreground text-sm">
                  Question Type
                </div>
                <div className="mt-1">
                  <Badge
                    className="text-sm"
                    variant={uiData.multiChoice ? 'default' : 'secondary'}
                  >
                    {uiData.multiChoice
                      ? 'Multi-Choice Question'
                      : 'Single Answer Question'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {isActive ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <Badge variant="secondary">Inactive</Badge>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scoring */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm">Marks</span>
                </div>
                <Badge className="font-mono" variant="outline">
                  {qanda.MARKS_PER_QUERY}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Minus className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-sm">Minus %</span>
                </div>
                <Badge className="font-mono" variant="outline">
                  {qanda.MINUS_MARKS_PERC}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Technical Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Question ID:</span>
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  {qanda.QUERY_ID}
                </code>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Topic ID:</span>
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  {qanda.TOPIC_ID}
                </code>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Query Type:</span>
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  {qanda.QUERY_TYPE}
                </code>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start"
                disabled={isPending}
                onClick={handleToggleActive}
                size="sm"
                variant="outline"
              >
                {isActive ? (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Deactivate Question
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Activate Question
                  </>
                )}
              </Button>

              <Button
                asChild
                className="w-full justify-start"
                size="sm"
                variant="outline"
              >
                <Link href={paths.qanda.edit(qanda.QUERY_ID)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Question
                </Link>
              </Button>

              <Button
                className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                disabled={isPending}
                onClick={handleDelete}
                size="sm"
                variant="outline"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Question
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Loading overlay */}
      {isPending && (
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

export default QandADetailsView;
