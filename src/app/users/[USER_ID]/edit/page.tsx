import { notFound } from 'next/navigation';
import { UsersCreateEditView } from '@/pages/users/views/users-create-edit-view';
import { getUserById } from '@/server/functions/user-functions';

interface UserEditPageProps {
  params: Promise<{ USER_ID: string }>;
}

export default async function UserEditPage({ params }: UserEditPageProps) {
  const { USER_ID } = await params;

  // Fetch user data server-side
  const userData = await getUserById(USER_ID);

  if (!userData) {
    notFound();
  }

  return <UsersCreateEditView isEdit={true} userData={userData} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: UserEditPageProps) {
  const { USER_ID } = await params;
  const userData = await getUserById(USER_ID);

  return {
    title: userData ? `Edit ${userData.NAME}` : 'Edit User',
    description: userData
      ? `Edit user information for ${userData.NAME} (${userData.USER_NAME})`
      : 'Edit user information',
  };
}
