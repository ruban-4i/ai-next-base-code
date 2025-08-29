'use client';

import { ThemeProvider } from 'next-themes';
import type * as React from 'react';

export function NextThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange={false}
      enableSystem={true}
    >
      {children}
    </ThemeProvider>
  );
}
