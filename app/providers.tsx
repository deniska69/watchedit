'use client';
import { HeroUIProvider } from '@heroui/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ToastProvider } from '@heroui/toast';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ToastProvider />
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
