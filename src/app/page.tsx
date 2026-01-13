'use client';

import { Clock } from '@/components/Clock';
import { RoomCard } from '@/components/RoomCard';
import { HistoryChart } from '@/components/HistoryChart';
import { useNatureRemoData } from '@/hooks/useNatureRemoData';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * Nature Remo ホームダッシュボード
 * 温度、湿度、照度を部屋ごとに表示し、履歴データをグラフで表示する
 */
export default function Home() {
  const { roomData, isLoading, error, lastFetched, refetch } = useNatureRemoData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ヘッダー */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Nature Remo ホームダッシュボード
          </h1>
          <Clock />
        </header>

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200">
              ⚠️ {error}
            </p>
            <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
              モックデータを表示しています
            </p>
          </div>
        )}

        {/* 最終更新時刻と更新ボタン */}
        <div className="mb-6 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {lastFetched && (
              <>
                最終更新: {format(lastFetched, 'yyyy年M月d日 HH:mm:ss', { locale: ja })}
                <span className="ml-2 text-xs text-gray-500">
                  (5分ごとに自動更新)
                </span>
              </>
            )}
          </div>
          <button
            onClick={refetch}
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-live="polite"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors"
          >
            {isLoading ? '更新中...' : '今すぐ更新'}
          </button>
        </div>

        {/* 現在値カード */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            現在の状態
          </h2>
          {isLoading && roomData.length === 0 ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-400">
              読み込み中...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomData.map((room) => (
                <RoomCard key={room.name} room={room} />
              ))}
            </div>
          )}
        </section>

        {/* 履歴グラフ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            履歴データ
          </h2>
          <div className="space-y-6">
            {roomData.map((room) => (
              <HistoryChart key={room.name} roomName={room.name} />
            ))}
          </div>
        </section>

        {/* フッター */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Nature Remo API を使用した温度・湿度・照度モニタリングシステム</p>
        </footer>
      </div>
    </div>
  );
}
