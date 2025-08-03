import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'uisnippet',
  description: 'Collections of ui components made by smintfy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NuqsAdapter>
        <body className={cn(inter.variable, 'antialiased')}>{children}</body>
      </NuqsAdapter>
    </html>
  );
}
