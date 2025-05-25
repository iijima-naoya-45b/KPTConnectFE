/**
 * @fileoverview KPT Connect フロントエンド定数定義
 * @description アプリケーション全体で使用される定数を集約
 * @version 1.0.0
 * @author KPT Connect Team
 */

// ===== アプリケーション基本情報 =====

/** アプリケーション名 */
export const APP_NAME = 'KPT Connect' as const;

/** アプリケーションバージョン */
export const APP_VERSION = '1.0.0' as const;

/** アプリケーション説明 */
export const APP_DESCRIPTION = 'チーム振り返りを効率化するKPTプラットフォーム' as const;

// ===== API関連定数 =====

/** APIベースURL */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || ('http://localhost:3001/api' as const);

/** APIタイムアウト時間（ミリ秒） */
export const API_TIMEOUT = 30000 as const;

/** APIリトライ回数 */
export const API_RETRY_COUNT = 3 as const;

// ===== ページネーション関連定数 =====

/** デフォルトページサイズ */
export const DEFAULT_PAGE_SIZE = 20 as const;

/** 最大ページサイズ */
export const MAX_PAGE_SIZE = 100 as const;

/** ページサイズオプション */
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

// ===== ローカルストレージキー =====

/** ユーザー設定キー */
export const STORAGE_KEYS = {
  /** テーマ設定 */
  THEME: 'kpt-connect-theme',
  /** 言語設定 */
  LANGUAGE: 'kpt-connect-language',
  /** ユーザー設定 */
  USER_SETTINGS: 'kpt-connect-user-settings',
  /** 認証トークン */
  AUTH_TOKEN: 'kpt-connect-auth-token',
  /** リフレッシュトークン */
  REFRESH_TOKEN: 'kpt-connect-refresh-token',
  /** 最後のアクセス時刻 */
  LAST_ACCESS: 'kpt-connect-last-access',
  /** オンボーディング完了フラグ */
  ONBOARDING_COMPLETED: 'kpt-connect-onboarding-completed',
} as const;

// ===== KPT関連定数 =====

/** KPTアイテムタイプ */
export const KPT_ITEM_TYPES = {
  KEEP: 'keep',
  PROBLEM: 'problem',
  TRY: 'try',
} as const;

/** KPTアイテムタイプラベル */
export const KPT_ITEM_TYPE_LABELS = {
  [KPT_ITEM_TYPES.KEEP]: 'Keep（続けること）',
  [KPT_ITEM_TYPES.PROBLEM]: 'Problem（問題）',
  [KPT_ITEM_TYPES.TRY]: 'Try（挑戦すること）',
} as const;

/** KPTアイテムタイプカラー */
export const KPT_ITEM_TYPE_COLORS = {
  [KPT_ITEM_TYPES.KEEP]: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: 'text-green-600',
  },
  [KPT_ITEM_TYPES.PROBLEM]: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: 'text-red-600',
  },
  [KPT_ITEM_TYPES.TRY]: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'text-blue-600',
  },
} as const;

/** 優先度 */
export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/** 優先度ラベル */
export const PRIORITY_LABELS = {
  [PRIORITIES.LOW]: '低',
  [PRIORITIES.MEDIUM]: '中',
  [PRIORITIES.HIGH]: '高',
  [PRIORITIES.CRITICAL]: '緊急',
} as const;

/** 優先度カラー */
export const PRIORITY_COLORS = {
  [PRIORITIES.LOW]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
  [PRIORITIES.MEDIUM]: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
  },
  [PRIORITIES.HIGH]: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
  },
  [PRIORITIES.CRITICAL]: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    border: 'border-red-300',
  },
} as const;

/** セッションステータス */
export const SESSION_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

/** セッションステータスラベル */
export const SESSION_STATUS_LABELS = {
  [SESSION_STATUS.DRAFT]: '下書き',
  [SESSION_STATUS.ACTIVE]: '進行中',
  [SESSION_STATUS.COMPLETED]: '完了',
  [SESSION_STATUS.ARCHIVED]: 'アーカイブ',
} as const;

/** セッションステータスカラー */
export const SESSION_STATUS_COLORS = {
  [SESSION_STATUS.DRAFT]: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
  [SESSION_STATUS.ACTIVE]: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
  },
  [SESSION_STATUS.COMPLETED]: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
  },
  [SESSION_STATUS.ARCHIVED]: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
  },
} as const;

