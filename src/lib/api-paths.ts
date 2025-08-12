/**
 * API Paths Constants - Single source of truth for all API endpoints
 * Centralized path management for type-safe API calls
 */

export const API_PATHS = {
  /**
   * User-related API endpoints
   */
  USERS: {
    // List users with pagination and filtering
    LIST: '/users',
    
    // Get single user by ID
    GET_BY_ID: (userId: string) => `/users/${userId}`,
    
    // Create new user
    CREATE: '/users',
    
    // Update existing user
    UPDATE: (userId: string) => `/users/${userId}`,
    
    // Delete user
    DELETE: (userId: string) => `/users/${userId}`,
    
    // Batch operations
    BATCH_DELETE: '/users/batch-delete',
    BATCH_UPDATE: '/users/batch-update',
  },

  /**
   * Authentication endpoints (for future use)
   */
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },

  /**
   * Role management endpoints (for future use)
   */
  ROLES: {
    LIST: '/roles',
    GET_BY_ID: (roleId: string) => `/roles/${roleId}`,
    CREATE: '/roles',
    UPDATE: (roleId: string) => `/roles/${roleId}`,
    DELETE: (roleId: string) => `/roles/${roleId}`,
  },

  /**
   * Department endpoints (for future use)
   */
  DEPARTMENTS: {
    LIST: '/departments',
    GET_BY_ID: (deptId: string) => `/departments/${deptId}`,
    CREATE: '/departments',
    UPDATE: (deptId: string) => `/departments/${deptId}`,
    DELETE: (deptId: string) => `/departments/${deptId}`,
  },
} as const

/**
 * Helper function to build query string from parameters
 */
export const buildQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * Type-safe URL builder for dynamic paths
 */
export type ApiPathBuilder = {
  [K in keyof typeof API_PATHS]: typeof API_PATHS[K]
}

// Export individual path groups for convenience
export const USER_PATHS = API_PATHS.USERS
export const AUTH_PATHS = API_PATHS.AUTH
export const ROLE_PATHS = API_PATHS.ROLES
export const DEPARTMENT_PATHS = API_PATHS.DEPARTMENTS
