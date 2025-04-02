'use client';

import { Toaster } from 'sonner';
import { AuthProvider } from './auth-provider';
import { ThemeProvider } from './theme-provider';
import { ErrorBoundary } from '@/components/error-boundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <ErrorBoundary>
          {children}
          <Toaster />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
} 