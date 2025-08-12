import { UsersCreateEditView } from '@/pages/users/views/users-create-edit-view';

export default function UserNewPage() {
  return <UsersCreateEditView isEdit={false} />;
}

// Generate metadata for SEO
export function generateMetadata() {
  return {
    title: 'Create New User',
    description:
      'Add a new user to the system with role assignment and permissions',
  };
}
