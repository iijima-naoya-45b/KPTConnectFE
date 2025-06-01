/**
 * 学習ロードマップ機能の型定義
 * 
 * @description 学習ロードマップ機能で使用する型を定義
 */

// 学習ロードマップデータの基本型
export interface LearningRoadmapData {
    id: string;
    lastUpdated: string;
    goal: string;
    timeCommitment: 'light' | 'moderate' | 'intensive';
    totalSteps: number;
    estimatedWeeks: number;
    completedSteps: number;
    skillsToLearn: number;
    pathway: LearningPathway;
    skillAnalysis: SkillAnalysis;
    priorityAreas: PriorityArea[];
    progress: ProgressData;
    resources: ResourceLibraryData;
    weeklyRecommendations: WeeklyRecommendation[];
}

// 学習経路
export interface LearningPathway {
    milestones: Milestone[];
    currentMilestone: number;
    estimatedProgress: number;
}

// マイルストーン
export interface Milestone {
    id: string;
    title: string;
    description: string;
    order: number;
    status: 'completed' | 'current' | 'upcoming';
    estimatedWeeks: number;
    skills: string[];
    tasks: Task[];
    prerequisites: string[];
    successCriteria: string[];
}

// タスク
export interface Task {
    id: string;
    title: string;
    description: string;
    type: 'reading' | 'practice' | 'project' | 'assessment';
    estimatedHours: number;
    status: 'not_started' | 'in_progress' | 'completed';
    priority: 'high' | 'medium' | 'low';
    resources: string[];
    dueDate?: string;
}

// スキル分析
export interface SkillAnalysis {
    currentLevel: SkillLevel[];
    targetLevel: SkillLevel[];
    gapAnalysis: SkillGap[];
}

// スキルレベル
export interface SkillLevel {
    skill: string;
    category: 'technical' | 'soft' | 'leadership' | 'domain';
    currentScore: number; // 0-5
    targetScore: number; // 0-5
    importance: number; // 0-1
}

// スキルギャップ
export interface SkillGap {
    skill: string;
    gap: number;
    priority: 'critical' | 'high' | 'medium' | 'low';
    recommendedActions: string[];
}

// 優先学習領域
export interface PriorityArea {
    name: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedHours: number;
    skills: string[];
    reasoning: string;
}

// 進捗データ
export interface ProgressData {
    weeklyProgress: WeeklyProgress[];
    milestoneProgress: MilestoneProgress[];
    skillProgress: SkillProgress[];
    overallCompletion: number;
    streakDays: number;
    totalHoursSpent: number;
}

// 週次進捗
export interface WeeklyProgress {
    week: string;
    completedTasks: number;
    totalTasks: number;
    hoursSpent: number;
    achievements: string[];
    challenges: string[];
}

// マイルストーン進捗
export interface MilestoneProgress {
    milestoneId: string;
    title: string;
    progress: number; // 0-1
    estimatedCompletion: string;
    blockers: string[];
}

// スキル進捗
export interface SkillProgress {
    skill: string;
    startLevel: number;
    currentLevel: number;
    targetLevel: number;
    improvementRate: number;
}

// 学習リソースライブラリ
export interface ResourceLibraryData {
    books: BookResource[];
    courses: CourseResource[];
    articles: ArticleResource[];
    tools: ToolResource[];
    communities: CommunityResource[];
}

// 書籍リソース
export interface BookResource {
    id: string;
    title: string;
    author: string;
    description: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedReadTime: string;
    skills: string[];
    rating: number;
    url?: string;
    price?: number;
}

// コースリソース
export interface CourseResource {
    id: string;
    title: string;
    provider: string;
    description: string;
    duration: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    skills: string[];
    rating: number;
    url: string;
    price?: number;
    certification: boolean;
}

// 記事リソース
export interface ArticleResource {
    id: string;
    title: string;
    author: string;
    description: string;
    readTime: string;
    skills: string[];
    url: string;
    publishedDate: string;
}

// ツールリソース
export interface ToolResource {
    id: string;
    name: string;
    description: string;
    category: string;
    skills: string[];
    url: string;
    pricing: 'free' | 'freemium' | 'paid';
    platforms: string[];
}

// コミュニティリソース
export interface CommunityResource {
    id: string;
    name: string;
    description: string;
    type: 'forum' | 'discord' | 'slack' | 'reddit' | 'other';
    skills: string[];
    url: string;
    memberCount?: number;
    activity: 'low' | 'medium' | 'high';
}

// 週次推奨アクション
export interface WeeklyRecommendation {
    title: string;
    description: string;
    estimatedTime: string;
    difficulty: 'easy' | 'medium' | 'hard';
    priority: number;
    skills: string[];
    resources: string[];
}

// ロードマップ生成リクエスト
export interface RoadmapGenerationRequest {
    goal: string;
    timeCommitment: 'light' | 'moderate' | 'intensive';
    currentSkills?: SkillLevel[];
    preferences?: LearningPreferences;
}

// 学習設定
export interface LearningPreferences {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    preferredContentTypes: ('reading' | 'video' | 'practice' | 'project')[];
    availableDays: string[];
    focusAreas: string[];
    avoidAreas: string[];
}

// 進捗更新リクエスト
export interface ProgressUpdateRequest {
    taskId?: string;
    milestoneId?: string;
    status: 'completed' | 'in_progress' | 'not_started';
    hoursSpent?: number;
    notes?: string;
} 