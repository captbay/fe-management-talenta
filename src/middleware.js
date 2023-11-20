import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";

export function middleware(req) {
  const cookie = req.cookies.get("token")?.value;
  const { token, role } = cookie
    ? JSON.parse(cookie)
    : {
        token: null,
        role: null,
      };
  const pathname = new URL(req.url).pathname;

  const isPublicRoutes = ["/"];

  if (isPublicRoutes.includes(pathname) && token) {
    const dashboardUrl = new URL("/dashboard", req.nextUrl).href;
    return NextResponse.redirect(dashboardUrl);
  }

  if (!isPublicRoutes.includes(pathname) && !token) {
    const loginUrl = new URL("/", req.nextUrl).href;
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
