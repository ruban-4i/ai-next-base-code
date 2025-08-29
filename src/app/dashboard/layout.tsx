import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Employee Information',
  description: 'Employee dashboard with personal and work details',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
