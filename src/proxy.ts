import { NextRequest, NextResponse } from "next/server";
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  if (request.cookies.has("__prerender_bypass"))
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
