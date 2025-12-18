# AI Partner Web - LINE風AI彼女チャットアプリ

LINE風のUIでAI彼女と会話できるWebアプリケーションです。
<img width="441" height="614" alt="image" src="https://github.com/user-attachments/assets/8a5663da-4ed5-421a-85d9-1f4b4b9698fe" />

## 🌐 デモ

**本番環境:** https://ai-partner-web-git-main-yutos-projects-0ab0dad3.vercel.app/

**GitHubリポジトリ:** https://github.com/yamadan96/ai-partner-web

## 機能

- **キャラクターカスタマイズ**: AI生成画像または独自画像でアバターを設定
- **ユーザー名設定**: あなたの名前を設定してAIに呼んでもらえる
- **LINE風チャット**: 既読表示、入力中アニメーション、返信タイミングの制御
- **AI会話エンジン**: Gemini 2.5 Flashを使用した自然な会話
- **記憶機能**: ユーザーとAIの記憶を保持（実装予定）
- **リアルタイム通信**: Supabase Realtimeによる即座な更新（実装予定）

## 技術スタック

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS v3
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 2.5 Flash
- **UI Icons**: Lucide React
- **Deployment**: Vercel

## セットアップ

### 環境変数

`.env.local`ファイルを作成し、以下を設定してください:

\`\`\`env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

### インストールと起動

\`\`\`bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
\`\`\`

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### データベースのセットアップ

Supabaseダッシュボードで`supabase_schema.sql`を実行してテーブルを作成してください。

## ロードマップ

- [x] プロジェクトセットアップ
- [x] LINE風チャットUI
- [x] キャラクター設定画面
- [x] Gemini 2.5 Flash API連携
- [x] ユーザー名設定機能
- [x] Vercelへのデプロイ
- [ ] ユーザー認証（Supabase Auth）
- [ ] Supabaseデータベース連携（会話履歴の永続化）
- [ ] 記憶抽出機能（User Memory & AI Self Memory）
- [ ] Supabase Realtime通信
- [ ] Web Push通知

## ライセンス

ISC
