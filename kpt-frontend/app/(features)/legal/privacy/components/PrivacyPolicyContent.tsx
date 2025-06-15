// components/legal/PrivacyPolicyContent.tsx
import React from 'react';
import Link from 'next/link';

const PrivacyPolicyContent = () => {
  return (
    <div className='bg-gray-50 pt-16'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>プライバシーポリシー</h1>
              <p className='mt-2 text-gray-600'>個人情報の取り扱いについて</p>
            </div>
          </div>

          <div className='bg-white shadow rounded-lg p-8'>
            <div className='prose max-w-none'>
              <p className='text-sm text-gray-500 mb-6'>最終更新日: 2024年3月15日</p>

              {/* ...（中略: 内容はそのまま） */}

              <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                <p className='font-medium'>KPT Connect サポートチーム</p>
                <p>メール: privacy@kptconnect.com</p>
                <p>
                  お問い合わせフォーム: 
                  <Link href='/contact' className='text-indigo-600 hover:text-indigo-700 ml-1'>
                    こちら
                  </Link>
                </p>
              </div>

              <div className='border-t pt-6 mt-8'>
                <p className='text-sm text-gray-500'>
                  本プライバシーポリシーは、2024年3月15日に最終更新されました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
