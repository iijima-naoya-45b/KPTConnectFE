/**
 * @file index.ts
 * @description オンボーディングコンポーネントのエクスポート管理
 * 
 * オンボーディング機能で使用するコンポーネントの
 * 一元的なエクスポートを提供します。
 */

export { default as OnboardingStep } from './OnboardingStep';
export { default as OnboardingNavigation } from './OnboardingNavigation';
export { onboardingSteps, type OnboardingStepData } from './OnboardingSteps'; 