/**
 * @fileoverview サブスクリプション管理カスタムフック
 * @description 課金プラン、決済、サブスクリプション管理を提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useCallback, useState } from 'react';
import { useApi, useApiList, useApiWithCache, useMutation, type ListResult, type CrudResult } from './use-api';
import { API_BASE_URL } from '@/lib/constants';

/**
 * サブスクリプションの基本型定義
 */
export interface Subscription {
    id: string;
    user_id: string;
    plan_name: 'free' | 'basic' | 'pro';
    status: 'active' | 'inactive' | 'canceled' | 'past_due' | 'unpaid';
    stripe_subscription_id?: string;
    stripe_customer_id?: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    created_at: string;
    updated_at: string;
    // 計算フィールド
    plan_name_ja?: string;
    status_ja?: string;
    days_until_renewal?: number;
    is_trial?: boolean;
    trial_days_remaining?: number;
}

/**
 * プランの型定義
 */
export interface Plan {
    id: string;
    name: 'free' | 'basic' | 'pro';
    display_name: string;
    description: string;
    price_monthly: number;
    price_yearly: number;
    features: readonly {
        name: string;
        description: string;
        included: boolean;
        limit?: number;
    }[];
    limitations: {
        max_kpt_sessions?: number;
        max_work_logs?: number;
        max_charts?: number;
        storage_limit_mb?: number;
        max_team_members?: number;
    };
    is_popular: boolean;
    stripe_price_id_monthly?: string;
    stripe_price_id_yearly?: string;
    created_at: string;
    updated_at: string;
    // 計算フィールド
    features_ja?: string[];
    price_monthly_formatted?: string;
    price_yearly_formatted?: string;
    yearly_discount_percentage?: number;
    monthlyPrice: number;
    yearlyPrice: number;
}

/**
 * 決済履歴の型定義
 */
export interface Payment {
    id: string;
    subscription_id: string;
    stripe_payment_intent_id: string;
    amount: number;
    currency: string;
    status: 'succeeded' | 'pending' | 'failed' | 'canceled' | 'refunded';
    payment_method: 'card' | 'bank_transfer' | 'other';
    description: string;
    paid_at?: string;
    refunded_at?: string;
    receipt_url?: string;
    created_at: string;
    // 計算フィールド
    amount_formatted?: string;
    status_ja?: string;
    payment_method_ja?: string;
}

/**
 * 決済フィルターの型定義
 */
export interface PaymentFilters {
    status?: string;
    payment_method?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    per_page?: number;
}

/**
 * サブスクリプション作成用の型定義
 */
export interface SubscriptionInput {
    plan_name: Plan['name'];
    billing_cycle: 'monthly' | 'yearly';
    payment_method_id?: string;
    trial_days?: number;
}

/**
 * APIクライアントクラス
 */
class SubscriptionsApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/v1/subscriptions`;
    }

    private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // サブスクリプション関連
    async getCurrentSubscription(): Promise<any> {
        return this.makeRequest('/current');
    }

    async createSubscription(subscription: SubscriptionInput): Promise<any> {
        return this.makeRequest('', {
            method: 'POST',
            body: JSON.stringify({ subscription }),
        });
    }

    async updateSubscription(subscriptionData: { plan_name?: string; billing_cycle?: string }): Promise<any> {
        return this.makeRequest('/current', {
            method: 'PUT',
            body: JSON.stringify({ subscription: subscriptionData }),
        });
    }

    async cancelSubscription(cancelAtPeriodEnd: boolean = true): Promise<any> {
        return this.makeRequest('/current/cancel', {
            method: 'POST',
            body: JSON.stringify({ cancel_at_period_end: cancelAtPeriodEnd }),
        });
    }

    async resumeSubscription(): Promise<any> {
        return this.makeRequest('/current/resume', {
            method: 'POST',
        });
    }

    // プラン関連
    async getPlans(): Promise<any> {
        return this.makeRequest('/plans');
    }

    async comparePlans(): Promise<any> {
        return this.makeRequest('/plans/compare');
    }

    // 決済関連
    async getPayments(filters?: PaymentFilters): Promise<any> {
        const queryParams = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const endpoint = `/payments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return this.makeRequest(endpoint);
    }

    async retryPayment(paymentId: string): Promise<any> {
        return this.makeRequest(`/payments/${paymentId}/retry`, {
            method: 'POST',
        });
    }

    // Stripe関連
    async createPaymentIntent(amount: number): Promise<any> {
        return this.makeRequest('/payment-intent', {
            method: 'POST',
            body: JSON.stringify({ amount }),
        });
    }

    async getInvoices(): Promise<any> {
        return this.makeRequest('/invoices');
    }
}

