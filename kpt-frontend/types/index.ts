/**
 * @fileoverview KPT Connect フロントエンド共通型定義
 * @description アプリケーション全体で使用される型定義を集約
 * @version 1.0.0
 * @author KPT Connect Team
 */

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

/**
 * ページネーション付きレスポンス
 * @template T - データの型
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  /** ページネーション情報 */
  pagination: PaginationInfo;
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

/**
 * ユーザープロフィール更新データ
 */
export interface UserProfileUpdateData {
  /** 表示名 */
  displayName?: string;
  /** プロフィール画像URL */
  avatarUrl?: string;
  /** 自己紹介 */
  bio?: string;
}

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
  /** 開始日時 */
  startDate: string;
  /** 終了日時 */
  endDate?: string;
  /** ステータス */
  status: SessionStatus;
  /** 参加者 */
  participants: User[];
  /** KPTアイテム */
  items: KptItem[];
  /** 作成者ID */
  creatorId: string;
  /** 作成日時 */
  createdAt: string;
  /** 更新日時 */
  updatedAt: string;
}

/**
 * セッションステータス
 */
export type SessionStatus = 'draft' | 'active' | 'completed' | 'archived';

// ===== UI関連型定義 =====

/**
 * ボタンのバリアント
 */
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

/**
 * ボタンのサイズ
 */
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/**
 * 入力フィールドのバリアント
 */
export type InputVariant = 'default' | 'error' | 'success';

/**
 * 通知のタイプ
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * 通知データ
 */
export interface NotificationData {
  /** 通知ID */
  id: string;
  /** タイプ */
  type: NotificationType;
  /** タイトル */
  title: string;
  /** メッセージ */
  message: string;
  /** 自動削除時間（ミリ秒） */
  duration?: number;
  /** アクション */
  action?: {
    /** ラベル */
    label: string;
    /** クリックハンドラー */
    onClick: () => void;
  };
}

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
 * 部分的にオプショナルな型
 * @template T - 元の型
 * @template K - オプショナルにするキー
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 部分的に必須な型
 * @template T - 元の型
 * @template K - 必須にするキー
 */
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 深い部分型
 * @template T - 元の型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 非null型
 * @template T - 元の型
 */
export type NonNullable<T> = T extends null | undefined ? never : T;
