/**
 * @file page.tsx
 * @description プライバシーポリシーページ
 *
 * ユーザーの個人情報の取り扱いに関するポリシーを表示します。
 * KPTアプリケーションで収集・利用・管理される個人情報について詳細に説明します。
 *
 * @example
 * ```tsx
 * // /legal/privacy でアクセス可能
 * ```
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className='  bg-gray-50 pt-16'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>プライバシーポリシー</h1>
              <p className='mt-2 text-gray-600'>個人情報の取り扱いについて</p>
            </div>
            <div className='flex space-x-3'>
              <Link href='/legal/terms'>
                <Button variant='outline'>利用規約</Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline'>ダッシュボードに戻る</Button>
              </Link>
            </div>
          </div>

          <div className='bg-white shadow rounded-lg p-8'>
            <div className='prose max-w-none'>
              <p className='text-sm text-gray-500 mb-6'>最終更新日: 2024年3月15日</p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. はじめに</h2>
              <p className='mb-6'>
                KPT Connect（以下「当サービス」）は、ユーザーの皆様の個人情報保護を重要な責務として考えています。
                本プライバシーポリシーは、当サービスがどのような個人情報を収集し、どのように利用・管理するかについて説明します。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. 収集する情報</h2>
              <p className='mb-4'>当サービスは、以下の情報を収集する場合があります：</p>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>2.1 アカウント情報</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>Googleアカウントから提供される基本情報（メールアドレス、氏名、プロフィール画像）</li>
                <li>ユーザーが設定するプロフィール情報（自己紹介、設定など）</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>2.2 利用データ</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>KPT（Keep, Problem, Try）の記録内容</li>
                <li>振り返りセッションの履歴</li>
                <li>アプリケーションの利用履歴・操作ログ</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>2.3 技術情報</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>IPアドレス、ブラウザ情報</li>
                <li>デバイス情報（OS、画面サイズなど）</li>
                <li>アクセスログ、エラーログ</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. 情報の利用目的</h2>
              <p className='mb-4'>収集した情報は、以下の目的で利用されます：</p>
              <ul className='list-disc pl-6 mb-6'>
                <li>KPTサービスの提供・運営</li>
                <li>ユーザーアカウントの管理・認証</li>
                <li>ユーザーサポートの提供</li>
                <li>サービスの改善・新機能の開発</li>
                <li>セキュリティの確保・不正利用の防止</li>
                <li>法的義務の履行</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. 情報の管理・保護</h2>
              <p className='mb-4'>当サービスは、収集した個人情報の適切な管理・保護に努めます：</p>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>4.1 セキュリティ対策</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>データの暗号化（通信時・保存時）</li>
                <li>アクセス制限・権限管理の実施</li>
                <li>定期的なセキュリティ監査・脆弱性検査</li>
                <li>セキュリティインシデントへの対応体制</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>4.2 データ保存</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>必要最小限の期間での保存</li>
                <li>安全なクラウドインフラストラクチャの利用</li>
                <li>定期的なバックアップとデータ整合性の確認</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. 情報の共有・提供</h2>
              <p className='mb-4'>以下の場合を除き、個人情報を第三者に提供することはありません：</p>
              <ul className='list-disc pl-6 mb-6'>
                <li>ユーザーの明示的な同意がある場合</li>
                <li>法令に基づく開示義務がある場合</li>
                <li>生命、身体または財産の保護のために必要な場合</li>
                <li>サービス提供に必要な業務委託先への提供（適切な契約に基づく）</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. ユーザーの権利</h2>
              <p className='mb-4'>ユーザーは以下の権利を有します：</p>
              <ul className='list-disc pl-6 mb-6'>
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・削除請求</li>
                <li>利用停止・消去の請求</li>
                <li>データポータビリティの権利</li>
                <li>プロファイリングを含む自動処理の拒否</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. Cookieとトラッキング</h2>
              <p className='mb-4'>当サービスでは、サービス向上のために以下の技術を使用します：</p>
              <ul className='list-disc pl-6 mb-6'>
                <li>認証状態の維持のためのセッションCookie</li>
                <li>ユーザー設定の保存のためのローカルストレージ</li>
                <li>アクセス解析のためのアナリティクス（匿名化）</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. 国際的なデータ転送</h2>
              <p className='mb-6'>
                当サービスは、クラウドサービスプロバイダーを利用してデータを処理・保存しています。
                データは適切なセキュリティ措置の下で管理され、関連する法令に準拠しています。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>9. 子どもの個人情報</h2>
              <p className='mb-6'>
                当サービスは、13歳未満の子どもから意図的に個人情報を収集することはありません。
                13歳未満の子どもの個人情報を収集したことが判明した場合、速やかに削除いたします。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>10. プライバシーポリシーの変更</h2>
              <p className='mb-6'>
                当社は、必要に応じて本プライバシーポリシーを変更することがあります。
                重要な変更がある場合は、メール通知またはサービス内での告知を行います。
                継続してサービスを利用される場合、変更後のポリシーに同意したものとみなします。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>11. お問い合わせ</h2>
              <p className='mb-4'>
                個人情報の取り扱いに関するご質問・ご要望は、以下の連絡先までお問い合わせください：
              </p>
              <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                <p className='font-medium'>KPT Connect サポートチーム</p>
                <p>メール: privacy@kptconnect.com</p>
                <p>
                  お問い合わせフォーム: 
                  <Link href='/contact' className='text-indigo-600 hover:text-indigo-700 ml-1'>
                    こちら
                  </Link>
                </p>
              </div>

              <div className='border-t pt-6 mt-8'>
                <p className='text-sm text-gray-500'>
                  本プライバシーポリシーは、2024年3月15日に最終更新されました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage; 