/**
 * @file layout.tsx
 * @description Layout for the help page
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPT Connect | help',
  description: 'KPT Connect help center. Find answers to frequently asked questions and get support.',
  openGraph: {
    title: 'KPT Connect | help',
    description: 'KPT Connect help center. Find answers to frequently asked questions and get support.',
    type: 'website',
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 