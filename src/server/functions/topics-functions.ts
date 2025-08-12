import { onlineTestApi } from '@/api/online-test-api';
import { buildQueryString, TOPICS_PATHS } from '@/lib/api-paths';
import {
  type TopicsListResponse,
  type TopicsQuery,
  type TopicsResponse,
  topicsListResponseSchema,
  topicsResponseSchema,
} from '@/lib/schemas/topics-schema';

/**
 * Get paginated list of topics with filtering and sorting
 * Server function for data fetching in RSC and ISR
 */
export async function getTopicsList(
  query: TopicsQuery
): Promise<TopicsListResponse> {
  try {
    const queryString = buildQueryString({
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      TOPIC_NAME: query.TOPIC_NAME,
      STREAM: query.STREAM,
      ACTIVE: query.ACTIVE,
    });

    const url = `${TOPICS_PATHS.LIST}${queryString}`;
    const response = await onlineTestApi.get(url);

    // Validate response structure
    const validatedResponse = topicsListResponseSchema.parse(response.data);

    return validatedResponse;
  } catch (error) {
    console.error('Failed to fetch topics list:', error);

    // Return empty result on error
    return {
      data: [],
      currentPage: query.page || 1,
      totalPages: 0,
      totalCount: 0,
    };
  }
}

/**
 * Get single topic by ID
 * Server function for individual topic data fetching
 */
export async function getTopicById(
  topicId: string
): Promise<TopicsResponse | null> {
  try {
    if (!topicId || topicId.trim() === '') {
      throw new Error('Topic ID is required');
    }

    const url = TOPICS_PATHS.GET_BY_ID(topicId);
    const response = await onlineTestApi.get(url);

    // Validate response structure
    const validatedResponse = topicsResponseSchema.parse(response.data);

    return validatedResponse;
  } catch (error) {
    console.error(`Failed to fetch topic ${topicId}:`, error);
    return null;
  }
}
