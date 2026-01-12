# Nature Remo ホームダッシュボード

Nature Remo Cloud API を使用して、家の各部屋の温度・湿度・照度をリアルタイムでモニタリングするダッシュボードアプリケーションです。

## 機能

- 📊 **リアルタイムモニタリング**: 各部屋の温度、湿度、照度を表示
- 📈 **履歴グラフ**: 過去のデータをグラフで視覚化（6時間、24時間、3日間）
- 🕐 **現在時刻表示**: 年月日、時分秒、曜日を日本語で表示
- 🔄 **自動更新**: 5分ごとにデータを自動取得
- 🎨 **レスポンシブデザイン**: PC・タブレット・スマートフォンに対応
- 🌙 **ダークモード**: ライト/ダークテーマ自動切り替え対応

## 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org/) (App Router)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **グラフ**: [Recharts](https://recharts.org/)
- **日付処理**: [date-fns](https://date-fns.org/)
- **CI/CD**: GitHub Actions

## セットアップ

### 前提条件

- Node.js 20.x 以上
- npm または yarn
- Nature Remo アカウントと API トークン

### インストール手順

1. リポジトリをクローン

```bash
git clone https://github.com/Walkmana-25/nature-remo-home-dashboard.git
cd nature-remo-home-dashboard
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数を設定

`.env.example` をコピーして `.env` を作成し、Nature Remo API トークンを設定します。

```bash
cp .env.example .env
```

`.env` ファイルを編集:

```env
NEXT_PUBLIC_NATURE_REMO_API_TOKEN=your_actual_api_token_here
```

**Nature Remo API トークンの取得方法:**
1. [Nature Remo Home](https://home.nature.global/) にアクセス
2. ログイン後、設定からAPI トークンを生成

4. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてダッシュボードを確認できます。

## 使い方

### 本番ビルド

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

### モックデータモード

API トークンが設定されていない場合、自動的にモックデータを使用してダッシュボードが動作します。開発やデモ目的に便利です。

## プロジェクト構造

```
nature-remo-home-dashboard/
├── src/
│   ├── app/              # Next.js App Router ページ
│   │   ├── layout.tsx    # ルートレイアウト
│   │   └── page.tsx      # ダッシュボードページ
│   ├── components/       # React コンポーネント
│   │   ├── Clock.tsx     # 時計コンポーネント
│   │   ├── RoomCard.tsx  # 部屋カードコンポーネント
│   │   └── HistoryChart.tsx  # 履歴グラフコンポーネント
│   ├── hooks/            # カスタムフック
│   │   └── useNatureRemoData.ts  # データ取得フック
│   ├── lib/              # ユーティリティとAPI
│   │   └── nature-remo-client.ts  # Nature Remo API クライアント
│   └── types/            # TypeScript 型定義
│       └── nature-remo.ts
├── .github/
│   └── workflows/
│       └── ci-cd.yml     # CI/CD パイプライン
└── public/               # 静的ファイル
```

## CI/CD

GitHub Actions を使用した自動化:

- **Lint チェック**: コードスタイルの検証
- **ビルド**: 本番ビルドの確認
- **将来的な拡張**: 自動デプロイ（Vercel、AWS等）

## デプロイ

### Vercel へのデプロイ（推奨）

1. [Vercel](https://vercel.com) にサインアップ
2. GitHub リポジトリを連携
3. 環境変数 `NEXT_PUBLIC_NATURE_REMO_API_TOKEN` を設定
4. デプロイ

### その他のプラットフォーム

- **Docker**: Dockerfile を追加して Docker イメージをビルド
- **AWS / GCP / Azure**: 各種クラウドプラットフォームの Node.js ホスティングサービスを利用

## 機能拡張のアイデア

- [ ] 温度・湿度の閾値アラート
- [ ] データのエクスポート機能（CSV, JSON）
- [ ] 週次/月次レポート
- [ ] スマートホーム連携（照明、エアコン制御）
- [ ] PWA 対応（オフライン動作）
- [ ] データベース統合（履歴データの永続化）

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 貢献

プルリクエストを歓迎します！バグ報告や機能要望は Issue でお願いします。

## 作者

Walkmana-25

## 参考資料

- [Nature Remo API ドキュメント](https://developer.nature.global/)
- [Next.js ドキュメント](https://nextjs.org/docs)
- [Recharts ドキュメント](https://recharts.org/en-US/)

