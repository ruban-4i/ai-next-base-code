'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // biome-ignore lint/suspicious/noConsole: <log error>
  console.error('unhandled next.js server error', error);

  return (
    <html lang="en">
      <body>
        <div className="flex h-dvh w-full flex-col items-center justify-center">
          <p className="mb-3 text-3xl">Something went wrong!</p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
}
