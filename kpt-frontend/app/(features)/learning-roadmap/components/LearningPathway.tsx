/**
 * 学習経路コンポーネント
 * 
 * @description マイルストーンベースの学習経路を表示
 * @param data 学習経路データ
 * @param onUpdateProgress 進捗更新コールバック
 */

'use client';

import { CheckCircle, Circle, Clock, Target, ArrowRight } from 'lucide-react';
import { LearningPathway as LearningPathwayType, ProgressUpdateRequest } from '../types';

interface LearningPathwayProps {
  data: LearningPathwayType;
  onUpdateProgress: (update: ProgressUpdateRequest) => Promise<void>;
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

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variantClasses = variant === 'success' ? 'bg-green-100 text-green-800' :
                         variant === 'current' ? 'bg-blue-100 text-blue-800' :
                         'bg-gray-100 text-gray-800';
  return <span className={`${baseClasses} ${variantClasses}`}>{children}</span>;
};

const Button = ({ children, onClick, variant = 'default', size = 'default' }: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: string; 
  size?: string;
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const sizeClasses = size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-2';
  const variantClasses = variant === 'outline' ? 'border border-gray-300 bg-white hover:bg-gray-50' :
                         'bg-blue-600 text-white hover:bg-blue-700';
  
  return (
    <button 
      className={`${baseClasses} ${sizeClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export function LearningPathway({ data, onUpdateProgress }: LearningPathwayProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'current':
        return <Target className="h-6 w-6 text-blue-600" />;
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">完了</Badge>;
      case 'current':
        return <Badge variant="current">進行中</Badge>;
      default:
        return <Badge>未開始</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 全体進捗 */}
      <Card>
        <CardHeader>
          <CardTitle>学習経路の進捗</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">全体進捗</span>
              <span className="text-sm text-gray-500">
                {Math.round(data.estimatedProgress * 100)}% 完了
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${data.estimatedProgress * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              現在のマイルストーン: {data.currentMilestone + 1} / {data.milestones.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* マイルストーン一覧 */}
      <div className="space-y-4">
        {data.milestones.map((milestone, index) => (
          <Card key={milestone.id} className={`${
            milestone.status === 'current' ? 'border-blue-300 bg-blue-50/30' :
            milestone.status === 'completed' ? 'border-green-300 bg-green-50/30' :
            'border-gray-200'
          }`}>
            <CardContent>
              <div className="pt-6">
                <div className="flex items-start space-x-4">
                  {/* ステータスアイコン */}
                  <div className="flex-shrink-0 pt-1">
                    {getStatusIcon(milestone.status)}
                  </div>

                  {/* マイルストーン情報 */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{milestone.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(milestone.status)}
                        <div className="text-sm text-gray-500">
                          ステップ {milestone.order}
                        </div>
                      </div>
                    </div>

                    {/* 推定期間 */}
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>推定期間: {milestone.estimatedWeeks}週間</span>
                    </div>

                    {/* スキル */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">習得スキル:</div>
                      <div className="flex flex-wrap gap-2">
                        {milestone.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex}>{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* 前提条件 */}
                    {milestone.prerequisites.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">前提条件:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {milestone.prerequisites.map((prereq, prereqIndex) => (
                            <li key={prereqIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{prereq}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 成功基準 */}
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">成功基準:</div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {milestone.successCriteria.map((criteria, criteriaIndex) => (
                          <li key={criteriaIndex} className="flex items-center space-x-2">
                            <Target className="h-3 w-3 text-blue-500" />
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* アクションボタン */}
                    <div className="flex space-x-2 pt-2">
                      {milestone.status === 'current' && (
                        <Button
                          onClick={() => onUpdateProgress({
                            milestoneId: milestone.id,
                            status: 'completed'
                          })}
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          完了としてマーク
                        </Button>
                      )}
                      {milestone.status === 'upcoming' && (
                        <Button
                          onClick={() => onUpdateProgress({
                            milestoneId: milestone.id,
                            status: 'in_progress'
                          })}
                          variant="outline"
                          size="sm"
                        >
                          <Target className="h-4 w-4 mr-2" />
                          開始する
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* 次のマイルストーンへの矢印 */}
                {index < data.milestones.length - 1 && (
                  <div className="flex justify-center pt-4">
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 