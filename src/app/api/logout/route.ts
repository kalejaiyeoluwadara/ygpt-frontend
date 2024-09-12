import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Set the cookie for logout
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire immediately to log out
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
