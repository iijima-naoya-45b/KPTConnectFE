'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

type LegalCardProps = {
  title: string;
  description: string;
  items: string[];
  href: string;
  icon: React.ReactNode;
  bgColor: string;
  buttonColor: string;
};

export default function LegalCard({
  title,
  description,
  items,
  href,
  icon,
  bgColor,
  buttonColor,
}: LegalCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className={`${bgColor} rounded-lg flex items-center justify-center w-12 h-12 mr-4`}>
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>

      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      <ul className="text-sm text-gray-500 mb-8 space-y-2">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>

      <Link href={href}>
        <Button className={`w-full ${buttonColor}`}>{title}を読む</Button>
      </Link>
    </div>
  );
}
