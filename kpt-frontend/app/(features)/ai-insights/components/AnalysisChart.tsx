/**
 * 分析チャートコンポーネント
 * 
 * @description AI分析結果をチャート形式で表示
 * @param data 分析データ
 */

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card/card';
import { AnalysisOverviewData } from '../types';

interface AnalysisChartProps {
  data: AnalysisOverviewData;
}

export function AnalysisChart({ data }: AnalysisChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>分析概要</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{data.keyMetrics.keeps}</div>
              <div className="text-sm text-gray-600">Keep</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{data.keyMetrics.problems}</div>
              <div className="text-sm text-gray-600">Problem</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{data.keyMetrics.tries}</div>
              <div className="text-sm text-gray-600">Try</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">総セッション数: {data.totalSessions}</div>
            <div className="text-sm text-gray-600">ポジティブ度: {Math.round(data.averagePositivity * 100)}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 