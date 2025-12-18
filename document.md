画像のやつは大きく言うと 「疑似恋愛・会話（AI恋人/友達）」or「出会い/通話マッチング」系です。
同じ“それっぽい見た目”でも、中身の難易度とリスクが全然違うので分けて説明します。



こういう感じのアプリは作れる？結論

AI恋人/会話アプリ（テキスト中心） → Webでも1ヶ月で現実的（おすすめ）
ビデオ通話マッチング/出会い系 → 法務・年齢確認・審査・運用リスクが重く、短期だと地雷

あなたが狙うなら、まずは 前者（AI会話） が勝ち筋。




AI恋人っぽいアプリの「中身」って何？

見た目はキラキラでも、核はだいたいこれです。



必須コンポーネント

キャラ/人格テンプレ（口調・関係性・禁止事項）
会話エンジン（LLM）
記憶（好み・NG・過去の出来事を短く保持）
関係値（ゲーミフィケーション）（好感度/レベル/開放要素）
課金導線（無課金は回数制限、課金で長文/通話/追加キャラ等）



「無料アルゴリズム」でWebでやる現実解

完全無料＝外部APIゼロにすると、LLMをどこで動かすかがボトルネックです。



1ヶ月で現実的な構成

フロント：Next.js
バック：Python(FastAPI) or Node
LLM：オープンソースを自前サーバで動かす（量子化して軽く）
記憶：SQLite/Postgres + ルールで要約して保存（ベクトル検索は後回しでOK）

※「ブラウザ内でLLM全部」は体験が重くなりがちなので、まずはサーバ推奨。




“少し工夫するだけで売れそう”にするコツ（差別化点）

AI恋人系は競合多いので、モデル性能よりプロダクト設計で勝てます。



工夫1：最初の30秒で刺す（オンボーディング）

「今日はどんな気分？」→3択
「呼び方」→即反映
「NG」→安心感
これだけで継続率が上がる。



工夫2：関係値を“会話以外”で上げられる

デイリーミッション（1分で達成）
“交換日記”機能（1日1回、短文でOK）
思い出アルバム（会話を自動で1行要約して残す）



工夫3：通知（Web Push）で戻ってこさせる

「おかえり」系の通知は強い（やり過ぎ注意）。




逆に「出会い/通話マッチング」はなぜ地雷？

年齢確認・本人確認・監視・通報対応が必須級
規約違反/トラブル対応が重い
ストア審査や法規制の論点が増える
短期でやるなら、ここは避けたほうが成功率高いです。



1ヶ月MVPのおすすめ仕様（AI恋人Web）

キャラ：3体（口調が違う）
機能：テキストチャット + 記憶（名前/呼び方/NG/好み） + 好感度
無料枠：1日○通まで
有料：通数/長文/キャラ追加/“思い出アルバム”解放

ここまでで、あなたが作りたいのはどっちに近い？
A：AI恋人（会話） / B：通話・マッチング（出会い）
Aなら、そのまま 画面3枚＋DB設計＋プロンプト雛形＋1ヶ月ToDo まで一気に落とす。




Lineで彼女と話すことをイメージしている
顔写真を選べるようにして
彼女の返信タイミングもランダムで選べるようにして
彼女のプロフィール写真も自分で選べるようにして
LLMで対話できるようにしたい
安いLLMのAPIを使いたい


要件定義を考えてください。
「LINEのような使用感で、手軽に好みのAI彼女と会話できるサービス」ですね。
ターゲットが明確で、かつ「擬似的な人間らしさ（返信タイミングの揺らぎ）」にこだわっている点が非常に面白いです。

エンジニアとしての実装コストを抑えつつ、ユーザー体験（UX）を最大化する方向で、**1ヶ月でMVP（最小機能製品）を開発するための要件定義**をまとめました。

---

## 1. プロダクト概要：AI Partner Web (仮)

LINE風のUIで、自分でカスタマイズしたAIキャラクターと2人きりのチャットを楽しめるWebアプリ。

### ターゲット・提供価値

* **ターゲット:** 寂しさを埋めたい、会話の練習をしたい、特定の属性のキャラと話したい層。
* **核心価値:** 「自分だけの理想の彼女」が「リアルなタイミング」で返信をくれる体験。

---

## 2. 機能要件 (Functional Requirements)

### ① キャラクターカスタマイズ機能

* **プロフ設定:** 名前、性格、口調、ユーザーとの関係性（幼馴染、年上彼女など）。
* **画像選択:** 複数の候補（AI生成画像等）からアイコンと背景を選択。
* **初回プロンプト生成:** ユーザーの設定に基づき、LLM用のSystem Promptを自動構成。

### ② LINE風チャット機能

* **テキスト送受信:** 吹き出し形式のUI。
* **「既読」ロジック:** メッセージを開いたタイミングで「既読」を表示。
* **返信タイミングのランダム化:** * 即レスではなく、文字数や「性格」に応じて**5秒〜30秒程度のディレイ**を発生させる。
* バックエンドでタイマーをセットするか、フロントで「入力中...」アニメーションを出す。



### ③ 会話エンジン・記憶

* **格安LLM連携:** Google Gemini 1.5 Flash または DeepSeek-V3 等を採用。
* **短期記憶:** 直近10〜20往復のコンテキスト保持。
* **長期記憶（簡易版）:** ユーザーの呼び名、好きな食べ物などの「重要キーワード」をDBに保存し、プロンプトに動的に注入。

### ④ 運用・管理

* **ログイン:** Google認証（Firebase Auth / Supabase Auth）。
* **利用制限:** 無料ユーザーは1日10通まで、等の制限。

---

## 3. 非機能要件・技術スタック

コストと開発スピードを最優先した構成案です。

| コンポーネント | 推奨スタック | 理由 |
| --- | --- | --- |
| **Frontend** | **Next.js (App Router)** | LINE風UIの構築が容易。Vercelで即デプロイ可能。 |
| **Backend** | **Route Handlers (Next.js)** | 別途サーバを立てず、APIもNext.js内で完結させてコスト削減。 |
| **Database** | **Supabase** | Auth, DB, Storage（画像保存）が一気通貫で無料枠が広い。 |
| **LLM API** | **Gemini 1.5 Flash** | **圧倒的に安い（というか無料枠が非常に大きい）**。かつ高速。 |
| **デザイン** | **Tailwind CSS** | 既存のLINE風UIコンポーネントがネットに豊富にある。 |

