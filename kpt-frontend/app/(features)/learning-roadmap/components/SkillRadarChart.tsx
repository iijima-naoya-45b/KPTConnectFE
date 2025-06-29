/**
 * スキルレーダーチャートコンポーネント
 * 
 * @description 現在のスキルレベルとターゲットを可視化
 * @param data スキル分析データ
 */

'use client';

import { SkillAnalysis } from '../types';

interface SkillRadarChartProps {
  data: SkillAnalysis;
}

// 簡易UIコンポーネント
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pb-2">{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 pt-0">{children}</div>
);

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>スキルレベル分析</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 簡易レーダーチャート風表示 */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="aspect-square border-2 border-gray-200 rounded-full relative">
              {/* グリッド線 */}
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`absolute border border-gray-100 rounded-full w-[${(level / 5) * 100}%] h-[${(level / 5) * 100}%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                />
              ))}
              
              {/* スキルプロット */}
              {data.currentLevel.map((skill, index) => {
                const angle = (index / data.currentLevel.length) * 2 * Math.PI - Math.PI / 2;
                const currentRadius = (skill.currentScore / 5) * 45; // 45% max
                const targetRadius = (skill.targetScore / 5) * 45;
                
                const currentX = 50 + currentRadius * Math.cos(angle);
                const currentY = 50 + currentRadius * Math.sin(angle);
                const targetX = 50 + targetRadius * Math.cos(angle);
                const targetY = 50 + targetRadius * Math.sin(angle);
                
                return (
                  <div key={skill.skill}>
                    {/* 目標値点 */}
                    <div
                      className={`absolute w-2 h-2 bg-blue-300 rounded-full left-[${targetX}%] top-[${targetY}%] transform -translate-x-1/2 -translate-y-1/2`}
                    />
                    {/* 現在値点 */}
                    <div
                      className={`absolute w-3 h-3 bg-blue-600 rounded-full left-[${currentX}%] top-[${currentY}%] transform -translate-x-1/2 -translate-y-1/2`}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* スキルラベル */}
            {data.currentLevel.map((skill, index) => {
              const angle = (index / data.currentLevel.length) * 2 * Math.PI - Math.PI / 2;
              const labelRadius = 55; // %
              const labelX = 50 + labelRadius * Math.cos(angle);
              const labelY = 50 + labelRadius * Math.sin(angle);
              
              return (
                <div
                  key={skill.skill}
                  className={`absolute text-xs font-medium text-gray-700 left-[${labelX}%] top-[${labelY}%] transform -translate-x-1/2 -translate-y-1/2`}
                >
                  {skill.skill}
                </div>
              );
            })}
          </div>

          {/* 凡例 */}
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>現在レベル</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <span>目標レベル</span>
            </div>
          </div>

          {/* スキル詳細リスト */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">スキル詳細</h4>
            {data.currentLevel.map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">{skill.skill}</div>
                  <div className="text-xs text-gray-500">
                    {skill.category === 'technical' ? '技術スキル' :
                     skill.category === 'soft' ? 'ソフトスキル' :
                     skill.category === 'leadership' ? 'リーダーシップ' : 'ドメイン知識'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {skill.currentScore} → {skill.targetScore}
                  </div>
                  <div className="text-xs text-gray-500">
                    重要度: {Math.round(skill.importance * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 