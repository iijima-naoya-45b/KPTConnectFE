/**
 * @fileoverview トグル状態管理カスタムフック
 * @description boolean値の切り替えを管理するフック
 * @version 1.0.0
 * @author KPT Connect Team
 */

import { useState, useCallback } from 'react';

/**
 * トグル状態管理フックの戻り値型
 */
interface UseToggleReturn {
  /** 現在の状態 */
  value: boolean;
  /** 状態を切り替える関数 */
  toggle: () => void;
  /** 状態をtrueに設定する関数 */
  setTrue: () => void;
  /** 状態をfalseに設定する関数 */
  setFalse: () => void;
  /** 状態を指定した値に設定する関数 */
  setValue: (value: boolean) => void;
}

/**
 * boolean値の切り替えを管理するフック
 * @param initialValue - 初期値（デフォルト: false）
 * @returns トグル状態と操作関数
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  /**
   * 状態を切り替える関数
   */
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  /**
   * 状態をtrueに設定する関数
   */
  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  /**
   * 状態をfalseに設定する関数
   */
  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  /**
   * 状態を指定した値に設定する関数
   */
  const setValueCallback = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue: setValueCallback,
  };
}
