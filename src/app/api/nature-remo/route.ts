import { NextResponse } from 'next/server';
import { NatureRemoClient } from '@/lib/nature-remo-client';

/**
 * Nature Remo デバイス情報取得API
 * サーバーサイドでAPIトークンを使用してデータを取得
 */
export async function GET() {
  try {
    // サーバーサイド環境変数からAPIトークンを取得
    const apiToken = process.env.NATURE_REMO_API_TOKEN;
    
    if (!apiToken) {
      // APIトークンが設定されていない場合はモックデータを返す
      return NextResponse.json({
        useMock: true,
        devices: [],
      });
    }
    
    const client = new NatureRemoClient(apiToken);
    const devices = await client.getDevices();
    const roomData = client.convertToRoomData(devices);
    
    return NextResponse.json({
      useMock: false,
      roomData,
    });
  } catch (error) {
    console.error('Failed to fetch Nature Remo data:', error);
    
    // エラー時はモックデータを使用するように指示
    return NextResponse.json({
      useMock: true,
      error: error instanceof Error ? error.message : 'データの取得に失敗しました',
    }, { status: 200 }); // クライアント側でモックデータにフォールバックできるように200を返す
  }
}
