import { connect } from "@/dbconfig/dbConfig";
import User from "@/model/user";
import { NextResponse } from "next/server";

// Ensure the database is connected
connect();

// Type definitions for incoming requests
import type { NextRequest } from "next/server";

// TypeScript interface for request body
interface UserRequestBody {
  username: string;
  bankName?: string;
  accountNumber?: string;
  dp?: string;
}

// POST handler to create a new user profile
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UserRequestBody; // Parse the JSON body
    const { username, bankName, accountNumber, dp } = body;

    // Validate input
    if (!username || !bankName || !accountNumber) {
      return NextResponse.json(
        {
          error: "All fields (username, bankName, accountNumber) are required!",
        },
        { status: 400 }
      );
    }

    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists!" },
        { status: 409 }
      );
    }

    // Create new profile (user)
    const newUser = new User({ username, bankName, accountNumber, dp });
    await newUser.save();

    return NextResponse.json(
      { message: "Profile created successfully!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// GET handler to fetch user profiles
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (username) {
      const user = await User.findOne({ username });
      if (!user) {
        return NextResponse.json(
          { error: "Profile not found!" },
          { status: 404 }
        );
      }

      return NextResponse.json({ user }, { status: 200 });
    }

    const users = await User.find({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// PATCH handler to update user profiles
export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as UserRequestBody;
    const { username, bankName, accountNumber } = body;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required for update!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    if (bankName) user.bankName = bankName;
    if (accountNumber) user.accountNumber = accountNumber;

    await user.save();

    return NextResponse.json(
      { message: "Profile updated successfully!", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

// DELETE handler to delete user profiles
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username query parameter is required!" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json(
        { error: "Profile not found!" },
        { status: 404 }
      );
    }

    await user.deleteOne();

    return NextResponse.json(
      { message: "Profile deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
