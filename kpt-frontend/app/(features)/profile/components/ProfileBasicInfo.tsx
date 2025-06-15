import React from 'react';
import { Button, Input, Label } from '@/components/ui';
import Image from 'next/image';
import type { UserProfile } from './types';

interface ProfileBasicInfoProps {
  profile: UserProfile;
  isEditing: boolean;
  loading: boolean;
  onInputChange: (field: keyof UserProfile, value: string | boolean) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const ProfileBasicInfo: React.FC<ProfileBasicInfoProps> = ({
  profile,
  isEditing,
  loading,
  onInputChange,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <div className='px-6 py-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-gray-900'>基本情報</h2>
        {!isEditing && <Button onClick={onEdit}>編集</Button>}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* アバター */}
        <div className='md:col-span-2'>
          <Label className='block text-sm font-medium text-gray-700 mb-2'>プロフィール画像</Label>
          <div className='flex items-center space-x-4'>
            <Image
              src={profile.avatarUrl || '/default-avatar.png'}
              alt='プロフィール画像'
              width={80}
              height={80}
              className='rounded-full'
            />
            {isEditing && (
              <Button variant='outline' size='sm'>
                画像を変更
              </Button>
            )}
          </div>
        </div>

        {/* ユーザー名 */}
        <div>
          <Label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
            ユーザー名
          </Label>
          <Input
            id='username'
            value={profile.username}
            onChange={e => onInputChange('username', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* メールアドレス */}
        <div>
          <Label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
            メールアドレス
          </Label>
          <Input
            id='email'
            type='email'
            value={profile.email}
            onChange={e => onInputChange('email', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* 自己紹介 */}
        <div className='md:col-span-2'>
          <Label htmlFor='bio' className='block text-sm font-medium text-gray-700 mb-2'>
            自己紹介
          </Label>
          <textarea
            id='bio'
            rows={3}
            value={profile.bio || ''}
            onChange={e => onInputChange('bio', e.target.value)}
            disabled={!isEditing}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 disabled:text-gray-500'
            placeholder='自己紹介を入力してください'
          />
        </div>
      </div>

      {isEditing && (
        <div className='mt-6 flex space-x-3'>
          <Button onClick={onSave} disabled={loading} className='bg-indigo-600 hover:bg-indigo-700'>
            {loading ? '保存中...' : '保存'}
          </Button>
          <Button variant='outline' onClick={onCancel} disabled={loading}>
            キャンセル
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileBasicInfo;
