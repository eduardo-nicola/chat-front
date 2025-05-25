import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("chat_app_tk")?.value;
  const { pathname } = request.nextUrl;

  // Evita loops de redirecionamento
  const isAuthPage = pathname.startsWith("/auth");
  const isHomePage = pathname === "/home";

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/auth/:path*", "/dashboard/:path*"],
};
