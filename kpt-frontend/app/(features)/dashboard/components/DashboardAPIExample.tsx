'use client';

import React, { useState, useEffect } from 'react';
import {
  useDashboards,
  useDashboard,
  useCreateDashboard,
  useUpdateDashboard,
  useDeleteDashboard,
  useDashboardStats,
  useRealtimeDashboardStats,
  useRecalculateDashboardStats,
  type CreateDashboardData,
  type UpdateDashboardData,
  type DashboardFilters,
  type RealtimeConfig,
} from '@/hooks/use-dashboard';
import { Button } from '@/components/ui';

/**
 * ダッシュボードAPI使用例コンポーネント
 * @returns {JSX.Element} コンポーネント
 */
export const DashboardAPIExample: React.FC = () => {
  // State管理
  const [selectedDashboardId, setSelectedDashboardId] = useState<string>('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [realtimeEnabled, setRealtimeEnabled] = useState(false);

  // フィルター設定
  const [filters] = useState<DashboardFilters>({
    period: 'week',
    includeStats: true,
    includeActivity: true,
  });

  // リアルタイム設定
  const [realtimeConfig] = useState<RealtimeConfig>({
    enabled: true,
    interval: 30, // 30秒間隔
    autoStop: true,
    maxDuration: 60, // 60分
  });

  // API フック
  const {
    items: dashboards,
    loading: dashboardsLoading,
    error: dashboardsError,
    refresh: refreshDashboards,
  } = useDashboards(filters);

  const {
    data: selectedDashboard,
    loading: dashboardLoading,
    error: dashboardError,
    execute: fetchDashboard,
  } = useDashboard(selectedDashboardId, filters);

  const {
    loading: createLoading,
    error: createError,
    execute: createDashboard,
  } = useCreateDashboard();

  const {
    loading: updateLoading,
    error: updateError,
    execute: executeUpdateDashboard,
  } = useUpdateDashboard();

  const {
    loading: deleteLoading,
    error: deleteError,
    execute: executeDeleteDashboard,
  } = useDeleteDashboard();

  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
    execute: fetchStats,
  } = useDashboardStats({
    period: 'week',
    metrics: ['sessions', 'items', 'completion_rate'],
  });

  const {
    data: realtimeStats,
    loading: realtimeLoading,
    error: realtimeError,
    isConnected,
    start: startRealtime,
    stop: stopRealtime,
    refresh: refreshRealtimeStats,
  } = useRealtimeDashboardStats(realtimeConfig, {
    period: 'week',
    metrics: ['sessions', 'items'],
  });

  const {
    loading: recalculateLoading,
    error: recalculateError,
    execute: executeRecalculateStats,
  } = useRecalculateDashboardStats();

  // 選択されたダッシュボード取得
  useEffect(() => {
    if (selectedDashboardId) {
      fetchDashboard();
    }
  }, [selectedDashboardId, fetchDashboard]);

  // リアルタイム更新の制御
  useEffect(() => {
    if (realtimeEnabled) {
      startRealtime();
    } else {
      stopRealtime();
    }

    return () => {
      stopRealtime();
    };
  }, [realtimeEnabled, startRealtime, stopRealtime]);

  /**
   * ダッシュボード作成ハンドラー
   */
  const handleCreateDashboard = async () => {
    const dashboardData: CreateDashboardData = {
      name: 'サンプルダッシュボード',
      description: 'APIテスト用のダッシュボード',
      settings: {
        displayPeriod: 'week',
        widgetLayout: [
          {
            id: 'stats-overview',
            x: 0,
            y: 0,
            width: 6,
            height: 4,
            visible: true,
          },
          {
            id: 'recent-activity',
            x: 6,
            y: 0,
            width: 6,
            height: 4,
            visible: true,
          },
        ],
        theme: 'auto',
        density: 'normal',
        autoRefreshInterval: 60,
        visibleStats: ['sessions', 'items', 'completion_rate'],
        chartSettings: {
          type: 'line',
          colorScheme: 'blue',
          animationEnabled: true,
        },
      },
      isDefault: false,
    };

    const result = await createDashboard(dashboardData);
    if (result) {
      setShowCreateForm(false);
      refreshDashboards();
    }
  };

  /**
   * ダッシュボード更新ハンドラー
   */
  const handleUpdateDashboard = async () => {
    if (!selectedDashboardId) return;

    const updateData: UpdateDashboardData = {
      name: '更新されたダッシュボード',
      settings: {
        displayPeriod: 'month',
        autoRefreshInterval: 120,
      },
    };

    const result = await (executeUpdateDashboard as any)(selectedDashboardId, updateData);
    if (result) {
      setShowUpdateForm(false);
      fetchDashboard();
      refreshDashboards();
    }
  };

  /**
   * ダッシュボード削除ハンドラー
   */
  const handleDeleteDashboard = async (id: string, force: boolean = false) => {
    const confirmed = window.confirm('本当に削除しますか？');
    if (!confirmed) return;

    await (executeDeleteDashboard as any)(id, force);
    if (selectedDashboardId === id) {
      setSelectedDashboardId('');
    }
    refreshDashboards();
  };

  /**
   * 統計データ再計算ハンドラー
   */
  const handleRecalculateStats = async () => {
    await (executeRecalculateStats as any)('week', true);
    fetchStats();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボードAPI使用例</h1>

      {/* ダッシュボード一覧セクション */}
      <section className="border p-4 rounded-button">
        <h2 className="text-xl font-semibold mb-4">ダッシュボード一覧（INDEX）</h2>
        
        <div className="mb-4">
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-button mr-2"
            disabled={createLoading}
          >
            {createLoading ? '作成中...' : '新規作成'}
          </Button>
          <Button
            onClick={refreshDashboards}
            className="bg-gray-500 text-white px-4 py-2 rounded-button"
            disabled={dashboardsLoading}
          >
            {dashboardsLoading ? '読み込み中...' : '更新'}
          </Button>
        </div>

        {dashboardsError && (
          <div className="text-red-500 mb-4">エラー: {dashboardsError}</div>
        )}

        {createError && (
          <div className="text-red-500 mb-4">作成エラー: {createError}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboards.map((dashboard) => (
            <div key={dashboard.id} className="border p-3 rounded-button">
              <h3 className="font-medium">{dashboard.name}</h3>
              <p className="text-sm text-gray-600">{dashboard.description}</p>
              <div className="mt-2 space-x-2">
                <Button
                  onClick={() => setSelectedDashboardId(dashboard.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded-button text-sm"
                >
                  詳細
                </Button>
                <Button
                  onClick={() => {
                    setSelectedDashboardId(dashboard.id);
                    setShowUpdateForm(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-button text-sm"
                >
                  編集
                </Button>
                <Button
                  onClick={() => handleDeleteDashboard(dashboard.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-button text-sm"
                  disabled={deleteLoading}
                >
                  削除
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ダッシュボード詳細セクション */}
      {selectedDashboardId && (
        <section className="border p-4 rounded-button">
          <h2 className="text-xl font-semibold mb-4">ダッシュボード詳細（SHOW）</h2>
          
          {dashboardError && (
            <div className="text-red-500 mb-4">エラー: {dashboardError}</div>
          )}

          {dashboardLoading ? (
            <div>読み込み中...</div>
          ) : selectedDashboard ? (
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedDashboard.id}</p>
              <p><strong>名前:</strong> {selectedDashboard.name}</p>
              <p><strong>説明:</strong> {selectedDashboard.description}</p>
              <p><strong>表示期間:</strong> {selectedDashboard.settings.displayPeriod}</p>
              <p><strong>テーマ:</strong> {selectedDashboard.settings.theme}</p>
              <p><strong>密度:</strong> {selectedDashboard.settings.density}</p>
              <p><strong>自動更新間隔:</strong> {selectedDashboard.settings.autoRefreshInterval}秒</p>
              <p><strong>デフォルト:</strong> {selectedDashboard.isDefault ? 'はい' : 'いいえ'}</p>
            </div>
          ) : null}
        </section>
      )}

      {/* 統計データセクション */}
      <section className="border p-4 rounded-button">
        <h2 className="text-xl font-semibold mb-4">統計データ</h2>
        
        <div className="mb-4 space-x-2">
          <button
            onClick={fetchStats}
            className="bg-blue-500 text-white px-4 py-2 rounded-button"
            disabled={statsLoading}
          >
            {statsLoading ? '取得中...' : '統計取得'}
          </button>
          <button
            onClick={handleRecalculateStats}
            className="bg-purple-500 text-white px-4 py-2 rounded-button"
            disabled={recalculateLoading}
          >
            {recalculateLoading ? '再計算中...' : '再計算'}
          </button>
        </div>

        {statsError && (
          <div className="text-red-500 mb-4">エラー: {statsError}</div>
        )}

        {recalculateError && (
          <div className="text-red-500 mb-4">再計算エラー: {recalculateError}</div>
        )}

        {stats && (
          <div className="bg-gray-50 p-3 rounded-button">
            <p><strong>期間:</strong> {stats.period}</p>
            <p><strong>セッション:</strong> {stats.sessions.total}件 (完了: {stats.sessions.completed}件)</p>
            <p><strong>アイテム:</strong> {stats.items.total}件 (アクティブ: {stats.items.active}件)</p>
          </div>
        )}
      </section>

      {/* リアルタイム更新セクション */}
      <section className="border p-4 rounded-button">
        <h2 className="text-xl font-semibold mb-4">リアルタイム更新</h2>
        
        <div className="mb-4 space-x-2">
          <Button
            onClick={() => setRealtimeEnabled(!realtimeEnabled)}
            className={`px-4 py-2 rounded-button ${
              realtimeEnabled ? 'bg-red-500' : 'bg-green-500'
            } text-white`}
          >
            {realtimeEnabled ? 'リアルタイム停止' : 'リアルタイム開始'}
          </Button>
          <Button
            onClick={refreshRealtimeStats}
            className="bg-blue-500 text-white px-4 py-2 rounded-button"
            disabled={realtimeLoading}
          >
            手動更新
          </Button>
        </div>

        <div className="mb-4">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-gray-500'
          }`}></span>
          状態: {isConnected ? '接続中' : '停止中'}
        </div>

        {realtimeError && (
          <div className="text-red-500 mb-4">エラー: {realtimeError}</div>
        )}

        {realtimeStats && (
          <div className="bg-gray-50 p-3 rounded-button">
            <p><strong>最終更新:</strong> {realtimeStats.lastUpdated}</p>
            <p><strong>セッション:</strong> {realtimeStats.sessions.total}件</p>
            <p><strong>アイテム:</strong> {realtimeStats.items.total}件</p>
          </div>
        )}
      </section>

      {/* 作成フォームモーダル */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-button max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">ダッシュボード作成（NEW）</h3>
            <p className="mb-4">サンプルダッシュボードを作成します。</p>
            <div className="space-x-2">
              <button
                onClick={handleCreateDashboard}
                className="bg-blue-500 text-white px-4 py-2 rounded-button"
                disabled={createLoading}
              >
                {createLoading ? '作成中...' : '作成'}
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-button"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 更新フォームモーダル */}
      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-button max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">ダッシュボード更新（EDIT）</h3>
            <p className="mb-4">ダッシュボード設定を更新します。</p>
            {updateError && (
              <div className="text-red-500 mb-4">エラー: {updateError}</div>
            )}
            <div className="space-x-2">
              <button
                onClick={handleUpdateDashboard}
                className="bg-yellow-500 text-white px-4 py-2 rounded-button"
                disabled={updateLoading}
              >
                {updateLoading ? '更新中...' : '更新'}
              </button>
              <button
                onClick={() => setShowUpdateForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-button"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="text-red-500">削除エラー: {deleteError}</div>
      )}
    </div>
  );
};

export default DashboardAPIExample; 