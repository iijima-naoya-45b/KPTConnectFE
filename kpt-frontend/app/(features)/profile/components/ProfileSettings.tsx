import React from 'react';
import { Label } from '@/components/ui';
import type { UserProfile, ProfileFieldKey } from './types';

interface ProfileSettingsProps {
  profile: UserProfile;
  onInputChange: (field: ProfileFieldKey, value: string | boolean) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onInputChange }) => {
  return (
    <div className='px-6 py-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-6'>設定</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* タイムゾーン */}
        <div>
          <Label htmlFor='timezone' className='block text-sm font-medium text-gray-700 mb-2'>
            タイムゾーン
          </Label>
          <select
            id='timezone'
            value={profile.timezone}
            onChange={e => onInputChange('timezone', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            aria-label='タイムゾーンを選択'
          >
            <option value='Asia/Tokyo'>Asia/Tokyo (JST)</option>
            <option value='America/New_York'>America/New_York (EST)</option>
            <option value='Europe/London'>Europe/London (GMT)</option>
            <option value='Asia/Shanghai'>Asia/Shanghai (CST)</option>
          </select>
        </div>

        {/* 言語 */}
        <div>
          <Label htmlFor='language' className='block text-sm font-medium text-gray-700 mb-2'>
            言語
          </Label>
          <select
            id='language'
            value={profile.language}
            onChange={e => onInputChange('language', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
            aria-label='言語を選択'
          >
            <option value='ja'>日本語</option>
            <option value='en'>English</option>
            <option value='zh'>中文</option>
          </select>
        </div>
      </div>

      {/* 通知設定 */}
      <div className='mt-8'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>通知設定</h3>
        <div className='space-y-4'>
          <div className='flex items-center'>
            <input
              id='emailNotifications'
              type='checkbox'
              checked={profile.emailNotifications}
              onChange={e => onInputChange('emailNotifications', e.target.checked)}
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              aria-label='メール通知を受け取る'
            />
            <Label htmlFor='emailNotifications' className='ml-3 text-sm text-gray-700'>
              メール通知を受け取る
            </Label>
          </div>
          <div className='flex items-center'>
            <input
              id='kptReminders'
              type='checkbox'
              checked={profile.kptReminders}
              onChange={e => onInputChange('kptReminders', e.target.checked)}
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
              aria-label='KPTリマインダーを受け取る'
            />
            <Label htmlFor='kptReminders' className='ml-3 text-sm text-gray-700'>
              KPTリマインダーを受け取る
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
