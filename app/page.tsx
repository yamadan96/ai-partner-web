"use client";

import { useState } from 'react';
import CharacterSetup from '@/components/CharacterSetup';
import ChatUI from '@/components/ChatUI';

type Character = {
  id: string;
  name: string;
  icon_url: string;
  personality: string;
  relationship: string;
};

export default function Home() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleCharacterComplete = (charData: Omit<Character, 'id'>) => {
    // 本来はSupabaseに保存するが、とりあえずローカルステートで管理
    const newCharacter: Character = {
      id: Date.now().toString(),
      ...charData,
    };
    setCharacter(newCharacter);
    setIsSetupComplete(true);
  };

  const handleBack = () => {
    setIsSetupComplete(false);
    setCharacter(null);
  };

  if (!isSetupComplete || !character) {
    return <CharacterSetup onComplete={handleCharacterComplete} />;
  }

  return <ChatUI character={character} onBack={handleBack} />;
}
