'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';

export default function LegalFooter() {
  return (
    <div className="text-center">
      <p className="text-gray-600 mb-6">
        ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
      </p>
      <div className="flex justify-center space-x-4">
        <Link href="/contact">
          <Button variant="outline">お問い合わせ</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">ダッシュボードに戻る</Button>
        </Link>
      </div>
    </div>
  );
}
