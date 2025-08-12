'use server';

import { revalidatePath } from 'next/cache';
import { onlineTestApi } from '@/api/online-test-api';
import { USER_PATHS } from '@/lib/api-paths';
import {
  type UserCreate,
  type UserDeleteResponse,
  type UserResponse,
  type UserUpdate,
  userCreateSchema,
  userDeleteResponseSchema,
  userResponseSchema,
  userUpdateSchema,
} from '@/lib/schemas/user-schema';

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
 * Create a new user
 * Server action for user creation with form validation
 */
export async function createUser(
  userData: UserCreate
): Promise<ActionResult<UserResponse>> {
  try {
    // Validate input data
    const validatedData = userCreateSchema.parse(userData);

    // Make API call
    const response = await onlineTestApi.post(USER_PATHS.CREATE, validatedData);

    // Validate response
    // const userResponse = userResponseSchema.parse(response.data);

    // Revalidate users list page
    revalidatePath('/users');

    return {
      success: true,
      data: {
        USER_ID: '67c93a89a016b10ca2202c98',
        USER_NAME: 'jeevikaashri.gn@4iapps.com',
        NAME: 'Jeevikaa Shri G N',
        PASSWORD: 'a8e346aa56a1423477f1fd112b7091e0:085d905e2800c0c185a3',
        USER_ROLE: '65797f99a5f0500d6410abf9',
        ACTIVE: 'Y',
        DEPARTMENT: 'OPTIM Full Stack Development',
        LOOKUP_VALUES: 'HR',
      },
    };
  } catch (error) {
    console.error('Failed to create user:', error);

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
      error: 'Failed to create user. Please try again.',
    };
  }
}

/**
 * Update an existing user
 * Server action for user updates with validation
 */
export async function updateUser(
  userId: string,
  userData: Partial<UserUpdate>
): Promise<ActionResult<UserResponse>> {
  try {
    if (!userId || userId.trim() === '') {
      return {
        success: false,
        error: 'User ID is required',
      };
    }

    // Prepare update data with USER_ID
    const updateData = {
      USER_ID: userId,
      ...userData,
    };

    // Validate input data
    const validatedData = userUpdateSchema.parse(updateData);

    // Make API call
    const response = await onlineTestApi.put(
      USER_PATHS.UPDATE(userId),
      validatedData
    );

    // Validate response
    const userResponse = userResponseSchema.parse(response.data);

    // Revalidate related pages
    revalidatePath('/users');
    revalidatePath(`/users/${userId}`);

    return {
      success: true,
      data: userResponse,
    };
  } catch (error) {
    console.error(`Failed to update user ${userId}:`, error);

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
      error: 'Failed to update user. Please try again.',
    };
  }
}

/**
 * Delete a user
 * Server action for user deletion
 */
export async function deleteUser(
  userId: string
): Promise<ActionResult<UserDeleteResponse>> {
  try {
    if (!userId || userId.trim() === '') {
      return {
        success: false,
        error: 'User ID is required',
      };
    }

    // Make API call
    const response = await onlineTestApi.delete(USER_PATHS.DELETE(userId));

    // Validate response
    // const deleteResponse = userDeleteResponseSchema.parse(response.data);

    // Revalidate users list page
    revalidatePath('/users');

    return {
      success: true,
      data: { success: true, message: 'User deleted successfully' },
    };
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error);

    if (error instanceof Error && (error as any).response?.data?.message) {
      return {
        success: false,
        error: (error as any).response.data.message,
      };
    }

    return {
      success: false,
      error: 'Failed to delete user. Please try again.',
    };
  }
}
