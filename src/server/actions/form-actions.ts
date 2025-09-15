'use server';

import {
  type CreateFormData,
  createFormSchema,
} from '@/lib/schemas/create-form-schema';

export async function createFormSubmission(data: CreateFormData) {
  try {
    // Validate the data
    const validatedData = createFormSchema.parse(data);

    // TODO: Save to database or external API
    // Log form submission for development

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: 'Form submitted successfully!',
      data: validatedData,
    };
  } catch (error) {
    // Log error for development

    return {
      success: false,
      message: 'Failed to submit form. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
