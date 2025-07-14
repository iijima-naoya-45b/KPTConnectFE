import type { AppError } from '@/types';

/**
 * 日付を日本語形式でフォーマット
 * @param date - 対象の日付
 * @param includeTime - 時刻を含めるか
 * @returns フォーマットされた日付文字列
 */
export function formatJapaneseDate(date: string | Date, includeTime: boolean = false): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;

  if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
    return '無効な日付'; // Return a default message for invalid dates
  }

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();

  let formatted = `${year}年${month}月${day}日`;

  if (includeTime) {
    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    formatted += ` ${hours}:${minutes}`;
  }

  return formatted;
}

// ===== バリデーションユーティリティ =====

/**
 * メールアドレスの形式をチェック
 * @param email - チェック対象のメールアドレス
 * @returns 有効な形式かどうか
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 空の値かどうかをチェック
 * @param value - チェック対象の値
 * @returns 空の値かどうか
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

// ===== エラーハンドリングユーティリティ =====

/**
 * APIエラーレスポンスを解析
 * @param error - エラーオブジェクト
 * @returns 解析されたエラー情報
 */
export function parseApiError(error: unknown): AppError {
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      stack: error.stack,
    };
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    return {
      code: (errorObj.code as string) || 'UNKNOWN_ERROR',
      message: (errorObj.message as string) || 'エラーが発生しました',
      details: errorObj.details as Record<string, unknown>,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'エラーが発生しました',
  };
}

// ===== 非同期処理ユーティリティ =====

/**
 * 非同期関数をデバウンス
 * @param fn - 対象の関数
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}