const subscriptionsApi = new SubscriptionsApi();

/**
 * 現在のサブスクリプション取得フック（キャッシュ付き）
 */
export const useCurrentSubscription = (): CrudResult<Subscription> => {
    return useApiWithCache<Subscription>(
        () => subscriptionsApi.getCurrentSubscription(),
        'current-subscription',
        5 * 60 * 1000 // 5分キャッシュ
    );
};

/**
 * プラン一覧取得フック（キャッシュ付き）
 */
export const usePlans = (): CrudResult<Plan[]> => {
    return useApiWithCache<Plan[]>(
        () => subscriptionsApi.getPlans(),
        'plans',
        30 * 60 * 1000 // 30分キャッシュ
    );
};

/**
 * プラン比較取得フック（キャッシュ付き）
 */
export const usePlansComparison = (): CrudResult<any> => {
    return useApiWithCache<any>(
        () => subscriptionsApi.comparePlans(),
        'plans-comparison',
        30 * 60 * 1000 // 30分キャッシュ
    );
};

/**
 * 決済履歴取得フック
 */
export const usePayments = (initialFilters?: PaymentFilters): ListResult<Payment> => {
    return useApiList<Payment>(
        (params) => subscriptionsApi.getPayments(params),
        {
            initialParams: initialFilters,
            pageSize: 20,
            autoFetch: true,
        }
    );
};

/**
 * サブスクリプション作成フック
 */
export const useCreateSubscription = () => {
    return useMutation<Subscription, SubscriptionInput>((subscription) =>
        subscriptionsApi.createSubscription(subscription)
    );
};

/**
 * サブスクリプション更新フック
 */
export const useUpdateSubscription = () => {
    return useMutation<Subscription, { plan_name?: string; billing_cycle?: string }>(
        (subscriptionData) => subscriptionsApi.updateSubscription(subscriptionData)
    );
};

/**
 * サブスクリプションキャンセルフック
 */
export const useCancelSubscription = () => {
    return useMutation<Subscription, boolean>((cancelAtPeriodEnd) =>
        subscriptionsApi.cancelSubscription(cancelAtPeriodEnd)
    );
};

/**
 * サブスクリプション再開フック
 */
export const useResumeSubscription = () => {
    return useMutation<Subscription, void>(() => subscriptionsApi.resumeSubscription());
};

/**
 * 決済再試行フック
 */
export const useRetryPayment = () => {
    return useMutation<Payment, string>((paymentId) => subscriptionsApi.retryPayment(paymentId));
};

/**
 * 決済インテント作成フック
 */
export const useCreatePaymentIntent = () => {
    return useMutation<{ client_secret: string }, number>((amount) =>
        subscriptionsApi.createPaymentIntent(amount)
    );
};

/**
 * インボイス取得フック
 */
export const useInvoices = () => {
    return useApi<any[]>(() => subscriptionsApi.getInvoices());
};

/**
 * サブスクリプションの包括的な管理フック
 */
