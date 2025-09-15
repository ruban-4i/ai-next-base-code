import Image from 'next/image';
import Link from 'next/link';

export function FooterSection() {
  return (
    <footer className="px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Newsletter Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-medium text-[#1f1f1f]">
            Subscribe to our newsletter
          </h3>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="email"
                placeholder="type your email id"
                className="h-14 w-96 rounded-lg bg-[#eeeeee] px-4 text-sm font-medium text-[#a6a6a6] placeholder:text-[#a6a6a6] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Subscribe to newsletter"
              >
                <div className="flex h-6 w-6 items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L22 12L12 22L10.59 20.59L18.17 13H2V11H18.17L10.59 3.41L12 2Z"
                      fill="#666666"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-4">
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-75"
            aria-label="Follow us on Facebook"
          >
            <Image
              src="/assets/career/social/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="object-contain"
            />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-75"
            aria-label="Follow us on Twitter"
          >
            <Image
              src="/assets/career/social/twitter.svg"
              alt="Twitter"
              width={24}
              height={24}
              className="object-contain"
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-75"
            aria-label="Follow us on Instagram"
          >
            <Image
              src="/assets/career/social/instagram.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="object-contain"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
