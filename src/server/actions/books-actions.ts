'use server';

import { revalidatePath } from 'next/cache';
import { onlineTestApi } from '@/api/online-test-api';
import { BOOKS_PATHS } from '@/lib/api-paths';
import {
  type BookCreate,
  type BookDeleteResponse,
  type BookResponse,
  type BookUpdate,
  bookCreateSchema,
  bookDeleteResponseSchema,
  bookResponseSchema,
  bookUpdateSchema,
} from '@/lib/schemas/books-schema';
import { paths } from '@/route/paths';

/**
 * Create a new book
 */
export async function createBook(data: BookCreate): Promise<{
  success: boolean;
  data?: BookResponse;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  try {
    // Validate input data
    const validatedData = bookCreateSchema.parse(data);

    // Make API call
    const response = await onlineTestApi.post(
      BOOKS_PATHS.CREATE,
      validatedData
    );

    // Validate response
    const bookResponse = bookResponseSchema.parse(response.data);

    // Revalidate books list page
    revalidatePath(paths.books.root);

    return {
      success: true,
      data: bookResponse,
    };
  } catch (error) {
    console.error('Failed to create book:', error);

    if (error instanceof Error && (error as any).response?.data?.message) {
      return {
        success: false,
        error: (error as any).response.data.message,
      };
    }

    return {
      success: false,
      error: 'Failed to create book. Please try again.',
    };
  }
}

/**
 * Update an existing book
 */
export async function updateBook(
  bookId: string,
  data: BookUpdate
): Promise<{
  success: boolean;
  data?: BookResponse;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  try {
    // Validate input data
    const validatedData = bookUpdateSchema.parse(data);

    // Remove undefined fields
    const updateData = Object.fromEntries(
      Object.entries(validatedData).filter(([, value]) => value !== undefined)
    );

    // Make API call
    const response = await onlineTestApi.put(
      BOOKS_PATHS.UPDATE(bookId),
      updateData
    );

    // Validate response
    const bookResponse = bookResponseSchema.parse(response.data);

    // Revalidate related pages
    revalidatePath(paths.books.root);
    revalidatePath(paths.books.details(bookId));

    return {
      success: true,
      data: bookResponse,
    };
  } catch (error) {
    console.error(`Failed to update book ${bookId}:`, error);

    if (error instanceof Error && (error as any).response?.data?.message) {
      return {
        success: false,
        error: (error as any).response.data.message,
      };
    }

    return {
      success: false,
      error: 'Failed to update book. Please try again.',
    };
  }
}

/**
 * Delete a book
 */
export async function deleteBook(bookId: string): Promise<{
  success: boolean;
  data?: BookDeleteResponse;
  error?: string;
}> {
  try {
    // Make API call
    const response = await onlineTestApi.delete(BOOKS_PATHS.DELETE(bookId));

    // Validate response
    const deleteResponse = bookDeleteResponseSchema.parse(response.data);

    // Revalidate books list page
    revalidatePath(paths.books.root);

    return {
      success: true,
      data: deleteResponse,
    };
  } catch (error) {
    console.error(`Failed to delete book ${bookId}:`, error);

    if (error instanceof Error && (error as any).response?.data?.message) {
      return {
        success: false,
        error: (error as any).response.data.message,
      };
    }

    return {
      success: false,
      error: 'Failed to delete book. Please try again.',
    };
  }
}

/**
 * Toggle book active status
 */
export async function toggleBookStatus(
  bookId: string,
  currentStatus: 'Y' | 'N'
): Promise<{
  success: boolean;
  data?: BookResponse;
  error?: string;
}> {
  try {
    const newStatus = currentStatus === 'Y' ? 'N' : 'Y';

    return await updateBook(bookId, { ACTIVE: newStatus });
  } catch (error) {
    console.error(`Failed to toggle book status ${bookId}:`, error);

    return {
      success: false,
      error: 'Failed to update book status. Please try again.',
    };
  }
}

/**
 * Update book stock quantity
 */
export async function updateBookStock(
  bookId: string,
  stockQuantity: number
): Promise<{
  success: boolean;
  data?: BookResponse;
  error?: string;
}> {
  try {
    if (stockQuantity < 0) {
      return {
        success: false,
        error: 'Stock quantity cannot be negative.',
      };
    }

    return await updateBook(bookId, { STOCK_QUANTITY: stockQuantity });
  } catch (error) {
    console.error(`Failed to update book stock ${bookId}:`, error);

    return {
      success: false,
      error: 'Failed to update book stock. Please try again.',
    };
  }
}
