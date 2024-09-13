import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"; // Adjust the path to your ChatModel
import { connect } from "@/dbconfig/dbConfig";
import ChatModel from "@/model/chatModel";
connect();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Narrow the type check to ensure decoded is a JwtPayload
    if (typeof decoded === "string" || !("id" in decoded)) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Extract userId from the decoded token
    const userId = (decoded as JwtPayload).id;

    // Fetch chat history for the user
    const chatHistory = await ChatModel.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ chatHistory });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
