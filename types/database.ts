export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      characters: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          personality: string;
          relationship: string;
          icon_url: string;
          bg_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          personality: string;
          relationship: string;
          icon_url: string;
          bg_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          personality?: string;
          relationship?: string;
          icon_url?: string;
          bg_url?: string | null;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          character_id: string;
          sender: 'user' | 'ai';
          content: string;
          created_at: string;
          delivered_at: string;
        };
        Insert: {
          id?: string;
          character_id: string;
          sender: 'user' | 'ai';
          content: string;
          created_at?: string;
          delivered_at: string;
        };
        Update: {
          id?: string;
          character_id?: string;
          sender?: 'user' | 'ai';
          content?: string;
          created_at?: string;
          delivered_at?: string;
        };
      };
      user_memories: {
        Row: {
          id: string;
          character_id: string;
          category: string;
          content: string;
          importance: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          character_id: string;
          category: string;
          content: string;
          importance: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          character_id?: string;
          category?: string;
          content?: string;
          importance?: number;
          updated_at?: string;
        };
      };
      character_memories: {
        Row: {
          id: string;
          character_id: string;
          fact: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          character_id: string;
          fact: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          character_id?: string;
          fact?: string;
          created_at?: string;
        };
      };
    };
  };
}
