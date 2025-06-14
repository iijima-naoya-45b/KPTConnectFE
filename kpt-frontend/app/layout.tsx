/**
 * @file layout.tsx
 * @description Root layout for KPT Connect. Sets default metadata for the entire site.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthenticatedHeader } from '@/components/ui/layout/header';
import { Footer } from '@/components/ui';

const inter = Inter({ subsets: ['latin'] });

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!

export const metadata: Metadata = {
  title: 'KPT Connect',
  description: 'KPT Connect is a platform to manage your project progress, tasks, and team activities in one place.',
  openGraph: {
    title: 'KPT Connect',
    description: 'KPT Connect is a platform to manage your project progress, tasks, and team activities in one place.',
    type: 'website',
  },
  metadataBase: new URL('https://kpt-connect.example.com'),
  keywords: ['KPT', 'Keep', 'Problem', 'Try', '個人開発', '振り返り', '自己成長', '学習管理'],
  authors: [{ name: 'KPT Connect Team' }],
  creator: 'KPT Connect',
  publisher: 'KPT Connect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KPT Connect',
    description: '個人開発を加速するKPT管理プラットフォーム',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <AuthenticatedHeader />
        <main className='mt-[64px]'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
