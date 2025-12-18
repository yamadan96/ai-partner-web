# AI Partner Web - セットアップガイド

このドキュメントでは、AI Partner Webアプリケーションのセットアップ手順を説明します。

## 完成した機能

✅ **プロジェクトの基本構造**
- Next.js 15 + React 19 + TypeScript
- Tailwind CSSによるスタイリング
- Lucide Reactによるアイコン

✅ **LINE風チャットUI**
- 吹き出しスタイル
- 既読表示
- 入力中アニメーション
- 返信タイミングの遅延（1〜3秒）

✅ **キャラクター設定画面**
- AI生成アバター選択（4種類）
- カスタム画像アップロード
- 名前・関係性・性格の設定

✅ **Gemini API連携**
- Gemini 1.5 Flashを使用した会話生成
- キャラクターの性格に基づいたプロンプト設計
- 会話履歴の保持（直近10往復）

✅ **データベース設計**
- Supabaseのテーブルスキーマ作成
- 型定義の完備

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseデータベースのセットアップ

1. Supabaseダッシュボード（https://supabase.com/dashboard）にログイン
2. SQL Editorを開く
3. `supabase_schema.sql`の内容をコピー&ペーストして実行
4. テーブルが正しく作成されたことを確認

### 3. Supabase Realtimeの有効化（オプション）

1. Supabaseダッシュボードで **Database** → **Replication** を開く
2. `messages`テーブルのReplicationを有効化

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてアプリにアクセスできます。

## GitHubへのプッシュ

現在、ローカルでGitリポジトリが初期化されています。GitHubにプッシュするには:

### 1. GitHubで新しいリポジトリを作成

1. https://github.com/new にアクセス
2. リポジトリ名を入力（例: `ai-partner-web`）
3. **「Initialize this repository with」のチェックボックスはすべてオフ**にする
4. 「Create repository」をクリック

### 2. リモートリポジトリを追加してプッシュ

```bash
# リモートリポジトリを追加（your-usernameとrepo-nameを置き換える）
git remote add origin https://github.com/your-username/repo-name.git

# mainブランチにプッシュ
git push -u origin main
```

## 使い方

### 1. キャラクター設定

1. アプリを開くと、最初にキャラクター設定画面が表示されます
2. 名前を入力します（例: さくら）
3. 関係性を選択します（彼女、幼馴染など）
4. AI生成画像から好きなアバターを選択、または独自の画像をアップロード
5. 「この彼女とチャットを始める」ボタンをクリック

### 2. チャット

1. メッセージ入力欄にテキストを入力
2. Enterキーまたは送信ボタンでメッセージを送信
3. AIが1〜3秒後に返信します
4. 左上の戻るボタンでキャラクター設定画面に戻れます

## トラブルシューティング

### Gemini APIエラーが出る

- `.env.local`の`GOOGLE_GENERATIVE_AI_API_KEY`が正しいか確認してください
- APIキーが有効であることを確認してください

### Supabase接続エラーが出る

- `.env.local`の`NEXT_PUBLIC_SUPABASE_URL`と`NEXT_PUBLIC_SUPABASE_ANON_KEY`が正しいか確認してください
- Supabaseプロジェクトが有効であることを確認してください

### スタイルが適用されない

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### 開発サーバーが起動しない

```bash
# ポート3000が使用中の場合、別のポートで起動
PORT=3001 npm run dev
```

## 次のステップ

現在実装されているのは基本機能（MVP）です。以下の機能を追加することで、よりリッチなアプリになります:

### 優先度: 高

1. **データベース永続化**
   - キャラクターと会話履歴をSupabaseに保存
   - ページリロードしても会話が残る

2. **ユーザー認証**
   - Supabase Authでログイン機能を追加
   - ユーザーごとに複数のキャラクターを管理

### 優先度: 中

3. **記憶抽出機能**
   - ユーザーの好みや情報を自動抽出
   - AIの自己記憶（発言の一貫性）を保持
   - プロンプトに記憶を動的に注入

4. **Supabase Realtime**
   - メッセージが届いた瞬間に画面を自動更新
   - より自然な会話体験

### 優先度: 低

5. **Web Push通知**
   - ブラウザを閉じていても返信を通知

6. **高度なキャラクターカスタマイズ**
   - 声のトーン設定
   - より詳細な性格設定

7. **エクスポート機能**
   - 会話履歴のエクスポート
   - 思い出アルバム機能

## ライセンス

ISC

## サポート

問題が発生した場合は、以下を確認してください:

1. `document.md` - 詳細な要件定義
2. `CLAUDE.md` - 開発ガイドライン
3. `.claude/prime.md` - プロジェクト概要

それでも解決しない場合は、GitHubのIssuesで報告してください。
