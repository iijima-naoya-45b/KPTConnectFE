'use client';

import React, { useState, useEffect } from 'react';
import {
  DiagnosisHeader,
  SkillAssessment,
  TechnicalAreaAnalysis,
  ImprovementRecommendations,
  LearningPath,
  ProgressTracking,
} from './components/index';
import { Button } from '@/components/ui';
import Link from 'next/link';

interface TechnicalArea {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'design' | 'management';
  currentLevel: number;
  targetLevel: number;
  priority: 'high' | 'medium' | 'low';
  skills: string[];
  kptCount: {
    keep: number;
    problem: number;
    try: number;
  };
}

interface DiagnosisResult {
  overallScore: number;
  technicalAreas: TechnicalArea[];
  strengths: string[];
  weaknesses: string[];
  recommendations: Array<{
    area: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedTime: string;
    resources: string[];
  }>;
  learningPath: Array<{
    phase: number;
    title: string;
    duration: string;
    goals: string[];
    milestones: string[];
  }>;
}

const DiagnosisPage: React.FC = () => {
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // ダミーデータ生成関数
  const generateDiagnosisData = (): DiagnosisResult => {
    return {
      overallScore: 72,
      technicalAreas: [
        {
          id: 'frontend',
          name: 'フロントエンド開発',
          category: 'frontend',
          currentLevel: 3,
          targetLevel: 4,
          priority: 'high',
          skills: ['React', 'TypeScript', 'CSS', 'Next.js', 'State Management'],
          kptCount: { keep: 8, problem: 12, try: 6 },
        },
        {
          id: 'backend',
          name: 'バックエンド開発',
          category: 'backend',
          currentLevel: 2,
          targetLevel: 4,
          priority: 'high',
          skills: ['Node.js', 'API設計', 'データベース', 'セキュリティ'],
          kptCount: { keep: 3, problem: 15, try: 8 },
        },
        {
          id: 'infrastructure',
          name: 'インフラ・DevOps',
          category: 'infrastructure',
          currentLevel: 2,
          targetLevel: 3,
          priority: 'medium',
          skills: ['Docker', 'CI/CD', 'AWS', '監視・ログ'],
          kptCount: { keep: 2, problem: 10, try: 5 },
        },
        {
          id: 'design',
          name: 'UI/UXデザイン',
          category: 'design',
          currentLevel: 3,
          targetLevel: 4,
          priority: 'medium',
          skills: ['Figma', 'デザインシステム', 'ユーザビリティ', 'アクセシビリティ'],
          kptCount: { keep: 6, problem: 8, try: 4 },
        },
        {
          id: 'management',
          name: 'プロジェクト管理',
          category: 'management',
          currentLevel: 4,
          targetLevel: 5,
          priority: 'low',
          skills: ['アジャイル', 'チームリード', 'コミュニケーション', '要件定義'],
          kptCount: { keep: 12, problem: 4, try: 3 },
        },
      ],
      strengths: [
        'プロジェクト管理スキルが高く、チームをまとめる能力がある',
        'フロントエンド開発の基礎は固まっており、継続的な改善ができている',
        'UI/UXデザインへの理解があり、ユーザー視点で考えられる',
        '学習意欲が高く、新しい技術への取り組みが積極的',
      ],
      weaknesses: [
        'バックエンド開発の経験が不足しており、API設計やデータベース設計に課題',
        'インフラ・DevOpsの知識が限定的で、本番運用への理解が浅い',
        'セキュリティに関する知識が不足している',
        'パフォーマンス最適化の経験が少ない',
      ],
      recommendations: [
        {
          area: 'バックエンド開発',
          title: 'Node.js + Express.js でのAPI開発',
          description: 'RESTful APIの設計・実装を通じて、バックエンド開発の基礎を習得',
          priority: 'high',
          estimatedTime: '2-3ヶ月',
          resources: ['Node.js公式ドキュメント', 'Express.js チュートリアル', 'REST API設計ガイド'],
        },
        {
          area: 'データベース',
          title: 'PostgreSQL とデータベース設計',
          description: 'リレーショナルデータベースの設計・最適化スキルを向上',
          priority: 'high',
          estimatedTime: '1-2ヶ月',
          resources: ['PostgreSQL公式ドキュメント', 'データベース設計パターン', 'SQL最適化ガイド'],
        },
        {
          area: 'インフラ',
          title: 'Docker とコンテナ技術',
          description: 'アプリケーションのコンテナ化と本番環境への理解を深める',
          priority: 'medium',
          estimatedTime: '1ヶ月',
          resources: ['Docker公式チュートリアル', 'Kubernetes基礎', 'コンテナ最適化ガイド'],
        },
        {
          area: 'セキュリティ',
          title: 'Webアプリケーションセキュリティ',
          description: 'OWASP Top 10 を理解し、セキュアなアプリケーション開発を習得',
          priority: 'medium',
          estimatedTime: '1ヶ月',
          resources: ['OWASP ガイド', 'セキュリティテスト手法', '脆弱性対策事例'],
        },
      ],
      learningPath: [
        {
          phase: 1,
          title: 'バックエンド基礎固め',
          duration: '3ヶ月',
          goals: [
            'Node.js + Express.js でのAPI開発',
            'PostgreSQLでのデータベース設計',
            '認証・認可の実装',
          ],
          milestones: [
            'ToDoアプリのAPI作成',
            'ユーザー管理システムの構築',
            'データベース最適化の実践',
          ],
        },
        {
          phase: 2,
          title: 'インフラ・DevOps習得',
          duration: '2ヶ月',
          goals: [
            'Dockerでのコンテナ化',
            'CI/CDパイプラインの構築',
            'AWSでのデプロイ',
          ],
          milestones: [
            'アプリケーションのDocker化',
            'GitHub Actionsでの自動デプロイ',
            'AWS EC2/RDSでの本番環境構築',
          ],
        },
        {
          phase: 3,
          title: 'セキュリティ・パフォーマンス向上',
          duration: '2ヶ月',
          goals: [
            'セキュリティベストプラクティス',
            'パフォーマンス最適化',
            '監視・ログ管理',
          ],
          milestones: [
            'セキュリティ監査の実施',
            'パフォーマンステストの導入',
            '監視ダッシュボードの構築',
          ],
        },
      ],
    };
  };

  // データ取得
  useEffect(() => {
    setLoading(true);
    // 実際のAPIコール（現在はダミーデータで代替）
    setTimeout(() => {
      const data = generateDiagnosisData();
      setDiagnosisResult(data);
      setLoading(false);
    }, 1500);
  }, []);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className='  flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>KPTデータを分析中...</p>
          <p className='mt-2 text-sm text-gray-500'>技術分野別の診断を実行しています</p>
        </div>
      </div>
    );
  }

  if (!diagnosisResult) {
    return (
      <div className='  flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <p className='text-gray-600'>診断データの読み込みに失敗しました</p>
          <Button onClick={() => window.location.reload()} className='mt-4'>
            再診断
          </Button>
        </div>
      </div>
    );
  }

  const filteredAreas = selectedCategory === 'all' 
    ? diagnosisResult.technicalAreas 
    : diagnosisResult.technicalAreas.filter(area => area.category === selectedCategory);

  return (
    <div className='  bg-gray-50'>
      <div className='py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* ヘッダー */}
          <DiagnosisHeader 
            overallScore={diagnosisResult.overallScore}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryFilter}
          />

          {/* スキル評価 */}
          <div className='mb-8'>
            <SkillAssessment 
              technicalAreas={filteredAreas}
              overallScore={diagnosisResult.overallScore}
            />
          </div>

          {/* 技術分野別分析 */}
          <div className='mb-8'>
            <TechnicalAreaAnalysis 
              technicalAreas={filteredAreas}
              strengths={diagnosisResult.strengths}
              weaknesses={diagnosisResult.weaknesses}
            />
          </div>

          {/* 改善提案 */}
          <div className='mb-8'>
            <ImprovementRecommendations 
              recommendations={diagnosisResult.recommendations}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* 学習パス */}
          <div className='mb-8'>
            <LearningPath 
              learningPath={diagnosisResult.learningPath}
            />
          </div>

          {/* 進捗追跡 */}
          <div className='mb-8'>
            <ProgressTracking 
              technicalAreas={diagnosisResult.technicalAreas}
            />
          </div>

          {/* フッター */}
          <div className='flex justify-between items-center mt-12 pt-6 border-t border-gray-200'>
            <div className='text-sm text-gray-500'>
              診断結果は定期的に更新されます。継続的な学習で成長を実感しましょう。
            </div>
            <div className='flex space-x-3'>
              <Link href='/reports'>
                <Button variant='outline'>詳細レポート</Button>
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

export default DiagnosisPage; 