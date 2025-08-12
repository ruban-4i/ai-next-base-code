'use server';

import { revalidatePath } from 'next/cache';
import { onlineTestApi } from '@/api/online-test-api';
import { TOPICS_PATHS } from '@/lib/api-paths';
import {
  type TopicsCreate,
  type TopicsDeleteResponse,
  type TopicsResponse,
  type TopicsUpdate,
  topicsCreateSchema,
  topicsDeleteResponseSchema,
  topicsResponseSchema,
  topicsUpdateSchema,
} from '@/lib/schemas/topics-schema';

/**
 * Server Action Result Type
 */
type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

/**
 * Create a new topic
 * Server action for topic creation with validation
 */
export async function createTopic(
  topicData: TopicsCreate
): Promise<ActionResult<TopicsResponse>> {
  try {
    // Validate input data
    const validatedData = topicsCreateSchema.parse(topicData);

    // Make API call
    const response = await onlineTestApi.post(
      TOPICS_PATHS.CREATE,
      validatedData
    );

    // Validate response
    const topicResponse = topicsResponseSchema.parse(response.data);

    // Revalidate related pages
    revalidatePath('/topics');

    return {
      success: true,
      data: topicResponse,
    };
  } catch (error) {
    console.error('Failed to create topic:', error);

    if (error instanceof Error) {
      // Handle Zod validation errors
      if (error.name === 'ZodError') {
        const zodError = error as any;
        return {
          success: false,
          error: 'Validation failed',
          fieldErrors: zodError.flatten().fieldErrors,
        };
      }

      // Handle API errors
      if ((error as any).response?.data?.message) {
        return {
          success: false,
          error: (error as any).response.data.message,
        };
      }
    }

    return {
      success: false,
      error: 'Failed to create topic. Please try again.',
    };
  }
}

/**
 * Update an existing topic
 * Server action for topic updates with validation
 */
export async function updateTopic(
  topicId: string,
  topicData: Partial<TopicsUpdate>
): Promise<ActionResult<TopicsResponse>> {
  try {
    if (!topicId || topicId.trim() === '') {
      return {
        success: false,
        error: 'Topic ID is required',
      };
    }

    // Prepare update data with ID
    const updateData = {
      TOPIC_ID: topicId,
      ...topicData,
    };

    // Validate input data
    const validatedData = topicsUpdateSchema.parse(updateData);

    // Make API call
    const response = await onlineTestApi.put(
      TOPICS_PATHS.UPDATE(topicId),
      validatedData
    );

    // Validate response
    const topicResponse = topicsResponseSchema.parse(response.data);

    // Revalidate related pages
    revalidatePath('/topics');
    revalidatePath(`/topics/${topicId}`);

    return {
      success: true,
      data: topicResponse,
    };
  } catch (error) {
    console.error(`Failed to update topic ${topicId}:`, error);

    if (error instanceof Error) {
      // Handle Zod validation errors
      if (error.name === 'ZodError') {
        const zodError = error as any;
        return {
          success: false,
          error: 'Validation failed',
          fieldErrors: zodError.flatten().fieldErrors,
        };
      }

      // Handle API errors
      if ((error as any).response?.data?.message) {
        return {
          success: false,
          error: (error as any).response.data.message,
        };
      }
    }

    return {
      success: false,
      error: 'Failed to update topic. Please try again.',
    };
  }
}

/**
 * Delete a topic
 * Server action for topic deletion
 */
export async function deleteTopic(
  topicId: string
): Promise<ActionResult<TopicsDeleteResponse>> {
  try {
    if (!topicId || topicId.trim() === '') {
      return {
        success: false,
        error: 'Topic ID is required',
      };
    }

    // Make API call
    const response = await onlineTestApi.delete(TOPICS_PATHS.DELETE(topicId));

    // Validate response
    const deleteResponse = topicsDeleteResponseSchema.parse(response.data);

    // Revalidate related pages
    revalidatePath('/topics');

    return {
      success: true,
      data: deleteResponse,
    };
  } catch (error) {
    console.error(`Failed to delete topic ${topicId}:`, error);

    if (error instanceof Error && (error as any).response?.data?.message) {
      return {
        success: false,
        error: (error as any).response.data.message,
      };
    }

    return {
      success: false,
      error: 'Failed to delete topic. Please try again.',
    };
  }
}
