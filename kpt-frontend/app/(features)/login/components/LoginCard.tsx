import OAuthButton from './OAuthButton';
import AuthHeader from './AuthHeader';
import Divider from './Divider';

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

const LoginCard = () => {
  const handleOAuthLogin = (provider: 'google' | 'github') => {
    window.location.href = `${backendBaseUrl}/api/v1/oauth/${provider}?provider=${provider}`;
  };

  return (
    <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
      <AuthHeader />
      <div className='mt-6'>
        <Divider />
        <div className='mt-6'>
          <OAuthButton
            provider='Google'
            onClick={() => handleOAuthLogin('google')}
            logoSrc='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
            alt='Google logo'
          />
          <OAuthButton
            provider='GitHub'
            onClick={() => handleOAuthLogin('github')}
            logoSrc='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            alt='GitHub logo'
          />
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
