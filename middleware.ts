import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

import { appHeaderKeys } from "@/constants";
import { urlToRedirect } from "@/constants/routes";
import {
  ADMIN_URL_PREFIX,
  getUserInformation,
  isAuthRoute,
  isProtectedRoute,
  OWNER_URL_PREFIX,
  USER_URL_PREFIX,
} from "@/lib/middleware";
import type { Session } from "@/lib/auth";

export default async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const [geo, ip] = getUserInformation(request);

  headers.set(appHeaderKeys.url, request.url);
  headers.set(appHeaderKeys.ip, ip);
  headers.set(appHeaderKeys.geo, JSON.stringify(geo));

  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const pathname = request.nextUrl.pathname;

  if (!session && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = session?.user.role ?? "";
  const correctBasePath = urlToRedirect(userRole);

  if (session && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.match(OWNER_URL_PREFIX) && userRole !== "storeOwner") {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.startsWith(ADMIN_URL_PREFIX) && userRole !== "admin") {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.startsWith(USER_URL_PREFIX) && userRole !== "user") {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|403|404|500).*)"],
};
