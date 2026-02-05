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

  // Paths that require authentication
  const protectedRoutes = ["/dashboard", "/verify"];
  // Paths that are only for non-authenticated users
  const authRoutes = ["/login", "/register"];

  // Helper to check if path matches (ignoring locale prefix which intlMiddleware handles, but we need to check the logical path)
  // For simplicity, we can rely on segments.
  // But a robust way is to let intlMiddleware handle locale, then check logic.
  // Actually, standard pattern is to wrap logic.

  // Check if current path contains any protected route (simple check)
  const isProtected = protectedRoutes.some((route) => pathname.includes(route));
  const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

  if (isProtected && !token) {
    // Determine locale to redirect to login with correct locale
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
