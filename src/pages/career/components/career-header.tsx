import Link from 'next/link';
import Image from 'next/image';

export function CareerHeader() {
  return (
    <header className="relative z-10 border-b border-[#e1e1e1] bg-white px-6 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="bg-gradient-to-b from-black to-[#25306c] bg-clip-text text-3xl font-semibold text-transparent">
            4i Career Signup
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/login"
            className="text-xl font-semibold text-[#075fbc] transition-colors hover:text-blue-700"
          >
            Sign in
          </Link>
          <div className="h-8 w-px rotate-90 bg-gray-300" />
          <Link
            href="/register"
            className="text-xl font-semibold text-[#0d0d0d] transition-colors hover:text-gray-700"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
