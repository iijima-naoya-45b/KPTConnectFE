/**
 * @fileoverview PaymentIntent作成API
 * @description Stripe PaymentIntentを作成するAPIエンドポイント
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_PRICE_IDS } from '@/lib/stripe';

/**
 * Stripeインスタンス
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51234567890abcdef', {
  apiVersion: '2025-05-28.basil',
});

/**
 * リクエストボディの型定義
 */
interface CreatePaymentIntentRequest {
  /** プランID */
  planId: string;
  /** 請求サイクル */
  billingCycle: 'monthly' | 'yearly';
  /** 金額（円） */
  amount: number;
  /** 通貨 */
  currency: string;
}

/**
 * PaymentIntent作成API
 * @param {NextRequest} request - リクエスト
 * @returns {Promise<NextResponse>} レスポンス
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: CreatePaymentIntentRequest = await request.json();
    const { planId, billingCycle, amount, currency } = body;

    // バリデーション
    if (!planId || !billingCycle || !amount || !currency) {
      return NextResponse.json(
        { error: '必要なパラメータが不足しています。' },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: '金額は0より大きい値である必要があります。' },
        { status: 400 }
      );
    }

    if (currency !== 'jpy') {
      return NextResponse.json(
        { error: 'サポートされていない通貨です。' },
        { status: 400 }
      );
    }

    // プランIDの検証
    const validPlanIds = ['pro', 'enterprise'];
    if (!validPlanIds.includes(planId)) {
      return NextResponse.json(
        { error: '無効なプランIDです。' },
        { status: 400 }
      );
    }

    // 価格IDを取得
    let priceId: string;
    if (planId === 'pro') {
      priceId = billingCycle === 'yearly' ? STRIPE_PRICE_IDS.PRO_YEARLY : STRIPE_PRICE_IDS.PRO_MONTHLY;
    } else {
      priceId = billingCycle === 'yearly' ? STRIPE_PRICE_IDS.ENTERPRISE_YEARLY : STRIPE_PRICE_IDS.ENTERPRISE_MONTHLY;
    }

    // PaymentIntentを作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // 最小通貨単位（円の場合は円）
      currency: currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        planId,
        billingCycle,
        priceId,
      },
      description: `KPT Connect ${planId.toUpperCase()}プラン (${billingCycle === 'yearly' ? '年額' : '月額'})`,
      receipt_email: undefined, // 実際の実装では顧客のメールアドレスを設定
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });

  } catch (error) {
    console.error('PaymentIntent作成エラー:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: `Stripe エラー: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '決済の準備中にエラーが発生しました。しばらく時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}

/**
 * GETメソッドは許可しない
 * @returns {NextResponse} エラーレスポンス
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'このエンドポイントはPOSTメソッドのみサポートしています。' },
    { status: 405 }
  );
} 