import { z } from 'zod';

// Base QandA type matching API response
export const QandASchema = z.object({
  QUERY_ID: z.string(),
  TOPIC_ID: z.string(),
  QUERY: z.string(),
  QUERY_TYPE: z.string(),
  MARKS_PER_QUERY: z.number(),
  MINUS_MARKS_PERC: z.number(),
  ACTIVE: z.enum(['Y', 'N']),
  MULTI_CHOICE: z.enum(['Y', 'N']),
  LOOKUP_VALUES: z.string(),
});

export type QandA = z.infer<typeof QandASchema>;

// API Response types
export const QandAResponseSchema = QandASchema;
export type QandAResponse = z.infer<typeof QandAResponseSchema>;

export const QandAListResponseSchema = z.array(QandAResponseSchema);
export type QandAListResponse = z.infer<typeof QandAListResponseSchema>;

// Form types for create/update (excluding auto-generated fields)
export const QandACreateSchema = z.object({
  TOPIC_ID: z.string().min(1, 'Topic is required'),
  QUERY: z.string().min(10, 'Query must be at least 10 characters'),
  QUERY_TYPE: z.string().min(1, 'Query type is required'),
  MARKS_PER_QUERY: z
    .number()
    .min(1, 'Marks must be at least 1')
    .max(100, 'Marks cannot exceed 100'),
  MINUS_MARKS_PERC: z
    .number()
    .min(0, 'Minus marks percentage cannot be negative')
    .max(100, 'Minus marks percentage cannot exceed 100'),
  ACTIVE: z.enum(['Y', 'N']).default('Y'),
  MULTI_CHOICE: z.enum(['Y', 'N']).default('N'),
  LOOKUP_VALUES: z.string().optional().default(''),
});

export type QandACreate = z.infer<typeof QandACreateSchema>;

export const QandAUpdateSchema = QandACreateSchema.partial().extend({
  QUERY_ID: z.string(),
});

export type QandAUpdate = z.infer<typeof QandAUpdateSchema>;

// UI Helper types - converting Y/N to boolean for better UX
export const QandAUISchema = QandASchema.extend({
  active: z.boolean(),
  multiChoice: z.boolean(),
}).omit({
  ACTIVE: true,
  MULTI_CHOICE: true,
});

export type QandAUI = z.infer<typeof QandAUISchema>;

// Form schema for UI (with boolean values)
export const QandAFormSchema = z.object({
  TOPIC_ID: z.string().min(1, 'Topic is required'),
  QUERY: z.string().min(10, 'Query must be at least 10 characters'),
  QUERY_TYPE: z.string().min(1, 'Query type is required'),
  MARKS_PER_QUERY: z
    .number()
    .min(1, 'Marks must be at least 1')
    .max(100, 'Marks cannot exceed 100'),
  MINUS_MARKS_PERC: z
    .number()
    .min(0, 'Minus marks percentage cannot be negative')
    .max(100, 'Minus marks percentage cannot exceed 100'),
  active: z.boolean(),
  multiChoice: z.boolean(),
  LOOKUP_VALUES: z.string(),
});

export type QandAForm = z.infer<typeof QandAFormSchema>;

// Utility functions to convert between API and UI formats
export const convertToUI = (qanda: QandA): QandAUI => ({
  ...qanda,
  active: qanda.ACTIVE === 'Y',
  multiChoice: qanda.MULTI_CHOICE === 'Y',
});

export const convertToAPI = (qanda: QandAForm): QandACreate => ({
  ...qanda,
  ACTIVE: qanda.active ? 'Y' : 'N',
  MULTI_CHOICE: qanda.multiChoice ? 'Y' : 'N',
});

// Search/Filter types
export const QandAFilterSchema = z.object({
  search: z.string().optional(),
  queryType: z.string().optional(),
  active: z.enum(['Y', 'N', 'all']).optional(),
  multiChoice: z.enum(['Y', 'N', 'all']).optional(),
  lookupValues: z.string().optional(),
  minMarks: z.number().optional(),
  maxMarks: z.number().optional(),
});

export type QandAFilter = z.infer<typeof QandAFilterSchema>;
