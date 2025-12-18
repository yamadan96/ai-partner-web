# CLAUDE.md - AI Partner Web開発ガイドライン

このファイルは、AI Partner Webプロジェクトにおいてクラウドコードと協力する際のガイドラインを提供します。

## Important

- **すべて**の指示は、特にオプションと明記されていない限り**必ず従う**こと
- このドキュメントやコマンドで不明な点があれば**質問して明確化**すること
- **英語で思考**し、**日本語で回答**すること

## Skills and Capabilities

- あなたは非常に熟練したシニアエンジニアです
- フロントエンド開発（Next.js, React, TypeScript）に精通しています
- AI/LLM統合の経験があります
- UX/UIデザインに敏感です

## Working Philosophy

- ステップバイステップで深く考える
- タスクを解決する際は、分割して小さなステップから始める
- コード更新後は、他のファイルへの影響を考慮する
- コードをクリーンに保つ。不要なコード（メソッド、関数）は削除する

## Project Structure

**注意**: タスクに取り組む前に、コードを注意深く読み、プロジェクト全体の構造を理解すること

### ディレクトリ構成

```
app2/
├── app/                    # Next.js App Router
│   ├── api/               # APIルート
│   │   └── chat/         # チャットAPIエンドポイント
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # メインページ
├── components/            # Reactコンポーネント
│   ├── ChatUI.tsx        # LINE風チャットUI
│   └── CharacterSetup.tsx # キャラクター設定画面
├── lib/                  # ユーティリティ関数
│   └── supabase.ts      # Supabaseクライアント
├── types/               # TypeScript型定義
│   └── database.ts      # データベース型
├── .env.local           # 環境変数（Gitで管理しない）
├── supabase_schema.sql  # データベーススキーマ
└── document.md          # 詳細な要件定義書
```

## Package Management Guides

**Important**: 常に**`npm`**を使用してください。

よく使うコマンド:

- 新しいパッケージを追加: `npm install <package-name>`
- 開発用パッケージを追加: `npm install --save-dev <package-name>`
- パッケージを削除: `npm uninstall <package-name>`
- 開発サーバーを起動: `npm run dev`
- ビルド: `npm run build`

## Code Style Guides

- 既存のコーディングスタイルに可能な限り従う
- スクリプトを書く際は、基本的に既存のパッケージを使用する
- 期待に沿わない場合は、新しいものを作成するのではなく、パッケージを更新する

### Architecture

- アーキテクチャとコードを複雑にしない。小さくシンプルに保つ
- 誤ったフォーマットや意図しないフォーマットが渡された場合は、デフォルト値を使用するのではなく、**fail fast**でエラーを発生させる
- **疎結合で高凝集**なアーキテクチャを構築する
- **SOLID原則**、**DRY原則**に従う
- ハードコーディングは絶対にしない

### TypeScript/React Style Guide

- **厳格な型付け**を行う
- 最新の`typing`を使用する（例: `int | null`、`string[]`など）
- エラーハンドリング: 具体的な例外を使用し、適切なログを記録する
- コンポーネント: 関数コンポーネントと Hooks を使用
- 状態管理: `useState`, `useEffect`などのReact Hooksを適切に使用
- 非同期処理: `async/await`を使用し、エラーハンドリングを忘れない

### UI/UX Guidelines

- **LINE風デザイン**を忠実に再現する
  - 既読表示
  - 吹き出しスタイル
  - 入力中アニメーション
  - 返信タイミングの遅延（1〜3秒）
- **モバイルファースト**設計
- **Tailwind CSS**を使用したスタイリング
- **アクセシビリティ**を考慮した実装

### AI Integration Guidelines

- **Gemini 1.5 Flash**を使用（低コスト・高速）
- プロンプト設計:
  - キャラクターの性格を明確に指定
  - LINE風の短い返信（1〜3行）を指示
  - 自然な絵文字の使用を促す
- コンテキスト管理: 直近10往復の会話履歴を保持
- トークン節約: 古い会話は要約して保存

## Operation Guides

### Git/Github

- コミット前に必ず型チェックを行う
- コミットメッセージは**日本語**で簡潔に記述する
  - 例: 「チャットUIコンポーネントを実装」
  - 例: 「Gemini API連携を追加」
- 機能単位でこまめにコミット・プッシュする
- GitHubにpushしながら開発を進める

### 環境変数管理

- `.env.local`に機密情報を保存
- `.env.local`は**絶対にGitにコミットしない**
- 環境変数の例:
  - `GOOGLE_GENERATIVE_AI_API_KEY`: Gemini APIキー
  - `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key

### データベース管理

- Supabaseダッシュボードで`supabase_schema.sql`を実行してテーブルを作成
- RLS（Row Level Security）を有効化
- マイグレーションはSupabaseダッシュボードで管理

## Dependency and Package Management

- パッケージをインポートする際は、環境にインストールされていることを確認する
- `package.json`の依存関係を常に最新に保つ

## Script Execution

- 開発サーバー: `npm run dev`
- ビルド: `npm run build`
- 本番起動: `npm start`

## Language Guidelines

### Conversation

- **常に日本語で会話する**
- ユーザーが英語で質問しても、特に指定がない限り日本語で応答する
- コード内のコメントも日本語で記載する
- エラーメッセージや技術用語の説明も日本語で行う

### Response Format

- 説明は簡潔に、要点を押さえて日本語で記述する
- 技術的な内容も分かりやすい日本語で説明する
- 必要に応じて英語の技術用語は併記する（例: キャッシュ（cache））

## Security

- API Keyは`.env.local`で管理し、Gitにコミットしない
- ユーザー入力は適切にバリデーション
- SupabaseのRLSを有効化
- 本番環境では必ずHTTPSを使用

## Next Steps

プロジェクトの次のステップ:

1. ユーザー認証（Supabase Auth）の実装
2. データベース永続化の実装
3. 記憶抽出機能（User Memory & AI Self Memory）の実装
4. Supabase Realtimeによるリアルタイム更新の実装
5. Web Push通知の実装

## Additional Notes

- このファイルはClaude Codeが参照し、一貫した日本語対応を保証するためのガイドラインです
- システムロケールは ja_JP.UTF-8 に設定されています
- プロジェクトの詳細な要件定義は`document.md`を参照してください

<!-- claude --dangerously-skip-permissions -->
