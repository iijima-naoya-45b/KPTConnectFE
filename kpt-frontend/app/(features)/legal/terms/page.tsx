/**
 * @file page.tsx
 * @description 利用規約ページ
 *
 * サービスの利用に関する規約・条件を表示します。
 * KPTアプリケーションの利用における権利・義務・制限事項について詳細に説明します。
 *
 * @example
 * ```tsx
 * // /legal/terms でアクセス可能
 * ```
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className='  bg-gray-50 pt-16'>
      <div className='py-6'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>利用規約</h1>
              <p className='mt-2 text-gray-600'>サービス利用に関する規約・条件</p>
            </div>
            <div className='flex space-x-3'>
              <Link href='/legal/privacy'>
                <Button variant='outline'>プライバシーポリシー</Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline'>ダッシュボードに戻る</Button>
              </Link>
            </div>
          </div>

          <div className='bg-white shadow rounded-lg p-8'>
            <div className='prose max-w-none'>
              <p className='text-sm text-gray-500 mb-6'>最終更新日: 2024年3月15日</p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>1. 総則</h2>
              <p className='mb-4'>
                本利用規約（以下「本規約」）は、KPT Connect（以下「当サービス」）の利用に関する条件を定めるものです。
                ユーザーは、本規約に同意の上、サービスを利用するものとします。
              </p>
              <p className='mb-6'>
                当サービスは、チームやプロジェクトの振り返りを支援するKPT（Keep, Problem, Try）メソッドを
                デジタル化したツールです。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>2. サービスの内容</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>2.1 提供機能</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>KPT記録の作成・編集・管理</li>
                <li>チームメンバーとの共有・協力機能</li>
                <li>振り返りレポートの生成・分析</li>
                <li>カレンダー機能による定期的な振り返りの管理</li>
                <li>テンプレート機能による効率的な記録作成</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>2.2 料金プラン</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>基本プラン: 無料（機能制限あり）</li>
                <li>プレミアムプラン: 有料（全機能利用可能）</li>
                <li>エンタープライズプラン: 法人向け（カスタム機能含む）</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>3. アカウント登録・管理</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>3.1 登録要件</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>有効なGoogleアカウントが必要です</li>
                <li>13歳以上であることが必要です</li>
                <li>虚偽の情報での登録は禁止されています</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>3.2 アカウント管理責任</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>アカウント情報の適切な管理</li>
                <li>第三者による不正利用の防止</li>
                <li>アカウント情報の変更時の速やかな更新</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>4. 利用ルール</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>4.1 適切な利用</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>サービスの本来の目的に沿った利用</li>
                <li>他のユーザーへの配慮</li>
                <li>関連法令の遵守</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>4.2 コンテンツのガイドライン</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>建設的で専門的な内容の記録</li>
                <li>他者の尊厳を尊重した記述</li>
                <li>機密情報の適切な取り扱い</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>5. 禁止事項</h2>
              <p className='mb-4'>ユーザーは、以下の行為を行ってはなりません：</p>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>5.1 技術的な禁止行為</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>当サービスへの不正アクセスまたはその試行</li>
                <li>サーバーやネットワークへの過度な負荷をかける行為</li>
                <li>自動化ツールやボットの無許可使用</li>
                <li>セキュリティ機能の回避・無効化</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>5.2 コンテンツ関連の禁止行為</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>違法、有害、中傷的なコンテンツの投稿</li>
                <li>他者の知的財産権を侵害するコンテンツの投稿</li>
                <li>プライバシーを侵害するコンテンツの投稿</li>
                <li>スパムや商業的宣伝目的の投稿</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>5.3 その他の禁止行為</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>他のユーザーになりすます行為</li>
                <li>当サービスの運営を妨害する行為</li>
                <li>当サービスの信用を失墜させる行為</li>
                <li>法令、規則、本規約に違反する行為</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>6. 知的財産権</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>6.1 当サービスの知的財産権</h3>
              <p className='mb-4'>
                当サービスに関するすべての知的財産権（著作権、商標権、特許権等）は、
                当社または正当な権利者に帰属します。
              </p>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>6.2 ユーザーコンテンツ</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>ユーザーが作成したKPT記録の著作権はユーザーに帰属します</li>
                <li>当サービスはサービス提供・改善目的でのみコンテンツを使用します</li>
                <li>ユーザーは当サービスにコンテンツ使用の必要な権利を付与します</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>7. データの取り扱い</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>7.1 データの保存・バックアップ</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>当サービスはユーザーデータの適切な保存・管理に努めます</li>
                <li>定期的なバックアップを実施しています</li>
                <li>データの完全性・可用性の保証には最大限努力しますが、絶対的な保証はできません</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>7.2 データの移行・削除</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>ユーザーはいつでもデータのエクスポートを要求できます</li>
                <li>アカウント削除時、関連データは適切に削除されます</li>
                <li>法的要件により一定期間データを保持する場合があります</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>8. サービスの変更・中断・終了</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>8.1 サービスの変更</h3>
              <p className='mb-4'>
                当社は、サービスの改善・向上のため、事前通知なくサービス内容を変更することがあります。
                重要な変更については、合理的な期間前に通知いたします。
              </p>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>8.2 サービスの中断・停止</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>システムメンテナンスによる一時的な中断</li>
                <li>天災、事故、その他不可抗力による停止</li>
                <li>技術的問題による緊急停止</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>9. 料金・支払い</h2>
              
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>9.1 料金体系</h3>
              <ul className='list-disc pl-6 mb-4'>
                <li>料金は当サービスWebサイトに明示されています</li>
                <li>料金の変更は事前に通知いたします</li>
                <li>既存契約の料金は契約期間中は変更されません</li>
              </ul>

              <h3 className='text-lg font-semibold text-gray-800 mb-3'>9.2 支払い・返金</h3>
              <ul className='list-disc pl-6 mb-6'>
                <li>支払いは指定された方法で事前決済となります</li>
                <li>返金は当社の返金ポリシーに基づいて行われます</li>
                <li>支払い遅延の場合、サービス利用が制限される場合があります</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>10. 免責事項</h2>
              <p className='mb-4'>当サービスは、以下の事項について一切の責任を負いません：</p>
              <ul className='list-disc pl-6 mb-6'>
                <li>サービスの中断・停止・遅延による損害</li>
                <li>データの消失・破損・漏洩による損害（当社の重過失による場合を除く）</li>
                <li>ユーザー間のトラブルまたは第三者との紛争</li>
                <li>ユーザーの機器・ソフトウェアの不具合による損害</li>
                <li>天災・事故・その他不可抗力による損害</li>
              </ul>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>11. 損害賠償</h2>
              <p className='mb-6'>
                当社がユーザーに対して損害賠償責任を負う場合、その賠償額は、
                ユーザーが過去12か月間に当サービスに支払った料金の総額を上限とします。
                ただし、当社の故意または重過失による場合はこの限りではありません。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>12. 規約の変更</h2>
              <p className='mb-6'>
                当社は、必要に応じて本規約を変更することがあります。
                重要な変更については、メール通知またはサービス内での告知を行い、
                30日前に通知いたします。継続してサービスを利用される場合、
                変更後の規約に同意したものとみなします。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>13. 準拠法・裁判管轄</h2>
              <p className='mb-6'>
                本規約は日本法に準拠し、本規約に関する一切の紛争については、
                東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>

              <h2 className='text-2xl font-semibold text-gray-900 mb-4'>14. お問い合わせ</h2>
              <p className='mb-4'>
                本規約に関するご質問・ご要望は、以下の連絡先までお問い合わせください：
              </p>
              <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                <p className='font-medium'>KPT Connect サポートチーム</p>
                <p>メール: support@kptconnect.com</p>
                <p>
                  お問い合わせフォーム: 
                  <Link href='/contact' className='text-indigo-600 hover:text-indigo-700 ml-1'>
                    こちら
                  </Link>
                </p>
              </div>

              <div className='border-t pt-6 mt-8'>
                <p className='text-sm text-gray-500'>
                  本利用規約は、2024年3月15日に最終更新されました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage; 