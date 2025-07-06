import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

let stripePromise: Promise<Stripe | null>;

/**
 * Stripeインスタンスを取得
 * @returns {Promise<Stripe | null>} Stripeインスタンス
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

/**
 * 価格ID（Stripeダッシュボードで作成）
 */
export const STRIPE_PRICE_IDS = {
  PRO_MONTHLY: 'price_pro_monthly_test',
  PRO_YEARLY: 'price_pro_yearly_test',
  ENTERPRISE_MONTHLY: 'price_enterprise_monthly_test',
  ENTERPRISE_YEARLY: 'price_enterprise_yearly_test',
} as const;