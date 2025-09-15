import type { CreateFormData } from '@/lib/schemas/create-form-schema';

// Mock data for form submissions
const mockFormSubmissions: (CreateFormData & {
  id: string;
  createdAt: Date;
})[] = [];

export function getFormSubmissions() {
  // TODO: Replace with actual database query
  return mockFormSubmissions;
}

export function getFormSubmissionById(id: string) {
  // TODO: Replace with actual database query
  return mockFormSubmissions.find((submission) => submission.id === id);
}

export function createFormSubmissionRecord(data: CreateFormData) {
  // TODO: Replace with actual database insert
  const newSubmission = {
    ...data,
    id: `form-${Date.now()}`,
    createdAt: new Date(),
  };

  mockFormSubmissions.push(newSubmission);

  return newSubmission;
}
