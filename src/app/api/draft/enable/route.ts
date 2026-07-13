import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";
  if (
    !process.env.SANITY_PREVIEW_SECRET ||
    secret !== process.env.SANITY_PREVIEW_SECRET
  )
    return NextResponse.json(
      { message: "Invalid preview secret." },
      { status: 401 },
    );
  if (!redirect.startsWith("/") || redirect.startsWith("//"))
    return NextResponse.json(
      { message: "Invalid preview destination." },
      { status: 400 },
    );
  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirect, request.url));
}
