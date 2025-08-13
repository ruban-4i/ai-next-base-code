import { notFound } from 'next/navigation';
import { BookDetailsView } from '@/pages/books/views/books-details-view';
import { getBookById } from '@/server/functions/books-functions';

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ BOOK_ID: string }>;
}) {
  const { BOOK_ID } = await params;

  // Fetch book data using server function
  const bookData = await getBookById(BOOK_ID);

  // Handle book not found
  if (!bookData) {
    notFound();
  }

  return <BookDetailsView bookData={bookData} bookId={BOOK_ID} />;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ BOOK_ID: string }>;
}) {
  const { BOOK_ID } = await params;

  try {
    const bookData = await getBookById(BOOK_ID);

    return {
      title: bookData ? `${bookData.BOOK_TITLE}` : 'Book Details',
      description: bookData
        ? `${bookData.BOOK_TITLE} by ${bookData.AUTHOR} - ${bookData.DESCRIPTION.slice(0, 150)}...`
        : 'View detailed book information',
    };
  } catch {
    return {
      title: 'Book Details',
      description: 'View detailed book information',
    };
  }
}
