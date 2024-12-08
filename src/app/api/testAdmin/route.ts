import { NextResponse } from "next/server";
import { Admin } from "../../../models/Admin";
import { connectToDatabase } from "@/db/db";

export async function GET() {
  try {
    await connectToDatabase();

    // Perform CRUD operations
    const admin = new Admin("12345678900", "securePassword");
    await admin.save();

    const foundAdmin = await Admin.findByCPF("12345678900");
    await Admin.updateByCPF("12345678900", { senha: "newSecurePassword" });
    await Admin.deleteByCPF("12345678900");

    const allAdmins = await Admin.listAll();

    // Return test results
    return NextResponse.json({
      message: "Test completed successfully",
      foundAdmin,
      allAdmins,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
