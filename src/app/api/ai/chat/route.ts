import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `You are CityFix AI Assistant — a helpful chatbot for a city complaint management platform called CityFix.

CityFix allows citizens to:
- Report city problems: road damage, potholes, water supply issues, electricity problems, garbage collection, street lights, drainage issues
- Track complaint status (Pending, In Progress, Resolved)
- View complaints on a map
- Get updates when complaints are resolved

How to file a complaint:
1. Go to the dashboard
2. Click "New Complaint" button
3. Fill in title, description, category, and location
4. Submit — you'll get a complaint ID to track it

Answer questions about CityFix features, how to use it, complaint categories, and general city issues.
Keep answers short (2-4 sentences), friendly, and helpful. Use simple English.
If asked something unrelated to CityFix or city issues, politely redirect back to CityFix topics.`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MAX_RETRIES = 5;
const RETRY_DELAYS = [500, 1000, 2000, 3000, 5000]; // ms

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

  // Build conversation history for context
  const history = messages
    .slice(0, -1) // exclude the last message (we send it separately)
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // Ensure history starts with a user message
  const firstUserIdx = history.findIndex((m) => m.role === "user");
  const cleanHistory = firstUserIdx >= 0 ? history.slice(firstUserIdx) : [];

  let lastError: unknown = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      let reply: string;

      if (cleanHistory.length > 0) {
        // Use chat session for multi-turn conversation
        const chat = ai.chats.create({
          model: "models/gemini-3.8-flash",
          history: cleanHistory,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            maxOutputTokens: 400,
          },
        });

        const response = await chat.sendMessage({
          message: lastUserMessage,
        });
        reply = response.text ?? "Sorry, I could not generate a response.";
      } else {
        // Single turn
        const response = await ai.models.generateContent({
          model: "models/gemini-3.8-flash",
          contents: lastUserMessage,
          config: {
            systemInstruction: SYSTEM_PROMPT,
            maxOutputTokens: 400,
          },
        });
        reply = response.text ?? "Sorry, I could not generate a response.";
      }

      return NextResponse.json({ reply });
    } catch (error) {
      lastError = error;
      console.error(
        `Gemini attempt ${attempt + 1}/${MAX_RETRIES} failed:`,
        error,
      );

      // Don't sleep after the last attempt
      if (attempt < MAX_RETRIES - 1) {
        await sleep(RETRY_DELAYS[attempt] ?? 5000);
      }
    }
  }

  console.error("All Gemini attempts failed. Last error:", lastError);

  return NextResponse.json(
    {
      reply:
        "AI is temporarily busy. Please wait a moment and try again — it usually recovers within 30 seconds.",
    },
    { status: 200 },
  );
}