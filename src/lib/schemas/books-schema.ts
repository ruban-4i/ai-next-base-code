import { z } from 'zod';

// Base Book type matching API response
export const bookSchema = z.object({
  BOOK_ID: z.string(),
  BOOK_TITLE: z.string(),
  CATEGORY: z.string(),
  DESCRIPTION: z.string(),
  ACTIVE: z.enum(['Y', 'N']),
  CREATION_DATE: z.string(),
  PAGES_COUNT: z.number(),
  AUTHOR: z.string(),
  ISBN: z.string(),
  PRICE: z.number(),
  STOCK_QUANTITY: z.number(),
});

export type Book = z.infer<typeof bookSchema>;

// API Response type
export const bookResponseSchema = bookSchema;
export type BookResponse = z.infer<typeof bookResponseSchema>;

// List response with pagination
export const bookListResponseSchema = z.object({
  data: z.array(bookSchema),
  currentPage: z.number(),
  totalPages: z.number(),
  totalCount: z.number(),
});

export type BookListResponse = z.infer<typeof bookListResponseSchema>;

// Create book type (without BOOK_ID and CREATION_DATE)
export const bookCreateSchema = z.object({
  BOOK_TITLE: z.string().min(1, 'Book title is required'),
  CATEGORY: z.string().min(1, 'Category is required'),
  DESCRIPTION: z.string().min(1, 'Description is required'),
  ACTIVE: z.enum(['Y', 'N']).default('Y'),
  PAGES_COUNT: z.number().min(1, 'Pages count must be at least 1'),
  AUTHOR: z.string().min(1, 'Author is required'),
  ISBN: z.string().min(1, 'ISBN is required'),
  PRICE: z.number().min(0, 'Price must be non-negative'),
  STOCK_QUANTITY: z.number().min(0, 'Stock quantity must be non-negative'),
});

export type BookCreate = z.infer<typeof bookCreateSchema>;

// Update book type (same as create but all fields optional except ID)
export const bookUpdateSchema = z.object({
  BOOK_TITLE: z.string().min(1, 'Book title is required').optional(),
  CATEGORY: z.string().min(1, 'Category is required').optional(),
  DESCRIPTION: z.string().min(1, 'Description is required').optional(),
  ACTIVE: z.enum(['Y', 'N']).optional(),
  PAGES_COUNT: z.number().min(1, 'Pages count must be at least 1').optional(),
  AUTHOR: z.string().min(1, 'Author is required').optional(),
  ISBN: z.string().min(1, 'ISBN is required').optional(),
  PRICE: z.number().min(0, 'Price must be non-negative').optional(),
  STOCK_QUANTITY: z
    .number()
    .min(0, 'Stock quantity must be non-negative')
    .optional(),
});

export type BookUpdate = z.infer<typeof bookUpdateSchema>;

// Form schema for create/edit forms
export const bookFormSchema = z.object({
  BOOK_TITLE: z.string().min(1, 'Book title is required'),
  CATEGORY: z.string().min(1, 'Category is required'),
  DESCRIPTION: z.string().min(1, 'Description is required'),
  ACTIVE: z.enum(['Y', 'N']).default('Y'),
  PAGES_COUNT: z.coerce.number().min(1, 'Pages count must be at least 1'),
  AUTHOR: z.string().min(1, 'Author is required'),
  ISBN: z
    .string()
    .min(1, 'ISBN is required')
    .regex(/^(?:\d{13}|\d{10})$/, 'ISBN must be 10 or 13 digits'),
  PRICE: z.coerce.number().min(0, 'Price must be non-negative'),
  STOCK_QUANTITY: z.coerce
    .number()
    .min(0, 'Stock quantity must be non-negative'),
});

export type BookForm = z.infer<typeof bookFormSchema>;

// Delete response type
export const bookDeleteResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export type BookDeleteResponse = z.infer<typeof bookDeleteResponseSchema>;
