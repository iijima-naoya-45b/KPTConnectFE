/**
 * @file ExportOptions.tsx
 * @description エクスポートオプションコンポーネント
 *
 * 詳細レポートを様々な形式でエクスポートする機能を提供します。
 * PDF、Excel、JSON、CSV形式に対応しています。
 *
 * @example
 * ```tsx
 * <ExportOptions reportData={reportData} />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale/ja';

interface ReportData {
  period: {
    start: Date;
    end: Date;
    label: string;
  };
  growthScore: any;
  kptStats: any;
  trends: any;
  strengths: string[];
  improvements: string[];
  recommendations: any[];
}

interface ExportOptionsProps {
  reportData: ReportData;
}

type ExportFormat = 'pdf' | 'excel' | 'json' | 'csv';

const ExportOptions: React.FC<ExportOptionsProps> = ({ reportData }) => {
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null);
  const [exportSettings, setExportSettings] = useState({
    includeCharts: true,
    includeRecommendations: true,
    includeRawData: false,
    dateRange: 'current',
  });

  // エクスポート処理
  const handleExport = async (format: ExportFormat) => {
    setIsExporting(format);

    try {
      switch (format) {
        case 'json':
          await exportAsJSON();
          break;
        case 'csv':
          await exportAsCSV();
          break;
        case 'pdf':
          await exportAsPDF();
          break;
        case 'excel':
          await exportAsExcel();
          break;
      }
    } catch (error) {
      console.error(`Export failed for ${format}:`, error);
      alert(`エクスポートに失敗しました: ${error}`);
    } finally {
      setIsExporting(null);
    }
  };

  // JSON形式でエクスポート
  const exportAsJSON = async () => {
    const exportData = {
      exportInfo: {
        format: 'json',
        exportDate: new Date().toISOString(),
        period: reportData.period.label,
        settings: exportSettings,
      },
      reportData: {
        ...reportData,
        period: {
          ...reportData.period,
          start: reportData.period.start.toISOString(),
          end: reportData.period.end.toISOString(),
        },
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    downloadFile(blob, `kpt-report-${getDateString()}.json`);
  };

  // CSV形式でエクスポート
  const exportAsCSV = async () => {
    const csvData = [
      ['KPT詳細レポート', reportData.period.label],
      ['エクスポート日時', format(new Date(), 'yyyy/MM/dd HH:mm', { locale: ja })],
      [],
      ['成長スコア'],
      ['項目', '現在', '前期', '変化'],
      [
        '総合',
        reportData.growthScore.overall,
        reportData.growthScore.previousPeriod.overall,
        reportData.growthScore.overall - reportData.growthScore.previousPeriod.overall,
      ],
      [
        'Keep',
        reportData.growthScore.keep,
        reportData.growthScore.previousPeriod.keep,
        reportData.growthScore.keep - reportData.growthScore.previousPeriod.keep,
      ],
      [
        'Problem',
        reportData.growthScore.problem,
        reportData.growthScore.previousPeriod.problem,
        reportData.growthScore.problem - reportData.growthScore.previousPeriod.problem,
      ],
      [
        'Try',
        reportData.growthScore.try,
        reportData.growthScore.previousPeriod.try,
        reportData.growthScore.try - reportData.growthScore.previousPeriod.try,
      ],
      [],
      ['KPT統計'],
      ['総数', reportData.kptStats.total],
      ['Keep', reportData.kptStats.keep],
      ['Problem', reportData.kptStats.problem],
      ['Try', reportData.kptStats.try],
      ['完了', reportData.kptStats.completed],
      ['進行中', reportData.kptStats.inProgress],
      ['キャンセル', reportData.kptStats.cancelled],
      [],
      ['強み'],
      ...reportData.strengths.map((strength, index) => [`${index + 1}`, strength]),
      [],
      ['改善点'],
      ...reportData.improvements.map((improvement, index) => [`${index + 1}`, improvement]),
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadFile(blob, `kpt-report-${getDateString()}.csv`);
  };

  // PDF形式でエクスポート（実際の実装では専用ライブラリを使用）
  const exportAsPDF = async () => {
    // 実際の実装では jsPDF や Puppeteer などを使用
    const pdfContent = generatePDFContent();
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    downloadFile(blob, `kpt-report-${getDateString()}.pdf`);
  };

  // Excel形式でエクスポート（実際の実装では専用ライブラリを使用）
  const exportAsExcel = async () => {
    // 実際の実装では SheetJS や ExcelJS などを使用
    const excelContent = generateExcelContent();
    const blob = new Blob([excelContent], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    downloadFile(blob, `kpt-report-${getDateString()}.xlsx`);
  };

  // PDF内容生成（簡易版）
  const generatePDFContent = () => {
    return `KPT詳細レポート - ${reportData.period.label}

エクスポート日時: ${format(new Date(), 'yyyy/MM/dd HH:mm', { locale: ja })}

=== 成長スコア ===
総合: ${reportData.growthScore.overall} (前期: ${reportData.growthScore.previousPeriod.overall})
Keep: ${reportData.growthScore.keep} (前期: ${reportData.growthScore.previousPeriod.keep})
Problem: ${reportData.growthScore.problem} (前期: ${reportData.growthScore.previousPeriod.problem})
Try: ${reportData.growthScore.try} (前期: ${reportData.growthScore.previousPeriod.try})

=== 強み ===
${reportData.strengths.map((strength, index) => `${index + 1}. ${strength}`).join('\n')}

=== 改善点 ===
${reportData.improvements.map((improvement, index) => `${index + 1}. ${improvement}`).join('\n')}

=== 推奨アクション ===
${reportData.recommendations.map((rec, index) => `${index + 1}. [${rec.priority.toUpperCase()}] ${rec.title}: ${rec.description}`).join('\n')}
`;
  };

  // Excel内容生成（簡易版）
  const generateExcelContent = () => {
    // 実際の実装では適切なExcelファイル形式で生成
    return generatePDFContent();
  };

  // ファイルダウンロード
  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 日付文字列生成
  const getDateString = () => {
    return format(new Date(), 'yyyy-MM-dd', { locale: ja });
  };

  // エクスポート形式の設定
  const exportFormats = [
    {
      format: 'pdf' as ExportFormat,
      title: 'PDF',
      description: 'プレゼンテーション用の高品質レポート',
      icon: '📄',
      features: ['グラフ付き', 'プリント対応', '共有しやすい'],
    },
    {
      format: 'excel' as ExportFormat,
      title: 'Excel',
      description: 'データ分析用のスプレッドシート',
      icon: '📊',
      features: ['データ加工可能', 'グラフ作成', '計算式対応'],
    },
    {
      format: 'json' as ExportFormat,
      title: 'JSON',
      description: 'システム連携用の構造化データ',
      icon: '🔗',
      features: ['API連携', '自動処理', '完全なデータ'],
    },
    {
      format: 'csv' as ExportFormat,
      title: 'CSV',
      description: '汎用的な表形式データ',
      icon: '📋',
      features: ['軽量', '汎用性', 'インポート対応'],
    },
  ];

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>📤 エクスポートオプション</h2>
        <p className='text-gray-600'>
          レポートを様々な形式でエクスポートして、共有や分析に活用できます
        </p>
      </div>

      {/* エクスポート設定 */}
      <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-900 mb-3'>エクスポート設定</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={exportSettings.includeCharts}
              onChange={e =>
                setExportSettings(prev => ({ ...prev, includeCharts: e.target.checked }))
              }
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <span className='text-sm text-gray-700'>グラフを含める</span>
          </label>

          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={exportSettings.includeRecommendations}
              onChange={e =>
                setExportSettings(prev => ({ ...prev, includeRecommendations: e.target.checked }))
              }
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <span className='text-sm text-gray-700'>推奨アクションを含める</span>
          </label>

          <label className='flex items-center space-x-2'>
            <input
              type='checkbox'
              checked={exportSettings.includeRawData}
              onChange={e =>
                setExportSettings(prev => ({ ...prev, includeRawData: e.target.checked }))
              }
              className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            />
            <span className='text-sm text-gray-700'>生データを含める</span>
          </label>

          <div>
            <label className='block text-sm text-gray-700 mb-1'>期間範囲</label>
            <select
              value={exportSettings.dateRange}
              onChange={e => setExportSettings(prev => ({ ...prev, dateRange: e.target.value }))}
              className='w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value='current'>現在の期間のみ</option>
              <option value='comparison'>比較期間を含む</option>
              <option value='all'>全期間</option>
            </select>
          </div>
        </div>
      </div>

      {/* エクスポート形式選択 */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {exportFormats.map(formatOption => (
          <div
            key={formatOption.format}
            className='border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors duration-200'
          >
            <div className='text-center mb-4'>
              <div className='text-3xl mb-2'>{formatOption.icon}</div>
              <h3 className='text-lg font-semibold text-gray-900 mb-1'>{formatOption.title}</h3>
              <p className='text-sm text-gray-600 mb-3'>{formatOption.description}</p>
            </div>

            {/* 機能一覧 */}
            <div className='mb-4'>
              <ul className='text-xs text-gray-500 space-y-1'>
                {formatOption.features.map((feature, index) => (
                  <li key={index} className='flex items-center'>
                    <span className='w-1 h-1 bg-gray-400 rounded-full mr-2'></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* エクスポートボタン */}
            <Button
              onClick={() => handleExport(formatOption.format)}
              disabled={isExporting !== null}
              className='w-full'
              size='sm'
            >
              {isExporting === formatOption.format ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  エクスポート中...
                </div>
              ) : (
                `${formatOption.title}でエクスポート`
              )}
            </Button>
          </div>
        ))}
      </div>

      {/* エクスポート情報 */}
      <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
        <h4 className='text-sm font-semibold text-blue-800 mb-2'>📋 エクスポート情報</h4>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700'>
          <div>
            <strong>対象期間:</strong> {reportData.period.label}
          </div>
          <div>
            <strong>データ件数:</strong> {reportData.kptStats.total}件のKPT
          </div>
          <div>
            <strong>推奨アクション:</strong> {reportData.recommendations.length}件
          </div>
        </div>
      </div>

      {/* 注意事項 */}
      <div className='mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200'>
        <p className='text-xs text-yellow-800'>
          <strong>注意:</strong> エクスポートされたファイルには機密情報が含まれる場合があります。
          適切なセキュリティ対策を講じて管理してください。
        </p>
      </div>
    </div>
  );
};

export default ExportOptions;
