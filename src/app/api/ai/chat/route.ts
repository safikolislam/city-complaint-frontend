import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are CityFix AI Assistant — a helpful chatbot for a city complaint management platform called CityFix.
CityFix allows citizens to report city problems like road damage, water supply issues, electricity problems etc.
Help users understand how to file complaints, track status, and use the platform.
Keep answers short, friendly and helpful. Use simple English.`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as {
    messages: { role: string; content: string }[];
  };

  const lastUserMessage = [...messages]
    .reverse()
    .find((m) => m.role === "user")?.content;

  if (!lastUserMessage) {
    return NextResponse.json({ reply: "Please send a message." });
  }

  let attempts = 0;

  while (attempts < 3) {
    try {
      const response = await ai.models.generateContent({
        model: "models/gemini-3.8-flash",
        contents: lastUserMessage,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          maxOutputTokens: 300,
        },
      });

      const reply = response.text ?? "Sorry, I could not generate a response.";
      return NextResponse.json({ reply });
    } catch (error) {
      attempts++;
      console.error(`Gemini attempt ${attempts} failed:`, error);

      if (attempts < 3) {
        await sleep(1000 * attempts);
      }
    }
  }

  return NextResponse.json(
    {
      reply:
        "AI is temporarily unavailable due to high demand. Please try again in a moment.",
    },
    { status: 200 },
  );
}