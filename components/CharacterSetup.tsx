"use client";

import React, { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';

const AI_AVATARS = [
  {
    id: '1',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sakura&hair=long01&hairColor=auburn',
    label: '清楚系',
    personality: 'お淑やかで、優しく丁寧な話し方をします。相手を思いやる気持ちが強く、控えめな性格です。',
  },
  {
    id: '2',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miku&hair=long08&hairColor=blonde',
    label: '元気系',
    personality: '天真爛漫で、元気いっぱい。明るくポジティブで、いつも周りを笑顔にします。',
  },
  {
    id: '3',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki&hair=long02&hairColor=black',
    label: 'お姉さん系',
    personality: '落ち着いていて大人っぽい。包容力があり、優しく見守ってくれます。',
  },
  {
    id: '4',
    url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rei&hair=long03&hairColor=brown',
    label: 'クール系',
    personality: 'クールで知的。感情をあまり表に出さないけれど、心の中では大切に思っています。',
  },
];

const RELATIONSHIPS = [
  { value: '幼馴染', label: '幼馴染' },
  { value: '彼女', label: '彼女' },
  { value: '後輩', label: '後輩' },
  { value: '同級生', label: '同級生' },
];

interface CharacterSetupProps {
  onComplete: (character: {
    name: string;
    personality: string;
    relationship: string;
    icon_url: string;
  }) => void;
}

export default function CharacterSetup({ onComplete }: CharacterSetupProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<typeof AI_AVATARS[0] | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('彼女');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setSelectedAvatar(null);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }
    if (!selectedAvatar && !preview) {
      alert('画像を選択してください');
      return;
    }

    onComplete({
      name: name.trim(),
      personality: selectedAvatar?.personality || 'あなたの彼女として、優しく会話します。',
      relationship,
      icon_url: preview || selectedAvatar?.url || '',
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">彼女の設定</h2>

      {/* 選択中のプレビュー */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full border-4 border-line-green overflow-hidden relative bg-gray-100">
          {(preview || selectedAvatar) ? (
            <img
              src={preview || selectedAvatar!.url}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              未選択
            </div>
          )}
        </div>
      </div>

      {/* 名前入力 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名前
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: さくら"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-line-green"
        />
      </div>

      {/* 関係性選択 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          関係性
        </label>
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-line-green"
        >
          {RELATIONSHIPS.map((rel) => (
            <option key={rel.value} value={rel.value}>
              {rel.label}
            </option>
          ))}
        </select>
      </div>

      {/* AI画像ギャラリー */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-3">AI生成画像から選ぶ</p>
        <div className="grid grid-cols-2 gap-4">
          {AI_AVATARS.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => {
                setSelectedAvatar(avatar);
                setPreview(null);
              }}
              className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition ${selectedAvatar?.id === avatar.id ? 'border-line-green shadow-lg' : 'border-transparent'
                }`}
            >
              <img src={avatar.url} alt={avatar.label} className="w-full h-40 object-cover bg-gray-100" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                {avatar.label}
              </div>
              {selectedAvatar?.id === avatar.id && (
                <CheckCircle2 className="absolute top-2 right-2 text-line-green fill-white" />
              )}
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

      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-line-green text-black font-bold rounded-full shadow-lg hover:opacity-90 active:scale-95 transition"
      >
        この彼女とチャットを始める
      </button>
    </div>
  );
}
