'use client';

import { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { generateMockHistoryData } from '@/lib/nature-remo-client';
import { HistoryDataPoint } from '@/types/nature-remo';

type DataType = 'temperature' | 'humidity' | 'illumination';

interface HistoryChartProps {
  roomName: string;
  /**
   * 親コンポーネントから渡される履歴データ（任意）
   * 未指定の場合はモックデータを使用
   */
  historyData?: HistoryDataPoint[];
}

/**
 * 履歴データをグラフで表示するコンポーネント
 */
export function HistoryChart({ roomName, historyData: externalHistoryData }: HistoryChartProps) {
  const [selectedType, setSelectedType] = useState<DataType>('temperature');
  const [timeRange, setTimeRange] = useState<number>(24); // 時間単位

  // 履歴データを決定：親から渡されたデータがあればそれを使用し、なければモックデータを生成
  const historyData = useMemo(() => {
    if (externalHistoryData && externalHistoryData.length > 0) {
      return externalHistoryData;
    }
    // フォールバックとしてモックデータを使用（将来的には API から取得）
    return generateMockHistoryData(roomName, timeRange);
  }, [externalHistoryData, roomName, timeRange]);

  // 履歴データから、フォーマット済みの時間と各種値を事前計算
  const baseChartData = useMemo(
    () =>
      historyData.map(point => ({
        time: format(point.timestamp, 'MM/dd HH:mm', { locale: ja }),
        temperature: point.temperature ?? 0,
        humidity: point.humidity ?? 0,
        illumination: point.illumination ?? 0,
      })),
    [historyData],
  );

  // グラフ用のデータを整形（選択された種類に応じて値のみ切り替える）
  const chartData = useMemo(
    () =>
      baseChartData.map(point => ({
        time: point.time,
        value: point[selectedType],
      })),
    [baseChartData, selectedType],
  );

  const getConfig = (type: DataType) => {
    switch (type) {
      case 'temperature':
        return { label: '温度 (°C)', color: '#ef4444', unit: '°C' };
      case 'humidity':
        return { label: '湿度 (%)', color: '#3b82f6', unit: '%' };
      case 'illumination':
        return { label: '照度', color: '#eab308', unit: '' };
    }
  };

  const config = getConfig(selectedType);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {roomName} - 履歴データ
        </h3>
        
        <div className="flex flex-wrap gap-4 mb-4">
          {/* データ種別選択 */}
          <div className="flex gap-2" role="group" aria-label="データ種別選択">
            <button
              onClick={() => setSelectedType('temperature')}
              aria-pressed={selectedType === 'temperature'}
              aria-label="温度を表示"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedType === 'temperature'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              温度
            </button>
            <button
              onClick={() => setSelectedType('humidity')}
              aria-pressed={selectedType === 'humidity'}
              aria-label="湿度を表示"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedType === 'humidity'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              湿度
            </button>
            <button
              onClick={() => setSelectedType('illumination')}
              aria-pressed={selectedType === 'illumination'}
              aria-label="照度を表示"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                selectedType === 'illumination'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              照度
            </button>
          </div>

          {/* 時間範囲選択 */}
          <div className="flex gap-2" role="group" aria-label="時間範囲選択">
            <button
              onClick={() => setTimeRange(6)}
              aria-pressed={timeRange === 6}
              aria-label="6時間のデータを表示"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                timeRange === 6
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              6時間
            </button>
            <button
              onClick={() => setTimeRange(24)}
              aria-pressed={timeRange === 24}
              aria-label="24時間のデータを表示"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                timeRange === 24
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              24時間
            </button>
            <button
              onClick={() => setTimeRange(72)}
              aria-pressed={timeRange === 72}
              aria-label="3日間のデータを表示"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                timeRange === 72
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              3日間
            </button>
          </div>
        </div>
      </div>

      {/* グラフ */}
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              label={{ value: config.label, angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value) => {
                const numValue = typeof value === 'number' ? value : 0;
                return [`${numValue.toFixed(1)}${config.unit}`, config.label];
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={config.color} 
              name={config.label}
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
