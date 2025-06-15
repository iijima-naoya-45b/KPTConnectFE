'use client';

import React, { useState, useEffect } from 'react';
import {
  DetailedReportHeader,
  GrowthScoreCard,
  TrendAnalysis,
  StrengthWeaknessAnalysis,
  PeriodComparison,
  ActionRecommendations,
  ExportOptions,
} from './components';
import { Button } from '@/components/ui';
import Link from 'next/link';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ja } from 'date-fns/locale/ja';

interface ReportData {
  period: {
    start: Date;
    end: Date;
    label: string;
  };
  growthScore: {
    overall: number;
    keep: number;
    problem: number;
    try: number;
    previousPeriod: {
      overall: number;
      keep: number;
      problem: number;
      try: number;
    };
  };
  kptStats: {
    total: number;
    keep: number;
    problem: number;
    try: number;
    completed: number;
    inProgress: number;
    cancelled: number;
  };
  trends: {
    weekly: Array<{
      week: string;
      keep: number;
      problem: number;
      try: number;
      completionRate: number;
    }>;
    monthly: Array<{
      month: string;
      total: number;
      completed: number;
      avgScore: number;
    }>;
  };
  strengths: string[];
  improvements: string[];
  recommendations: Array<{
    category: 'keep' | 'problem' | 'try';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: number;
  }>;
}

type ReportPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

const ReportsPage: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());

  // ダミーデータ生成関数
  const generateReportData = (date: Date): ReportData => {
    const periodStart = startOfMonth(date);
    const periodEnd = endOfMonth(date);

    return {
      period: {
        start: periodStart,
        end: periodEnd,
        label: format(date, 'yyyy年MM月', { locale: ja }),
      },
      growthScore: {
        overall: 78,
        keep: 85,
        problem: 72,
        try: 76,
        previousPeriod: {
          overall: 71,
          keep: 79,
          problem: 68,
          try: 69,
        },
      },
      kptStats: {
        total: 45,
        keep: 18,
        problem: 15,
        try: 12,
        completed: 38,
        inProgress: 5,
        cancelled: 2,
      },
      trends: {
        weekly: [
          { week: '第1週', keep: 5, problem: 4, try: 3, completionRate: 92 },
          { week: '第2週', keep: 4, problem: 3, try: 4, completionRate: 88 },
          { week: '第3週', keep: 6, problem: 5, try: 2, completionRate: 95 },
          { week: '第4週', keep: 3, problem: 3, try: 3, completionRate: 85 },
        ],
        monthly: [
          { month: '3ヶ月前', total: 32, completed: 28, avgScore: 68 },
          { month: '2ヶ月前', total: 38, completed: 34, avgScore: 71 },
          { month: '先月', total: 41, completed: 36, avgScore: 74 },
          { month: '今月', total: 45, completed: 38, avgScore: 78 },
        ],
      },
      strengths: [
        '継続的な振り返りの習慣が定着している',
        'Keepの実行率が高く、良い取り組みを維持できている',
        'チーム内でのコミュニケーションが活発',
        '問題解決への取り組み姿勢が積極的',
        '新しい改善案の提案が増加傾向',
      ],
      improvements: [
        'Problemの解決完了率を向上させる必要がある',
        'Tryの実行期間が長期化する傾向がある',
        '定量的な成果指標の設定が不十分',
        'フォローアップの頻度を増やす必要がある',
        'チーム間での知見共有を強化する',
      ],
      recommendations: [
        {
          category: 'keep',
          title: '成功事例の横展開',
          description: '効果的だったKeepの取り組みを他のプロジェクトにも適用する',
          priority: 'high',
          estimatedImpact: 85,
        },
        {
          category: 'problem',
          title: '問題解決プロセスの標準化',
          description: 'Problemの分析から解決までのプロセスを標準化し、効率を向上させる',
          priority: 'high',
          estimatedImpact: 90,
        },
        {
          category: 'try',
          title: '小さな実験の推奨',
          description: 'Tryを小さな実験として実施し、リスクを最小化しながら学習を促進する',
          priority: 'medium',
          estimatedImpact: 75,
        },
        {
          category: 'keep',
          title: 'ベストプラクティス集の作成',
          description: '成功したKeepをまとめたベストプラクティス集を作成し、チーム全体で共有する',
          priority: 'medium',
          estimatedImpact: 70,
        },
        {
          category: 'problem',
          title: '根本原因分析の強化',
          description: '5Why分析やフィッシュボーン図を活用して、問題の根本原因を特定する',
          priority: 'low',
          estimatedImpact: 65,
        },
      ],
    };
  };

  // データ取得
  useEffect(() => {
    setLoading(true);
    // 実際のAPIコール（現在はダミーデータで代替）
    setTimeout(() => {
      const data = generateReportData(currentDate);
      setReportData(data);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod, currentDate]);

  const handlePeriodChange = (period: ReportPeriod) => {
    setSelectedPeriod(period);
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  if (loading) {
    return (
      <div className='  flex items-center justify-center bg-gray-50 min-h-[calc(100vh-116px-64px)]'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>詳細レポートを生成中...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className='  flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-gray-600'>レポートデータの読み込みに失敗しました</p>
          <Button onClick={() => window.location.reload()} className='mt-4'>
            再読み込み
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='  bg-gray-50 pt-16'>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <DetailedReportHeader
            period={reportData.period}
            selectedPeriod={selectedPeriod}
            onPeriodChange={handlePeriodChange}
            onDateChange={handleDateChange}
            currentDate={currentDate}
          />

          {/* 成長スコアカード */}
          <div className='mb-8'>
            <GrowthScoreCard growthScore={reportData.growthScore} />
          </div>

          {/* トレンド分析 */}
          <div className='mb-8'>
            <TrendAnalysis trends={reportData.trends} kptStats={reportData.kptStats} />
          </div>

          {/* 強み・改善点分析 */}
          <div className='mb-8'>
            <StrengthWeaknessAnalysis
              strengths={reportData.strengths}
              improvements={reportData.improvements}
            />
          </div>

          {/* 期間比較 */}
          <div className='mb-8'>
            <PeriodComparison
              currentPeriod={reportData.growthScore}
              previousPeriod={reportData.growthScore.previousPeriod}
              periodLabel={reportData.period.label}
            />
          </div>

          {/* 推奨アクション */}
          <div className='mb-8'>
            <ActionRecommendations recommendations={reportData.recommendations} />
          </div>

          {/* エクスポートオプション */}
          <div className='mb-8'>
            <ExportOptions reportData={reportData} />
          </div>

          {/* フッター */}
          <div className='flex justify-between items-center mt-12 pt-6 border-t border-gray-200'>
            <div className='text-sm text-gray-500'>
              レポート生成日時: {format(new Date(), 'yyyy/MM/dd HH:mm', { locale: ja })}
            </div>
            <div className='flex space-x-3'>
              <Link href='/calendar'>
                <Button variant='outline'>カレンダーに戻る</Button>
              </Link>
              <Link href='/dashboard'>
                <Button variant='outline'>ダッシュボードに戻る</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
