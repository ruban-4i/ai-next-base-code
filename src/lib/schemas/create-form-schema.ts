import { z } from 'zod';

export const createFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  services: z.string().min(1, 'Service selection is required'),
  serviceTitle: z.string().min(1, 'Service title is required'),
  taskDescription: z.string().optional(),
});

export type CreateFormData = z.infer<typeof createFormSchema>;
