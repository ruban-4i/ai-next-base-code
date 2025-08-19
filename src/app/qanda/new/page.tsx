import type { Metadata } from 'next';
import QandACreateEditView from '@/pages/qanda/views/qanda-create-edit-view';

export const metadata: Metadata = {
  title: 'Create Q&A Question | Online Test Management',
  description:
    'Create a new question for online tests. Add questions with customizable scoring and configuration.',
};

export default function QandACreatePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <QandACreateEditView mode="create" />
    </div>
  );
}
