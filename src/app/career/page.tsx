import type { Metadata } from 'next';
import { CareerView } from '@/pages/career/views/career-view';

export const metadata: Metadata = {
  title: '4i Career Signup - Join Our Team',
  description: 'Join our dynamic team at 4i Apps. We\'re not just building careers, we\'re building a community. Explore career opportunities across our global locations.',
  keywords: ['4i apps careers', 'job opportunities', 'career growth', 'technology jobs', 'global opportunities'],
};

export default function CareerPage() {
  return <CareerView />;
}
