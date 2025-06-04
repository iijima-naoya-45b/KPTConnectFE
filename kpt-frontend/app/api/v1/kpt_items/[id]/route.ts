/**
 * @file route.ts
 * @description KPTアイテムAPI（開発用）
 * 
 * @overview
 * Railsサーバーへのプロキシ用エンドポイント
 * 本番環境では next.config.mjs の rewrites でプロキシされます
 */

import { NextRequest, NextResponse } from 'next/server';

// PUT - アイテム更新
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const body = await request.json();
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_items/${id}`, {
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

        const testData = {
            success: true,
            data: {
                id: id,
                content: body.item?.content || 'アップデートされたアイテム',
                updated_at: new Date().toISOString()
            },
            message: 'アイテムを更新しました（テストデータ）'
        };

        return NextResponse.json(testData);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'リクエストの処理に失敗しました' },
            { status: 400 }
        );
    }
}

// DELETE - アイテム削除
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    // 本番環境では、Railsサーバーにプロキシ
    if (process.env.NODE_ENV === 'production') {
        try {
            const response = await fetch(`${process.env.RAILS_API_URL}/api/v1/kpt_items/${id}`, {
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
        message: 'アイテムを削除しました（テストデータ）'
    };

    return NextResponse.json(testData);
} 