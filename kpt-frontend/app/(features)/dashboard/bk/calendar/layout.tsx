/**
 * @file layout.tsx
 * @description Layout for the calendar page
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KPT Connect | calendar',
  description: 'KPT Connect calendar. Visualize and manage your project schedule and important events.',
  openGraph: {
    title: 'KPT Connect | calendar',
    description: 'KPT Connect calendar. Visualize and manage your project schedule and important events.',
    type: 'website',
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 