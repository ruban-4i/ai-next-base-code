'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  type QandA,
  type QandAForm,
  QandAFormSchema,
} from '@/lib/schemas/qanda-schema';
import { paths } from '@/route/paths';
import { createQandA, updateQandA } from '@/server/actions/qanda-actions';

interface QandACreateEditViewProps {
  qanda?: QandA;
  mode: 'create' | 'edit';
}

export function QandACreateEditView({ qanda, mode }: QandACreateEditViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Convert API data to form format if editing
  const defaultValues: QandAForm = qanda
    ? {
        TOPIC_ID: qanda.TOPIC_ID,
        QUERY: qanda.QUERY,
        QUERY_TYPE: qanda.QUERY_TYPE,
        MARKS_PER_QUERY: qanda.MARKS_PER_QUERY,
        MINUS_MARKS_PERC: qanda.MINUS_MARKS_PERC,
        active: qanda.ACTIVE === 'Y',
        multiChoice: qanda.MULTI_CHOICE === 'Y',
        LOOKUP_VALUES: qanda.LOOKUP_VALUES || '',
      }
    : {
        TOPIC_ID: '',
        QUERY: '',
        QUERY_TYPE: '',
        MARKS_PER_QUERY: 5,
        MINUS_MARKS_PERC: 0,
        active: true,
        multiChoice: false,
        LOOKUP_VALUES: '',
      };

  const form = useForm<QandAForm>({
    resolver: zodResolver(QandAFormSchema),
    defaultValues,
  });

  const handleCreateSubmit = async (data: QandAForm) => {
    const result = await createQandA(data);

    if (result.success) {
      toast.success('Q&A question created successfully');
      router.push(paths.qanda.root);
      return { success: true };
    }

    return { success: false, result };
  };

  const handleUpdateSubmit = async (data: QandAForm) => {
    if (!qanda) {
      throw new Error('No Q&A data provided for edit mode');
    }

    const result = await updateQandA(qanda.QUERY_ID, data);

    if (result.success && result.data) {
      toast.success('Q&A question updated successfully');
      router.push(paths.qanda.details(result.data.QUERY_ID));
      return { success: true };
    }

    return { success: false, result };
  };

  const onSubmit = (data: QandAForm) => {
    setSubmitError(null);
    startTransition(async () => {
      try {
        const submitResult =
          mode === 'create'
            ? await handleCreateSubmit(data)
            : await handleUpdateSubmit(data);

        if (!submitResult.success && submitResult.result) {
          handleSubmitError(submitResult.result);
        }
      } catch {
        const errorMessage = `Failed to ${mode} Q&A question`;
        setSubmitError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  const handleSubmitError = (result: {
    fieldErrors?: Record<string, string[]>;
    error?: string;
  }) => {
    if (result.fieldErrors) {
      for (const [field, errors] of Object.entries(result.fieldErrors)) {
        form.setError(field as keyof QandAForm, {
          type: 'server',
          message: errors[0],
        });
      }
    }
    setSubmitError(result.error || `Failed to ${mode} Q&A question`);
  };

  const title = mode === 'create' ? 'Create Q&A Question' : 'Edit Q&A Question';
  const submitLabel = mode === 'create' ? 'Create Question' : 'Update Question';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild size="sm" variant="outline">
          <Link
            href={
              mode === 'edit' && qanda
                ? paths.qanda.details(qanda.QUERY_ID)
                : paths.qanda.root
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
          <p className="text-muted-foreground">
            {mode === 'create'
              ? 'Create a new question for online tests'
              : 'Update the question details'}
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {submitError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Question Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Question Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="QUERY"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question *</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[120px] resize-none"
                            placeholder="Enter the question text..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Write a clear and concise question. Minimum 10
                          characters required.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="LOOKUP_VALUES"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category/Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Programming, Mathematics, Science..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Optional category or tags to help organize questions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle>Question Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="TOPIC_ID"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topic *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter topic ID..." {...field} />
                          </FormControl>
                          <FormDescription>
                            The topic this question belongs to.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="QUERY_TYPE"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Query Type *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter query type ID..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            The type/category of this question.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="MARKS_PER_QUERY"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marks per Question *</FormLabel>
                          <FormControl>
                            <Input
                              max="100"
                              min="1"
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value, 10) || 0
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Points awarded for correct answer (1-100).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="MINUS_MARKS_PERC"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Negative Marks %</FormLabel>
                          <FormControl>
                            <Input
                              max="100"
                              min="0"
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseInt(e.target.value, 10) || 0
                                )
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Percentage of marks deducted for wrong answer
                            (0-100).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status & Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Status & Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Active Status</FormLabel>
                          <FormDescription>
                            Whether this question is active and can be used in
                            tests.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="multiChoice"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Multi-Choice</FormLabel>
                          <FormDescription>
                            Whether this is a multiple choice question.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" disabled={isPending} type="submit">
                    {isPending ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        {mode === 'create' ? 'Creating...' : 'Updating...'}
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {submitLabel}
                      </>
                    )}
                  </Button>

                  <Button
                    asChild
                    className="w-full"
                    disabled={isPending}
                    type="button"
                    variant="outline"
                  >
                    <Link
                      href={
                        mode === 'edit' && qanda
                          ? paths.qanda.details(qanda.QUERY_ID)
                          : paths.qanda.root
                      }
                    >
                      Cancel
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Form Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Form Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground text-xs">
                  <p>* Required fields must be filled out</p>
                  <p>Question must be at least 10 characters long</p>
                  <p>Marks range: 1-100 points</p>
                  <p>Negative marks: 0-100% of total marks</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default QandACreateEditView;
