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
  books: {
    root: '/books',
    new: '/books/new',
    edit: (id: string) => `/books/${id}/edit`,
    details: (id: string) => `/books/${id}`,
  },
  qanda: {
    root: '/qanda',
    new: '/qanda/new',
    edit: (id: string) => `/qanda/${id}/edit`,
    details: (id: string) => `/qanda/${id}`,
  },
  figmaExample: {
    payrollSlip: '/figma-example/payroll-slip',
  },
  dashboard: {
    root: '/dashboard',
  },
  dashboard2: {
    root: '/dashboard-2',
    services: '/dashboard-2/services',
    createForm: '/dashboard-2/create-form',
  },
  login: {
    root: '/login',
  },
  career: {
    root: '/career',
  },
} as const;
