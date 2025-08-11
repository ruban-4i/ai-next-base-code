export const paths = {
  users: {
    root: '/users',
    new: '/users/new',
    edit: (id: string) => `/users/${id}/edit`,
    details: (id: string) => `/users/${id}`,
  },
} as const;
