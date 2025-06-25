/**
 * @file route.ts
 * @description 成長タイムラインAPI（開発用）
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('start_date') || '2025-01-01';
    const endDate = searchParams.get('end_date') || '2025-12-31';

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/calendar/growth_timeline?start_date=${startDate}&end_date=${endDate}`, {
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
    const generateTimelineData = () => {
        const data = [];
        const baseDate = new Date();

        for (let i = 0; i < 10; i++) {
            const date = new Date(baseDate);
            date.setDate(baseDate.getDate() - i * 3);

            data.push({
                date: date.toISOString().split('T')[0],
                type: Math.random() > 0.5 ? 'kpt_session' : 'work_log',
                title: `振り返りセッション ${i + 1}`,
                description: `第${i + 1}回目の振り返りセッション`,
                status: ['completed', 'in_progress', 'draft'][Math.floor(Math.random() * 3)],
                items_count: Math.floor(Math.random() * 10) + 1,
                progress_rate: Math.floor(Math.random() * 100),
                emotion_score: Math.floor(Math.random() * 5) + 1,
                impact_score: Math.floor(Math.random() * 5) + 1,
                url: `/dashboard/kpt/session-${i + 1}`
            });
        }

        return data;
    };

    const timelineData = generateTimelineData();

    const testData = {
        success: true,
        data: {
            timeline: timelineData,
            period: {
                start_date: startDate,
                end_date: endDate,
                total_days: Math.floor((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
            },
            summary: {
                total_activities: timelineData.length,
                kpt_sessions_count: timelineData.filter(item => item.type === 'kpt_session').length,
                work_logs_count: timelineData.filter(item => item.type === 'work_log').length,
                average_progress: timelineData.reduce((acc, item) => acc + item.progress_rate, 0) / timelineData.length
            }
        },
        message: '成長タイムラインを取得しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 