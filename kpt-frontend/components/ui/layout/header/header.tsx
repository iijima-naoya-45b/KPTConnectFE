import Link from 'next/link';

const Header = () => {
  return (
    <header className='w-full bg-slate-100 backdrop-blur-sm shadow-sm border-b border-slate-200'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        <div className='flex items-center'>
          <Link
            href='/'
            className='text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors'
          >
            KPT Connect
          </Link>
        </div>
        <div className='flex items-center space-x-4'>
          <Link
            href='/pricing'
            className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
          >
            料金プラン
          </Link>
          <Link
            href='/reports'
            className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
          >
            詳細レポート
          </Link>
          <Link
            href='/login'
            className='text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
          >
            ログイン
          </Link>
          <Link
            href='/signup'
            className='bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium'
          >
            はじめる
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
