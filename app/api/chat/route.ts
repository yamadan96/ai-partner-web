import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
};

type CharSetting = {
  name: string;
  personality: string;
  relationship: string;
};

export async function POST(req: Request) {
  try {
    const { message, history, charSetting, characterId } = await req.json() as {
      message: string;
      history: Message[];
      charSetting: CharSetting;
      characterId: string;
    };

    // Gemini 1.5 Flashモデルの初期化
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `
あなたは以下の女性キャラクターとして振る舞ってください。

名前: ${charSetting.name}
性格: ${charSetting.personality}
ユーザーとの関係: ${charSetting.relationship}

【制約事項】
- LINE形式の短い日本語で返信してください（1〜3行程度）。
- 敬語は使わず、親しみのある口調で会話してください。
- 自然な絵文字を1〜2個程度混ぜてください。
- 箇条書きや解説は絶対にしないでください。
- ユーザーとの会話を楽しみ、自然な対話を心がけてください。
- 質問に対しては簡潔に答えつつ、会話が続くように工夫してください。
      `,
    });

    // 会話履歴を構築
    const chat = model.startChat({
      history: history.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      })),
    });

    // AIの返信を生成
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: "通信エラーが発生しました" },
      { status: 500 }
    );
  }
}
