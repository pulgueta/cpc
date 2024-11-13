import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { env } from "@/env/server";
import type { CurrentSession } from "@/constants/db-types";
import { appHeaderKeys, authRoutes } from "@/constants";
import { urlToRedirect } from "@/constants/routes";
import { getUserInformation } from "@/lib/middleware";

const OWNER_URL_PREFIX = "/owner" as const;
const ADMIN_URL_PREFIX = "/admin" as const;
const USER_URL_PREFIX = "/dashboard" as const;

const isAuthRoute = (pathname: string) => authRoutes.some((route) => pathname.startsWith(route));

const isProtectedRoute = (pathname: string) =>
  pathname.startsWith(OWNER_URL_PREFIX) ||
  pathname.startsWith(ADMIN_URL_PREFIX) ||
  pathname.startsWith(USER_URL_PREFIX);

export default async function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  const [geo, ip] = getUserInformation(request);

  headers.set(appHeaderKeys.url, request.url);
  headers.set(appHeaderKeys.ip, ip);
  headers.set(appHeaderKeys.geo, JSON.stringify(geo));

  const req = await fetch(`${env.BETTER_AUTH_URL}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  const session = (await req.json()) as CurrentSession | null;

  const url = new URL(request.url);
  const currentURL = url.searchParams.get("currentURL");
  const decodedURL = currentURL ? new URL(decodeURIComponent(currentURL)) : new URL(request.url);

  const pathname = decodedURL?.pathname;

  if (session === null && req.status === 401 && isProtectedRoute(pathname)) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }

  const userRole = session?.user.role ?? "";
  const correctBasePath = urlToRedirect(userRole);

  if (session !== null && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(correctBasePath, request.url));
  }

  if (pathname.startsWith(OWNER_URL_PREFIX) && userRole !== "storeOwner") {
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
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
