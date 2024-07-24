import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const walletAddress = request.cookies.get("walletAddress");

  if (!walletAddress) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/campaigns/:walletAddress*", "/campaign/:address*"],
};
