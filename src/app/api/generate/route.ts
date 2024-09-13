import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connect } from "@/dbconfig/dbConfig"; // Import your DB connection
import ChatModel from "../../../model/chatModel";

connect(); // Connect to the database

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

    // Check for token to identify the user
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded === "string" || !("id" in decoded)) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = (decoded as JwtPayload).id;

    // Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const systemPrompt =
      "You are an AI that always responds in Yoruba. Ensure that all responses are in the Yoruba language.";
    const result = await model.generateContent(systemPrompt + prompt);
    const response = await result.response;
    const text = await response.text();

    // Save the user's prompt and AI's response to the database
    const userChat = new ChatModel({
      userId,
      messages: [
        { sender: "human", text: prompt },
        { sender: "ai", text: text },
      ],
    });
    await userChat.save();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while generating text" },
      { status: 500 }
    );
  }
}
