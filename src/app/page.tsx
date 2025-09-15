import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { paths } from '@/route/paths';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-[#3f3f3f]">Welcome to Admin Dashboard</h1>
        <div className="flex gap-4 justify-center">
          <Link href={paths.dashboard.root}>
            <Button variant="outline">Dashboard 1</Button>
          </Link>
          <Link href={paths.dashboard2.root}>
            <Button className="bg-[#008381] hover:bg-[#007170]">Dashboard 2 (New)</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
