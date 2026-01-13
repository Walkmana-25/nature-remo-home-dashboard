'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

/**
 * 現在時刻を表示するコンポーネント
 * 年月日、時分秒、曜日を日本語で表示
 */
export function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-md">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {format(currentTime, 'yyyy年M月d日 (EEEE)', { locale: ja })}
      </div>
      <div className="text-4xl font-bold text-gray-900 dark:text-white tabular-nums">
        {format(currentTime, 'HH:mm:ss')}
      </div>
    </div>
  );
}
