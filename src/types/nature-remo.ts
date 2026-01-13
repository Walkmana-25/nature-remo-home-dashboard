/**
 * Nature Remo API の型定義
 */

/**
 * デバイスのセンサー情報
 */
export interface SensorValue {
  /** 温度 (℃) */
  temperature?: number;
  /** 湿度 (%) */
  humidity?: number;
  /** 照度 */
  illumination?: number;
  /** 測定日時 */
  created_at: string;
}

/**
 * 最新のセンサー値
 */
export interface NewestEvents {
  /** 温度イベント */
  te?: SensorValue;
  /** 湿度イベント */
  hu?: SensorValue;
  /** 照度イベント */
  il?: SensorValue;
}

/**
 * デバイス情報
 */
export interface Device {
  /** デバイスID */
  id: string;
  /** デバイス名 */
  name: string;
  /** 温度オフセット */
  temperature_offset: number;
  /** 湿度オフセット */
  humidity_offset: number;
  /** 作成日時 */
  created_at: string;
  /** 更新日時 */
  updated_at: string;
  /** ファームウェアバージョン */
  firmware_version: string;
  /** MACアドレス */
  mac_address: string;
  /** BTMACアドレス */
  bt_mac_address: string;
  /** シリアル番号 */
  serial_number: string;
  /** 最新のセンサーイベント */
  newest_events: NewestEvents;
}

/**
 * 部屋ごとのセンサーデータ（表示用）
 */
export interface RoomData {
  /** 部屋名 */
  name: string;
  /** 温度 (℃) */
  temperature?: number;
  /** 湿度 (%) */
  humidity?: number;
  /** 照度 */
  illumination?: number;
  /** 最終更新日時 */
  lastUpdated: Date;
}

/**
 * 履歴データのポイント
 */
export interface HistoryDataPoint {
  /** タイムスタンプ */
  timestamp: Date;
  /** 温度 (℃) */
  temperature?: number;
  /** 湿度 (%) */
  humidity?: number;
  /** 照度 */
  illumination?: number;
}

/**
 * 部屋ごとの履歴データ
 */
export interface RoomHistoryData {
  /** 部屋名 */
  roomName: string;
  /** 履歴データポイント */
  data: HistoryDataPoint[];
}
