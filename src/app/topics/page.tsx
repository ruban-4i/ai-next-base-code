import { TopicsListView } from '@/pages/topics/views/topics-list-view';
import { getTopicsList } from '@/server/functions/topics-functions';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function TopicsPage({ searchParams }: Props) {
  const query = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 10,
    search: searchParams.search as string,
    sortBy: searchParams.sortBy as
      | 'TOPIC_NAME'
      | 'STREAM'
      | 'CREATION_DATE'
      | 'QUERIES_COUNT',
    sortOrder: (searchParams.sortOrder as 'asc' | 'desc') || 'asc',
    TOPIC_NAME: searchParams.TOPIC_NAME as string,
    STREAM: searchParams.STREAM as string,
    ACTIVE: searchParams.ACTIVE as 'Y' | 'N',
  };

  const topicsList = await getTopicsList(query);

  return <TopicsListView initialData={topicsList} />;
}
