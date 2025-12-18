import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("admin_authenticated");

    if (cookie?.value === "true") {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
