'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

export default function TermsHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">利用規約</h1>
        <p className="mt-2 text-gray-600">サービス利用に関する規約・条件</p>
      </div>
      <div className="flex space-x-3">
        <Link href="/legal/privacy">
          <Button variant="outline">プライバシーポリシー</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">ダッシュボードに戻る</Button>
        </Link>
      </div>
    </div>
  );
}
