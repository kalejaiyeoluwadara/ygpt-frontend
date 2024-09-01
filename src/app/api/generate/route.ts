import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const systemPrompt =
      "You are an AI that always responds in Yoruba. Ensure that all responses are in the Yoruba language.";

    const result = await model.generateContent(systemPrompt + prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while generating text" },
      { status: 500 }
    );
  }
}
