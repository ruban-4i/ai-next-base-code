import { onlineTestApi } from '@/api/online-test-api';
import { BOOKS_PATHS, buildQueryString } from '@/lib/api-paths';
import {
  type BookListResponse,
  type BookResponse,
  bookListResponseSchema,
  bookResponseSchema,
} from '@/lib/schemas/books-schema';

/**
 * Fetch paginated list of books with optional filtering
 */
export async function getBooks(
  params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    author?: string;
    active?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}
): Promise<BookListResponse> {
  try {
    const queryString = buildQueryString(params);
    const response = await onlineTestApi.get(
      `${BOOKS_PATHS.LIST}${queryString}`
    );

    // Validate and parse the response
    const booksData = bookListResponseSchema.parse(response.data);
    return booksData;
  } catch (error) {
    console.error('Failed to fetch books:', error);
    throw new Error('Failed to fetch books');
  }
}

/**
 * Fetch a single book by ID
 */
export async function getBookById(bookId: string): Promise<BookResponse> {
  try {
    const response = await onlineTestApi.get(BOOKS_PATHS.GET_BY_ID(bookId));

    // Validate and parse the response
    const bookData = bookResponseSchema.parse(response.data);
    return bookData;
  } catch (error) {
    console.error(`Failed to fetch book ${bookId}:`, error);
    throw new Error(`Failed to fetch book with ID: ${bookId}`);
  }
}

/**
 * Get unique categories from books (for filtering)
 */
export async function getBookCategories(): Promise<string[]> {
  try {
    // This would typically be a separate endpoint, but for now we'll get all books and extract categories
    const books = await getBooks({ limit: 1000 }); // Get a large number to capture all categories
    const categories = [
      ...new Set(books.data.map((book) => book.CATEGORY)),
    ].sort();
    return categories;
  } catch (error) {
    console.error('Failed to fetch book categories:', error);
    throw new Error('Failed to fetch book categories');
  }
}

/**
 * Get unique authors from books (for filtering)
 */
export async function getBookAuthors(): Promise<string[]> {
  try {
    // This would typically be a separate endpoint, but for now we'll get all books and extract authors
    const books = await getBooks({ limit: 1000 }); // Get a large number to capture all authors
    const authors = [...new Set(books.data.map((book) => book.AUTHOR))].sort();
    return authors;
  } catch (error) {
    console.error('Failed to fetch book authors:', error);
    throw new Error('Failed to fetch book authors');
  }
}