export const useSubscriptionManager = () => {
    const currentSubscription = useCurrentSubscription();
    const plans = usePlans();
    const plansComparison = usePlansComparison();
    const payments = usePayments();
    const invoices = useInvoices();
    const createMutation = useCreateSubscription();
    const updateMutation = useUpdateSubscription();
    const cancelMutation = useCancelSubscription();
    const resumeMutation = useResumeSubscription();
    const retryPaymentMutation = useRetryPayment();
    const createPaymentIntentMutation = useCreatePaymentIntent();

    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [isUpgradeFlow, setIsUpgradeFlow] = useState(false);
    const [isDowngradeFlow, setIsDowngradeFlow] = useState(false);

    const refreshAll = useCallback(async () => {
        await Promise.all([
            currentSubscription.execute(),
            payments.refresh(),
            invoices.execute(),
        ]);
    }, [currentSubscription, payments, invoices]);

    const createSubscription = useCallback(async (subscription: SubscriptionInput) => {
        const result = await createMutation.mutate(subscription);
        if (result) {
            await currentSubscription.execute();
        }
        return result;
    }, [createMutation, currentSubscription]);

    const updateSubscription = useCallback(async (subscriptionData: { plan_name?: string; billing_cycle?: string }) => {
        const result = await updateMutation.mutate(subscriptionData);
        if (result) {
            await currentSubscription.execute();
        }
        return result;
    }, [updateMutation, currentSubscription]);

    const cancelSubscription = useCallback(async (cancelAtPeriodEnd: boolean = true) => {
        const result = await cancelMutation.mutate(cancelAtPeriodEnd);
        if (result) {
            await currentSubscription.execute();
        }
        return result;
    }, [cancelMutation, currentSubscription]);

    const resumeSubscription = useCallback(async () => {
        const result = await resumeMutation.mutate();
        if (result) {
            await currentSubscription.execute();
        }
        return result;
    }, [resumeMutation, currentSubscription]);

    const retryPayment = useCallback(async (paymentId: string) => {
        const result = await retryPaymentMutation.mutate(paymentId);
        if (result) {
            await payments.refresh();
        }
        return result;
    }, [retryPaymentMutation, payments]);

    const startUpgradeFlow = useCallback((plan: Plan) => {
        setSelectedPlan(plan);
        setIsUpgradeFlow(true);
        setIsDowngradeFlow(false);
    }, []);

    const startDowngradeFlow = useCallback((plan: Plan) => {
        setSelectedPlan(plan);
        setIsUpgradeFlow(false);
        setIsDowngradeFlow(true);
    }, []);

    const cancelFlow = useCallback(() => {
        setSelectedPlan(null);
        setIsUpgradeFlow(false);
        setIsDowngradeFlow(false);
    }, []);

    const confirmPlanChange = useCallback(async () => {
        if (!selectedPlan) return null;

        const result = await updateSubscription({
            plan_name: selectedPlan.name,
            billing_cycle: billingCycle,
        });

        if (result) {
            cancelFlow();
        }

        return result;
    }, [selectedPlan, billingCycle, updateSubscription, cancelFlow]);

    const createPaymentIntent = useCallback(async (amount: number) => {
        return await createPaymentIntentMutation.mutate(amount);
    }, [createPaymentIntentMutation]);

    return {
        // 状態
        subscription: currentSubscription,
        plans: plans,
        plansComparison: plansComparison,
        payments: payments,
        invoices: invoices,

        // フロー状態
        selectedPlan,
        billingCycle,
        isUpgradeFlow,
        isDowngradeFlow,

        // 操作メソッド
        createSubscription,
        updateSubscription,
        cancelSubscription,
        resumeSubscription,
        retryPayment,
        createPaymentIntent,

        // フロー操作
        startUpgradeFlow,
        startDowngradeFlow,
        cancelFlow,
        confirmPlanChange,
        setBillingCycle,

        // ユーティリティ
        refreshAll,

        // ローディング状態
        isCreatingSubscription: createMutation.loading,
        isUpdatingSubscription: updateMutation.loading,
        isCancelingSubscription: cancelMutation.loading,
        isResumingSubscription: resumeMutation.loading,
        isRetryingPayment: retryPaymentMutation.loading,

        // エラー状態
        createError: createMutation.error,
        updateError: updateMutation.error,
        cancelError: cancelMutation.error,
        resumeError: resumeMutation.error,
        retryPaymentError: retryPaymentMutation.error,
    };
};

/**
 * プロプラン機能チェックフック
 */
export const useProFeatures = () => {
    const { subscription } = useSubscriptionManager();

    const isProPlan = subscription.data?.plan_name === 'pro';
    const isBasicOrProPlan = ['basic', 'pro'].includes(subscription.data?.plan_name || '');
    const isActivePlan = subscription.data?.status === 'active';

    const hasFeature = useCallback((feature: string): boolean => {
        if (!subscription.data || !isActivePlan) return false;

        const featureMap: Record<string, boolean> = {
            'unlimited_kpt_sessions': isProPlan,
            'unlimited_work_logs': isProPlan,
            'custom_charts': isBasicOrProPlan,
            'export_data': isBasicOrProPlan,
            'priority_support': isProPlan,
            'team_collaboration': isProPlan,
            'advanced_analytics': isProPlan,
        };

        return featureMap[feature] || false;
    }, [subscription.data, isProPlan, isBasicOrProPlan, isActivePlan]);

    return {
        isProPlan,
        isBasicOrProPlan,
        isActivePlan,
        hasFeature,
        currentPlan: subscription.data?.plan_name || 'free',
        planStatus: subscription.data?.status || 'inactive',
    };
}; 