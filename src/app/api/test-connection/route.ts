import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";

export async function GET() {
  try {
    // Perform CRUD operations
    const rafa = new User("12345678900", "securePassword");
    await rafa.save();

    // Return test results
    return NextResponse.json({
      message: "Test completed successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({
      message: "esse e do tipo post"
    })
    // Perform CRUD operations
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}