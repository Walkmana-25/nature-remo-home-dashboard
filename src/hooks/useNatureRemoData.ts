'use client';

import { useState, useEffect, useCallback } from 'react';
import { RoomData } from '@/types/nature-remo';
import { generateMockRoomData } from '@/lib/nature-remo-client';

// ポーリング間隔（5分 = 300,000ミリ秒）
const POLLING_INTERVAL_MS = 5 * 60 * 1000;

/**
 * Nature Remo データを取得するカスタムフック
 * 5分ごとに自動更新する
 */
export function useNatureRemoData() {
  const [roomData, setRoomData] = useState<RoomData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // サーバーサイドAPIルートを呼び出し
      const response = await fetch('/api/nature-remo', {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.useMock) {
        // モックデータを使用
        console.log('Using mock data (API token not configured or error occurred)');
        if (data.error) {
          setError(data.error);
        }
        const mockData = generateMockRoomData();
        setRoomData(mockData);
      } else {
        // 実際のデータを使用
        setRoomData(data.roomData);
      }
      
      setLastFetched(new Date());
    } catch (err) {
      console.error('Failed to fetch Nature Remo data:', err);
      setError(err instanceof Error ? err.message : 'データの取得に失敗しました');
      
      // エラー時はモックデータにフォールバック
      const mockData = generateMockRoomData();
      setRoomData(mockData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 初回データ取得
    fetchData();

    // 5分ごとに自動更新
    const interval = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    roomData,
    isLoading,
    error,
    lastFetched,
    refetch: fetchData,
  };
}
