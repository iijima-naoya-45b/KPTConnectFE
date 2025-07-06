// ===== 基本型定義 =====

/**
 * APIレスポンスの基本型
 * @template T - レスポンスデータの型
 */
export interface ApiResponse<T = unknown> {
  /** レスポンスデータ */
  data: T;
  /** 成功フラグ */
  success: boolean;
  /** メッセージ */
  message?: string;
  /** エラー情報 */
  error?: string;
}

/**
 * ページネーション情報
 */
export interface PaginationInfo {
  /** 現在のページ番号 */
  currentPage: number;
  /** 1ページあたりのアイテム数 */
  itemsPerPage: number;
  /** 総アイテム数 */
  totalItems: number;
  /** 総ページ数 */
  totalPages: number;
  /** 次のページが存在するか */
  hasNext: boolean;
  /** 前のページが存在するか */
  hasPrevious: boolean;
}

// ===== ユーザー関連型定義 =====

/**
 * ユーザー情報
 */
export interface User {
  /** ユーザーID */
  id: string;
  /** ユーザー名 */
  username: string;
  /** メールアドレス */
  email: string;
  /** 表示名 */
  displayName: string;
  /** プロフィール画像URL */
  avatarUrl?: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
  /** アクティブフラグ */
  isActive: boolean;
  /** ロール */
  role: UserRole;
}

/**
 * ユーザーロール
 */
export type UserRole = 'admin' | 'moderator' | 'member' | 'guest';

// ===== KPT関連型定義 =====

/**
 * KPTアイテムのタイプ
 */
export type KptItemType = 'keep' | 'problem' | 'try';

/**
 * KPTアイテム
 */
export interface KptItem {
  /** アイテムID */
  id: string;
  /** タイプ */
  type: KptItemType;
  /** タイトル */
  title: string;
  /** 内容 */
  content: string;
  /** 作成者ID */
  authorId: string;
  /** 作成者情報 */
  author: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
  /** 優先度 */
  priority: Priority;
  /** タグ */
  tags: string[];
  /** いいね数 */
  likesCount: number;
  /** コメント数 */
  commentsCount: number;
}

/**
 * 優先度
 */
export type Priority = 'low' | 'medium' | 'high' | 'critical';

/**
 * KPTセッション
 */
export interface KptSession {
  /** セッションID */
  id: string;
  /** タイトル */
  title: string;
  /** 説明 */
  description?: string;
  /** セッション日付 */
  session_date: string;
  /** ステータス */
  status: SessionStatus;
  /** KPTアイテム */
  items: KptItem[];
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
  /** 項目数 */
  items_count: {
    keep: number;
    problem: number;
    try: number;
  };
  /** 進捗率 */
  progress_rate: number;
}

/**
 * セッションステータス
 */
export type SessionStatus = 'draft' | 'active' | 'completed' | 'archived';

// ===== UI関連型定義 =====

// ===== フォーム関連型定義 =====

/**
 * フォームフィールドの状態
 */
export interface FormFieldState {
  /** 値 */
  value: string;
  /** エラーメッセージ */
  error?: string;
  /** タッチ済みフラグ */
  touched: boolean;
  /** バリデーション中フラグ */
  validating: boolean;
}

/**
 * フォームの状態
 */
export interface FormState<T extends Record<string, unknown> = Record<string, unknown>> {
  /** フィールドの状態 */
  fields: Record<keyof T, FormFieldState>;
  /** 送信中フラグ */
  isSubmitting: boolean;
  /** バリデーション中フラグ */
  isValidating: boolean;
  /** フォーム全体のエラー */
  formError?: string;
}

// ===== 設定関連型定義 =====

/**
 * テーマ設定
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * 言語設定
 */
export type Language = 'ja' | 'en';

/**
 * 通知設定
 */
export interface NotificationSettings {
  /** メール通知 */
  email: boolean;
  /** プッシュ通知 */
  push: boolean;
  /** 新しいコメント */
  newComments: boolean;
  /** セッション開始 */
  sessionStart: boolean;
  /** 週次レポート */
  weeklyReport: boolean;
}

