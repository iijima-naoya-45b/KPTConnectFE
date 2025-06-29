/**
 * 感情トレンド分析コンポーネント
 * 
 * @description AI分析による感情トレンド結果を表示
 * @param data 感情トレンドデータ
 */

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card/card';
import { Badge } from '../../../../components/ui/badge/badge';
import { Heart } from 'lucide-react';
import { EmotionTrendData } from '../types';

interface EmotionTrendsProps {
  data: EmotionTrendData[];
}

export function EmotionTrends({ data }: EmotionTrendsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-600" />
            <span>感情トレンド分析</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((trend, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium">{new Date(trend.date).toLocaleDateString('ja-JP')}</div>
                  <Badge variant="outline">{trend.dominantEmotion}</Badge>
                </div>
                
                <div className="space-y-2">
                  {/* ポジティブ */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600 w-16">ポジティブ</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-green-500 h-2 rounded-full w-[${trend.positive}%]`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{trend.positive}%</span>
                  </div>
                  
                  {/* ニュートラル */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-16">ニュートラル</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gray-500 h-2 rounded-full w-[${trend.neutral}%]`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{trend.neutral}%</span>
                  </div>
                  
                  {/* ネガティブ */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-red-600 w-16">ネガティブ</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-red-500 h-2 rounded-full w-[${trend.negative}%]`}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{trend.negative}%</span>
                  </div>
                </div>

                {/* キーイベント */}
                {trend.keyEvents.length > 0 && (
                  <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">主な出来事:</h4>
                    <ul className="space-y-1">
                      {trend.keyEvents.map((event, eventIndex) => (
                        <li key={eventIndex} className="text-sm text-gray-600">
                          • {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 