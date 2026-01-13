'use client';

import { RoomData } from '@/types/nature-remo';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface RoomCardProps {
  room: RoomData;
}

/**
 * 部屋ごとの現在のセンサー値を表示するカードコンポーネント
 */
export function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {room.name}
      </h3>
      
      <div className="space-y-4">
        {/* 温度 */}
        {room.temperature !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌡️</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">温度</span>
            </div>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400 tabular-nums">
              {(typeof room.temperature === 'number' && !isNaN(room.temperature) 
                ? room.temperature 
                : 0).toFixed(1)}°C
            </span>
          </div>
        )}
        
        {/* 湿度 */}
        {room.humidity !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💧</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">湿度</span>
            </div>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
              {(typeof room.humidity === 'number' && !isNaN(room.humidity) 
                ? room.humidity 
                : 0).toFixed(1)}%
            </span>
          </div>
        )}
        
        {/* 照度 */}
        {room.illumination !== undefined && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💡</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">照度</span>
            </div>
            <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 tabular-nums">
              {(typeof room.illumination === 'number' && !isNaN(room.illumination) 
                ? room.illumination 
                : 0).toFixed(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          最終更新: {format(room.lastUpdated, 'HH:mm:ss', { locale: ja })}
        </p>
      </div>
    </div>
  );
}
