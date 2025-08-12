'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type User,
  type UserCreate,
  type UserForm,
  type UserUpdate,
  userFormSchema,
} from '@/lib/schemas/user-schema';
import { paths } from '@/route/paths';
import { createUser, updateUser } from '@/server/actions/user-actions';

interface UsersCreateEditViewProps {
  userData?: User; // Present for edit, undefined for create
  isEdit?: boolean;
}

export function UsersCreateEditView({
  userData,
  isEdit = false,
}: UsersCreateEditViewProps) {
  const router = useRouter();

  // Default values based on mode
  const defaultValues: UserForm =
    isEdit && userData
      ? {
          USER_NAME: userData.USER_NAME,
          NAME: userData.NAME,
          PASSWORD: '', // Don't pre-fill password for security
          USER_ROLE: userData.USER_ROLE,
          ACTIVE: userData.ACTIVE,
          LOOKUP_VALUES: userData.LOOKUP_VALUES,
          BATCH_NAME: userData.BATCH_NAME || '',
          DEPARTMENT: userData.DEPARTMENT || '',
        }
      : {
          USER_NAME: '',
          NAME: '',
          PASSWORD: '',
          USER_ROLE: '',
          ACTIVE: 'Y',
          LOOKUP_VALUES: '',
          BATCH_NAME: '',
          DEPARTMENT: '',
        };

  const form = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
  });

  // Custom validation for password based on mode
  const validateForm = (values: UserForm): string | null => {
    if (!isEdit && (!values.PASSWORD || values.PASSWORD.length < 6)) {
      return 'Password must be at least 6 characters for new users';
    }
    if (isEdit && values.PASSWORD && values.PASSWORD.length < 6) {
      return 'Password must be at least 6 characters or empty to keep current password';
    }
    return null;
  };

  const handleEdit = async (values: UserForm, userId: string) => {
    // Filter out empty password for edit mode
    const updateData = { ...values };
    if (!updateData.PASSWORD || updateData.PASSWORD.trim() === '') {
      const { PASSWORD: _, ...dataWithoutPassword } = updateData;
      return await updateUser(
        userId,
        dataWithoutPassword as Partial<UserUpdate>
      );
    }
    return await updateUser(userId, updateData as Partial<UserUpdate>);
  };

  const handleCreate = async (values: UserForm) => {
    return await createUser(values as UserCreate);
  };

  const handleSuccess = (isEditMode: boolean, userId?: string) => {
    toast.success(`User ${isEditMode ? 'updated' : 'created'} successfully`);
    const redirectPath =
      isEditMode && userId ? paths.users.details(userId) : paths.users.root;
    router.push(redirectPath);
  };

  const handleFormSubmit = async (values: UserForm) => {
    const response = await (isEdit && userData
      ? handleEdit(values, userData.USER_ID)
      : handleCreate(values));

    if (!response.success) {
      const action = isEdit ? 'update' : 'create';
      throw new Error(response.error || `Failed to ${action} user`);
    }

    handleSuccess(isEdit, userData?.USER_ID);
  };

  const onSubmit = async (values: UserForm) => {
    const validationError = validateForm(values);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await handleFormSubmit(values);
    } catch (error) {
      const action = isEdit ? 'update' : 'create';
      const message =
        error instanceof Error ? error.message : `Failed to ${action} user`;
      toast.error(message);
    }
  };

  const pageTitle = isEdit ? 'Edit User' : 'Create New User';
  const pageDescription = isEdit
    ? 'Update user information and settings'
    : 'Add a new user to the system';
  const submitButtonText = isEdit ? 'Update User' : 'Create User';
  const backPath =
    isEdit && userData
      ? paths.users.details(userData.USER_ID)
      : paths.users.root;

  return (
    <div className="container mx-auto space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild size="sm" variant="ghost">
          <Link href={backPath}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-3xl tracking-tight">{pageTitle}</h1>
          <p className="text-muted-foreground">{pageDescription}</p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <UserIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>{pageTitle}</CardTitle>
              <CardDescription>{pageDescription}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="NAME"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The user's full display name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="USER_NAME"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email address"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Used for login and notifications
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="PASSWORD"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password {isEdit ? '' : '*'}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            isEdit
                              ? 'Leave empty to keep current password'
                              : 'Enter password'
                          }
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {isEdit
                          ? 'Leave empty to keep the current password'
                          : 'Minimum 6 characters required'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* User Role Field */}
                <FormField
                  control={form.control}
                  name="USER_ROLE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role ID *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter user role ID" {...field} />
                      </FormControl>
                      <FormDescription>
                        The role identifier for permissions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Lookup Values Field */}
                <FormField
                  control={form.control}
                  name="LOOKUP_VALUES"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Type *</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="HR">HR</SelectItem>
                          <SelectItem value="Candidate">Candidate</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The user's role classification
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Active Status Field */}
                <FormField
                  control={form.control}
                  name="ACTIVE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status *</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Y">Active</SelectItem>
                          <SelectItem value="N">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Whether the user account is active
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department Field */}
                <FormField
                  control={form.control}
                  name="DEPARTMENT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter department (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The user's department or division
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Batch Name Field */}
                <FormField
                  control={form.control}
                  name="BATCH_NAME"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batch Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter batch name (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        The training batch or group name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 border-t pt-6">
                <Button
                  onClick={() => router.push(backPath)}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {submitButtonText}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
