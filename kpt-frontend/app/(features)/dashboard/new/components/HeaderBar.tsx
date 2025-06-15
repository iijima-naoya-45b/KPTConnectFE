import React from 'react';
import Link from 'next/link';

interface HeaderBarProps {
  title: string;
  cancelHref: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, cancelHref }) => (
  <header className='bg-white shadow'>
    <div className='max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
        <Link href={cancelHref} className='text-gray-600 hover:text-gray-900'>キャンセル</Link>
      </div>
    </div>
  </header>
);

export default HeaderBar; 