import { z } from 'zod';

/**
 * Base Topics Schema - Single source of truth for field definitions
 */
const baseTopicsSchema = z.object({
  // Required fields with validation
  TOPIC_ID: z.string().min(1, 'Topic ID is required'),
  TOPIC_NAME: z
    .string()
    .min(1, 'Topic name is required')
    .max(100, 'Topic name too long'),
  STREAM: z
    .string()
    .min(1, 'Stream is required')
    .max(100, 'Stream name too long'),
  DESCRIPTION: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description too long'),
  ACTIVE: z.enum(['Y', 'N']).default('Y'),
  CREATION_DATE: z.string().datetime('Invalid date format'),
  QUERIES_COUNT: z
    .number()
    .int()
    .nonnegative('Queries count must be non-negative'),
});

/**
 * Complete Topics Schema - Full object from API
 */
export const topicsSchema = baseTopicsSchema;

/**
 * Topics Create Schema - For creating new records
 * Excludes server-generated fields (ID, timestamps, counts)
 */
export const topicsCreateSchema = baseTopicsSchema.omit({
  TOPIC_ID: true,
  CREATION_DATE: true,
  QUERIES_COUNT: true,
});

/**
 * Topics Update Schema - For updating existing records
 * All fields optional except ID
 */
export const topicsUpdateSchema = baseTopicsSchema
  .partial()
  .required({ TOPIC_ID: true });

/**
 * Topics Partial Update Schema - For PATCH operations
 * Only the fields being updated (excludes ID)
 */
export const topicsPartialUpdateSchema = baseTopicsSchema
  .omit({ TOPIC_ID: true })
  .partial();

/**
 * Topics Query Schema - For filtering and searching
 * Excludes sensitive fields, adds pagination/sorting
 */
export const topicsQuerySchema = baseTopicsSchema.partial().extend({
  // Pagination
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),

  // Sorting
  sortBy: z
    .enum(['TOPIC_NAME', 'STREAM', 'CREATION_DATE', 'QUERIES_COUNT'])
    .optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),

  // Search
  search: z.string().optional(),
});

/**
 * Topics List Response Schema - API response with pagination
 */
export const topicsListResponseSchema = z.object({
  data: z.array(topicsSchema),
  currentPage: z.number().int().positive(),
  totalPages: z.number().int().positive(),
  totalCount: z.number().int().nonnegative(),
});

/**
 * Single Topics Response Schema
 */
export const topicsResponseSchema = z.object({
  data: topicsSchema,
  message: z.string().optional(),
});

/**
 * Topics Delete Response Schema
 */
export const topicsDeleteResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  deletedId: z.string().optional(),
});

/**
 * Topics ID Params Schema - For route parameters
 */
export const topicsParamsSchema = z.object({
  TOPIC_ID: z.string().min(1, 'Topic ID is required'),
});

/**
 * Topics Form Schema - For form validation with additional rules
 */
export const topicsFormSchema = topicsCreateSchema
  .extend({
    confirmAction: z.boolean().optional(),
  })
  .refine((data) => data.TOPIC_NAME.trim().length > 0, {
    message: 'Topic name cannot be empty',
    path: ['TOPIC_NAME'],
  });

// Export TypeScript types from schemas
export type Topics = z.infer<typeof topicsSchema>;
export type TopicsCreate = z.infer<typeof topicsCreateSchema>;
export type TopicsUpdate = z.infer<typeof topicsUpdateSchema>;
export type TopicsPartialUpdate = z.infer<typeof topicsPartialUpdateSchema>;
export type TopicsQuery = z.infer<typeof topicsQuerySchema>;
export type TopicsListResponse = z.infer<typeof topicsListResponseSchema>;
export type TopicsResponse = z.infer<typeof topicsResponseSchema>;
export type TopicsDeleteResponse = z.infer<typeof topicsDeleteResponseSchema>;
export type TopicsParams = z.infer<typeof topicsParamsSchema>;
export type TopicsForm = z.infer<typeof topicsFormSchema>;
