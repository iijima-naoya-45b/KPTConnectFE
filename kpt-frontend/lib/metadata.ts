import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'KPT Connect',
    description: 'KPT Connect is a platform to manage your project progress, tasks, and team activities in one place.',
    openGraph: {
        title: 'KPT Connect',
        description: 'KPT Connect is a platform to manage your project progress, tasks, and team activities in one place.',
        type: 'website',
    },
    icons: {
        icon: '/favicon/favicon.ico',
        shortcut: '/favicon/favicon.ico',
        apple: '/favicon/favicon.ico',
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