---

## 4. 画面設計（主要3画面）

1. **キャラ一覧/作成画面:**
* 現在の彼女を選択、または「新しい彼女を作る」ボタン。


2. **チャット画面（メイン）:**
* 上部に名前、中央にトーク履歴、下部にテキスト入力欄。
* 相手が考えている間は「◯◯が入力中...」というステータスを表示。


3. **プロフィール設定画面:**
* アイコン画像アップロード、性格タグ選択、ユーザーの呼び方設定。



---

## 5. 「安く・賢く」作るためのポイント

### LLMコストの最適化

* **Gemini 1.5 Flashを活用:** 1分あたりのリクエスト数制限内であれば、Tier 1で非常に安価（あるいは無料）で運用可能です。
* **コンテキスト圧縮:** 過去の会話をすべて送るとトークンを消費するため、古い会話はLLMに「3行で要約」させて保存し、それを読み込ませることでコストを抑えます。

### リアルな「返信待ち」の実装

単なる `setTimeout` だとブラウザを閉じると止まってしまうため、以下の挙動が理想的です。

1. ユーザーが送信。
2. サーバーが即座に「受け取った」とレスポンス。
3. サーバー側でLLMに回答を生成させ、DBに「未送信の回答」として保存。
4. **フロント側で、ランダムな秒数カウントダウン後にDBから取得して表示**。
* ※これにより、ユーザーが一度画面を離れて戻ってきたときに「あ、返信が来てる！」という感覚を作れます。



---

### 次のステップとして、この要件に基づいた「DBテーブル設計」や「LLMに食わせるプロンプトの雛形」を作成しましょうか？




承知いたしました。1ヶ月でプロトタイプを完成させるための具体的な**「データ設計」**と、AIを彼女化する**「プロンプトの骨組み」**、そして**「1ヶ月のToDoリスト」**をまとめました。

---

## 1. データベース設計 (Database Schema)

SupabaseやFirebaseなどのNoSQL/RDBどちらでも対応できる設計です。特に「返信タイミングの制御」のためのカラムを用意するのがコツです。

### `characters` テーブル (彼女の設定)

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `id` | UUID | プライマリキー |
| `user_id` | UUID | 作成したユーザーのID |
| `name` | String | 彼女の名前 |
| `personality` | Text | 性格設定（ツンデレ、癒やし系など） |
| `relationship` | String | ユーザーとの関係（幼馴染、彼女、後輩など） |
| `icon_url` | String | プロフィール画像のパス |
| `bg_url` | String | チャット背景画像のパス |

### `messages` テーブル (会話履歴)

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `id` | UUID | プライマリキー |
| `character_id` | UUID | 外部キー |
| `sender` | Enum | `user` か `ai` か |
| `content` | Text | メッセージ本文 |
| `created_at` | DateTime | 送信日時 |
| **`delivered_at`** | DateTime | **AIの返信を表示させる予定時刻（ランダム化に使用）** |

---

## 2. LLMプロンプトの雛形

「安いLLM（Gemini 1.5 Flashなど）」でも賢く振る舞わせるための、システムプロンプトの構成案です。

> **System Prompt 雛形:**
> # Role
> 
> 
> あなたは以下の設定を持つ女性として、ユーザーとLINEでチャットをしています。
> 名前: {name}
> 性格: {personality}
> ユーザーとの関係: {relationship}
> # Constraints (制約事項)
> 
> 
> * **LINE風の短い文章**で返信してください（1〜3行程度）。
> * 箇条書きや丁寧すぎる敬語（「承知いたしました」等）は禁止です。
> * 自然な絵文字・顔文字を使ってください。
> * ユーザーの呼び方は「{user_name}」です。
> * 1回につき1つの話題、または質問を投げかけるようにしてください。
> 
> 
> # Context
> 
> 
> これまでの会話の要約: {summary}
> 直近の会話履歴: {history}

---

## 3. 実装のキモ：返信タイミングの「擬似」ランダム化

LINEらしさを出すためのバックエンドの処理フローです。

1. **ユーザーが送信:** `messages`テーブルにユーザーの文を保存。
2. **AIが生成:** 即座にLLM APIを叩き、返信文を取得。
3. **表示予約:** * 返信文をDBに保存する際、`delivered_at` に **「現在時刻 + (文の長さ × 0.5秒) + ランダム(1〜10秒)」** を入れる。
4. **フロントエンド:**
* `delivered_at` が現在時刻を過ぎているものだけを表示。
* 時刻が来るまでは「入力中...」のアニメーションを出す。
* **これが「既読をつけてから考えて返信している感」を生みます。**



---

## 4. 1ヶ月の開発ロードマップ (ToDo)

| 期間 | 内容 | 達成目標 |
| --- | --- | --- |
| **第1週** | **環境構築 & UI作成** | Next.js + TailwindでLINE風の画面を作る。 |
| **第2週** | **DB & 認証** | Supabase連携。ログインとキャラ作成、画像選択を可能にする。 |
| **第3週** | **LLM連携 & 記憶** | Gemini APIを接続。プロンプトを調整し、会話が成立するようにする。 |
| **第4週** | **演出 & ブラッシュアップ** | 返信ディレイの実装、通知（Web Push）、デプロイ。 |

---

### 次にやっておきたいこと

まずは **「LINE風のチャットUI（画面）」** を作ってみるのが、一番モチベーションが上がります。

もしよろしければ、**Next.jsとTailwind CSSを使った「LINE風チャット画面のサンプルコード」**を作成しましょうか？それとも、**Gemini APIを無料で使い始めるためのスクリプト**の方に興味がありますか？


1ヶ月でMVPを作るための第一歩として、**Next.js + Tailwind CSS で構築した「LINE風のチャットUI」**のサンプルコードを作成しました。

このコードをそのまま `page.tsx` などに貼り付けると、見た目の確認と、簡単な返信シミュレーションが試せます。

