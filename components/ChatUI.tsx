"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, Menu } from 'lucide-react';

// メッセージの型定義
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  time: string;
  isRead: boolean;
};

type Character = {
  id: string;
  name: string;
  icon_url: string;
  personality: string;
  relationship: string;
  user_name: string;
};

interface ChatUIProps {
  character: Character;
  onBack?: () => void;
}

export default function ChatUI({ character, onBack }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 新しいメッセージが来たら一番下までスクロール
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      // Gemini APIを呼び出し
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          history: messages.slice(-10),
          charSetting: {
            name: character.name,
            personality: character.personality,
            relationship: character.relationship,
            user_name: character.user_name,
          },
          characterId: character.id,
        }),
      });

      const data = await res.json();

      // 既読をつけてから考えている感を出すためのランダムディレイ
      const delay = Math.random() * 2000 + 1000;
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: data.text,
          sender: 'ai',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
        }]);
      }, delay);

    } catch (err) {
      setIsTyping(false);
      console.error('Chat error:', err);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-line-blue font-sans">
      {/* ヘッダー */}
      <header className="flex items-center justify-between px-4 py-3 bg-line-blue text-white">
        <div className="flex items-center gap-2">
          {onBack && (
            <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
          )}
          <h1 className="text-lg font-bold">{character.name}</h1>
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
                {m.isRead && "既読"}<br />{m.time}
              </span>
            )}

            {m.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gray-300 mb-4 overflow-hidden flex-shrink-0">
                <img src={character.icon_url} alt="AI" className="w-full h-full object-cover" />
              </div>
            )}

            <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm relative ${m.sender === 'user'
                ? 'bg-line-green text-black rounded-tr-none'
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
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
              <img src={character.icon_url} alt="AI" className="w-full h-full object-cover" />
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
