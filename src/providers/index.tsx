'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from '@/components/ui/sonner';
import { NextThemeProvider } from './next-theme-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider>
      <NuqsAdapter>
        {children}
        <Toaster richColors />
      </NuqsAdapter>
    </NextThemeProvider>
  );
};

export default Providers;