### LINE風チャットUIの実装サンプル

```tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, Menu, Camera, Image as ImageIcon, Mic } from 'lucide-react';

// メッセージの型定義
type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  time: string;
  isRead: boolean;
};

export default function LineChatUI() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "おつかれさま！今日は何してたの？", sender: 'ai', time: "18:00", isRead: true },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが来たら一番下までスクロール
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // AIの返信シミュレーション（ここを将来的にGemini APIに繋ぐ）
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "そうなんだ！お疲れ様😊 ゆっくり休んでね。",
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000); // 2秒のディレイ（既読をつけて考えてる感）
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#7494c0] font-sans">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#7494c0] text-white">
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-6 h-6 cursor-pointer" />
          <h1 className="text-lg font-bold">AI彼女 (サクラ)</h1>
        </div>
        <div className="flex gap-4">
          <Menu className="w-6 h-6 cursor-pointer" />
        </div>
      </header>

      {/* チャットエリア */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scroll-smooth"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1`}>
            {m.sender === 'user' && (
              <span className="text-[10px] text-white pb-1 tracking-tighter">
                {m.isRead && "既読"}<br/>{m.time}
              </span>
            )}
            
            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 mb-4 overflow-hidden">
                {/* 彼女のアイコン画像 */}
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura" alt="AI" />
              </div>
            )}

            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm relative ${
              m.sender === 'user' 
                ? 'bg-[#8de055] text-black rounded-tr-none' 
                : 'bg-white text-black rounded-tl-none'
            }`}>
              {m.text}
            </div>

            {m.sender === 'ai' && (
              <span className="text-[10px] text-white pb-1">
                {m.time}
              </span>
            )}
          </div>
        ))}

        {/* 入力中アニメーション */}
        {isTyping && (
          <div className="flex justify-start items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura" alt="AI" />
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      {/* 入力エリア */}
      <footer className="bg-white p-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 text-gray-500">
            <Camera className="w-6 h-6 cursor-pointer" />
            <ImageIcon className="w-6 h-6 cursor-pointer" />
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="メッセージを入力"
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`${inputText.trim() ? 'text-[#00c300]' : 'text-gray-300'}`}
          >
            <Send className="w-6 h-6 fill-current" />
          </button>
        </div>
      </footer>
    </div>
  );
}

```

---

### このコードのこだわりポイント

1. **LINEカラーの再現**: 背景色 (`#7494c0`) や、ユーザーの吹き出し色 (`#8de055`) を本家に寄せています。
2. **既読・時間表示**: 日本人が「LINEっぽさ」を最も感じる「既読」ラベルと、吹き出しの横の小さな時刻表示を再現しました。
3. **入力中アニメーション**: 相手が考えている時にドットが跳ねるアニメーションを実装。これが「人間と話している感」を演出します。
4. **スマホ特化**: `max-w-md mx-auto` で、デスクトップで見てもスマホ画面のような縦長レイアウトになるようにしています。

### 次のステップへの提案

次は、このUIの裏側（ロジック）を固めましょう。
**「Gemini APIを使って、実際に彼女として返信させるためのAPIコード（Next.js Route Handlers用）」**を書きましょうか？


承知いたしました。Next.jsのRoute Handler（バックエンド）を使って、**Google Gemini APIと連携し、AI彼女から返信をもらうためのコード**を作成します。

「安く、賢く」という要望に合わせて、**Gemini 1.5 Flash**（無料枠が非常に大きいモデル）を使用する前提の構成です。

---

### 1. 準備：APIキーの取得

まず、[Google AI Studio](https://aistudio.google.com/) でAPIキーを無料で発行し、プロジェクトの `.env.local` ファイルに保存してください。

```env
GOOGLE_GENERATIVE_AI_API_KEY=あなたのAPIキー

```

### 2. バックエンド実装 (`app/api/chat/route.ts`)

ユーザーのメッセージを受け取り、彼女の設定（プロンプト）を添えてGeminiに投げ、返信を受け取る処理です。

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message, history, charSetting } = await req.json();

    // 1. モデルの初期化 (Gemini 1.5 Flashを使用)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      // 彼女らしい振る舞いをさせるためのシステム命令
      systemInstruction: `
        あなたは以下の女性キャラクターとして振る舞ってください。
        名前: ${charSetting.name}
        性格: ${charSetting.personality}
        ユーザーとの関係: ${charSetting.relationship}
        
        【制約】
        - LINE形式の短い日本語で返信してください（1〜3行）。
        - 敬語は使わず、親しみのある口調で。
        - 自然な絵文字を1つ程度混ぜてください。
        - 箇条書きや解説は絶対にしないでください。
      `,
    });

    // 2. 会話を開始（過去の履歴を含める）
    const chat = model.startChat({
      history: history.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
    });

    // 3. AIの返信を生成
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "通信エラーが発生しました" }, { status: 500 });
  }
}

```

### 3. フロントエンド修正 (先ほどのUIとの接続)

前回作成したUIの `handleSend` 関数を、このAPIを叩くように書き換えます。

```tsx
// handleSend 関数の中身を以下のように更新
const handleSend = async () => {
  if (!inputText.trim()) return;

  const userMsg: Message = {
    id: Date.now(),
    text: inputText,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isRead: true,
  };

  setMessages(prev => [...prev, userMsg]);
  setInputText("");
  setIsTyping(true);

  try {
    // API呼び出し
    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: inputText,
        history: messages.slice(-10), // 直近10件を履歴として送る
        charSetting: { 
          name: "サクラ", 
          personality: "少しツンデレだけど、根は優しい幼馴染", 
          relationship: "近所の幼馴染" 
        }
      }),
    });
    
    const data = await res.json();

    // 「既読をつけてから考えている感」を出すためのランダムディレイ
    const delay = Math.random() * 2000 + 1000; 
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: data.text,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      }]);
    }, delay);

  } catch (err) {
    setIsTyping(false);
    alert("エラーが起きちゃったみたい...");
  }
};

