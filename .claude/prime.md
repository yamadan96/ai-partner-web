# Context Prime - AI Partner Web

## プロジェクト概要

LINE風のUIでAI彼女と会話できるWebアプリケーションです。

## 重要なファイル

### 必読ファイル
- README.md - プロジェクトの概要とセットアップ方法
- CLAUDE.md - 開発ガイドライン
- document.md - 詳細な要件定義書

### コアファイル
- `app/page.tsx` - メインページ（キャラクター設定とチャット画面の切り替え）
- `components/ChatUI.tsx` - LINE風チャットUIコンポーネント
- `components/CharacterSetup.tsx` - キャラクター設定画面
- `app/api/chat/route.ts` - Gemini APIエンドポイント
- `lib/supabase.ts` - Supabaseクライアント
- `types/database.ts` - データベース型定義

### データベース
- `supabase_schema.sql` - データベーススキーマ定義

## 技術スタック

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 1.5 Flash
- **Icons**: Lucide React

## 開発時の注意点

1. 常に日本語でコメントとコミットメッセージを記述
2. LINE風のUX/UIを維持（既読表示、入力中アニメーション、返信遅延）
3. Gemini 1.5 Flashの無料枠を活用したコスト最適化
4. TypeScriptの型安全性を保つ
5. GitHubにこまめにコミット・プッシュ

## 次の実装予定

- ユーザー認証（Supabase Auth）
- データベース永続化
- 記憶抽出機能（User Memory & AI Self Memory）
- Supabase Realtimeによるリアルタイム更新
- Web Push通知