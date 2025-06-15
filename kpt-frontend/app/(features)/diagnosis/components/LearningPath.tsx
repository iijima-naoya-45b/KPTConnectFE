'use client';

import React, { useState } from 'react';

interface LearningPhase {
  phase: number;
  title: string;
  duration: string;
  goals: string[];
  milestones: string[];
}

interface LearningPathProps {
  /** 学習パス */
  learningPath: LearningPhase[];
}

const LearningPath: React.FC<LearningPathProps> = ({ learningPath }) => {
  const [activePhase, setActivePhase] = useState<number>(1);

  /** フェーズの色とアイコンを取得 */
  const getPhaseStyle = (isActive: boolean, isCompleted: boolean) => {
    if (isCompleted) {
      return {
        bg: 'bg-green-100',
        border: 'border-green-300',
        text: 'text-green-800',
        icon: '✅',
        iconBg: 'bg-green-600',
      };
    }
    
    if (isActive) {
      return {
        bg: 'bg-blue-100',
        border: 'border-blue-300',
        text: 'text-blue-800',
        icon: '🎯',
        iconBg: 'bg-blue-600',
      };
    }
    
    return {
      bg: 'bg-gray-100',
      border: 'border-gray-300',
      text: 'text-gray-600',
      icon: '📋',
      iconBg: 'bg-gray-400',
    };
  };

  /** 進捗率の計算（サンプル） */
  const getPhaseProgress = (phase: number) => {
    // 実際の実装では、ユーザーの実際の進捗データを使用
    const sampleProgress = {
      1: 75, // フェーズ1は75%完了
      2: 30, // フェーズ2は30%完了
      3: 0,  // フェーズ3は未開始
    };
    return sampleProgress[phase as keyof typeof sampleProgress] || 0;
  };

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>🗺️ 学習パス</h2>
        <p className='text-gray-600'>
          段階的な成長プランに沿って、効率的にスキルアップを進めましょう
        </p>
      </div>

      {/* 全体進捗 */}
      <div className='mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200'>
        <div className='flex items-center justify-between mb-3'>
          <h3 className='text-lg font-semibold text-blue-900'>全体進捗</h3>
          <span className='text-2xl font-bold text-blue-600'>
            {Math.round(
              learningPath.reduce((sum, phase) => sum + getPhaseProgress(phase.phase), 0) /
                learningPath.length
            )}%
          </span>
        </div>
        
        <div className='w-full bg-blue-200 rounded-full h-3'>
          <div
            className='bg-blue-600 h-3 rounded-full transition-all duration-500'
            style={{
              width: `${
                learningPath.reduce((sum, phase) => sum + getPhaseProgress(phase.phase), 0) /
                learningPath.length
              }%`,
            }}
          ></div>
        </div>
        
        <div className='flex justify-between text-sm text-blue-700 mt-2'>
          <span>開始</span>
          <span>完了</span>
        </div>
      </div>

      {/* フェーズ一覧 */}
      <div className='space-y-6'>
        {learningPath.map((phase, index) => {
          const isActive = activePhase === phase.phase;
          const isCompleted = getPhaseProgress(phase.phase) === 100;
          const progress = getPhaseProgress(phase.phase);
          const style = getPhaseStyle(isActive, isCompleted);

          return (
            <div key={phase.phase} className='relative'>
              {/* 接続線 */}
              {index < learningPath.length - 1 && (
                <div className='absolute left-6 top-16 w-0.5 h-16 bg-gray-300'></div>
              )}

              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${style.border} ${style.bg} ${
                  isActive ? 'shadow-md' : 'hover:shadow-sm'
                }`}
                onClick={() => setActivePhase(phase.phase)}
              >
                <div className='flex items-start'>
                  {/* フェーズアイコン */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ${style.iconBg}`}>
                    <span className='text-lg'>{style.icon}</span>
                  </div>

                  <div className='flex-1'>
                    {/* フェーズヘッダー */}
                    <div className='flex items-center justify-between mb-3'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          フェーズ {phase.phase}: {phase.title}
                        </h3>
                        <p className={`text-sm ${style.text}`}>
                          期間: {phase.duration}
                        </p>
                      </div>
                      
                      <div className='text-right'>
                        <div className='text-2xl font-bold text-indigo-600'>{progress}%</div>
                        <div className='text-sm text-gray-500'>完了</div>
                      </div>
                    </div>

                    {/* 進捗バー */}
                    <div className='mb-4'>
                      <div className='w-full bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-indigo-600 h-2 rounded-full transition-all duration-500'
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* 詳細情報（アクティブ時のみ表示） */}
                    {isActive && (
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                        {/* 学習目標 */}
                        <div>
                          <h4 className='text-sm font-semibold text-gray-700 mb-3'>🎯 学習目標</h4>
                          <div className='space-y-2'>
                            {phase.goals.map((goal, goalIndex) => (
                              <div key={goalIndex} className='flex items-start'>
                                <div className='w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2'></div>
                                <span className='text-sm text-gray-700'>{goal}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* マイルストーン */}
                        <div>
                          <h4 className='text-sm font-semibold text-gray-700 mb-3'>🏆 マイルストーン</h4>
                          <div className='space-y-2'>
                            {phase.milestones.map((milestone, milestoneIndex) => (
                              <div key={milestoneIndex} className='flex items-start'>
                                <div className='w-2 h-2 bg-green-600 rounded-full mr-3 mt-2'></div>
                                <span className='text-sm text-gray-700'>{milestone}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* アクションボタン */}
                    {isActive && (
                      <div className='mt-6 flex space-x-3'>
                        <button className='px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200'>
                          このフェーズを開始
                        </button>
                        <button className='px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200'>
                          詳細を確認
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 学習のヒント */}
      <div className='mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200'>
        <h4 className='text-sm font-semibold text-purple-800 mb-3'>🌟 学習成功のポイント</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700'>
          <div>
            <h5 className='font-medium mb-1'>📅 計画的な学習</h5>
            <p>各フェーズの期間を守り、無理のないペースで進めましょう</p>
          </div>
          <div>
            <h5 className='font-medium mb-1'>🔄 継続的な振り返り</h5>
            <p>定期的にKPTで学習の効果を振り返り、改善しましょう</p>
          </div>
          <div>
            <h5 className='font-medium mb-1'>🤝 コミュニティ活用</h5>
            <p>同じ目標を持つ仲間と情報交換し、モチベーションを維持しましょう</p>
          </div>
          <div>
            <h5 className='font-medium mb-1'>🎯 実践重視</h5>
            <p>学んだことは実際のプロジェクトで活用し、経験を積みましょう</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath; 