// ===== UI関連定数 =====

/** ブレークポイント */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/** アニメーション時間 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

/** Z-index値 */
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
  TOAST: 1080,
} as const;

/** 通知表示時間（ミリ秒） */
export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  NORMAL: 5000,
  LONG: 8000,
  PERSISTENT: 0, // 自動削除しない
} as const;

// ===== バリデーション関連定数 =====

/** 文字数制限 */
export const TEXT_LIMITS = {
  /** KPTアイテムタイトル */
  KPT_ITEM_TITLE: 100,
  /** KPTアイテム内容 */
  KPT_ITEM_CONTENT: 1000,
  /** セッションタイトル */
  SESSION_TITLE: 200,
  /** セッション説明 */
  SESSION_DESCRIPTION: 500,
  /** ユーザー表示名 */
  USER_DISPLAY_NAME: 50,
  /** ユーザー自己紹介 */
  USER_BIO: 300,
  /** コメント */
  COMMENT: 500,
  /** タグ */
  TAG: 30,
} as const;

/** パスワード要件 */
export const PASSWORD_REQUIREMENTS = {
  /** 最小長 */
  MIN_LENGTH: 8,
  /** 最大長 */
  MAX_LENGTH: 128,
  /** 数字を含む必要があるか */
  REQUIRE_NUMBERS: true,
  /** 大文字を含む必要があるか */
  REQUIRE_UPPERCASE: true,
  /** 小文字を含む必要があるか */
  REQUIRE_LOWERCASE: true,
  /** 特殊文字を含む必要があるか */
  REQUIRE_SPECIAL_CHARS: true,
} as const;

// ===== 日付・時刻関連定数 =====

/** 日付フォーマット */
export const DATE_FORMATS = {
  /** 年月日 */
  DATE: 'yyyy-MM-dd',
  /** 年月日時分 */
  DATETIME: 'yyyy-MM-dd HH:mm',
  /** 年月日時分秒 */
  DATETIME_FULL: 'yyyy-MM-dd HH:mm:ss',
  /** 日本語形式 */
  JAPANESE_DATE: 'yyyy年MM月dd日',
  /** 日本語形式（時刻付き） */
  JAPANESE_DATETIME: 'yyyy年MM月dd日 HH:mm',
} as const;

/** タイムゾーン */
export const TIMEZONE = 'Asia/Tokyo' as const;

// ===== ファイル関連定数 =====

/** 許可されるファイル形式 */
export const ALLOWED_FILE_TYPES = {
  /** 画像ファイル */
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  /** ドキュメントファイル */
  DOCUMENTS: ['application/pdf', 'text/plain', 'application/msword'],
} as const;

/** ファイルサイズ制限（バイト） */
export const FILE_SIZE_LIMITS = {
  /** プロフィール画像 */
  PROFILE_IMAGE: 5 * 1024 * 1024, // 5MB
  /** 添付ファイル */
  ATTACHMENT: 10 * 1024 * 1024, // 10MB
} as const;

// ===== エラーコード =====

/** エラーコード */
export const ERROR_CODES = {
  /** 認証エラー */
  UNAUTHORIZED: 'UNAUTHORIZED',
  /** 権限不足 */
  FORBIDDEN: 'FORBIDDEN',
  /** リソースが見つからない */
  NOT_FOUND: 'NOT_FOUND',
  /** バリデーションエラー */
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  /** サーバーエラー */
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  /** ネットワークエラー */
  NETWORK_ERROR: 'NETWORK_ERROR',
  /** タイムアウト */
  TIMEOUT: 'TIMEOUT',
} as const;

// ===== 外部サービス関連定数 =====

/** OAuth プロバイダー */
export const OAUTH_PROVIDERS = {
  GOOGLE: 'google',
  GITHUB: 'github',
  SLACK: 'slack',
} as const;

/** 外部連携サービス */
export const INTEGRATION_SERVICES = {
  SLACK: 'slack',
  TEAMS: 'teams',
  DISCORD: 'discord',
  JIRA: 'jira',
  TRELLO: 'trello',
  NOTION: 'notion',
} as const;
