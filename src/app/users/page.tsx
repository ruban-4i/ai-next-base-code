import { getUsersList } from '@/server/functions/user-functions'
import { UsersListView } from '@/pages/users/views/users-list-view'

interface UsersListPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: string
    search?: string
  }>
}

export default async function UsersListPage({ searchParams }: UsersListPageProps) {
  const params = await searchParams
  
  // Parse pagination parameters from URL
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 10
  const sortBy = (params.sortBy as 'USER_NAME' | 'NAME' | 'USER_ROLE' | 'ACTIVE') || 'NAME'
  const sortOrder = (params.sortOrder as 'asc' | 'desc') || 'asc'
  const search = params.search || ''

  // Fetch initial users data using server function with pagination
  const initialData = await getUsersList({
    page,
    limit,
    sortBy,
    sortOrder,
    search,
  })

  return (
    <UsersListView 
      usersData={initialData} 
      initialPagination={{
        page,
        limit,
        sortBy,
        sortOrder,
        search,
      }}
    />
  )
}
