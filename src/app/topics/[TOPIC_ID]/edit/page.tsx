import { notFound } from 'next/navigation';
import { TopicsCreateEditView } from '@/pages/topics/views/topics-create-edit-view';
import { getTopicById } from '@/server/functions/topics-functions';

type Props = {
  params: { TOPIC_ID: string };
};

export default async function EditTopicPage({ params }: Props) {
  const topicResponse = await getTopicById(params.TOPIC_ID);

  if (!(topicResponse && topicResponse.data)) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <TopicsCreateEditView
        initialData={topicResponse.data}
        mode="edit"
        topicId={params.TOPIC_ID}
      />
    </div>
  );
}
