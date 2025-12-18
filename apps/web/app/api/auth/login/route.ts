import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    if (email === adminEmail && password === adminPassword) {
      const response = NextResponse.json(
        { success: true, message: "Login successful" },
        { status: 200 },
      );

      response.cookies.set("admin_authenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
