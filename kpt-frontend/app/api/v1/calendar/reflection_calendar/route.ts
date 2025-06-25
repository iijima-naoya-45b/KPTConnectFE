/**
 * @file route.ts
 * @description 個人振り返りカレンダーAPI（開発用）
 * 
 * @overview
 * Railsサーバーへのプロキシ用エンドポイント
 * 本番環境では next.config.mjs の rewrites でプロキシされます
 */

import { NextRequest, NextResponse } from 'next/server';

// テストデータ
const generateTestCalendarData = (year: number, month: number) => {
    const endDate = new Date(year, month, 0);
    const daysInMonth = endDate.getDate();

    const calendarData = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const hasSession = Math.random() > 0.7; // 30%の確率でセッションあり

        calendarData.push({
            date: date.toISOString().split('T')[0],
            day: day,
            weekday: date.getDay(),
            has_kpt_session: hasSession,
            kpt_sessions: hasSession ? [
                {
                    id: `session-${day}`,
                    title: `振り返りセッション ${day}`,
                    status: Math.random() > 0.5 ? 'completed' : 'in_progress',
                    items_count: Math.floor(Math.random() * 10) + 1,
                    progress_rate: Math.floor(Math.random() * 100),
                }
            ] : [],
            reflection_score: hasSession ? Math.floor(Math.random() * 100) : 0,
            productivity_level: hasSession ?
                ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] : 'none'
        });
    }

    return calendarData;
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/calendar/reflection_calendar?year=${year}&month=${month}`, {
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
    const calendarData = generateTestCalendarData(year, month);

    const testData = {
        success: true,
        data: {
            year,
            month,
            calendar_data: calendarData,
            monthly_summary: {
                total_reflection_days: calendarData.filter(day => day.has_kpt_session).length,
                total_sessions: calendarData.reduce((acc, day) => acc + day.kpt_sessions.length, 0),
                completed_sessions: calendarData.reduce((acc, day) =>
                    acc + day.kpt_sessions.filter(session => session.status === 'completed').length, 0),
                total_items: calendarData.reduce((acc, day) =>
                    acc + day.kpt_sessions.reduce((sessionAcc, session) => sessionAcc + session.items_count, 0), 0),
                average_items_per_session: 4.2,
                reflection_streak: 7,
            }
        },
        message: 'カレンダーデータを取得しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 