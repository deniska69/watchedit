import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import LayoutHeader from '@/components/layout/Header';
import { Providers } from './providers';
import { Div } from '@/components/ui';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WatchedIt',
  description: 'Самые честные отзывы об играх, фильмах, сериалах и книгах',
};

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LayoutHeader />
          <Div className="flex min-h-[calc(100svh-var(--navbar-height))] justify-center font-sans">
            <main className="flex w-full max-w-5xl p-6 pb-0">{children}</main>
          </Div>
        </Providers>
      </body>
    </html>
  );
}
