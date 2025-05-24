/**
 * @file page.tsx
 * @description プライバシーポリシー・利用規約ページコンポーネント
 *
 * @example
 * ```tsx
 * <LegalPage />
 * ```
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";

type LegalSection = "privacy" | "terms";

const LegalPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LegalSection>("privacy");

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            プライバシーポリシー・利用規約
          </h1>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-900"
          >
            ダッシュボードに戻る
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg">
          {/* タブナビゲーション */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              <button
                onClick={() => setActiveSection("privacy")}
                className={`${
                  activeSection === "privacy"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                プライバシーポリシー
              </button>
              <button
                onClick={() => setActiveSection("terms")}
                className={`${
                  activeSection === "terms"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
              >
                利用規約
              </button>
            </nav>
          </div>

          {/* コンテンツ */}
          <div className="p-6">
            {activeSection === "privacy" ? (
              <div className="prose max-w-none">
                <h2>プライバシーポリシー</h2>
                <p>最終更新日: 2024年3月15日</p>

                <h3>1. 収集する情報</h3>
                <p>当サービスは、以下の情報を収集する場合があります：</p>
                <ul>
                  <li>氏名、メールアドレス、電話番号などの個人情報</li>
                  <li>会社名、部署名などの組織情報</li>
                  <li>サービス利用履歴、アクセスログ</li>
                  <li>デバイス情報、IPアドレス</li>
                </ul>

                <h3>2. 情報の利用目的</h3>
                <p>収集した情報は、以下の目的で利用されます：</p>
                <ul>
                  <li>サービスの提供・運営</li>
                  <li>ユーザーサポート</li>
                  <li>サービスの改善</li>
                  <li>セキュリティの確保</li>
                </ul>

                <h3>3. 情報の管理</h3>
                <p>当サービスは、収集した個人情報の適切な管理に努めます：</p>
                <ul>
                  <li>アクセス制限の実施</li>
                  <li>暗号化による保護</li>
                  <li>定期的なセキュリティ監査</li>
                </ul>

                <h3>4. 情報の共有</h3>
                <p>
                  以下の場合を除き、個人情報を第三者に提供することはありません：
                </p>
                <ul>
                  <li>ユーザーの同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>サービスの提供に必要な場合</li>
                </ul>

                <h3>5. ユーザーの権利</h3>
                <p>ユーザーは以下の権利を有します：</p>
                <ul>
                  <li>個人情報の開示請求</li>
                  <li>個人情報の訂正・削除請求</li>
                  <li>利用停止の請求</li>
                </ul>
              </div>
            ) : (
              <div className="prose max-w-none">
                <h2>利用規約</h2>
                <p>最終更新日: 2024年3月15日</p>

                <h3>1. サービスの利用</h3>
                <p>
                  本規約は、当サービスの利用に関する条件を定めるものです。
                  ユーザーは、本規約に同意の上、サービスを利用するものとします。
                </p>

                <h3>2. 禁止事項</h3>
                <p>ユーザーは、以下の行為を行ってはなりません：</p>
                <ul>
                  <li>法令違反行為</li>
                  <li>当サービスの運営を妨害する行為</li>
                  <li>他のユーザーに迷惑をかける行為</li>
                  <li>不正アクセス</li>
                  <li>データの改ざん・破壊</li>
                </ul>

                <h3>3. 知的財産権</h3>
                <p>
                  当サービスに関する知的財産権は、当社または正当な権利者に帰属します。
                  ユーザーは、当社の事前の承諾なく、これらの権利を侵害する行為を行ってはなりません。
                </p>

                <h3>4. 免責事項</h3>
                <p>当サービスは、以下の事項について一切の責任を負いません：</p>
                <ul>
                  <li>サービスの中断・停止による損害</li>
                  <li>データの消失・漏洩による損害</li>
                  <li>ユーザー間のトラブル</li>
                </ul>

                <h3>5. 規約の変更</h3>
                <p>
                  当社は、必要に応じて本規約を変更することがあります。
                  変更後の規約は、当サービス上での告知をもって効力を生じるものとします。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
