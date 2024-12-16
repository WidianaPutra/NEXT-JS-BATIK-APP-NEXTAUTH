import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // proteksi login & register pages
  if (url.pathname.startsWith("/auth") && token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // proteksi semua halaman admin
  if (url.pathname.startsWith("/seller") && token?.role !== "seller") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // proteksi semua halaman profile
  if (url.pathname.startsWith("/account") && !token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/seller/:path*", "/account/:path*"], // Match all auth and admin routes
};
