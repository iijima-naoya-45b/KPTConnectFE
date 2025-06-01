/**
 * 学習ロードマップ機能のカスタムフック
 * 
 * @description 学習ロードマップデータの取得、生成、進捗管理を行う
 * @returns ロードマップデータと操作関数
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { LearningRoadmapData, ProgressUpdateRequest } from '../types';

// モックデータ（実際のAPIが利用可能になるまで）
const mockRoadmapData: LearningRoadmapData = {
    id: 'roadmap-1',
    lastUpdated: new Date().toISOString(),
    goal: 'overall',
    timeCommitment: 'moderate',
    totalSteps: 15,
    estimatedWeeks: 12,
    completedSteps: 5,
    skillsToLearn: 8,
    pathway: {
        milestones: [
            {
                id: 'milestone-1',
                title: '基礎スキル習得',
                description: 'プログラミングとKPT手法の基本的な理解',
                order: 1,
                status: 'completed',
                estimatedWeeks: 3,
                skills: ['TypeScript', 'React', 'KPT手法'],
                tasks: [],
                prerequisites: [],
                successCriteria: ['基本的なWebアプリケーションが作成できる']
            },
            {
                id: 'milestone-2',
                title: '実践的なプロジェクト開発',
                description: '実際のプロジェクトでの応用スキル習得',
                order: 2,
                status: 'current',
                estimatedWeeks: 4,
                skills: ['API設計', 'データベース設計', 'テスト手法'],
                tasks: [],
                prerequisites: ['milestone-1'],
                successCriteria: ['完全なWebアプリケーションの開発']
            }
        ],
        currentMilestone: 1,
        estimatedProgress: 0.42
    },
    skillAnalysis: {
        currentLevel: [
            { skill: 'フロントエンド開発', category: 'technical', currentScore: 3, targetScore: 4, importance: 0.9 },
            { skill: 'バックエンド開発', category: 'technical', currentScore: 2, targetScore: 4, importance: 0.8 },
            { skill: 'コミュニケーション', category: 'soft', currentScore: 4, targetScore: 5, importance: 0.7 },
            { skill: 'プロジェクト管理', category: 'leadership', currentScore: 2, targetScore: 4, importance: 0.6 }
        ],
        targetLevel: [
            { skill: 'フロントエンド開発', category: 'technical', currentScore: 3, targetScore: 4, importance: 0.9 },
            { skill: 'バックエンド開発', category: 'technical', currentScore: 2, targetScore: 4, importance: 0.8 },
            { skill: 'コミュニケーション', category: 'soft', currentScore: 4, targetScore: 5, importance: 0.7 },
            { skill: 'プロジェクト管理', category: 'leadership', currentScore: 2, targetScore: 4, importance: 0.6 }
        ],
        gapAnalysis: [
            { skill: 'バックエンド開発', gap: 2, priority: 'high', recommendedActions: ['Node.js学習', 'データベース設計'] },
            { skill: 'プロジェクト管理', gap: 2, priority: 'medium', recommendedActions: ['アジャイル手法学習', 'チーム管理スキル'] }
        ]
    },
    priorityAreas: [
        {
            name: 'バックエンド開発スキル',
            description: 'サーバーサイド開発とAPI設計の強化',
            priority: 'high',
            estimatedHours: 40,
            skills: ['Node.js', 'Express', 'Database'],
            reasoning: 'フルスタック開発者としての成長に必須'
        },
        {
            name: 'テスト手法',
            description: '品質向上のためのテスト戦略習得',
            priority: 'medium',
            estimatedHours: 25,
            skills: ['Unit Testing', 'Integration Testing'],
            reasoning: '保守性の高いコード開発に重要'
        }
    ],
    progress: {
        weeklyProgress: [
            {
                week: '2025-01-01',
                completedTasks: 3,
                totalTasks: 5,
                hoursSpent: 8,
                achievements: ['TypeScript基礎完了'],
                challenges: ['非同期処理の理解']
            }
        ],
        milestoneProgress: [
            {
                milestoneId: 'milestone-1',
                title: '基礎スキル習得',
                progress: 1.0,
                estimatedCompletion: '2025-01-15',
                blockers: []
            },
            {
                milestoneId: 'milestone-2',
                title: '実践的なプロジェクト開発',
                progress: 0.3,
                estimatedCompletion: '2025-02-15',
                blockers: ['API設計の理解不足']
            }
        ],
        skillProgress: [
            {
                skill: 'TypeScript',
                startLevel: 1,
                currentLevel: 3,
                targetLevel: 4,
                improvementRate: 0.5
            }
        ],
        overallCompletion: 0.33,
        streakDays: 12,
        totalHoursSpent: 45
    },
    resources: {
        books: [
            {
                id: 'book-1',
                title: 'TypeScript ハンドブック',
                author: 'Microsoft',
                description: 'TypeScriptの公式ドキュメント',
                difficulty: 'intermediate',
                estimatedReadTime: '10時間',
                skills: ['TypeScript'],
                rating: 4.8,
                url: 'https://www.typescriptlang.org/docs/'
            }
        ],
        courses: [
            {
                id: 'course-1',
                title: 'React Complete Course',
                provider: 'Udemy',
                description: 'Reactの包括的なコース',
                duration: '40時間',
                difficulty: 'intermediate',
                skills: ['React', 'JavaScript'],
                rating: 4.7,
                url: 'https://example.com/course',
                certification: true
            }
        ],
        articles: [
            {
                id: 'article-1',
                title: 'Modern React Best Practices',
                author: 'Jane Doe',
                description: 'Reactの最新ベストプラクティス',
                readTime: '15分',
                skills: ['React'],
                url: 'https://example.com/article',
                publishedDate: '2025-01-01'
            }
        ],
        tools: [
            {
                id: 'tool-1',
                name: 'VS Code',
                description: '統合開発環境',
                category: 'IDE',
                skills: ['Development'],
                url: 'https://code.visualstudio.com/',
                pricing: 'free',
                platforms: ['Windows', 'Mac', 'Linux']
            }
        ],
        communities: [
            {
                id: 'community-1',
                name: 'React Japan',
                description: '日本のReactコミュニティ',
                type: 'discord',
                skills: ['React'],
                url: 'https://example.com/discord',
                memberCount: 5000,
                activity: 'high'
            }
        ]
    },
    weeklyRecommendations: [
        {
            title: 'Node.js基礎学習',
            description: 'サーバーサイドJavaScriptの基本を学習',
            estimatedTime: '5時間',
            difficulty: 'medium',
            priority: 1,
            skills: ['Node.js'],
            resources: ['公式ドキュメント', 'チュートリアル']
        },
        {
            title: 'APIデザイン練習',
            description: 'RESTful APIの設計練習',
            estimatedTime: '3時間',
            difficulty: 'medium',
            priority: 2,
            skills: ['API設計'],
            resources: ['REST API ガイド']
        }
    ]
};

export function useLearningRoadmap() {
    const [roadmapData, setRoadmapData] = useState<LearningRoadmapData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ロードマップデータの取得
    const fetchRoadmapData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // API呼び出し（現在はモックデータを使用）
            // const response = await fetch('/api/learning-roadmap');
            // const data = await response.json();

            // モックデータを使用（実際のAPIに置き換え予定）
            await new Promise(resolve => setTimeout(resolve, 1500)); // 読み込み感を演出

            setRoadmapData(mockRoadmapData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ロードマップの取得に失敗しました');
            setRoadmapData(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // 新しいロードマップの生成
    const generateRoadmap = useCallback(async (goal: string, timeCommitment: 'light' | 'moderate' | 'intensive') => {
        try {
            setError(null);

            // API呼び出し（現在はモックを使用）
            // const response = await fetch('/api/learning-roadmap/generate', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ goal, timeCommitment })
            // });

            await new Promise(resolve => setTimeout(resolve, 2000)); // 生成時間を演出

            // 新しいロードマップデータで更新
            const updatedRoadmap = {
                ...mockRoadmapData,
                goal,
                timeCommitment,
                lastUpdated: new Date().toISOString()
            };
            setRoadmapData(updatedRoadmap);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'ロードマップの生成に失敗しました');
        }
    }, []);

    // 進捗の更新
    const updateProgress = useCallback(async (update: ProgressUpdateRequest) => {
        try {
            setError(null);

            // API呼び出し（現在はモック）
            // const response = await fetch('/api/learning-roadmap/progress', {
            //   method: 'PUT',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(update)
            // });

            await new Promise(resolve => setTimeout(resolve, 500));

            // ローカル状態を更新
            if (roadmapData) {
                const updatedData = { ...roadmapData };
                if (update.status === 'completed') {
                    updatedData.completedSteps += 1;
                    updatedData.progress.overallCompletion = updatedData.completedSteps / updatedData.totalSteps;
                }
                setRoadmapData(updatedData);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '進捗の更新に失敗しました');
        }
    }, [roadmapData]);

    // カスタム目標の保存
    const saveCustomGoal = useCallback(async (goal: string) => {
        try {
            setError(null);

            // API呼び出し（現在はモック）
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (roadmapData) {
                setRoadmapData({
                    ...roadmapData,
                    goal,
                    lastUpdated: new Date().toISOString()
                });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '目標の保存に失敗しました');
        }
    }, [roadmapData]);

    // 初回データ取得
    useEffect(() => {
        fetchRoadmapData();
    }, [fetchRoadmapData]);

    return {
        roadmapData,
        loading,
        error,
        generateRoadmap,
        updateProgress,
        saveCustomGoal,
        refreshData: fetchRoadmapData
    };
} 