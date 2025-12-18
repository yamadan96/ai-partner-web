-- 既存のテーブルを削除（初回セットアップの場合のみ）
DROP TABLE IF EXISTS character_memories CASCADE;
DROP TABLE IF EXISTS user_memories CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS characters CASCADE;

-- charactersテーブル: AIキャラクターの設定
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  personality TEXT NOT NULL,
  relationship TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  bg_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- messagesテーブル: チャット履歴
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- user_memoriesテーブル: ユーザーの記憶
CREATE TABLE user_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  importance INTEGER NOT NULL CHECK (importance >= 1 AND importance <= 5),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(character_id, content)
);

-- character_memoriesテーブル: AIの自己記憶
CREATE TABLE character_memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL REFERENCES characters(id) ON DELETE CASCADE,
  fact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX idx_messages_character_id ON messages(character_id);
CREATE INDEX idx_messages_delivered_at ON messages(delivered_at);
CREATE INDEX idx_user_memories_character_id ON user_memories(character_id);
CREATE INDEX idx_user_memories_importance ON user_memories(importance);
CREATE INDEX idx_character_memories_character_id ON character_memories(character_id);

-- Row Level Security (RLS)の有効化
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_memories ENABLE ROW LEVEL SECURITY;

-- RLSポリシーの作成（全てのユーザーが自分のデータにアクセス可能）
CREATE POLICY "Users can view their own characters" ON characters
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own characters" ON characters
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own characters" ON characters
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own characters" ON characters
  FOR DELETE USING (true);

CREATE POLICY "Users can view messages" ON messages
  FOR SELECT USING (true);

CREATE POLICY "Users can insert messages" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view user_memories" ON user_memories
  FOR SELECT USING (true);

CREATE POLICY "Users can insert user_memories" ON user_memories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update user_memories" ON user_memories
  FOR UPDATE USING (true);

CREATE POLICY "Users can view character_memories" ON character_memories
  FOR SELECT USING (true);

CREATE POLICY "Users can insert character_memories" ON character_memories
  FOR INSERT WITH CHECK (true);
