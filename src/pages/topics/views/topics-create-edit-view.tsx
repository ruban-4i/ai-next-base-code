'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, BookOpen, Save } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  type Topics,
  type TopicsCreate,
  type TopicsForm,
  type TopicsUpdate,
  topicsFormSchema,
} from '@/lib/schemas/topics-schema';
import { paths } from '@/route/paths';
import { createTopic, updateTopic } from '@/server/actions/topics-actions';

interface TopicsCreateEditViewProps {
  initialData?: Topics; // Present for edit, undefined for create
  mode: 'create' | 'edit';
  topicId?: string; // Required for edit mode
}

export function TopicsCreateEditView({
  initialData,
  mode,
  topicId,
}: TopicsCreateEditViewProps) {
  const router = useRouter();
  const isEdit = mode === 'edit';

  // Form setup with react-hook-form and Zod validation
  const form = useForm({
    resolver: zodResolver(topicsFormSchema),
    defaultValues: {
      TOPIC_NAME: initialData?.TOPIC_NAME || '',
      STREAM: initialData?.STREAM || '',
      DESCRIPTION: initialData?.DESCRIPTION || '',
      ACTIVE: initialData?.ACTIVE || 'Y',
      confirmAction: false,
    },
  });

  // Handle field errors
  const handleFieldErrors = (fieldErrors: Record<string, string[]>) => {
    for (const [field, messages] of Object.entries(fieldErrors)) {
      form.setError(field as keyof TopicsForm, {
        message: messages?.[0] || 'Validation error',
      });
    }
  };

  // Handle update topic
  const handleUpdateTopic = async (data: TopicsForm) => {
    if (!topicId) {
      return;
    }

    const updateData: Partial<TopicsUpdate> = {
      TOPIC_NAME: data.TOPIC_NAME,
      STREAM: data.STREAM,
      DESCRIPTION: data.DESCRIPTION,
      ACTIVE: data.ACTIVE,
    };

    const result = await updateTopic(topicId, updateData);

    if (result.success) {
      toast.success('Topic updated successfully');
      router.push(paths.topics.details(topicId));
      router.refresh();
    } else if (result.fieldErrors) {
      handleFieldErrors(result.fieldErrors);
    } else {
      toast.error(result.error || 'Failed to update topic');
    }
  };

  // Handle create topic
  const handleCreateTopic = async (data: TopicsForm) => {
    const createData: TopicsCreate = {
      TOPIC_NAME: data.TOPIC_NAME,
      STREAM: data.STREAM,
      DESCRIPTION: data.DESCRIPTION,
      ACTIVE: data.ACTIVE,
    };

    const result = await createTopic(createData);

    if (result.success) {
      toast.success('Topic created successfully');
      router.push(paths.topics.root);
      router.refresh();
    } else if (result.fieldErrors) {
      handleFieldErrors(result.fieldErrors);
    } else {
      toast.error(result.error || 'Failed to create topic');
    }
  };

  // Handle form submission
  const onSubmit = async (data: TopicsForm) => {
    try {
      if (isEdit && topicId) {
        await handleUpdateTopic(data);
      } else {
        await handleCreateTopic(data);
      }
    } catch {
      // Handle error silently
      toast.error('An unexpected error occurred');
    }
  };

  // Common stream options (you can extend this or make it dynamic)
  const streamOptions = [
    'OPTIM - Full Stack Development',
    'Data Science',
    'Machine Learning',
    'Cybersecurity',
    'Cloud Computing',
    'Mobile Development',
    'DevOps',
    'UI/UX Design',
    'Test',
    'Other',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild size="sm" variant="ghost">
          <Link
            href={
              isEdit && topicId
                ? paths.topics.details(topicId)
                : paths.topics.root
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isEdit ? 'Back to Topic' : 'Back to Topics'}
          </Link>
        </Button>
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">
            {isEdit ? 'Edit Topic' : 'Create New Topic'}
          </h1>
          <p className="text-muted-foreground text-sm">
            {isEdit
              ? 'Update the topic information'
              : 'Add a new topic to the system'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Topic Information</span>
          </CardTitle>
          <CardDescription>
            {isEdit
              ? 'Modify the topic details below'
              : 'Enter the topic details below'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Topic Name */}
                <FormField
                  control={form.control}
                  name="TOPIC_NAME"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter topic name" {...field} />
                      </FormControl>
                      <FormDescription>
                        A clear and descriptive name for the topic
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Stream */}
                <FormField
                  control={form.control}
                  name="STREAM"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stream *</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a stream" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {streamOptions.map((stream) => (
                            <SelectItem key={stream} value={stream}>
                              {stream}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The academic or professional stream this topic belongs
                        to
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="DESCRIPTION"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter topic description"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of what this topic covers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="ACTIVE"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Y">Active</SelectItem>
                        <SelectItem value="N">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Whether this topic is active and available for use
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <Button
                  onClick={() => {
                    if (isEdit && topicId) {
                      router.push(paths.topics.details(topicId));
                    } else {
                      router.push(paths.topics.root);
                    }
                  }}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting
                    ? isEdit
                      ? 'Updating...'
                      : 'Creating...'
                    : isEdit
                      ? 'Update Topic'
                      : 'Create Topic'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
