'use client';

import React from 'react';

interface TechnicalArea {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'infrastructure' | 'design' | 'management';
  currentLevel: number;
  targetLevel: number;
  priority: 'high' | 'medium' | 'low';
  skills: string[];
  kptCount: {
    keep: number;
    problem: number;
    try: number;
  };
}

interface ProgressTrackingProps {
  /** 技術分野データ */
  technicalAreas: TechnicalArea[];
}

const ProgressTracking: React.FC<ProgressTrackingProps> = ({ technicalAreas }) => {
  /** 全体の進捗統計を計算 */
  const calculateOverallStats = () => {
    const totalAreas = technicalAreas.length;
    const completedAreas = technicalAreas.filter(area => area.currentLevel >= area.targetLevel).length;
    const highPriorityAreas = technicalAreas.filter(area => area.priority === 'high').length;
    const averageProgress = technicalAreas.reduce(
      (sum, area) => sum + (area.currentLevel / area.targetLevel) * 100,
      0
    ) / totalAreas;

    return {
      totalAreas,
      completedAreas,
      highPriorityAreas,
      averageProgress: Math.round(averageProgress),
    };
  };

  /** カテゴリ別の進捗を計算 */
  const calculateCategoryProgress = () => {
    const categories = ['frontend', 'backend', 'infrastructure', 'design', 'management'];
    
    return categories.map(category => {
      const categoryAreas = technicalAreas.filter(area => area.category === category);
      if (categoryAreas.length === 0) return null;

      const averageProgress = categoryAreas.reduce(
        (sum, area) => sum + (area.currentLevel / area.targetLevel) * 100,
        0
      ) / categoryAreas.length;

      const categoryNames = {
        frontend: 'フロントエンド',
        backend: 'バックエンド',
        infrastructure: 'インフラ',
        design: 'デザイン',
        management: '管理',
      };

      const categoryIcons = {
        frontend: '🎨',
        backend: '⚙️',
        infrastructure: '🏗️',
        design: '✨',
        management: '📊',
      };

      return {
        category,
        name: categoryNames[category as keyof typeof categoryNames],
        icon: categoryIcons[category as keyof typeof categoryIcons],
        progress: Math.round(averageProgress),
        areas: categoryAreas.length,
      };
    }).filter(Boolean);
  };

  /** 次のマイルストーンを取得 */
  const getNextMilestones = () => {
    return technicalAreas
      .filter(area => area.currentLevel < area.targetLevel)
      .sort((a, b) => {
        // 優先度順、次に進捗率順
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const aPriority = priorityOrder[a.priority];
        const bPriority = priorityOrder[b.priority];
        
        if (aPriority !== bPriority) {
          return bPriority - aPriority;
        }
        
        const aProgress = (a.currentLevel / a.targetLevel) * 100;
        const bProgress = (b.currentLevel / b.targetLevel) * 100;
        return bProgress - aProgress;
      })
      .slice(0, 3);
  };

  const overallStats = calculateOverallStats();
  const categoryProgress = calculateCategoryProgress();
  const nextMilestones = getNextMilestones();

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>📈 進捗追跡</h2>
        <p className='text-gray-600'>
          技術分野別の進捗状況と次のマイルストーンを確認できます
        </p>
      </div>

      {/* 全体統計 */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
          <div className='text-2xl font-bold text-blue-600'>{overallStats.averageProgress}%</div>
          <div className='text-sm text-blue-800'>平均進捗率</div>
        </div>
        <div className='bg-green-50 p-4 rounded-lg border border-green-200'>
          <div className='text-2xl font-bold text-green-600'>{overallStats.completedAreas}</div>
          <div className='text-sm text-green-800'>完了分野</div>
        </div>
        <div className='bg-red-50 p-4 rounded-lg border border-red-200'>
          <div className='text-2xl font-bold text-red-600'>{overallStats.highPriorityAreas}</div>
          <div className='text-sm text-red-800'>高優先度</div>
        </div>
        <div className='bg-purple-50 p-4 rounded-lg border border-purple-200'>
          <div className='text-2xl font-bold text-purple-600'>{overallStats.totalAreas}</div>
          <div className='text-sm text-purple-800'>総分野数</div>
        </div>
      </div>

      {/* カテゴリ別進捗 */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>カテゴリ別進捗</h3>
        <div className='space-y-4'>
          {categoryProgress.map((category) => (
            <div key={category?.category} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center'>
                <span className='text-2xl mr-3'>{category?.icon}</span>
                <div>
                  <h4 className='font-medium text-gray-900'>{category?.name}</h4>
                  <p className='text-sm text-gray-600'>{category?.areas}分野</p>
                </div>
              </div>
              
              <div className='flex items-center space-x-4'>
                <div className='w-32 bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-indigo-600 h-2 rounded-full transition-all duration-500'
                    style={{ width: `${category?.progress}%` }}
                  ></div>
                </div>
                <span className='text-lg font-bold text-indigo-600 w-12 text-right'>
                  {category?.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 次のマイルストーン */}
      <div className='mb-8'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>🎯 次のマイルストーン</h3>
        <div className='space-y-4'>
          {nextMilestones.map((area) => {
            const progress = (area.currentLevel / area.targetLevel) * 100;
            const nextLevel = area.currentLevel + 1;
            
            return (
              <div key={area.id} className='border border-gray-200 rounded-lg p-4'>
                <div className='flex items-center justify-between mb-3'>
                  <div>
                    <h4 className='font-medium text-gray-900'>{area.name}</h4>
                    <p className='text-sm text-gray-600'>
                      レベル {area.currentLevel} → {nextLevel}
                    </p>
                  </div>
                  
                  <div className='flex items-center space-x-2'>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        area.priority === 'high'
                          ? 'bg-red-100 text-red-800'
                          : area.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {area.priority === 'high' && '🔥 高'}
                      {area.priority === 'medium' && '⚡ 中'}
                      {area.priority === 'low' && '📝 低'}
                    </span>
                    <span className='text-lg font-bold text-indigo-600'>
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>
                
                <div className='w-full bg-gray-200 rounded-full h-2 mb-3'>
                  <div
                    className='bg-indigo-600 h-2 rounded-full transition-all duration-500'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className='flex justify-between text-sm text-gray-600'>
                  <span>現在のレベル: {area.currentLevel}</span>
                  <span>目標レベル: {area.targetLevel}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        {nextMilestones.length === 0 && (
          <div className='text-center py-8'>
            <div className='text-green-400 text-6xl mb-4'>🎉</div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              すべての目標を達成しました！
            </h3>
            <p className='text-gray-600'>
              新しい目標を設定して、さらなる成長を目指しましょう
            </p>
          </div>
        )}
      </div>

      {/* 進捗向上のヒント */}
      <div className='p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200'>
        <h4 className='text-sm font-semibold text-green-800 mb-3'>🚀 進捗向上のヒント</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700'>
          <div>
            <h5 className='font-medium mb-1'>🎯 集中学習</h5>
            <p>高優先度の分野に集中して取り組み、確実にレベルアップしましょう</p>
          </div>
          <div>
            <h5 className='font-medium mb-1'>📊 定期的な見直し</h5>
            <p>週次でKPTを実施し、学習の効果を測定・改善しましょう</p>
          </div>
          <div>
            <h5 className='font-medium mb-1'>🤝 仲間との学習</h5>
            <p>同じ目標を持つ仲間と一緒に学習し、モチベーションを維持しましょう</p>
          </div>
          <div>
            <h5 className='font-medium mb-1'>🏆 小さな成功を積み重ね</h5>
            <p>小さなマイルストーンを設定し、達成感を味わいながら進めましょう</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking; 