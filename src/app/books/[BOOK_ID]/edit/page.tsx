import { notFound } from 'next/navigation';
import { BooksCreateEditView } from '@/pages/books/views/books-create-edit-view';
import { getBookById } from '@/server/functions/books-functions';

interface BookEditPageProps {
  params: Promise<{ BOOK_ID: string }>;
}

export default async function BookEditPage({ params }: BookEditPageProps) {
  const { BOOK_ID } = await params;

  // Fetch book data server-side
  const bookData = await getBookById(BOOK_ID);

  if (!bookData) {
    notFound();
  }

  return (
    <BooksCreateEditView bookData={bookData} bookId={BOOK_ID} isEdit={true} />
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BookEditPageProps) {
  const { BOOK_ID } = await params;

  try {
    const bookData = await getBookById(BOOK_ID);

    return {
      title: bookData ? `Edit ${bookData.BOOK_TITLE}` : 'Edit Book',
      description: bookData
        ? `Edit book information for ${bookData.BOOK_TITLE} by ${bookData.AUTHOR}`
        : 'Edit book information',
    };
  } catch {
    return {
      title: 'Edit Book',
      description: 'Edit book information',
    };
  }
}
