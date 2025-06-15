'use client';

import { Button } from '@/components/ui';
import Image from 'next/image';

type OAuthButtonProps = {
  provider: string;
  onClick: () => void;
  logoSrc: string;
  alt: string;
};

const OAuthButton = ({ provider, onClick, logoSrc, alt }: OAuthButtonProps) => (
  <Button
    onClick={onClick}
    className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-3'
  >
    <Image className='h-5 w-5 mr-2' src={logoSrc} alt={alt} width={20} height={20} />
    {provider}でログイン・新規登録
  </Button>
);

export default OAuthButton;
