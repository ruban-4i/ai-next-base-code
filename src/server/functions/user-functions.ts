import { onlineTestApi } from '@/api/online-test-api'
import { USER_PATHS, buildQueryString } from '@/lib/api-paths'
import {
  userListResponseSchema,
  userResponseSchema,
  type UserQuery,
  type UserListResponse,
  type UserResponse,
} from '@/lib/schemas/user-schema'

/**
 * Get paginated list of users with filtering and sorting
 * Server function for data fetching in RSC and ISR
 */
export async function getUsersList(query: UserQuery): Promise<UserListResponse> {
  try {
    const queryString = buildQueryString({
      page: query.page,
      limit: query.limit,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      search: query.search,
      USER_NAME: query.USER_NAME,
      NAME: query.NAME,
      USER_ROLE: query.USER_ROLE,
      ACTIVE: query.ACTIVE,
      LOOKUP_VALUES: query.LOOKUP_VALUES,
      BATCH_NAME: query.BATCH_NAME,
      DEPARTMENT: query.DEPARTMENT,
    })

    const url = `${USER_PATHS.LIST}${queryString}`
    const response = await onlineTestApi.get(url)

    // Validate response structure
    const validatedResponse = userListResponseSchema.parse(response.data)
    
    return validatedResponse
  } catch (error) {
    console.error('Failed to fetch users list:', error)
    
    // Return empty result on error
    return {
      data: [],
      currentPage: query.page || 1,
      totalPages: 0,
      totalcount: 0,
    }
  }
}

/**
 * Get single user by ID
 * Server function for individual user data fetching
 */
export async function getUserById(userId: string): Promise<UserResponse | null> {
  try {
    if (!userId || userId.trim() === '') {
      throw new Error('User ID is required')
    }

    const url = USER_PATHS.GET_BY_ID(userId)
    const response = await onlineTestApi.get(url)

    // Validate response structure
    const validatedResponse = userResponseSchema.parse(response.data)
    
    return validatedResponse
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error)
    return null
  }
}
