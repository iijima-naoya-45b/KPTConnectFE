import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-indigo-600">DevReflect</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            新規登録
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
