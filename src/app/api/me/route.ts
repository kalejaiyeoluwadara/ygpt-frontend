import { getDatafromToken } from "@/helpers/getDataFromToken";
import User from "@/model/userModel";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const userId = await getDatafromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
