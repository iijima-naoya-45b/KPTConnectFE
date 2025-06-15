// data.ts
import React from 'react';

export const privacyCard = {
    title: 'プライバシーポリシー',
    description:
        '個人情報の収集、利用、管理について詳細に説明しています。お客様の大切な情報をどのように保護しているかをご確認いただけます。',
    items: [
        '収集する情報の種類',
        '情報の利用目的',
        'セキュリティ対策',
        'お客様の権利',
        'Cookie・トラッキング',
    ],
    href: '/legal/privacy',
    icon: (
        <svg
      className= "w-6 h-6 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
    <path
        strokeLinecap="round"
        strokeLinejoin = "round"
        strokeWidth={ 2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
    </svg>
  ),
bgColor: 'bg-blue-100',
    buttonColor: 'bg-blue-600 hover:bg-blue-700',
};

export const termsCard = {
    title: '利用規約',
    description:
        'サービスの利用に関する規約・条件を定めています。ご利用前に必ずお読みいただき、内容にご同意の上でサービスをご利用ください。',
    items: [
        'サービス内容・機能',
        '利用ルール・禁止事項',
        '知的財産権',
        '料金・支払い',
        '免責事項・損害賠償',
    ],
    href: '/legal/terms',
    icon: (
        <svg
      className= "w-6 h-6 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
    <path
        strokeLinecap="round"
        strokeLinejoin = "round"
        strokeWidth={ 2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
    </svg>
  ),
bgColor: 'bg-green-100',
    buttonColor: 'bg-green-600 hover:bg-green-700',
};
