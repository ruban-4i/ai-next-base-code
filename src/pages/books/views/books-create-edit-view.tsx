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
import type { Book, BookForm } from '@/lib/schemas/books-schema';
import { bookFormSchema } from '@/lib/schemas/books-schema';
import { paths } from '@/route/paths';
import { createBook, updateBook } from '@/server/actions/books-actions';

interface BooksCreateEditViewProps {
  bookData?: Book;
  bookId?: string;
  isEdit?: boolean;
}

// Common book categories for the select dropdown
const bookCategories = [
  'Programming',
  'Computer Science',
  'Artificial Intelligence',
  'Frontend Development',
  'Backend Development',
  'Database Management',
  'Cloud Technology',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'Machine Learning',
  'Software Engineering',
  'Cybersecurity',
  'DevOps',
  'UI/UX Design',
  'Business',
  'Fiction',
  'Non-Fiction',
  'Science',
  'Mathematics',
  'Other',
];

export function BooksCreateEditView({
  bookData,
  bookId,
  isEdit = false,
}: BooksCreateEditViewProps) {
  const router = useRouter();

  // Initialize form with default values
  const form = useForm<BookForm>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      BOOK_TITLE: bookData?.BOOK_TITLE || '',
      CATEGORY: bookData?.CATEGORY || '',
      DESCRIPTION: bookData?.DESCRIPTION || '',
      ACTIVE: bookData?.ACTIVE || 'Y',
      PAGES_COUNT: bookData?.PAGES_COUNT || 0,
      AUTHOR: bookData?.AUTHOR || '',
      ISBN: bookData?.ISBN || '',
      PRICE: bookData?.PRICE || 0,
      STOCK_QUANTITY: bookData?.STOCK_QUANTITY || 0,
    },
  });

  // Handle form field errors
  const handleFieldErrors = (fieldErrors: Record<string, string[]>) => {
    Object.entries(fieldErrors).forEach(([field, errors]) => {
      form.setError(field as keyof BookForm, {
        type: 'server',
        message: errors[0],
      });
    });
  };

  // Handle update operation
  const handleUpdate = async (data: BookForm) => {
    if (!bookId) return;

    const updateData = {
      BOOK_TITLE: data.BOOK_TITLE,
      CATEGORY: data.CATEGORY,
      DESCRIPTION: data.DESCRIPTION,
      ACTIVE: data.ACTIVE,
      PAGES_COUNT: data.PAGES_COUNT,
      AUTHOR: data.AUTHOR,
      ISBN: data.ISBN,
      PRICE: data.PRICE,
      STOCK_QUANTITY: data.STOCK_QUANTITY,
    };

    const result = await updateBook(bookId, updateData);

    if (result.success) {
      toast.success('Book updated successfully');
      router.push(paths.books.details(bookId));
      router.refresh();
    } else if (result.fieldErrors) {
      handleFieldErrors(result.fieldErrors);
    } else {
      toast.error(result.error || 'Failed to update book');
    }
  };

  // Handle create operation
  const handleCreate = async (data: BookForm) => {
    const createData = {
      BOOK_TITLE: data.BOOK_TITLE,
      CATEGORY: data.CATEGORY,
      DESCRIPTION: data.DESCRIPTION,
      ACTIVE: data.ACTIVE,
      PAGES_COUNT: data.PAGES_COUNT,
      AUTHOR: data.AUTHOR,
      ISBN: data.ISBN,
      PRICE: data.PRICE,
      STOCK_QUANTITY: data.STOCK_QUANTITY,
    };

    const result = await createBook(createData);

    if (result.success) {
      toast.success('Book created successfully');
      router.push(paths.books.root);
      router.refresh();
    } else if (result.fieldErrors) {
      handleFieldErrors(result.fieldErrors);
    } else {
      toast.error(result.error || 'Failed to create book');
    }
  };

  // Handle form submission
  const handleFormSubmit = async (values: BookForm) => {
    if (isEdit) {
      await handleUpdate(values);
    } else {
      await handleCreate(values);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button asChild size="sm" variant="ghost">
          <Link
            href={
              isEdit && bookId ? paths.books.details(bookId) : paths.books.root
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isEdit ? 'Back to Book' : 'Back to Books'}
          </Link>
        </Button>
        <div>
          <h1 className="font-bold text-3xl tracking-tight">
            {isEdit ? 'Edit Book' : 'Create New Book'}
          </h1>
          <p className="text-muted-foreground">
            {isEdit
              ? 'Update book information and details'
              : 'Add a new book to your catalog'}
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Book Information</span>
          </CardTitle>
          <CardDescription>
            {isEdit
              ? 'Update the book details below'
              : 'Fill in the book details to add it to your catalog'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleFormSubmit)}
            >
              {/* Basic Information */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="BOOK_TITLE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Book Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter book title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The full title of the book
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="AUTHOR"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter author name" {...field} />
                      </FormControl>
                      <FormDescription>
                        The author or authors of the book
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="CATEGORY"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bookCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The category or genre of the book
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ISBN"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ISBN</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter ISBN (10 or 13 digits)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        International Standard Book Number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="PAGES_COUNT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pages Count</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter number of pages"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Total number of pages in the book
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        Whether the book is available for sale
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
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[120px]"
                        placeholder="Enter book description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A detailed description of the book's content and key
                      features
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pricing and Inventory */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="PRICE"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          min="0"
                          placeholder="Enter price"
                          step="0.01"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>Price in USD</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="STOCK_QUANTITY"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input
                          min="0"
                          placeholder="Enter stock quantity"
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Number of books available in inventory
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-4 pt-4">
                <Button
                  onClick={() => {
                    if (isEdit && bookId) {
                      router.push(paths.books.details(bookId));
                    } else {
                      router.push(paths.books.root);
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
                      ? 'Update Book'
                      : 'Create Book'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
