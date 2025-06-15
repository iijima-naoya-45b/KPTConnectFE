import React from 'react';

interface LoginHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({
  title = 'ログイン',
  subtitle = 'KPT Connectにサインインしてください',
  showLogo = true,
}) => {
  return (
    <div className='text-center'>
      {showLogo && (
        <div className='flex justify-center items-center mb-6'>
          <div className='w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold text-xl'>K</span>
          </div>
          <span className='ml-3 text-2xl font-bold text-gray-900'>KPT Connect</span>
        </div>
      )}

      <h2 className='text-3xl font-extrabold text-gray-900 mb-2'>{title}</h2>

      {subtitle && <p className='text-gray-600'>{subtitle}</p>}
    </div>
  );
};

export default LoginHeader;
