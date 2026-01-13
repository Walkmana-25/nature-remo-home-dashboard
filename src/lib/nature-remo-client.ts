import { Device, RoomData, HistoryDataPoint } from '@/types/nature-remo';

/**
 * Nature Remo API クライアント
 */
export class NatureRemoClient {
  private apiToken: string;
  private baseUrl = 'https://api.nature.global';

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  /**
   * デバイス一覧を取得
   */
  async getDevices(): Promise<Device[]> {
    const response = await fetch(`${this.baseUrl}/1/devices`, {
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * デバイス情報を部屋ごとのデータに変換
   */
  convertToRoomData(devices: Device[]): RoomData[] {
    return devices.map(device => {
      const { newest_events } = device;
      
      return {
        name: device.name,
        temperature: newest_events.te?.temperature,
        humidity: newest_events.hu?.humidity,
        illumination: newest_events.il?.illumination,
        lastUpdated: new Date(
          newest_events.te?.created_at || 
          newest_events.hu?.created_at || 
          newest_events.il?.created_at || 
          device.updated_at
        ),
      };
    });
  }
}

/**
 * モックデータを生成（開発用）
 */
export function generateMockRoomData(): RoomData[] {
  const rooms = ['リビング', '寝室', '書斎'];
  const now = new Date();
  
  return rooms.map(name => ({
    name,
    temperature: 20 + Math.random() * 8, // 20-28℃
    humidity: 40 + Math.random() * 30, // 40-70%
    illumination: Math.random() * 100, // 0-100
    lastUpdated: now,
  }));
}

/**
 * 文字列から決定論的な数値オフセットを生成（部屋ごとのパターン分け用）
 */
function getRoomOffset(roomName: string): number {
  let hash = 0;
  for (let i = 0; i < roomName.length; i++) {
    hash = ((hash << 5) - hash) + roomName.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  // 0 以上 1 未満の範囲に正規化
  return Math.abs(hash % 1000) / 1000;
}

/**
 * モック履歴データを生成（開発用）
 * roomName を使用して部屋ごとに異なるパターンを生成
 */
export function generateMockHistoryData(roomName: string, hours: number = 24): HistoryDataPoint[] {
  const data: HistoryDataPoint[] = [];
  const now = new Date();
  const roomOffset = getRoomOffset(roomName);
  const temperaturePhaseOffset = roomOffset * 2 * Math.PI;
  const humidityPhaseOffset = roomOffset * 2 * Math.PI;
  const illuminationPhaseOffset = roomOffset * 2 * Math.PI;
  
  for (let i = hours * 12; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000); // 5分ごと
    data.push({
      timestamp,
      temperature: 22 + Math.sin(i / 12 + temperaturePhaseOffset) * 4 + Math.random() * 2,
      humidity: 50 + Math.sin(i / 6 + humidityPhaseOffset) * 15 + Math.random() * 5,
      illumination: Math.max(
        0,
        50 + Math.sin(i / 6 + illuminationPhaseOffset) * 40 + Math.random() * 20
      ),
    });
  }
  
  return data;
}
