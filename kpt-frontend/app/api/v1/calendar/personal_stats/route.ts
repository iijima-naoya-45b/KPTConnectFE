/**
 * @file route.ts
 * @description 個人統計API（開発用）
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/calendar/personal_stats`, {
                credentials: 'include',
                headers: {
                    'Authorization': request.headers.get('Authorization') || '',
                },
            });
            const data = await response.json();
            return NextResponse.json(data);
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'APIサーバーに接続できません' },
                { status: 500 }
            );
        }
    }

    // 開発環境用テストデータ
    const testData = {
        success: true,
        data: {
            total_sessions: 45,
            total_items: 180,
            completion_rate: 78.5,
            current_streak: 12,
            longest_streak: 25,
            monthly_average: 8.2,
            most_productive_day: '火曜日',
            popular_tags: [
                { tag: '学習', count: 25 },
                { tag: '改善', count: 18 },
                { tag: 'チームワーク', count: 15 },
                { tag: '効率化', count: 12 },
                { tag: 'スキルアップ', count: 10 }
            ],
            recent_achievements: [
                {
                    type: 'session_completed',
                    title: 'KPTセッション完了: 週次振り返り',
                    date: new Date().toISOString().split('T')[0],
                    description: '8個のアイテムで振り返りを完了'
                },
                {
                    type: 'streak_milestone',
                    title: '連続振り返り10日達成',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    description: '継続的な振り返り習慣の確立'
                },
                {
                    type: 'goal_achievement',
                    title: '月間目標達成',
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    description: '今月の振り返り目標を達成しました'
                }
            ]
        },
        message: '個人統計を取得しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 