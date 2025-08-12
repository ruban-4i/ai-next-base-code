'use client';

import { Plus, UserCheck, UserX } from 'lucide-react';
import Link from 'next/link';
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
import type { User, UserListResponse } from '@/lib/schemas/user-schema';
import { useUsersColumns } from '@/pages/users/hooks/use-users-column';
import { deleteUser } from '@/server/actions/user-actions';

interface PaginationState {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

interface UsersListViewProps {
  usersData: UserListResponse;
  initialPagination: PaginationState;
}

export function UsersListView({
  usersData,
  initialPagination,
}: UsersListViewProps) {
  // Custom hooks for delete functionality
  const selected = useSelectedRow<User>();
  const confirm = useBoolean(false);

  // Get table columns with delete functionality
  const columns = useUsersColumns({ selected, confirm });

  // Use nuqs for URL state management with ISR page refresh
  const [urlParams, setUrlParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(initialPagination.page),
      limit: parseAsInteger.withDefault(initialPagination.limit),
      sortBy: parseAsString.withDefault(initialPagination.sortBy || ''),
      sortOrder: parseAsString.withDefault(
        initialPagination.sortOrder || 'asc'
      ),
      search: parseAsString.withDefault(initialPagination.search || ''),
    },
    { shallow: false }
  ); // ISR: Force page refresh when URL params change

  // Handle pagination changes
  const handlePaginationChange = (pagination: PaginationState) => {
    setUrlParams({
      page: pagination.page,
      limit: pagination.limit,
      sortBy: pagination.sortBy || '',
      sortOrder: pagination.sortOrder || 'asc',
      search: pagination.search || '',
    });
  };

  // Handle delete confirmation
  const handleConfirmDelete = async () => {
    if (!selected.row) {
      return;
    }

    try {
      const response = await deleteUser(selected.row.USER_ID);

      if (!response.success) {
        toast.error(response.error || 'Failed to delete user');
        return;
      }

      toast.success('User deleted successfully');
      confirm.onFalse();
      selected.reset();
    } catch {
      // Handle error without exposing details to user
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and view all users in the system
          </p>
        </div>
        <Button asChild>
          <Link href="/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">{usersData.totalcount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {usersData.data.filter((user) => user.ACTIVE === 'Y').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Inactive Users
            </CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {usersData.data.filter((user) => user.ACTIVE === 'N').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Admin Users</CardTitle>
            <UserCheck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">
              {
                usersData.data.filter(
                  (user) => user.LOOKUP_VALUES.toLowerCase() === 'admin'
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>
            Manage and view all users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={usersData.data}
            defaultPageSize={initialPagination.limit}
            emptyStateMessage="No users found matching your search."
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
            searchPlaceholder="Search users by name, email, or role..."
            serverPaginationInfo={{
              currentPage: usersData.currentPage,
              totalPages: usersData.totalPages,
              totalCount: usersData.totalcount,
            }}
          />
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={confirm.value}
        message={`Are you sure you want to delete "${selected.row?.NAME}"? This action cannot be undone.`}
        onClose={() => {
          confirm.onFalse();
          selected.reset();
        }}
        onDelete={handleConfirmDelete}
        title="Delete User"
      />
    </div>
  );
}
