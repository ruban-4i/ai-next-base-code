'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Topics } from '@/lib/schemas/topics-schema';

type UseTopicsColumnProps = {
  onView?: (topic: Topics) => void;
  onEdit?: (topic: Topics) => void;
  onDelete?: (topic: Topics) => void;
};

export function useTopicsColumn({
  onView,
  onEdit,
  onDelete,
}: UseTopicsColumnProps = {}) {
  const columns = useMemo<ColumnDef<Topics>[]>(
    () => [
      {
        accessorKey: 'TOPIC_NAME',
        header: 'Topic Name',
        cell: ({ row }) => {
          const topicName = row.getValue('TOPIC_NAME') as string;
          return (
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {topicName}
            </div>
          );
        },
      },
      {
        accessorKey: 'STREAM',
        header: 'Stream',
        cell: ({ row }) => {
          const stream = row.getValue('STREAM') as string;
          return (
            <div className="text-gray-600 text-sm dark:text-gray-400">
              {stream}
            </div>
          );
        },
      },
      {
        accessorKey: 'DESCRIPTION',
        header: 'Description',
        cell: ({ row }) => {
          const description = row.getValue('DESCRIPTION') as string;
          return (
            <div className="max-w-[300px] truncate text-gray-600 text-sm dark:text-gray-400">
              {description}
            </div>
          );
        },
      },
      {
        accessorKey: 'QUERIES_COUNT',
        header: 'Questions',
        cell: ({ row }) => {
          const count = row.getValue('QUERIES_COUNT') as number;
          return (
            <div className="text-center">
              <Badge className="font-mono" variant="secondary">
                {count}
              </Badge>
            </div>
          );
        },
      },
      {
        accessorKey: 'ACTIVE',
        header: 'Status',
        cell: ({ row }) => {
          const active = row.getValue('ACTIVE') as 'Y' | 'N';
          return (
            <Badge variant={active === 'Y' ? 'default' : 'destructive'}>
              {active === 'Y' ? 'Active' : 'Inactive'}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'CREATION_DATE',
        header: 'Created',
        cell: ({ row }) => {
          const date = row.getValue('CREATION_DATE') as string;
          return (
            <div className="text-gray-600 text-sm dark:text-gray-400">
              {format(new Date(date), 'MMM dd, yyyy')}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const topic = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 p-0" variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onView && (
                  <DropdownMenuItem onClick={() => onView(topic)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                )}
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(topic)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Topic
                  </DropdownMenuItem>
                )}
                {(onView || onEdit) && onDelete && <DropdownMenuSeparator />}
                {onDelete && (
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={() => onDelete(topic)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onView, onEdit, onDelete]
  );

  return columns;
}
