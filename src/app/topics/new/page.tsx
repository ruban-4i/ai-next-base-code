import { TopicsCreateEditView } from '@/pages/topics/views/topics-create-edit-view';

export default function CreateTopicPage() {
  return (
    <div className="container mx-auto py-6">
      <TopicsCreateEditView mode="create" />
    </div>
  );
}
