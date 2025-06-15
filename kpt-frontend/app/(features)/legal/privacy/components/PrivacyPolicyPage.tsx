'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import PrivacyPolicyContent from './PrivacyPolicyContent';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-end space-x-3 mt-6'>
          <Link href='/legal/terms'>
            <Button variant='outline'>利用規約</Button>
          </Link>
          <Link href='/dashboard'>
            <Button variant='outline'>ダッシュボードに戻る</Button>
          </Link>
        </div>
      </div>

      <PrivacyPolicyContent />
    </div>
  );
};

export default PrivacyPolicyPage;