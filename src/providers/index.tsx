'use client';

import { Toaster } from '@/components/ui/sonner';
import { NextThemeProvider } from './next-theme-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextThemeProvider>
      {children}
      <Toaster richColors />
    </NextThemeProvider>
  );
};

export default Providers;
