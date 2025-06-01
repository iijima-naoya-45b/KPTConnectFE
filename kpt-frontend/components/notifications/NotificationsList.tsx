/**
 * @fileoverview 通知一覧コンポーネント
 * @description 通知の一覧表示、フィルタリング、アクション機能を提供
 * @version 1.0.0
 * @author KPT Connect Team
 */

import React, { useState } from 'react';
import { Bell, Filter, Check, CheckCheck, Trash2, X, AlertCircle, Info, Clock } from 'lucide-react';
import { useNotifications, type NotificationFilters } from '@/hooks/use-notifications';
import { 
  getNotificationTypeLabel, 
  getPriorityClass,
  type Notification 
} from '@/lib/api/notifications';

/**
 * 通知一覧コンポーネントのプロパティ型
 */
interface NotificationsListProps {
  className?: string;
  maxHeight?: string;
  showFilters?: boolean;
  onNotificationClick?: (notification: Notification) => void;
}

/**
 * 通知アイテムコンポーネント
 */
const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick?: (notification: Notification) => void;
}> = ({ notification, onMarkAsRead, onDelete, onClick }) => {
  const handleItemClick = () => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id);
    }
    onClick?.(notification);
  };

  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  const getNotificationIcon = (type: string, priority: string) => {
    if (priority === 'urgent') {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
    
    switch (type) {
      case 'kpt_reminder':
      case 'item_due':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'achievement':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'system':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div
      className={`
        p-4 border-b border-gray-200 cursor-pointer transition-colors
        hover:bg-gray-50 ${!notification.is_read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}
      `}
      onClick={handleItemClick}
    >
      <div className="flex items-start space-x-3">
        {/* 通知アイコン */}
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type, notification.priority)}
        </div>

        {/* 通知内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h4 className={`text-sm font-medium ${!notification.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                {notification.title}
              </h4>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityClass(notification.priority)}`}>
                {notification.priority_ja}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {notification.time_ago}
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {notification.message}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {getNotificationTypeLabel(notification.type)}
            </span>

            {/* アクションボタン */}
            <div className="flex items-center space-x-2">
              {!notification.is_read && (
                <button
                  onClick={(e) => handleActionClick(e, () => onMarkAsRead(notification.id))}
                  className="text-blue-600 hover:text-blue-800 text-xs"
                  title="既読にする"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={(e) => handleActionClick(e, () => onDelete(notification.id))}
                className="text-red-600 hover:text-red-800 text-xs"
                title="削除"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * フィルターコンポーネント
 */
const NotificationFilters: React.FC<{
  filters: NotificationFilters;
  onFiltersChange: (filters: NotificationFilters) => void;
  priorityCounts: Record<string, number>;
  onClearFilters: () => void;
}> = ({ filters, onFiltersChange, priorityCounts, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = filters.type || filters.is_read !== undefined || filters.priority;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-3 py-2 text-sm border rounded-md
          ${hasActiveFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}
          hover:bg-gray-50 transition-colors
        `}
      >
        <Filter className="w-4 h-4" />
        <span>フィルター</span>
        {hasActiveFilters && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            適用中
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">フィルター設定</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 通知タイプフィルター */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                通知タイプ
              </label>
              <select
                value={filters.type || ''}
                onChange={(e) => onFiltersChange({ ...filters, type: e.target.value || undefined })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                <option value="kpt_reminder">KPTリマインダー</option>
                <option value="item_due">アイテム期限</option>
                <option value="kpt_session_completed">KPTセッション完了</option>
                <option value="weekly_summary">週次サマリー</option>
                <option value="achievement">実績解除</option>
                <option value="system">システム通知</option>
              </select>
            </div>

            {/* 既読状態フィルター */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                既読状態
              </label>
              <select
                value={filters.is_read === undefined ? '' : filters.is_read.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  onFiltersChange({ 
                    ...filters, 
                    is_read: value === '' ? undefined : value === 'true'
                  });
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                <option value="false">未読のみ</option>
                <option value="true">既読のみ</option>
              </select>
            </div>

            {/* 優先度フィルター */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                優先度
              </label>
              <select
                value={filters.priority || ''}
                onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value || undefined })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                <option value="urgent">緊急 ({priorityCounts.urgent || 0})</option>
                <option value="high">高 ({priorityCounts.high || 0})</option>
                <option value="normal">通常 ({priorityCounts.normal || 0})</option>
                <option value="low">低 ({priorityCounts.low || 0})</option>
              </select>
            </div>

            {/* アクションボタン */}
            <div className="flex space-x-2 pt-2">
              <button
                onClick={onClearFilters}
                className="flex-1 px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                クリア
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                適用
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * 通知一覧コンポーネント
 */
export const NotificationsList: React.FC<NotificationsListProps> = ({
  className = '',
  maxHeight = '600px',
  showFilters = true,
  onNotificationClick,
}) => {
  const [filters, setFilters] = useState<NotificationFilters>({});
  
  const {
    notifications,
    loading,
    error,
    hasMore,
    totalCount,
    unreadCount,
    priorityCounts,
    fetchNotifications,
    loadMore,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshNotifications,
  } = useNotifications(filters);

  const handleFiltersChange = (newFilters: NotificationFilters) => {
    setFilters(newFilters);
    fetchNotifications(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    fetchNotifications(clearedFilters);
  };

  if (error) {
    return (
      <div className={`p-6 text-center ${className}`}>
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={refreshNotifications}
          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
      {/* ヘッダー */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900">通知</h2>
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
              {totalCount}件
            </span>
            {unreadCount > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                未読{unreadCount}件
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* 全既読ボタン */}
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
                title="すべて既読にする"
              >
                <CheckCheck className="w-4 h-4" />
                <span>全既読</span>
              </button>
            )}

            {/* フィルター */}
            {showFilters && (
              <NotificationFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                priorityCounts={priorityCounts}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>
        </div>
      </div>

      {/* 通知一覧 */}
      <div style={{ maxHeight }} className="overflow-y-auto">
        {loading && notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">読み込み中...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">通知はありません</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
                onClick={onNotificationClick}
              />
            ))}

            {/* 読み込み更多按钮 */}
            {hasMore && (
              <div className="p-4 text-center border-t border-gray-200">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
                >
                  {loading ? '読み込み中...' : 'さらに読み込む'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsList; 