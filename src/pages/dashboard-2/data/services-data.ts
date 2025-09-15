export interface Service {
  id: string;
  title: string;
  description: string;
  category:
    | 'HR Services'
    | 'IT Support'
    | 'Facilities'
    | 'Finance'
    | 'Administration';
  status: 'Available' | 'Unavailable';
  icon: string;
  manager: string;
  estimatedDays: string;
  iconBgColor: string;
}

export interface ServiceStats {
  totalServices: number;
  availableServices: number;
  categories: number;
}

export const servicesData: Service[] = [
  {
    id: '1',
    title: 'Access Card request',
    description:
      'Request New access card or replacement for lost/damaged cards. includes building access...',
    category: 'HR Services',
    status: 'Available',
    icon: '🏢',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-[#ede9fa]',
  },
  {
    id: '2',
    title: 'Vehicle Request',
    description:
      'Request company vehicle for business purposes or transportation needs...',
    category: 'HR Services',
    status: 'Available',
    icon: '🚗',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-yellow-100',
  },
  {
    id: '3',
    title: 'Salary Letter',
    description:
      'Request official salary letter for bank, visa, or other official purposes...',
    category: 'HR Services',
    status: 'Available',
    icon: '💰',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-teal-100',
  },
  {
    id: '4',
    title: 'Travel Request',
    description:
      'Submit travel request for business trips, conferences, or client meetings...',
    category: 'HR Services',
    status: 'Available',
    icon: '✈️',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-indigo-100',
  },
  {
    id: '5',
    title: 'Leave Application',
    description:
      'Apply for vacation, sick leave, personal time off, or other leave types...',
    category: 'HR Services',
    status: 'Available',
    icon: '🏖️',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-[#ede9fa]',
  },
  {
    id: '6',
    title: 'HR Tickets',
    description:
      'Submit HR related tickets for policy questions, benefits, or general inquiries...',
    category: 'HR Services',
    status: 'Available',
    icon: '🎫',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-indigo-100',
  },
  {
    id: '7',
    title: 'Tastahel',
    description:
      'Access employee benefits and health insurance related services...',
    category: 'HR Services',
    status: 'Available',
    icon: '🏥',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-[#ede9fa]',
  },
  {
    id: '8',
    title: 'Vacation Rule',
    description:
      'View and manage vacation policies, accrual rules, and time-off balances...',
    category: 'HR Services',
    status: 'Available',
    icon: '📋',
    manager: 'Project Manager',
    estimatedDays: '2-3 Days',
    iconBgColor: 'bg-[#ede9fa]',
  },
  {
    id: '9',
    title: 'IT Support Ticket',
    description:
      'Submit IT support requests for hardware, software, or technical issues...',
    category: 'IT Support',
    status: 'Available',
    icon: '💻',
    manager: 'IT Manager',
    estimatedDays: '1-2 Days',
    iconBgColor: 'bg-blue-100',
  },
  {
    id: '10',
    title: 'Equipment Request',
    description:
      'Request new equipment, hardware upgrades, or office supplies...',
    category: 'Facilities',
    status: 'Available',
    icon: '🖥️',
    manager: 'Facilities Manager',
    estimatedDays: '3-5 Days',
    iconBgColor: 'bg-green-100',
  },
];

export const getServiceStats = (): ServiceStats => {
  const totalServices = servicesData.length;
  const availableServices = servicesData.filter(
    (service) => service.status === 'Available'
  ).length;
  const categories = [
    ...new Set(servicesData.map((service) => service.category)),
  ].length;

  return {
    totalServices,
    availableServices,
    categories,
  };
};

export const getServicesByCategory = (category?: string): Service[] => {
  if (!category || category === 'All') {
    return servicesData;
  }
  return servicesData.filter((service) => service.category === category);
};

export const searchServices = (query: string): Service[] => {
  if (!query.trim()) {
    return servicesData;
  }

  const searchTerm = query.toLowerCase();
  return servicesData.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm)
  );
};

export const serviceCategories = [
  'HR Services',
  'IT Support',
  'Facilities',
  'Finance',
  'Administration',
] as const;
