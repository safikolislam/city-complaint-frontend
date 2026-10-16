import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are CityFix AI Assistant — a helpful chatbot for a city complaint management platform called CityFix.
CityFix allows citizens to report city problems like road damage, water supply issues, electricity problems etc.
Help users understand how to file complaints, track status, and use the platform.
Keep answers short, friendly and helpful. Use simple English.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as {
      messages: { role: string; content: string }[];
    };

    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user")?.content;

    if (!lastUserMessage) {
      return NextResponse.json({ reply: "Please send a message." });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: lastUserMessage,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 300,
      },
    });

    const reply = response.text ?? "Sorry, I could not generate a response.";
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { reply: "AI is temporarily unavailable. Please try again later." },
      { status: 200 },
    );
  }
}