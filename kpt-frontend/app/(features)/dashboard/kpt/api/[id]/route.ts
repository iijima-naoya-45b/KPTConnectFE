/**
 * @file route.ts
 * @description KPT個別セッションAPI（開発用）
 * 
 * @overview
 * Railsサーバーへのプロキシ用エンドポイント
 * 本番環境では next.config.mjs の rewrites でプロキシされます
 */

import { NextRequest, NextResponse } from 'next/server';

// GET - セッション詳細取得
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            // Cookieを含めてバックエンドに転送
            const cookies = request.headers.get('cookie') || '';

            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions/${id}`, {
                headers: {
                    'Authorization': request.headers.get('Authorization') || '',
                    'Cookie': cookies,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        } catch (error) {
            return NextResponse.json(
                { success: false, error: 'APIサーバーに接続できません' },
                { status: 500 }
            );
        }
    }

    // 開発環境用テストデータ
    const sessionDetail = {
        id: id,
        title: `KPTセッション詳細 ${id}`,
        description: 'サンプルセッション詳細',
        created_at: '2025-06-23T10:00:00Z',
        updated_at: '2025-06-23T11:30:00Z',
        status: 'completed',
        tags: ['開発', 'レビュー'],
        kpt_items: [
            {
                id: 'item-1',
                type: 'keep',
                content: '良いチームワークが保てている',
                priority: 'medium',
                emotion_score: 8,
                impact_score: 7,
                created_at: '2025-06-23T10:15:00Z'
            },
            {
                id: 'item-2',
                type: 'problem',
                content: 'コミュニケーションの頻度が少ない',
                priority: 'high',
                emotion_score: 4,
                impact_score: 8,
                created_at: '2025-06-23T10:20:00Z'
            },
            {
                id: 'item-3',
                type: 'try',
                content: '週次のミーティングを増やす',
                priority: 'high',
                emotion_score: 7,
                impact_score: 9,
                due_date: '2025-06-30',
                assigned_to: 'チーム全体',
                created_at: '2025-06-23T10:25:00Z'
            }
        ],
        metrics: {
            total_items: 3,
            completed_items: 1,
            average_emotion_score: 6.3,
            average_impact_score: 8.0
        }
    };

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
            const cookies = request.headers.get('cookie') || '';

            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': request.headers.get('Authorization') || '',
                    'Cookie': cookies,
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
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

        const testData = {
            success: true,
            data: {
                id: id,
                title: body.title || 'アップデートされたセッション',
                updated_at: new Date().toISOString()
            },
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
            const cookies = request.headers.get('cookie') || '';

            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_sessions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': request.headers.get('Authorization') || '',
                    'Cookie': cookies,
                },
            });

            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
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