import { Button } from '@/components/ui';
import Link from 'next/link';

interface DashboardHeaderProps {
  userName?: string;
  showQuickActions?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName = 'ユーザー',
  showQuickActions = true,
}) => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-6 lg:space-y-0'>
        <div>
          <h1 className='text-3xl lg:text-4xl font-bold text-gray-900'>ダッシュボード</h1>
          <p className='mt-3 text-lg text-gray-600'>おかえりなさい、{userName}さん</p>
        </div>

        {showQuickActions && (
          <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'>
            <Link href='/dashboard/kpt/new'>
              <Button className='w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 px-6 py-3'>新しいKPTを作成</Button>
            </Link>
            <Link href='/calendar'>
              <Button variant='outline' className='w-full sm:w-auto px-6 py-3'>カレンダーを見る</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