/**
 * ユーザー設定
 */
export interface UserSettings {
  /** テーマ */
  theme: Theme;
  /** 言語 */
  language: Language;
  /** 通知設定 */
  notifications: NotificationSettings;
  /** タイムゾーン */
  timezone: string;
}

// ===== エラー関連型定義 =====

/**
 * アプリケーションエラー
 */
export interface AppError {
  /** エラーコード */
  code: string;
  /** エラーメッセージ */
  message: string;
  /** 詳細情報 */
  details?: Record<string, unknown>;
  /** スタックトレース */
  stack?: string;
}

/**
 * バリデーションエラー
 */
export interface ValidationError {
  /** フィールド名 */
  field: string;
  /** エラーメッセージ */
  message: string;
  /** エラーコード */
  code: string;
}

// ===== ユーティリティ型 =====

/**
 * 詳細レポートデータ
 */
export interface DetailedReport {
  /** レポートID */
  id: string;
  /** ユーザーID */
  userId: string;
  /** レポート期間 */
  period: ReportPeriod;
  /** 開始日 */
  startDate: string;
  /** 終了日 */
  endDate: string;
  /** KPT統計 */
  kptStats: KptStatistics;
  /** 成長分析 */
  growthAnalysis: GrowthAnalysis;
  /** 推奨アクション */
  recommendations: Recommendation[];
  /** 生成日時 */
  generatedAt: string;
}

/**
 * レポート期間
 */
export type ReportPeriod = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

/**
 * KPT統計
 */
export interface KptStatistics {
  /** 総KPT数 */
  totalKpts: number;
  /** Keep項目数 */
  keepCount: number;
  /** Problem項目数 */
  problemCount: number;
  /** Try項目数 */
  tryCount: number;
  /** 完了したTry項目数 */
  completedTryCount: number;
  /** Try完了率 */
  tryCompletionRate: number;
  /** 平均KPT作成間隔（日） */
  averageKptInterval: number;
  /** 最も多いカテゴリ */
  mostFrequentCategory: KptItemType;
}

/**
 * 成長分析
 */
export interface GrowthAnalysis {
  /** 成長スコア（0-100） */
  growthScore: number;
  /** 前期比較 */
  previousPeriodComparison: PeriodComparison;
  /** 強み */
  strengths: string[];
  /** 改善点 */
  improvementAreas: string[];
  /** トレンド */
  trends: Trend[];
}

/**
 * 期間比較
 */
export interface PeriodComparison {
  /** KPT数の変化 */
  kptCountChange: number;
  /** Try完了率の変化 */
  tryCompletionRateChange: number;
  /** 成長スコアの変化 */
  growthScoreChange: number;
}

/**
 * トレンド
 */
export interface Trend {
  /** トレンド名 */
  name: string;
  /** 方向（上昇/下降/横ばい） */
  direction: 'up' | 'down' | 'stable';
  /** 変化率 */
  changeRate: number;
  /** 説明 */
  description: string;
}

/**
 * 推奨アクション
 */
export interface Recommendation {
  /** 推奨ID */
  id: string;
  /** タイトル */
  title: string;
  /** 説明 */
  description: string;
  /** 優先度 */
  priority: Priority;
  /** カテゴリ */
  category: RecommendationCategory;
  /** 実行可能フラグ */
  actionable: boolean;
}

/**
 * 推奨カテゴリ
 */
export type RecommendationCategory =
  | 'frequency'
  | 'quality'
  | 'follow_up'
  | 'goal_setting'
  | 'reflection_depth';

// Plan type definition
export interface Plan {
  id: string;
  name: string;
  yearlyPrice: number;
  monthlyPrice: number;
  description: string;
  features: ReadonlyArray<{
    name: string;
    description: string;
    included: boolean;
    limit?: number;
  }>;
}
