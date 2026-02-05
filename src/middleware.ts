import createMiddleware from "next-intl/middleware";
import { locales, localePrefix } from "./navigation";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix,
});

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/dashboard", "/verify"];
  const authRoutes = ["/login", "/register"];

   const isProtected = protectedRoutes.some((route) => pathname.includes(route));
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

  if (isProtected && !token) {
    const currentLocale =
      locales.find((l) => pathname.startsWith(`/${l}`)) || "en";
    return NextResponse.redirect(
      new URL(`/${currentLocale}/login`, request.url)
    );
  }

  if (isAuthRoute && token) {
    const currentLocale =
      locales.find((l) => pathname.startsWith(`/${l}`)) || "en";
    return NextResponse.redirect(
      new URL(`/${currentLocale}/dashboard`, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
