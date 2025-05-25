/**
 * @file index.tsx
 * @description 特徴カードコンポーネント
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={<IconComponent />}
 *   title="簡単な振り返り"
 *   description="直感的なインターフェースで、チームの振り返りを簡単に行えます。"
 * />
 * ```
 */

import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className='text-center'>
      <div className='bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
        {icon}
      </div>
      <h4 className='text-xl font-bold text-gray-900 mb-2'>{title}</h4>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};

export default FeatureCard;
