import React from 'react';
import Image from 'next/image';
import type { SocialProvider } from './types';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className='w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
    >
      <Image
        className='h-5 w-5 mr-2'
        src={provider.iconUrl}
        alt={`${provider.displayName} logo`}
        width={20}
        height={20}
      />
      {loading ? `${provider.displayName}でログイン中...` : `${provider.displayName}でログイン`}
    </button>
  );
};

// Google用のプリセット
export const GoogleLoginButton: React.FC<{
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}> = ({ onClick, loading, disabled }) => {
  const googleProvider: SocialProvider = {
    name: 'google',
    displayName: 'Google',
    iconUrl: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
    loginUrl: 'http://localhost:3001/api/v1/oauth/google?provider=google',
  };

  return (
    <SocialLoginButton
      provider={googleProvider}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    />
  );
};

// GitHub用のプリセット  
export const GitHubLoginButton: React.FC<{
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}> = ({ onClick, loading, disabled }) => {
  const githubProvider: SocialProvider = {
    name: 'github',
    displayName: 'GitHub',
    iconUrl: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    loginUrl: 'http://localhost:3001/api/v1/oauth/github?provider=github',
  };

  return (
    <SocialLoginButton
      provider={githubProvider}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
    />
  );
};

export default SocialLoginButton;
