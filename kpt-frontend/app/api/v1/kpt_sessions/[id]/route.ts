/**
 * @file route.ts
 * @description KPTセッション詳細API（開発用）
 * 
 * @overview
 * Railsサーバーへのプロキシ用エンドポイント
 * 本番環境では next.config.mjs の rewrites でプロキシされます
 */

import { NextRequest, NextResponse } from 'next/server';

// テストデータ
const generateTestSessionDetail = (id: string) => {
    return {
        id: id,
        title: `KPTセッション ${id.slice(0, 8)}`,
        description: '週次振り返りセッション',
        session_date: '2025-01-08',
        status: 'in_progress',
        is_template: false,
        template_name: null,
        tags: ['週次', '振り返り', '改善'],
        items_count: {
            keep: 3,
            problem: 2,
            try: 4,
            total: 9
        },
        progress_rate: 65,
        average_emotion_score: 3.5,
        average_impact_score: 4.0,
        kpt_items: [
            {
                id: 'item-1',
                type: 'keep',
                content: 'チーム内のコミュニケーションが良好',
                priority: 'medium',
                status: 'open',
                due_date: null,
                assigned_to: null,
                emotion_score: 4,
                impact_score: 4,
                tags: ['コミュニケーション'],
                notes: null,
                created_at: '2025-01-07T10:00:00Z',
                updated_at: '2025-01-07T10:00:00Z',
                completed_at: null
            },
            {
                id: 'item-2',
                type: 'problem',
                content: 'タスクの優先順位が不明確',
                priority: 'high',
                status: 'open',
                due_date: '2025-01-15',
                assigned_to: null,
                emotion_score: 2,
                impact_score: 5,
                tags: ['タスク管理'],
                notes: '改善が必要',
                created_at: '2025-01-07T10:15:00Z',
                updated_at: '2025-01-07T10:15:00Z',
                completed_at: null
            },
            {
                id: 'item-3',
                type: 'try',
                content: 'デイリースタンドアップの導入',
                priority: 'medium',
                status: 'in_progress',
                due_date: '2025-01-20',
                assigned_to: null,
                emotion_score: 3,
                impact_score: 4,
                tags: ['プロセス改善'],
                notes: '来週から開始予定',
                created_at: '2025-01-07T10:30:00Z',
                updated_at: '2025-01-07T10:30:00Z',
                completed_at: null
            }
        ],
        created_at: '2025-01-07T09:00:00Z',
        updated_at: '2025-01-07T12:00:00Z',
        completed_at: null
    };
};

// GET - セッション詳細取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions/${id}`, {
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
    const sessionDetail = generateTestSessionDetail(id);

    const testData = {
        success: true,
        data: sessionDetail,
        message: 'セッション詳細を取得しました（テストデータ）'
    };

    return NextResponse.json(testData);
}

// PUT - セッション更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const body = await request.json();
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': request.headers.get('Authorization') || '',
                },
                body: JSON.stringify(body),
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

    // 開発環境用の疑似更新
    try {
        const body = await request.json();
        const sessionDetail = generateTestSessionDetail(id);

        // テストデータを更新
        if (body.session) {
            sessionDetail.title = body.session.title || sessionDetail.title;
            sessionDetail.description = body.session.description || sessionDetail.description;
            sessionDetail.tags = body.session.tags || sessionDetail.tags;
        }

        const testData = {
            success: true,
            data: sessionDetail,
            message: 'セッションを更新しました（テストデータ）'
        };

        return NextResponse.json(testData);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'リクエストの処理に失敗しました' },
            { status: 400 }
        );
    }
}

// DELETE - セッション削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions/${id}`, {
                method: 'DELETE',
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

    // 開発環境用の疑似削除
    const testData = {
        success: true,
        message: 'セッションを削除しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 