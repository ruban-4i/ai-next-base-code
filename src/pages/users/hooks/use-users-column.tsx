'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Edit,
  Eye,
  Mail,
  MoreHorizontal,
  Trash,
  User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { UseBooleanReturn } from '@/hooks/use-boolean';
import type { UseSelectedRowReturn } from '@/hooks/use-selected-row';
import type { User } from '@/lib/schemas/user-schema';
import { paths } from '@/route/paths';

interface UseUsersColumnsProps {
  selected: UseSelectedRowReturn<User>;
  confirm: UseBooleanReturn;
}

/**
 * Custom hook for Users table column definitions
 * Implements TanStack React Table columns with sorting and actions
 */
export function useUsersColumns({
  selected,
  confirm,
}: UseUsersColumnsProps): ColumnDef<User>[] {
  // Get user initials for avatar
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get status badge variant
  const getStatusVariant = (active: string): 'default' | 'secondary' => {
    return active === 'Y' ? 'default' : 'secondary';
  };

  // Get role badge variant
  const getRoleVariant = (
    role: string
  ): 'default' | 'destructive' | 'outline' | 'secondary' => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'destructive';
      case 'hr':
        return 'default';
      case 'candidate':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'NAME',
      header: ({ column }) => {
        return (
          <Button
            className="p-0 font-semibold hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex min-w-0 items-center space-x-3">
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarFallback className="text-xs">
                {getUserInitials(user.NAME)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{user.NAME}</div>
              <div className="truncate text-muted-foreground text-xs">
                ID: {user.USER_ID.slice(-8)}
              </div>
            </div>
          </div>
        );
      },
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'USER_NAME',
      header: ({ column }) => {
        return (
          <Button
            className="p-0 font-semibold hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const email = getValue() as string;
        return (
          <div className="max-w-[200px] truncate text-sm" title={email}>
            {email}
          </div>
        );
      },
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'LOOKUP_VALUES',
      header: ({ column }) => {
        return (
          <Button
            className="p-0 font-semibold hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const role = getValue() as string;
        return (
          <Badge className="font-medium" variant={getRoleVariant(role)}>
            {role}
          </Badge>
        );
      },
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      accessorKey: 'DEPARTMENT',
      header: 'Department',
      cell: ({ getValue }) => {
        const department = getValue() as string | undefined;
        return (
          <div className="max-w-[150px] truncate text-sm">
            {department || '-'}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'BATCH_NAME',
      header: 'Batch',
      cell: ({ getValue }) => {
        const batch = getValue() as string | undefined;
        return (
          <div className="max-w-[120px] truncate text-sm">{batch || '-'}</div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'ACTIVE',
      header: ({ column }) => {
        return (
          <Button
            className="p-0 font-semibold hover:bg-transparent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            variant="ghost"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge className="font-medium" variant={getStatusVariant(status)}>
            {status === 'Y' ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
      enableSorting: true,
      sortingFn: 'alphanumeric',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <div className="flex items-center justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-8 w-8 p-0" variant="ghost">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                  <Link
                    className="cursor-pointer"
                    href={paths.users.details(user.USER_ID)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    className="cursor-pointer"
                    href={paths.users.edit(user.USER_ID)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit User
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => {
                    selected.setRow(user);
                    confirm.onTrue();
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  return columns;
}
