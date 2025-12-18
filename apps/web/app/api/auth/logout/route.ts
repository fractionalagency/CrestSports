import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 },
    );

    // Clear the admin authentication cookie
    response.cookies.set("admin_authenticated", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
