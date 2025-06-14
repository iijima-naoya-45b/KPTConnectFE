/**
 * @file layout.tsx
 * @description Layout for the dashboard page
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPT Connect | dashboard',
  description: 'KPT Connect dashboard. Manage your project progress, tasks, and team activities in one place.',
  openGraph: {
    title: 'KPT Connect | dashboard',
    description: 'KPT Connect dashboard. Manage your project progress, tasks, and team activities in one place.',
    type: 'website',
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 