import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import { AuthenticatedHeader } from '@/components/ui/layout/header';
import { Footer } from '@/components/ui';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { metadata } from '@/lib/metadata';
import { Toaster } from 'sonner';
import { ToastProvider } from '@/components/toast';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='ja' className='h-full'>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} flex flex-col`}>
        <ToastProvider>
          <AuthenticatedHeader />
          <main className='flex-1 mt-[64px] min-h-[calc(100vh-116px-64px)]'>
            {children}
          </main>
          <Toaster position="bottom-right" richColors />
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}