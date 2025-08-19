import { onlineTestApi } from '@/api/online-test-api';
import { QANDA_PATHS } from '@/lib/api-paths';
import {
  type QandAFilter,
  type QandAListResponse,
  QandAListResponseSchema,
  type QandAResponse,
  QandAResponseSchema,
} from '@/lib/schemas/qanda-schema';

/**
 * Server function to fetch all Q&A questions
 * No pagination required as per requirements
 */
export async function getQandAList(filters?: QandAFilter): Promise<{
  success: boolean;
  data?: QandAListResponse;
  error?: string;
}> {
  try {
    // Build query parameters for filtering
    const params = new URLSearchParams();

    if (filters?.search) {
      params.append('search', filters.search);
    }
    if (filters?.queryType) {
      params.append('queryType', filters.queryType);
    }
    if (filters?.active && filters.active !== 'all') {
      params.append('active', filters.active);
    }
    if (filters?.multiChoice && filters.multiChoice !== 'all') {
      params.append('multiChoice', filters.multiChoice);
    }
    if (filters?.lookupValues) {
      params.append('lookupValues', filters.lookupValues);
    }
    if (filters?.minMarks) {
      params.append('minMarks', filters.minMarks.toString());
    }
    if (filters?.maxMarks) {
      params.append('maxMarks', filters.maxMarks.toString());
    }

    const queryString = params.toString();
    const url = queryString
      ? `${QANDA_PATHS.GET_ALL}?${queryString}`
      : QANDA_PATHS.GET_ALL;

    const response = await onlineTestApi.get(url);

    // Validate response data
    const validatedData = QandAListResponseSchema.parse(response.data);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    console.error('Error fetching Q&A list:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch Q&A questions',
    };
  }
}

/**
 * Server function to fetch a single Q&A question by ID
 */
export async function getQandAById(id: string): Promise<{
  success: boolean;
  data?: QandAResponse;
  error?: string;
}> {
  try {
    if (!id || id.trim() === '') {
      return {
        success: false,
        error: 'Q&A ID is required',
      };
    }

    const response = await onlineTestApi.get(QANDA_PATHS.GET_BY_ID(id));

    // Validate response data
    const validatedData = QandAResponseSchema.parse(response.data);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    console.error(`Error fetching Q&A with ID ${id}:`, error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch Q&A question',
    };
  }
}

/**
 * Server function to search Q&A questions by query text
 * Optimized for card view display
 */
export async function searchQandA(
  searchTerm: string,
  additionalFilters?: Omit<QandAFilter, 'search'>
): Promise<{
  success: boolean;
  data?: QandAListResponse;
  error?: string;
}> {
  try {
    if (!searchTerm || searchTerm.trim() === '') {
      // If no search term, return all questions with filters
      return getQandAList(additionalFilters);
    }

    const filters: QandAFilter = {
      search: searchTerm.trim(),
      ...additionalFilters,
    };

    return getQandAList(filters);
  } catch (error) {
    console.error('Error searching Q&A questions:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to search Q&A questions',
    };
  }
}

/**
 * Server function to get Q&A questions filtered by topic
 * Useful for related questions display
 */
export async function getQandAByTopic(topicId: string): Promise<{
  success: boolean;
  data?: QandAListResponse;
  error?: string;
}> {
  try {
    if (!topicId || topicId.trim() === '') {
      return {
        success: false,
        error: 'Topic ID is required',
      };
    }

    // Build query with topic filter
    const params = new URLSearchParams();
    params.append('topicId', topicId);

    const url = `${QANDA_PATHS.GET_ALL}?${params.toString()}`;
    const response = await onlineTestApi.get(url);

    // Validate response data
    const validatedData = QandAListResponseSchema.parse(response.data);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    console.error(`Error fetching Q&A for topic ${topicId}:`, error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch Q&A questions for topic',
    };
  }
}

/**
 * Server function to get Q&A questions by query type
 * Useful for filtering by question categories
 */
export async function getQandAByQueryType(queryType: string): Promise<{
  success: boolean;
  data?: QandAListResponse;
  error?: string;
}> {
  try {
    if (!queryType || queryType.trim() === '') {
      return {
        success: false,
        error: 'Query type is required',
      };
    }

    const filters: QandAFilter = {
      queryType,
    };

    return getQandAList(filters);
  } catch (error) {
    console.error(`Error fetching Q&A for query type ${queryType}:`, error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to fetch Q&A questions by type',
    };
  }
}
