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

export function validateSessionTitle(title: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 必須チェック
  const requiredError = validateRequired(title, 'セッションタイトル');
  if (requiredError) {
    errors.push(requiredError);
    return errors;
  }

  // 長さチェック
  const lengthError = validateStringLength(
    title,
    'セッションタイトル',
    1,
    TEXT_LIMITS.SESSION_TITLE
  );
  if (lengthError) {
    errors.push(lengthError);
  }

  return errors;
}

export function validateSessionDescription(description: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 説明は任意項目なので、空の場合はバリデーションをスキップ
  if (isEmpty(description)) {
    return errors;
  }

  // 長さチェック
  const lengthError = validateStringLength(
    description,
    'セッション説明',
    undefined,
    TEXT_LIMITS.SESSION_DESCRIPTION
  );
  if (lengthError) {
    errors.push(lengthError);
  }

  return errors;
}

// ===== ユーザー関連バリデーション関数 =====
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

export function validateUserBio(bio: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // 自己紹介は任意項目なので、空の場合はバリデーションをスキップ
  if (isEmpty(bio)) {
    return errors;
  }

  // 長さチェック
  const lengthError = validateStringLength(bio, '自己紹介', undefined, TEXT_LIMITS.USER_BIO);
  if (lengthError) {
    errors.push(lengthError);
  }

  return errors;
}

// ===== ファイル関連バリデーション関数 =====
export function validateFileType(
  file: File,
  allowedTypes: readonly string[]
): ValidationError | null {
  if (!allowedTypes.includes(file.type)) {
    return {
      field: 'file',
      message: `許可されていないファイル形式です。許可される形式: ${allowedTypes.join(', ')}`,
      code: 'INVALID_FILE_TYPE',
    };
  }
  return null;
}

export function validateFileSize(file: File, maxSize: number): ValidationError | null {
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return {
      field: 'file',
      message: `ファイルサイズが大きすぎます。最大サイズ: ${maxSizeMB}MB`,
      code: 'FILE_TOO_LARGE',
    };
  }
  return null;
}

// ===== 複合バリデーション関数 =====

export function validateLoginForm(email: string, password: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // メールアドレスバリデーション
  const requiredEmailError = validateRequired(email, 'メールアドレス');
  if (requiredEmailError) {
    errors.push(requiredEmailError);
  } else {
    const emailError = validateEmail(email);
    if (emailError) {
      errors.push(emailError);
    }
  }

  // パスワードバリデーション
  const requiredPasswordError = validateRequired(password, 'パスワード');
  if (requiredPasswordError) {
    errors.push(requiredPasswordError);
  }

  return errors;
}

export function validateRegistrationForm(
  email: string,
  password: string,
  confirmPassword: string,
  displayName: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  // メールアドレスバリデーション
  const requiredEmailError = validateRequired(email, 'メールアドレス');
  if (requiredEmailError) {
    errors.push(requiredEmailError);
  } else {
    const emailError = validateEmail(email);
    if (emailError) {
      errors.push(emailError);
    }
  }

  // パスワードバリデーション
  const requiredPasswordError = validateRequired(password, 'パスワード');
  if (requiredPasswordError) {
    errors.push(requiredPasswordError);
  } else {
    const passwordErrors = validatePassword(password);
    errors.push(...passwordErrors);
  }

  // パスワード確認バリデーション
  const confirmPasswordError = validatePasswordConfirmation(password, confirmPassword);
  if (confirmPasswordError) {
    errors.push(confirmPasswordError);
  }

  // 表示名バリデーション
  const displayNameErrors = validateUserDisplayName(displayName);
  errors.push(...displayNameErrors);

  return errors;
}

export function validateKptItemForm(
  title: string,
  content: string,
  type: string
): ValidationError[] {
  const errors: ValidationError[] = [];

  // タイトルバリデーション
  const titleErrors = validateKptItemTitle(title);
  errors.push(...titleErrors);

  // 内容バリデーション
  const contentErrors = validateKptItemContent(content);
  errors.push(...contentErrors);

  // タイプバリデーション
  const requiredTypeError = validateRequired(type, 'タイプ');
  if (requiredTypeError) {
    errors.push(requiredTypeError);
  }

  return errors;
}

export function groupValidationErrors(errors: ValidationError[]): Record<string, string[]> {
  return errors.reduce(
    (acc, error) => {
      if (!acc[error.field]) {
        acc[error.field] = [];
      }
      acc[error.field]!.push(error.message);
      return acc;
    },
    {} as Record<string, string[]>
  );
}

export function getFirstValidationError(
  errors: ValidationError[],
  field: string
): string | undefined {
  const fieldError = errors.find(error => error.field === field);
  return fieldError ? fieldError.message : undefined;
}
