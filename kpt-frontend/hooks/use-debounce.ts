/**
 * @fileoverview デバウンス処理カスタムフック
 * @description 値の変更を指定した時間だけ遅延させるフック
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useEffect } from 'react';

/**
 * 値の変更を指定した時間だけ遅延させるフック
 * @template T - 値の型
 * @param value - デバウンス対象の値
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた値
 */
export function useDebounce<T>(value: T, delay: number): T {
  // デバウンスされた値を保持する状態
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // タイマーを設定して指定した時間後に値を更新
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 値が変更されたら前のタイマーをクリア
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
