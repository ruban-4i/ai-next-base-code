import { notFound } from 'next/navigation';
import { TopicsDetailsView } from '@/pages/topics/views/topics-details-view';
import { getTopicById } from '@/server/functions/topics-functions';

type Props = {
  params: { TOPIC_ID: string };
};

export default async function TopicDetailPage({ params }: Props) {
  const topicResponse = await getTopicById(params.TOPIC_ID);

  if (!(topicResponse && topicResponse.data)) {
    notFound();
  }

  return <TopicsDetailsView topic={topicResponse.data} />;
}
