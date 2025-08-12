import { getUserById } from '@/server/functions/user-functions'
import { UserDetailsView } from '@/pages/users/views/users-details-view'
import { notFound } from 'next/navigation'

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ USER_ID: string }>
}) {
  const { USER_ID } = await params

  // Fetch user data using server function
  const userData = await getUserById(USER_ID)

  // Handle user not found
  if (!userData) {
    notFound()
  }

  return <UserDetailsView userData={userData} userId={USER_ID} />
}
