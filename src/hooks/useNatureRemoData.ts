'use client';

import { useState, useEffect, useCallback } from 'react';
import { RoomData } from '@/types/nature-remo';
import { createNatureRemoClient, generateMockRoomData } from '@/lib/nature-remo-client';

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

      const client = createNatureRemoClient();
      
      if (client) {
        // 実際のAPIからデータを取得
        const devices = await client.getDevices();
        const data = client.convertToRoomData(devices);
        setRoomData(data);
      } else {
        // APIトークンが設定されていない場合はモックデータを使用
        console.log('Using mock data (API token not configured)');
        const mockData = generateMockRoomData();
        setRoomData(mockData);
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
    }, 5 * 60 * 1000); // 5分 = 300,000ミリ秒

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
