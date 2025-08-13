import { BooksCreateEditView } from '@/pages/books/views/books-create-edit-view';

export default function BookNewPage() {
  return <BooksCreateEditView isEdit={false} />;
}

// Generate metadata for SEO
export function generateMetadata() {
  return {
    title: 'Add New Book',
    description:
      'Add a new book to your catalog with pricing, inventory, and detailed information',
  };
}
