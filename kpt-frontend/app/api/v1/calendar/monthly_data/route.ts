/**
 * @file route.ts
 * @description 月次データAPI（開発用）
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/calendar/monthly_data?year=${year}&month=${month}`, {
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
            kpt_sessions: {
                total: 15,
                completed: 12,
                by_type: { completed: 12, in_progress: 2, draft: 1 },
                items_count: { keep: 25, problem: 18, try: 22 }
            },
            productivity: {
                active_days: 18,
                total_days: 30,
                activity_rate: 60.0,
                average_daily_items: 3.6
            },
            growth_metrics: {
                reflection_consistency: 75.5,
                improvement_rate: 80.0,
                goal_achievement: 68.5,
                learning_velocity: 15.2
            },
            reflection_streak: 5
        },
        message: '月次データを取得しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 