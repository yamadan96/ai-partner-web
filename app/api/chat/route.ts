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

    console.log('=== Chat API Request ===');
    console.log('Message:', message);
    console.log('Character:', charSetting.name);
    console.log('API Key exists:', !!process.env.GOOGLE_GENERATIVE_AI_API_KEY);

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

    console.log('Response text:', responseText);
    console.log('Response length:', responseText.length);

    if (!responseText || responseText.trim().length === 0) {
      console.error('Empty response from Gemini API');
      return NextResponse.json({ text: "ごめんね、ちょっと考え中...もう一度話しかけてくれる？" });
    }

    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error('=== Chat API Error ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);

    return NextResponse.json(
      {
        text: "ごめん、うまく返信できなかった💦 もう一度試してみて！",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
