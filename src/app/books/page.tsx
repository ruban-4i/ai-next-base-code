import { BooksListView } from '@/pages/books/views/books-list-view';
import { getBooks } from '@/server/functions/books-functions';

interface BooksListPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
    category?: string;
    author?: string;
    active?: string;
  }>;
}

export default async function BooksListPage({
  searchParams,
}: BooksListPageProps) {
  const params = await searchParams;

  // Parse pagination parameters from URL
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const sortBy =
    (params.sortBy as
      | 'BOOK_TITLE'
      | 'AUTHOR'
      | 'CATEGORY'
      | 'PRICE'
      | 'STOCK_QUANTITY'
      | 'CREATION_DATE') || 'BOOK_TITLE';
  const sortOrder = (params.sortOrder as 'asc' | 'desc') || 'asc';
  const search = params.search || '';
  const category = params.category || '';
  const author = params.author || '';
  const active = params.active || '';

  // Fetch initial books data using server function with pagination
  const initialData = await getBooks({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    category,
    author,
    active,
  });

  return <BooksListView initialData={initialData} />;
}

// Generate metadata for SEO
export function generateMetadata() {
  return {
    title: 'Books Management',
    description: 'Manage your book inventory, catalog, and stock levels',
  };
}
