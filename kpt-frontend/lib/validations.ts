import {
  TEXT_LIMITS,
  PASSWORD_REQUIREMENTS,
} from './constants';
import { isValidEmail, isEmpty } from '@/utils';
import type { ValidationError } from '@/types';

// ===== 基本バリデーション関数 =====
export function validateRequired(value: unknown, fieldName: string): ValidationError | null {
  if (isEmpty(value)) {
    return {
      field: fieldName,
      message: `${fieldName}は必須です`,
      code: 'REQUIRED',
    };
  }
  return null;
}

export function validateStringLength(
  value: string,
  fieldName: string,
  minLength?: number,
  maxLength?: number
): ValidationError | null {
  if (minLength !== undefined && value.length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName}は${minLength}文字以上で入力してください`,
      code: 'MIN_LENGTH',
    };
  }

  if (maxLength !== undefined && value.length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName}は${maxLength}文字以内で入力してください`,
      code: 'MAX_LENGTH',
    };
  }

  return null;
}

export function validateEmail(email: string): ValidationError | null {
  if (!isValidEmail(email)) {
    return {
      field: 'email',
      message: '有効なメールアドレスを入力してください',
      code: 'INVALID_EMAIL',
    };
  }
  return null;
}

export function validatePassword(password: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 長さチェック
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    errors.push({
      field: 'password',
      message: `パスワードは${PASSWORD_REQUIREMENTS.MIN_LENGTH}文字以上で入力してください`,
      code: 'PASSWORD_TOO_SHORT',
    });
  }

  if (password.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
    errors.push({
      field: 'password',
      message: `パスワードは${PASSWORD_REQUIREMENTS.MAX_LENGTH}文字以内で入力してください`,
      code: 'PASSWORD_TOO_LONG',
    });
  }

  // 数字チェック
  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBERS && !/\d/.test(password)) {
    errors.push({
      field: 'password',
      message: 'パスワードには数字を含めてください',
      code: 'PASSWORD_MISSING_NUMBERS',
    });
  }

  // 大文字チェック
  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    errors.push({
      field: 'password',
      message: 'パスワードには大文字を含めてください',
      code: 'PASSWORD_MISSING_UPPERCASE',
    });
  }

  // 小文字チェック
  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    errors.push({
      field: 'password',
      message: 'パスワードには小文字を含めてください',
      code: 'PASSWORD_MISSING_LOWERCASE',
    });
  }

  // 特殊文字チェック
  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push({
      field: 'password',
      message: 'パスワードには特殊文字を含めてください',
      code: 'PASSWORD_MISSING_SPECIAL_CHARS',
    });
  }

  return errors;
}

export function validatePasswordConfirmation(
  password: string,
  confirmPassword: string
): ValidationError | null {
  if (password !== confirmPassword) {
    return {
      field: 'confirmPassword',
      message: 'パスワードが一致しません',
      code: 'PASSWORD_MISMATCH',
    };
  }
  return null;
}

// ===== KPT関連バリデーション関数 =====
export function validateKptItemTitle(title: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 必須チェック
  const requiredError = validateRequired(title, 'タイトル');
  if (requiredError) {
    errors.push(requiredError);
    return errors; // 必須エラーがある場合は他のチェックをスキップ
  }

  // 長さチェック
  const lengthError = validateStringLength(title, 'タイトル', 1, TEXT_LIMITS.KPT_ITEM_TITLE);
  if (lengthError) {
    errors.push(lengthError);
  }

  return errors;
}

/**
 * KPTアイテム内容のバリデーション
 * @param content - 内容
 * @returns バリデーションエラーの配列
 */
export function validateKptItemContent(content: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 必須チェック
  const requiredError = validateRequired(content, '内容');
  if (requiredError) {
    errors.push(requiredError);
    return errors;
  }

  // 長さチェック
  const lengthError = validateStringLength(content, '内容', 1, TEXT_LIMITS.KPT_ITEM_CONTENT);
  if (lengthError) {
    errors.push(lengthError);
  }

  return errors;
}

export function validateUserDisplayName(displayName: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 必須チェック
  const requiredError = validateRequired(displayName, '表示名');
  if (requiredError) {
    errors.push(requiredError);
    return errors;
  }

  // 長さチェック
  const lengthError = validateStringLength(displayName, '表示名', 1, TEXT_LIMITS.USER_DISPLAY_NAME);
  if (lengthError) {
    errors.push(lengthError);
  }

  // 不適切な文字チェック
  if (/[<>\"'&]/.test(displayName)) {
    errors.push({
      field: 'displayName',
      message: '表示名に使用できない文字が含まれています',
      code: 'INVALID_CHARACTERS',
    });
  }

  return errors;
}
