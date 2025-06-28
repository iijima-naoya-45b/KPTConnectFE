import React from 'react';
import Link from 'next/link';

interface HeaderBarProps {
  title: string;
  cancelHref: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, cancelHref }) => (
  <header className='bg-white shadow-md border-b border-gray-200'>
    <div className='max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-6'>
      <div className='flex justify-between items-center'>
        <div className='bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200'>
          <h1 className='text-2xl font-bold text-indigo-900'>{title}</h1>
        </div>
        <Link 
          href={cancelHref} 
          className='bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md transition-colors duration-200 font-medium border border-gray-300'
        >
          キャンセル
        </Link>
      </div>
    </div>
  </header>
);

export default HeaderBar; 