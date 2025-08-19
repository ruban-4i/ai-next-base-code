'use client';

import { Award, Edit, Eye, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { convertToUI, type QandA } from '@/lib/schemas/qanda-schema';
import { paths } from '@/route/paths';
import { toggleQandAActive } from '@/server/actions/qanda-actions';

interface QandACardProps {
  qanda: QandA;
  onDelete?: (id: string) => void;
}

export function QandACard({ qanda, onDelete }: QandACardProps) {
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
      } catch (error) {
        toast.error('Failed to update status');
        // Error already handled by toast
      }
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(qanda.QUERY_ID);
    }
  };

  // Truncate long queries for card display
  const truncatedQuery =
    qanda.QUERY.length > 150
      ? `${qanda.QUERY.substring(0, 150)}...`
      : qanda.QUERY;

  return (
    <Card className="flex h-full flex-col transition-shadow duration-200 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-3 font-medium text-sm leading-relaxed">
            {truncatedQuery}
          </CardTitle>
          <div className="flex shrink-0 items-center gap-2">
            <Badge
              className={isActive ? 'bg-green-100 text-green-800' : ''}
              variant={isActive ? 'default' : 'secondary'}
            >
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        {/* Query Type */}
        <div className="flex items-center gap-2">
          <Badge className="text-xs" variant="outline">
            {qanda.LOOKUP_VALUES || 'General'}
          </Badge>
        </div>

        <Separator />

        {/* Marks Information */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-muted-foreground text-xs">Marks</p>
              <p className="font-medium">{qanda.MARKS_PER_QUERY}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Minus className="h-4 w-4 text-red-600" />
            <div>
              <p className="text-muted-foreground text-xs">Minus %</p>
              <p className="font-medium">{qanda.MINUS_MARKS_PERC}%</p>
            </div>
          </div>
        </div>

        {/* Question Type Indicators */}
        <div className="flex items-center gap-2 text-xs">
          <Badge
            className="text-xs"
            variant={uiData.multiChoice ? 'default' : 'secondary'}
          >
            {uiData.multiChoice ? 'Multi-Choice' : 'Single Answer'}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-3">
        {/* Active Status Toggle */}
        <div className="flex w-full items-center justify-between">
          <label
            className="font-medium text-sm"
            htmlFor={`active-${qanda.QUERY_ID}`}
          >
            Status
          </label>
          <Switch
            aria-label={`Toggle Q&A ${isActive ? 'inactive' : 'active'}`}
            checked={isActive}
            disabled={isPending}
            id={`active-${qanda.QUERY_ID}`}
            onCheckedChange={handleToggleActive}
          />
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Button asChild className="h-8 px-2" size="sm" variant="outline">
              <Link href={paths.qanda.details(qanda.QUERY_ID)}>
                <Eye className="h-3 w-3" />
                <span className="sr-only">View details</span>
              </Link>
            </Button>

            <Button asChild className="h-8 px-2" size="sm" variant="outline">
              <Link href={paths.qanda.edit(qanda.QUERY_ID)}>
                <Edit className="h-3 w-3" />
                <span className="sr-only">Edit Q&A</span>
              </Link>
            </Button>
          </div>

          <Button
            className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleDelete}
            size="sm"
            variant="outline"
          >
            <Trash2 className="h-3 w-3" />
            <span className="sr-only">Delete Q&A</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default QandACard;
