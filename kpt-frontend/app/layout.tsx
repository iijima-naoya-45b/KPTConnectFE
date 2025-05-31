import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthenticatedHeader } from '@/components/ui/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KPT Connect',
  description: 'チーム開発を加速するKPT管理プラットフォーム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body className={inter.className}>
        <AuthenticatedHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
