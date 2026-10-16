import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as {
    messages: { role: string; content: string }[];
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are CityFix AI Assistant — a helpful chatbot for a city complaint management platform called CityFix.
CityFix allows citizens to report city problems like road damage, water supply issues, electricity problems etc.
Help users understand how to file complaints, track status, and use the platform.
Keep answers short, friendly and helpful. Use simple English.`,
  });

  const userMessages = messages.filter((m) => m.role === "user");
  const lastMessage = userMessages[userMessages.length - 1].content;

  const history: { role: string; parts: { text: string }[] }[] = [];
  let userCount = 0;

  for (const m of messages.slice(0, -1)) {
    if (m.role === "user") {
      history.push({ role: "user", parts: [{ text: m.content }] });
      userCount++;
    } else if (m.role === "assistant" && userCount > 0) {
      history.push({ role: "model", parts: [{ text: m.content }] });
    }
  }

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(lastMessage);
  const reply = result.response.text();

  return NextResponse.json({ reply });
}