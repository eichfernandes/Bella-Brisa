import { NextResponse } from "next/server";
import { Admin } from "@/models/Admin";

export async function GET() {
  try {
    // Perform CRUD operations
    const admin = new Admin("12345678900", "securePassword");
    await admin.save();


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
