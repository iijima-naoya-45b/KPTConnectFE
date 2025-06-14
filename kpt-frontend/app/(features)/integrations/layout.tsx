/**
 * @file layout.tsx
 * @description Layout for the integrations page
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPT Connect | integrations',
  description: 'KPT Connect integrations. Connect with external tools and services to enhance your workflow.',
  openGraph: {
    title: 'KPT Connect | integrations',
    description: 'KPT Connect integrations. Connect with external tools and services to enhance your workflow.',
    type: 'website',
  },
};

export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 