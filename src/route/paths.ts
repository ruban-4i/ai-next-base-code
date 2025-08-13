export const paths = {
  users: {
    root: '/users',
    new: '/users/new',
    edit: (id: string) => `/users/${id}/edit`,
    details: (id: string) => `/users/${id}`,
  },
  topics: {
    root: '/topics',
    new: '/topics/new',
    edit: (id: string) => `/topics/${id}/edit`,
    details: (id: string) => `/topics/${id}`,
  },
} as const;
