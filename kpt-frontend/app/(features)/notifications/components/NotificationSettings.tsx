/**
 * @file NotificationSettings.tsx
 * @description KPTの通知設定を管理するコンポーネント
 *
 * @example
 * ```tsx
 * <NotificationSettings />
 * ```
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const NotificationSettings: React.FC = () => {
  const [emailEnabled, setEmailEnabled] = React.useState(true);
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [kptReminders, setKptReminders] = React.useState(true);
  const [scheduleUpdates, setScheduleUpdates] = React.useState(true);
  const [teamActivities, setTeamActivities] = React.useState(true);
  const [customAlerts, setCustomAlerts] = React.useState({
    before: 30,
    after: 15,
  });

  return (
    <div className='py-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-900'>通知設定</h1>
          <Link href='/dashboard' className='text-indigo-600 hover:text-indigo-900'>
            ダッシュボードに戻る
          </Link>
        </div>
        <div className='bg-white shadow rounded-lg p-6'>
          {/* メール通知設定 */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>メール通知</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <label htmlFor='email-toggle' className='text-sm font-medium text-gray-700'>
                    メール通知を有効にする
                  </label>
                  <p className='text-sm text-gray-500'>KPTの通知をメールで受け取ります</p>
                </div>
                <Button
                  type='button'
                  className={`${
                    emailEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role='switch'
                  aria-checked={emailEnabled}
                  onClick={() => setEmailEnabled(!emailEnabled)}
                >
                  <span
                    className={`${
                      emailEnabled ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        emailEnabled
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg className='h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        emailEnabled
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>
              {emailEnabled && (
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                    メールアドレス
                  </label>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    placeholder='your@email.com'
                  />
                </div>
              )}
            </div>
          </div>

          {/* プッシュ通知設定 */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>プッシュ通知</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <label htmlFor='push-toggle' className='text-sm font-medium text-gray-700'>
                    プッシュ通知を有効にする
                  </label>
                  <p className='text-sm text-gray-500'>KPTの通知をプッシュ通知で受け取ります</p>
                </div>
                <Button
                  type='button'
                  className={`${
                    pushEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role='switch'
                  aria-checked={pushEnabled}
                  onClick={() => setPushEnabled(!pushEnabled)}
                >
                  <span
                    className={`${
                      pushEnabled ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        pushEnabled
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg className='h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        pushEnabled
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* 通知タイプ設定 */}
          <div className='mb-8'>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>通知タイプ</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <label htmlFor='kpt-reminders' className='text-sm font-medium text-gray-700'>
                    KPTリマインダー
                  </label>
                  <p className='text-sm text-gray-500'>KPTの実施予定を通知します</p>
                </div>
                <Button
                  type='button'
                  className={`${
                    kptReminders ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role='switch'
                  aria-checked={kptReminders}
                  onClick={() => setKptReminders(!kptReminders)}
                >
                  <span
                    className={`${
                      kptReminders ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        kptReminders
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg className='h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        kptReminders
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label htmlFor='schedule-updates' className='text-sm font-medium text-gray-700'>
                    スケジュール更新
                  </label>
                  <p className='text-sm text-gray-500'>KPTのスケジュール変更を通知します</p>
                </div>
                <Button
                  type='button'
                  className={`${
                    scheduleUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role='switch'
                  aria-checked={scheduleUpdates}
                  onClick={() => setScheduleUpdates(!scheduleUpdates)}
                >
                  <span
                    className={`${
                      scheduleUpdates ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        scheduleUpdates
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg className='h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        scheduleUpdates
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <label htmlFor='learning-activities' className='text-sm font-medium text-gray-700'>
                    学習活動
                  </label>
                  <p className='text-sm text-gray-500'>個人の学習進捗と成果を通知します</p>
                </div>
                <Button
                  type='button'
                  className={`${
                    teamActivities ? 'bg-indigo-600' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                  role='switch'
                  aria-checked={teamActivities}
                  onClick={() => setTeamActivities(!teamActivities)}
                >
                  <span
                    className={`${
                      teamActivities ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  >
                    <span
                      className={`${
                        teamActivities
                          ? 'opacity-0 duration-100 ease-out'
                          : 'opacity-100 duration-200 ease-in'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg className='h-3 w-3 text-gray-400' fill='none' viewBox='0 0 12 12'>
                        <path
                          d='M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2'
                          stroke='currentColor'
                          strokeWidth={2}
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </span>
                    <span
                      className={`${
                        teamActivities
                          ? 'opacity-100 duration-200 ease-in'
                          : 'opacity-0 duration-100 ease-out'
                      } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                      aria-hidden='true'
                    >
                      <svg
                        className='h-3 w-3 text-indigo-600'
                        fill='currentColor'
                        viewBox='0 0 12 12'
                      >
                        <path d='M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z' />
                      </svg>
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* カスタムアラート設定 */}
          <div>
            <h2 className='text-lg font-medium text-gray-900 mb-4'>カスタムアラート</h2>
            <div className='space-y-4'>
              <div>
                <label htmlFor='before-time' className='block text-sm font-medium text-gray-700'>
                  KPT開始前の通知時間（分）
                </label>
                <input
                  type='number'
                  id='before-time'
                  value={customAlerts.before}
                  onChange={e =>
                    setCustomAlerts({
                      ...customAlerts,
                      before: parseInt(e.target.value),
                    })
                  }
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  min='0'
                  max='60'
                />
              </div>
              <div>
                <label htmlFor='after-time' className='block text-sm font-medium text-gray-700'>
                  KPT終了後の通知時間（分）
                </label>
                <input
                  type='number'
                  id='after-time'
                  value={customAlerts.after}
                  onChange={e =>
                    setCustomAlerts({
                      ...customAlerts,
                      after: parseInt(e.target.value),
                    })
                  }
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  min='0'
                  max='60'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