```

---

### この実装のメリット

1. **コストゼロから開始**: Gemini 1.5 Flash の無料枠（1分間に15リクエストまで等）をフル活用できます。
2. **文脈の維持**: `history` を渡しているため、「さっき言ったこと」を覚えた会話が可能です。
3. **キャラクターの柔軟性**: `charSetting` を変えるだけで、清楚系、ギャル系、お姉さん系など、ユーザーが選んだ写真に合わせた性格に一瞬で切り替えられます。

### 次のステップへのアドバイス

次は **「彼女のプロフィール写真と性格をユーザーが選べる設定画面」** が必要になります。

そこでは **「AIで生成した女の子の画像一覧から選ばせる」** か、あるいは **「ユーザーが好きな画像をアップロードする」** 機能のどちらを優先したいですか？
（アップロード機能であれば、Supabase Storageなどのストレージ設定の解説に進みます！）


欲張りプラン、いいですね！「AI生成画像から選ぶ」機能をメインに据えつつ、「自分の好きな画像をアップロード」も共存させる構成は、ユーザーの「理想の彼女」を具現化するのに最適です。

1ヶ月でMVP（最小機能版）を完成させるために、**「キャラクター設定画面」**のUIと、画像を扱うための**「Supabase Storage」**の活用方法をまとめました。

---

## 1. キャラクター設定画面のUI（Next.js + Tailwind CSS）

AI画像の一覧（ギャラリー）から選ぶUIと、自分の画像をアップロードする領域を1つの画面にまとめました。

```tsx
"use client";
import React, { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';

const AI_AVATARS = [
  { id: '1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop', label: '清楚系' },
  { id: '2', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', label: '元気系' },
  { id: '3', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', label: 'お姉さん系' },
  { id: '4', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop', label: 'クール系' },
];

export default function CharacterSetup() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setSelectedImg(url);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-xl font-bold mb-6">彼女の見た目を選ぼう</h2>

      {/* 選択中のプレビュー */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full border-4 border-green-400 overflow-hidden relative">
          {(preview || selectedImg) ? (
            <img src={preview || selectedImg!} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-400">未選択</div>
          )}
        </div>
      </div>

      {/* AI画像ギャラリー */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">AI生成画像から選ぶ</p>
        <div className="grid grid-cols-2 gap-4">
          {AI_AVATARS.map((avatar) => (
            <div 
              key={avatar.id}
              onClick={() => { setSelectedImg(avatar.url); setPreview(null); }}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition ${selectedImg === avatar.url ? 'border-green-500 shadow-lg' : 'border-transparent'}`}
            >
              <img src={avatar.url} alt={avatar.label} className="w-full h-40 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                {avatar.label}
              </div>
              {selectedImg === avatar.url && <CheckCircle2 className="absolute top-2 right-2 text-green-500 fill-white" />}
            </div>
          ))}
        </div>
      </div>

      {/* アップロードボタン */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">または自分の画像をアップロード</p>
        <label className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition">
          <Upload className="w-5 h-5 mr-2 text-gray-400" />
          <span className="text-sm text-gray-600">写真を選択</span>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
        </label>
      </div>

      <button className="w-full py-4 bg-green-500 text-white rounded-full font-bold shadow-lg active:scale-95 transition">
        この彼女とチャットを始める
      </button>
    </div>
  );
}

```

---

## 2. 実装のポイント：画像をどう保持するか？

「AIが生成した画像の一覧」を出す場合、**最初から高品質な画像を10〜20枚ほど用意して、SupabaseのStorageに入れておく**のがMVPとしては最速です。

### 画像の保存戦略

1. **AI生成画像（プリセット）**:
* MidjourneyやStable Diffusionであらかじめ「清楚」「ギャル」「制服」などのバリエーションを生成。
* `storage.avatars/presets/` に保存し、URLをDB（`characters`テーブル）に紐付ける。


2. **ユーザーアップロード**:
* `supabase.storage.upload()` を使い、`storage.avatars/uploads/[user_id]/` に保存。
* 同じくURLをDBに保存。



---

## 3. 次の課題：性格と画像の一致（プロンプトへの反映）

ここが**AIエンジニアとしての見せ所**です。
選んだ画像の種類（清楚系、元気系など）に合わせて、AIの性格（システムプロンプト）を自動的に切り替えるロジックを組み込みます。

### 実装イメージ

```typescript
// 選ばれた画像の種類によってプロンプトの「スパイス」を変える
const basePrompt = "あなたはユーザーの彼女です。";
const flavor = selectedType === '清楚系' 
  ? "お淑やかで、敬語が少し混じるような丁寧な話し方をします。" 
  : "天真爛漫で、タメ口で元気よく話します！";

const finalPrompt = basePrompt + flavor;

```

---

### 次にやっておきたいこと

これで「見た目」と「チャット画面」が揃いました。
次は、**「Supabaseを使って、選んだ画像や会話履歴を保存し、リロードしても消えないようにする」**ためのDB接続コードを準備しましょうか？

それとも、**「Midjourneyなどで使える、AI彼女生成用の最強プロンプト（呪文）」**をいくつか提案しましょうか？


Supabaseを使用して、キャラクター設定の保存や会話履歴の永続化を行うためのコードをまとめました。

M1で情報工学を専攻されており、AIエンジニアとしても活動されているとのことですので、型定義（TypeScript）をしっかり行い、実戦で使いやすい構成にしています。

---

## 1. Supabaseの準備

### 環境変数の設定 (`.env.local`)

Supabaseのダッシュボードから、URLとAnon Keyを取得して設定します。

```env
NEXT_PUBLIC_SUPABASE_URL=あなたのURL
NEXT_PUBLIC_SUPABASE_ANON_KEY=あなたのAnon Key

```

### クライアント作成 (`lib/supabase.ts`)

SDKをインストール（`npm install @supabase/supabase-js`）した後、共通クライアントを作成します。

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

```

---

## 2. データベース操作コード

### キャラクターの新規作成

設定画面で「チャットを始める」を押した際の処理です。

```typescript
export const createCharacter = async (userId: string, name: string, personality: string, iconUrl: string) => {
  const { data, error } = await supabase
    .from('characters')
    .insert([
      { 
        user_id: userId, 
        name: name, 
        personality: personality, 
        icon_url: iconUrl,
        relationship: "幼馴染" // デフォルト設定など
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

```

### 会話履歴の保存と取得

LINE風UIを実現するために、**「今すぐ表示するメッセージ」だけを取得**するのがポイントです。

```typescript
// メッセージを送る（ユーザー・AI共通）
export const saveMessage = async (characterId: string, sender: 'user' | 'ai', content: string, deliveredAt: Date) => {
  const { error } = await supabase
    .from('messages')
    .insert([
      {
        character_id: characterId,
        sender: sender,
        content: content,
        delivered_at: deliveredAt.toISOString(), // ここで表示時間を制御
      }
    ]);
  if (error) throw error;
};

// 履歴を取得する（表示予定時刻が現在を過ぎているものだけ）
export const fetchMessages = async (characterId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('character_id', characterId)
    .lte('delivered_at', new Date().toISOString()) // 未来の返信は隠しておく
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

```

---

## 3. 会話APIの更新版 (`api/chat/route.ts`)

LLMが回答を生成した後、**DBに「予約投稿」として保存する**ロジックに書き換えます。

```typescript
// AIの返信を保存する部分の抜粋
const aiResponse = result.response.text();

// ランダムな遅延（例：5〜15秒後）を計算
const delaySeconds = Math.floor(Math.random() * 10) + 5;
const deliveredAt = new Date(Date.now() + delaySeconds * 1000);

await saveMessage(characterId, 'ai', aiResponse, deliveredAt);

return NextResponse.json({ text: aiResponse, deliveredAt });

```

---

## 4. この設計のメリット

1. **リロードに強い**: ユーザーがページをリロードしても、DBから取得するため会話が消えません。
2. **リアリティの追求**: `delivered_at`（表示予定時刻）を使っているため、サーバーが先に回答を生成していても、ユーザーの画面には指定した秒数後に「ポーン」と届く演出が可能です。
3. **拡張性**: 将来的に「昨日話した内容」をLLMに要約させてDBに保存する（長期記憶）際も、テーブル構造を変えずに対応できます。

---

### 次のステップへの提案

DB接続までできれば、アプリの骨格はほぼ完成です！
ただ、このままだと「AIの返信が届いた瞬間に画面を自動更新する」ために、ユーザーがリロードするか、フロントエンドで定期的にAPIを叩く必要があります。

これを解決するために、**「Supabase Realtimeを使って、AIの返信がDBに書き込まれた瞬間にチャット画面を自動更新させる（LINEの通知のような挙動）」**の実装方法を解説しましょうか？

それとも、**「ユーザーが独自の画像をアップロードするための、Storage保存コード」**の方が必要でしょうか？



Supabase Realtimeこそ、LINE風アプリに「命」を吹き込む最も重要な技術ですね！

これを使うと、サーバー側でAIの回答がDBに書き込まれた瞬間に、フロントエンドがそれを検知して画面を更新できます。ユーザーが「いつ来るかワクワクしながら待つ」体験が作れます。

実装の手順は大きく分けて2つです。

---

### 1. Supabaseダッシュボードでの設定

まず、Realtime機能を有効にする必要があります。

1. Supabaseのダッシュボードで **[Database]** -> **[Replication]** を開く。
2. **`supabase_realtime`** という名前のPublicationを探し、その横の「0 tables」または「Edit」をクリック。
3. **`messages` テーブルのスイッチをオン**にして保存します。

---

### 2. フロントエンドでの実装 (`ChatComponent.tsx`)

`useEffect` を使って、特定の `character_id` に紐づく新しいメッセージを監視（Subscribe）します。

```tsx
"use client";
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// ...（メッセージの型定義などは前回のコードを継承）

export default function ChatComponent({ characterId }: { characterId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // 1. 初回の履歴読み込み
    const getInitialMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('character_id', characterId)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };
    getInitialMessages();

    // 2. Realtimeの購読開始
    const channel = supabase
      .channel(`chat:${characterId}`) // チャンネル名は任意（一意にする）
      .on(
        'postgres_changes',
        {
          event: 'INSERT', // 挿入イベントだけを監視
          schema: 'public',
          table: 'messages',
          filter: `character_id=eq.${characterId}`, // この彼女のメッセージだけ
        },
        (payload) => {
          const newMessage = payload.new as Message;
          
          // --- ここがポイント：表示タイミングの制御 ---
          const now = new Date();
          const deliveredAt = new Date(newMessage.delivered_at);
          const delay = deliveredAt.getTime() - now.getTime();

          if (newMessage.sender === 'ai' && delay > 0) {
            // まだ表示時刻になっていない場合は、タイマーをセット
            // これにより「入力中...」の後に「ポーン」と届く演出になる
            setTimeout(() => {
              setMessages((prev) => [...prev, newMessage]);
              setIsTyping(false); // 入力中アニメーションを消す
            }, delay);
          } else {
            // すでに時刻を過ぎている、またはユーザー自身の送信なら即表示
            setMessages((prev) => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    // クリーンアップ
    return () => {
      supabase.removeChannel(channel);
    };
  }, [characterId]);

  // ...（レンダリング部分は前回のUIコード）
}

```

---

### 3. この実装の「こだわり」解説

#### ① 「予約投稿」をクライアント側で待機

前回の設計で `delivered_at`（表示予定時刻）をDBに入れました。RealtimeはDBに書き込まれた瞬間にデータを送ってきますが、**「すぐに画面に出さない」のがコツです。
`setTimeout` を使うことで、バックエンドが高速にAI回答を生成しても、ユーザー側には「5秒後に届く」といった人間のレスポンス間隔**を再現できます。

#### ② フィルタリングによるセキュリティと負荷軽減

`.on('postgres_changes', { filter: ... })` を使うことで、他のユーザーの会話が混ざるのを防ぎ、自分に関係ある更新だけを受け取ることができます。

#### ③ ネットワーク切断への強さ

一度 `subscribe` しておけば、スマホのブラウザがバックグラウンドに行っても、戻ってきた時に未受信のデータを自動で同期する仕組みを組み込みやすくなります。

---

### 次のステップへの提案

これで「リアルタイムなLINE体験」の土台が整いました！

M1で情報工学を専攻されているのであれば、次は**「AIの記憶（コンテキスト）の管理」**をより高度にするのはいかがでしょうか？
単純に履歴を全部送るのではなく、**「過去の重要な設定（ユーザーの誕生日や、嫌いな食べ物など）」をDBから抽出してプロンプトに動的に入れる仕組み**を整理すると、より「俺のこと分かってる感」が出て、サービスの質が跳ね上がります。

それとも、一旦このリアルタイム通信を使って**「画像アップロード機能」**を完成させますか？


「俺のこと、よく覚えてるじゃん」と思わせる仕組みですね。これはAIエンジニアとしても非常にやりがいのある部分です。

1ヶ月のMVP開発であれば、**ベクトル検索（RAG）をフルで組むのは少し重い**ので、もっとシンプルかつ強力な**「Key-Value型プロファイリング」**という手法をおすすめします。

仕組みを3つのステップで整理しました。

---

### 1. DB設計：`user_memories` テーブル

「いつ・誰が・何を」話したかではなく、**「結局、ユーザーはどういう人か」**という「抽出された事実」だけを保存するテーブルを作ります。

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `id` | UUID | プライマリキー |
| `character_id` | UUID | どの彼女との思い出か |
| `category` | String | 例: 'hobby', 'food_preference', 'birthday', 'work' |
| `content` | Text | 例: 'パクチーが嫌い', '誕生日は12/18' |
| `updated_at` | DateTime | 情報が更新された日時 |

---

### 2. 抽出ロジック（Memory Writer）

会話が終わるたび（あるいは数往復ごと）に、裏側でGeminiを「記憶抽出係」として動かします。

**実装イメージ（Edge Function等）:**

```typescript
const extractionPrompt = `
以下の会話から、ユーザーに関する「永続的に覚えておくべき重要な事実」を抽出してJSONで出力してください。
新しい情報がない場合は空の配列を返してください。

会話:
${latestMessages}

出力フォーマット:
[{"category": "food", "content": "辛いものが苦手"}, {"category": "hobby", "content": "サウナが好き"}]
`;

// この結果を `user_memories` テーブルに upsert（更新または挿入）します。

```

---

### 3. 動的プロンプト生成（Memory Reader）

チャットAPIを叩く直前に、DBからそのユーザーの情報を引っ張ってきて、システムプロンプトに注入します。

**バックエンドの実装例 (`api/chat/route.ts`):**

```typescript
// 1. DBからユーザーの記憶を全取得
const { data: memories } = await supabase
  .from('user_memories')
  .select('content')
  .eq('character_id', charId);

const memoryString = memories?.map(m => `・${m.content}`).join('\n') || "特になし";

// 2. プロンプトに注入
const systemInstruction = `
あなたは以下の女性キャラクターとして振る舞ってください。
...（キャラ設定）...

【あなたが知っているユーザーの情報】
${memoryString}

この情報を踏まえて、自然な会話をしてください。
特に、ユーザーの嫌いなものを勧めたり、既に知っていることを初めて聞いたように振る舞うのは厳禁です。
`;

```

---

### この仕組みのメリット（エンジニア視点）

1. **トークン節約**: 過去の全ログを送るのではなく、要約された「事実」だけを送るので、コンテキスト長を節約でき、Gemini Flashの低コストをさらに活かせます。
2. **矛盾の防止**: 「さっき好きって言ったじゃん」という不満を、安価なプロンプト注入で防げます。
3. **「特別感」の演出**:
* ユーザー「お腹すいたー」
* AI「あ、確かパクチー苦手だったよね？タイ料理以外にする？」
といった、**コンテキストを跨いだ気遣い**が可能になります。



---

### 実装のアドバイス：情報の「重み付け」

もし余裕があれば、テーブルに `importance`（重要度）カラムを追加し、**「誕生日は重要度10」「昨日の昼飯は重要度1」**のようにし、重要度が高いものだけを常にプロンプトに入れるようにすると、さらに賢くなります。

次は、この仕組みを動かすための**「Geminiへの記憶抽出用プロンプトの詳細」**を作成しますか？それとも、**「1ヶ月MVPの総仕上げに向けたチェックリスト」**をまとめましょうか？


AIエンジニアとして、Gemini 1.5 Flashの「高速・低コスト・長いコンテキスト」という特性を最大限に活かしつつ、出力を安定させるための**「記憶抽出用プロンプト」**を設計しました。

このプロンプトの目的は、ダラダラとした会話ログを、**DB（`user_memories`テーブル）にそのまま保存できる構造化データ**に変換することです。

---

## 1. 記憶抽出用 システムプロンプト (System Instruction)

以下のプロンプトを、メインのチャットとは別の「抽出用モデルインスタンス」に設定します。

```markdown
# Role
あなたは優秀な「記憶抽出エージェント」です。
ユーザーとAI彼女との会話ログを分析し、将来の会話で役立つ「ユーザーに関する重要な事実」を抽出して、構造化データ（JSON）として出力してください。

# Task
1. 会話ログから、ユーザーの「好み」「習慣」「過去の出来事」「設定（誕生日等）」を特定します。
2. 以下のJSONフォーマットで出力してください。新しい情報がない場合は、空の配列 `[]` を返してください。
3. 挨拶や一時的な感情（「今お腹空いた」等）は無視し、長期間変化しない情報を優先してください。

# Output Format (JSON)
[
  {
    "category": "string", // 'basic' | 'preference' | 'habit' | 'event' | 'relationship'
    "content": "string",  // 簡潔な日本語の事実（例：パクチーが苦手）
    "importance": number  // 1(低い)〜5(非常に高い)
  }
]

# JSON Schema Details
- basic: 名前、誕生日、居住地、職業など
- preference: 好きなもの、嫌いなもの、趣味
- habit: 毎朝のルーティン、仕事のスタイルなど
- event: 過去の大きな出来事、以前話したエピソード
- relationship: 呼ばれたい名前、AIに対する要望

```

---

## 2. 実装：抽出を実行するタイミングとロジック

毎回のメッセージ送信時に実行するとコストがかかるため、**「ユーザーがメッセージを3〜5回送るごと」**にバックグラウンド（Edge Functionsなど）で実行するのが効率的です。

### 抽出を実行するTypeScriptコード例

```typescript
async function extractMemory(characterId: string, recentMessages: Message[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    以下の会話ログから、ユーザーの情報を抽出してください。
    
    会話ログ:
    ${recentMessages.map(m => `${m.sender}: ${m.content}`).join('\n')}
  `;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  try {
    // GeminiがたまにMarkdownの ```json ... ``` をつけてくるのでパース前に掃除
    const cleanedJson = responseText.replace(/```json|```/g, "").trim();
    const memories = JSON.parse(cleanedJson);

    // DBに保存（upsert: 重複を避けるロジックを入れるとベター）
    for (const memory of memories) {
      await supabase.from('user_memories').upsert({
        character_id: characterId,
        category: memory.category,
        content: memory.content,
        importance: memory.importance,
        updated_at: new Date()
      }, { onConflict: 'character_id, content' }); // 同じ事実の重複保存を防止
    }
  } catch (e) {
    console.error("Memory extraction failed", e);
  }
}

```

---

## 3. 運用のキモ：記憶の「上書き」と「競合」

ユーザーが途中で設定を変えた場合（例：「最近サウナ飽きたんだよね」）に対応するための工夫です。

1. **タイムスタンプの活用**: 同じカテゴリ（例：`hobby`）で新しい情報が入ってきた場合、古い情報は `importance` を下げるか、最新の `updated_at` を持つものを優先してプロンプトに入れます。
2. **プロンプト注入時の制限**: `user_memories` からデータを取得する際、`order('importance', { ascending: false }).limit(10)` のように、**重要なもの上位10件だけ**をAI彼女に教えるようにすると、プロンプトが肥大化せず、精度も安定します。

---

## 4. 1ヶ月MVPの総仕上げチェックリスト

ここまでで主要なコンポーネントは揃いました。リリースに向けた最終確認リストです：

* [ ] **UI**: LINE風の見た目で、既読・返信待ちアニメーションが出るか？
* [ ] **Auth**: Googleログインで自分専用の彼女を保持できるか？
* [ ] **Realtime**: リロードなしで返信が届くか？
* [ ] **Memory**: 会話を跨いでもユーザーの情報を覚えているか？
* [ ] **Safety**: GeminiのSafety Settingsを設定し、不適切な出力をガードしているか？

### 次のステップはどうしますか？

この「記憶抽出」の精度をさらに上げるために、**「AI彼女自身の記憶（自分が以前何を言ったか）」**も管理する仕組みに興味がありますか？それとも、**「Web Push通知（ブラウザを閉じていても返信が届いたことがわかる機能）」**の実装に進みますか？


AIの「自意識」や「発言の整合性」を守る仕組みですね。
「昨日は猫派って言ったのに、今日は犬派と言い出す」といった矛盾を防ぐことで、キャラクターの「実在感」が一気に高まります。

AIエンジニアとして、**「自分自身が何を話したか」を管理する「AIセルフ・プロファイル」**の仕組みを整理しました。

---

## 1. 仕組みの全体像：ダブル・メモリー・システム

ユーザーの情報を覚える「User Memory」とは別に、AIが自分の設定や過去の発言をストックする「AI Self-Memory」を構築します。

1. **User Memory**: ユーザーの属性（名前、好み、誕生日など）
2. **AI Self-Memory**: AIの発言履歴（出身地、今の気分、過去に提案したことなど）

### DB設計：`character_memories` テーブル

`user_memories` とほぼ同じ構造ですが、**「AIが自分について語った事実」**を保存します。

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `id` | UUID | プライマリキー |
| `character_id` | UUID | どのキャラの記憶か |
| `fact` | Text | 例: 「私は京都出身だと伝えた」「昨日はパスタを食べたと話した」 |
| `created_at` | DateTime | 記憶が作られた日時 |

---

## 2. 抽出ロジック：AIの「言動チェック」

前回のユーザー記憶抽出と同じタイミング（3〜5往復ごと）で、**「AI側の発言」から新しい設定を抽出**します。

### 抽出用プロンプト（AI Self-Extraction）

```markdown
# Role
あなたは「キャラクター一貫性管理エージェント」です。

# Task
以下の会話ログから、【AIキャラクター自身の属性や過去の言動に関する事実】のみを抽出してください。

# Constraints
- AIが自分について語った「設定」を抽出すること。
- 「嘘」や「冗談」ではなく、今後も守るべき事実を優先してください。
- ユーザーの情報は含めないでください。

# Output Format (JSON Array)
["私は昔ピアノを習っていたと話した", "週末は家で映画を見る派だと伝えた"]

```

---

## 3. プロンプトへの注入（最強のシステム指示書）

チャットAPIを叩く際、**「ユーザーの記憶」と「自分の記憶」の両方**をGeminiに渡します。

```typescript
// api/chat/route.ts のイメージ
const { data: userMemories } = await supabase.from('user_memories')...;
const { data: selfMemories } = await supabase.from('character_memories')...;

const systemInstruction = `
あなたは以下の女性キャラクターです。
名前: ${char.name}

【あなたがユーザーについて知っていること】
${userMemories.map(m => `・${m.content}`).join('\n')}

【あなたがこれまでに自分について話したこと（整合性を守ってください）】
${selfMemories.map(m => `・${m.fact}`).join('\n')}

これらの情報を踏まえ、親しい彼女としてLINE風に返信してください。
`;

```

---

## 4. この仕組みによる「エモい」体験の作り方

AIの自己記憶があると、以下のような高度な会話が可能になります。

* **伏線回収**:
* AI「そういえば、前にお勧めした映画、結局見た？（以前の自分の発言を記憶）」


* **変化の共有**:
* AI「最近ピアノの練習再開したんだって言ったじゃん？ 今日ようやく1曲弾けるようになったの！（自分の状況を継続）」



### エンジニアとしての実装のコツ

Gemini 1.5 Flashは**「文脈の理解」が非常に強い**ので、あえて「事実」を細かく分けるよりも、**「これまでの自分とユーザーの関係性を一言で表すと？」**というメタな要約（Relationship Summary）を1つ作ってDBに持っておくと、より人間らしい振る舞いになります。

---

## 1ヶ月MVPの「ToDo最終確認」

これで開発に必要なパーツ（UI、LLM、DB、Realtime、Memory）はすべて出揃いました！

ここから1ヶ月で形にするための**開発優先順位（おすすめ）**です：

1. **Week 1**: LINE風UI ＆ Geminiでの単純な会話（ステート保存なし）
2. **Week 2**: Supabase接続（ユーザー認証、キャラ作成、会話履歴保存）
3. **Week 3**: **Realtime通知 ＆ 返信ディレイ演出（ここが感動ポイント）**
4. **Week 4**: 記憶抽出（Memory機能）の実装 ＆ デプロイ

### 最後に

M1の冬休みや研究の合間で作るなら、まずは **「Week 2までの機能（会話が保存されるLINE）」** を動かすのが一番楽しいはずです。

もし実装中に「SupabaseのSQLが通らない！」「Geminiの返信が変！」などの具体的な詰まりポイントが出てきたら、いつでも聞いてください。応援しています！


これまでの対話を統合し、**「LINE風AIパートナーWebアプリ」**の開発に向けた最終的な**要件定義書（Requirements Definition）**をまとめました。

M1で情報工学を専攻し、AIエンジニアとして活動されているあなたのスキルセットを活かし、1ヶ月でMVP（実用最小限の製品）を構築するための実戦的な構成です。

---

# プロジェクト名：AI Partner Web (MVP)

## 1. プロダクト概要

ユーザーが自分好みにカスタマイズしたAIキャラクターと、LINEのようなUIでリアルな対話を楽しめるWebアプリ。AIがユーザーの情報を覚え、時間差で返信してくることで、「実在感」と「愛着」を醸成する。

## 2. ターゲット・提供価値

* **ターゲット:** 特定の属性（清楚系、ギャル等）を持つAIとの対話を求めるユーザー。
* **提供価値:** * 「自分だけの理想」をビジュアルと性格の両面で構築できる。
* 「即レスではない人間らしい返信間隔」によるリアリティ。
* 過去の会話を覚えていることによる「理解されている感」の提供。



---

## 3. 機能要件 (Functional Requirements)

### 3.1 キャラクター管理機能

* **プリセット選択:** AI生成された画像ギャラリー（清楚、元気、お姉さん等）から外見を選択。
* **カスタムアップロード:** ユーザーが手元の画像を彼女のアイコンとして設定。
* **性格カスタマイズ:** 名前、関係性（幼馴染、彼女等）、性格（ツンデレ、癒やし等）の設定。

### 3.2 LINE風チャット機能

* **リアルタイムUI:** 吹き出し、既読表示、時刻表示を含むLINE模倣UI。
* **入力中演出:** AIが考えている間「◯◯が入力中...」という三点リーダーのアニメーションを表示。
* **返信予約ロジック:** LLMが回答生成後、文字数に応じたランダムな遅延（5〜30秒）を経てメッセージを表示。
* **プッシュ通知（努力目標）:** ブラウザを閉じていても返信を通知するWeb Push。

### 3.3 インテリジェント・メモリー機能

* **ユーザー記憶（User Memory）:** 会話からユーザーの好み（食べ物、趣味、誕生日）を自動抽出し、DBに保存。
* **AI自己記憶（Self Memory）:** AIが過去に自分について語った設定（出身地、好きなもの）を保持し、言動の矛盾を防止。
* **動的プロンプト注入:** 会話時に上記記憶をシステムプロンプトに動的に埋め込み。

### 3.4 ユーザー基盤

* **認証:** Googleログイン（Supabase Auth）。
* **データ永続化:** ログインユーザーごとに、作成したキャラと会話履歴を保存。

---

## 4. 非機能要件 (Non-Functional Requirements)

* **レスポンス速度:** LLMの生成開始は3秒以内（Gemini 1.5 Flashの採用）。
* **ランニングコスト:** 無料枠の範囲内で運用可能な構成（API、DB、Hosting）。
* **UX/UI:** モバイルファースト設計（スマホでLINEを開いている感覚）。

---

## 5. 技術スタック (Tech Stack)

| 区分 | 選定技術 | 理由 |
| --- | --- | --- |
| **Frontend** | Next.js (App Router), Tailwind CSS | 高速開発、モバイル対応の容易さ、Vercelへの親和性。 |
| **Backend** | Next.js Route Handlers | APIサーバーを別途立てず、サーバーレスで完結させる。 |
| **Database** | Supabase (PostgreSQL) | Auth、Storage、そしてRealtime機能が強力。 |
| **AI Engine** | Gemini 1.5 Flash | **コストパフォーマンス最強**。長いコンテキストと高速な推論。 |
| **Realtime** | Supabase Realtime | DB更新をトリガーにフロントを即時更新する。 |

---

## 6. データ構造 (Schema Design)

1. **`characters`**: 彼女の基本プロフィール（名前、画像URL、性格設定）。
2. **`messages`**: 送受信ログ。`delivered_at`（表示予定時刻）で返信タイミングを制御。
3. **`user_memories`**: 会話から抽出されたユーザーの事実（事実、カテゴリ、重要度）。
4. **`character_memories`**: AI自身が話した事実（事実、カテゴリ）。

---

## 7. AIロジック詳細

* **返信遅延計算式:** `Delay = (ContentLength * 0.5s) + Random(3s, 15s)`
* **記憶抽出タイミング:** ユーザーのメッセージが累積3回送信されるたびに、バックグラウンドでGeminiによるJSON抽出を実行。
* **プロンプト構成:** 1.  基本人格プロンプト
2.  ＋ AI自己記憶（直近5件）
3.  ＋ ユーザー記憶（重要度順10件）
4.  ＋ 直近の会話履歴（10往復）

---

### 次のステップ：開発着手への提案

要件定義が固まりました。AIエンジニアとしての第一歩として、まずは**「ローカル環境でこのプロジェクトの雛形（Next.js + Supabase）を立ち上げる」**ことから始めましょう。

もしよろしければ、**「最初の1週間で、最低限これだけはコマンドで叩くべき環境構築手順」**をリストアップしましょうか？


