/**
 * @file types/index.ts
 * @description AI分析関連の型定義
 * 
 * AI分析機能で使用される各種データ型を定義します。
 * 強み分析、改善点分析、感情トレンド等のデータ構造を含みます。
 */

// AI分析データの基本型
export interface AIAnalysisData {
    id: string;
    period: '7d' | '30d' | '90d' | '1y';
    overview: AnalysisOverviewData;
    strengths: StrengthData[];
    improvements: ImprovementData[];
    emotions: EmotionTrendData[];
    insights: ActionableInsightData[];
    summary: {
        trend: string;
        highlights: string;
        opportunities: string;
    };
    lastUpdated: string;
}

// 分析サマリー
export interface AnalysisSummary {
    trend: string;
    highlights: string;
    opportunities: string;
    score: number; // 0-100の総合スコア
}

// 概要データ
export interface AnalysisOverviewData {
    totalSessions: number;
    averagePositivity: number;
    trendDirection: 'up' | 'down' | 'stable';
    keyMetrics: {
        keeps: number;
        problems: number;
        tries: number;
    };
    periodicComparison: {
        previousPeriod: number;
        change: number;
    };
}

// チャートデータポイント
export interface ChartDataPoint {
    date: string;
    keeps: number;
    problems: number;
    tries: number;
    emotionScore: number;
}

// 強みデータ
export interface StrengthData {
    id: string;
    title: string;
    description: string;
    confidence: number;
    impact: 'high' | 'medium' | 'low';
    category: 'skill' | 'behavior' | 'mindset' | 'process';
    evidence: string[];
    suggestedActions: string[];
}

// 改善点データ
export interface ImprovementData {
    id: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: 'process' | 'communication' | 'technical' | 'collaboration';
    currentState: string;
    targetState: string;
    actionItems: string[];
    timeline: string;
    confidence: number;
}

// 改善ステップ
export interface ImprovementStep {
    step: number;
    title: string;
    description: string;
    duration: string;
    resources: string[];
}

// 感情トレンドデータ
export interface EmotionTrendData {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
    dominantEmotion: string;
    keyEvents: string[];
}

// 感情データポイント
export interface EmotionDataPoint {
    date: string;
    score: number; // 1-5
    category: 'keep' | 'problem' | 'try';
    context: string;
}

// 感情パターン
export interface EmotionPattern {
    pattern: string;
    frequency: number; // 0-1
    impact: string;
    suggestion: string;
}

// 実行可能インサイト
export interface ActionableInsightData {
    id: string;
    title: string;
    description: string;
    category: 'immediate' | 'short_term' | 'long_term';
    difficulty: 'easy' | 'medium' | 'hard';
    impact: 'high' | 'medium' | 'low';
    steps: string[];
    resources: string[];
    expectedOutcome: string;
}

// AI分析リクエスト
export interface AnalysisRequest {
    period: '7d' | '30d' | '90d' | '1y';
    includeEmotions?: boolean;
    includeInsights?: boolean;
    focusAreas?: string[];
}

// レポート生成リクエスト
export interface ReportGenerationRequest {
    format: 'pdf' | 'excel' | 'json';
    sections: ('overview' | 'strengths' | 'improvements' | 'emotions' | 'insights')[];
    period: '7d' | '30d' | '90d' | '1y';
}

// AI分析レスポンス
export interface AnalysisResponse {
    success: boolean;
    data?: AIAnalysisData;
    error?: string;
    message?: string;
}

// プロプラン機能アクセス制御
export interface ProPlanAccess {
    hasAccess: boolean;
    plan: 'free' | 'pro' | 'enterprise';
    remainingAnalyses: number;
    nextResetDate: string;
} 