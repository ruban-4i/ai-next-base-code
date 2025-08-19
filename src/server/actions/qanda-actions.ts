'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { onlineTestApi } from '@/api/online-test-api';
import { QANDA_PATHS } from '@/lib/api-paths';
import {
  convertToAPI,
  type QandACreate,
  QandACreateSchema,
  type QandAForm,
  type QandAResponse,
  QandAResponseSchema,
  type QandAUpdate,
  QandAUpdateSchema,
} from '@/lib/schemas/qanda-schema';
import { paths } from '@/route/paths';

/**
 * Server action to create a new Q&A question
 */
export async function createQandA(data: QandAForm): Promise<{
  success: boolean;
  data?: QandAResponse;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  try {
    // Validate form data
    const validationResult = QandACreateSchema.safeParse(convertToAPI(data));

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      validationResult.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(error.message);
      });

      return {
        success: false,
        error: 'Validation failed',
        fieldErrors,
      };
    }

    const createData = validationResult.data;

    // Make API call to create Q&A
    const response = await onlineTestApi.post(QANDA_PATHS.CREATE, createData);

    // Validate response data
    const validatedData = QandAResponseSchema.parse(response.data);

    // Revalidate the Q&A list page
    revalidatePath(paths.qanda.root);

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    console.error('Error creating Q&A:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to create Q&A question',
    };
  }
}

/**
 * Server action to update an existing Q&A question
 */
export async function updateQandA(
  qandaId: string,
  data: QandAForm
): Promise<{
  success: boolean;
  data?: QandAResponse;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}> {
  try {
    if (!qandaId || qandaId.trim() === '') {
      return {
        success: false,
        error: 'Q&A ID is required',
      };
    }

    // Convert form data to API format and add ID
    const apiData = convertToAPI(data);
    const updateData: QandAUpdate = {
      QUERY_ID: qandaId,
      ...apiData,
    };

    // Validate update data
    const validationResult = QandAUpdateSchema.safeParse(updateData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string[]> = {};
      validationResult.error.errors.forEach((error) => {
        const field = error.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(error.message);
      });

      return {
        success: false,
        error: 'Validation failed',
        fieldErrors,
      };
    }

    const validatedUpdateData = validationResult.data;

    // Make API call to update Q&A
    const response = await onlineTestApi.put(
      QANDA_PATHS.UPDATE(qandaId),
      validatedUpdateData
    );

    // Validate response data
    const validatedData = QandAResponseSchema.parse(response.data);

    // Revalidate relevant pages
    revalidatePath(paths.qanda.root);
    revalidatePath(paths.qanda.details(qandaId));

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    console.error(`Error updating Q&A with ID ${qandaId}:`, error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to update Q&A question',
    };
  }
}

/**
 * Server action to delete a Q&A question
 */
export async function deleteQandA(qandaId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!qandaId || qandaId.trim() === '') {
      return {
        success: false,
        error: 'Q&A ID is required',
      };
    }

    // Make API call to delete Q&A
    await onlineTestApi.delete(QANDA_PATHS.DELETE(qandaId));

    // Revalidate the Q&A list page
    revalidatePath(paths.qanda.root);

    return {
      success: true,
    };
  } catch (error) {
    console.error(`Error deleting Q&A with ID ${qandaId}:`, error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to delete Q&A question',
    };
  }
}

/**
 * Server action to create Q&A and redirect to list
 */
export async function createQandAAndRedirect(data: QandAForm): Promise<void> {
  const result = await createQandA(data);

  if (result.success) {
    redirect(paths.qanda.root);
  } else {
    // In a real app, you might want to handle this differently
    // For now, we'll still redirect but the error will be lost
    // Consider using a toast notification system or similar
    redirect(paths.qanda.root);
  }
}

/**
 * Server action to update Q&A and redirect to details
 */
export async function updateQandAAndRedirect(
  qandaId: string,
  data: QandAForm
): Promise<void> {
  const result = await updateQandA(qandaId, data);

  if (result.success) {
    redirect(paths.qanda.details(qandaId));
  } else {
    // In a real app, you might want to handle this differently
    redirect(paths.qanda.details(qandaId));
  }
}

/**
 * Server action to delete Q&A and redirect to list
 */
export async function deleteQandAAndRedirect(qandaId: string): Promise<void> {
  const result = await deleteQandA(qandaId);

  if (result.success) {
    redirect(paths.qanda.root);
  } else {
    // In a real app, you might want to handle this differently
    redirect(paths.qanda.root);
  }
}

/**
 * Server action to toggle Q&A active status
 */
export async function toggleQandAActive(
  qandaId: string,
  currentStatus: 'Y' | 'N'
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!qandaId || qandaId.trim() === '') {
      return {
        success: false,
        error: 'Q&A ID is required',
      };
    }

    const newStatus = currentStatus === 'Y' ? 'N' : 'Y';

    // Make API call to update only the active status
    const updateData = {
      QUERY_ID: qandaId,
      ACTIVE: newStatus,
    };

    await onlineTestApi.patch(QANDA_PATHS.UPDATE(qandaId), updateData);

    // Revalidate relevant pages
    revalidatePath(paths.qanda.root);
    revalidatePath(paths.qanda.details(qandaId));

    return {
      success: true,
    };
  } catch (error) {
    console.error(`Error toggling Q&A active status for ID ${qandaId}:`, error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to toggle Q&A status',
    };
  }
}
