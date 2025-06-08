import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { AuthenticatedHeader } from '@/components/ui/layout/header';
import { Footer } from '@/components/ui';

const inter = Inter({ subsets: ['latin'] });

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID!

export const metadata: Metadata = {
  metadataBase: new URL('https://kpt-connect.example.com'),
  title: {
    default: 'KPT Connect',
    template: '%s | KPT Connect',
  },
  description: '個人開発を加速するKPT管理プラットフォーム',
  keywords: ['KPT', 'Keep', 'Problem', 'Try', '個人開発', '振り返り', '自己成長', '学習管理'],
  authors: [{ name: 'KPT Connect Team' }],
  creator: 'KPT Connect',
  publisher: 'KPT Connect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    siteName: 'KPT Connect',
    title: 'KPT Connect',
    description: '個人開発を加速するKPT管理プラットフォーム',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KPT Connect - 個人開発を加速するKPT管理プラットフォーム',
      },
    ],
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
    <html lang='ja'>
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
